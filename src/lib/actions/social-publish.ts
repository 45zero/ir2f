"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import {
  publishToFacebookPage,
  publishToInstagram,
  getFacebookPostStats,
  getInstagramMediaStats,
  getFacebookPostInsights,
  getInstagramMediaInsights,
  editFacebookPost,
  deleteFacebookPost,
  deleteInstagramMedia,
} from "@/lib/social/graph"
import { getSocialAccountById } from "@/lib/social/accounts"
import type { ReseauxPublies } from "@/lib/articles-shared"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ir2f.lgef.fr"

export type PublishSocialState = {
  error: string | null
  results: { compteId: string; label: string; ok: boolean; error?: string }[]
}

export type PublishSocialGroups = {
  facebook: { compteIds: string[]; message: string }
  instagram: { compteIds: string[]; caption: string; imageUrl: string | null }
  scheduledFor?: string
}

/**
 * Publie (ou programme) une actualité sur les comptes réseaux sociaux sélectionnés, avec un texte
 * propre à chaque plateforme (voir src/lib/social/accounts.ts — comptes configurés en variable
 * d'environnement, pas en base). Un échec sur un compte n'empêche pas les autres — chaque résultat
 * est reporté séparément dans Article.reseauxPublies.
 */
export async function publishArticleToSocial(articleId: string, groups: PublishSocialGroups): Promise<PublishSocialState> {
  await requireAdmin()

  const targets: { compteId: string; message: string; imageUrl?: string }[] = [
    ...groups.facebook.compteIds.map((compteId) => ({ compteId, message: groups.facebook.message })),
    ...groups.instagram.compteIds.map((compteId) => ({
      compteId,
      message: groups.instagram.caption,
      imageUrl: groups.instagram.imageUrl ?? undefined,
    })),
  ]
  if (targets.length === 0) return { error: "Sélectionnez au moins un compte.", results: [] }

  const article = await prisma.article.findUnique({ where: { id: articleId }, select: { slug: true, reseauxPublies: true } })
  if (!article) return { error: "Actualité introuvable.", results: [] }

  const articleUrl = `${SITE_URL}/actualites/${article.slug}`
  const reseauxPublies = { ...((article.reseauxPublies as ReseauxPublies | null) ?? {}) }
  const results: PublishSocialState["results"] = []

  const scheduledFor = groups.scheduledFor && new Date(groups.scheduledFor) > new Date() ? groups.scheduledFor : null

  for (const target of targets) {
    const compte = getSocialAccountById(target.compteId)
    if (!compte) {
      results.push({ compteId: target.compteId, label: target.compteId, ok: false, error: "Compte introuvable." })
      continue
    }

    if (scheduledFor) {
      reseauxPublies[compte.id] = { statut: "PROGRAMME", message: target.message, imageUrl: target.imageUrl, scheduledFor }
      results.push({ compteId: compte.id, label: compte.label, ok: true })
      continue
    }

    try {
      const { postId } =
        compte.plateforme === "FACEBOOK"
          ? await publishToFacebookPage(compte.externalId, compte.accessToken, { message: target.message, link: articleUrl })
          : await publishToInstagram(compte.externalId, compte.accessToken, {
              imageUrl: requireImage(target.imageUrl),
              caption: `${target.message}\n\n${articleUrl}`,
            })
      reseauxPublies[compte.id] = { statut: "PUBLIE", message: target.message, imageUrl: target.imageUrl, publishedAt: new Date().toISOString(), postId }
      results.push({ compteId: compte.id, label: compte.label, ok: true })
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur inattendue."
      reseauxPublies[compte.id] = { statut: "ECHEC", message: target.message, imageUrl: target.imageUrl, error: message }
      results.push({ compteId: compte.id, label: compte.label, ok: false, error: message })
    }
  }

  await prisma.article.update({ where: { id: articleId }, data: { reseauxPublies } })

  revalidatePath("/admin/articles")
  revalidatePath(`/admin/articles/${articleId}`)
  revalidatePath("/admin/publications")
  return { error: null, results }
}

function requireImage(imageUrl: string | undefined): string {
  if (!imageUrl) throw new Error("Aucune image sélectionnée — Instagram en nécessite une.")
  return imageUrl
}

