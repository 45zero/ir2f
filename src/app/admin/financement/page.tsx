import { getAllDispositifsFormation } from "@/lib/admin/financement"
import { FinancementManager } from "@/components/admin/FinancementManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminFinancementPage() {
  const dispositifs = await getAllDispositifsFormation()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Financement
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Dispositifs d&apos;aide au financement d&apos;une formation individuelle, affichés en onglets sur la page publique
          /financement.
        </p>
      </div>

      <FinancementManager items={dispositifs} />
    </div>
  )
}
