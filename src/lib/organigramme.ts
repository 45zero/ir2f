import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentDownloadUrl } from "@/lib/storage"

export const ORGANIGRAMME_ID = "singleton"

export async function getOrganigramme() {
  const row = await prisma.organigramme.findUnique({ where: { id: ORGANIGRAMME_ID } })
  if (!row) return null

  const url = await getSignedDocumentDownloadUrl(row.storagePath, row.nom)
  if (!url) return null

  return { nom: row.nom, url, updatedAt: row.updatedAt }
}
