"use client"

import { useState, useActionState } from "react"
import { signDocument } from "@/lib/actions/documents"
import { SIGNATURE_CONSENT_TEXT } from "@/lib/signature-consent"
import { colors, fontBody } from "@/lib/theme"

export function SignDocumentButton({ documentId, signed }: { documentId: string; signed: boolean }) {
  const [confirming, setConfirming] = useState(false)
  const [signState, signAction, signPending] = useActionState(
    async () => {
      await signDocument(documentId)
      return { done: true }
    },
    undefined
  )

  const isSigned = signed || Boolean(signState?.done)

  if (isSigned) {
    return <span style={{ color: "#3f9142", fontSize: 12, fontWeight: 600 }}>Signé électroniquement</span>
  }

  if (confirming) {
    return (
      <div style={{ background: "#f5f7fb", border: "1px solid #e4e9f2", borderRadius: 6, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ fontSize: 11.5, color: colors.textMuted, margin: 0, lineHeight: 1.5 }}>{SIGNATURE_CONSENT_TEXT}</p>
        <form action={signAction} style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={signPending}
            style={{
              background: colors.navy,
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: signPending ? "default" : "pointer",
            }}
          >
            {signPending ? "Signature..." : "Je confirme et signe"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            style={{ background: "transparent", border: "1px solid #d8dde5", color: colors.navy, fontSize: 12, fontWeight: 700, padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontFamily: fontBody }}
          >
            Annuler
          </button>
        </form>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      style={{
        alignSelf: "flex-start",
        background: colors.navy,
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: fontBody,
        cursor: "pointer",
      }}
    >
      Signer électroniquement
    </button>
  )
}
