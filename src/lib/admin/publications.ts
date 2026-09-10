import "server-only"
import { prisma } from "@/lib/prisma"
import { getConfiguredSocialAccounts } from "@/lib/social/accounts"
import type { ReseauxPublies, PublicationEtat, PublishableType } from "@/lib/social/publication"
import type { SocialPlateforme } from "@/lib/social/accounts"

export type PublicationRow = {
  entityType: PublishableType
  entityId: string
  titre: string
  compteId: string
  compteLabel: string
  plateforme: SocialPlateforme | null
  etat: PublicationEtat
}

export type APublierItem = { entityType: PublishableType; entityId: string; titre: string }

/**
 * Vue de synthèse pour /admin/publications — aplatit Article × Formation × comptes réseaux
 * sociaux en 4 listes. Volontairement pas de filtre `where` sur le JSON reseauxPublies
 * (comportement ambigu SQL NULL vs littéral JSON "null" selon la version Prisma) — le volume de
 * contenu d'une ligue régionale rend un filtrage en JS totalement raisonnable.
 */
export async function getPublicationsOverview() {
  const comptes = getConfiguredSocialAccounts()

  const [articles, formations] = await Promise.all([
    prisma.article.findMany({
      select: { id: true, titre: true, publie: true, diffuserReseaux: true, reseauxPublies: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.formation.findMany({
      select: { id: true, titre: true, statut: true, diffuserReseaux: true, reseauxPublies: true },
      orderBy: { createdAt: "desc" },
    }),
  ])

  const aPublier: APublierItem[] = []
  const rows: PublicationRow[] = []

  function collect(entityType: PublishableType, id: string, titre: string, estPublie: boolean, diffuserReseaux: boolean, reseauxPubliesRaw: unknown) {
    const etats = (reseauxPubliesRaw as ReseauxPublies | null) ?? {}
    const compteIdsAvecEtat = new Set(Object.keys(etats))

    for (const [compteId, etat] of Object.entries(etats)) {
      const compte = comptes.find((c) => c.id === compteId)
      rows.push({
        entityType,
        entityId: id,
        titre,
        compteId,
        compteLabel: compte?.label ?? "Compte supprimé",
        plateforme: compte?.plateforme ?? null,
        etat,
      })
    }

    if (estPublie && diffuserReseaux && comptes.some((c) => !compteIdsAvecEtat.has(c.id))) {
      aPublier.push({ entityType, entityId: id, titre })
    }
  }

  for (const article of articles) collect("ARTICLE", article.id, article.titre, article.publie, article.diffuserReseaux, article.reseauxPublies)
  for (const formation of formations)
    collect("FORMATION", formation.id, formation.titre, formation.statut === "PUBLIEE", formation.diffuserReseaux, formation.reseauxPublies)

  return {
    aPublier,
    programme: rows.filter((r) => r.etat.statut === "PROGRAMME").sort((a, b) => (a.etat.scheduledFor ?? "").localeCompare(b.etat.scheduledFor ?? "")),
    publie: rows
      .filter((r) => r.etat.statut === "PUBLIE")
      .sort((a, b) => (b.etat.publishedAt ?? "").localeCompare(a.etat.publishedAt ?? "")),
    echec: rows.filter((r) => r.etat.statut === "ECHEC"),
  }
}
