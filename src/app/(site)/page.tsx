import { getPublishedFormations } from "@/lib/formations"
import { getHeroSlides, getStatsCles, getRecentArticles, getAccompagnementCards, getAccueilContenu } from "@/lib/home"
import { HeroCarousel } from "@/components/site/HeroCarousel"
import { HomeSearch } from "@/components/site/HomeSearch"
import { ContactTeaser } from "@/components/site/ContactTeaser"
import { HoverLink } from "@/components/ui/HoverLink"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { IconeAccompagnement } from "@/generated/prisma"

const NEWS_CARD_STYLES = [
  `linear-gradient(135deg, ${colors.navy}, #234a86)`,
  `linear-gradient(135deg, #7a6423, ${colors.gold})`,
  `linear-gradient(135deg, ${colors.navyDark}, ${colors.navy})`,
  `linear-gradient(135deg, ${colors.gold}, #a67c27)`,
]

function VoirToutesLesActualites() {
  return (
    <HoverLink
      href="/actualites"
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: colors.navy,
        cursor: "pointer",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
      hoverStyle={{ color: colors.red }}
    >
      Voir toutes les actualités
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </HoverLink>
  )
}

const ACCOMPAGNEMENT_ICONS: Record<IconeAccompagnement, React.ReactNode> = {
  FINANCEMENT: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  ),
  GESTION: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <rect x="3" y="7" width="18" height="13" rx="1" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  FORMATION: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  CONTACT: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  DOCUMENT: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  VALIDATION: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
}

