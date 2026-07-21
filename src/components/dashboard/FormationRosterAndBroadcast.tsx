"use client"

import { useState } from "react"
import { BroadcastComposerModal } from "@/components/dashboard/BroadcastComposerModal"
import { DocumentLinkActions } from "@/components/dashboard/DocumentLinkActions"
import { ConventionShareActions } from "@/components/dashboard/ConventionShareActions"
import { EnvoyerConventionStagiaireButton } from "@/components/dashboard/EnvoyerConventionStagiaireButton"
import { ImportStagiairesForm } from "@/components/admin/ImportStagiairesForm"
import { EnvoyerConventionsButton } from "@/components/admin/EnvoyerConventionsButton"
import { ConventionStatutPills, type ConventionSignataireStatut } from "@/components/ui/ConventionStatutPills"
import { colors, fontBody } from "@/lib/theme"
import type { OrigineInscription } from "@/generated/prisma"

const ORIGINE_LABEL: Record<OrigineInscription, string | null> = {
  INTERNE: null,
  FFF_STAGIAIRE: "Via FFF — stagiaire",
  FFF_CLUB: "Via FFF — club",
}

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" })

export type FormateurFormationRow = {
  id: string
  titre: string
  lieu: string | null
  dateLabel: string | null
  stagiaireCount: number
  unsignedCount: number
  documentsCount: number
  fullySignedDocumentsCount: number
  covoiturageCount: number
  stagiaires: {
    id: string
    nom: string
    prenom: string
    email: string
    telephone: string | null
    origine: OrigineInscription
    documents: { id: string; nom: string; signed: boolean; signedAt: string | null; viewUrl: string | null; downloadUrl: string | null }[]
  }[]
  conventions: {
    id: string
    nom: string
    prenom: string
    club: string | null
    sent: boolean
    pdfViewUrl: string | null
    pdfDownloadUrl: string | null
    signataires: ConventionSignataireStatut[]
  }[]
}

function initialsOf(prenom: string, nom: string) {
  return `${prenom[0] ?? ""}${nom[0] ?? ""}`.toUpperCase()
}

