"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { createUser } from "@/lib/actions/users"
import { ROLE_LABELS } from "@/lib/users-shared"
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

const labelStyle = { fontSize: 12, fontWeight: 700, color: colors.navy }

export function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(createUser, undefined)
  const [copied, setCopied] = useState(false)

  if (state?.tempPassword) {
    return (
      <div
        style={{
          background: "#fff",
          border: `1.5px solid ${colors.gold}`,
          borderRadius: 10,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          maxWidth: 480,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 800, color: colors.navy, margin: 0 }}>Compte créé</h2>
        <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
          Communiquez ce mot de passe temporaire à <strong>{state.email}</strong> — l&apos;envoi automatique par
          email n&apos;est pas encore activé.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#f5f7fb",
            border: "1px solid #e4e9f2",
            borderRadius: 6,
            padding: "10px 14px",
          }}
        >
          <code style={{ fontSize: 15, fontWeight: 700, color: colors.text, letterSpacing: 1 }}>
            {state.tempPassword}
          </code>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(state.tempPassword ?? "")
              setCopied(true)
            }}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "1px solid #d8dde5",
              color: colors.navy,
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: fontBody,
            }}
          >
            {copied ? "Copié !" : "Copier"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link
            href="/admin/users"
            style={{ color: colors.navy, fontSize: 13, fontWeight: 700, textDecoration: "none" }}
          >
            Retour à la liste
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      style={{
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: "clamp(18px,3vw,28px)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 560,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={labelStyle}>Prénom</span>
          <input name="prenom" required style={fieldStyle} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={labelStyle}>Nom</span>
          <input name="nom" required style={fieldStyle} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={labelStyle}>Email</span>
          <input name="email" type="email" required style={fieldStyle} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={labelStyle}>Téléphone</span>
          <input name="telephone" style={fieldStyle} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={labelStyle}>Rôle</span>
          <select name="role" defaultValue="STAGIAIRE" style={fieldStyle}>
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
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
          padding: "12px 24px",
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Création..." : "Créer le compte"}
      </button>
    </form>
  )
}
