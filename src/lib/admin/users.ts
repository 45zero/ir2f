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

/** Utilisateurs pouvant être désignés responsable pédagogique d'une formation — l'équipe IR2F
 * (admin/formateur/direction), pas les stagiaires. */
export async function getResponsablePedagogiqueUsers() {
  return prisma.user.findMany({
    where: { role: { in: ["ADMIN", "FORMATEUR", "DIRECTION"] }, actif: true },
    orderBy: [{ nom: "asc" }],
    select: { id: true, nom: true, prenom: true, email: true, telephone: true },
  })
}
