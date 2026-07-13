import { getFormationOptions } from "@/lib/formations"
import { ContactTeaser } from "@/components/site/ContactTeaser"
import { colors, fontHeading } from "@/lib/theme"

export default async function ContactPage() {
  const formations = await getFormationOptions()

  return (
    <main>
      <section style={{ padding: "clamp(24px,3vw,36px) clamp(20px,5vw,60px) 0", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ color: colors.red, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Contact
          </span>
          <h1
            style={{
              fontFamily: fontHeading,
              fontSize: "clamp(28px,3.4vw,44px)",
              fontWeight: 800,
              color: colors.navy,
              margin: 0,
              lineHeight: 1.08,
            }}
          >
            Parlons de votre projet
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: colors.textMuted, margin: 0, maxWidth: 560 }}>
            Une question sur nos formations, un club qui souhaite accueillir une session, ou un projet
            d&apos;inscription ? Dites-nous en plus, un conseiller IR2F revient vers vous sous 48h.
          </p>
        </div>
      </section>

      <ContactTeaser formations={formations} startOpen />
    </main>
  )
}
