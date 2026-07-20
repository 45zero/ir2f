import "server-only"
import { prisma } from "@/lib/prisma"
import { PAGE_HERO_DEFAULTS, PAGE_HERO_EYEBROW } from "@/lib/page-hero-shared"
import type { PageCle } from "@/generated/prisma"

export async function getPageHero(page: PageCle) {
  const row = await prisma.pageHero.findUnique({ where: { page } })
  const fallback = PAGE_HERO_DEFAULTS[page]

  return {
    eyebrow: PAGE_HERO_EYEBROW[page],
    titre: row?.titre ?? fallback.titre,
    sousTitre: row?.sousTitre ?? fallback.sousTitre,
    image: row?.image ?? null,
  }
}
