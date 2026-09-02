"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber } from "@/lib/actions/form-utils"
import { resolveDocumentUrl } from "@/lib/storage"
import type { DocumentationFormat } from "@/generated/prisma"

export type DocumentationActionState = { error: string | null }

function revalidateDocumentation() {
  revalidatePath("/admin/documentation")
  revalidatePath("/documentation")
}

function formatFromUrl(url: string): DocumentationFormat {
  return /\.docx?($|\?)/i.test(url) ? "DOCX" : "PDF"
}

// ─── Groupes ────────────────────────────────────────

export async function saveDocumentationGroupe(
  _prev: DocumentationActionState | undefined,
  formData: FormData
): Promise<DocumentationActionState> {
  await requireAdmin()

  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const ordre = optionalNumber(formData, "ordre") ?? 0

  if (!titre) return { error: "Le titre est obligatoire." }

  const data = { titre, ordre }
  if (id) {
    await prisma.documentationGroupe.update({ where: { id }, data })
  } else {
    await prisma.documentationGroupe.create({ data })
  }

  revalidateDocumentation()
  return { error: null }
}

export async function deleteDocumentationGroupe(id: string) {
  await requireAdmin()
  await prisma.documentationGroupe.delete({ where: { id } })
  revalidateDocumentation()
}

// ─── Fichiers ───────────────────────────────────────

export async function saveDocumentationFichier(
  groupeId: string,
  _prev: DocumentationActionState | undefined,
  formData: FormData
): Promise<DocumentationActionState> {
  await requireAdmin()

  const id = optionalStr(formData, "id")
  const titre = str(formData, "titre")
  const description = optionalStr(formData, "description")
  const ordre = optionalNumber(formData, "ordre") ?? 0
  const url = await resolveDocumentUrl(formData, "fichier", `documentation/${groupeId}`)

  if (!titre) return { error: "Le titre est obligatoire." }
  if (!url) return { error: "Un fichier (PDF ou DOCX) est obligatoire." }

  const data = { groupeId, titre, description, ordre, url, format: formatFromUrl(url) }
  if (id) {
    await prisma.documentationFichier.update({ where: { id }, data })
  } else {
    await prisma.documentationFichier.create({ data })
  }

  revalidateDocumentation()
  return { error: null }
}

export async function deleteDocumentationFichier(id: string) {
  await requireAdmin()
  await prisma.documentationFichier.delete({ where: { id } })
  revalidateDocumentation()
}
