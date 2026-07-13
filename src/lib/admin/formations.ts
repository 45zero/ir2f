import "server-only"
import { prisma } from "@/lib/prisma"

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
