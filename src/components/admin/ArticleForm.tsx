"use client"

import { useActionState } from "react"
import { colors, fontBody } from "@/lib/theme"
import { CATEGORIE_LABELS } from "@/lib/formations-shared"
import { createArticle, updateArticle, type ArticleActionState } from "@/lib/actions/articles"
import type { CategorieFormation } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

export type ArticleFormInitial = {
  titre: string
  slug: string
  contenu: string
  image: string
  categorie: CategorieFormation | ""
  publie: boolean
}

export function ArticleForm({
  id,
  initial,
  submitLabel,
}: {
  id?: string
  initial?: ArticleFormInitial
  submitLabel: string
}) {
  const [state, formAction, isPending] = useActionState(
    (prevState: ArticleActionState | undefined, formData: FormData) =>
      id ? updateArticle(id, formData) : createArticle(prevState, formData),
    undefined
  )

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
        maxWidth: 720,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Titre</span>
        <input name="titre" required defaultValue={initial?.titre} style={fieldStyle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>
          Slug (utilisé dans l&apos;URL /actualites/…)
        </span>
        <input name="slug" required defaultValue={initial?.slug} style={fieldStyle} />
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: "1 1 260px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Image (URL)</span>
          <input name="image" defaultValue={initial?.image} style={fieldStyle} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: "1 1 200px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Catégorie</span>
          <select name="categorie" defaultValue={initial?.categorie ?? ""} style={fieldStyle}>
            <option value="">Aucune (générique IR2F)</option>
            {Object.entries(CATEGORIE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Contenu</span>
        <textarea
          name="contenu"
          required
          rows={12}
          defaultValue={initial?.contenu}
          style={{ ...fieldStyle, resize: "vertical", fontFamily: "monospace" }}
        />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
        <input type="checkbox" name="publie" defaultChecked={initial?.publie} style={{ width: 15, height: 15 }} />
        Publié (visible sur le site public)
      </label>

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
        {isPending ? "Enregistrement..." : submitLabel}
      </button>
    </form>
  )
}
