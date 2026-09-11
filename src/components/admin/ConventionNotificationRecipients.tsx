"use client"

import { useActionState } from "react"
import {
  ajouterNotificationDestinataire,
  supprimerNotificationDestinataire,
} from "@/lib/actions/convention-notification-recipients"
import { colors, fontBody, fontHeading } from "@/lib/theme"
import type { CategorieNotificationConvention } from "@/generated/prisma"

export type NotificationRecipientRow = { id: string; email: string; nom: string | null }

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 11px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
}

function AddForm({ categorie }: { categorie: CategorieNotificationConvention }) {
  const boundAction = ajouterNotificationDestinataire.bind(null, categorie)
  const [state, formAction, isPending] = useActionState(boundAction, undefined)

  return (
    <form action={formAction} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
      <input name="nom" placeholder="Nom (optionnel)" style={{ ...fieldStyle, width: 160 }} />
      <input name="email" type="email" required placeholder="email@exemple.fr" style={{ ...fieldStyle, width: 220 }} />
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: isPending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "9px 16px",
          borderRadius: 4,
          fontSize: 12.5,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "..." : "Ajouter"}
      </button>
      {state?.error && <span style={{ color: colors.red, fontSize: 12, width: "100%" }}>{state.error}</span>}
    </form>
  )
}

function DeleteButton({ id }: { id: string }) {
  const [state, action, isPending] = useActionState(
    async (_prev: { error: string | null } | undefined) => supprimerNotificationDestinataire(id),
    undefined
  )

  return (
    <form action={action}>
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: "transparent",
          border: "1px solid #e2c4c7",
          color: colors.red,
          fontSize: 11,
          fontWeight: 700,
          padding: "5px 10px",
          borderRadius: 4,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "..." : "Retirer"}
      </button>
      {state?.error && <div style={{ color: colors.red, fontSize: 11 }}>{state.error}</div>}
    </form>
  )
}

export function ConventionNotificationRecipients({
  categorie,
  titre,
  description,
  recipients,
}: {
  categorie: CategorieNotificationConvention
  titre: string
  description: string
  recipients: NotificationRecipientRow[]
}) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: "clamp(18px,3vw,24px)", display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 16, fontWeight: 800, margin: 0 }}>{titre}</h2>
        <p style={{ fontSize: 12.5, color: colors.textMuted, margin: "4px 0 0" }}>{description}</p>
      </div>

      {recipients.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recipients.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: "#f5f7fb", borderRadius: 6 }}>
              <span style={{ flex: 1, fontSize: 13, color: colors.text }}>
                {r.nom && <strong>{r.nom} — </strong>}
                {r.email}
              </span>
              <DeleteButton id={r.id} />
            </div>
          ))}
        </div>
      )}

      <AddForm categorie={categorie} />
    </div>
  )
}
