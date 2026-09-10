import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { publishToSocialAccount } from "@/lib/social/publish-router"
import { getSocialAccountById } from "@/lib/social/accounts"
import type { ReseauxPublies } from "@/lib/social/publication"

export const runtime = "nodejs"
// Une publication programmée avec vidéo peut prendre jusqu'à ~50s côté Meta (voir le polling dans
// social/graph.ts) — 60s est le maximum autorisé sur le plan Hobby (voir aussi social-publish.ts).
export const maxDuration = 60

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ir2f.lgef.fr"

/**
 * Publie les entrées PROGRAMME arrivées à échéance pour une liste de contenus (actualités ou
 * formations) — factorisé car la logique est identique des deux côtés, seule l'origine des
 * données change. Pas de filtre `where` sur reseauxPublies (comportement ambigu SQL NULL vs
 * littéral JSON "null" selon la version Prisma) — filtrage en JS, volume trop faible pour que ça
 * pose un problème de performance.
 */
async function publishDueEntries(
  entities: { id: string; url: string; reseauxPublies: unknown }[],
  save: (id: string, reseauxPublies: ReseauxPublies) => Promise<unknown>,
  now: Date
): Promise<{ published: number; failed: number }> {
  let published = 0
  let failed = 0

  for (const entity of entities) {
    const reseauxPublies = { ...((entity.reseauxPublies as ReseauxPublies | null) ?? {}) }
    const dues = Object.entries(reseauxPublies).filter(
      ([, etat]) => etat.statut === "PROGRAMME" && etat.scheduledFor && new Date(etat.scheduledFor) <= now
    )
    if (dues.length === 0) continue

    for (const [compteId, etat] of dues) {
      const compte = getSocialAccountById(compteId)
      if (!compte) {
        reseauxPublies[compteId] = { ...etat, statut: "ECHEC", error: "Compte introuvable." }
        failed++
        continue
      }
      try {
        const { postId } = await publishToSocialAccount(compte, etat.message, entity.url, etat.mediaMode ?? "LIEN", etat.mediaUrl)
        reseauxPublies[compteId] = { ...etat, statut: "PUBLIE", publishedAt: now.toISOString(), postId }
        published++
      } catch (e) {
        reseauxPublies[compteId] = { ...etat, statut: "ECHEC", error: e instanceof Error ? e.message : "Erreur inattendue." }
        failed++
      }
    }

    await save(entity.id, reseauxPublies)
  }

  return { published, failed }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()

  const [articles, formations] = await Promise.all([
    prisma.article.findMany({ select: { id: true, slug: true, reseauxPublies: true } }),
    prisma.formation.findMany({ select: { id: true, slug: true, lienExterne: true, reseauxPublies: true } }),
  ])

  const articleResult = await publishDueEntries(
    articles.map((a) => ({ id: a.id, url: `${SITE_URL}/actualites/${a.slug}`, reseauxPublies: a.reseauxPublies })),
    (id, reseauxPublies) => prisma.article.update({ where: { id }, data: { reseauxPublies } }),
    now
  )
  const formationResult = await publishDueEntries(
    formations.map((f) => ({ id: f.id, url: f.lienExterne || `${SITE_URL}/formations/${f.slug}`, reseauxPublies: f.reseauxPublies })),
    (id, reseauxPublies) => prisma.formation.update({ where: { id }, data: { reseauxPublies } }),
    now
  )

  return NextResponse.json({
    published: articleResult.published + formationResult.published,
    failed: articleResult.failed + formationResult.failed,
  })
}
