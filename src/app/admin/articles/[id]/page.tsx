import { notFound } from "next/navigation"
import { getArticleForEdit } from "@/lib/admin/articles"
import { getConfiguredSocialAccounts } from "@/lib/social/accounts"
import { ArticleForm, type ArticleFormInitial } from "@/components/admin/ArticleForm"
import { PublierReseauxPanel, type ReseauxPublies } from "@/components/admin/PublierReseauxPanel"
import { colors, fontHeading } from "@/lib/theme"
import type { ArticleSection } from "@/lib/articles-shared"

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleForEdit(id)
  if (!article) notFound()

  const comptesActifs = getConfiguredSocialAccounts()

  const initial: ArticleFormInitial = {
    titre: article.titre,
    slug: article.slug,
    contenu: article.contenu,
    textePartage: article.textePartage ?? "",
    image: article.image ?? "",
    categorie: article.categorie ?? "",
    publie: article.publie,
    sections: (article.sections as ArticleSection[] | null) ?? [],
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Modifier l&apos;actualité
      </h1>
      <ArticleForm id={id} initial={initial} submitLabel="Enregistrer les modifications" />
      <PublierReseauxPanel
        articleId={id}
        comptes={comptesActifs}
        reseauxPublies={article.reseauxPublies as ReseauxPublies | null}
      />
    </div>
  )
}
