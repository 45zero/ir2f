import { getAllPageHeroAdmin } from "@/lib/admin/page-hero"
import { PagesHeroManager } from "@/components/admin/PagesHeroManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminPagesHeroPage() {
  const pages = await getAllPageHeroAdmin()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Bandeaux (Hero) des pages
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Image de fond, titre et sous-titre du bandeau affiché en haut de chaque page. L&apos;accueil a son propre
          Hero (carrousel), géré depuis « Page d&apos;accueil ».
        </p>
      </div>

      <PagesHeroManager pages={pages} />
    </div>
  )
}
