"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import {
  getFacebookPostStats,
  getInstagramMediaStats,
  getFacebookPostInsights,
  getInstagramMediaInsights,
  editFacebookPost,
  deleteFacebookPost,
  deleteInstagramMedia,
  getFacebookPostComments,
  deleteFacebookComment,
  getInstagramMediaComments,
  deleteInstagramComment,
} from "@/lib/social/graph"
import { publishToSocialAccount } from "@/lib/social/publish-router"
import { getSocialAccountById } from "@/lib/social/accounts"
import type { ReseauxPublies, PublishableType, MediaMode, SocialComment } from "@/lib/social/publication"
import { articleShareExcerpt, type ArticleSection } from "@/lib/articles-shared"
import { formationShareExcerpt, type ProgrammeStep } from "@/lib/formations-shared"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ir2f.lgef.fr"

// Compte Vercel en plan Hobby (voir le commit "Corrige le cron... pour le plan Hobby") — le budget
// par défaut serait de 10s, trop court pour une vidéo Instagram/Facebook dont le traitement côté
// Meta peut prendre jusqu'à ~50s (voir le polling dans social/graph.ts). Un fichier "use server" ne
// peut exporter que des fonctions async, donc `maxDuration` est déclaré sur les pages qui appellent
// publishContentToSocial (articles/[id], formations/[id], publications) plutôt qu'ici.

/**
 * Publier sur les réseaux fonctionne à l'identique pour une actualité ou une formation — seule
 * l'origine des données change (slug/URL publique, où est stocké reseauxPublies). Cette petite
 * couche évite de dupliquer toute la logique de publication/édition/suppression/stats entre
 * social-publish (Article) et un futur équivalent Formation.
 */
async function loadEntity(entityType: PublishableType, id: string): Promise<{ url: string; reseauxPublies: ReseauxPublies } | null> {
  if (entityType === "ARTICLE") {
    const article = await prisma.article.findUnique({ where: { id }, select: { slug: true, reseauxPublies: true } })
    if (!article) return null
    return { url: `${SITE_URL}/actualites/${article.slug}`, reseauxPublies: (article.reseauxPublies as ReseauxPublies | null) ?? {} }
  }

  const formation = await prisma.formation.findUnique({ where: { id }, select: { slug: true, lienExterne: true, reseauxPublies: true } })
  if (!formation) return null
  return {
    url: formation.lienExterne || `${SITE_URL}/formations/${formation.slug}`,
    reseauxPublies: (formation.reseauxPublies as ReseauxPublies | null) ?? {},
  }
}

async function saveReseauxPublies(entityType: PublishableType, id: string, reseauxPublies: ReseauxPublies): Promise<void> {
  if (entityType === "ARTICLE") await prisma.article.update({ where: { id }, data: { reseauxPublies } })
  else await prisma.formation.update({ where: { id }, data: { reseauxPublies } })
}

function entityNotFoundError(entityType: PublishableType): string {
  return entityType === "ARTICLE" ? "Actualité introuvable." : "Formation introuvable."
}

function revalidateEntity(entityType: PublishableType, id: string): void {
  const base = entityType === "ARTICLE" ? "/admin/articles" : "/admin/formations"
  revalidatePath(base)
  revalidatePath(`${base}/${id}`)
  revalidatePath("/admin/publications")
}

export type PublishSocialState = {
  error: string | null
  results: { compteId: string; label: string; ok: boolean; error?: string }[]
}

export type PublishSocialGroups = {
  facebook: { compteIds: string[]; message: string; mediaMode: MediaMode; mediaUrl?: string }
  instagram: { compteIds: string[]; caption: string; mediaMode: Exclude<MediaMode, "LIEN">; mediaUrl: string | null }
  scheduledFor?: string
}

