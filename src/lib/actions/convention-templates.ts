"use server"

import { revalidatePath } from "next/cache"
import { randomUUID } from "crypto"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str } from "@/lib/actions/form-utils"
import { uploadBytes } from "@/lib/storage"
import { listTemplateFieldNames } from "@/lib/conventions/pdf"

export type ConventionTemplateActionState = { error: string | null }

export async function uploadConventionTemplate(
  _prev: ConventionTemplateActionState | undefined,
  formData: FormData
): Promise<ConventionTemplateActionState> {
  await requireAdmin()

  const nom = str(formData, "nom")
  const file = formData.get("file")
  if (!nom) return { error: "Le nom du modèle est obligatoire." }
  if (!(file instanceof File) || file.size === 0) return { error: "Sélectionnez un fichier PDF." }
  if (file.type && file.type !== "application/pdf") return { error: "Le modèle doit être un fichier PDF." }

  const bytes = new Uint8Array(await file.arrayBuffer())

  let fieldNames: string[]
  try {
    fieldNames = await listTemplateFieldNames(bytes)
  } catch {
    return { error: "Ce PDF est illisible ou corrompu." }
  }
  if (fieldNames.length === 0) {
    return {
      error:
        "Ce PDF ne contient aucun champ de formulaire remplissable. Le modèle doit être créé (Word/LibreOffice/Acrobat) avec des champs nommés selon la liste des variables attendues.",
    }
  }

  const storagePath = `conventions/templates/${randomUUID()}.pdf`
  await uploadBytes(bytes, storagePath, "application/pdf")

  await prisma.conventionTemplate.create({ data: { nom, storagePath } })

  revalidatePath("/admin/conventions/templates")
  return { error: null }
}

export async function deleteConventionTemplate(id: string): Promise<ConventionTemplateActionState> {
  await requireAdmin()
  try {
    await prisma.conventionTemplate.delete({ where: { id } })
  } catch {
    return { error: "Impossible de supprimer : ce modèle est associé à au moins une formation." }
  }
  revalidatePath("/admin/conventions/templates")
  return { error: null }
}
