"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { optionalStr } from "@/lib/actions/form-utils"
import { resolveDocumentUrl } from "@/lib/storage"
import type { TutorielInscriptionCible, TutorielInscriptionMode } from "@/generated/prisma"

export type TutorielInscriptionActionState = { error: string | null }

function revalidateTutoriels() {
  revalidatePath("/admin/tutoriels-inscription")
  revalidatePath("/formations", "layout")
}

export async function saveTutorielInscription(
  cible: TutorielInscriptionCible,
  _prev: TutorielInscriptionActionState | undefined,
  formData: FormData
): Promise<TutorielInscriptionActionState> {
  await requireAdmin()

  const mode = (optionalStr(formData, "mode") ?? "LIEN") as TutorielInscriptionMode
  const lienUrl = optionalStr(formData, "lienUrl")
  const pdfUrl = await resolveDocumentUrl(formData, "pdf", `tutoriels-inscription/${cible.toLowerCase()}`)
  const youtubeUrl = optionalStr(formData, "youtubeUrl")
  const videoFichierUrl = optionalStr(formData, "videoFichier")

  if (mode === "LIEN" && !lienUrl) return { error: "Un lien est obligatoire pour le mode redirection." }
  if (mode === "PDF" && !pdfUrl) return { error: "Un fichier PDF est obligatoire pour le mode PDF." }
  if (mode === "VIDEO" && !youtubeUrl && !videoFichierUrl) {
    return { error: "Une vidéo (lien YouTube ou fichier) est obligatoire pour le mode vidéo." }
  }

  await prisma.tutorielInscription.upsert({
    where: { cible },
    create: { cible, mode, lienUrl, pdfUrl, youtubeUrl, videoFichierUrl },
    update: { mode, lienUrl, pdfUrl, youtubeUrl, videoFichierUrl },
  })

  revalidateTutoriels()
  return { error: null }
}

export async function deleteTutorielInscription(cible: TutorielInscriptionCible) {
  await requireAdmin()
  await prisma.tutorielInscription.deleteMany({ where: { cible } })
  revalidateTutoriels()
}
