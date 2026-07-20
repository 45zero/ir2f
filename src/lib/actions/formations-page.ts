"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber } from "@/lib/actions/form-utils"
import { resolveImageUrl } from "@/lib/storage"
import type { CategorieFormation, EffetVisuel, FormationOngletCle } from "@/generated/prisma"

export type FormationsPageActionState = { error: string | null }

function revalidateFormationsPage() {
  revalidatePath("/admin/formations-page")
  revalidatePath("/formations")
}

export async function saveFormationTuile(
  categorie: CategorieFormation,
  _prev: FormationsPageActionState | undefined,
  formData: FormData
): Promise<FormationsPageActionState> {
  await requireAdmin()

  const label = str(formData, "label")
  if (!label) return { error: "Le libellé est obligatoire." }

  const image = await resolveImageUrl(formData, "image", `formations-tuiles/${categorie.toLowerCase()}`)
  const backgroundColor = str(formData, "backgroundColor") || "#c9a84c"
  const opacity = optionalNumber(formData, "opacity") ?? 100
  const effetVisuel = (str(formData, "effetVisuel") || "AUCUN") as EffetVisuel

  await prisma.formationTuile.upsert({
    where: { categorie },
    create: { categorie, label, image, backgroundColor, opacity, effetVisuel },
    update: { label, image, backgroundColor, opacity, effetVisuel },
  })

  revalidateFormationsPage()
  return { error: null }
}

export async function saveFormationOnglet(
  categorie: CategorieFormation,
  onglet: FormationOngletCle,
  _prev: FormationsPageActionState | undefined,
  formData: FormData
): Promise<FormationsPageActionState> {
  await requireAdmin()

  const titre = optionalStr(formData, "titre")
  const contenu = optionalStr(formData, "contenu")
  const videoUrl = optionalStr(formData, "videoUrl")
  const image = await resolveImageUrl(formData, "image", `formations-onglets/${categorie.toLowerCase()}-${onglet.toLowerCase()}`)
  const imageTaille = optionalNumber(formData, "imageTaille") ?? 100
  const backgroundColor = str(formData, "backgroundColor") || "#f5f7fb"
  const opacity = optionalNumber(formData, "opacity") ?? 100
  const effetVisuel = (str(formData, "effetVisuel") || "AUCUN") as EffetVisuel

  const data = { titre, contenu, videoUrl, image, imageTaille, backgroundColor, opacity, effetVisuel }

  await prisma.formationOnglet.upsert({
    where: { categorie_onglet: { categorie, onglet } },
    create: { categorie, onglet, ...data },
    update: data,
  })

  revalidateFormationsPage()
  return { error: null }
}
