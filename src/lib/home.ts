import "server-only"
import { prisma } from "@/lib/prisma"
import { getPublishedArticles, type ArticleListItem } from "@/lib/actualites"

export type HeroSlideData = {
  id: string
  badge: string
  titre: string
  image: string
  ctaLabel: string
  formationSlug: string | null
}

export async function getHeroSlides(): Promise<HeroSlideData[]> {
  const slides = await prisma.heroSlide.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
    include: { formation: { select: { slug: true } } },
  })
  return slides.map((s) => ({
    id: s.id,
    badge: s.badge,
    titre: s.titre,
    image: s.image,
    ctaLabel: s.ctaLabel,
    formationSlug: s.formation?.slug ?? null,
  }))
}

export type StatCleData = {
  id: string
  valeur: string
  label: string
}

export async function getStatsCles(): Promise<StatCleData[]> {
  const stats = await prisma.statCle.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
  })
  return stats.map((s) => ({ id: s.id, valeur: s.valeur, label: s.label }))
}

export async function getRecentArticles(limit = 9): Promise<ArticleListItem[]> {
  const articles = await getPublishedArticles()
  return articles.slice(0, limit)
}
