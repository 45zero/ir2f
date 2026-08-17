import { getEmploiPageData, type EmploiDocument, type EmploiVideo, type EmploiContact } from "@/lib/emploi"
import { getPageHero } from "@/lib/page-hero"
import { getAccueilContenu } from "@/lib/home"
import { SECTION_EMPLOI_LABELS } from "@/lib/emploi-shared"
import { getYoutubeEmbedUrl, isVideoFileUrl } from "@/lib/youtube"
import { HoverLink } from "@/components/ui/HoverLink"
import { PageHero } from "@/components/site/PageHero"
import { BandeauEmploiCta } from "@/components/site/BandeauEmploiCta"
import { FinancementsTabs } from "@/components/site/FinancementsTabs"
import { EmploiSectionTabs, type EmploiSectionTab } from "@/components/site/EmploiSectionTabs"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { SectionEmploi, IconePratique } from "@/generated/prisma"

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

const PRATIQUE_ICON: Record<IconePratique, React.ReactNode> = {
  SOCIETAL: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  ),
  COTISATION: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  ),
  PARTENARIAT: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <path d="M8.5 14.5 4 19V9l4.5-4.5" />
      <path d="M15.5 14.5 20 19V9l-4.5-4.5" />
      <path d="M8.5 14.5 12 11l3.5 3.5" />
    </svg>
  ),
  AUTRE: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="1.8">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  ),
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" })

