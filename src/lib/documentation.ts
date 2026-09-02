import "server-only"
import { prisma } from "@/lib/prisma"

export async function getDocumentationGroupes() {
  return prisma.documentationGroupe.findMany({
    orderBy: { ordre: "asc" },
    include: { documents: { orderBy: { ordre: "asc" } } },
  })
}
