import "server-only"
import { prisma } from "@/lib/prisma"
import { getPublishedArticles, type ArticleListItem } from "@/lib/actualites"

export type HeroSlideData = {
  id: string
  badge: string | null
  titre: string
  sousTitre: string | null
  logoUrl: string | null
  image: string
  ctaLabel: string | null
  formationSlug: string | null
  youtubeUrl: string | null
  alignement: "GAUCHE" | "CENTRE" | "DROITE"
  overlayColor: string
  overlayOpacity: number
  transition: "FADE" | "SLIDE_GAUCHE" | "SLIDE_DROITE"
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
    sousTitre: s.sousTitre,
    logoUrl: s.logoUrl,
    image: s.image,
    ctaLabel: s.ctaLabel,
    formationSlug: s.formation?.slug ?? null,
    youtubeUrl: s.youtubeUrl,
    alignement: s.alignement,
    overlayColor: s.overlayColor,
    overlayOpacity: s.overlayOpacity,
    transition: s.transition,
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

export type AccompagnementCardData = {
  id: string
  titre: string
  description: string
  icone: string
}

export async function getAccompagnementCards(): Promise<AccompagnementCardData[]> {
  const cards = await prisma.accompagnementCard.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
  })
  return cards.map((c) => ({ id: c.id, titre: c.titre, description: c.description, icone: c.icone }))
}

export type AccueilContenuData = {
  bandeauEmploiTitre: string
  accompagnementEyebrow: string
  accompagnementTitre: string
  contactTitre: string
  contactSousTitre: string
}

const CONTENU_DEFAUT: AccueilContenuData = {
  bandeauEmploiTitre: "Je souhaite créer un emploi dans mon club",
  accompagnementEyebrow: "IR2F vous accompagne",
  accompagnementTitre: "Accompagnement Emploi",
  contactTitre: "Je souhaite être contacté",
  contactSousTitre: "Un conseiller IR2F revient vers vous sous 48h.",
}

export async function getAccueilContenu(): Promise<AccueilContenuData> {
  const contenu = await prisma.accueilContenu.findUnique({ where: { id: "accueil" } })
  return contenu ?? CONTENU_DEFAUT
}
