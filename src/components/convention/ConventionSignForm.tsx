"use client"

import { useActionState, useState } from "react"
import { signerConvention, refuserConvention } from "@/lib/actions/convention-signature"
import { SIGNATURE_CONSENT_TEXT } from "@/lib/signature-consent"
import { SignaturePad } from "@/components/convention/SignaturePad"
import { NATURE_INTERVENTION_OPTIONS, PUBLIC_VISE_OPTIONS, OBJECTIF_PEDAGOGIQUE_FIELDS } from "@/lib/conventions/variables-shared"
import { colors, fontBody } from "@/lib/theme"
import type { RoleSignataire } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
}

function ArticleTroisFields() {
  const [autreChecked, setAutreChecked] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, background: "#f5f7fb", borderRadius: 8, padding: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: colors.navy }}>
          Nature de l&apos;intervention pédagogique <span style={{ fontWeight: 400, color: colors.textLight }}>(plusieurs choix possibles)</span>
        </span>
        {NATURE_INTERVENTION_OPTIONS.map((o) => (
          <label key={o.value} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
            <input
              type="checkbox"
              name="nature"
              value={o.value}
              onChange={o.value === "AUTRE" ? (e) => setAutreChecked(e.target.checked) : undefined}
              style={{ width: 15, height: 15 }}
            />
            {o.label}
          </label>
        ))}
        {autreChecked && (
          <input name="natureAutreTexte" placeholder="Précisez" style={{ ...fieldStyle, marginLeft: 23 }} />
        )}
      </div>

      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: colors.navy }}>Public visé</span>
        <select name="publicVise" required style={{ ...fieldStyle, maxWidth: 200 }}>
          <option value="">— Choisir —</option>
          {PUBLIC_VISE_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: colors.navy }}>Objectifs pédagogiques</span>
        {OBJECTIF_PEDAGOGIQUE_FIELDS.map((o) => (
          <div key={o.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, color: colors.text, flex: "1 1 260px" }}>{o.label}</span>
            <div style={{ display: "flex", gap: 14 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: colors.text }}>
                <input type="radio" name={o.formKey} value="OUI" required style={{ width: 14, height: 14 }} />
                Oui
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: colors.text }}>
                <input type="radio" name={o.formKey} value="NON" style={{ width: 14, height: 14 }} />
                Non
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConventionSignForm({ token, role }: { token: string; role: RoleSignataire }) {
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
      {role === "STAGIAIRE" && <ArticleTroisFields />}

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
