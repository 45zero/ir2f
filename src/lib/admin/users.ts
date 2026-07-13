import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAllUsersAdmin() {
  return prisma.user.findMany({
    orderBy: [{ actif: "desc" }, { createdAt: "desc" }],
  })
}

export async function getUserForEdit(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getFormateurUsers() {
  return prisma.user.findMany({
    where: { role: "FORMATEUR", actif: true },
    orderBy: [{ nom: "asc" }],
    select: { id: true, nom: true, prenom: true },
  })
}
