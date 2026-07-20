import { getAllFormationTuilesAdmin, getAllFormationOngletsAdmin } from "@/lib/admin/formations-page"
import { FormationsPageManager } from "@/components/admin/FormationsPageManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminFormationsPagePage() {
  const [tuiles, onglets] = await Promise.all([getAllFormationTuilesAdmin(), getAllFormationOngletsAdmin()])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Page « Nos Formations »
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Le contenu des tuiles catégories et des onglets affichés sur la page publique /formations.
        </p>
      </div>

      <FormationsPageManager tuiles={tuiles} onglets={onglets} />
    </div>
  )
}
