import { cache } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getArticleBySlug } from "@/lib/actualites"
import { HoverLink } from "@/components/ui/HoverLink"
import { ArticleShareActions } from "@/components/site/ArticleShareActions"
import { getYoutubeEmbedUrl } from "@/lib/youtube"
import { colors, fontHeading } from "@/lib/theme"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ir2f.lgef.fr"

const loadArticle = cache((slug: string) => getArticleBySlug(slug))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await loadArticle(slug)
  if (!article) return {}

  const description = article.contenu.slice(0, 160).trim() + (article.contenu.length > 160 ? "…" : "")
  const url = `${SITE_URL}/actualites/${article.slug}`

  return {
    title: article.titre,
    description,
    openGraph: {
      title: article.titre,
      description,
      type: "article",
      url,
      images: article.image ? [article.image] : undefined,
    },
  }
}

export default async function ActualiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await loadArticle(slug)
  if (!article) notFound()

  const paragraphes = article.contenu.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  const sections = article.sections ?? []
  const articleUrl = `${SITE_URL}/actualites/${article.slug}`

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
        <ArticleShareActions url={articleUrl} title={article.titre} />
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

      {sections.length > 0 && (
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "0 20px 72px", display: "flex", flexDirection: "column", gap: 32 }}>
          {sections.map((s, i) => {
            const embedUrl = s.videoUrl ? getYoutubeEmbedUrl(s.videoUrl) : null
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {s.title && (
                  <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 22, fontWeight: 800, margin: 0 }}>{s.title}</h2>
                )}
                {s.desc && <p style={{ color: colors.textMuted, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>}

                {s.table && s.table.headers.length > 0 && (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                      <thead>
                        <tr>
                          {s.table.headers.map((h, hi) => (
                            <th
                              key={hi}
                              style={{
                                textAlign: "left",
                                padding: "8px 12px",
                                background: "#f5f7fb",
                                color: colors.navy,
                                fontWeight: 700,
                                borderBottom: `2px solid ${colors.gold}`,
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, ri) => (
                          <tr key={ri}>
                            {row.map((cell, ci) => (
                              <td key={ci} style={{ padding: "8px 12px", borderBottom: "1px solid #eef0f3", color: colors.text }}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {s.images && s.images.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {s.images.map((img, ii) => (
                      <div
                        key={ii}
                        style={{
                          width: 220,
                          height: 150,
                          borderRadius: 8,
                          backgroundImage: `url('${img}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          border: "1px solid #eef0f3",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                )}

                {(s.videoFichierUrl || embedUrl) && (
                  <div style={{ aspectRatio: "16/9", maxWidth: 560, borderRadius: 8, overflow: "hidden" }}>
                    {s.videoFichierUrl ? (
                      <video controls preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}>
                        <source src={s.videoFichierUrl} />
                      </video>
                    ) : embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={s.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: "100%", height: "100%", border: "none" }}
                      />
                    ) : null}
                  </div>
                )}

                {s.lien?.url && (
                  <HoverLink
                    href={s.lien.url}
                    target={s.lien.type === "EXTERNE" ? "_blank" : undefined}
                    style={{
                      alignSelf: "flex-start",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: colors.navy,
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: 4,
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                    hoverStyle={{ background: colors.red }}
                  >
                    {s.lien.label || "En savoir plus"}
                  </HoverLink>
                )}
              </div>
            )
          })}
        </section>
      )}
    </main>
  )
}
