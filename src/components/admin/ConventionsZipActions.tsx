"use client"

import { useActionState, useState } from "react"
import { envoyerConventionsZipParEmail } from "@/lib/actions/conventions"
import { colors, fontBody } from "@/lib/theme"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
}

const buttonStyle = {
  background: colors.navy,
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 4,
  fontSize: 12.5,
  fontWeight: 700,
  fontFamily: fontBody,
  textDecoration: "none",
  cursor: "pointer",
  display: "inline-block",
}

export function ConventionsZipActions({
  formationId,
  sessionId,
  generatedCount,
  unsignedCount,
}: {
  formationId: string
  sessionId: string
  generatedCount: number
  unsignedCount: number
}) {
  const [showShare, setShowShare] = useState(false)
  const boundAction = envoyerConventionsZipParEmail.bind(null, sessionId)
  const [state, formAction, isPending] = useActionState(boundAction, undefined)

  if (generatedCount === 0) return null

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {unsignedCount > 0 && (
        <div style={{ background: "#faf4e6", border: "1px solid #e9d9a8", borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: "#7a6423" }}>
          {unsignedCount} convention{unsignedCount > 1 ? "s" : ""} sur {generatedCount} pas encore entièrement signée{unsignedCount > 1 ? "s" : ""} —
          le fichier téléchargé/envoyé les inclura quand même dans leur état actuel.
        </div>
      )}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <a href={`/admin/formations/${formationId}/conventions/${sessionId}/zip`} style={buttonStyle}>
          Télécharger tout (.zip)
        </a>
        <button type="button" onClick={() => setShowShare((v) => !v)} style={{ ...buttonStyle, background: "transparent", border: "1px solid #d8dde5", color: colors.navy }}>
          Partager par email
        </button>
      </div>
      {showShare && (
        <form action={formAction} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input type="email" name="email" required placeholder="destinataire@email.com" style={{ ...fieldStyle, flex: "1 1 220px" }} />
          <button type="submit" disabled={isPending} style={{ ...buttonStyle, cursor: isPending ? "default" : "pointer" }}>
            {isPending ? "Envoi..." : "Envoyer"}
          </button>
          {state?.error && <span style={{ color: colors.red, fontSize: 12.5 }}>{state.error}</span>}
          {state && !state.error && <span style={{ color: colors.navy, fontSize: 12.5, fontWeight: 700 }}>Email envoyé.</span>}
        </form>
      )}
    </div>
  )
}
