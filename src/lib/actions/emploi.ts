"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber } from "@/lib/actions/form-utils"
import type { SectionEmploi, TypeDocument } from "@/generated/prisma"

export type EmploiActionState = { error: string | null }

function revalidateEmploi() {
  revalidatePath("/admin/emploi")
  revalidatePath("/emploi")
}

// ─── Documents passerelle ─────────────────────────────

export async function saveDocumentPasserelle(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const url = str(formData, "url")
  const type = str(formData, "type") as TypeDocument
  const section = str(formData, "section") as SectionEmploi
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!titre || !url || !section) {
    return { error: "Titre, URL et section sont obligatoires." }
  }

  const data = { titre, url, type, section, ordre }
  if (id) {
    await prisma.documentPasserelle.update({ where: { id }, data })
  } else {
    await prisma.documentPasserelle.create({ data })
  }
  revalidateEmploi()
  return { error: null }
}

export async function deleteDocumentPasserelle(id: string) {
  await requireAdmin()
  await prisma.documentPasserelle.delete({ where: { id } })
  revalidateEmploi()
}

export async function setDocumentPasserelleActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.documentPasserelle.update({ where: { id }, data: { actif } })
  revalidateEmploi()
}

// ─── Partenaires ──────────────────────────────────────

export async function savePartenaire(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const nom = str(formData, "nom")
  const logoUrl = optionalStr(formData, "logoUrl")
  const siteUrl = optionalStr(formData, "siteUrl")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!nom) return { error: "Le nom est obligatoire." }

  const data = { nom, logoUrl, siteUrl, ordre }
  if (id) {
    await prisma.partenaire.update({ where: { id }, data })
  } else {
    await prisma.partenaire.create({ data })
  }
  revalidateEmploi()
  return { error: null }
}

export async function deletePartenaire(id: string) {
  await requireAdmin()
  await prisma.partenaire.delete({ where: { id } })
  revalidateEmploi()
}

export async function setPartenaireActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.partenaire.update({ where: { id }, data: { actif } })
  revalidateEmploi()
}

// ─── Contacts ─────────────────────────────────────────

export async function saveContact(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const nom = str(formData, "nom")
  const prenom = optionalStr(formData, "prenom")
  const email = optionalStr(formData, "email")
  const telephone = optionalStr(formData, "telephone")
  const poste = optionalStr(formData, "poste")
  const section = optionalStr(formData, "section") as SectionEmploi | null
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!nom) return { error: "Le nom est obligatoire." }

  const data = { nom, prenom, email, telephone, poste, section, ordre }
  if (id) {
    await prisma.contact.update({ where: { id }, data })
  } else {
    await prisma.contact.create({ data })
  }
  revalidateEmploi()
  return { error: null }
}

export async function deleteContact(id: string) {
  await requireAdmin()
  await prisma.contact.delete({ where: { id } })
  revalidateEmploi()
}

export async function setContactActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.contact.update({ where: { id }, data: { actif } })
  revalidateEmploi()
}

// ─── Vidéos ───────────────────────────────────────────

export async function saveVideo(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const url = str(formData, "url")
  const description = optionalStr(formData, "description")
  const section = optionalStr(formData, "section") as SectionEmploi | null
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!titre || !url) return { error: "Titre et URL sont obligatoires." }

  const data = { titre, url, description, section, ordre }
  if (id) {
    await prisma.video.update({ where: { id }, data })
  } else {
    await prisma.video.create({ data })
  }
  revalidateEmploi()
  return { error: null }
}

export async function deleteVideo(id: string) {
  await requireAdmin()
  await prisma.video.delete({ where: { id } })
  revalidateEmploi()
}

export async function setVideoActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.video.update({ where: { id }, data: { actif } })
  revalidateEmploi()
}

// ─── Webinaires ───────────────────────────────────────

export async function saveWebinaire(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const description = optionalStr(formData, "description")
  const dateRaw = str(formData, "date")
  const lien = optionalStr(formData, "lien")

  if (!titre || !dateRaw) return { error: "Titre et date sont obligatoires." }

  const data = { titre, description, date: new Date(dateRaw), lien }
  if (id) {
    await prisma.webinaire.update({ where: { id }, data })
  } else {
    await prisma.webinaire.create({ data })
  }
  revalidateEmploi()
  return { error: null }
}

export async function deleteWebinaire(id: string) {
  await requireAdmin()
  await prisma.webinaire.delete({ where: { id } })
  revalidateEmploi()
}

export async function setWebinaireActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.webinaire.update({ where: { id }, data: { actif } })
  revalidateEmploi()
}
