import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"

export const ORGANIGRAMME_ID = "singleton"

export async function getOrganigramme() {
  const row = await prisma.organigramme.findUnique({ where: { id: ORGANIGRAMME_ID } })
  if (!row) return null

  const [viewUrl, downloadUrl] = await Promise.all([
    getSignedDocumentUrl(row.storagePath),
    getSignedDocumentDownloadUrl(row.storagePath, row.nom),
  ])
  if (!viewUrl || !downloadUrl) return null

  return { nom: row.nom, viewUrl, downloadUrl, updatedAt: row.updatedAt }
}
