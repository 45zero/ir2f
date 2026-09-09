"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr } from "@/lib/actions/form-utils"
import type { ReseauSocialPlateforme } from "@/generated/prisma"

export type SocialCompteActionState = { error: string | null }

export async function createSocialCompte(
  _prev: SocialCompteActionState | undefined,
  formData: FormData
): Promise<SocialCompteActionState> {
  await requireAdmin()

  const label = str(formData, "label")
  const plateforme = str(formData, "plateforme") as ReseauSocialPlateforme
  const externalId = str(formData, "externalId")
  const accessToken = str(formData, "accessToken")
  if (!label || !plateforme || !externalId || !accessToken) {
    return { error: "Tous les champs sont obligatoires." }
  }

  await prisma.reseauSocialCompte.create({ data: { label, plateforme, externalId, accessToken } })

  revalidatePath("/admin/reseaux-sociaux")
  redirect("/admin/reseaux-sociaux")
}

export async function updateSocialCompte(id: string, formData: FormData): Promise<SocialCompteActionState> {
  await requireAdmin()

  const label = str(formData, "label")
  const plateforme = str(formData, "plateforme") as ReseauSocialPlateforme
  const externalId = str(formData, "externalId")
  // Le token n'est jamais renvoyé en clair au formulaire — champ laissé vide = on garde l'existant.
  const accessToken = optionalStr(formData, "accessToken")
  if (!label || !plateforme || !externalId) {
    return { error: "Le label, la plateforme et l'identifiant sont obligatoires." }
  }

  await prisma.reseauSocialCompte.update({
    where: { id },
    data: { label, plateforme, externalId, ...(accessToken ? { accessToken } : {}) },
  })

  revalidatePath("/admin/reseaux-sociaux")
  redirect("/admin/reseaux-sociaux")
}

export async function setSocialCompteActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.reseauSocialCompte.update({ where: { id }, data: { actif } })
  revalidatePath("/admin/reseaux-sociaux")
}

export async function deleteSocialCompte(id: string): Promise<SocialCompteActionState> {
  await requireAdmin()
  await prisma.reseauSocialCompte.delete({ where: { id } })
  revalidatePath("/admin/reseaux-sociaux")
  return { error: null }
}
