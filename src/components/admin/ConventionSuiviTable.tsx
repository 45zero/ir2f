"use client"

import { useActionState } from "react"
import { renvoyerEtape } from "@/lib/actions/conventions"
import { colors, fontBody } from "@/lib/theme"
import type { RoleSignataire, StatutSignature } from "@/generated/prisma"

const ROLE_ORDER: RoleSignataire[] = ["STAGIAIRE", "CLUB", "TUTEUR", "MAITRE_DE_STAGE", "RESPONSABLE_PEDAGOGIQUE"]
const ROLE_LABELS: Record<RoleSignataire, string> = {
  STAGIAIRE: "Stagiaire",
  CLUB: "Club",
  TUTEUR: "Tuteur",
  MAITRE_DE_STAGE: "Maître de stage",
  RESPONSABLE_PEDAGOGIQUE: "Responsable pédagogique",
}

const STATUT_COLOR: Record<StatutSignature, string> = {
  NON_ENVOYE: "#d8dde5",
  EN_ATTENTE: colors.gold,
  SIGNE: "#1a6b3a",
  REFUSE: colors.red,
}

const STATUT_LABEL: Record<StatutSignature, string> = {
  NON_ENVOYE: "Non envoyé",
  EN_ATTENTE: "En attente de signature",
  SIGNE: "Signé",
  REFUSE: "Refusé",
}

export type ConventionSuiviRow = {
  id: string
  nom: string
  prenom: string
  club: string | null
  signataires: { id: string; role: RoleSignataire; statut: StatutSignature; motifRefus: string | null }[]
}

function RenvoyerButton({ signataireId }: { signataireId: string }) {
  const [state, action, isPending] = useActionState(
    async (_prev: { error: string | null } | undefined) => renvoyerEtape(signataireId),
    undefined
  )
  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: "transparent",
          border: "none",
          color: colors.navy,
          fontSize: 10.5,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
          textDecoration: "underline",
          padding: 0,
        }}
      >
        {isPending ? "..." : "Renvoyer"}
      </button>
      {state?.error && <span style={{ color: colors.red, fontSize: 10 }}>{state.error}</span>}
    </form>
  )
}

function Cell({ signataire }: { signataire: ConventionSuiviRow["signataires"][number] | undefined }) {
  if (!signataire) return <span style={{ width: 12, height: 12, borderRadius: "50%", background: STATUT_COLOR.NON_ENVOYE, display: "inline-block" }} />

  const canResend = signataire.statut === "EN_ATTENTE" || signataire.statut === "REFUSE"

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }} title={signataire.motifRefus ? `${STATUT_LABEL[signataire.statut]} — ${signataire.motifRefus}` : STATUT_LABEL[signataire.statut]}>
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: STATUT_COLOR[signataire.statut], display: "inline-block" }} />
      {canResend && <RenvoyerButton signataireId={signataire.id} />}
    </div>
  )
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
            {ROLE_ORDER.map((role) => (
              <th key={role} style={{ textAlign: "center", padding: "12px 10px", fontSize: 11.5, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>
                {ROLE_LABELS[role]}
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
              {ROLE_ORDER.map((role) => (
                <td key={role} style={{ padding: "12px 10px", textAlign: "center" }}>
                  <Cell signataire={row.signataires.find((s) => s.role === role)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
