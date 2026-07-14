"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import crypto from "crypto"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { str, optionalStr } from "@/lib/actions/form-utils"
import { SIGNATURE_CONSENT_TEXT } from "@/lib/signature-consent"
import { uploadDocumentFile } from "@/lib/storage"
import { notifyDocumentSignataires } from "@/lib/emails/document-notifications"
import type { Role } from "@/generated/prisma"

export type DocumentActionState = { error: string | null }

const VALID_ROLES: Role[] = ["STAGIAIRE", "FORMATEUR", "ADMIN", "DIRECTION"]

function parseRolesRequis(formData: FormData): Role[] {
  const submitted = formData.getAll("rolesRequis").map(String)
  const roles = submitted.filter((r): r is Role => (VALID_ROLES as string[]).includes(r))
  return roles.length > 0 ? roles : ["STAGIAIRE"]
}

async function resolveUploadedFile(
  formData: FormData,
  keyHint: string
): Promise<{ url: string | null; storagePath: string | null; mimeType: string | null; taille: number | null } | { error: string }> {
  const file = formData.get("file")
  if (file instanceof File && file.size > 0) {
    if (file.type && file.type !== "application/pdf") {
      return { error: "Seuls les fichiers PDF sont acceptés." }
    }
    try {
      const uploaded = await uploadDocumentFile(file, keyHint)
      return { url: null, storagePath: uploaded.storagePath, mimeType: uploaded.mimeType, taille: uploaded.taille }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Échec de l'upload du fichier." }
    }
  }
  const url = str(formData, "url")
  if (!url) return { error: "Ajoutez un fichier PDF ou un lien vers le document." }
  return { url, storagePath: null, mimeType: null, taille: null }
}

export async function uploadDocument(
  _prev: DocumentActionState | undefined,
  formData: FormData
): Promise<DocumentActionState> {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const nom = str(formData, "nom")
  const formationId = optionalStr(formData, "formationId")
  const isPublic = formData.get("public") === "on"
  const rolesRequis = parseRolesRequis(formData)

  if (!nom) return { error: "Le nom du document est obligatoire." }

  const source = await resolveUploadedFile(formData, `uploads/${session.user.id}`)
  if ("error" in source) return { error: source.error }

  const document = await prisma.document.create({
    data: { nom, formationId, uploaderId: session.user.id, public: isPublic, rolesRequis, ...source },
    include: { formation: { select: { titre: true } } },
  })

  const nonStagiaireRoles = rolesRequis.filter((r) => r !== "STAGIAIRE")
  if (nonStagiaireRoles.length > 0) {
    await notifyDocumentSignataires({
      documentNom: nom,
      formationId,
      formationTitre: document.formation?.titre ?? null,
      rolesRequis: nonStagiaireRoles,
      excludeUserId: session.user.id,
    })
  }

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
  const submittedIds = formData.getAll("stagiaires").map(String).filter(Boolean)
  const rolesRequis = parseRolesRequis(formData)

  if (!formationId) return { error: "Formation introuvable." }
  if (!nom) return { error: "Le nom du document est obligatoire." }
  if (submittedIds.length === 0) return { error: "Sélectionnez au moins un stagiaire destinataire." }

  const link = await prisma.formationFormateur.findUnique({
    where: { userId_formationId: { userId: session.user.id, formationId } },
  })
  if (!link) return { error: "Vous n'encadrez pas cette formation." }

  const source = await resolveUploadedFile(formData, `formations/${formationId}`)
  if ("error" in source) return { error: source.error }

  const [roster, formation] = await Promise.all([
    prisma.inscription.findMany({
      where: { formationId, statut: "VALIDEE", userId: { in: submittedIds } },
      select: { userId: true },
    }),
    prisma.formation.findUnique({ where: { id: formationId }, select: { titre: true } }),
  ])
  const recipientIds = roster.map((r) => r.userId)
  if (recipientIds.length === 0) return { error: "Aucun destinataire valide sélectionné." }

  await prisma.$transaction(async (tx) => {
    const document = await tx.document.create({
      data: { nom, formationId, uploaderId: session.user.id, public: false, rolesRequis, ...source },
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

  await notifyDocumentSignataires({
    documentNom: nom,
    formationId,
    formationTitre: formation?.titre ?? null,
    rolesRequis,
    stagiaireIds: recipientIds,
    excludeUserId: session.user.id,
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
    select: { id: true, nom: true, url: true, storagePath: true, rolesRequis: true },
  })
  if (!doc) redirect("/dashboard/documents")
  if (!doc.rolesRequis.includes(session.user.role as Role)) {
    redirect("/dashboard/documents")
  }

  const hdrs = await headers()
  const ipAddress = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || null
  const userAgent = hdrs.get("user-agent")
  const documentHash = crypto
    .createHash("sha256")
    .update(`${doc.id}:${doc.nom}:${doc.url ?? doc.storagePath ?? ""}`)
    .digest("hex")

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
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/formations")
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
