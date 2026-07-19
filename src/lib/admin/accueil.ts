import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAllHeroSlides() {
  return prisma.heroSlide.findMany({ orderBy: { ordre: "asc" } })
}

export async function getAllStatsCles() {
  return prisma.statCle.findMany({ orderBy: { ordre: "asc" } })
}

export async function getAllAccompagnementCards() {
  return prisma.accompagnementCard.findMany({ orderBy: { ordre: "asc" } })
}

export async function getAccueilContenuAdmin() {
  return prisma.accueilContenu.findUnique({ where: { id: "accueil" } })
}
