import "server-only"
import { prisma } from "@/lib/prisma"
import { CATEGORIE_LABELS } from "@/lib/formations-shared"

export type ArticleListItem = {
  id: string
  slug: string
  titre: string
  image: string | null
  categorieLabel: string
  date: string
  feedDate: string
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
const timeFormatter = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" })
const shortDateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit" })

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// Repère de fraîcheur façon fil d'actu : heure pour aujourd'hui, jour/mois sinon.
function formatFeedDate(createdAt: Date): string {
  return isSameDay(createdAt, new Date()) ? timeFormatter.format(createdAt) : shortDateFormatter.format(createdAt)
}

function toListItem(a: {
  id: string
  slug: string
  titre: string
  image: string | null
  categorie: keyof typeof CATEGORIE_LABELS | null
  createdAt: Date
}): ArticleListItem {
  return {
    id: a.id,
    slug: a.slug,
    titre: a.titre,
    image: a.image,
    categorieLabel: a.categorie ? CATEGORIE_LABELS[a.categorie] : "IR2F",
    date: dateFormatter.format(a.createdAt),
    feedDate: formatFeedDate(a.createdAt),
  }
}

export async function getPublishedArticles(): Promise<ArticleListItem[]> {
  const articles = await prisma.article.findMany({
    where: { publie: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, titre: true, image: true, categorie: true, createdAt: true },
  })
  return articles.map(toListItem)
}

export type ArticleDetail = ArticleListItem & { contenu: string }

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  const article = await prisma.article.findFirst({
    where: { slug, publie: true },
    select: { id: true, slug: true, titre: true, image: true, categorie: true, createdAt: true, contenu: true },
  })
  if (!article) return null
  return { ...toListItem(article), contenu: article.contenu }
}
