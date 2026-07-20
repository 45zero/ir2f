"use client"

import { useActionState, useState } from "react"
import { signerConvention, refuserConvention } from "@/lib/actions/convention-signature"
import { SIGNATURE_CONSENT_TEXT } from "@/lib/signature-consent"
import { SignaturePad } from "@/components/convention/SignaturePad"
import { colors, fontBody } from "@/lib/theme"

export function ConventionSignForm({ token }: { token: string }) {
  const [showRefus, setShowRefus] = useState(false)
  const [signState, signAction, signPending] = useActionState(signerConvention.bind(null, token), undefined)
  const [refusState, refusAction, refusPending] = useActionState(refuserConvention.bind(null, token), undefined)

  if (signState?.success) {
    return (
      <div style={{ background: "#e6f4ea", border: "1px solid #bfe3cb", borderRadius: 10, padding: 20, color: "#1a6b3a", fontSize: 14, fontWeight: 600 }}>
        Merci, votre signature a bien été enregistrée. La convention poursuit son circuit de signature.
      </div>
    )
  }
  if (refusState?.success) {
    return (
      <div style={{ background: "#fdeceb", border: "1px solid #f3c6cb", borderRadius: 10, padding: 20, color: colors.red, fontSize: 14, fontWeight: 600 }}>
        Votre refus a bien été enregistré. L&apos;administrateur IR2F a été notifié.
      </div>
    )
  }

  if (showRefus) {
    return (
      <form action={refusAction} style={{ display: "flex", flexDirection: "column", gap: 12, background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Motif du refus (optionnel)</span>
        <textarea
          name="motif"
          rows={3}
          style={{ border: "1px solid #e2e5ea", borderRadius: 5, padding: "10px 12px", fontSize: 13, fontFamily: fontBody, outline: "none", resize: "vertical" }}
        />
        {refusState?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{refusState.error}</p>}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="submit"
            disabled={refusPending}
            style={{ background: colors.red, color: "#fff", border: "none", padding: "10px 18px", borderRadius: 4, fontSize: 13, fontWeight: 700, fontFamily: fontBody, cursor: refusPending ? "default" : "pointer" }}
          >
            {refusPending ? "Envoi..." : "Confirmer le refus"}
          </button>
          <button
            type="button"
            onClick={() => setShowRefus(false)}
            style={{ background: "transparent", border: "1px solid #d8dde5", color: colors.navy, padding: "10px 18px", borderRadius: 4, fontSize: 13, fontWeight: 700, fontFamily: fontBody, cursor: "pointer" }}
          >
            Annuler
          </button>
        </div>
      </form>
    )
  }

  return (
    <form action={signAction} style={{ display: "flex", flexDirection: "column", gap: 16, background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20 }}>
      <SignaturePad name="signatureImage" />

      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: colors.textMuted, lineHeight: 1.5 }}>
        <input type="checkbox" name="consent" style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
        {SIGNATURE_CONSENT_TEXT}
      </label>

      {signState?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{signState.error}</p>}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={signPending}
          style={{ background: signPending ? "#e999a0" : colors.red, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 4, fontSize: 14, fontWeight: 700, fontFamily: fontBody, cursor: signPending ? "default" : "pointer" }}
        >
          {signPending ? "Signature..." : "Je confirme et signe"}
        </button>
        <button
          type="button"
          onClick={() => setShowRefus(true)}
          style={{ background: "transparent", border: "1px solid #d8dde5", color: colors.textMuted, padding: "12px 20px", borderRadius: 4, fontSize: 13, fontWeight: 700, fontFamily: fontBody, cursor: "pointer" }}
        >
          Refuser
        </button>
      </div>
    </form>
  )
}
