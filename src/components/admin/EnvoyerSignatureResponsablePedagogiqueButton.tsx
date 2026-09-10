"use client"

import { useActionState } from "react"
import { envoyerSignatureResponsablePedagogique, reinitialiserSignatureResponsablePedagogique } from "@/lib/actions/convention-formation-signature"
import { colors, fontBody } from "@/lib/theme"

type Props = {
  sessionId: string
  responsablePedagogiqueNom: string | null
  envoyeAt: string | null
  signedAt: string | null
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" })

export function EnvoyerSignatureResponsablePedagogiqueButton({ sessionId, responsablePedagogiqueNom, envoyeAt, signedAt }: Props) {
  const boundAction = envoyerSignatureResponsablePedagogique.bind(null, sessionId)
  const [state, formAction, isPending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof envoyerSignatureResponsablePedagogique>> | undefined) => boundAction(),
    undefined
  )

  if (signedAt) {
    return (
      <div style={{ background: "#e6f4ea", border: "1px solid #bfe3cb", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#1a6b3a", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        <span>
          <strong>{responsablePedagogiqueNom}</strong> a signé le {dateFormatter.format(new Date(signedAt))}. Sa
          signature est appliquée automatiquement à chaque convention générée pour cette session.
        </span>
        <ReinitialiserButton sessionId={sessionId} />
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

/** Invalide la signature de session déjà enregistrée pour en redemander une nouvelle (ex. signature de test conservée par erreur, changement de responsable pédagogique). N'affecte pas les conventions déjà générées, seulement celles générées après le reset. */
function ReinitialiserButton({ sessionId }: { sessionId: string }) {
  const boundAction = reinitialiserSignatureResponsablePedagogique.bind(null, sessionId)
  const [state, formAction, isPending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof reinitialiserSignatureResponsablePedagogique>> | undefined) => boundAction(),
    undefined
  )

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
      <button
        type="submit"
        disabled={isPending}
        onClick={(e) => {
          if (!confirm("Invalider cette signature et en redemander une nouvelle ? Les conventions déjà générées ne seront pas modifiées, seules les prochaines utiliseront la nouvelle signature.")) {
            e.preventDefault()
          }
        }}
        style={{
          background: "transparent",
          color: "#1a6b3a",
          border: "1px solid #bfe3cb",
          padding: "6px 12px",
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Réinitialisation..." : "Invalider et redemander une nouvelle signature"}
      </button>
      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
    </form>
  )
}
