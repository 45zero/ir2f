import "server-only"
import { prisma } from "@/lib/prisma"

export async function getCovoituragesDisponibles() {
  return prisma.covoiturage.findMany({
    where: { statut: { in: ["OUVERT", "COMPLET"] }, dateDepart: { gte: new Date() } },
    orderBy: { dateDepart: "asc" },
    include: {
      conducteur: { select: { nom: true, prenom: true } },
      passagers: { select: { userId: true } },
    },
  })
}

export async function getMesCovoiturages(userId: string) {
  const [conduits, rejoints] = await Promise.all([
    prisma.covoiturage.findMany({
      where: { conducteurId: userId },
      orderBy: { dateDepart: "desc" },
      include: { passagers: { include: { user: { select: { nom: true, prenom: true } } } } },
    }),
    prisma.covoiturage.findMany({
      where: { passagers: { some: { userId } } },
      orderBy: { dateDepart: "desc" },
      include: { conducteur: { select: { nom: true, prenom: true } } },
    }),
  ])
  return { conduits, rejoints }
}
