import "server-only"
import { prisma } from "@/lib/prisma"

// Le token n'est jamais sélectionné ici — ni la liste admin ni le formulaire d'édition n'en ont
// besoin (l'édition permet de le remplacer, pas de le relire) ; seul social-publish.ts le lit,
// côté serveur, au moment de publier.
const PUBLIC_SELECT = { id: true, plateforme: true, label: true, externalId: true, actif: true, createdAt: true } as const

export async function getAllSocialComptes() {
  return prisma.reseauSocialCompte.findMany({ orderBy: { createdAt: "asc" }, select: PUBLIC_SELECT })
}

export async function getSocialCompteForEdit(id: string) {
  return prisma.reseauSocialCompte.findUnique({ where: { id }, select: PUBLIC_SELECT })
}
