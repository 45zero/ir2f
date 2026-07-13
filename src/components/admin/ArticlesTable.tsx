"use client"

import { useState, useActionState } from "react"
import Link from "next/link"
import { setArticlePublie, deleteArticle } from "@/lib/actions/articles"
import { colors, fontBody } from "@/lib/theme"

export type AdminArticleRow = {
  id: string
  titre: string
  publie: boolean
  createdAt: string
  auteurNom: string
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" })

export function ArticlesTable({ articles }: { articles: AdminArticleRow[] }) {
  const [filter, setFilter] = useState<"all" | "publie" | "brouillon">("all")

  const filtered = articles.filter((a) => {
    if (filter === "publie") return a.publie
    if (filter === "brouillon") return !a.publie
    return true
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as typeof filter)}
        style={{
          alignSelf: "flex-start",
          border: "1px solid #e2e5ea",
          borderRadius: 5,
          padding: "9px 12px",
          fontSize: 13,
          fontFamily: fontBody,
          color: colors.text,
          cursor: "pointer",
        }}
      >
        <option value="all">Tous</option>
        <option value="publie">Publiés</option>
        <option value="brouillon">Brouillons</option>
      </select>

      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
            gap: 12,
            padding: "12px 18px",
            background: "#f5f7fb",
            fontSize: 11,
            fontWeight: 700,
            color: colors.navy,
            textTransform: "uppercase",
            letterSpacing: 0.4,
          }}
        >
          <span>Titre</span>
          <span>Auteur</span>
          <span>Statut</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 24, color: colors.textLight, fontSize: 13 }}>Aucun article.</div>
        )}

        {filtered.map((a) => (
          <ArticleRow key={a.id} article={a} />
        ))}
      </div>
    </div>
  )
}

function ArticleRow({ article }: { article: AdminArticleRow }) {
  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteArticle(article.id),
    undefined
  )

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
        gap: 12,
        padding: "14px 18px",
        borderTop: "1px solid #eef0f3",
        alignItems: "center",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: 700, color: colors.text }}>{article.titre}</span>
        <span style={{ fontSize: 11, color: colors.textLight }}>{dateFormatter.format(new Date(article.createdAt))}</span>
      </div>
      <span style={{ color: colors.textMuted }}>{article.auteurNom}</span>
      <span
        style={{
          display: "inline-flex",
          width: "fit-content",
          background: article.publie ? colors.gold : "#e2e5ea",
          color: article.publie ? colors.navy : colors.textLight,
          fontSize: 11,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 12,
        }}
      >
        {article.publie ? "Publié" : "Brouillon"}
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Link
          href={`/admin/articles/${article.id}`}
          style={{ color: colors.navy, fontSize: 12, fontWeight: 700, textDecoration: "none" }}
        >
          Modifier
        </Link>
        <form action={() => setArticlePublie(article.id, !article.publie)}>
          <button
            type="submit"
            style={{
              background: "transparent",
              border: "1px solid #d8dde5",
              color: colors.navy,
              fontSize: 12,
              fontWeight: 700,
              padding: "5px 10px",
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: fontBody,
            }}
          >
            {article.publie ? "Dépublier" : "Publier"}
          </button>
        </form>
        <form
          action={deleteAction}
          onSubmit={(e) => {
            if (!confirm(`Supprimer « ${article.titre} » ?`)) e.preventDefault()
          }}
        >
          <button
            type="submit"
            disabled={deletePending}
            style={{
              background: "transparent",
              border: "1px solid #f3c6cb",
              color: colors.red,
              fontSize: 12,
              fontWeight: 700,
              padding: "5px 10px",
              borderRadius: 4,
              cursor: deletePending ? "default" : "pointer",
              fontFamily: fontBody,
            }}
          >
            Supprimer
          </button>
        </form>
        {deleteState?.error && <span style={{ color: colors.red, fontSize: 11, width: "100%" }}>{deleteState.error}</span>}
      </div>
    </div>
  )
}
