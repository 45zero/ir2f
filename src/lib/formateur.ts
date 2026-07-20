import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"
import { computeDocumentFullySigned } from "@/lib/documents-completion"
import type { Role } from "@/generated/prisma"

export async function getFormateurFormations(userId: string) {
  const links = await prisma.formationFormateur.findMany({
    where: { userId },
    include: {
      formation: {
        include: {
          inscriptions: {
            where: { statut: "VALIDEE" },
            include: { user: { select: { id: true, nom: true, prenom: true } } },
          },
          documents: { select: { id: true, rolesRequis: true } },
          sessions: {
            where: { dateDebut: { gte: new Date() } },
            orderBy: { dateDebut: "asc" },
            take: 1,
          },
          covoiturages: {
            where: { statut: { in: ["OUVERT", "COMPLET"] }, dateDepart: { gte: new Date() } },
            select: { id: true },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  })

  const allDocIds = links.flatMap((l) => l.formation.documents.map((d) => d.id))
  const signatures = allDocIds.length
    ? await prisma.signature.findMany({
        where: { documentId: { in: allDocIds } },
        select: { documentId: true, userId: true, user: { select: { role: true } } },
      })
    : []
  const sigsByDoc = new Map<string, { userId: string; role: Role }[]>()
  for (const s of signatures) {
    const arr = sigsByDoc.get(s.documentId) ?? []
    arr.push({ userId: s.userId, role: s.user.role })
    sigsByDoc.set(s.documentId, arr)
  }

  return links.map((l) => {
    const f = l.formation
    const stagiaires = f.inscriptions.map((i) => i.user)
    const stagiaireIds = stagiaires.map((s) => s.id)

    const stagiaireDocs = f.documents.filter((d) => d.rolesRequis.includes("STAGIAIRE"))
    const unsignedCount = stagiaireDocs.reduce((acc, d) => {
      const signedIds = new Set((sigsByDoc.get(d.id) ?? []).filter((s) => s.role === "STAGIAIRE").map((s) => s.userId))
      return acc + stagiaires.filter((s) => !signedIds.has(s.id)).length
    }, 0)

    // Seuls les documents nécessitant au moins une signature comptent ici — le contenu
    // pédagogique (rolesRequis vide) ne doit pas gonfler artificiellement ce ratio.
    const signableDocs = f.documents.filter((d) => d.rolesRequis.length > 0)
    const fullySignedDocumentsCount = signableDocs.filter((d) =>
      computeDocumentFullySigned({
        rolesRequis: d.rolesRequis,
        signatures: sigsByDoc.get(d.id) ?? [],
        stagiaireRosterIds: stagiaireIds,
      })
    ).length

    return {
      id: f.id,
      titre: f.titre,
      lieu: f.lieu,
      nextSession: f.sessions[0] ?? null,
      stagiaireCount: stagiaires.length,
      unsignedCount,
      documentsCount: signableDocs.length,
      fullySignedDocumentsCount,
      covoiturageCount: f.covoiturages.length,
    }
  })
}

export async function getFormationRosterForFormateur(formationId: string, formateurUserId: string) {
  const link = await prisma.formationFormateur.findUnique({
    where: { userId_formationId: { userId: formateurUserId, formationId } },
  })
  if (!link) return null

  const [inscriptions, documents] = await Promise.all([
    prisma.inscription.findMany({
      where: { formationId, statut: "VALIDEE" },
      include: { user: { select: { id: true, nom: true, prenom: true, email: true, telephone: true } } },
      orderBy: { user: { nom: "asc" } },
    }),
    prisma.document.findMany({
      where: { formationId },
      include: { signatures: { select: { userId: true, signedAt: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ])

  const resolvedDocs = await Promise.all(
    documents.map(async (d) => ({
      ...d,
      viewUrl: d.storagePath ? await getSignedDocumentUrl(d.storagePath) : d.url,
      downloadUrl: d.storagePath ? await getSignedDocumentDownloadUrl(d.storagePath, d.nom) : d.url,
    }))
  )

  return inscriptions.map((i) => ({
    id: i.user.id,
    nom: i.user.nom,
    prenom: i.user.prenom,
    email: i.user.email,
    telephone: i.user.telephone,
    origine: i.origine,
    documents: resolvedDocs.map((d) => {
      const sig = d.signatures.find((s) => s.userId === i.user.id)
      return {
        id: d.id,
        nom: d.nom,
        signed: Boolean(sig),
        signedAt: sig ? sig.signedAt.toISOString() : null,
        viewUrl: d.viewUrl,
        downloadUrl: d.downloadUrl,
      }
    }),
  }))
}

export async function getFormateurDocumentsToSign(userId: string) {
  const links = await prisma.formationFormateur.findMany({ where: { userId }, select: { formationId: true } })
  const formationIds = links.map((l) => l.formationId)
  if (formationIds.length === 0) return []

  const documents = await prisma.document.findMany({
    where: { formationId: { in: formationIds }, rolesRequis: { has: "FORMATEUR" } },
    include: {
      formation: { select: { titre: true } },
      signatures: { select: { userId: true, user: { select: { role: true } } } },
    },
    orderBy: { createdAt: "desc" },
  })

  const pending = documents.filter((d) => !d.signatures.some((s) => s.user.role === "FORMATEUR"))

  return Promise.all(
    pending.map(async (d) => ({
      id: d.id,
      nom: d.nom,
      formationTitre: d.formation?.titre ?? null,
      url: d.storagePath ? await getSignedDocumentUrl(d.storagePath) : d.url,
      downloadUrl: d.storagePath ? await getSignedDocumentDownloadUrl(d.storagePath, d.nom) : d.url,
    }))
  )
}

export async function getFormateurAlerts(userId: string) {
  const inbox = await prisma.messageDestinataire.findMany({
    where: { userId },
    orderBy: { message: { createdAt: "desc" } },
    include: {
      message: { include: { expediteur: { select: { nom: true, prenom: true, role: true } } } },
    },
    take: 20,
  })

  return inbox.map((md) => ({
    id: md.id,
    messageId: md.messageId,
    lu: md.lu,
    contenu: md.message.contenu,
    createdAt: md.message.createdAt,
    from: `${md.message.expediteur.prenom} ${md.message.expediteur.nom}`,
    isAdmin: md.message.expediteur.role === "ADMIN",
    formationId: md.message.formationId,
  }))
}