export function FormationRosterAndBroadcast({
  formations,
  allowBroadcast = true,
  isAdmin = false,
}: {
  formations: FormateurFormationRow[]
  allowBroadcast?: boolean
  isAdmin?: boolean
}) {
  const [openFormationId, setOpenFormationId] = useState<string | null>(null)
  const [openStagiaireId, setOpenStagiaireId] = useState<string | null>(null)
  const [broadcastFormationId, setBroadcastFormationId] = useState<string | null>(null)

  if (formations.length === 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
        Aucune formation ne vous est encore assignée. Un administrateur doit vous ajouter comme formateur sur une
        formation.
      </div>
    )
  }

  const broadcastFormation = formations.find((f) => f.id === broadcastFormationId) ?? null

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {formations.map((f) => {
        const isOpen = openFormationId === f.id
        return (
          <div key={f.id} style={{ background: "#fff", borderRadius: 14, boxShadow: "0 4px 20px rgba(20,33,61,0.06)", overflow: "hidden" }}>
            <div
              onClick={() => {
                setOpenFormationId(isOpen ? null : f.id)
                setOpenStagiaireId(null)
              }}
              style={{ cursor: "pointer", padding: 24, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: colors.navy,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: colors.text }}>{f.titre}</span>
                <span style={{ fontSize: 12.5, color: colors.textLight }}>
                  {[f.lieu, f.dateLabel].filter(Boolean).join(" · ") || "Aucune session à venir"}
                </span>
              </div>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#eef2f9",
                  color: colors.navy,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: 16,
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2.2">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
                </svg>
                {f.stagiaireCount} stagiaires
              </span>
              {f.documentsCount > 0 && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: f.fullySignedDocumentsCount === f.documentsCount ? "#e6f4ea" : "#faf4e6",
                    color: f.fullySignedDocumentsCount === f.documentsCount ? "#1a6b3a" : "#7a6423",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "6px 12px",
                    borderRadius: 16,
                    whiteSpace: "nowrap",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  {f.fullySignedDocumentsCount}/{f.documentsCount} documents signés
                </span>
              )}
              {f.covoiturageCount > 0 && (
                <span style={{ display: "flex", alignItems: "center", gap: 6, background: "#eef2f9", color: colors.navy, fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 16, whiteSpace: "nowrap" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2.2">
                    <path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17l1.5-6.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 17M7 9V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
                  </svg>
                  {f.covoiturageCount} trajet{f.covoiturageCount > 1 ? "s" : ""}
                </span>
              )}
              {f.unsignedCount > 0 && (
                <span style={{ background: "#fdeceb", color: colors.red, fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 14, whiteSpace: "nowrap" }}>
                  {f.unsignedCount} à signer
                </span>
              )}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8a93a3"
                strokeWidth="2"
                style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {isOpen && (
              <div style={{ borderTop: "1px solid #eef0f3", padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Dossiers stagiaires
                  </span>
                  {allowBroadcast && (
                    <button
                      onClick={() => setBroadcastFormationId(f.id)}
                      style={{
                        background: colors.navy,
                        color: "#fff",
                        border: "none",
                        padding: "9px 16px",
                        borderRadius: 16,
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: fontBody,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      Envoyer un document
                    </button>
                  )}
                </div>

                {f.stagiaires.length === 0 && (
                  <span style={{ fontSize: 13, color: colors.textLight }}>Aucun stagiaire inscrit pour le moment.</span>
                )}

                {f.stagiaires.map((s) => {
                  const unsigned = s.documents.filter((d) => !d.signed).length
                  const stagiaireOpen = openStagiaireId === s.id
                  return (
                    <div key={s.id} style={{ background: "#f5f7fb", borderRadius: 10, overflow: "hidden" }}>
                      <div
                        onClick={() => setOpenStagiaireId(stagiaireOpen ? null : s.id)}
                        style={{ cursor: "pointer", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: colors.gold,
                            color: colors.navy,
                            fontSize: 11,
                            fontWeight: 800,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {initialsOf(s.prenom, s.nom)}
                        </div>
                        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: colors.text }}>
                            {s.prenom} {s.nom}
                          </span>
                          <span style={{ fontSize: 11.5, color: colors.textLight }}>
                            {s.email}
                            {s.telephone ? ` · ${s.telephone}` : ""}
                          </span>
                        </span>
                        {ORIGINE_LABEL[s.origine] && (
                          <span
                            style={{
                              background: "#eef2f9",
                              color: colors.navy,
                              fontSize: 10.5,
                              fontWeight: 700,
                              padding: "4px 9px",
                              borderRadius: 12,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            {ORIGINE_LABEL[s.origine]}
                          </span>
                        )}
                        {unsigned > 0 && <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors.red, flexShrink: 0 }} />}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#8a93a3"
                          strokeWidth="2"
                          style={{ flexShrink: 0, transform: stagiaireOpen ? "rotate(180deg)" : "none" }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {stagiaireOpen && (
                        <div style={{ padding: "0 16px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                          {s.documents.length === 0 && (
                            <span style={{ fontSize: 12.5, color: colors.textLight }}>Aucun document pour cette formation.</span>
                          )}
                          {s.documents.map((d) => (
                            <div key={d.id} style={{ display: "flex", flexDirection: "column", gap: 4, background: "#fff", padding: "9px 12px", borderRadius: 8 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={d.signed ? colors.gold : colors.red} strokeWidth="2">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                </svg>
                                <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: colors.text }}>{d.nom}</span>
                                <span
                                  style={{
                                    fontSize: 10.5,
                                    fontWeight: 700,
                                    padding: "4px 9px",
                                    borderRadius: 12,
                                    color: d.signed ? colors.navy : colors.red,
                                    background: d.signed ? "#eef2f9" : "#fdeceb",
                                  }}
                                >
                                  {d.signed ? "Signé" : "À signer"}
                                </span>
                                <DocumentLinkActions viewUrl={d.viewUrl} downloadUrl={d.downloadUrl} />
                              </div>
                              {d.signed && d.signedAt && (
                                <span style={{ fontSize: 11, color: colors.textLight, paddingLeft: 26 }}>
                                  Signé le {dateTimeFormatter.format(new Date(d.signedAt))}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}

                {(isAdmin || f.conventions.length > 0) && (
                  <>
                    <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 8 }}>
                      Conventions de stage
                    </span>
                    {isAdmin && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <ImportStagiairesForm formationId={f.id} />
                        <EnvoyerConventionsButton formationId={f.id} />
                      </div>
                    )}
                    {f.conventions.length === 0 && (
                      <span style={{ fontSize: 12.5, color: colors.textLight }}>Aucun stagiaire importé pour cette formation.</span>
                    )}
                    {f.conventions.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          background: "#f5f7fb",
                          borderRadius: 10,
                          padding: "12px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={{ flex: "1 1 160px", minWidth: 140, fontSize: 13, fontWeight: 700, color: colors.text }}>
                          {c.prenom} {c.nom}
                          {c.club && <span style={{ display: "block", fontSize: 11, fontWeight: 400, color: colors.textLight }}>{c.club}</span>}
                        </span>
                        <ConventionStatutPills signataires={c.signataires} canManage={isAdmin} />
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
                          <ConventionShareActions
                            viewUrl={c.pdfViewUrl}
                            downloadUrl={c.pdfDownloadUrl}
                            nomPrenom={`${c.prenom} ${c.nom}`}
                          />
                          {isAdmin && !c.sent && <EnvoyerConventionStagiaireButton stagiaireId={c.id} />}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        )
      })}

      {broadcastFormation && (
        <BroadcastComposerModal
          formationId={broadcastFormation.id}
          formationTitre={broadcastFormation.titre}
          stagiaires={broadcastFormation.stagiaires}
          onClose={() => setBroadcastFormationId(null)}
        />
      )}
    </div>
  )
}
