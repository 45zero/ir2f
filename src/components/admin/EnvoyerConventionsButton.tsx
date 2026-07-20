"use client"

import { useActionState } from "react"
import { envoyerConventions } from "@/lib/actions/conventions"
import { colors, fontBody } from "@/lib/theme"

export function EnvoyerConventionsButton({ formationId }: { formationId: string }) {
  const boundAction = envoyerConventions.bind(null, formationId)
  const [state, formAction, isPending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof envoyerConventions>> | undefined) => boundAction(),
    undefined
  )

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: isPending ? "#e999a0" : colors.red,
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
        {isPending ? "Envoi en cours..." : "Envoyer les conventions"}
      </button>
      {state?.error && <span style={{ color: colors.red, fontSize: 12.5 }}>{state.error}</span>}
      {state && !state.error && (
        <span style={{ color: colors.navy, fontSize: 12.5, fontWeight: 700 }}>
          {state.sent} convention{state.sent > 1 ? "s" : ""} envoyée{state.sent > 1 ? "s" : ""}.
          {state.skipped.length > 0 && ` Ignorés : ${state.skipped.join(", ")}.`}
        </span>
      )}
    </form>
  )
}