/**
 * Publie (ou programme) une actualité/formation sur les comptes réseaux sociaux sélectionnés, avec
 * un texte propre à chaque plateforme (voir src/lib/social/accounts.ts — comptes configurés en
 * variable d'environnement, pas en base). Un échec sur un compte n'empêche pas les autres — chaque
 * résultat est reporté séparément dans reseauxPublies.
 */
export async function publishContentToSocial(
  entityType: PublishableType,
  entityId: string,
  groups: PublishSocialGroups
): Promise<PublishSocialState> {
  await requireAdmin()

  const targets: { compteId: string; message: string; mediaMode: MediaMode; mediaUrl?: string }[] = [
    ...groups.facebook.compteIds.map((compteId) => ({
      compteId,
      message: groups.facebook.message,
      mediaMode: groups.facebook.mediaMode,
      mediaUrl: groups.facebook.mediaUrl,
    })),
    ...groups.instagram.compteIds.map((compteId) => ({
      compteId,
      message: groups.instagram.caption,
      mediaMode: groups.instagram.mediaMode as MediaMode,
      mediaUrl: groups.instagram.mediaUrl ?? undefined,
    })),
  ]
  if (targets.length === 0) return { error: "Sélectionnez au moins un compte.", results: [] }

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType), results: [] }

  const reseauxPublies = { ...entity.reseauxPublies }
  const results: PublishSocialState["results"] = []

  const scheduledFor = groups.scheduledFor && new Date(groups.scheduledFor) > new Date() ? groups.scheduledFor : null

  for (const target of targets) {
    const compte = getSocialAccountById(target.compteId)
    if (!compte) {
      results.push({ compteId: target.compteId, label: target.compteId, ok: false, error: "Compte introuvable." })
      continue
    }

    if (scheduledFor) {
      reseauxPublies[compte.id] = { statut: "PROGRAMME", message: target.message, mediaMode: target.mediaMode, mediaUrl: target.mediaUrl, scheduledFor }
      results.push({ compteId: compte.id, label: compte.label, ok: true })
      continue
    }

    try {
      const { postId } = await publishToSocialAccount(compte, target.message, entity.url, target.mediaMode, target.mediaUrl)
      reseauxPublies[compte.id] = {
        statut: "PUBLIE",
        message: target.message,
        mediaMode: target.mediaMode,
        mediaUrl: target.mediaUrl,
        publishedAt: new Date().toISOString(),
        postId,
      }
      results.push({ compteId: compte.id, label: compte.label, ok: true })
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur inattendue."
      reseauxPublies[compte.id] = { statut: "ECHEC", message: target.message, mediaMode: target.mediaMode, mediaUrl: target.mediaUrl, error: message }
      results.push({ compteId: compte.id, label: compte.label, ok: false, error: message })
    }
  }

  await saveReseauxPublies(entityType, entityId, reseauxPublies)
  revalidateEntity(entityType, entityId)
  return { error: null, results }
}

export type RefreshStatsState = { error: string | null }

/**
 * Rafraîchit les likes/commentaires et vues/portée des publications déjà PUBLIE d'un contenu. Les
 * vues/portée sont récupérées séparément (édge /insights, pas les mêmes permissions ni le même
 * risque d'erreur que like_count/comments_count) — un échec dessus ne doit pas empêcher de garder
 * au moins les likes/commentaires à jour.
 */
