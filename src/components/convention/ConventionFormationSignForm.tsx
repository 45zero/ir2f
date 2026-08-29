"use client"

import { useActionState } from "react"
import { signerFormationResponsablePedagogique } from "@/lib/actions/convention-formation-signature"
import { SIGNATURE_CONSENT_TEXT } from "@/lib/signature-consent"
import { SignaturePad } from "@/components/convention/SignaturePad"
import { colors, fontBody } from "@/lib/theme"

export function ConventionFormationSignForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(signerFormationResponsablePedagogique.bind(null, token), undefined)

  if (state?.success) {
    return (
      <div style={{ background: "#e6f4ea", border: "1px solid #bfe3cb", borderRadius: 10, padding: 20, color: "#1a6b3a", fontSize: 14, fontWeight: 600 }}>
        Merci, votre signature a bien été enregistrée. Elle sera appliquée automatiquement à la convention de
        chaque stagiaire de cette formation.
      </div>
    )
  }

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 16, background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20 }}>
      <SignaturePad name="signatureImage" />

      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: colors.textMuted, lineHeight: 1.5 }}>
        <input type="checkbox" name="consent" style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
        {SIGNATURE_CONSENT_TEXT}
      </label>

      {state?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        style={{
          alignSelf: "flex-start",
          background: pending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: pending ? "default" : "pointer",
        }}
      >
        {pending ? "Signature..." : "Je confirme et signe"}
      </button>
    </form>
  )
}
