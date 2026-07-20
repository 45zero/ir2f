"use server"

import { revalidatePath } from "next/cache"
import * as XLSX from "xlsx"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"

export type ImportStagiairesState = { error: string | null; imported: number | null }

/**
 * Gabarit LGEF (colonnes fixes, 1 ou 2 lignes d'en-tête puis les données — la ligne d'en-tête
 * est détectée par son contenu, voir isHeaderRow, pas par un nombre de lignes fixe) :
 * Le club accueil du stagiaire (Nom du Club, Numéro d'affiliation, Mail club/employeur),
 * Information stagiaire (Civilité, Nom, Prénom, Date de naissance, Adresse, CP, Ville,
 * Téléphone, Mail), Information tuteur (Nom, Prénom, Mail), Information maître de stage
 * (Nom, Prénom, Adresse, CP, Ville, Mail).
 */
const COLUMN_INDEX = {
  clubNom: 0,
  clubNumeroAffiliation: 1,
  clubMail: 2,
  civilite: 3,
  nom: 4,
  prenom: 5,
  dateNaissance: 6,
  adresse: 7,
  cp: 8,
  ville: 9,
  telephone: 10,
  email: 11,
  tuteurNom: 12,
  tuteurPrenom: 13,
  tuteurMail: 14,
  maitreDeStageNom: 15,
  maitreDeStagePrenom: 16,
  maitreDeStageAdresse: 17,
  maitreDeStageCp: 18,
  maitreDeStageVille: 19,
  maitreDeStageMail: 20,
} as const

const COLUMN_COUNT = 21

function cell(row: unknown[], index: number): string {
  const value = row[index]
  return value === undefined || value === null ? "" : String(value).trim()
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
}

/**
 * Le gabarit peut avoir 1 ou 2 lignes d'en-tête selon la version du fichier (ligne de groupes
 * fusionnés optionnelle au-dessus des noms de colonnes) — plutôt que de deviner un nombre fixe
 * de lignes à sauter, on repère la ligne d'en-tête par son contenu : la colonne "Nom" du
 * stagiaire y contient littéralement "Nom".
 */
function isHeaderRow(row: unknown[]): boolean {
  return normalize(cell(row, COLUMN_INDEX.nom)) === "nom"
}

export async function importStagiairesExcel(
  formationId: string,
  _prev: ImportStagiairesState | undefined,
  formData: FormData
): Promise<ImportStagiairesState> {
  await requireAdmin()

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) return { error: "Sélectionnez un fichier Excel (.xlsx).", imported: null }

  let rows: unknown[][]
  let detailHeaderRow: unknown[]
  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const allRows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, raw: false, defval: "" })
    detailHeaderRow = allRows.find(isHeaderRow) ?? []
    rows = allRows.filter((row) => !isHeaderRow(row))
  } catch {
    return { error: "Ce fichier Excel est illisible ou corrompu.", imported: null }
  }

  if (rows.length === 0) return { error: "Le fichier ne contient aucune ligne de données.", imported: null }

  let imported = 0
  for (const row of rows) {
    const nom = cell(row, COLUMN_INDEX.nom)
    const prenom = cell(row, COLUMN_INDEX.prenom)
    const email = cell(row, COLUMN_INDEX.email)
    if (!nom || !prenom || !email) continue

    const extra: Record<string, string> = {}
    for (let i = COLUMN_COUNT; i < row.length; i++) {
      const value = cell(row, i)
      if (!value) continue
      extra[cell(detailHeaderRow, i) || `colonne_${i + 1}`] = value
    }

    const data = {
      club: cell(row, COLUMN_INDEX.clubNom) || null,
      numeroAffiliationClub: cell(row, COLUMN_INDEX.clubNumeroAffiliation) || null,
      emailClub: cell(row, COLUMN_INDEX.clubMail) || null,
      civilite: cell(row, COLUMN_INDEX.civilite) || null,
      nom,
      prenom,
      dateNaissance: cell(row, COLUMN_INDEX.dateNaissance) || null,
      adresse: cell(row, COLUMN_INDEX.adresse) || null,
      cp: cell(row, COLUMN_INDEX.cp) || null,
      ville: cell(row, COLUMN_INDEX.ville) || null,
      telephone: cell(row, COLUMN_INDEX.telephone) || null,
      tuteurNom: cell(row, COLUMN_INDEX.tuteurNom) || null,
      tuteurPrenom: cell(row, COLUMN_INDEX.tuteurPrenom) || null,
      tuteurEmail: cell(row, COLUMN_INDEX.tuteurMail) || null,
      maitreDeStageNom: cell(row, COLUMN_INDEX.maitreDeStageNom) || null,
      maitreDeStagePrenom: cell(row, COLUMN_INDEX.maitreDeStagePrenom) || null,
      maitreDeStageAdresse: cell(row, COLUMN_INDEX.maitreDeStageAdresse) || null,
      maitreDeStageCp: cell(row, COLUMN_INDEX.maitreDeStageCp) || null,
      maitreDeStageVille: cell(row, COLUMN_INDEX.maitreDeStageVille) || null,
      maitreDeStageEmail: cell(row, COLUMN_INDEX.maitreDeStageMail) || null,
      donneesSupplementaires: Object.keys(extra).length > 0 ? extra : undefined,
    }

    await prisma.conventionStagiaire.upsert({
      where: { formationId_email: { formationId, email } },
      update: data,
      create: { ...data, formationId, email },
    })
    imported++
  }

  revalidatePath(`/admin/formations/${formationId}/conventions`)
  return {
    error: imported === 0 ? "Aucune ligne valide importée — Nom, Prénom et Mail du stagiaire sont obligatoires (colonnes E, F, L)." : null,
    imported,
  }
}
