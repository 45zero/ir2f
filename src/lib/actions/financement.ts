"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber, parseJsonArray } from "@/lib/actions/form-utils"
import { resolveImageUrl } from "@/lib/storage"

export type FinancementActionState = { error: string | null }

function revalidateFinancement() {
  revalidatePath("/admin/financement")
  revalidatePath("/financement")
}

// ─── Dispositifs ───────────────────────────────────────

export async function saveDispositifFormation(
  _prev: FinancementActionState | undefined,
  formData: FormData
): Promise<FinancementActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const resume = optionalStr(formData, "resume")
  const contenu = str(formData, "contenu")
  const montantMisEnAvant = optionalStr(formData, "montantMisEnAvant")
  const videoUrl = optionalStr(formData, "videoUrl")
  const ordre = optionalNumber(formData, "ordre") ?? 0
  const image = await resolveImageUrl(formData, "image", "financement/dispositifs")

  if (!titre || !contenu) {
    return { error: "Le titre et le contenu sont obligatoires." }
  }

  const data = { titre, resume, contenu, montantMisEnAvant, videoUrl, image, ordre }
  if (id) {
    await prisma.dispositifFormation.update({ where: { id }, data })
  } else {
    await prisma.dispositifFormation.create({ data })
  }
  revalidateFinancement()
  return { error: null }
}

export async function deleteDispositifFormation(id: string) {
  await requireAdmin()
  await prisma.dispositifFormation.delete({ where: { id } })
  revalidateFinancement()
}

export async function setDispositifFormationActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.dispositifFormation.update({ where: { id }, data: { actif } })
  revalidateFinancement()
}

// ─── Liens ──────────────────────────────────────────────

export async function saveLienFormation(
  _prev: FinancementActionState | undefined,
  formData: FormData
): Promise<FinancementActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const dispositifId = str(formData, "dispositifId")
  const label = str(formData, "label")
  const url = str(formData, "url")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!dispositifId || !label || !url) {
    return { error: "Le dispositif, le libellé et l'URL sont obligatoires." }
  }

  const data = { dispositifId, label, url, ordre }
  if (id) {
    await prisma.lienFormation.update({ where: { id }, data })
  } else {
    await prisma.lienFormation.create({ data })
  }
  revalidateFinancement()
  return { error: null }
}

export async function deleteLienFormation(id: string) {
  await requireAdmin()
  await prisma.lienFormation.delete({ where: { id } })
  revalidateFinancement()
}

export async function setLienFormationActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.lienFormation.update({ where: { id }, data: { actif } })
  revalidateFinancement()
}

// ─── Contacts ───────────────────────────────────────────

export async function saveContactFormation(
  _prev: FinancementActionState | undefined,
  formData: FormData
): Promise<FinancementActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const dispositifId = str(formData, "dispositifId")
  const zone = optionalStr(formData, "zone")
  const nom = str(formData, "nom")
  const telephone = optionalStr(formData, "telephone")
  const email = optionalStr(formData, "email")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!dispositifId || !nom) {
    return { error: "Le dispositif et le nom sont obligatoires." }
  }

  const data = { dispositifId, zone, nom, telephone, email, ordre }
  if (id) {
    await prisma.contactFormation.update({ where: { id }, data })
  } else {
    await prisma.contactFormation.create({ data })
  }
  revalidateFinancement()
  return { error: null }
}

export async function deleteContactFormation(id: string) {
  await requireAdmin()
  await prisma.contactFormation.delete({ where: { id } })
  revalidateFinancement()
}

export async function setContactFormationActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.contactFormation.update({ where: { id }, data: { actif } })
  revalidateFinancement()
}

// ─── Tableaux ───────────────────────────────────────────

export async function saveDispositifFormationTableau(
  _prev: FinancementActionState | undefined,
  formData: FormData
): Promise<FinancementActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const dispositifId = str(formData, "dispositifId")
  const titre = optionalStr(formData, "titre")
  const entetes = parseJsonArray<string>(formData, "entetes")
  const lignes = parseJsonArray<string[]>(formData, "lignes")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!dispositifId || entetes.length === 0) {
    return { error: "Le dispositif et au moins une colonne sont obligatoires." }
  }

  const data = { dispositifId, titre, entetes, lignes, ordre }
  if (id) {
    await prisma.dispositifFormationTableau.update({ where: { id }, data })
  } else {
    await prisma.dispositifFormationTableau.create({ data })
  }
  revalidateFinancement()
  return { error: null }
}

export async function deleteDispositifFormationTableau(id: string) {
  await requireAdmin()
  await prisma.dispositifFormationTableau.delete({ where: { id } })
  revalidateFinancement()
}

export async function setDispositifFormationTableauActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.dispositifFormationTableau.update({ where: { id }, data: { actif } })
  revalidateFinancement()
}
