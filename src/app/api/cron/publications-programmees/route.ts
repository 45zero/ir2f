import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { publishToFacebookPage, publishToInstagram } from "@/lib/social/graph"
import { getSocialAccountById } from "@/lib/social/accounts"
import type { ReseauxPublies } from "@/lib/articles-shared"

export const runtime = "nodejs"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ir2f.lgef.fr"

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Pas de filtre `where` sur reseauxPublies (le comportement du filtre JSON "not: null" varie
  // selon qu'on parle de NULL SQL ou du littéral JSON "null") — on filtre simplement en JS
  // ci-dessous, volume d'articles trop faible pour que ça pose un problème de performance.
  const now = new Date()
  const articles = await prisma.article.findMany({ select: { id: true, slug: true, reseauxPublies: true } })

  let published = 0
  let failed = 0

  for (const article of articles) {
    const reseauxPublies = { ...((article.reseauxPublies as ReseauxPublies | null) ?? {}) }
    const dues = Object.entries(reseauxPublies).filter(
      ([, etat]) => etat.statut === "PROGRAMME" && etat.scheduledFor && new Date(etat.scheduledFor) <= now
    )
    if (dues.length === 0) continue

    const articleUrl = `${SITE_URL}/actualites/${article.slug}`

    for (const [compteId, etat] of dues) {
      const compte = getSocialAccountById(compteId)
      if (!compte) {
        reseauxPublies[compteId] = { ...etat, statut: "ECHEC", error: "Compte introuvable." }
        failed++
        continue
      }
      try {
        const { postId } =
          compte.plateforme === "FACEBOOK"
            ? await publishToFacebookPage(compte.externalId, compte.accessToken, { message: etat.message, link: articleUrl })
            : await publishToInstagram(compte.externalId, compte.accessToken, {
                imageUrl: etat.imageUrl ?? "",
                caption: `${etat.message}\n\n${articleUrl}`,
              })
        reseauxPublies[compteId] = { ...etat, statut: "PUBLIE", publishedAt: now.toISOString(), postId }
        published++
      } catch (e) {
        reseauxPublies[compteId] = { ...etat, statut: "ECHEC", error: e instanceof Error ? e.message : "Erreur inattendue." }
        failed++
      }
    }

    await prisma.article.update({ where: { id: article.id }, data: { reseauxPublies } })
  }

  return NextResponse.json({ published, failed })
}
