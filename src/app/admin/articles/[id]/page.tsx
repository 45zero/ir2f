import { notFound } from "next/navigation"
import { getArticleForEdit } from "@/lib/admin/articles"
import { ArticleForm, type ArticleFormInitial } from "@/components/admin/ArticleForm"
import { colors, fontHeading } from "@/lib/theme"

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleForEdit(id)
  if (!article) notFound()

  const initial: ArticleFormInitial = {
    titre: article.titre,
    contenu: article.contenu,
    publie: article.publie,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Modifier l&apos;article
      </h1>
      <ArticleForm id={id} initial={initial} submitLabel="Enregistrer les modifications" />
    </div>
  )
}
