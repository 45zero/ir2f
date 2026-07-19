import "server-only"
import { prisma } from "@/lib/prisma"

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

export type ArticleCardData = {
  id: string
  titre: string
  date: string
}

export async function getRecentArticles(limit = 9): Promise<ArticleCardData[]> {
  const articles = await prisma.article.findMany({
    where: { publie: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, titre: true, createdAt: true },
  })
  const formatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" })
  return articles.map((a) => ({ id: a.id, titre: a.titre, date: formatter.format(a.createdAt) }))
}
