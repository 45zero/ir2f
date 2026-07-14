"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import crypto from "crypto"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { str, optionalStr } from "@/lib/actions/form-utils"
import { SIGNATURE_CONSENT_TEXT } from "@/lib/signature-consent"

export type DocumentActionState = { error: string | null }

export async function uploadDocument(
  _prev: DocumentActionState | undefined,
  formData: FormData
): Promise<DocumentActionState> {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const nom = str(formData, "nom")
  const url = str(formData, "url")
  const formationId = optionalStr(formData, "formationId")
  const isPublic = formData.get("public") === "on"

  if (!nom || !url) {
    return { error: "Le nom et le lien du document sont obligatoires." }
  }

  await prisma.document.create({
    data: { nom, url, formationId, uploaderId: session.user.id, public: isPublic },
  })

  revalidatePath("/dashboard/documents")
  return { error: null }
}

export async function broadcastDocumentToFormation(
  _prev: DocumentActionState | undefined,
  formData: FormData
): Promise<DocumentActionState> {
  const session = await auth()
  if (session?.user?.role !== "FORMATEUR") redirect("/dashboard")

  const formationId = str(formData, "formationId")
  const nom = str(formData, "nom")
  const url = str(formData, "url")
  const submittedIds = formData.getAll("stagiaires").map(String).filter(Boolean)

  if (!formationId) return { error: "Formation introuvable." }
  if (!nom || !url) return { error: "Le nom et le lien du document sont obligatoires." }
  if (submittedIds.length === 0) return { error: "Sélectionnez au moins un stagiaire destinataire." }

  const link = await prisma.formationFormateur.findUnique({
    where: { userId_formationId: { userId: session.user.id, formationId } },
  })
  if (!link) return { error: "Vous n'encadrez pas cette formation." }

  const roster = await prisma.inscription.findMany({
    where: { formationId, statut: "VALIDEE", userId: { in: submittedIds } },
    select: { userId: true },
  })
  const recipientIds = roster.map((r) => r.userId)
  if (recipientIds.length === 0) return { error: "Aucun destinataire valide sélectionné." }

  await prisma.$transaction(async (tx) => {
    const document = await tx.document.create({
      data: { nom, url, formationId, uploaderId: session.user.id, public: false },
    })
    await tx.message.create({
      data: {
        expediteurId: session.user.id,
        sujet: `Nouveau document — ${nom}`,
        contenu: `Un nouveau document a été partagé pour votre formation : ${nom}.`,
        formationId,
        documentId: document.id,
        destinataires: { create: recipientIds.map((userId) => ({ userId })) },
      },
    })
  })

  revalidatePath("/dashboard/formations")
  revalidatePath("/dashboard/messages")
  return { error: null }
}

export async function signDocument(documentId: string) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const doc = await prisma.document.findUnique({
    where: { id: documentId },
    select: { id: true, nom: true, url: true },
  })
  if (!doc) redirect("/dashboard/documents")

  const hdrs = await headers()
  const ipAddress = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || null
  const userAgent = hdrs.get("user-agent")
  const documentHash = crypto.createHash("sha256").update(`${doc.id}:${doc.nom}:${doc.url}`).digest("hex")

  await prisma.signature.upsert({
    where: { documentId_userId: { documentId, userId: session.user.id } },
    update: {},
    create: {
      documentId,
      userId: session.user.id,
      consentText: SIGNATURE_CONSENT_TEXT,
      ipAddress,
      userAgent,
      documentHash,
    },
  })

  revalidatePath("/dashboard/documents")
}

export async function deleteDocument(id: string): Promise<DocumentActionState> {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const doc = await prisma.document.findUnique({ where: { id }, select: { uploaderId: true } })
  if (!doc) return { error: "Document introuvable." }
  if (doc.uploaderId !== session.user.id) {
    return { error: "Vous ne pouvez supprimer que vos propres documents." }
  }

  try {
    await prisma.document.delete({ where: { id } })
  } catch {
    return { error: "Impossible de supprimer : des signatures sont liées à ce document." }
  }

  revalidatePath("/dashboard/documents")
  return { error: null }
}
