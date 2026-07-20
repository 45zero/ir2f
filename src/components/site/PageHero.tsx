import { colors, fontHeading } from "@/lib/theme"

export function PageHero({
  eyebrow,
  titre,
  sousTitre,
  image,
}: {
  eyebrow: string
  titre: string
  sousTitre?: string | null
  image?: string | null
}) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        marginTop: -68,
        paddingTop: 68,
        minHeight: 300,
        display: "flex",
        alignItems: "flex-end",
        backgroundImage: image ? `url('${image}')` : undefined,
        backgroundColor: colors.navy,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,22,46,0.35) 0%, rgba(10,22,46,0.78) 100%)",
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          maxWidth: 1160,
          width: "100%",
          margin: "0 auto",
          padding: "clamp(56px,8vw,84px) 20px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <span style={{ color: colors.gold, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
          {eyebrow}
        </span>
        <h1
          style={{
            fontFamily: fontHeading,
            fontSize: "clamp(28px,3.4vw,44px)",
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.08,
          }}
        >
          {titre}
        </h1>
        {sousTitre && (
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", margin: 0, maxWidth: 640 }}>
            {sousTitre}
          </p>
        )}
      </div>
    </section>
  )
}
