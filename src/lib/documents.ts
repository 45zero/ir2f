import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl } from "@/lib/storage"
import type { Role } from "@/generated/prisma"

export async function getMesDocuments(userId: string, role: Role) {
  const globalRoleVisibility = role === "ADMIN" || role === "DIRECTION"

  const documents = await prisma.document.findMany({
    where: {
      OR: [
        { uploaderId: userId },
        { public: true },
        { formation: { inscriptions: { some: { userId, statut: "VALIDEE" } } } },
        ...(globalRoleVisibility ? [{ rolesRequis: { has: role } }] : []),
      ],
    },
    orderBy: { createdAt: "desc" },
    include: {
      formation: { select: { titre: true } },
      uploader: { select: { nom: true, prenom: true } },
      signatures: { select: { userId: true, user: { select: { role: true } } } },
    },
  })

  return Promise.all(
    documents.map(async (d) => ({
      ...d,
      resolvedUrl: d.storagePath ? await getSignedDocumentUrl(d.storagePath) : d.url,
    }))
  )
}
