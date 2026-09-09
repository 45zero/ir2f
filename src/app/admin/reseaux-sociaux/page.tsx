import Link from "next/link"
import { getAllSocialComptes } from "@/lib/admin/social-comptes"
import { SocialComptesTable } from "@/components/admin/SocialComptesTable"
import { colors, fontHeading, fontBody } from "@/lib/theme"

export default async function SocialComptesPage() {
  const comptes = await getAllSocialComptes()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
            Réseaux sociaux
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            Comptes officiels de la Ligue connectés pour publier les actualités (voir le bouton « Publier sur les
            réseaux » dans l&apos;onglet Actualités).
          </p>
        </div>
        <Link
          href="/admin/reseaux-sociaux/new"
          style={{
            background: colors.red,
            color: "#fff",
            padding: "11px 20px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: fontBody,
            textDecoration: "none",
          }}
        >
          + Ajouter un compte
        </Link>
      </div>

      <SocialComptesTable comptes={comptes} />
    </div>
  )
}