export type RefreshStatsState = { error: string | null }

/**
 * Rafraîchit les likes/commentaires et vues/portée des publications déjà PUBLIE d'un article. Les
 * vues/portée sont récupérées séparément (édge /insights, pas les mêmes permissions ni le même
 * risque d'erreur que like_count/comments_count) — un échec dessus ne doit pas empêcher de garder
 * au moins les likes/commentaires à jour.
 */
export async function refreshSocialStats(articleId: string): Promise<RefreshStatsState> {
  await requireAdmin()

  const article = await prisma.article.findUnique({ where: { id: articleId }, select: { reseauxPublies: true } })
  if (!article) return { error: "Actualité introuvable." }

  const reseauxPublies = { ...((article.reseauxPublies as ReseauxPublies | null) ?? {}) }
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
    await prisma.article.update({ where: { id: articleId }, data: { reseauxPublies } })
    revalidatePath("/admin/articles")
    revalidatePath("/admin/publications")
  }

  return { error: null }
}

export type EditSocialPostState = { error: string | null; ok: boolean }

/** Modifie le texte d'une publication Facebook déjà publiée. Instagram ne permet pas de modifier une légende publiée (limitation de l'API, pas de notre code) — l'appelant ne doit pas proposer cette action pour Instagram. */
export async function editArticleSocialPost(articleId: string, compteId: string, newMessage: string): Promise<EditSocialPostState> {
  await requireAdmin()

  const compte = getSocialAccountById(compteId)
  if (!compte) return { error: "Compte introuvable.", ok: false }
  if (compte.plateforme !== "FACEBOOK") return { error: "La modification n'est pas possible sur Instagram.", ok: false }

  const article = await prisma.article.findUnique({ where: { id: articleId }, select: { reseauxPublies: true } })
  if (!article) return { error: "Actualité introuvable.", ok: false }

  const reseauxPublies = { ...((article.reseauxPublies as ReseauxPublies | null) ?? {}) }
  const etat = reseauxPublies[compteId]
  if (!etat || etat.statut !== "PUBLIE" || !etat.postId) return { error: "Cette publication n'est pas publiée.", ok: false }

  try {
    await editFacebookPost(etat.postId, compte.accessToken, newMessage)
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inattendue.", ok: false }
  }

  reseauxPublies[compteId] = { ...etat, message: newMessage }
  await prisma.article.update({ where: { id: articleId }, data: { reseauxPublies } })

  revalidatePath("/admin/articles")
  revalidatePath(`/admin/articles/${articleId}`)
  revalidatePath("/admin/publications")
  return { error: null, ok: true }
}

export type DeleteSocialPostState = { error: string | null; ok: boolean }

/** Supprime une publication déjà publiée sur la plateforme d'origine, puis marque l'état SUPPRIME côté IR2F (on garde la trace plutôt que de retirer l'entrée). */
export async function deleteArticleSocialPost(articleId: string, compteId: string): Promise<DeleteSocialPostState> {
  await requireAdmin()

  const compte = getSocialAccountById(compteId)
  if (!compte) return { error: "Compte introuvable.", ok: false }

  const article = await prisma.article.findUnique({ where: { id: articleId }, select: { reseauxPublies: true } })
  if (!article) return { error: "Actualité introuvable.", ok: false }

  const reseauxPublies = { ...((article.reseauxPublies as ReseauxPublies | null) ?? {}) }
  const etat = reseauxPublies[compteId]
  if (!etat || etat.statut !== "PUBLIE" || !etat.postId) return { error: "Cette publication n'est pas publiée.", ok: false }

  try {
    if (compte.plateforme === "FACEBOOK") await deleteFacebookPost(etat.postId, compte.accessToken)
    else await deleteInstagramMedia(etat.postId, compte.accessToken)
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inattendue.", ok: false }
  }

  reseauxPublies[compteId] = { ...etat, statut: "SUPPRIME", deletedAt: new Date().toISOString() }
  await prisma.article.update({ where: { id: articleId }, data: { reseauxPublies } })

  revalidatePath("/admin/articles")
  revalidatePath(`/admin/articles/${articleId}`)
  revalidatePath("/admin/publications")
  return { error: null, ok: true }
}
