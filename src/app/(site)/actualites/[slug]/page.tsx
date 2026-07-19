import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/actualites"
import { HoverLink } from "@/components/ui/HoverLink"
import { colors, fontHeading } from "@/lib/theme"

export default async function ActualiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const paragraphes = article.contenu.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)

  return (
    <main style={{ animation: "ir2fFadeIn 0.4s ease" }}>
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "28px 20px 0" }}>
        <HoverLink
          href="/actualites"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: colors.navy,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
          }}
          hoverStyle={{ color: colors.red }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Retour aux actualités
        </HoverLink>
      </section>

      <section style={{ maxWidth: 820, margin: "0 auto", padding: "20px 20px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <span
          style={{
            display: "inline-flex",
            background: "#f5f5f5",
            color: colors.navy,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            padding: "7px 14px",
            borderRadius: 3,
            borderLeft: `3px solid ${colors.gold}`,
            width: "fit-content",
          }}
        >
          {article.categorieLabel}
        </span>
        <h1
          style={{
            fontFamily: fontHeading,
            color: colors.navy,
            fontSize: "clamp(28px,3.6vw,44px)",
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.08,
          }}
        >
          {article.titre}
        </h1>
        <span style={{ color: colors.textLight, fontSize: 13, fontWeight: 600 }}>{article.date}</span>
      </section>

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "24px 20px 0" }}>
        <div
          style={{
            minHeight: 320,
            borderRadius: 10,
            backgroundImage: article.image ? `url('${article.image}')` : undefined,
            backgroundColor: article.image ? undefined : colors.navy,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </section>

      <section style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px 72px", display: "flex", flexDirection: "column", gap: 18 }}>
        {paragraphes.map((p, i) => (
          <p key={i} style={{ color: colors.textMuted, fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            {p}
          </p>
        ))}
      </section>
    </main>
  )
}
