"use client"

import { CONVENTION_ROLE_ORDER, CONVENTION_ROLE_LABELS, ConventionStatutPill, type ConventionSignataireStatut } from "@/components/ui/ConventionStatutPills"
import { colors, fontBody } from "@/lib/theme"

export type ConventionSuiviRow = {
  id: string
  nom: string
  prenom: string
  club: string | null
  signataires: ConventionSignataireStatut[]
}

export function ConventionSuiviTable({ rows }: { rows: ConventionSuiviRow[] }) {
  if (rows.length === 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
        Aucun stagiaire importé pour cette formation pour le moment.
      </div>
    )
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: fontBody }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 11.5, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
              Stagiaire
            </th>
            {CONVENTION_ROLE_ORDER.map((role) => (
              <th key={role} style={{ textAlign: "center", padding: "12px 10px", fontSize: 11.5, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>
                {CONVENTION_ROLE_LABELS[role]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} style={{ borderTop: i === 0 ? "none" : "1px solid #eef0f3" }}>
              <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: colors.text }}>
                {row.prenom} {row.nom}
                {row.club && <span style={{ display: "block", fontSize: 11, fontWeight: 400, color: colors.textLight }}>{row.club}</span>}
              </td>
              {CONVENTION_ROLE_ORDER.map((role) => (
                <td key={role} style={{ padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ConventionStatutPill signataire={row.signataires.find((s) => s.role === role)} canManage />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
