import "server-only"
import { prisma } from "@/lib/prisma"
import type { CategorieFormation, EffetVisuel, Filiere, GroupeEquivalence, TuileFont, VarianteNode } from "@/generated/prisma"
import { toCard, TYPE_LABELS, type FormationCard, type CatalogueFormation, type FormationOption } from "@/lib/formations-shared"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"
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
  fafaEligible: true,
  bonFormationEligible: true,
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
  textColor: string
  textFont: TuileFont
  arrowColor: string
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
      textColor: row?.textColor ?? "#1a3a6b",
      textFont: row?.textFont ?? "HEADING",
      arrowColor: row?.arrowColor ?? "#1a3a6b",
    }
  })
}

export type FormationOngletTableauData = {
  id: string
  titre: string | null
  entetes: string[]
  lignes: string[][]
}

export type FormationOngletSectionData = {
  id: string
  titre: string | null
  contenu: string | null
  images: string[]
  videoUrl: string | null
  videoFichierUrl: string | null
  tableauTitre: string | null
  tableauEntetes: string[] | null
  tableauLignes: string[][] | null
  lienLabel: string | null
  lienUrl: string | null
}

export type FormationVedetteData = {
  slug: string
  titre: string
  dureeLabel: string | null
  modeLabel: string
  cpfEligible: boolean
  fafaEligible: boolean
  bonFormationEligible: boolean
}

export type FormationOngletData = {
  titre: string | null
  contenu: string | null
  videoUrl: string | null
  videoFichierUrl: string | null
  image: string | null
  imageTaille: number
  backgroundColor: string
  opacity: number
  effetVisuel: EffetVisuel
  tableaux: FormationOngletTableauData[]
  sections: FormationOngletSectionData[]
  formationVedetteId: string | null
  formationVedette: FormationVedetteData | null
}

export async function getFormationOnglets(): Promise<Record<string, FormationOngletData>> {
  const [rows, tableauRows, sectionRows] = await Promise.all([
    prisma.formationOnglet.findMany({
      include: {
        formationVedette: {
          select: { slug: true, titre: true, dureeLabel: true, modeLabel: true, type: true, cpfEligible: true, fafaEligible: true, bonFormationEligible: true },
        },
      },
    }),
    prisma.formationOngletTableau.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
    prisma.formationOngletSection.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
  ])
  const byKey = new Map(rows.map((r) => [ongletKeyId(r.categorie, r.onglet), r]))
  const tableauxByKey = new Map<string, FormationOngletTableauData[]>()
  for (const t of tableauRows) {
    const key = ongletKeyId(t.categorie, t.onglet)
    const list = tableauxByKey.get(key) ?? []
    list.push({ id: t.id, titre: t.titre, entetes: t.entetes as string[], lignes: t.lignes as string[][] })
    tableauxByKey.set(key, list)
  }
  const sectionsByKey = new Map<string, FormationOngletSectionData[]>()
  for (const s of sectionRows) {
    const key = ongletKeyId(s.categorie, s.onglet)
    const list = sectionsByKey.get(key) ?? []
    list.push({
      id: s.id,
      titre: s.titre,
      contenu: s.contenu,
      images: (s.images as string[] | null) ?? [],
      videoUrl: s.videoUrl,
      videoFichierUrl: s.videoFichierUrl,
      tableauTitre: s.tableauTitre,
      tableauEntetes: (s.tableauEntetes as string[] | null) ?? null,
      tableauLignes: (s.tableauLignes as string[][] | null) ?? null,
      lienLabel: s.lienLabel,
      lienUrl: s.lienUrl,
    })
    sectionsByKey.set(key, list)
  }
  const result: Record<string, FormationOngletData> = {}
  for (const { categorie, onglet } of ONGLET_KEYS) {
    const key = ongletKeyId(categorie, onglet)
    const row = byKey.get(key)
    result[key] = {
      titre: row?.titre ?? ongletDefaultTitre(categorie, onglet),
      contenu: row?.contenu ?? ongletDefaultContenu(categorie, onglet),
      videoUrl: row?.videoUrl ?? null,
      videoFichierUrl: row?.videoFichierUrl ?? null,
      image: row?.image ?? null,
      imageTaille: row?.imageTaille ?? 100,
      backgroundColor: row?.backgroundColor ?? "#f5f7fb",
      opacity: row?.opacity ?? 100,
      effetVisuel: row?.effetVisuel ?? "AUCUN",
      formationVedetteId: row?.formationVedetteId ?? null,
      formationVedette: row?.formationVedette
        ? {
            slug: row.formationVedette.slug,
            titre: row.formationVedette.titre,
            dureeLabel: row.formationVedette.dureeLabel,
            modeLabel: row.formationVedette.modeLabel ?? TYPE_LABELS[row.formationVedette.type],
            cpfEligible: row.formationVedette.cpfEligible,
            fafaEligible: row.formationVedette.fafaEligible,
            bonFormationEligible: row.formationVedette.bonFormationEligible,
          }
        : null,
      tableaux: tableauxByKey.get(key) ?? [],
      sections: sectionsByKey.get(key) ?? [],
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
  const formation = await prisma.formation.findUnique({
    where: { slug },
    include: {
      sessions: { orderBy: { dateDebut: "asc" } },
      documents: { where: { visiblePublic: true }, orderBy: [{ ordre: "asc" }, { createdAt: "desc" }] },
    },
  })
  if (!formation) return null

  const documentsUtiles = await Promise.all(
    formation.documents.map(async (d) => {
      // previewUrl : sans Content-Disposition: attachment, pour un rendu inline dans l'iframe
      // d'aperçu — l'url "download" forcerait le navigateur à annuler la navigation de l'iframe.
      const previewUrl = d.storagePath ? await getSignedDocumentUrl(d.storagePath) : d.url
      const downloadUrl = d.storagePath ? await getSignedDocumentDownloadUrl(d.storagePath, d.nom) : d.url
      return { id: d.id, nom: d.nom, url: downloadUrl, previewUrl, mimeType: d.mimeType }
    })
  )

  return { ...formation, documentsUtiles }
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
