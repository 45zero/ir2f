import { ArticleForm } from "@/components/admin/ArticleForm"
import { colors, fontHeading } from "@/lib/theme"

export default function NewArticlePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Nouvelle actualité
      </h1>
      <ArticleForm submitLabel="Créer l'actualité" />
    </div>
  )
}
