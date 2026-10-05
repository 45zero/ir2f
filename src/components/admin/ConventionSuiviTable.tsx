"use client"

import { Fragment, useCallback, useState } from "react"
import { CONVENTION_ROLE_ORDER, CONVENTION_ROLE_LABELS, ConventionStatutPill, type ConventionSignataireStatut } from "@/components/ui/ConventionStatutPills"
import { ConventionShareActions } from "@/components/dashboard/ConventionShareActions"
import { EnvoyerConventionStagiaireButton } from "@/components/dashboard/EnvoyerConventionStagiaireButton"
import { CorrigerContactsForm, type StagiaireContacts } from "@/components/admin/CorrigerContactsForm"
import { colors, fontBody } from "@/lib/theme"

export type ConventionSuiviRow = {
  id: string
  nom: string
  prenom: string
  club: string | null
  /** false = aucune convention générée (jamais envoyée, ou effacée par un réimport) : aucun signataire n'a rien reçu. */
  conventionGeneree: boolean
  /** Emails obligatoires manquants qui empêchent de générer la convention (voir missingContactsFor). */
  contactsManquants: string[]
  /** Au moins une signature : les emails ne sont plus corrigeables ici sans perdre la signature. */
  dejaSignee: boolean
  contacts: StagiaireContacts
  signataires: ConventionSignataireStatut[]
  pdfViewUrl: string | null
  pdfDownloadUrl: string | null
}

const lienStyle = {
  background: "none",
  border: "none",
  padding: 0,
  color: colors.navy,
  fontSize: 11,
  fontWeight: 700,
  fontFamily: fontBody,
  textDecoration: "underline",
  cursor: "pointer",
} as const

export function ConventionSuiviTable({ rows }: { rows: ConventionSuiviRow[] }) {
  const [enCorrection, setEnCorrection] = useState<string | null>(null)
  const fermer = useCallback(() => setEnCorrection(null), [])

  if (rows.length === 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
        Aucun stagiaire importé pour cette formation pour le moment.
      </div>
    )
  }

  const nbColonnes = CONVENTION_ROLE_ORDER.length + 2

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
            <th style={{ textAlign: "center", padding: "12px 10px", fontSize: 11.5, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>
              Documents
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <Fragment key={row.id}>
              <tr style={{ borderTop: i === 0 ? "none" : "1px solid #eef0f3" }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: colors.text }}>
                  {row.prenom} {row.nom}
                  {row.club && <span style={{ display: "block", fontSize: 11, fontWeight: 400, color: colors.textLight }}>{row.club}</span>}
                  {!row.dejaSignee && enCorrection !== row.id && (
                    <button type="button" onClick={() => setEnCorrection(row.id)} style={{ ...lienStyle, marginTop: 4 }}>
                      Corriger les adresses
                    </button>
                  )}
                </td>
                {row.conventionGeneree ? (
                  CONVENTION_ROLE_ORDER.map((role) => (
                    <td key={role} style={{ padding: "12px 10px", textAlign: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <ConventionStatutPill
                          role={role}
                          signataire={row.signataires.find((s) => s.role === role)}
                          allSignataires={row.signataires}
                          canManage
                        />
                      </div>
                    </td>
                  ))
                ) : (
                  // Sans convention générée, des pastilles grises laisseraient croire que les mails sont
                  // partis et attendent leur tour — alors que personne n'a rien reçu.
                  <td colSpan={CONVENTION_ROLE_ORDER.length} style={{ padding: "12px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", fontSize: 12.5 }}>
                      <span style={{ color: "#7a6423", fontWeight: 700 }}>
                        Convention pas encore envoyée
                        {row.contactsManquants.length > 0 && ` — ${row.contactsManquants.join(", ")} manquant`}
                      </span>
                      {row.contactsManquants.length > 0 ? (
                        enCorrection !== row.id && (
                          <button type="button" onClick={() => setEnCorrection(row.id)} style={lienStyle}>
                            Compléter
                          </button>
                        )
                      ) : (
                        <EnvoyerConventionStagiaireButton stagiaireId={row.id} />
                      )}
                    </div>
                  </td>
                )}
                <td style={{ padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ConventionShareActions viewUrl={row.pdfViewUrl} downloadUrl={row.pdfDownloadUrl} nomPrenom={`${row.prenom} ${row.nom}`} />
                  </div>
                </td>
              </tr>
              {enCorrection === row.id && (
                <tr>
                  <td colSpan={nbColonnes} style={{ padding: "4px 16px 16px", background: "#f9fafc" }}>
                    <CorrigerContactsForm
                      stagiaireId={row.id}
                      contacts={row.contacts}
                      conventionGeneree={row.conventionGeneree}
                      onDone={fermer}
                    />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
