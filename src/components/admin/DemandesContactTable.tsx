import { getContactTheme } from "@/lib/contact-themes"
import { colors } from "@/lib/theme"

export type AdminDemandeContactRow = {
  id: string
  thematique: string
  nom: string
  prenom: string
  email: string
  telephone: string | null
  message: string | null
  createdAt: string
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

export function DemandesContactTable({ demandes }: { demandes: AdminDemandeContactRow[] }) {
  if (demandes.length === 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
        Aucune demande de contact pour le moment.
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {demandes.map((d) => {
        const theme = getContactTheme(d.thematique)
        return (
          <div key={d.id} style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: colors.text }}>
                  {d.prenom} {d.nom}
                </span>
                <span style={{ fontSize: 12, color: colors.textLight }}>{d.email}</span>
                {d.telephone && <span style={{ fontSize: 12, color: colors.textLight }}>{d.telephone}</span>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <span
                  style={{
                    display: "inline-flex",
                    background: colors.gold,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 12,
                  }}
                >
                  {theme?.label ?? d.thematique}
                </span>
                <span style={{ fontSize: 11, color: colors.textLight }}>{dateFormatter.format(new Date(d.createdAt))}</span>
              </div>
            </div>

            {d.message && (
              <p style={{ fontSize: 13, color: colors.textMuted, margin: 0, background: "#f5f7fb", borderRadius: 6, padding: 12, whiteSpace: "pre-wrap" }}>
                {d.message}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