export async function refreshContentSocialStats(entityType: PublishableType, entityId: string): Promise<RefreshStatsState> {
  await requireAdmin()

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType) }

  const reseauxPublies = { ...entity.reseauxPublies }
  let changed = false

  for (const [compteId, etat] of Object.entries(reseauxPublies)) {
    if (etat.statut !== "PUBLIE" || !etat.postId) continue
    const compte = getSocialAccountById(compteId)
    if (!compte) continue

    try {
      const stats =
        compte.plateforme === "FACEBOOK"
          ? await getFacebookPostStats(etat.postId, compte.accessToken)
          : await getInstagramMediaStats(etat.postId, compte.accessToken)
      reseauxPublies[compteId] = { ...reseauxPublies[compteId], likes: stats.likes, comments: stats.comments, statsFetchedAt: new Date().toISOString() }
      changed = true
    } catch {
      // Une stat qu'on n'arrive pas à rafraîchir ne doit pas bloquer les autres — on garde l'ancienne valeur.
    }

    try {
      const insights =
        compte.plateforme === "FACEBOOK"
          ? await getFacebookPostInsights(etat.postId, compte.accessToken)
          : await getInstagramMediaInsights(etat.postId, compte.accessToken)
      reseauxPublies[compteId] = { ...reseauxPublies[compteId], views: insights.views, reach: insights.reach }
      changed = true
    } catch {
      // Idem : les vues sont un bonus, pas de quoi bloquer le reste si Meta les refuse.
    }
  }

  if (changed) {
    await saveReseauxPublies(entityType, entityId, reseauxPublies)
    revalidateEntity(entityType, entityId)
  }

  return { error: null }
}

export type EditSocialPostState = { error: string | null; ok: boolean }

/** Modifie le texte d'une publication Facebook déjà publiée. Instagram ne permet pas de modifier une légende publiée (limitation de l'API, pas de notre code) — l'appelant ne doit pas proposer cette action pour Instagram. */
export async function editContentSocialPost(
  entityType: PublishableType,
  entityId: string,
  compteId: string,
  newMessage: string
): Promise<EditSocialPostState> {
  await requireAdmin()

  const compte = getSocialAccountById(compteId)
  if (!compte) return { error: "Compte introuvable.", ok: false }
  if (compte.plateforme !== "FACEBOOK") return { error: "La modification n'est pas possible sur Instagram.", ok: false }

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType), ok: false }

  const reseauxPublies = { ...entity.reseauxPublies }
  const etat = reseauxPublies[compteId]
  if (!etat || etat.statut !== "PUBLIE" || !etat.postId) return { error: "Cette publication n'est pas publiée.", ok: false }

  try {
    await editFacebookPost(etat.postId, compte.accessToken, newMessage)
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inattendue.", ok: false }
  }

  reseauxPublies[compteId] = { ...etat, message: newMessage }
  await saveReseauxPublies(entityType, entityId, reseauxPublies)
  revalidateEntity(entityType, entityId)
  return { error: null, ok: true }
}

export type DeleteSocialPostState = { error: string | null; ok: boolean }

/** Supprime une publication déjà publiée sur la plateforme d'origine, puis marque l'état SUPPRIME côté IR2F (on garde la trace plutôt que de retirer l'entrée). */
export async function deleteContentSocialPost(entityType: PublishableType, entityId: string, compteId: string): Promise<DeleteSocialPostState> {
  await requireAdmin()

  const compte = getSocialAccountById(compteId)
  if (!compte) return { error: "Compte introuvable.", ok: false }

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType), ok: false }

  const reseauxPublies = { ...entity.reseauxPublies }
  const etat = reseauxPublies[compteId]
  if (!etat || etat.statut !== "PUBLIE" || !etat.postId) return { error: "Cette publication n'est pas publiée.", ok: false }

  try {
    if (compte.plateforme === "FACEBOOK") await deleteFacebookPost(etat.postId, compte.accessToken)
    else await deleteInstagramMedia(etat.postId, compte.accessToken)
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inattendue.", ok: false }
  }

  reseauxPublies[compteId] = { ...etat, statut: "SUPPRIME", deletedAt: new Date().toISOString() }
  await saveReseauxPublies(entityType, entityId, reseauxPublies)
  revalidateEntity(entityType, entityId)
  return { error: null, ok: true }
}

export type EditScheduledPostState = { error: string | null; ok: boolean }

