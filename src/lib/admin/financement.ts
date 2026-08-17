import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAllDispositifsFormation() {
  return prisma.dispositifFormation.findMany({
    orderBy: { ordre: "asc" },
    include: {
      liens: { orderBy: { ordre: "asc" } },
      contacts: { orderBy: { ordre: "asc" } },
      tableaux: { orderBy: { ordre: "asc" } },
    },
  })
}
