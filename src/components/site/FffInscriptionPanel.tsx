"use client"

import { useActionState, useState } from "react"
import { Hoverable } from "@/components/ui/Hoverable"
import { enrolerViaFff, type FffInscriptionCible } from "@/lib/actions/fff-inscription"
import { colors, fontBody } from "@/lib/theme"

const inputStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
}

const buttonStyle = {
  background: colors.red,
  color: "#fff",
  border: "none",
  padding: "15px 26px",
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
}

const secondaryButtonStyle = {
  background: "transparent",
  color: colors.navy,
  border: `1.5px solid ${colors.navy}`,
  padding: "15px 26px",
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
}

const CIBLE_LABEL: Record<FffInscriptionCible, string> = {
  STAGIAIRE: "S'inscrire moi-même",
  CLUB: "Inscription par mon club",
}

export function FffInscriptionPanel({
  formationId,
  lienFffStagiaire,
  lienFffClub,
  prefill,
}: {
  formationId: string
  lienFffStagiaire: string | null
  lienFffClub: string | null
  prefill?: { nom: string; prenom: string; email: string; telephone: string | null }
}) {
  const [cible, setCible] = useState<FffInscriptionCible | null>(null)

  if (!lienFffStagiaire && !lienFffClub) return null

  if (!cible) {
    return (
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {lienFffStagiaire && (
          <Hoverable as="button" type="button" onClick={() => setCible("STAGIAIRE")} style={buttonStyle} hoverStyle={{ background: colors.redDark }}>
            {CIBLE_LABEL.STAGIAIRE}
          </Hoverable>
        )}
        {lienFffClub && (
          <Hoverable
            as="button"
            type="button"
            onClick={() => setCible("CLUB")}
            style={secondaryButtonStyle}
            hoverStyle={{ background: colors.navy, color: "#fff" }}
          >
            {CIBLE_LABEL.CLUB}
          </Hoverable>
        )}
      </div>
    )
  }

  return <FffCaptureForm formationId={formationId} cible={cible} prefill={prefill} onCancel={() => setCible(null)} />
}

function FffCaptureForm({
  formationId,
  cible,
  prefill,
  onCancel,
}: {
  formationId: string
  cible: FffInscriptionCible
  prefill?: { nom: string; prenom: string; email: string; telephone: string | null }
  onCancel: () => void
}) {
  const [state, formAction, isPending] = useActionState(
    (prev: Awaited<ReturnType<typeof enrolerViaFff>> | undefined, formData: FormData) =>
      enrolerViaFff(formationId, cible, prev, formData),
    undefined
  )

  return (
    <form
      action={formAction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: "#f5f7fb",
        border: "1px solid #e4e9f2",
        borderRadius: 8,
        padding: 16,
        maxWidth: 340,
      }}
    >
      <p style={{ fontSize: 12.5, color: colors.textMuted, margin: "0 0 4px", lineHeight: 1.5 }}>
        {cible === "CLUB"
          ? "Merci de renseigner les informations du stagiaire inscrit par le club. Vous serez ensuite redirigé vers le portail d'inscription de la FFF."
          : "Merci de renseigner vos informations. Vous serez ensuite redirigé vers le portail d'inscription de la FFF."}
      </p>
      <input name="nom" placeholder="Nom" required defaultValue={prefill?.nom} style={inputStyle} />
      <input name="prenom" placeholder="Prénom" required defaultValue={prefill?.prenom} style={inputStyle} />
      <input name="email" type="email" placeholder="Email" required defaultValue={prefill?.email} style={inputStyle} />
      <input name="telephone" placeholder="Téléphone" defaultValue={prefill?.telephone ?? ""} style={inputStyle} />
      <div style={{ display: "flex", gap: 8 }}>
        <Hoverable
          as="button"
          type="submit"
          disabled={isPending}
          style={{ ...buttonStyle, padding: "9px 18px", fontSize: 13 }}
          hoverStyle={{ background: colors.redDark }}
        >
          {isPending ? "Redirection..." : "Continuer vers la FFF"}
        </Hoverable>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "transparent",
            border: "1px solid #d8dde5",
            color: colors.textMuted,
            padding: "9px 14px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: fontBody,
            cursor: "pointer",
          }}
        >
          Annuler
        </button>
      </div>
      {state?.status === "error" && <span style={{ color: colors.red, fontSize: 12 }}>{state.message}</span>}
    </form>
  )
}
