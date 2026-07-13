import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAllArticlesAdmin() {
  return prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { auteur: { select: { nom: true, prenom: true } } },
  })
}

export async function getArticleForEdit(id: string) {
  return prisma.article.findUnique({ where: { id } })
}
