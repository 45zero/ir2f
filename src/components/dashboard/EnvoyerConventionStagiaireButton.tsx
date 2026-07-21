"use client"

import { useActionState } from "react"
import { envoyerConventionStagiaire } from "@/lib/actions/conventions"
import { colors, fontBody } from "@/lib/theme"

export function EnvoyerConventionStagiaireButton({ stagiaireId }: { stagiaireId: string }) {
  const [state, action, isPending] = useActionState(
    async (_prev: { error: string | null } | undefined) => envoyerConventionStagiaire(stagiaireId),
    undefined
  )

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: isPending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: 14,
          fontSize: 11,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {isPending ? "Envoi..." : "Envoyer"}
      </button>
      {state?.error && <span style={{ color: colors.red, fontSize: 10.5 }}>{state.error}</span>}
    </form>
  )
}
