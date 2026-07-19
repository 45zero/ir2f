"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber } from "@/lib/actions/form-utils"
import type { IconeAccompagnement } from "@/generated/prisma"

export type AccueilActionState = { error: string | null }

function revalidateAccueil() {
  revalidatePath("/admin/accueil")
  revalidatePath("/")
}

// ─── Carrousel (hero slides) ───────────────────────────

export async function saveHeroSlide(
  _prev: AccueilActionState | undefined,
  formData: FormData
): Promise<AccueilActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const badge = str(formData, "badge")
  const titre = str(formData, "titre")
  const image = str(formData, "image")
  const ctaLabel = str(formData, "ctaLabel") || "En savoir plus"
  const formationId = optionalStr(formData, "formationId")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!badge || !titre || !image) {
    return { error: "Le badge, le titre et l'image sont obligatoires." }
  }

  const data = { badge, titre, image, ctaLabel, formationId, ordre }
  if (id) {
    await prisma.heroSlide.update({ where: { id }, data })
  } else {
    await prisma.heroSlide.create({ data })
  }
  revalidateAccueil()
  return { error: null }
}

export async function deleteHeroSlide(id: string) {
  await requireAdmin()
  await prisma.heroSlide.delete({ where: { id } })
  revalidateAccueil()
}

export async function setHeroSlideActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.heroSlide.update({ where: { id }, data: { actif } })
  revalidateAccueil()
}

// ─── Chiffres clés ──────────────────────────────────────

export async function saveStatCle(
  _prev: AccueilActionState | undefined,
  formData: FormData
): Promise<AccueilActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const valeur = str(formData, "valeur")
  const label = str(formData, "label")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!valeur || !label) {
    return { error: "La valeur et le label sont obligatoires." }
  }

  const data = { valeur, label, ordre }
  if (id) {
    await prisma.statCle.update({ where: { id }, data })
  } else {
    await prisma.statCle.create({ data })
  }
  revalidateAccueil()
  return { error: null }
}

export async function deleteStatCle(id: string) {
  await requireAdmin()
  await prisma.statCle.delete({ where: { id } })
  revalidateAccueil()
}

export async function setStatCleActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.statCle.update({ where: { id }, data: { actif } })
  revalidateAccueil()
}

// ─── Cartes "Accompagnement Emploi" ────────────────────

export async function saveAccompagnementCard(
  _prev: AccueilActionState | undefined,
  formData: FormData
): Promise<AccueilActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const description = str(formData, "description")
  const icone = str(formData, "icone") as IconeAccompagnement
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!titre || !description || !icone) {
    return { error: "Le titre, la description et l'icône sont obligatoires." }
  }

  const data = { titre, description, icone, ordre }
  if (id) {
    await prisma.accompagnementCard.update({ where: { id }, data })
  } else {
    await prisma.accompagnementCard.create({ data })
  }
  revalidateAccueil()
  return { error: null }
}

export async function deleteAccompagnementCard(id: string) {
  await requireAdmin()
  await prisma.accompagnementCard.delete({ where: { id } })
  revalidateAccueil()
}

export async function setAccompagnementCardActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.accompagnementCard.update({ where: { id }, data: { actif } })
  revalidateAccueil()
}

// ─── Textes (bandeau, accompagnement, contact) ─────────

export async function saveAccueilContenu(
  _prev: AccueilActionState | undefined,
  formData: FormData
): Promise<AccueilActionState> {
  await requireAdmin()

  const data = {
    bandeauEmploiTitre: str(formData, "bandeauEmploiTitre"),
    accompagnementEyebrow: str(formData, "accompagnementEyebrow"),
    accompagnementTitre: str(formData, "accompagnementTitre"),
    contactTitre: str(formData, "contactTitre"),
    contactSousTitre: str(formData, "contactSousTitre"),
  }

  if (Object.values(data).some((v) => !v)) {
    return { error: "Tous les champs sont obligatoires." }
  }

  await prisma.accueilContenu.upsert({
    where: { id: "accueil" },
    create: { id: "accueil", ...data },
    update: data,
  })
  revalidateAccueil()
  return { error: null }
}
