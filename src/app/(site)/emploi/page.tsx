import { getEmploiPageData } from "@/lib/emploi"
import { SECTION_EMPLOI_LABELS } from "@/lib/emploi-shared"
import { HoverLink } from "@/components/ui/HoverLink"
import { colors, fontHeading } from "@/lib/theme"
import type { SectionEmploi } from "@/generated/prisma"

const SECTION_ICON: Record<SectionEmploi, React.ReactNode> = {
  FINANCEMENTS: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  ),
  GESTION_EMPLOI: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <rect x="3" y="7" width="18" height="13" rx="1" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  FORMATION_EMPLOYABILITE: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" })

export default async function EmploiPage() {
  const { sections, partenaires, webinaires } = await getEmploiPageData()

  return (
    <main>
      <section style={{ padding: "clamp(24px,3vw,36px) clamp(20px,5vw,60px) 0", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ color: colors.red, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
            IR2F vous accompagne
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
            Accompagnement Emploi
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: colors.textMuted, margin: 0, maxWidth: 640 }}>
            Financements, gestion de l&apos;emploi, formation-employabilité : retrouvez ici les ressources, contacts
            et vidéos pour vous accompagner dans vos démarches.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 20px 0", display: "flex", flexDirection: "column", gap: 48 }}>
        {sections.map((s) => (
          <div key={s.section} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {SECTION_ICON[s.section]}
              <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 800, margin: 0 }}>
                {SECTION_EMPLOI_LABELS[s.section]}
              </h2>
            </div>

            {s.documents.length === 0 && s.contacts.length === 0 && s.videos.length === 0 && (
              <p style={{ color: colors.textLight, fontSize: 13, margin: 0 }}>
                Contenu à venir pour cette section.
              </p>
            )}

            {s.documents.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
                  Documents
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
                  {s.documents.map((d) => (
                    <HoverLink
                      key={d.id}
                      href={d.url}
                      target="_blank"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "#fff",
                        border: "1px solid #eef0f3",
                        borderRadius: 8,
                        padding: "12px 14px",
                        textDecoration: "none",
                        color: colors.text,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                      hoverStyle={{ boxShadow: "0 4px 14px rgba(20,33,61,0.1)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2" style={{ flexShrink: 0 }}>
                        {d.type === "FICHIER" ? (
                          <>
                            <path d="M12 3v12" />
                            <polyline points="7 10 12 15 17 10" />
                            <path d="M4 19h16" />
                          </>
                        ) : (
                          <>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </>
                        )}
                      </svg>
                      {d.titre}
                    </HoverLink>
                  ))}
                </div>
              </div>
            )}

            {s.videos.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
                  Vidéos
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
                  {s.videos.map((v) => (
                    <HoverLink
                      key={v.id}
                      href={v.url}
                      target="_blank"
                      style={{ display: "flex", flexDirection: "column", gap: 8, textDecoration: "none" }}
                      hoverStyle={{ opacity: 0.9 }}
                    >
                      <div
                        style={{
                          aspectRatio: "16/9",
                          borderRadius: 8,
                          overflow: "hidden",
                          position: "relative",
                          background: "repeating-linear-gradient(135deg,#1a3a6b,#1a3a6b 12px,#16305a 12px,#16305a 24px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={colors.navy}>
                            <polygon points="6 4 20 12 6 20 6 4" />
                          </svg>
                        </div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{v.titre}</span>
                      {v.description && <span style={{ fontSize: 12, color: colors.textLight }}>{v.description}</span>}
                    </HoverLink>
                  ))}
                </div>
              </div>
            )}

            {s.contacts.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
                  Contacts
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
                  {s.contacts.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        background: "#fff",
                        border: "1px solid #eef0f3",
                        borderRadius: 8,
                        padding: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: colors.navy,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>
                          {c.prenom ? `${c.prenom} ${c.nom}` : c.nom}
                        </span>
                        {c.poste && <span style={{ fontSize: 12, color: colors.textLight }}>{c.poste}</span>}
                        {c.email && <span style={{ fontSize: 12, color: colors.textLight }}>{c.email}</span>}
                        {c.telephone && <span style={{ fontSize: 12, color: colors.textLight }}>{c.telephone}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {webinaires.length > 0 && (
        <section style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 20px 0" }}>
          <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 800, margin: "0 0 20px" }}>
            Prochains webinaires
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {webinaires.map((w) => (
              <div
                key={w.id}
                style={{
                  background: "#fff",
                  border: "1px solid #eef0f3",
                  borderRadius: 8,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{dateFormatter.format(w.date)}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>{w.titre}</span>
                {w.description && <span style={{ fontSize: 12, color: colors.textLight }}>{w.description}</span>}
                {w.lien && (
                  <HoverLink
                    href={w.lien}
                    target="_blank"
                    style={{
                      alignSelf: "flex-start",
                      background: colors.navy,
                      color: "#fff",
                      padding: "9px 18px",
                      borderRadius: 4,
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                      marginTop: 4,
                    }}
                    hoverStyle={{ background: colors.navyDark }}
                  >
                    Rejoindre
                  </HoverLink>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {partenaires.length > 0 && (
        <section style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 20px 72px" }}>
          <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 800, margin: "0 0 20px" }}>
            Nos partenaires
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            {partenaires.map((p) =>
              p.siteUrl ? (
                <HoverLink
                  key={p.id}
                  href={p.siteUrl}
                  target="_blank"
                  style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
                  hoverStyle={{ opacity: 0.75 }}
                >
                  <PartnerBadge nom={p.nom} logoUrl={p.logoUrl} />
                </HoverLink>
              ) : (
                <div key={p.id}>
                  <PartnerBadge nom={p.nom} logoUrl={p.logoUrl} />
                </div>
              )
            )}
          </div>
        </section>
      )}
    </main>
  )
}

function PartnerBadge({ nom, logoUrl }: { nom: string; logoUrl: string | null }) {
  if (logoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logoUrl} alt={nom} style={{ height: 48, width: "auto" }} />
  }
  return (
    <span
      style={{
        background: "#f5f7fb",
        border: "1px solid #e4e9f2",
        borderRadius: 6,
        padding: "10px 16px",
        fontSize: 13,
        fontWeight: 700,
        color: colors.navy,
      }}
    >
      {nom}
    </span>
  )
}
