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
 * Envoie au responsable pédagogique désigné le lien pour signer UNE FOIS pour toute la session
 * (voir Session.responsablePedagogiqueSignature* — sa signature est ensuite incrustée
 * automatiquement dans le PDF de chaque stagiaire de cette session à sa génération, voir
 * conventions.ts).
 */
export async function envoyerSignatureResponsablePedagogique(sessionId: string): Promise<EnvoyerSignatureFormationState> {
  await requireAdmin()

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      formation: { select: { id: true, titre: true } },
      responsablePedagogiqueUser: { select: { nom: true, prenom: true, email: true } },
    },
  })
  if (!session) return { error: "Session introuvable." }
  if (!session.responsablePedagogiqueUser) return { error: "Aucun responsable pédagogique désigné pour cette session." }
  if (session.responsablePedagogiqueSignatureSignedAt) return { error: "Le responsable pédagogique a déjà signé pour cette session." }

  const token = crypto.randomUUID()
  await prisma.session.update({
    where: { id: sessionId },
    data: { responsablePedagogiqueSignatureToken: token, responsablePedagogiqueSignatureEnvoyeAt: new Date() },
  })

  const { sent } = await notifyResponsablePedagogiqueASigner({
    email: session.responsablePedagogiqueUser.email,
    nom: `${session.responsablePedagogiqueUser.prenom} ${session.responsablePedagogiqueUser.nom}`,
    formationTitre: session.formation.titre,
    token,
  })
  if (!sent) return { error: "Échec de l'envoi de l'email au responsable pédagogique — réessayez dans quelques minutes." }

  revalidatePath(`/admin/formations/${session.formation.id}/conventions/${sessionId}`)
  return { error: null }
}

export type SignatureFormationActionState = { error: string | null; success: boolean }

/** Enregistre la signature unique du responsable pédagogique pour une session. */
export async function signerFormationResponsablePedagogique(
  token: string,
  _prev: SignatureFormationActionState | undefined,
  formData: FormData
): Promise<SignatureFormationActionState> {
  const session = await prisma.session.findUnique({ where: { responsablePedagogiqueSignatureToken: token } })
  if (!session) return { error: "Ce lien de signature est invalide.", success: false }
  if (session.responsablePedagogiqueSignatureSignedAt) {
    return { error: "Vous avez déjà signé pour cette session.", success: false }
  }

  if (formData.get("consent") !== "on") return { error: "Vous devez cocher la case de consentement.", success: false }

  const signatureDataUrl = str(formData, "signatureImage")
  const base64 = signatureDataUrl.split(",")[1]
  if (!base64) return { error: "Merci de dessiner ou taper votre nom avant de signer.", success: false }
  const pngBytes = Buffer.from(base64, "base64")

  const storagePath = `conventions/session-signatures/${session.id}.png`
  await uploadBytes(pngBytes, storagePath, "image/png")

  const hdrs = await headers()
  const ipAddress = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || null
  const userAgent = hdrs.get("user-agent")

  await prisma.session.update({
    where: { id: session.id },
    data: {
      responsablePedagogiqueSignatureStoragePath: storagePath,
      responsablePedagogiqueSignatureSignedAt: new Date(),
      responsablePedagogiqueSignatureIpAddress: ipAddress,
      responsablePedagogiqueSignatureUserAgent: userAgent,
    },
  })

  revalidatePath(`/admin/formations/${session.formationId}/conventions/${session.id}`)
  return { error: null, success: true }
}
