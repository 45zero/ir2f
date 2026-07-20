import "server-only"
import { prisma } from "@/lib/prisma"
import { PAGE_CLE_LIST, PAGE_HERO_DEFAULTS, PAGE_HERO_LABEL } from "@/lib/page-hero-shared"

export async function getAllPageHeroAdmin() {
  const rows = await prisma.pageHero.findMany()
  const byPage = new Map(rows.map((r) => [r.page, r]))

  return PAGE_CLE_LIST.map((page) => {
    const row = byPage.get(page)
    const fallback = PAGE_HERO_DEFAULTS[page]
    return {
      page,
      label: PAGE_HERO_LABEL[page],
      titre: row?.titre ?? fallback.titre,
      sousTitre: row?.sousTitre ?? fallback.sousTitre ?? "",
      image: row?.image ?? "",
    }
  })
}
