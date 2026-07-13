import { getPublishedFormations } from "@/lib/formations"
import { getHeroSlides, getStatsCles } from "@/lib/home"
import { HeroCarousel } from "@/components/site/HeroCarousel"
import { HomeSearch } from "@/components/site/HomeSearch"
import { ContactTeaser } from "@/components/site/ContactTeaser"
import { HoverLink } from "@/components/ui/HoverLink"
import { colors, fontHeading, fontBody } from "@/lib/theme"

const EMPLOI_CARDS = [
  {
    title: "Financements & Subventions",
    body: "OPCO, France Travail, CPF : identifiez les dispositifs mobilisables pour financer votre parcours.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
  {
    title: "Gestion de l'emploi",
    body: "Un appui aux clubs pour structurer les postes, les contrats et le suivi RH de leurs éducateurs.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="13" rx="1" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    title: "Formation–Employabilité",
    body: "Des parcours pensés pour déboucher sur un emploi durable dans le football régional.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
]

export default async function HomePage() {
  const [formations, heroSlides, stats] = await Promise.all([
    getPublishedFormations(),
    getHeroSlides(),
    getStatsCles(),
  ])

  return (
    <main>
      <section
        style={{
          padding: "clamp(24px,3vw,36px) clamp(20px,5vw,60px) 28px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", alignItems: "center", flexDirection: "column", gap: 12 }}>
          <h1
            style={{
              fontFamily: fontHeading,
              fontSize: "clamp(24px,3.2vw,38px)",
              fontWeight: 800,
              color: colors.navy,
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: colors.red }}>Se former</span> au football
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: colors.textMuted, margin: 0, maxWidth: 560 }}>
            Les formations IR2F pour éducateurs, arbitres, clubs et dirigeants de la Ligue Grand Est.
          </p>
          <HomeSearch formations={formations} />
        </div>
      </section>

      <HeroCarousel slides={heroSlides} />

      <section style={{ background: colors.navy, padding: "64px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
            <span style={{ color: colors.gold, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
              IR2F vous accompagne
            </span>
            <h2 style={{ fontFamily: fontHeading, color: "#fff", fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, margin: 0 }}>
              Accompagnement Emploi
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {EMPLOI_CARDS.map((card) => (
              <div
                key={card.title}
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
                {card.icon}
                <h3 style={{ color: "#fff", fontFamily: fontHeading, fontSize: 20, fontWeight: 700, margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {card.body}
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

      <ContactTeaser formations={formations} />

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
