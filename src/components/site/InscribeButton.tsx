"use client"

import { useActionState, useState, type CSSProperties } from "react"
import { Hoverable } from "@/components/ui/Hoverable"
import { requestInscription } from "@/lib/actions/inscribe"
import { colors, fontBody } from "@/lib/theme"

const inputStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
}

const VARIANT_STYLE: Record<"primary" | "session", CSSProperties> = {
  primary: {
    background: colors.red,
    color: "#fff",
    border: "none",
    padding: "15px 30px",
    borderRadius: 4,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: fontBody,
    cursor: "pointer",
  },
  session: {
    alignSelf: "flex-start",
    background: colors.navy,
    color: "#fff",
    border: "none",
    padding: "9px 18px",
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 700,
    fontFamily: fontBody,
    cursor: "pointer",
  },
}

const VARIANT_HOVER: Record<"primary" | "session", CSSProperties> = {
  primary: { background: colors.redDark },
  session: { background: colors.navyDark },
}

export function InscribeButton({
  formationId,
  sessionLabel = null,
  label,
  variant,
  loggedIn,
  initialMessage,
}: {
  formationId: string
  sessionLabel?: string | null
  label: string
  variant: "primary" | "session"
  loggedIn: boolean
  initialMessage?: string
}) {
  const [state, formAction, isPending] = useActionState(
    (prev: Awaited<ReturnType<typeof requestInscription>> | undefined, formData: FormData) =>
      requestInscription(formationId, sessionLabel, prev, formData),
    undefined
  )
  const [showForm, setShowForm] = useState(false)

  const status = state?.status ?? (initialMessage ? "already" : "idle")
  const message = state?.message ?? initialMessage

  if (status === "success") {
    return <p style={{ color: "#3f9142", fontSize: 13, fontWeight: 600, margin: 0 }}>{message}</p>
  }
  if (status === "already") {
    return <p style={{ color: colors.textLight, fontSize: 13, margin: 0 }}>{message}</p>
  }

  if (loggedIn) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
        <form action={formAction}>
          <Hoverable
            as="button"
            type="submit"
            disabled={isPending}
            style={VARIANT_STYLE[variant]}
            hoverStyle={VARIANT_HOVER[variant]}
          >
            {isPending ? "Envoi..." : label}
          </Hoverable>
        </form>
        {status === "error" && <span style={{ color: colors.red, fontSize: 12 }}>{message}</span>}
      </div>
    )
  }

  if (!showForm) {
    return (
      <Hoverable
        as="button"
        type="button"
        onClick={() => setShowForm(true)}
        style={VARIANT_STYLE[variant]}
        hoverStyle={VARIANT_HOVER[variant]}
      >
        {label}
      </Hoverable>
    )
  }

  return (
    <form
      action={formAction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: "#f5f7fb",
        border: "1px solid #e4e9f2",
        borderRadius: 8,
        padding: 14,
        maxWidth: 320,
      }}
    >
      <input name="nom" placeholder="Nom" required style={inputStyle} />
      <input name="prenom" placeholder="Prénom" required style={inputStyle} />
      <input name="email" type="email" placeholder="Email" required style={inputStyle} />
      <input name="telephone" placeholder="Téléphone" style={inputStyle} />
      <div style={{ display: "flex", gap: 8 }}>
        <Hoverable
          as="button"
          type="submit"
          disabled={isPending}
          style={{ ...VARIANT_STYLE[variant], padding: "9px 18px", fontSize: 13 }}
          hoverStyle={VARIANT_HOVER[variant]}
        >
          {isPending ? "Envoi..." : "Envoyer ma demande"}
        </Hoverable>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          style={{
            background: "transparent",
            border: "1px solid #d8dde5",
            color: colors.textMuted,
            padding: "9px 14px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: fontBody,
            cursor: "pointer",
          }}
        >
          Annuler
        </button>
      </div>
      {status === "error" && <span style={{ color: colors.red, fontSize: 12 }}>{message}</span>}
    </form>
  )
}
