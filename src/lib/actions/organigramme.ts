"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { uploadDocumentFile } from "@/lib/storage"
import { ORGANIGRAMME_ID } from "@/lib/organigramme"

export type OrganigrammeActionState = { error: string | null }

export async function saveOrganigramme(
  _prev: OrganigrammeActionState | undefined,
  formData: FormData
): Promise<OrganigrammeActionState> {
  await requireAdmin()

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) return { error: "Sélectionnez un fichier PDF." }
  if (file.type && file.type !== "application/pdf") return { error: "L'organigramme doit être un fichier PDF." }

  const uploaded = await uploadDocumentFile(file, "organigramme")

  await prisma.organigramme.upsert({
    where: { id: ORGANIGRAMME_ID },
    create: { id: ORGANIGRAMME_ID, nom: file.name, storagePath: uploaded.storagePath },
    update: { nom: file.name, storagePath: uploaded.storagePath },
  })

  revalidatePath("/contact")
  revalidatePath("/admin/organigramme")
  return { error: null }
}
