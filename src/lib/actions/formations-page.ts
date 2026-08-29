"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber, parseJsonArray } from "@/lib/actions/form-utils"
import { resolveImageUrl } from "@/lib/storage"
import { Prisma } from "@/generated/prisma"
import type { CategorieFormation, EffetVisuel, FormationOngletCle, TuileFont } from "@/generated/prisma"

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
  const textColor = str(formData, "textColor") || "#1a3a6b"
  const textFont = (str(formData, "textFont") || "HEADING") as TuileFont
  const arrowColor = str(formData, "arrowColor") || "#1a3a6b"

  const data = { label, image, backgroundColor, opacity, effetVisuel, textColor, textFont, arrowColor }

  await prisma.formationTuile.upsert({
    where: { categorie },
    create: { categorie, ...data },
    update: data,
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
  const videoFichierUrl = optionalStr(formData, "videoFichier")
  const image = await resolveImageUrl(formData, "image", `formations-onglets/${categorie.toLowerCase()}-${onglet.toLowerCase()}`)
  const imageTaille = optionalNumber(formData, "imageTaille") ?? 100
  const backgroundColor = str(formData, "backgroundColor") || "#f5f7fb"
  const opacity = optionalNumber(formData, "opacity") ?? 100
  const effetVisuel = (str(formData, "effetVisuel") || "AUCUN") as EffetVisuel
  const formationVedetteId = optionalStr(formData, "formationVedetteId")

  const data = { titre, contenu, videoUrl, videoFichierUrl, image, imageTaille, backgroundColor, opacity, effetVisuel, formationVedetteId }

  await prisma.formationOnglet.upsert({
    where: { categorie_onglet: { categorie, onglet } },
    create: { categorie, onglet, ...data },
    update: data,
  })

  revalidateFormationsPage()
  return { error: null }
}

export async function saveFormationOngletTableau(
  categorie: CategorieFormation,
  onglet: FormationOngletCle,
  _prev: FormationsPageActionState | undefined,
  formData: FormData
): Promise<FormationsPageActionState> {
  await requireAdmin()

  const id = optionalStr(formData, "id")
  const titre = optionalStr(formData, "titre")
  const entetes = parseJsonArray<string>(formData, "entetes")
  const lignes = parseJsonArray<string[]>(formData, "lignes")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (entetes.length === 0) {
    return { error: "Au moins une colonne est obligatoire." }
  }

  const data = { categorie, onglet, titre, entetes, lignes, ordre }
  if (id) {
    await prisma.formationOngletTableau.update({ where: { id }, data })
  } else {
    await prisma.formationOngletTableau.create({ data })
  }

  revalidateFormationsPage()
  return { error: null }
}

export async function deleteFormationOngletTableau(id: string) {
  await requireAdmin()
  await prisma.formationOngletTableau.delete({ where: { id } })
  revalidateFormationsPage()
}

export async function setFormationOngletTableauActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.formationOngletTableau.update({ where: { id }, data: { actif } })
  revalidateFormationsPage()
}

export async function saveFormationOngletSection(
  categorie: CategorieFormation,
  onglet: FormationOngletCle,
  _prev: FormationsPageActionState | undefined,
  formData: FormData
): Promise<FormationsPageActionState> {
  await requireAdmin()

  const id = optionalStr(formData, "id")
  const titre = optionalStr(formData, "titre")
  const contenu = optionalStr(formData, "contenu")
  const videoUrl = optionalStr(formData, "videoUrl")
  const videoFichierUrl = optionalStr(formData, "videoFichier")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  const imageCount = optionalNumber(formData, "imageCount") ?? 0
  const images: string[] = []
  for (let j = 0; j < imageCount; j++) {
    const url = await resolveImageUrl(formData, `image_${j}`, `formations-sections/${categorie.toLowerCase()}-${onglet.toLowerCase()}-${j}`)
    if (url) images.push(url)
  }

  const tableauEntetesRaw = parseJsonArray<string>(formData, "tableauEntetes")
  const tableauLignesRaw = parseJsonArray<string[]>(formData, "tableauLignes")
  const hasTableau = tableauEntetesRaw.length > 0
  const tableauTitre = hasTableau ? optionalStr(formData, "tableauTitre") : null
  const tableauEntetes = hasTableau ? tableauEntetesRaw : Prisma.JsonNull
  const tableauLignes = hasTableau ? tableauLignesRaw : Prisma.JsonNull

  const lienLabel = optionalStr(formData, "lienLabel")
  const lienUrl = optionalStr(formData, "lienUrl")

  const data = {
    categorie,
    onglet,
    titre,
    contenu,
    images,
    videoUrl,
    videoFichierUrl,
    tableauTitre,
    tableauEntetes,
    tableauLignes,
    lienLabel,
    lienUrl,
    ordre,
  }

  if (id) {
    await prisma.formationOngletSection.update({ where: { id }, data })
  } else {
    await prisma.formationOngletSection.create({ data })
  }

  revalidateFormationsPage()
  return { error: null }
}

export async function deleteFormationOngletSection(id: string) {
  await requireAdmin()
  await prisma.formationOngletSection.delete({ where: { id } })
  revalidateFormationsPage()
}

export async function setFormationOngletSectionActif(id: string, actif: boolean) {
  await requireAdmin()
  await prisma.formationOngletSection.update({ where: { id }, data: { actif } })
  revalidateFormationsPage()
}
