"use client"

import { useActionState, useState } from "react"
import { updateUser, resetUserPassword } from "@/lib/actions/users"
import { ROLE_LABELS } from "@/lib/users-shared"
import { colors, fontBody } from "@/lib/theme"
import type { Role } from "@/generated/prisma"

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

export type EditableUser = {
  id: string
  email: string
  nom: string
  prenom: string
  telephone: string
  role: Role
  actif: boolean
}

export function EditUserForm({ user, isSelf }: { user: EditableUser; isSelf: boolean }) {
  const [state, formAction, isPending] = useActionState(
    (_prev: { error: string | null } | undefined, formData: FormData) => updateUser(user.id, formData),
    undefined
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
            <input name="prenom" required defaultValue={user.prenom} style={fieldStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={labelStyle}>Nom</span>
            <input name="nom" required defaultValue={user.nom} style={fieldStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={labelStyle}>Email</span>
            <input name="email" type="email" required defaultValue={user.email} style={fieldStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={labelStyle}>Téléphone</span>
            <input name="telephone" defaultValue={user.telephone} style={fieldStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={labelStyle}>Rôle</span>
            <select name="role" defaultValue={user.role} disabled={isSelf} style={fieldStyle}>
              {Object.entries(ROLE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
          <input type="checkbox" name="actif" defaultChecked={user.actif} disabled={isSelf} style={{ width: 15, height: 15 }} />
          Compte actif
        </label>

        {isSelf && (
          <p style={{ color: colors.textLight, fontSize: 12, margin: 0 }}>
            Vous ne pouvez pas modifier votre propre rôle ni vous désactiver.
          </p>
        )}

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
          {isPending ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </form>

      <ResetPasswordCard userId={user.id} />
    </div>
  )
}

function ResetPasswordCard({ userId }: { userId: string }) {
  const [state, formAction, isPending] = useActionState(
    (_prev: { error: string | null; tempPassword?: string } | undefined) => resetUserPassword(userId, undefined),
    undefined
  )
  const [copied, setCopied] = useState(false)

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: "clamp(18px,3vw,28px)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 560,
      }}
    >
      <h2 style={{ fontSize: 15, fontWeight: 800, color: colors.navy, margin: 0 }}>Mot de passe</h2>
      <p style={{ color: colors.textMuted, fontSize: 13, margin: 0 }}>
        Génère un nouveau mot de passe temporaire à communiquer manuellement à l&apos;utilisateur.
      </p>

      {state?.tempPassword && (
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
      )}

      <form action={formAction}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: "transparent",
            border: `1.5px solid ${colors.navy}`,
            color: colors.navy,
            padding: "10px 20px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: isPending ? "default" : "pointer",
          }}
        >
          {isPending ? "Génération..." : "Réinitialiser le mot de passe"}
        </button>
      </form>
    </div>
  )
}
