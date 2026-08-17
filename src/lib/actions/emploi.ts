"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber } from "@/lib/actions/form-utils"
import { resolveImageUrl } from "@/lib/storage"
import type { SectionEmploi, TypeDocument, IconePratique } from "@/generated/prisma"

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
  const dispositifId = optionalStr(formData, "dispositifId")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!titre || !url || !section) {
    return { error: "Titre, URL et section sont obligatoires." }
  }

  const data = { titre, url, type, section, dispositifId, ordre }
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
  const dispositifId = optionalStr(formData, "dispositifId")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!titre || !url) return { error: "Titre et URL sont obligatoires." }

  const data = { titre, url, description, section, dispositifId, ordre }
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

// ─── Dispositifs de financement (onglets "Financements") ─

export async function saveDispositifFinancement(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const resume = optionalStr(formData, "resume")
  const contenu = str(formData, "contenu")
  const montantMisEnAvant = optionalStr(formData, "montantMisEnAvant")
  const videoUrl = optionalStr(formData, "videoUrl")
  const ordre = optionalNumber(formData, "ordre") ?? 0
  const image = await resolveImageUrl(formData, "image", "emploi/dispositifs")

  if (!titre || !contenu) {
    return { error: "Le titre et le contenu sont obligatoires." }
  }

  const data = { titre, resume, contenu, montantMisEnAvant, videoUrl, image, ordre }
  if (id) {
    await prisma.dispositifFinancement.update({ where: { id }, data })
  } else {
    await prisma.dispositifFinancement.create({ data })
  }
  revalidateEmploi()
  return { error: null }
}

export async function deleteDispositifFinancement(id: string) {
  await requireAdmin()
  await prisma.dispositifFinancement.delete({ where: { id } })
  revalidateEmploi()
}

export async function setDispositifFinancementActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.dispositifFinancement.update({ where: { id }, data: { actif } })
  revalidateEmploi()
}

// ─── Référents régionaux (rattachés à un dispositif) ──────

export async function saveReferentEmploi(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const dispositifId = str(formData, "dispositifId")
  const departement = str(formData, "departement")
  const referent = str(formData, "referent")
  const email = optionalStr(formData, "email")
  const codeFiche = optionalStr(formData, "codeFiche")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!dispositifId || !departement || !referent) {
    return { error: "Le dispositif, le département et le référent sont obligatoires." }
  }

  const data = { dispositifId, departement, referent, email, codeFiche, ordre }
  if (id) {
    await prisma.referentEmploi.update({ where: { id }, data })
  } else {
    await prisma.referentEmploi.create({ data })
  }
  revalidateEmploi()
  return { error: null }
}

export async function deleteReferentEmploi(id: string) {
  await requireAdmin()
  await prisma.referentEmploi.delete({ where: { id } })
  revalidateEmploi()
}

export async function setReferentEmploiActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.referentEmploi.update({ where: { id }, data: { actif } })
  revalidateEmploi()
}

// ─── Cartes "pratiques" (Gestion de l'emploi) ─────────────

export async function savePratiqueEmploiCard(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const description = optionalStr(formData, "description")
  const icone = (str(formData, "icone") || "AUTRE") as IconePratique
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!titre) return { error: "Le titre est obligatoire." }

  const data = { titre, description, icone, ordre }
  if (id) {
    await prisma.pratiqueEmploiCard.update({ where: { id }, data })
  } else {
    await prisma.pratiqueEmploiCard.create({ data })
  }
  revalidateEmploi()
  return { error: null }
}

export async function deletePratiqueEmploiCard(id: string) {
  await requireAdmin()
  await prisma.pratiqueEmploiCard.delete({ where: { id } })
  revalidateEmploi()
}

export async function setPratiqueEmploiCardActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.pratiqueEmploiCard.update({ where: { id }, data: { actif } })
  revalidateEmploi()
}

// ─── Contenus de page (singletons) ────────────────────────

export async function saveEmploiPageContenu(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const introTexte = str(formData, "introTexte")
  const introListe = str(formData, "introListe")
  const videoCommunauteUrl = optionalStr(formData, "videoCommunauteUrl")

  const data = { introTexte, introListe, videoCommunauteUrl }
  await prisma.emploiPageContenu.upsert({
    where: { id: "emploi" },
    create: { id: "emploi", ...data },
    update: data,
  })
  revalidateEmploi()
  return { error: null }
}

export async function saveGestionEmploiContenu(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const data = {
    eLearningTitre: optionalStr(formData, "eLearningTitre"),
    eLearningTexte: optionalStr(formData, "eLearningTexte"),
    eLearningLienLabel: optionalStr(formData, "eLearningLienLabel"),
    eLearningLienUrl: optionalStr(formData, "eLearningLienUrl"),
    creerEmploiTexte: str(formData, "creerEmploiTexte"),
    creerEmploiLienLabel: optionalStr(formData, "creerEmploiLienLabel"),
    creerEmploiLienUrl: optionalStr(formData, "creerEmploiLienUrl"),
    communauteTitre: optionalStr(formData, "communauteTitre"),
    communauteTexte: optionalStr(formData, "communauteTexte"),
    communauteVideoUrl: optionalStr(formData, "communauteVideoUrl"),
    communauteLienEnSavoirPlusUrl: optionalStr(formData, "communauteLienEnSavoirPlusUrl"),
    communauteLienRejoindreUrl: optionalStr(formData, "communauteLienRejoindreUrl"),
  }

  await prisma.gestionEmploiContenu.upsert({
    where: { id: "gestion-emploi" },
    create: { id: "gestion-emploi", ...data },
    update: data,
  })
  revalidateEmploi()
  return { error: null }
}

export async function saveFormationEmployabiliteContenu(
  _prev: EmploiActionState | undefined,
  formData: FormData
): Promise<EmploiActionState> {
  await requireAdmin()
  const data = {
    introTexte: optionalStr(formData, "introTexte"),
    indicateursNote: optionalStr(formData, "indicateursNote"),
  }

  await prisma.formationEmployabiliteContenu.upsert({
    where: { id: "formation-employabilite" },
    create: { id: "formation-employabilite", ...data },
    update: data,
  })
  revalidateEmploi()
  return { error: null }
}
