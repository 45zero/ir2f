import "server-only"
import { prisma } from "@/lib/prisma"
import type { CategorieFormation, Filiere, GroupeEquivalence, VarianteNode } from "@/generated/prisma"
import { toCard, type FormationCard, type CatalogueFormation, type FormationOption } from "@/lib/formations-shared"

export { CATEGORIE_LABELS, TYPE_LABELS } from "@/lib/formations-shared"
export type { FormationCard, CatalogueFormation, FormationOption } from "@/lib/formations-shared"

const CARD_SELECT = {
  id: true,
  slug: true,
  titre: true,
  categorie: true,
  dureeLabel: true,
  image: true,
  cpfEligible: true,
  modeLabel: true,
  type: true,
} as const

export async function getPublishedFormations(): Promise<FormationCard[]> {
  const formations = await prisma.formation.findMany({
    where: { statut: "PUBLIEE" },
    orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
    select: CARD_SELECT,
  })
  return formations.map(toCard)
}

export async function getFormationsByCategorie(categorie: CategorieFormation): Promise<FormationCard[]> {
  const formations = await prisma.formation.findMany({
    where: { statut: "PUBLIEE", categorie },
    orderBy: { ordre: "asc" },
    select: CARD_SELECT,
  })
  return formations.map(toCard)
}

const CATALOGUE_SELECT = {
  ...CARD_SELECT,
  description: true,
  filiere: true,
  groupeEquivalence: true,
  varianteNode: true,
  badgeNode: true,
  shortNode: true,
} as const

export async function getCatalogueFormations(): Promise<CatalogueFormation[]> {
  const formations = await prisma.formation.findMany({
    where: { statut: "PUBLIEE" },
    orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
    select: CATALOGUE_SELECT,
  })
  return formations.map((f) => ({
    ...toCard(f),
    description: f.description,
    filiere: f.filiere,
    groupeEquivalence: f.groupeEquivalence,
    varianteNode: f.varianteNode,
    badgeNode: f.badgeNode,
    shortNode: f.shortNode,
  }))
}

export async function getCategorieInfos(): Promise<
  Record<CategorieFormation, { titre: string; corps: string } | null>
> {
  const rows = await prisma.categorieInfo.findMany()
  const map = {
    EDUCATEUR: null,
    ARBITRAGE: null,
    TERRAIN: null,
    CLUB: null,
    DEV: null,
  } as Record<CategorieFormation, { titre: string; corps: string } | null>
  for (const row of rows) {
    map[row.categorie] = { titre: row.titre, corps: row.corps }
  }
  return map
}

export async function getFormationOptions(): Promise<FormationOption[]> {
  const formations = await prisma.formation.findMany({
    where: { statut: "PUBLIEE" },
    orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
    select: { id: true, titre: true },
  })
  return formations
}

export async function getFormationBySlug(slug: string) {
  return prisma.formation.findUnique({
    where: { slug },
    include: {
      sessions: { orderBy: { dateDebut: "asc" } },
    },
  })
}

export async function getInscriptionStatusMessage(userId: string, formationId: string): Promise<string | undefined> {
  const inscription = await prisma.inscription.findUnique({
    where: { userId_formationId: { userId, formationId } },
  })
  if (inscription) return "Vous êtes déjà inscrit à cette formation."

  const demande = await prisma.demandeInscription.findFirst({
    where: { userId, formationId, statut: "EN_ATTENTE" },
  })
  if (demande) return "Votre demande est déjà en cours de traitement."

  return undefined
}

// Ré-export pour les call sites qui référencent encore ces types Prisma via ce module.
export type { Filiere, GroupeEquivalence, VarianteNode }
