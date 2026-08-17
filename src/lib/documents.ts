import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"
import { computeDocumentFullySigned } from "@/lib/documents-completion"
import type { Role } from "@/generated/prisma"

export async function getMesDocuments(userId: string, role: Role) {
  const globalRoleVisibility = role === "ADMIN" || role === "DIRECTION"

  const documents = await prisma.document.findMany({
    where: {
      OR: [
        { uploaderId: userId },
        { public: true },
        { formation: { inscriptions: { some: { userId, statut: "VALIDEE" } } }, partageIndividuel: false },
        { partageIndividuel: true, destinataires: { some: { userId } } },
        ...(globalRoleVisibility ? [{ rolesRequis: { has: role } }] : []),
      ],
    },
    orderBy: { createdAt: "desc" },
    include: {
      formation: { select: { titre: true } },
      uploader: { select: { nom: true, prenom: true } },
      signatures: {
        select: { userId: true, signedAt: true, user: { select: { role: true, nom: true, prenom: true } } },
      },
      destinataires: { select: { userId: true } },
    },
  })

  const formationIds = Array.from(new Set(documents.map((d) => d.formationId).filter((id): id is string => Boolean(id))))
  const rosters = formationIds.length
    ? await prisma.inscription.findMany({
        where: { formationId: { in: formationIds }, statut: "VALIDEE" },
        select: { formationId: true, userId: true },
      })
    : []
  const rosterByFormation = new Map<string, string[]>()
  for (const r of rosters) {
    const arr = rosterByFormation.get(r.formationId) ?? []
    arr.push(r.userId)
    rosterByFormation.set(r.formationId, arr)
  }

  const rows = await Promise.all(
    documents.map(async (d) => {
      const stagiaireRosterIds = d.formationId ? (rosterByFormation.get(d.formationId) ?? []) : null
      const fullySigned = computeDocumentFullySigned({
        rolesRequis: d.rolesRequis,
        signatures: d.signatures.map((s) => ({ userId: s.userId, role: s.user.role })),
        stagiaireRosterIds,
      })
      return {
        ...d,
        resolvedUrl: d.storagePath ? await getSignedDocumentUrl(d.storagePath) : d.url,
        resolvedDownloadUrl: d.storagePath ? await getSignedDocumentDownloadUrl(d.storagePath, d.nom) : d.url,
        fullySigned,
      }
    })
  )

  return rows
}

export async function getFormationRosters(): Promise<Record<string, { id: string; nom: string; prenom: string }[]>> {
  const inscriptions = await prisma.inscription.findMany({
    where: { statut: "VALIDEE" },
    select: { formationId: true, user: { select: { id: true, nom: true, prenom: true } } },
  })

  const rosters: Record<string, { id: string; nom: string; prenom: string }[]> = {}
  for (const i of inscriptions) {
    ;(rosters[i.formationId] ??= []).push(i.user)
  }
  return rosters
}
