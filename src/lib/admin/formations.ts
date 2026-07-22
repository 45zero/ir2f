import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"

export async function getAllFormationsAdmin() {
  return prisma.formation.findMany({
    orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
    include: { _count: { select: { sessions: true, inscriptions: true, demandes: true } } },
  })
}

export async function getFormationForEdit(id: string) {
  return prisma.formation.findUnique({
    where: { id },
    include: {
      sessions: { orderBy: { dateDebut: "asc" } },
      formateurs: { select: { userId: true } },
    },
  })
}

export async function getFormationDocuments(formationId: string) {
  const [formation, documents] = await Promise.all([
    prisma.formation.findUnique({ where: { id: formationId }, select: { titre: true } }),
    prisma.document.findMany({
      where: { formationId },
      orderBy: [{ ordre: "asc" }, { createdAt: "desc" }],
    }),
  ])
  if (!formation) return null

  return {
    titre: formation.titre,
    documents: await Promise.all(
      documents.map(async (d) => ({
        id: d.id,
        nom: d.nom,
        visiblePublic: d.visiblePublic,
        ordre: d.ordre,
        createdAt: d.createdAt.toISOString(),
        viewUrl: d.storagePath ? await getSignedDocumentUrl(d.storagePath) : d.url,
        downloadUrl: d.storagePath ? await getSignedDocumentDownloadUrl(d.storagePath, d.nom) : d.url,
      }))
    ),
  }
}
