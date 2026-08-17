"use server"

import { revalidatePath } from "next/cache"
import * as XLSX from "xlsx"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"

export type ImportClubsState = { error: string | null; imported: number | null }

/**
 * Gabarit de l'export LGEF « club adresse et référent » (une seule ligne d'en-tête) : Club,
 * Complément (club), Voie-rue (club), Lieu-dit (club), Code postal (club), Bureau distributeur
 * (club), Numéro, Gestionnaire, Centre de gestion, Nom, Prénom, Civilité, Mobile personnel
 * correspondant, Email principal correspondant, Email officiel club. Seules l'adresse, le numéro
 * d'affiliation et l'email officiel sont retenus (le nom/prénom/civilité du correspondant n'est
 * pas forcément le représentant habilité à signer une convention, voir clubRepresentant* sur
 * ConventionStagiaire, renseigné par le stagiaire à la signature).
 */
const COLUMN_INDEX = {
  nom: 0,
  complement: 1,
  voieRue: 2,
  lieuDit: 3,
  codePostal: 4,
  bureauDistributeur: 5,
  numeroAffiliation: 6,
  emailOfficiel: 14,
} as const

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

/** La ligne d'en-tête est repérée par son contenu (colonne E = « Code postal (club) ») plutôt que par sa position, au cas où une ligne de titre serait ajoutée au-dessus. */
function isHeaderRow(row: unknown[]): boolean {
  return normalize(cell(row, COLUMN_INDEX.codePostal)) === "code postal (club)"
}

export async function importClubsExcel(_prev: ImportClubsState | undefined, formData: FormData): Promise<ImportClubsState> {
  await requireAdmin()

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) return { error: "Sélectionnez un fichier Excel (.xlsx).", imported: null }

  let rows: unknown[][]
  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const allRows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, raw: false, defval: "" })
    rows = allRows.filter((row) => !isHeaderRow(row))
  } catch {
    return { error: "Ce fichier Excel est illisible ou corrompu.", imported: null }
  }

  if (rows.length === 0) return { error: "Le fichier ne contient aucune ligne de données.", imported: null }

  let imported = 0
  for (const row of rows) {
    const nom = cell(row, COLUMN_INDEX.nom)
    if (!nom) continue

    const adresse = [cell(row, COLUMN_INDEX.complement), cell(row, COLUMN_INDEX.voieRue), cell(row, COLUMN_INDEX.lieuDit)]
      .filter(Boolean)
      .join(", ")

    const data = {
      adresse: adresse || null,
      cp: cell(row, COLUMN_INDEX.codePostal) || null,
      ville: cell(row, COLUMN_INDEX.bureauDistributeur) || null,
      numeroAffiliation: cell(row, COLUMN_INDEX.numeroAffiliation) || null,
      email: cell(row, COLUMN_INDEX.emailOfficiel) || null,
    }

    await prisma.club.upsert({
      where: { nom },
      update: data,
      create: { ...data, nom },
    })
    imported++
  }

  revalidatePath("/admin/clubs")
  return {
    error: imported === 0 ? "Aucune ligne valide importée — le nom du club (colonne A) est obligatoire." : null,
    imported,
  }
}
