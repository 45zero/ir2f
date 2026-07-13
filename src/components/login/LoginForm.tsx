"use client"

import { useActionState } from "react"
import { authenticate } from "@/lib/actions/auth"
import { colors, fontBody } from "@/lib/theme"

const inputStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="email" style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" style={inputStyle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="password" style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          style={inputStyle}
        />
      </div>

      {errorMessage && (
        <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        style={{
          background: isPending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "13px 26px",
          borderRadius: 4,
          fontSize: 15,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
          marginTop: 4,
        }}
      >
        {isPending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  )
}
