"use client"

import { useActionState } from "react"
import { uploadConventionTemplate } from "@/lib/actions/convention-templates"
import { colors, fontBody } from "@/lib/theme"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

export function ConventionTemplateUploadForm() {
  const [state, formAction, isPending] = useActionState(uploadConventionTemplate, undefined)

  return (
    <form
      action={formAction}
      style={{
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: "clamp(18px,3vw,24px)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Nom du modèle</span>
          <input name="nom" required style={fieldStyle} placeholder="Ex. Convention de stage type 2026" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Fichier PDF fillable</span>
          <input name="file" type="file" accept="application/pdf" required style={fieldStyle} />
        </div>
      </div>

      {state?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        style={{
          alignSelf: "flex-start",
          background: isPending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "11px 22px",
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Envoi..." : "Ajouter le modèle"}
      </button>
    </form>
  )
}
