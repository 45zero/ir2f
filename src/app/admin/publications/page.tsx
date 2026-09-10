import { getPublicationsOverview } from "@/lib/admin/publications"
import { getConfiguredSocialAccounts } from "@/lib/social/accounts"
import { PublicationsOverview } from "@/components/admin/PublicationsOverview"
import { colors, fontHeading } from "@/lib/theme"

// Publier une vidéo native depuis la boîte de dialogue "Publier" peut prendre jusqu'à ~50s côté
// Meta (voir social/graph.ts) — 60s est le maximum autorisé sur le plan Vercel Hobby.
export const maxDuration = 60

export default async function PublicationsPage() {
  const { aPublier, programme, publie, echec } = await getPublicationsOverview()
  const comptes = getConfiguredSocialAccounts()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Publications
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Vue d&apos;ensemble des publications officielles réseaux sociaux, actualités et formations confondues.
          Publie directement depuis «&nbsp;À publier&nbsp;», ou ouvre le contenu correspondant pour modifier/supprimer
          une publication déjà en ligne.
        </p>
      </div>
      <PublicationsOverview aPublier={aPublier} programme={programme} publie={publie} echec={echec} comptes={comptes} />
    </div>
  )
}
