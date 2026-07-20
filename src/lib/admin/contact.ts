import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAllDemandesContactAdmin() {
  return prisma.demandeContact.findMany({ orderBy: { createdAt: "desc" } })
}