/** Modifie le message d'une publication PROGRAMME (pas encore envoyée) — aucun appel réseau, le cron enverra ce nouveau texte à l'échéance. Contrairement à editContentSocialPost, disponible sur Facebook comme Instagram puisque rien n'est encore publié. */
export async function editScheduledSocialPost(
  entityType: PublishableType,
  entityId: string,
  compteId: string,
  newMessage: string
): Promise<EditScheduledPostState> {
  await requireAdmin()

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType), ok: false }

  const reseauxPublies = { ...entity.reseauxPublies }
  const etat = reseauxPublies[compteId]
  if (!etat || etat.statut !== "PROGRAMME") return { error: "Cette publication n'est plus programmée.", ok: false }

  reseauxPublies[compteId] = { ...etat, message: newMessage }
  await saveReseauxPublies(entityType, entityId, reseauxPublies)
  revalidateEntity(entityType, entityId)
  return { error: null, ok: true }
}

export type CancelScheduledPostState = { error: string | null; ok: boolean }

/** Annule une publication PROGRAMME avant son envoi. Rien n'a encore été publié sur le réseau, donc rien à y supprimer — on retire simplement l'entrée, ce qui fait réapparaître le contenu dans "À publier" pour ce compte. */
export async function cancelScheduledSocialPost(entityType: PublishableType, entityId: string, compteId: string): Promise<CancelScheduledPostState> {
  await requireAdmin()

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType), ok: false }

  const reseauxPublies = { ...entity.reseauxPublies }
  const etat = reseauxPublies[compteId]
  if (!etat || etat.statut !== "PROGRAMME") return { error: "Cette publication n'est plus programmée.", ok: false }

  delete reseauxPublies[compteId]
  await saveReseauxPublies(entityType, entityId, reseauxPublies)
  revalidateEntity(entityType, entityId)
  return { error: null, ok: true }
}

export type ContentPublishContext = {
  titre: string
  reseauxPublies: ReseauxPublies | null
  defaultMessage: string
  images: string[]
  videos: string[]
}

/**
 * Contexte nécessaire pour ouvrir le panneau de publication (message par défaut, images
 * disponibles, état actuel) à la demande — utilisé par la boîte de dialogue "Publier" depuis
 * /admin/publications, pour éviter de précharger tout ce contexte pour chaque ligne de la liste.
 */
export async function getContentPublishContext(entityType: PublishableType, entityId: string): Promise<ContentPublishContext | null> {
  await requireAdmin()

  if (entityType === "ARTICLE") {
    const article = await prisma.article.findUnique({
      where: { id: entityId },
      select: { titre: true, contenu: true, textePartage: true, image: true, sections: true, reseauxPublies: true },
    })
    if (!article) return null
    const sections = (article.sections as ArticleSection[] | null) ?? []
    return {
      titre: article.titre,
      reseauxPublies: article.reseauxPublies as ReseauxPublies | null,
      defaultMessage: articleShareExcerpt(article),
      images: [...(article.image ? [article.image] : []), ...sections.flatMap((s) => s.images ?? [])],
      videos: sections.flatMap((s) => (s.videoFichierUrl ? [s.videoFichierUrl] : [])),
    }
  }

  const formation = await prisma.formation.findUnique({
    where: { id: entityId },
    select: { titre: true, description: true, image: true, programme: true, reseauxPublies: true },
  })
  if (!formation) return null
  const programme = (formation.programme as ProgrammeStep[] | null) ?? []
  return {
    titre: formation.titre,
    reseauxPublies: formation.reseauxPublies as ReseauxPublies | null,
    defaultMessage: formationShareExcerpt(formation),
    images: [...(formation.image ? [formation.image] : []), ...programme.flatMap((p) => p.images ?? [])],
    videos: programme.flatMap((p) => (p.videoFichierUrl ? [p.videoFichierUrl] : [])),
  }
}

export type SetDiffuserReseauxState = { error: string | null }