function VideoBlock({ url, title }: { url: string | null; title: string }) {
  const embedUrl = url ? getYoutubeEmbedUrl(url) : null
  const isFile = url ? isVideoFileUrl(url) : false
  return (
    <div style={{ flex: "1 1 300px", maxWidth: 380, aspectRatio: "16/9", borderRadius: 8, overflow: "hidden" }}>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      ) : isFile && url ? (
        <video controls preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}>
          <source src={url} />
        </video>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `repeating-linear-gradient(135deg,${colors.navy},${colors.navy} 12px,#16305a 12px,#16305a 24px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: 20,
            textAlign: "center",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
          <span style={{ color: "#fff", fontFamily: fontHeading, fontWeight: 700, fontSize: 13.5 }}>Vidéo « {title} » à venir</span>
        </div>
      )}
    </div>
  )
}

function DocumentsGrid({ documents }: { documents: EmploiDocument[] }) {
  if (documents.length === 0) return null
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
      {documents.map((d) => (
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
  )
}

function VideosGrid({ videos }: { videos: EmploiVideo[] }) {
  if (videos.length === 0) return null
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
      {videos.map((v) => {
        const embedUrl = getYoutubeEmbedUrl(v.url)
        return (
          <div key={v.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {embedUrl ? (
              <div style={{ aspectRatio: "16/9", borderRadius: 8, overflow: "hidden" }}>
                <iframe
                  src={embedUrl}
                  title={v.titre}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
            ) : (
              <HoverLink href={v.url} target="_blank" style={{ textDecoration: "none" }} hoverStyle={{ opacity: 0.9 }}>
                <div
                  style={{
                    aspectRatio: "16/9",
                    borderRadius: 8,
                    overflow: "hidden",
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
              </HoverLink>
            )}
            <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{v.titre}</span>
            {v.description && <span style={{ fontSize: 12, color: colors.textLight }}>{v.description}</span>}
          </div>
        )
      })}
    </div>
  )
}

function ContactsGrid({ contacts }: { contacts: EmploiContact[] }) {
  if (contacts.length === 0) return null
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
      {contacts.map((c) => (
        <div
          key={c.id}
          style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 14 }}
        >
          <div
            style={{ width: 40, height: 40, borderRadius: "50%", background: colors.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{c.prenom ? `${c.prenom} ${c.nom}` : c.nom}</span>
            {c.poste && <span style={{ fontSize: 12, color: colors.textLight }}>{c.poste}</span>}
            {c.email && <span style={{ fontSize: 12, color: colors.textLight }}>{c.email}</span>}
            {c.telephone && <span style={{ fontSize: 12, color: colors.textLight }}>{c.telephone}</span>}
          </div>
        </div>
      ))}
    </div>
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

export default async function EmploiPage() {
  const [data, hero, accueilContenu] = await Promise.all([getEmploiPageData(), getPageHero("EMPLOI"), getAccueilContenu()])
  const { sections, partenaires, webinaires, dispositifs, pratiqueCards, pageContenu, gestionEmploiContenu, formationEmployabiliteContenu } = data

  const financements = sections.find((s) => s.section === "FINANCEMENTS")!
  const gestion = sections.find((s) => s.section === "GESTION_EMPLOI")!
  const formation = sections.find((s) => s.section === "FORMATION_EMPLOYABILITE")!

  const introParagraphes = pageContenu.introTexte.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  const introItems = pageContenu.introListe.split("\n").map((l) => l.trim()).filter(Boolean)

  const creerEmploiParagraphes = gestionEmploiContenu.creerEmploiTexte.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  const communauteVideoUrl = gestionEmploiContenu.communauteVideoUrl
  const communauteVideoEmbed = communauteVideoUrl ? getYoutubeEmbedUrl(communauteVideoUrl) : null
  const communauteVideoIsFile = communauteVideoUrl ? isVideoFileUrl(communauteVideoUrl) : false

  const financementsContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {dispositifs.length > 0 ? (
        <FinancementsTabs dispositifs={dispositifs} />
      ) : (
        financements.documents.length === 0 &&
        financements.videos.length === 0 &&
        financements.contacts.length === 0 && (
          <p style={{ color: colors.textLight, fontSize: 13, margin: 0 }}>Contenu à venir pour cette section.</p>
        )
      )}

      {(financements.documents.length > 0 || financements.videos.length > 0 || financements.contacts.length > 0) && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderTop: dispositifs.length > 0 ? "1px solid #eef0f3" : undefined,
            paddingTop: dispositifs.length > 0 ? 16 : 0,
          }}
        >
          <DocumentsGrid documents={financements.documents} />
          <VideosGrid videos={financements.videos} />
          <ContactsGrid contacts={financements.contacts} />
        </div>
      )}
    </div>
  )

  const gestionContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {(creerEmploiParagraphes.length > 0 || gestionEmploiContenu.eLearningLienUrl || gestionEmploiContenu.creerEmploiLienUrl) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {gestionEmploiContenu.eLearningLienUrl && (
            <div
              style={{
                background: "#fff7e6",
                border: `1px solid ${colors.gold}`,
                borderRadius: 8,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {gestionEmploiContenu.eLearningTitre && (
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>{gestionEmploiContenu.eLearningTitre}</span>
              )}
              {gestionEmploiContenu.eLearningTexte && (
                <p style={{ margin: 0, fontSize: 13, color: colors.text, lineHeight: 1.6 }}>{gestionEmploiContenu.eLearningTexte}</p>
              )}
              <HoverLink
                href={gestionEmploiContenu.eLearningLienUrl}
                target="_blank"
                style={{
                  alignSelf: "flex-start",
                  background: colors.red,
                  color: "#fff",
                  padding: "9px 18px",
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: fontBody,
                  textDecoration: "none",
                }}
                hoverStyle={{ background: colors.redDark }}
              >
                {gestionEmploiContenu.eLearningLienLabel || "Formez-vous !"}
              </HoverLink>
            </div>
          )}

          {creerEmploiParagraphes.map((p, i) => (
            <p key={i} style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: colors.text }}>
              {p}
            </p>
          ))}

          {gestionEmploiContenu.creerEmploiLienUrl && (
            <HoverLink
              href={gestionEmploiContenu.creerEmploiLienUrl}
              target="_blank"
              style={{ alignSelf: "flex-start", fontSize: 13, fontWeight: 700, color: colors.navy, textDecoration: "underline" }}
            >
              {gestionEmploiContenu.creerEmploiLienLabel || "Créer un emploi"}
            </HoverLink>
          )}
        </div>
      )}

      {pratiqueCards.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
          {pratiqueCards.map((card) => (
            <div
              key={card.id}
              style={{ background: colors.navy, borderRadius: 8, padding: 22, display: "flex", flexDirection: "column", gap: 10 }}
            >
              {PRATIQUE_ICON[card.icone]}
              <span style={{ fontFamily: fontHeading, color: "#fff", fontSize: 15, fontWeight: 700 }}>{card.titre}</span>
              {card.description && (
                <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 12.5, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                  {card.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {(gestion.documents.length > 0 || gestion.videos.length > 0 || gestion.contacts.length > 0) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <DocumentsGrid documents={gestion.documents} />
          <VideosGrid videos={gestion.videos} />
          <ContactsGrid contacts={gestion.contacts} />
        </div>
      )}

      {(gestionEmploiContenu.communauteTitre || gestionEmploiContenu.communauteTexte || communauteVideoEmbed || communauteVideoIsFile) && (
        <div style={{ background: colors.bg, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ aspectRatio: "5/1", minHeight: 60 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/emploi-bandeau-communaute.webp" alt="Communauté Employeurs IEFF" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "clamp(20px,3vw,32px)", display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 10 }}>
              {gestionEmploiContenu.communauteTitre && (
                <h3 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 20, fontWeight: 800, margin: 0 }}>
                  {gestionEmploiContenu.communauteTitre}
                </h3>
              )}
              {gestionEmploiContenu.communauteTexte && (
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: colors.text }}>{gestionEmploiContenu.communauteTexte}</p>
              )}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
                {gestionEmploiContenu.communauteLienEnSavoirPlusUrl && (
                  <HoverLink
                    href={gestionEmploiContenu.communauteLienEnSavoirPlusUrl}
                    target="_blank"
                    style={{
                      background: "transparent",
                      color: colors.navy,
                      border: `1.5px solid ${colors.navy}`,
                      padding: "9px 18px",
                      borderRadius: 24,
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: fontBody,
                      textDecoration: "none",
                    }}
                    hoverStyle={{ background: colors.navy, color: "#fff" }}
                  >
                    En savoir plus
                  </HoverLink>
                )}
                {gestionEmploiContenu.communauteLienRejoindreUrl && (
                  <HoverLink
                    href={gestionEmploiContenu.communauteLienRejoindreUrl}
                    target="_blank"
                    style={{
                      background: colors.red,
                      color: "#fff",
                      border: "none",
                      padding: "9px 18px",
                      borderRadius: 24,
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: fontBody,
                      textDecoration: "none",
                    }}
                    hoverStyle={{ background: colors.redDark }}
                  >
                    Rejoignez la communauté
                  </HoverLink>
                )}
              </div>
            </div>
            {(communauteVideoEmbed || communauteVideoIsFile) && (
              <div style={{ flex: "1 1 300px", maxWidth: 380, aspectRatio: "16/9", borderRadius: 8, overflow: "hidden" }}>
                {communauteVideoEmbed ? (
                  <iframe
                    src={communauteVideoEmbed}
                    title="Communauté employeur"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                ) : (
                  <video controls preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}>
                    <source src={communauteVideoUrl!} />
                  </video>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {partenaires.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
            Les partenaires Emploi
          </span>
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
        </div>
      )}
    </div>
  )

  const formationContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {formationEmployabiliteContenu.introTexte && (
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: colors.text }}>{formationEmployabiliteContenu.introTexte}</p>
      )}

      {formation.documents.length === 0 && formation.videos.length === 0 && formation.contacts.length === 0 && (
        <p style={{ color: colors.textLight, fontSize: 13, margin: 0 }}>Contenu à venir pour cette section.</p>
      )}

      <DocumentsGrid documents={formation.documents} />
      <VideosGrid videos={formation.videos} />
      <ContactsGrid contacts={formation.contacts} />

      {formationEmployabiliteContenu.indicateursNote && (
        <div style={{ background: colors.bg, borderRadius: 8, padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
            Indicateurs employabilité
          </span>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: colors.text, whiteSpace: "pre-line" }}>
            {formationEmployabiliteContenu.indicateursNote}
          </p>
        </div>
      )}
    </div>
  )

  const sectionTabs: EmploiSectionTab[] = [
    { key: "FINANCEMENTS", label: SECTION_EMPLOI_LABELS.FINANCEMENTS, icon: SECTION_ICON.FINANCEMENTS, content: financementsContent },
    { key: "GESTION_EMPLOI", label: SECTION_EMPLOI_LABELS.GESTION_EMPLOI, icon: SECTION_ICON.GESTION_EMPLOI, content: gestionContent },
    {
      key: "FORMATION_EMPLOYABILITE",
      label: SECTION_EMPLOI_LABELS.FORMATION_EMPLOYABILITE,
      icon: SECTION_ICON.FORMATION_EMPLOYABILITE,
      content: formationContent,
    },
  ]

  return (
    <main>
      <PageHero {...hero} />

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 20px 0" }}>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 12 }}>
            {introParagraphes.map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: colors.text }}>
                {p}
              </p>
            ))}
            {introItems.length > 0 && (
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
                {introItems.map((item, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: colors.text }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <VideoBlock url={pageContenu.videoCommunauteUrl} title="Communauté Employeur IEFF" />
        </div>
      </section>

      <div style={{ marginTop: 40 }}>
        <BandeauEmploiCta contenu={accueilContenu} />
      </div>

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 20px 0" }}>
        <EmploiSectionTabs tabs={sectionTabs} />
      </section>

      {webinaires.length > 0 && (
        <section style={{ maxWidth: 1160, margin: "0 auto", padding: "56px 20px 0" }}>
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

      <div style={{ paddingBottom: 72 }} />
    </main>
  )
}
