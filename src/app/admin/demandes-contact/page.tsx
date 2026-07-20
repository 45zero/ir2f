import { getAllDemandesContactAdmin } from "@/lib/admin/contact"
import { DemandesContactTable, type AdminDemandeContactRow } from "@/components/admin/DemandesContactTable"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminDemandesContactPage() {
  const demandes = await getAllDemandesContactAdmin()

  const rows: AdminDemandeContactRow[] = demandes.map((d) => ({
    id: d.id,
    thematique: d.thematique,
    nom: d.nom,
    prenom: d.prenom,
    email: d.email,
    telephone: d.telephone,
    message: d.message,
    createdAt: d.createdAt.toISOString(),
  }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Demandes de contact
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          {rows.length} demande{rows.length > 1 ? "s" : ""} au total.
        </p>
      </div>

      <DemandesContactTable demandes={rows} />
    </div>
  )
}
