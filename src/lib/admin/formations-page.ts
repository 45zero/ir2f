import "server-only"
import { prisma } from "@/lib/prisma"
import { getFormationOnglets, getFormationTuiles, type FormationOngletData, type FormationTuileData } from "@/lib/formations"
import { ONGLET_KEYS, ongletKeyId, type OngletKey } from "@/lib/formations-page-shared"

export type AdminFormationTuile = FormationTuileData

export async function getAllFormationTuilesAdmin(): Promise<AdminFormationTuile[]> {
  return getFormationTuiles()
}

export type AdminFormationOption = { id: string; titre: string; categorie: string }

export async function getAllFormationOptionsAdmin(): Promise<AdminFormationOption[]> {
  const formations = await prisma.formation.findMany({
    orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
    select: { id: true, titre: true, categorie: true },
  })
  return formations
}

export type AdminFormationOngletTableau = {
  id: string
  titre: string | null
  entetes: string[]
  lignes: string[][]
  ordre: number
  actif: boolean
}

export type AdminFormationOngletSection = {
  id: string
  titre: string | null
  contenu: string | null
  images: string[]
  pdfs: { url: string; nom: string }[]
  videoUrl: string | null
  videoFichierUrl: string | null
  tableauTitre: string | null
  tableauEntetes: string[] | null
  tableauLignes: string[][] | null
  lienLabel: string | null
  lienUrl: string | null
  ordre: number
  actif: boolean
}

export type AdminFormationOnglet = OngletKey &
  FormationOngletData & { tableaux: AdminFormationOngletTableau[]; sections: AdminFormationOngletSection[] }

export async function getAllFormationOngletsAdmin(): Promise<AdminFormationOnglet[]> {
  const [byKey, tableauRows, sectionRows] = await Promise.all([
    getFormationOnglets(),
    prisma.formationOngletTableau.findMany({ orderBy: { ordre: "asc" } }),
    prisma.formationOngletSection.findMany({ orderBy: { ordre: "asc" } }),
  ])
  const tableauxByKey = new Map<string, AdminFormationOngletTableau[]>()
  for (const t of tableauRows) {
    const key = ongletKeyId(t.categorie, t.onglet)
    const list = tableauxByKey.get(key) ?? []
    list.push({ id: t.id, titre: t.titre, entetes: t.entetes as string[], lignes: t.lignes as string[][], ordre: t.ordre, actif: t.actif })
    tableauxByKey.set(key, list)
  }
  const sectionsByKey = new Map<string, AdminFormationOngletSection[]>()
  for (const s of sectionRows) {
    const key = ongletKeyId(s.categorie, s.onglet)
    const list = sectionsByKey.get(key) ?? []
    list.push({
      id: s.id,
      titre: s.titre,
      contenu: s.contenu,
      images: (s.images as string[] | null) ?? [],
      pdfs: (s.pdfs as { url: string; nom: string }[] | null) ?? [],
      videoUrl: s.videoUrl,
      videoFichierUrl: s.videoFichierUrl,
      tableauTitre: s.tableauTitre,
      tableauEntetes: (s.tableauEntetes as string[] | null) ?? null,
      tableauLignes: (s.tableauLignes as string[][] | null) ?? null,
      lienLabel: s.lienLabel,
      lienUrl: s.lienUrl,
      ordre: s.ordre,
      actif: s.actif,
    })
    sectionsByKey.set(key, list)
  }
  return ONGLET_KEYS.map((key) => {
    const id = ongletKeyId(key.categorie, key.onglet)
    return { ...key, ...byKey[id], tableaux: tableauxByKey.get(id) ?? [], sections: sectionsByKey.get(id) ?? [] }
  })
}
