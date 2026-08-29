"use server"

import { revalidatePath } from "next/cache"
import crypto from "crypto"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { uploadBytes } from "@/lib/storage"
import { str } from "@/lib/actions/form-utils"
import { notifyResponsablePedagogiqueASigner } from "@/lib/emails/convention-notifications"

export type EnvoyerSignatureFormationState = { error: string | null }

/**
 * Envoie au responsable pédagogique désigné le lien pour signer UNE FOIS pour toute la formation
 * (voir Formation.responsablePedagogiqueSignature* — sa signature est ensuite incrustée
 * automatiquement dans le PDF de chaque stagiaire à sa génération, voir conventions.ts).
 */
export async function envoyerSignatureResponsablePedagogique(formationId: string): Promise<EnvoyerSignatureFormationState> {
  await requireAdmin()

  const formation = await prisma.formation.findUnique({
    where: { id: formationId },
    include: { responsablePedagogiqueUser: { select: { nom: true, prenom: true, email: true } } },
  })
  if (!formation) return { error: "Formation introuvable." }
  if (!formation.responsablePedagogiqueUser) return { error: "Aucun responsable pédagogique désigné pour cette formation." }
  if (formation.responsablePedagogiqueSignatureSignedAt) return { error: "Le responsable pédagogique a déjà signé pour cette formation." }

  const token = crypto.randomUUID()
  await prisma.formation.update({
    where: { id: formationId },
    data: { responsablePedagogiqueSignatureToken: token, responsablePedagogiqueSignatureEnvoyeAt: new Date() },
  })

  const { sent } = await notifyResponsablePedagogiqueASigner({
    email: formation.responsablePedagogiqueUser.email,
    nom: `${formation.responsablePedagogiqueUser.prenom} ${formation.responsablePedagogiqueUser.nom}`,
    formationTitre: formation.titre,
    token,
  })
  if (!sent) return { error: "Échec de l'envoi de l'email au responsable pédagogique — réessayez dans quelques minutes." }

  revalidatePath(`/admin/formations/${formationId}/conventions`)
  return { error: null }
}

export type SignatureFormationActionState = { error: string | null; success: boolean }

/** Enregistre la signature unique du responsable pédagogique pour une formation. */
export async function signerFormationResponsablePedagogique(
  token: string,
  _prev: SignatureFormationActionState | undefined,
  formData: FormData
): Promise<SignatureFormationActionState> {
  const formation = await prisma.formation.findUnique({ where: { responsablePedagogiqueSignatureToken: token } })
  if (!formation) return { error: "Ce lien de signature est invalide.", success: false }
  if (formation.responsablePedagogiqueSignatureSignedAt) {
    return { error: "Vous avez déjà signé pour cette formation.", success: false }
  }

  if (formData.get("consent") !== "on") return { error: "Vous devez cocher la case de consentement.", success: false }

  const signatureDataUrl = str(formData, "signatureImage")
  const base64 = signatureDataUrl.split(",")[1]
  if (!base64) return { error: "Merci de dessiner ou taper votre nom avant de signer.", success: false }
  const pngBytes = Buffer.from(base64, "base64")

  const storagePath = `conventions/formation-signatures/${formation.id}.png`
  await uploadBytes(pngBytes, storagePath, "image/png")

  const hdrs = await headers()
  const ipAddress = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || null
  const userAgent = hdrs.get("user-agent")

  await prisma.formation.update({
    where: { id: formation.id },
    data: {
      responsablePedagogiqueSignatureStoragePath: storagePath,
      responsablePedagogiqueSignatureSignedAt: new Date(),
      responsablePedagogiqueSignatureIpAddress: ipAddress,
      responsablePedagogiqueSignatureUserAgent: userAgent,
    },
  })

  revalidatePath(`/admin/formations/${formation.id}/conventions`)
  return { error: null, success: true }
}
