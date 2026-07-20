import "server-only"
import { prisma } from "@/lib/prisma"
import type { CategorieFormation, EffetVisuel, Filiere, GroupeEquivalence, VarianteNode } from "@/generated/prisma"
import { toCard, type FormationCard, type CatalogueFormation, type FormationOption } from "@/lib/formations-shared"
import {
  ONGLET_KEYS,
  TUILE_CATEGORIES,
  TUILE_DEFAULTS,
  ongletDefaultContenu,
  ongletDefaultTitre,
  ongletKeyId,
} from "@/lib/formations-page-shared"

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

export type FormationTuileData = {
  categorie: CategorieFormation
  label: string
  image: string | null
  backgroundColor: string
  opacity: number
  effetVisuel: EffetVisuel
}

export async function getFormationTuiles(): Promise<FormationTuileData[]> {
  const rows = await prisma.formationTuile.findMany()
  const byCategorie = new Map(rows.map((r) => [r.categorie, r]))
  return TUILE_CATEGORIES.map((categorie) => {
    const row = byCategorie.get(categorie)
    const fallback = TUILE_DEFAULTS[categorie]
    return {
      categorie,
      label: row?.label ?? fallback.label,
      image: row?.image ?? null,
      backgroundColor: row?.backgroundColor ?? fallback.backgroundColor,
      opacity: row?.opacity ?? 100,
      effetVisuel: row?.effetVisuel ?? "AUCUN",
    }
  })
}

export type FormationOngletData = {
  titre: string | null
  contenu: string | null
  videoUrl: string | null
  image: string | null
  imageTaille: number
  backgroundColor: string
  opacity: number
  effetVisuel: EffetVisuel
}

export async function getFormationOnglets(): Promise<Record<string, FormationOngletData>> {
  const rows = await prisma.formationOnglet.findMany()
  const byKey = new Map(rows.map((r) => [ongletKeyId(r.categorie, r.onglet), r]))
  const result: Record<string, FormationOngletData> = {}
  for (const { categorie, onglet } of ONGLET_KEYS) {
    const key = ongletKeyId(categorie, onglet)
    const row = byKey.get(key)
    result[key] = {
      titre: row?.titre ?? ongletDefaultTitre(categorie, onglet),
      contenu: row?.contenu ?? ongletDefaultContenu(categorie, onglet),
      videoUrl: row?.videoUrl ?? null,
      image: row?.image ?? null,
      imageTaille: row?.imageTaille ?? 100,
      backgroundColor: row?.backgroundColor ?? "#f5f7fb",
      opacity: row?.opacity ?? 100,
      effetVisuel: row?.effetVisuel ?? "AUCUN",
    }
  }
  return result
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
