"use client"

import { useActionState } from "react"
import { importStagiairesExcel } from "@/lib/actions/convention-stagiaires"
import { colors, fontBody } from "@/lib/theme"

export function ImportStagiairesForm({ formationId }: { formationId: string }) {
  const boundAction = importStagiairesExcel.bind(null, formationId)
  const [state, formAction, isPending] = useActionState(boundAction, undefined)

  return (
    <form
      action={formAction}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap",
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: "16px 18px",
      }}
    >
      <input type="file" name="file" accept=".xlsx,.xls" required style={{ fontSize: 13, fontFamily: fontBody }} />
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: isPending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "9px 18px",
          borderRadius: 4,
          fontSize: 12.5,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Import..." : "Importer le fichier"}
      </button>
      {state?.error && <span style={{ color: colors.red, fontSize: 12.5 }}>{state.error}</span>}
      {state && !state.error && state.imported !== null && (
        <span style={{ color: colors.navy, fontSize: 12.5, fontWeight: 700 }}>
          {state.imported} stagiaire{state.imported > 1 ? "s" : ""} importé{state.imported > 1 ? "s" : ""}.
        </span>
      )}
      {state?.warning && (
        <span style={{ color: "#7a6423", fontSize: 12, background: "#faf4e6", padding: "4px 10px", borderRadius: 12, flexBasis: "100%" }}>
          {state.warning}
        </span>
      )}
    </form>
  )
}
