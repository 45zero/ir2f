"use server"

import { revalidatePath } from "next/cache"
import { randomUUID } from "crypto"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { uploadBytes } from "@/lib/storage"
import { analyzeConventionPdf, type DetectedField } from "@/lib/conventions/template-analysis"
import { buildFillableTemplate, type TemplatePlacement } from "@/lib/conventions/pdf"

export type AnalyzeTemplateState = { error: string | null; fields: DetectedField[] | null; fileBase64: string | null }

/** Étape 1 de l'assistant : détecte mécaniquement les emplacements candidats (pointillés, cases, légendes de signature) dans un PDF brut. */
export async function analyzeTemplateUpload(fileBase64: string): Promise<AnalyzeTemplateState> {
  await requireAdmin()

  let fields: DetectedField[]
  try {
    const bytes = Buffer.from(fileBase64, "base64")
    fields = await analyzeConventionPdf(bytes)
  } catch {
    return { error: "Ce PDF est illisible ou corrompu.", fields: null, fileBase64: null }
  }

  if (fields.length === 0) {
    return {
      error: "Aucune ligne en pointillés, case à cocher ou légende de signature détectée dans ce PDF.",
      fields: null,
      fileBase64: null,
    }
  }

  return { error: null, fields, fileBase64 }
}

export type FinalizeTemplateState = { error: string | null; success: boolean }

/** Étape 2 : construit le PDF remplissable à partir des emplacements validés par l'admin, et crée le modèle. */
export async function finalizeConventionTemplate(params: {
  fileBase64: string
  nom: string
  placements: TemplatePlacement[]
}): Promise<FinalizeTemplateState> {
  await requireAdmin()

  const nom = params.nom.trim()
  if (!nom) return { error: "Le nom du modèle est obligatoire.", success: false }
  if (params.placements.length === 0) return { error: "Assignez au moins un champ avant de créer le modèle.", success: false }

  let fillable: Uint8Array
  try {
    const bytes = Buffer.from(params.fileBase64, "base64")
    fillable = await buildFillableTemplate(bytes, params.placements)
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Échec de la génération du modèle.", success: false }
  }

  const storagePath = `conventions/templates/${randomUUID()}.pdf`
  await uploadBytes(fillable, storagePath, "application/pdf")
  await prisma.conventionTemplate.create({ data: { nom, storagePath } })

  revalidatePath("/admin/conventions/templates")
  return { error: null, success: true }
}
