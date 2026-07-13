import "server-only"
import { prisma } from "@/lib/prisma"

export async function getInbox(userId: string) {
  return prisma.messageDestinataire.findMany({
    where: { userId },
    orderBy: { message: { createdAt: "desc" } },
    include: { message: { include: { expediteur: { select: { nom: true, prenom: true } } } } },
  })
}

export async function getSent(userId: string) {
  return prisma.message.findMany({
    where: { expediteurId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      destinataires: { include: { user: { select: { nom: true, prenom: true } } } },
    },
  })
}

export async function getRecipientOptions(excludeUserId: string) {
  return prisma.user.findMany({
    where: { actif: true, id: { not: excludeUserId } },
    orderBy: [{ role: "asc" }, { nom: "asc" }],
    select: { id: true, nom: true, prenom: true, role: true },
  })
}
