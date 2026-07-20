import Link from "next/link"
import { getAllArticlesAdmin } from "@/lib/admin/articles"
import { ArticlesTable, type AdminArticleRow } from "@/components/admin/ArticlesTable"
import { colors, fontHeading, fontBody } from "@/lib/theme"

export default async function AdminArticlesPage() {
  const articles = await getAllArticlesAdmin()

  const rows: AdminArticleRow[] = articles.map((a) => ({
    id: a.id,
    titre: a.titre,
    publie: a.publie,
    createdAt: a.createdAt.toISOString(),
    auteurNom: `${a.auteur.prenom} ${a.auteur.nom}`,
  }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
            Actualités
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            {rows.length} actualité{rows.length > 1 ? "s" : ""} au total.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          style={{
            background: colors.red,
            color: "#fff",
            border: "none",
            padding: "11px 20px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: fontBody,
            textDecoration: "none",
          }}
        >
          + Nouvelle actualité
        </Link>
      </div>

      <ArticlesTable articles={rows} />
    </div>
  )
}
