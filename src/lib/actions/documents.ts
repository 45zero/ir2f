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
import { notifyDocumentSignataires, notifyDocumentFullySigned } from "@/lib/emails/document-notifications"
import { checkDocumentFullySignedById } from "@/lib/documents-completion"
import type { Role, DocumentCategorie } from "@/generated/prisma"

export type DocumentActionState = { error: string | null }

const VALID_ROLES: Role[] = ["STAGIAIRE", "FORMATEUR", "ADMIN", "DIRECTION"]

function parseCategorie(formData: FormData): DocumentCategorie {
  return str(formData, "categorie") === "PEDAGOGIQUE" ? "PEDAGOGIQUE" : "ADMINISTRATIF"
}

function parseRolesRequis(formData: FormData, categorie: DocumentCategorie): Role[] {
  if (categorie === "PEDAGOGIQUE") return []
  const submitted = formData.getAll("rolesRequis").map(String)
  const roles = submitted.filter((r): r is Role => (VALID_ROLES as string[]).includes(r))
  return roles.length > 0 ? roles : ["STAGIAIRE"]
}

async function resolveUploadedFile(
  formData: FormData,
  keyHint: string,
  categorie: DocumentCategorie
): Promise<{ url: string | null; storagePath: string | null; mimeType: string | null; taille: number | null } | { error: string }> {
  const file = formData.get("file")
  if (file instanceof File && file.size > 0) {
    if (categorie === "ADMINISTRATIF" && file.type && file.type !== "application/pdf") {
      return { error: "Seuls les fichiers PDF sont acceptés pour un document administratif." }
    }
    try {
      const uploaded = await uploadDocumentFile(file, keyHint)
      return { url: null, storagePath: uploaded.storagePath, mimeType: uploaded.mimeType, taille: uploaded.taille }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Échec de l'upload du fichier." }
    }
  }
  const url = str(formData, "url")
  if (!url) return { error: "Ajoutez un fichier ou un lien vers le document." }
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
  const categorie = parseCategorie(formData)
  const rolesRequis = parseRolesRequis(formData, categorie)

  if (!nom) return { error: "Le nom du document est obligatoire." }

  const source = await resolveUploadedFile(formData, `uploads/${session.user.id}`, categorie)
  if ("error" in source) return { error: source.error }

  const document = await prisma.document.create({
    data: { nom, formationId, uploaderId: session.user.id, public: isPublic, rolesRequis, categorie, ...source },
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
  const categorie = parseCategorie(formData)
  const rolesRequis = parseRolesRequis(formData, categorie)

  if (!formationId) return { error: "Formation introuvable." }
  if (!nom) return { error: "Le nom du document est obligatoire." }
  if (submittedIds.length === 0) return { error: "Sélectionnez au moins un stagiaire destinataire." }

  const link = await prisma.formationFormateur.findUnique({
    where: { userId_formationId: { userId: session.user.id, formationId } },
  })
  if (!link) return { error: "Vous n'encadrez pas cette formation." }

  const source = await resolveUploadedFile(formData, `formations/${formationId}`, categorie)
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

  const sujet = categorie === "PEDAGOGIQUE" ? `Nouveau contenu pédagogique — ${nom}` : `Nouveau document — ${nom}`
  const contenu =
    categorie === "PEDAGOGIQUE"
      ? `Un nouveau contenu pédagogique a été partagé pour votre formation : ${nom}.`
      : `Un nouveau document a été partagé pour votre formation : ${nom}.`

  await prisma.$transaction(async (tx) => {
    const document = await tx.document.create({
      data: { nom, formationId, uploaderId: session.user.id, public: false, rolesRequis, categorie, ...source },
    })
    await tx.message.create({
      data: {
        expediteurId: session.user.id,
        sujet,
        contenu,
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
    select: {
      id: true,
      nom: true,
      url: true,
      storagePath: true,
      rolesRequis: true,
      formation: { select: { titre: true } },
    },
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

  const wasComplete = await checkDocumentFullySignedById(documentId)

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

  if (!wasComplete) {
    const isCompleteNow = await checkDocumentFullySignedById(documentId)
    if (isCompleteNow) {
      await notifyDocumentFullySigned({ documentNom: doc.nom, formationTitre: doc.formation?.titre ?? null })
    }
  }

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
