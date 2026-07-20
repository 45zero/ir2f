"use client"

import { useActionState } from "react"
import { deleteConventionTemplate } from "@/lib/actions/convention-templates"
import { colors, fontBody } from "@/lib/theme"

export type ConventionTemplateRow = { id: string; nom: string; formationsCount: number; createdAt: string }

function DeleteButton({ template }: { template: ConventionTemplateRow }) {
  const [state, action, isPending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteConventionTemplate(template.id),
    undefined
  )

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Supprimer le modèle « ${template.nom} » ?`)) e.preventDefault()
      }}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}
    >
      <button
        type="submit"
        disabled={isPending}
        style={{
          background: "transparent",
          border: "1px solid #e2c4c7",
          color: colors.red,
          fontSize: 11.5,
          fontWeight: 700,
          padding: "6px 12px",
          borderRadius: 4,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "..." : "Supprimer"}
      </button>
      {state?.error && <span style={{ color: colors.red, fontSize: 11 }}>{state.error}</span>}
    </form>
  )
}

export function ConventionTemplatesList({ templates }: { templates: ConventionTemplateRow[] }) {
  if (templates.length === 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
        Aucun modèle de convention pour le moment.
      </div>
    )
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, overflow: "hidden" }}>
      {templates.map((t, i) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "14px 18px",
            borderTop: i === 0 ? "none" : "1px solid #eef0f3",
          }}
        >
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: colors.text }}>{t.nom}</span>
          <span style={{ fontSize: 12, color: colors.textLight }}>
            {t.formationsCount > 0 ? `Utilisé par ${t.formationsCount} formation${t.formationsCount > 1 ? "s" : ""}` : "Non utilisé"}
          </span>
          <DeleteButton template={t} />
        </div>
      ))}
    </div>
  )
}
