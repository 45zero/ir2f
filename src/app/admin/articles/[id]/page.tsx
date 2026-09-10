import { notFound } from "next/navigation"
import { getArticleForEdit } from "@/lib/admin/articles"
import { getConfiguredSocialAccounts } from "@/lib/social/accounts"
import { ArticleForm, type ArticleFormInitial } from "@/components/admin/ArticleForm"
import { PublierReseauxPanel } from "@/components/admin/PublierReseauxPanel"
import { colors, fontHeading } from "@/lib/theme"
import { articleShareExcerpt, type ArticleSection } from "@/lib/articles-shared"
import type { ReseauxPublies } from "@/lib/social/publication"

// Publier une vidéo native peut prendre jusqu'à ~50s côté Meta (voir social/graph.ts) — 60s est le
// maximum autorisé sur le plan Vercel Hobby.
export const maxDuration = 60

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleForEdit(id)
  if (!article) notFound()

  const comptesActifs = getConfiguredSocialAccounts()
  const sections = (article.sections as ArticleSection[] | null) ?? []
  const images = [...(article.image ? [article.image] : []), ...sections.flatMap((s) => s.images ?? [])]
  const videos = sections.flatMap((s) => (s.videoFichierUrl ? [s.videoFichierUrl] : []))

  const initial: ArticleFormInitial = {
    titre: article.titre,
    slug: article.slug,
    contenu: article.contenu,
    textePartage: article.textePartage ?? "",
    image: article.image ?? "",
    categorie: article.categorie ?? "",
    publie: article.publie,
    diffuserReseaux: article.diffuserReseaux,
    sections,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Modifier l&apos;actualité
      </h1>
      <ArticleForm id={id} initial={initial} submitLabel="Enregistrer les modifications" />
      {article.diffuserReseaux ? (
        <PublierReseauxPanel
          entityType="ARTICLE"
          entityId={id}
          comptes={comptesActifs}
          reseauxPublies={article.reseauxPublies as ReseauxPublies | null}
          defaultMessage={articleShareExcerpt(article)}
          images={images}
          videos={videos}
        />
      ) : (
        <div style={{ background: "#f9fafb", border: "1px dashed #d8dde5", borderRadius: 10, padding: "clamp(18px,3vw,28px)", maxWidth: 620 }}>
          <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
            Diffusion sur les réseaux désactivée pour cette actualité — recochez «&nbsp;Diffuser sur les réseaux&nbsp;»
            ci-dessus et enregistrez pour la réactiver.
          </p>
        </div>
      )}
    </div>
  )
}
