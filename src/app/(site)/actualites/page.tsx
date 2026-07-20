import { getPublishedArticles } from "@/lib/actualites"
import { getPageHero } from "@/lib/page-hero"
import { HoverLink } from "@/components/ui/HoverLink"
import { PageHero } from "@/components/site/PageHero"
import { colors, fontHeading } from "@/lib/theme"

export default async function ActualitesPage() {
  const [articles, hero] = await Promise.all([getPublishedArticles(), getPageHero("ACTUALITES")])

  return (
    <main>
      <PageHero {...hero} />

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 20px 72px" }}>
        {articles.length === 0 ? (
          <p style={{ color: colors.textLight, fontSize: 14, margin: 0 }}>Aucune actualité publiée pour le moment.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {articles.map((a) => (
              <HoverLink
                key={a.id}
                href={`/actualites/${a.slug}`}
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "relative",
                  minHeight: 230,
                  background: a.image ? undefined : `linear-gradient(135deg, ${colors.navy}, #234a86)`,
                  backgroundImage: a.image ? `url('${a.image}')` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "flex-end",
                  textDecoration: "none",
                }}
                hoverStyle={{ opacity: 0.94 }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(0deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.05) 55%)",
                  }}
                />
                <div style={{ position: "relative", padding: 18, display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      background: colors.navy,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "5px 11px",
                      borderRadius: 3,
                      width: "fit-content",
                    }}
                  >
                    {a.categorieLabel}
                  </span>
                  <span style={{ color: "#fff", fontSize: 17, fontWeight: 800, lineHeight: 1.25, fontFamily: fontHeading }}>
                    {a.titre}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>{a.date}</span>
                </div>
              </HoverLink>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
