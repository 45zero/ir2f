import { getPublicationsOverview } from "@/lib/admin/publications"
import { PublicationsOverview } from "@/components/admin/PublicationsOverview"
import { colors, fontHeading } from "@/lib/theme"

export default async function PublicationsPage() {
  const { aPublier, programme, publie, echec } = await getPublicationsOverview()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Publications
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Vue d&apos;ensemble des publications officielles réseaux sociaux, toutes actualités confondues. Pour
          publier ou modifier une publication, ouvre l&apos;actualité correspondante.
        </p>
      </div>
      <PublicationsOverview aPublier={aPublier} programme={programme} publie={publie} echec={echec} />
    </div>
  )
}
