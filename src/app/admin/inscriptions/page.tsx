import { getAllDemandesAdmin } from "@/lib/admin/inscriptions"
import { DemandesTable, type AdminDemandeRow } from "@/components/admin/DemandesTable"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminInscriptionsPage() {
  const demandes = await getAllDemandesAdmin()

  const rows: AdminDemandeRow[] = demandes.map((d) => ({
    id: d.id,
    nom: d.nom,
    prenom: d.prenom,
    email: d.email,
    telephone: d.telephone,
    message: d.message,
    statut: d.statut,
    createdAt: d.createdAt.toISOString(),
    formationTitre: d.formation?.titre ?? null,
  }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Demandes d&apos;inscription
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          {rows.length} demande{rows.length > 1 ? "s" : ""} au total.
        </p>
      </div>

      <DemandesTable demandes={rows} />
    </div>
  )
}
