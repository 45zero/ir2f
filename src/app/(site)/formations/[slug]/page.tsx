import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { getFormationBySlug, getInscriptionStatusMessage, CATEGORIE_LABELS, TYPE_LABELS } from "@/lib/formations"
import { Hoverable } from "@/components/ui/Hoverable"
import { HoverLink } from "@/components/ui/HoverLink"
import { InscribeButton } from "@/components/site/InscribeButton"
import { colors, fontHeading, fontBody } from "@/lib/theme"

type ProgrammeStep = { n: string; title: string; desc: string }

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" })

export default async function FormationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const formation = await getFormationBySlug(slug)
  if (!formation) notFound()

  const session = await auth()
  const inscriptionMessage = session?.user
    ? await getInscriptionStatusMessage(session.user.id, formation.id)
    : undefined

  const categorieLabel = CATEGORIE_LABELS[formation.categorie]
  const modeLabel = formation.modeLabel ?? TYPE_LABELS[formation.type]
  const programme = ((formation.programme as ProgrammeStep[] | null) ?? []).filter(Boolean)

  return (
    <main style={{ animation: "ir2fFadeIn 0.4s ease" }}>
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "28px 20px 0" }}>
        <HoverLink
          href="/formations"
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
          Retour aux formations
        </HoverLink>
      </section>

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
          <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 20 }}>
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
              {categorieLabel}
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
              {formation.titre}
            </h1>
            <p style={{ color: colors.textMuted, fontSize: 16, lineHeight: 1.65, margin: 0 }}>{formation.description}</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 16, marginTop: 6 }}>
              <InfoItem
                label="Durée"
                value={formation.dureeLabel ?? "—"}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              />
              <InfoItem
                label="Lieu"
                value={formation.lieu ?? "—"}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              />
              <InfoItem
                label="Type"
                value={modeLabel}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                }
              />
              <InfoItem
                label="CPF"
                value={formation.cpfEligible ? "Éligible" : "Non éligible"}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                }
              />
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 10, alignItems: "flex-start" }}>
              <InscribeButton
                formationId={formation.id}
                label="S'inscrire"
                variant="primary"
                loggedIn={Boolean(session?.user)}
                initialMessage={inscriptionMessage}
              />
              <Hoverable
                as="button"
                style={{
                  background: "transparent",
                  color: colors.navy,
                  border: `1.5px solid ${colors.navy}`,
                  padding: "15px 26px",
                  borderRadius: 4,
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: fontBody,
                  cursor: "pointer",
                }}
                hoverStyle={{ background: colors.navy, color: "#fff" }}
              >
                Recevoir la brochure
              </Hoverable>
            </div>
          </div>

          <div
            style={{
              flex: "1 1 380px",
              minHeight: 360,
              borderRadius: 10,
              backgroundImage: formation.image ? `url('${formation.image}')` : undefined,
              backgroundColor: formation.image ? undefined : colors.navy,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px 56px", display: "flex", flexWrap: "wrap", gap: 40 }}>
        <div style={{ flex: "2 1 480px", display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
            Programme détaillé
          </h2>
          {programme.length === 0 && (
            <p style={{ color: colors.textLight, fontSize: 14, margin: 0 }}>Le programme détaillé sera bientôt disponible.</p>
          )}
          {programme.map((p) => (
            <div key={p.n} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #eef0f3" }}>
              <span style={{ fontFamily: fontHeading, color: colors.gold, fontSize: 22, fontWeight: 800, minWidth: 32 }}>
                {p.n}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{p.title}</span>
                <span style={{ fontSize: 13, color: colors.textLight, lineHeight: 1.5 }}>{p.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 24 }}>
          {formation.formateurNom && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 22, fontWeight: 800, margin: 0 }}>
                Formateur
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  background: "#fff",
                  border: "1px solid #eef0f3",
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: colors.navy,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formation.formateurNom}</span>
                  <span style={{ fontSize: 12, color: colors.textLight }}>{formation.formateurRole}</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 22, fontWeight: 800, margin: 0 }}>
              Sessions disponibles
            </h2>
            {formation.sessions.length === 0 && (
              <p style={{ color: colors.textLight, fontSize: 13, margin: 0 }}>Aucune session programmée pour le moment.</p>
            )}
            {formation.sessions.map((sess) => (
              <div
                key={sess.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: "#fff",
                  border: "1px solid #eef0f3",
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>
                    {dateFormatter.format(sess.dateDebut)}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: colors.textLight }}>
                  {sess.lieu ?? formation.lieu ?? "Lieu à confirmer"}
                  {sess.places != null ? ` · ${sess.places} places restantes` : ""}
                </span>
                <InscribeButton
                  formationId={formation.id}
                  sessionLabel={`${dateFormatter.format(sess.dateDebut)} — ${sess.lieu ?? formation.lieu ?? "lieu à confirmer"}`}
                  label="S'inscrire"
                  variant="session"
                  loggedIn={Boolean(session?.user)}
                  initialMessage={inscriptionMessage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {icon}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 11, color: "#8a93a3" }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{value}</span>
      </div>
    </div>
  )
}
