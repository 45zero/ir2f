"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { publishToFacebookPage, publishToInstagram, getFacebookPostStats, getInstagramMediaStats } from "@/lib/social/graph"
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

/** Rafraîchit les likes/commentaires des publications déjà PUBLIE d'un article. */
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
      reseauxPublies[compteId] = { ...etat, likes: stats.likes, comments: stats.comments, statsFetchedAt: new Date().toISOString() }
      changed = true
    } catch {
      // Une stat qu'on n'arrive pas à rafraîchir ne doit pas bloquer les autres — on garde l'ancienne valeur.
    }
  }

  if (changed) {
    await prisma.article.update({ where: { id: articleId }, data: { reseauxPublies } })
    revalidatePath("/admin/articles")
    revalidatePath("/admin/publications")
  }

  return { error: null }
}
