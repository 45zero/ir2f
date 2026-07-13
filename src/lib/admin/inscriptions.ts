import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAllDemandesAdmin() {
  return prisma.demandeInscription.findMany({
    orderBy: [{ statut: "asc" }, { createdAt: "desc" }],
    include: { formation: { select: { titre: true } } },
  })
}
