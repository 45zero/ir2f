import Link from "next/link"
import { getAllFormationsAdmin } from "@/lib/admin/formations"
import { FormationsTable, type AdminFormationRow } from "@/components/admin/FormationsTable"
import { colors, fontHeading, fontBody } from "@/lib/theme"

export default async function AdminFormationsPage() {
  const formations = await getAllFormationsAdmin()

  const rows: AdminFormationRow[] = formations.map((f) => ({
    id: f.id,
    slug: f.slug,
    titre: f.titre,
    categorie: f.categorie,
    statut: f.statut,
    cpfEligible: f.cpfEligible,
    ordre: f.ordre,
    dureeLabel: f.dureeLabel,
  }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
            Formations
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            {rows.length} formation{rows.length > 1 ? "s" : ""} au total.
          </p>
        </div>
        <Link
          href="/admin/formations/new"
          style={{
            background: colors.red,
            color: "#fff",
            border: "none",
            padding: "11px 20px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: fontBody,
            textDecoration: "none",
          }}
        >
          + Nouvelle formation
        </Link>
      </div>

      <FormationsTable formations={rows} />
    </div>
  )
}
