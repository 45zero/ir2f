"use client"

import { useActionState } from "react"
import { envoyerSignatureResponsablePedagogique } from "@/lib/actions/convention-formation-signature"
import { colors, fontBody } from "@/lib/theme"

type Props = {
  formationId: string
  responsablePedagogiqueNom: string | null
  envoyeAt: string | null
  signedAt: string | null
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" })

export function EnvoyerSignatureResponsablePedagogiqueButton({ formationId, responsablePedagogiqueNom, envoyeAt, signedAt }: Props) {
  const boundAction = envoyerSignatureResponsablePedagogique.bind(null, formationId)
  const [state, formAction, isPending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof envoyerSignatureResponsablePedagogique>> | undefined) => boundAction(),
    undefined
  )

  if (signedAt) {
    return (
      <div style={{ background: "#e6f4ea", border: "1px solid #bfe3cb", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#1a6b3a" }}>
        <strong>{responsablePedagogiqueNom}</strong> a signé le {dateFormatter.format(new Date(signedAt))}. Sa
        signature est appliquée automatiquement à chaque convention générée pour cette formation.
      </div>
    )
  }

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: isPending ? "#e999a0" : colors.navy,
          color: "#fff",
          border: "none",
          padding: "11px 20px",
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Envoi..." : envoyeAt ? "Renvoyer au responsable pédagogique pour signature" : "Envoyer au responsable pédagogique pour signature"}
      </button>
      {envoyeAt && !state && (
        <span style={{ color: colors.textLight, fontSize: 12 }}>
          Demande déjà envoyée le {dateFormatter.format(new Date(envoyeAt))}, en attente de signature.
        </span>
      )}
      {state?.error && <span style={{ color: colors.red, fontSize: 12.5 }}>{state.error}</span>}
      {state && !state.error && <span style={{ color: colors.navy, fontSize: 12.5, fontWeight: 700 }}>Email envoyé.</span>}
    </form>
  )
}