export default async function HomePage() {
  const [formations, heroSlides, stats, articles, accompagnementCards, contenu] = await Promise.all([
    getPublishedFormations(),
    getHeroSlides(),
    getStatsCles(),
    getRecentArticles(),
    getAccompagnementCards(),
    getAccueilContenu(),
  ])

  const newsGrid = articles.slice(0, 4)
  const newsFeed = articles.slice(4, 9)

  return (
    <main>
      <HeroCarousel slides={heroSlides} />

      <section
        style={{
          padding: "clamp(24px,3vw,36px) clamp(20px,5vw,60px) 28px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <HomeSearch formations={formations} />
        </div>
      </section>

      {contenu.bandeauEmploiActif && (
        <section style={{ background: colors.navy, padding: "18px clamp(20px,5vw,60px)" }}>
          <div
            style={{
              maxWidth: 1160,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontFamily: fontHeading,
                fontSize: "clamp(18px,2.4vw,26px)",
                fontWeight: 800,
                letterSpacing: 0.3,
                textTransform: "uppercase",
              }}
            >
              {contenu.bandeauEmploiTitre}
            </span>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <HoverLink
                href={contenu.bandeauBouton1Url}
                target={contenu.bandeauBouton1Type === "EXTERNE" ? "_blank" : undefined}
                rel={contenu.bandeauBouton1Type === "EXTERNE" ? "noopener noreferrer" : undefined}
                style={{
                  background: colors.red,
                  color: "#fff",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: fontBody,
                  cursor: "pointer",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
                hoverStyle={{ background: colors.redDark }}
              >
                {contenu.bandeauBouton1Label}
              </HoverLink>
              <HoverLink
                href={contenu.bandeauBouton2Url}
                target={contenu.bandeauBouton2Type === "EXTERNE" ? "_blank" : undefined}
                rel={contenu.bandeauBouton2Type === "EXTERNE" ? "noopener noreferrer" : undefined}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  padding: "12px 22px",
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: fontBody,
                  cursor: "pointer",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
                hoverStyle={{ borderColor: "#fff" }}
              >
                {contenu.bandeauBouton2Label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </HoverLink>
            </div>
          </div>
        </section>
      )}

      {newsGrid.length > 0 && (
        <section style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 20px 56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 26 }}>
            <h2
              style={{
                fontFamily: fontHeading,
                fontSize: "clamp(24px,3vw,34px)",
                fontWeight: 800,
                margin: 0,
                color: colors.navy,
              }}
            >
              Toutes les <span style={{ color: colors.gold }}>actualités</span>
            </h2>
            <VoirToutesLesActualites />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: newsFeed.length > 0 ? "2fr 1fr" : "1fr",
              gap: 24,
              alignItems: "start",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
              {newsGrid.map((n, i) => (
                <HoverLink
                  key={n.id}
                  href={`/actualites/${n.slug}`}
                  style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    position: "relative",
                    minHeight: 230,
                    background: n.image ? undefined : NEWS_CARD_STYLES[i % NEWS_CARD_STYLES.length],
                    backgroundImage: n.image ? `url('${n.image}')` : undefined,
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
                      {n.categorieLabel}
                    </span>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: 17,
                        fontWeight: 800,
                        lineHeight: 1.25,
                        fontFamily: fontHeading,
                      }}
                    >
                      {n.titre}
                    </span>
                  </div>
                </HoverLink>
              ))}
            </div>

            {newsFeed.length > 0 && (
              <div style={{ background: colors.bg, borderRadius: 8, padding: 22 }}>
                <h3 style={{ fontFamily: fontHeading, fontSize: 19, fontWeight: 800, color: colors.navy, margin: "0 0 16px" }}>
                  Fil d&apos;infos
                </h3>
                {newsFeed.map((f) => (
                  <HoverLink
                    key={f.id}
                    href={`/actualites/${f.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 0",
                      borderTop: "1px solid #e4e4e4",
                      textDecoration: "none",
                    }}
                    hoverStyle={{ opacity: 0.75 }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: colors.navy }}>{f.feedDate}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: colors.gold, marginLeft: 6, textTransform: "uppercase" }}>
                        {f.categorieLabel}
                      </span>
                      <span style={{ display: "block", fontSize: 13.5, fontWeight: 700, color: colors.text, lineHeight: 1.35, marginTop: 4 }}>
                        {f.titre}
                      </span>
                    </div>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 6,
                        flexShrink: 0,
                        backgroundImage: f.image ? `url('${f.image}')` : undefined,
                        backgroundColor: f.image ? undefined : colors.navy,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </HoverLink>
                ))}
                <div style={{ marginTop: 14 }}>
                  <VoirToutesLesActualites />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section style={{ background: colors.navy, padding: "64px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
            <span style={{ color: colors.gold, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
              {contenu.accompagnementEyebrow}
            </span>
            <h2 style={{ fontFamily: fontHeading, color: "#fff", fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, margin: 0 }}>
              {contenu.accompagnementTitre}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {accompagnementCards.map((card) => (
              <div
                key={card.id}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(201,168,76,0.35)",
                  borderRadius: 8,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {ACCOMPAGNEMENT_ICONS[card.icone as IconeAccompagnement]}
                <h3 style={{ color: "#fff", fontFamily: fontHeading, fontSize: 20, fontWeight: 700, margin: 0 }}>
                  {card.titre}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          <HoverLink
            href="/emploi"
            style={{
              alignSelf: "flex-start",
              marginTop: 32,
              background: "transparent",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.4)",
              padding: "12px 24px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: fontBody,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            hoverStyle={{ background: "rgba(255,255,255,0.1)", borderColor: "#fff" }}
          >
            En savoir plus
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </HoverLink>
        </div>
      </section>

      <div id="contact">
        <ContactTeaser titre={contenu.contactTitre} sousTitre={contenu.contactSousTitre} />
      </div>

      {stats.length > 0 && (
        <section style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px 72px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 24,
              textAlign: "center",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "24px 12px",
                  borderTop: `3px solid ${colors.gold}`,
                }}
              >
                <span style={{ fontFamily: fontHeading, fontSize: "clamp(34px,4vw,48px)", fontWeight: 800, color: colors.navy }}>
                  {s.valeur}
                </span>
                <span style={{ fontSize: 13, color: colors.textLight, fontWeight: 600, letterSpacing: 0.3 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
