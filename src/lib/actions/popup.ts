"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber } from "@/lib/actions/form-utils"
import { resolveImageUrl } from "@/lib/storage"
import type { TypePopup, TypeLien } from "@/generated/prisma"

export type PopupActionState = { error: string | null }

function revalidatePopups() {
  revalidatePath("/admin/popup")
  revalidatePath("/", "layout")
}

function optionalDate(formData: FormData, key: string): Date | null {
  const raw = optionalStr(formData, key)
  return raw ? new Date(raw) : null
}

export async function savePopup(
  _prev: PopupActionState | undefined,
  formData: FormData
): Promise<PopupActionState> {
  await requireAdmin()
  const id = optionalStr(formData, "id")
  const type = (str(formData, "type") || "ANNONCE") as TypePopup
  const titre = str(formData, "titre")
  const texte = str(formData, "texte")

  if (!titre || !texte) {
    return { error: "Le titre et le texte sont obligatoires." }
  }

  const image = await resolveImageUrl(formData, "image", "popups")
  const signatureUrl = await resolveImageUrl(formData, "signature", "popups-signatures")

  const data = {
    type,
    titre,
    texte,
    image,
    auteurNom: optionalStr(formData, "auteurNom"),
    auteurFonction: optionalStr(formData, "auteurFonction"),
    signatureUrl,
    youtubeUrl: optionalStr(formData, "youtubeUrl"),
    videoFichierUrl: optionalStr(formData, "videoFichier"),
    lienLabel: optionalStr(formData, "lienLabel"),
    lienUrl: optionalStr(formData, "lienUrl"),
    lienType: (str(formData, "lienType") || "INTERNE") as TypeLien,
    delaiAffichage: optionalNumber(formData, "delaiAffichage") ?? 4,
    dateDebut: optionalDate(formData, "dateDebut"),
    dateFin: optionalDate(formData, "dateFin"),
    ordre: optionalNumber(formData, "ordre") ?? 0,
  }

  if (id) {
    await prisma.popup.update({ where: { id }, data })
  } else {
    await prisma.popup.create({ data })
  }
  revalidatePopups()
  return { error: null }
}

export async function deletePopup(id: string) {
  await requireAdmin()
  await prisma.popup.delete({ where: { id } })
  revalidatePopups()
}

export async function setPopupActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.popup.update({ where: { id }, data: { actif } })
  revalidatePopups()
}
