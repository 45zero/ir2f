"use client"

import { useMemo, useState, useActionState } from "react"
import { validateDemande, refuseDemande } from "@/lib/actions/inscriptions"
import { STATUT_INSCRIPTION_LABELS } from "@/lib/inscriptions-shared"
import { colors, fontBody } from "@/lib/theme"
import type { StatutInscription } from "@/generated/prisma"

export type AdminDemandeRow = {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string | null
  message: string | null
  statut: StatutInscription
  createdAt: string
  formationTitre: string | null
}

const STATUT_COLORS: Record<StatutInscription, string> = {
  EN_ATTENTE: colors.gold,
  VALIDEE: "#3f9142",
  REFUSEE: "#b7bfcc",
}

const FILTERS: { value: "EN_ATTENTE" | "all" | StatutInscription; label: string }[] = [
  { value: "EN_ATTENTE", label: "En attente" },
  { value: "all", label: "Toutes" },
  { value: "VALIDEE", label: "Validées" },
  { value: "REFUSEE", label: "Refusées" },
]

const selectStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  color: colors.text,
  cursor: "pointer" as const,
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" })

export function DemandesTable({ demandes }: { demandes: AdminDemandeRow[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("EN_ATTENTE")

  const filtered = useMemo(
    () => demandes.filter((d) => filter === "all" || d.statut === filter),
    [demandes, filter]
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} style={{ ...selectStyle, alignSelf: "flex-start" }}>
        {FILTERS.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      {filtered.length === 0 && (
        <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
          Aucune demande {filter === "EN_ATTENTE" ? "en attente" : ""}.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((d) => (
          <DemandeCard key={d.id} demande={d} />
        ))}
      </div>
    </div>
  )
}

function DemandeCard({ demande }: { demande: AdminDemandeRow }) {
  const [validateState, validateAction, validatePending] = useActionState(
    (prev: Awaited<ReturnType<typeof validateDemande>> | undefined) => validateDemande(demande.id, prev),
    undefined
  )
  const [refuseState, refuseAction, refusePending] = useActionState(
    (prev: Awaited<ReturnType<typeof refuseDemande>> | undefined) => refuseDemande(demande.id, prev),
    undefined
  )

  const pending = validatePending || refusePending
  const resolvedStatut: StatutInscription = validateState?.error === null ? "VALIDEE" : refuseState?.error === null ? "REFUSEE" : demande.statut

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: colors.text }}>
            {demande.prenom} {demande.nom}
          </span>
          <span style={{ fontSize: 12, color: colors.textLight }}>{demande.email}</span>
          {demande.telephone && <span style={{ fontSize: 12, color: colors.textLight }}>{demande.telephone}</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <span
            style={{
              display: "inline-flex",
              background: STATUT_COLORS[resolvedStatut],
              color: resolvedStatut === "REFUSEE" ? colors.textLight : "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 12,
            }}
          >
            {STATUT_INSCRIPTION_LABELS[resolvedStatut]}
          </span>
          <span style={{ fontSize: 11, color: colors.textLight }}>{dateFormatter.format(new Date(demande.createdAt))}</span>
        </div>
      </div>

      <span style={{ fontSize: 13, color: colors.textMuted }}>
        <strong style={{ color: colors.text }}>Formation :</strong> {demande.formationTitre ?? "Demande générale"}
      </span>

      {demande.message && (
        <p style={{ fontSize: 13, color: colors.textMuted, margin: 0, background: "#f5f7fb", borderRadius: 6, padding: 12 }}>
          {demande.message}
        </p>
      )}

      {resolvedStatut === "EN_ATTENTE" && (
        <div style={{ display: "flex", gap: 10 }}>
          <form action={validateAction}>
            <button
              type="submit"
              disabled={pending}
              style={{
                background: pending ? "#a9c9ab" : "#3f9142",
                color: "#fff",
                border: "none",
                padding: "9px 18px",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: fontBody,
                cursor: pending ? "default" : "pointer",
              }}
            >
              Valider
            </button>
          </form>
          <form action={refuseAction}>
            <button
              type="submit"
              disabled={pending}
              style={{
                background: "transparent",
                border: "1px solid #f3c6cb",
                color: colors.red,
                padding: "9px 18px",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: fontBody,
                cursor: pending ? "default" : "pointer",
              }}
            >
              Refuser
            </button>
          </form>
        </div>
      )}

      {(validateState?.error || refuseState?.error) && (
        <p style={{ color: colors.red, fontSize: 12, margin: 0 }}>{validateState?.error || refuseState?.error}</p>
      )}

      {validateState?.accountCreated && validateState.tempPassword && (
        <TempPasswordBanner email={validateState.email ?? demande.email} tempPassword={validateState.tempPassword} />
      )}
      {validateState?.error === null && !validateState.accountCreated && (
        <p style={{ color: "#3f9142", fontSize: 12, margin: 0, fontWeight: 600 }}>
          Demande validée — un compte existait déjà pour {demande.email}.
        </p>
      )}
    </div>
  )
}

function TempPasswordBanner({ email, tempPassword }: { email: string; tempPassword: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div style={{ background: "#f5f7fb", border: `1px solid ${colors.gold}`, borderRadius: 6, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 12, color: colors.textMuted }}>
        Compte créé pour <strong>{email}</strong> — communiquez ce mot de passe temporaire manuellement :
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <code style={{ fontSize: 15, fontWeight: 700, color: colors.text, letterSpacing: 1 }}>{tempPassword}</code>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(tempPassword)
            setCopied(true)
          }}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "1px solid #d8dde5",
            color: colors.navy,
            fontSize: 12,
            fontWeight: 700,
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
            fontFamily: fontBody,
          }}
        >
          {copied ? "Copié !" : "Copier"}
        </button>
      </div>
    </div>
  )
}
