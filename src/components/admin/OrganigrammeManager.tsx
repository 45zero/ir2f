"use client"

import { useActionState } from "react"
import { saveOrganigramme } from "@/lib/actions/organigramme"
import { colors, fontHeading, fontBody } from "@/lib/theme"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #eef0f3",
  borderRadius: 10,
  padding: "clamp(18px,3vw,24px)",
  display: "flex",
  flexDirection: "column" as const,
  gap: 14,
}

export type AdminOrganigramme = { nom: string; url: string } | null

export function OrganigrammeManager({ current }: { current: AdminOrganigramme }) {
  const [state, formAction, isPending] = useActionState(saveOrganigramme, undefined)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={cardStyle}>
        <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 16, fontWeight: 800, margin: 0 }}>
          Fichier actuel
        </h2>
        {current ? (
          <a href={current.url} target="_blank" rel="noreferrer" style={{ color: colors.red, fontWeight: 700, fontSize: 14 }}>
            {current.nom}
          </a>
        ) : (
          <p style={{ color: colors.textMuted, fontSize: 13, margin: 0 }}>
            Aucun organigramme n&apos;a encore été déposé. Le bloc ne s&apos;affichera pas sur la page Contact tant qu&apos;aucun
            fichier n&apos;a été envoyé.
          </p>
        )}
      </div>

      <form action={formAction} style={cardStyle}>
        <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 16, fontWeight: 800, margin: 0 }}>
          Remplacer le fichier
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Fichier PDF</span>
          <input name="file" type="file" accept="application/pdf" required style={fieldStyle} />
        </div>

        {state?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.error}</p>}

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            {isPending ? "Envoi..." : "Enregistrer"}
          </button>
          {state && !state.error && <span style={{ color: "#3f9142", fontSize: 12.5, fontWeight: 600 }}>Enregistré.</span>}
        </div>
      </form>
    </div>
  )
}
