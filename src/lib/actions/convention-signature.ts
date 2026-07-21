"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"
import { downloadStorageFile, uploadBytes } from "@/lib/storage"
import { stampSignature, finalizeConvention } from "@/lib/conventions/pdf"
import { SIGNATURE_FIELD_NAMES, SIGNATAIRE_ORDER } from "@/lib/conventions/variables"
import { notifyAdminSignatureProgress } from "@/lib/emails/convention-notifications"
import { avancerConvention } from "@/lib/actions/conventions"
import { str, optionalStr } from "@/lib/actions/form-utils"

export type SignatureActionState = { error: string | null; success: boolean }

async function loadActionableSignataire(token: string) {
  const signataire = await prisma.conventionSignataire.findUnique({
    where: { token },
    include: { conventionStagiaire: { include: { formation: { select: { id: true, titre: true } } } } },
  })
  const error =
    !signataire
      ? "Ce lien de signature est invalide."
      : signataire.statut === "SIGNE"
        ? "Cette étape a déjà été signée."
        : signataire.statut === "REFUSE"
          ? "Cette étape a été refusée. Contactez l'administrateur IR2F."
          : signataire.statut === "NON_ENVOYE"
            ? "Ce n'est pas encore votre tour de signer."
            : null

  return { signataire: error ? null : signataire, error }
}

export async function signerConvention(
  token: string,
  _prev: SignatureActionState | undefined,
  formData: FormData
): Promise<SignatureActionState> {
  const { signataire, error } = await loadActionableSignataire(token)
  if (error || !signataire) return { error: error ?? "Signataire introuvable.", success: false }
  const stagiaire = signataire.conventionStagiaire

  if (formData.get("consent") !== "on") return { error: "Vous devez cocher la case de consentement.", success: false }

  const signatureDataUrl = str(formData, "signatureImage")
  const base64 = signatureDataUrl.split(",")[1]
  if (!base64) return { error: "Merci de dessiner ou taper votre nom avant de signer.", success: false }
  const pngBytes = Buffer.from(base64, "base64")

  if (!stagiaire.pdfStoragePath) return { error: "Document introuvable.", success: false }

  const signatureStoragePath = `conventions/signatures/${signataire.id}.png`
  await uploadBytes(pngBytes, signatureStoragePath, "image/png")

  const signedAt = new Date()
  const currentPdf = await downloadStorageFile(stagiaire.pdfStoragePath)
  let updatedPdf = await stampSignature(currentPdf, SIGNATURE_FIELD_NAMES[signataire.role], pngBytes, signedAt)
  if (signataire.ordre === SIGNATAIRE_ORDER.length - 1) updatedPdf = await finalizeConvention(updatedPdf)
  await uploadBytes(updatedPdf, stagiaire.pdfStoragePath, "application/pdf")

  const hdrs = await headers()
  const ipAddress = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || null
  const userAgent = hdrs.get("user-agent")
  const documentHash = crypto.createHash("sha256").update(updatedPdf).digest("hex")

  await prisma.conventionSignataire.update({
    where: { id: signataire.id },
    data: { statut: "SIGNE", signedAt, ipAddress, userAgent, documentHash, signatureStoragePath },
  })

  await avancerConvention(stagiaire.id, signataire.ordre)
  await notifyAdminSignatureProgress({
    formationTitre: stagiaire.formation.titre,
    stagiairePrenom: stagiaire.prenom,
    stagiaireNom: stagiaire.nom,
    role: signataire.role,
    refused: false,
  })

  revalidatePath(`/admin/formations/${stagiaire.formation.id}/conventions`)
  return { error: null, success: true }
}

export async function refuserConvention(
  token: string,
  _prev: SignatureActionState | undefined,
  formData: FormData
): Promise<SignatureActionState> {
  const { signataire, error } = await loadActionableSignataire(token)
  if (error || !signataire) return { error: error ?? "Signataire introuvable.", success: false }
  const stagiaire = signataire.conventionStagiaire
  const motif = optionalStr(formData, "motif")

  await prisma.conventionSignataire.update({
    where: { id: signataire.id },
    data: { statut: "REFUSE", refusedAt: new Date(), motifRefus: motif },
  })

  await notifyAdminSignatureProgress({
    formationTitre: stagiaire.formation.titre,
    stagiairePrenom: stagiaire.prenom,
    stagiaireNom: stagiaire.nom,
    role: signataire.role,
    refused: true,
    motif,
  })

  revalidatePath(`/admin/formations/${stagiaire.formation.id}/conventions`)
  return { error: null, success: true }
}
