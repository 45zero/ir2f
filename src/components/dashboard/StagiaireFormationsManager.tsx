"use client"

import { useState } from "react"
import Link from "next/link"
import { CATEGORIE_LABELS } from "@/lib/formations-shared"
import { STATUT_INSCRIPTION_LABELS } from "@/lib/inscriptions-shared"
import { colors, fontBody } from "@/lib/theme"
import type { CategorieFormation, StatutInscription } from "@/generated/prisma"

export type StagiaireFormationCard = {
  id: string
  slug: string
  titre: string
  lieu: string | null
  categorie: CategorieFormation
  statut: StatutInscription
}

export type StagiaireFormationDoc = {
  id: string
  nom: string
  formationId: string | null
  signed: boolean
  isNew: boolean
}

export type StagiaireFormationCovoit = {
  id: string
  formationId: string | null
  conducteurNom: string
  depart: string
  destination: string
  dateDepart: string
  placesRestantes: number
}

export type StagiaireFormationMessage = {
  id: string
  formationId: string | null
  from: string
  contenu: string
}

const TABS = [
  { key: "infos", label: "Infos" },
  { key: "documents", label: "Documents" },
  { key: "covoiturage", label: "Covoiturage" },
  { key: "messages", label: "Messages" },
] as const
type TabKey = (typeof TABS)[number]["key"]

const timeFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })

function statutBadgeStyle(statut: StatutInscription) {
  if (statut === "VALIDEE") return { background: colors.gold, color: colors.navy }
  if (statut === "REFUSEE") return { background: "#e2e5ea", color: colors.textLight }
  return { background: "#f5f7fb", color: colors.textLight }
}

export function StagiaireFormationsManager({
  formations,
  documents,
  covoiturages,
  messages,
}: {
  formations: StagiaireFormationCard[]
  documents: StagiaireFormationDoc[]
  covoiturages: StagiaireFormationCovoit[]
  messages: StagiaireFormationMessage[]
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  if (formations.length === 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
        <p style={{ color: colors.textMuted, fontSize: 14, margin: 0 }}>
          Vous n&apos;êtes inscrit à aucune formation pour le moment.
        </p>
        <Link
          href="/formations"
          style={{ background: colors.red, color: "#fff", padding: "11px 22px", borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: "none" }}
        >
          Découvrir les formations
        </Link>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {formations.map((f) => {
        const docs = documents.filter((d) => d.formationId === f.id)
        const covoits = covoiturages.filter((c) => c.formationId === f.id)
        const msgs = messages.filter((m) => m.formationId === f.id)
        const hasUnsigned = docs.some((d) => !d.signed)
        const hasNewDoc = docs.some((d) => d.isNew)
        const isUpToDate = !hasUnsigned && !hasNewDoc && docs.length > 0

        return (
          <FormationCard
            key={f.id}
            formation={f}
            docs={docs}
            covoits={covoits}
            msgs={msgs}
            hasUnsigned={hasUnsigned}
            hasNewDoc={hasNewDoc}
            isUpToDate={isUpToDate}
            isOpen={openId === f.id}
            onToggle={() => setOpenId(openId === f.id ? null : f.id)}
          />
        )
      })}
    </div>
  )
}

function FormationCard({
  formation: f,
  docs,
  covoits,
  msgs,
  hasUnsigned,
  hasNewDoc,
  isUpToDate,
  isOpen,
  onToggle,
}: {
  formation: StagiaireFormationCard
  docs: StagiaireFormationDoc[]
  covoits: StagiaireFormationCovoit[]
  msgs: StagiaireFormationMessage[]
  hasUnsigned: boolean
  hasNewDoc: boolean
  isUpToDate: boolean
  isOpen: boolean
  onToggle: () => void
}) {
  const [tab, setTab] = useState<TabKey>("infos")
  const badge = statutBadgeStyle(f.statut)

  return (
    <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 4px 20px rgba(20,33,61,0.06)", overflow: "hidden" }}>
      <div onClick={onToggle} style={{ cursor: "pointer", padding: 24, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: colors.navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: colors.text }}>{f.titre}</span>
          <span style={{ fontSize: 12.5, color: colors.textLight }}>
            {CATEGORIE_LABELS[f.categorie]}
            {f.lieu ? ` · ${f.lieu}` : ""}
          </span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
            {hasUnsigned && (
              <span style={{ display: "flex", alignItems: "center", gap: 5, background: "#fdeceb", color: colors.red, fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.red, flexShrink: 0 }} />
                Document à signer
              </span>
            )}
            {hasNewDoc && (
              <span style={{ background: "#eef2f9", color: colors.navy, fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 12 }}>
                Nouveau document
              </span>
            )}
            {isUpToDate && (
              <span style={{ background: "#faf4e6", color: "#7a6423", fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 12 }}>À jour</span>
            )}
            {covoits.length > 0 && (
              <span style={{ background: colors.navy, color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 12 }}>
                {covoits.length} trajet{covoits.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
        <span style={{ background: badge.background, color: badge.color, fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 20, whiteSpace: "nowrap" }}>
          {STATUT_INSCRIPTION_LABELS[f.statut]}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a93a3" strokeWidth="2" style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {isOpen && (
        <div style={{ borderTop: "1px solid #eef0f3", padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  border: tab === t.key ? "none" : "1.5px solid #d8dde5",
                  background: tab === t.key ? colors.navy : "#fff",
                  color: tab === t.key ? "#fff" : colors.navy,
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: fontBody,
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "infos" && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: colors.textMuted, fontSize: 13.5 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {f.lieu ?? "Lieu à confirmer"}
            </div>
          )}

          {tab === "documents" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {docs.length === 0 && <span style={{ fontSize: 13, color: colors.textLight }}>Aucun document pour cette formation.</span>}
              {docs.map((d) => (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #eef0f3" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={d.signed ? colors.gold : colors.red} strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: colors.text }}>{d.nom}</span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "5px 10px",
                      borderRadius: 14,
                      color: d.signed ? colors.navy : colors.red,
                      background: d.signed ? "#eef2f9" : "#fdeceb",
                    }}
                  >
                    {d.signed ? "Signé" : "À signer"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === "covoiturage" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {covoits.length === 0 && <span style={{ fontSize: 13, color: colors.textLight }}>Aucun trajet proposé pour cette formation.</span>}
              {covoits.map((c) => (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #eef0f3", fontSize: 13, color: colors.text }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2">
                    <path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17l1.5-6.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 17M7 9V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
                  </svg>
                  <strong>{c.conducteurNom}</strong> · {c.depart} → {timeFormatter.format(new Date(c.dateDepart))} · {c.placesRestantes} places
                </div>
              ))}
            </div>
          )}

          {tab === "messages" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {msgs.length === 0 && <span style={{ fontSize: 13, color: colors.textLight }}>Aucun message pour cette formation.</span>}
              {msgs.map((m) => (
                <div key={m.id}>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: colors.text }}>{m.from}</span>
                  <span style={{ fontSize: 12.5, color: colors.textLight }}>{m.contenu}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
