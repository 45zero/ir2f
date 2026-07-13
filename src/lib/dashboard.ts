import "server-only"
import { prisma } from "@/lib/prisma"

export async function getMesInscriptions(userId: string) {
  return prisma.inscription.findMany({
    where: { userId },
    include: { formation: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getAllFormationsOverview() {
  return prisma.formation.findMany({
    orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
    include: { _count: { select: { inscriptions: true } } },
  })
}

export async function getNextSessionForUser(userId: string) {
  return prisma.session.findFirst({
    where: {
      dateDebut: { gte: new Date() },
      formation: { inscriptions: { some: { userId, statut: "VALIDEE" } } },
    },
    orderBy: { dateDebut: "asc" },
    include: { formation: { select: { titre: true } } },
  })
}

export async function getAdminStats() {
  const [formationsPubliees, demandesEnAttente, totalUsers] = await Promise.all([
    prisma.formation.count({ where: { statut: "PUBLIEE" } }),
    prisma.demandeInscription.count({ where: { statut: "EN_ATTENTE" } }),
    prisma.user.count(),
  ])
  return { formationsPubliees, demandesEnAttente, totalUsers }
}
