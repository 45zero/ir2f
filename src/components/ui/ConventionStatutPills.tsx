"use client"

import { useActionState, useTransition } from "react"
import { renvoyerEtape, logRenvoiWhatsapp } from "@/lib/actions/conventions"
import { colors } from "@/lib/theme"
import type { RoleSignataire, StatutSignature, RenvoiCanal } from "@/generated/prisma"

export const CONVENTION_ROLE_ORDER: RoleSignataire[] = ["STAGIAIRE", "CLUB", "TUTEUR", "MAITRE_DE_STAGE", "RESPONSABLE_PEDAGOGIQUE"]

export const CONVENTION_ROLE_LABELS: Record<RoleSignataire, string> = {
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

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" })
const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeZone: "Europe/Paris" })

export type ConventionSignataireStatut = {
  id: string
  role: RoleSignataire
  statut: StatutSignature
  motifRefus: string | null
  signedAt: string | null
  ipAddress: string | null
  token: string
  nom: string
  dernierRenvoiPar: string | null
  dernierRenvoiCanal: RenvoiCanal | null
  dernierRenvoiAt: string | null
}

function tooltipFor(signataire: ConventionSignataireStatut): string {
  if (signataire.statut === "SIGNE" && signataire.signedAt) {
    const when = dateTimeFormatter.format(new Date(signataire.signedAt))
    return signataire.ipAddress ? `Signé le ${when} · depuis l'IP ${signataire.ipAddress}` : `Signé le ${when}`
  }
  if (signataire.statut === "REFUSE" && signataire.motifRefus) {
    return `${STATUT_LABEL.REFUSE} — ${signataire.motifRefus}`
  }
  return STATUT_LABEL[signataire.statut]
}

function MailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 20l1-5.5A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M8.5 10.5c0 3 2.5 5.5 5.5 5.5" strokeLinecap="round" />
    </svg>
  )
}

function RenvoiButtons({ signataire }: { signataire: ConventionSignataireStatut }) {
  const [mailState, mailAction, mailPending] = useActionState(
    async (_prev: { error: string | null } | undefined) => renvoyerEtape(signataire.id),
    undefined
  )
  const [isLoggingWhatsapp, startTransition] = useTransition()

  function onWhatsapp() {
    const url = `${window.location.origin}/convention/${signataire.token}`
    const message = `Bonjour ${signataire.nom}, votre convention de stage est prête à signer : ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
    startTransition(async () => {
      await logRenvoiWhatsapp(signataire.id)
    })
  }

  const iconButtonStyle = {
    background: "transparent",
    border: "1px solid #d8dde5",
    color: colors.navy,
    borderRadius: 4,
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <div style={{ display: "flex", gap: 4 }}>
        <form action={mailAction}>
          <button type="submit" disabled={mailPending} title="Renvoyer par email" aria-label="Renvoyer par email" style={iconButtonStyle}>
            <MailIcon />
          </button>
        </form>
        <button
          type="button"
          onClick={onWhatsapp}
          disabled={isLoggingWhatsapp}
          title="Renvoyer par WhatsApp"
          aria-label="Renvoyer par WhatsApp"
          style={iconButtonStyle}
        >
          <WhatsappIcon />
        </button>
      </div>
      {mailState?.error && <span style={{ color: colors.red, fontSize: 9.5, textAlign: "center" }}>{mailState.error}</span>}
    </div>
  )
}

export function ConventionStatutPill({
  role,
  signataire,
  canManage,
  showLabel,
}: {
  role: RoleSignataire
  signataire: ConventionSignataireStatut | undefined
  canManage: boolean
  showLabel?: boolean
}) {
  const label = showLabel ? (
    <span style={{ fontSize: 9, color: colors.textLight, textAlign: "center", whiteSpace: "nowrap" }}>{CONVENTION_ROLE_LABELS[role]}</span>
  ) : null

  if (!signataire) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        {label}
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: STATUT_COLOR.NON_ENVOYE, display: "inline-block" }} />
      </div>
    )
  }

  const canResend = canManage && (signataire.statut === "EN_ATTENTE" || signataire.statut === "REFUSE")

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }} title={tooltipFor(signataire)}>
      {label}
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: STATUT_COLOR[signataire.statut], display: "inline-block" }} />
      {canResend && <RenvoiButtons signataire={signataire} />}
      {signataire.dernierRenvoiPar && signataire.dernierRenvoiAt && (
        <span style={{ fontSize: 9, color: colors.textLight, textAlign: "center", whiteSpace: "nowrap" }}>
          Renvoi {signataire.dernierRenvoiCanal === "WHATSAPP" ? "WhatsApp" : "mail"} par {signataire.dernierRenvoiPar}
          <br />
          le {dateFormatter.format(new Date(signataire.dernierRenvoiAt))}
        </span>
      )}
    </div>
  )
}

/** Rangée de 5 pastilles (une par étape du circuit de signature), avec le rôle affiché au-dessus de chacune pour indiquer qui doit agir. */
export function ConventionStatutPills({
  signataires,
  canManage,
}: {
  signataires: ConventionSignataireStatut[]
  canManage: boolean
}) {
  return (
    <div style={{ display: "flex", gap: 14 }}>
      {CONVENTION_ROLE_ORDER.map((role) => (
        <ConventionStatutPill key={role} role={role} signataire={signataires.find((s) => s.role === role)} canManage={canManage} showLabel />
      ))}
    </div>
  )
}