/** Retire (ou remet) un contenu de la liste "À publier" — piloté par la case "Diffuser sur les réseaux" du formulaire, ou par l'action "Retirer" sur /admin/publications. */
export async function setDiffuserReseaux(entityType: PublishableType, entityId: string, diffuserReseaux: boolean): Promise<SetDiffuserReseauxState> {
  await requireAdmin()

  if (entityType === "ARTICLE") {
    const article = await prisma.article.findUnique({ where: { id: entityId }, select: { id: true } })
    if (!article) return { error: entityNotFoundError(entityType) }
    await prisma.article.update({ where: { id: entityId }, data: { diffuserReseaux } })
  } else {
    const formation = await prisma.formation.findUnique({ where: { id: entityId }, select: { id: true } })
    if (!formation) return { error: entityNotFoundError(entityType) }
    await prisma.formation.update({ where: { id: entityId }, data: { diffuserReseaux } })
  }

  revalidateEntity(entityType, entityId)
  return { error: null }
}

export type SetArchiveState = { error: string | null }

/** Masque/affiche une publication PUBLIE dans la liste "Publié" de /admin/publications — ne touche à rien côté réseau, juste une préférence d'affichage pour désencombrer la liste une fois qu'une publication est ancienne. */
export async function setPublicationArchive(
  entityType: PublishableType,
  entityId: string,
  compteId: string,
  archive: boolean
): Promise<SetArchiveState> {
  await requireAdmin()

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType) }

  const reseauxPublies = { ...entity.reseauxPublies }
  const etat = reseauxPublies[compteId]
  if (!etat) return { error: "Publication introuvable." }

  reseauxPublies[compteId] = { ...etat, archive }
  await saveReseauxPublies(entityType, entityId, reseauxPublies)
  revalidateEntity(entityType, entityId)
  return { error: null }
}

export type GetCommentsState = { error: string | null; comments: SocialComment[] }

/** Commentaires d'une publication déjà publiée, lus en direct depuis la plateforme (jamais stockés côté IR2F) — chargés à la demande depuis /admin/publications plutôt que préchargés pour chaque ligne. */
export async function getPostComments(entityType: PublishableType, entityId: string, compteId: string): Promise<GetCommentsState> {
  await requireAdmin()

  const compte = getSocialAccountById(compteId)
  if (!compte) return { error: "Compte introuvable.", comments: [] }

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType), comments: [] }

  const etat = entity.reseauxPublies[compteId]
  if (!etat || etat.statut !== "PUBLIE" || !etat.postId) return { error: "Cette publication n'est pas publiée.", comments: [] }

  try {
    const comments =
      compte.plateforme === "FACEBOOK"
        ? await getFacebookPostComments(etat.postId, compte.accessToken)
        : await getInstagramMediaComments(etat.postId, compte.accessToken)
    return { error: null, comments }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inattendue.", comments: [] }
  }
}

export type DeleteCommentState = { error: string | null; ok: boolean }

/** Supprime un commentaire directement sur la plateforme — irréversible, pas de trace gardée côté IR2F puisque les commentaires n'y sont jamais stockés. */
export async function deleteSocialComment(
  entityType: PublishableType,
  entityId: string,
  compteId: string,
  commentId: string
): Promise<DeleteCommentState> {
  await requireAdmin()

  const compte = getSocialAccountById(compteId)
  if (!compte) return { error: "Compte introuvable.", ok: false }

  const entity = await loadEntity(entityType, entityId)
  if (!entity) return { error: entityNotFoundError(entityType), ok: false }

  const etat = entity.reseauxPublies[compteId]
  if (!etat || etat.statut !== "PUBLIE") return { error: "Cette publication n'est pas publiée.", ok: false }

  try {
    if (compte.plateforme === "FACEBOOK") await deleteFacebookComment(commentId, compte.accessToken)
    else await deleteInstagramComment(commentId, compte.accessToken)
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inattendue.", ok: false }
  }

  return { error: null, ok: true }
}
