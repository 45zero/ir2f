import "server-only"
import { prisma } from "@/lib/prisma"
import { getConfiguredSocialAccounts } from "@/lib/social/accounts"
import type { ReseauxPublies, PublicationEtat } from "@/lib/articles-shared"
import type { SocialPlateforme } from "@/lib/social/accounts"

export type PublicationRow = {
  articleId: string
  articleTitre: string
  compteId: string
  compteLabel: string
  plateforme: SocialPlateforme | null
  etat: PublicationEtat
}

export type ArticleAPublier = { articleId: string; titre: string }

/**
 * Vue de synthèse pour /admin/publications — aplatit tous les articles × comptes réseaux sociaux
 * en 4 listes. Volontairement pas de filtre `where` sur le JSON reseauxPublies (comportement
 * ambigu SQL NULL vs littéral JSON "null" selon la version Prisma) — le volume d'articles d'une
 * ligue régionale rend un filtrage en JS totalement raisonnable.
 */
export async function getPublicationsOverview() {
  const comptes = getConfiguredSocialAccounts()
  const articles = await prisma.article.findMany({
    select: { id: true, titre: true, publie: true, reseauxPublies: true },
    orderBy: { createdAt: "desc" },
  })

  const aPublier: ArticleAPublier[] = []
  const rows: PublicationRow[] = []

  for (const article of articles) {
    const etats = (article.reseauxPublies as ReseauxPublies | null) ?? {}
    const compteIdsAvecEtat = new Set(Object.keys(etats))

    for (const [compteId, etat] of Object.entries(etats)) {
      const compte = comptes.find((c) => c.id === compteId)
      rows.push({
        articleId: article.id,
        articleTitre: article.titre,
        compteId,
        compteLabel: compte?.label ?? "Compte supprimé",
        plateforme: compte?.plateforme ?? null,
        etat,
      })
    }

    if (article.publie && comptes.some((c) => !compteIdsAvecEtat.has(c.id))) {
      aPublier.push({ articleId: article.id, titre: article.titre })
    }
  }

  return {
    aPublier,
    programme: rows.filter((r) => r.etat.statut === "PROGRAMME").sort((a, b) => (a.etat.scheduledFor ?? "").localeCompare(b.etat.scheduledFor ?? "")),
    publie: rows
      .filter((r) => r.etat.statut === "PUBLIE")
      .sort((a, b) => (b.etat.publishedAt ?? "").localeCompare(a.etat.publishedAt ?? "")),
    echec: rows.filter((r) => r.etat.statut === "ECHEC"),
  }
}
