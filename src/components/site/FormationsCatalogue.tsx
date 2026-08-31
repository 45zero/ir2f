"use client"

import { useMemo, useState, type CSSProperties, type ReactNode } from "react"
import Link from "next/link"
import { Hoverable } from "@/components/ui/Hoverable"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import { CATEGORIE_LABELS, type CatalogueFormation } from "@/lib/formations-shared"
import { ONGLET_LABEL, ongletKeyId } from "@/lib/formations-page-shared"
import { effetVisuelStyle, effetVisuelHoverStyle } from "@/lib/effet-visuel"
import { getYoutubeEmbedUrl } from "@/lib/youtube"
import type { FormationOngletData, FormationTuileData } from "@/lib/formations"
import type { CategorieFormation, FormationOngletCle, GroupeEquivalence, TypeFormation, VarianteNode } from "@/generated/prisma"

type ExpandedTab = "info" | "parcours" | "club" | "eduPresentation" | "eduPro" | "eduBenevole" | "eduEquivalences"

const VARIANT_STYLES: Record<VarianteNode, CSSProperties> = {
  NAVY: { background: colors.navy, color: "#ffffff" },
  LIGHT: { background: "#d7e6f5", color: colors.navy },
  RED: { background: "#f9d7da", color: "#9c1420" },
  OUTLINE: { background: "#ffffff", color: colors.navy, border: `1.5px solid ${colors.navy}` },
}

const BENEVOLE_COLUMNS: { groupe: GroupeEquivalence; label: string }[] = [
  { groupe: "AF", label: "ATTESTATIONS FÉDÉRALES (AF)" },
  { groupe: "CFI", label: "CERTIFICATS FÉDÉRAUX INITIATEURS (CFI)" },
  { groupe: "DF", label: "DIPLÔMES FÉDÉRAUX (DF)" },
]

// Code couleur par format (catalogue "Tout Terrain" de l'onglet Club) — un
// diplôme MIXTE (plusieurs formats) retombe sur une couleur neutre.
const FORMAT_COLOR: Record<TypeFormation, string> = {
  ELEARNING: colors.red,
  VISIO: colors.gold,
  PRESENTIEL: colors.navy,
  MIXTE: colors.textLight,
}

const FORMAT_BACKGROUND: Record<TypeFormation, string> = {
  ELEARNING: "rgba(227,6,19,0.07)",
  VISIO: "rgba(201,168,76,0.14)",
  PRESENTIEL: "rgba(26,58,107,0.06)",
  MIXTE: "rgba(107,114,128,0.08)",
}

const FORMAT_LEGEND: { type: TypeFormation; label: string; duree: string }[] = [
  { type: "ELEARNING", label: "Elearning (autoformation en ligne)", duree: "15 à 30’" },
  { type: "VISIO", label: "Classe virtuelle (visioconférence)", duree: "2 h" },
  { type: "PRESENTIEL", label: "Classe présentiel (atelier)", duree: "3 à 4 h" },
]

const CLUB_COLUMNS: { groupe: GroupeEquivalence; label: string }[] = [
  { groupe: "CLUB_VIVRE", label: "Vivre ensemble dans son club" },
  { groupe: "CLUB_GERER", label: "Gérer son club" },
  { groupe: "CLUB_DEV", label: "Développer son club" },
]


const tabBase: CSSProperties = {
  border: "1.5px solid #d8dde5",
  background: "#fff",
  color: colors.navy,
  padding: "9px 16px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
  whiteSpace: "nowrap",
}

const tabActive: CSSProperties = {
  ...tabBase,
  border: "none",
  background: colors.navy,
  color: "#fff",
}

const tabTitleStyle: CSSProperties = {
  fontFamily: fontHeading,
  color: colors.navy,
  fontSize: "clamp(18px,2.2vw,24px)",
  fontWeight: 800,
  margin: 0,
  lineHeight: 1.2,
}

const tabTextStyle: CSSProperties = {
  color: colors.textMuted,
  fontSize: 14,
  lineHeight: 1.65,
  margin: 0,
  whiteSpace: "pre-line",
  maxWidth: 640,
}

const equivThStyle: CSSProperties = {
  textAlign: "left",
  color: "#fff",
  fontWeight: 700,
  fontSize: 11.5,
  padding: "10px 14px",
  fontFamily: fontHeading,
  letterSpacing: 0.2,
}

const equivTdStyle: CSSProperties = {
  padding: "10px 14px",
  color: colors.text,
  fontSize: 12.5,
  lineHeight: 1.5,
  borderTop: "1px solid #eef0f3",
  whiteSpace: "pre-line",
}

function nodeChipStyle(f: CatalogueFormation): CSSProperties {
  return {
    ...VARIANT_STYLES[f.varianteNode ?? "NAVY"],
    borderRadius: 6,
    padding: "11px 13px",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.3,
    cursor: "pointer",
    transition: "opacity 0.15s",
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
  }
}

function NodeBadge({ f }: { f: CatalogueFormation }) {
  const dfBadgeSrc = DF_BADGE_SRC[f.slug]
  if (dfBadgeSrc) {
    return <img src={dfBadgeSrc} alt="" style={{ height: 22, width: "auto", flexShrink: 0 }} />
  }
  if (!f.badgeNode) return null
  const isPro = (f.groupeEquivalence ?? "").startsWith("PRO")
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: isPro ? colors.gold : colors.red,
        color: isPro ? colors.navy : "#fff",
        fontSize: 9,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {f.badgeNode}
    </span>
  )
}

// Badges UEFA/FFF du parcours professionnel (public/images/cygle) — associés
// par slug aux nœuds du diagramme "équivalences et passerelles".
const PRO_BADGE_SRC: Record<string, string> = {
  "pro-bepf": "/images/cygle/uefa-pro.png",
  "pro-beff": "/images/cygle/uefa-youth.png",
  "pro-bef": "/images/cygle/abef.png",
  "pro-bmf": "/images/cygle/abmf.png",
}

// Badge UEFA C du nœud bénévole "Responsable École de Football" (équivalent
// Licence UEFA C) — remplace le petit rond lettré générique de NodeBadge.
const DF_BADGE_SRC: Record<string, string> = {
  "df-refe": "/images/cygle/uefa-C.png",
}

function UpArrow({ height = 26, dashed = false }: { height?: number; dashed?: boolean }) {
  const stroke = dashed ? colors.textLight : colors.navy
  return (
    <svg width="18" height={height} viewBox={`0 0 18 ${height}`} style={{ display: "block", margin: "0 auto" }}>
      <line x1="9" y1={height} x2="9" y2="7" stroke={stroke} strokeWidth="2.5" strokeDasharray={dashed ? "4 4" : undefined} />
      <polyline points="3,13 9,3 15,13" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Deux traits divergents (DESJEPS → BEPF / BEFF) ; pas de pointe de flèche ici
// (elle serait déformée par l'étirement non uniforme du SVG) — le UpArrow placé
// juste en dessous porte la pointe vers DESJEPS.
function SplitArrows() {
  return (
    <svg width="100%" height="22" viewBox="0 0 100 22" preserveAspectRatio="none" style={{ display: "block" }}>
      <line x1="50" y1="22" x2="20" y2="2" stroke={colors.navy} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <line x1="50" y1="22" x2="80" y2="2" stroke={colors.navy} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// Double flèche pointillée (BEF + BMF ← Formation Continue), en surplomb à
// gauche du bloc BEF/BMF/Continue. Positions en pourcentage (étirées via
// preserveAspectRatio="none") car la hauteur réelle du bloc varie.
// Les deux courbes se terminent chacune par une tangente horizontale vers la
// droite (contrôle et point final à la même hauteur) : le marker "orient=auto"
// se cale donc naturellement sur cette direction, pointe toujours collée au
// bout du trait — plus de flèche flottante déconnectée de la ligne.
// BEF et BMF → Formation Continue (le recyclage se fait après le diplôme).
// Coin arrondi de rayon constant (r) aux deux angles de chaque tracé — seule
// la longueur du tronc vertical change entre l'arc court (BMF) et long (BEF),
// pour un rendu harmonieux entre les deux flèches.
function RecyclageBracket() {
  const r = 6
  return (
    <svg
      viewBox="0 0 40 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", left: -40, top: 0, width: 40, height: "100%", overflow: "visible" }}
    >
      <defs>
        <marker id="recyclage-arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill={colors.textLight} />
        </marker>
      </defs>
      {/* BMF → Continue : tronc court (x=14) */}
      <path
        d={`M 36 58 L ${14 + r} 58 Q 14 58 14 ${58 + r} L 14 ${92 - r} Q 14 92 ${14 + r} 92 L 36 92`}
        fill="none"
        stroke={colors.textLight}
        strokeWidth="1.5"
        strokeDasharray="4 5"
        markerEnd="url(#recyclage-arrowhead)"
      />
      {/* BEF → Continue : tronc long (x=6), même rayon d'arrondi */}
      <path
        d={`M 36 20 L ${6 + r} 20 Q 6 20 6 ${20 + r} L 6 ${92 - r} Q 6 92 ${6 + r} 92 L 36 92`}
        fill="none"
        stroke={colors.textLight}
        strokeWidth="1.5"
        strokeDasharray="4 5"
        markerEnd="url(#recyclage-arrowhead)"
      />
    </svg>
  )
}

// Case cliquable "Traditionnel / En apprentissage / VAE" d'un brevet — chaque
// modalité redirige vers sa propre fiche formation (ou reste vide si non renseignée).
function ModaliteCell({ formations, iconColor, hoverBackground }: { formations: CatalogueFormation[]; iconColor: string; hoverBackground: string }) {
  const f = formations[0]
  if (!f) {
    return <div style={{ padding: "13px 8px", textAlign: "center", fontSize: 11, color: "rgba(128,128,128,0.5)" }}>—</div>
  }
  return (
    <Hoverable
      as={Link}
      href={`/formations/${f.slug}`}
      aria-label={f.titre}
      title={f.titre}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "13px 8px",
        cursor: "pointer",
        textDecoration: "none",
        transition: "background 0.15s",
      }}
      hoverStyle={{ background: hoverBackground }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5">
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </Hoverable>
  )
}

// Bloc "BEF" / "BMF" / "CDSSA" du parcours professionnel : bandeau titre (+ badge
// UEFA en médaillon si fourni), puis les modalités d'accès cliquables
// (Traditionnel / Apprentissage / VAE — ou seulement les 2 premières pour le CDSSA).
function BrevetBlock({
  headerFormations,
  badgeSrc,
  headerBackground,
  subtitle,
  cellBackground = colors.navyDark,
  cellColor = "#fff",
  cells,
}: {
  headerFormations: CatalogueFormation[]
  badgeSrc?: string
  headerBackground: string
  subtitle?: string
  cellBackground?: string
  cellColor?: string
  cells: { label: string; formations: CatalogueFormation[] }[]
}) {
  const header = headerFormations[0]
  const dividerColor = cellColor === "#fff" ? "rgba(255,255,255,0.18)" : "rgba(20,33,61,0.15)"
  const labelColor = cellColor === "#fff" ? "rgba(255,255,255,0.65)" : "rgba(20,33,61,0.55)"
  const hoverBackground = cellColor === "#fff" ? "rgba(255,255,255,0.16)" : "rgba(20,33,61,0.08)"
  return (
    <div style={{ position: "relative" }}>
      {badgeSrc && (
        <img
          src={badgeSrc}
          alt=""
          style={{ position: "absolute", top: -16, right: 14, height: 54, width: "auto", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}
        />
      )}
      <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 10px rgba(20,33,61,0.12)" }}>
        <div
          style={{
            background: headerBackground,
            color: "#fff",
            fontFamily: fontHeading,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.3,
            padding: badgeSrc ? "12px 66px 12px 16px" : "12px 16px",
            lineHeight: 1.3,
          }}
        >
          {header?.titre}
          {subtitle && <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.75, marginTop: 2 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cells.length},1fr)`, background: cellBackground }}>
          {cells.map((c, i) => (
            <div key={c.label} style={{ borderLeft: i > 0 ? `1px solid ${dividerColor}` : undefined }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.4, color: labelColor, textAlign: "center", padding: "6px 4px 0" }}>
                {c.label.toUpperCase()}
              </div>
              <ModaliteCell formations={c.formations} iconColor={cellColor} hoverBackground={hoverBackground} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Ligne cliquable du catalogue "Tout Terrain" (onglet Les différents
// parcours, catégorie TERRAIN) — la case est teintée dans la couleur du
// format (voir FORMAT_COLOR / légende "Les formats"), titre en gris neutre.
function ClubFormationRow({ f }: { f: CatalogueFormation }) {
  return (
    <Hoverable
      as={Link}
      href={`/formations/${f.slug}`}
      style={{
        display: "block",
        padding: "11px 14px",
        borderLeft: `4px solid ${FORMAT_COLOR[f.type]}`,
        borderRadius: 4,
        background: FORMAT_BACKGROUND[f.type],
        color: colors.textMuted,
        fontSize: 12.5,
        fontWeight: 600,
        lineHeight: 1.35,
        textDecoration: "none",
        transition: "filter 0.15s",
      }}
      hoverStyle={{ filter: "brightness(0.96)" }}
    >
      {f.titre}
    </Hoverable>
  )
}

function FormationGridCard({ f }: { f: CatalogueFormation }) {
  return (
    <Hoverable
      as={Link}
      href={`/formations/${f.slug}`}
      style={{
        cursor: "pointer",
        borderRadius: 10,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 10px rgba(20,33,61,0.08)",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        transition: "box-shadow 0.15s",
      }}
      hoverStyle={{ boxShadow: "0 10px 28px rgba(20,33,61,0.16)" }}
    >
      <div
        style={{
          height: 150,
          backgroundImage: f.image ? `url('${f.image}')` : undefined,
          backgroundColor: f.image ? undefined : colors.navy,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(255,255,255,0.9)",
            color: colors.navy,
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 9px",
            borderRadius: 3,
            letterSpacing: 0.4,
          }}
        >
          {f.categorieLabel}
        </span>
      </div>
      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: colors.navy, lineHeight: 1.3, fontFamily: fontHeading }}>
          {f.titre}
        </span>
        <span style={{ fontSize: 12, color: colors.textLight, display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {f.dureeLabel}
        </span>
      </div>
      <div
        style={{
          background: f.cpfEligible ? colors.gold : colors.navy,
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {f.cpfEligible && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: 0.3 }}>{f.footerLabel}</span>
      </div>
    </Hoverable>
  )
}

// Bloc vidéo/image d'un onglet : fichier vidéo direct ou vidéo YouTube si renseignée, sinon
// l'image (taille, couleur de fond, opacité, effet visuel administrables), sinon le contenu de
// repli fourni (utilisé pour l'onglet "Présentation").
function OngletMedia({ data, fallback }: { data: FormationOngletData; fallback?: ReactNode }) {
  const embedUrl = data.videoUrl ? getYoutubeEmbedUrl(data.videoUrl) : null

  const containerStyle: CSSProperties = {
    flex: "1 1 280px",
    minWidth: 240,
    aspectRatio: "16/9",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    background: data.backgroundColor,
  }

  if (data.videoFichierUrl) {
    return (
      <div style={containerStyle}>
        <video controls preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}>
          <source src={data.videoFichierUrl} />
        </video>
      </div>
    )
  }

  if (embedUrl) {
    return (
      <div style={containerStyle}>
        <iframe
          src={embedUrl}
          title="Vidéo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    )
  }

  if (data.image) {
    return (
      <div style={{ ...containerStyle, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Hoverable
          as="div"
          style={{
            width: `${data.imageTaille}%`,
            height: `${data.imageTaille}%`,
            backgroundImage: `url('${data.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 6,
            opacity: data.opacity / 100,
            transition: "transform 0.3s ease",
            ...effetVisuelStyle(data.effetVisuel),
          }}
          hoverStyle={effetVisuelHoverStyle(data.effetVisuel)}
        />
      </div>
    )
  }

  if (fallback) return <div style={containerStyle}>{fallback}</div>

  return null
}

// Sections libres empilées sous le contenu principal d'un onglet (Arbitres,
// Tout Terrain, Développement) : texte, images, vidéo, tableau, lien —
// chacune facultative, administrables depuis /admin/formations-page.
function OngletSections({ sections }: { sections: FormationOngletData["sections"] }) {
  if (sections.length === 0) return null
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 8 }}>
      {sections.map((s) => {
        const embedUrl = s.videoUrl ? getYoutubeEmbedUrl(s.videoUrl) : null
        return (
          <div key={s.id} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
            {s.titre && <h4 style={{ ...tabTitleStyle, fontSize: "clamp(16px,1.8vw,20px)" }}>{s.titre}</h4>}
            {s.contenu && <p style={{ ...tabTextStyle, maxWidth: "none" }}>{s.contenu}</p>}
            {s.images.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {s.images.map((img, i) => (
                  <a
                    key={i}
                    href={img}
                    download
                    title="Télécharger l'image"
                    style={{
                      width: 96,
                      height: 72,
                      borderRadius: 6,
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
            {s.pdfs.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {s.pdfs.map((pdf, i) => (
                  <a
                    key={i}
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#f5f7fb",
                      border: "1px solid #eef0f3",
                      borderRadius: 6,
                      padding: "8px 14px",
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: colors.navy,
                      textDecoration: "none",
                    }}
                  >
                    📄 {pdf.nom}
                  </a>
                ))}
              </div>
            )}
            {(s.videoFichierUrl || embedUrl) && (
              <div style={{ aspectRatio: "16/9", maxWidth: 480, borderRadius: 8, overflow: "hidden" }}>
                {s.videoFichierUrl ? (
                  <video controls preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}>
                    <source src={s.videoFichierUrl} />
                  </video>
                ) : (
                  <iframe
                    src={embedUrl!}
                    title={s.titre ?? "Vidéo"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                )}
              </div>
            )}
            {s.tableauEntetes && s.tableauEntetes.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.tableauTitre && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
                    {s.tableauTitre}
                  </span>
                )}
                <div style={{ overflowX: "auto", border: "1px solid #eef0f3", borderRadius: 8 }}>
                  <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: fontBody }}>
                    <thead>
                      <tr style={{ background: colors.navy }}>
                        {s.tableauEntetes.map((h, i) => (
                          <th key={i} style={equivThStyle}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(s.tableauLignes ?? []).map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f7f9fc" }}>
                          {row.map((cell, j) => (
                            <td key={j} style={equivTdStyle}>
                              {cell || "—"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {s.lienUrl && (
              <Hoverable
                as="a"
                href={s.lienUrl}
                style={{
                  alignSelf: "flex-start",
                  background: colors.red,
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: fontBody,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                hoverStyle={{ background: colors.redDark }}
              >
                {s.lienLabel || "En savoir plus"}
              </Hoverable>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function FormationsCatalogue({
  formations,
  tuiles,
  onglets,
  initialCategory,
}: {
  formations: CatalogueFormation[]
  tuiles: FormationTuileData[]
  onglets: Record<string, FormationOngletData>
  initialCategory: CategorieFormation
}) {
  const [sidebarCategory, setSidebarCategory] = useState<CategorieFormation>(initialCategory)
  const [expandedTab, setExpandedTab] = useState<ExpandedTab>(initialCategory === "EDUCATEUR" ? "eduPresentation" : "info")
  const [popupFormationId, setPopupFormationId] = useState<string | null>(null)
  const [benevoleFilter, setBenevoleFilter] = useState<GroupeEquivalence | "TOUS">("TOUS")

  function getOnglet(categorie: CategorieFormation, onglet: FormationOngletCle): FormationOngletData {
    return (
      onglets[ongletKeyId(categorie, onglet)] ?? {
        titre: null,
        contenu: null,
        videoUrl: null,
        image: null,
        imageTaille: 100,
        backgroundColor: "#f5f7fb",
        opacity: 100,
        effetVisuel: "AUCUN",
        tableaux: [],
        formationVedetteId: null,
        formationVedette: null,
      }
    )
  }

  const byCategory = useMemo(() => {
    const map = new Map<CategorieFormation, CatalogueFormation[]>()
    for (const f of formations) {
      const list = map.get(f.categorie) ?? []
      list.push(f)
      map.set(f.categorie, list)
    }
    return map
  }, [formations])

  const equivalenceByGroup = useMemo(() => {
    const map = new Map<GroupeEquivalence, CatalogueFormation[]>()
    for (const f of formations) {
      if (!f.groupeEquivalence) continue
      const list = map.get(f.groupeEquivalence) ?? []
      list.push(f)
      map.set(f.groupeEquivalence, list)
    }
    return map
  }, [formations])

  function selectCategory(cat: CategorieFormation) {
    setSidebarCategory(cat)
    setExpandedTab(cat === "EDUCATEUR" ? "eduPresentation" : "info")
    setPopupFormationId(null)
  }

  const popupFormation = popupFormationId ? formations.find((f) => f.id === popupFormationId) ?? null : null

  return (
    <main style={{ animation: "ir2fFadeIn 0.4s ease" }}>
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 20px 80px" }}>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 240px", minWidth: 220, display: "flex", flexDirection: "column", gap: 12 }}>
            {tuiles.map((tile) => (
              <div
                key={tile.categorie}
                onClick={() => selectCategory(tile.categorie)}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  minHeight: 110,
                  borderRadius: 8,
                  overflow: "hidden",
                  background: tile.backgroundColor,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 16,
                  boxShadow: sidebarCategory === tile.categorie ? "0 0 0 3px #1a3a6b inset" : undefined,
                }}
              >
                {tile.image && (
                  <Hoverable
                    as="div"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url('${tile.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: tile.opacity / 100,
                      transition: "transform 0.3s ease",
                      ...effetVisuelStyle(tile.effetVisuel),
                    }}
                    hoverStyle={effetVisuelHoverStyle(tile.effetVisuel)}
                  />
                )}
                <img
                  src="/images/logo-lgef.png"
                  alt=""
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    height: "60%",
                    width: "auto",
                    opacity: 0.16,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 8, position: "relative" }}>
                  <span
                    style={{
                      color: tile.textColor,
                      fontFamily: tile.textFont === "BODY" ? fontBody : fontHeading,
                      fontSize: tile.categorie === "DEV" ? 13 : 17,
                      fontWeight: 800,
                      lineHeight: 1.15,
                    }}
                  >
                    {tile.label}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tile.arrowColor} strokeWidth="2.5" style={{ flexShrink: 0 }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              flex: "1 1 600px",
              minWidth: 280,
              background: "#f5f7fb",
              borderLeft: `4px solid ${colors.gold}`,
              borderRadius: 8,
              padding: "clamp(20px,3vw,32px)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <span
              style={{
                fontFamily: fontHeading,
                color: colors.navy,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {CATEGORIE_LABELS[sidebarCategory]}
            </span>

            {sidebarCategory === "EDUCATEUR" ? (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={expandedTab === "eduPresentation" ? tabActive : tabBase} onClick={() => setExpandedTab("eduPresentation")}>
                  {ONGLET_LABEL.EDU_PRESENTATION}
                </button>
                <button style={expandedTab === "eduPro" ? tabActive : tabBase} onClick={() => setExpandedTab("eduPro")}>
                  {ONGLET_LABEL.EDU_PRO}
                </button>
                <button style={expandedTab === "eduBenevole" ? tabActive : tabBase} onClick={() => setExpandedTab("eduBenevole")}>
                  {ONGLET_LABEL.EDU_BENEVOLE}
                </button>
                <button style={expandedTab === "eduEquivalences" ? tabActive : tabBase} onClick={() => setExpandedTab("eduEquivalences")}>
                  {ONGLET_LABEL.EDU_EQUIVALENCES}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingRight: 40 }}>
                <button style={expandedTab === "info" ? tabActive : tabBase} onClick={() => setExpandedTab("info")}>
                  {sidebarCategory === "ARBITRAGE"
                    ? "Présentation et parcours"
                    : sidebarCategory === "DEV"
                      ? "Présentation et parcours"
                      : ONGLET_LABEL.INFO}
                </button>
                {sidebarCategory !== "ARBITRAGE" && sidebarCategory !== "DEV" && (
                  <button style={expandedTab === "parcours" ? tabActive : tabBase} onClick={() => setExpandedTab("parcours")}>
                    {ONGLET_LABEL.PARCOURS}
                  </button>
                )}
                {sidebarCategory === "TERRAIN" && (
                  <button style={expandedTab === "club" ? tabActive : tabBase} onClick={() => setExpandedTab("club")}>
                    {ONGLET_LABEL.CLUB}
                  </button>
                )}
              </div>
            )}

            {expandedTab === "info" && (sidebarCategory === "ARBITRAGE" || sidebarCategory === "DEV") && (() => {
              const data = getOnglet(sidebarCategory, "INFO")
              const vedette = data.formationVedette
              return (
                <>
                <div style={{ display: "flow-root", maxWidth: 820 }}>
                  {(data.videoFichierUrl || data.videoUrl || data.image) && (
                    <div style={{ float: "right", width: "min(360px,42%)", marginLeft: 24, marginBottom: 16 }}>
                      <OngletMedia data={data} />
                    </div>
                  )}
                  <span
                    style={{
                      display: "inline-flex",
                      background: "#f5f5f5",
                      color: colors.navy,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      padding: "6px 12px",
                      borderRadius: 3,
                      borderLeft: `3px solid ${colors.gold}`,
                      width: "fit-content",
                      marginBottom: 12,
                    }}
                  >
                    {CATEGORIE_LABELS[sidebarCategory]}
                  </span>
                  {data.titre && <h3 style={{ ...tabTitleStyle, margin: "0 0 12px" }}>{data.titre}</h3>}
                  {data.contenu && <p style={{ ...tabTextStyle, maxWidth: "none", margin: "0 0 16px" }}>{data.contenu}</p>}
                  {vedette && (
                    <>
                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                        <span style={{ fontSize: 12, color: colors.textLight }}>
                          <strong style={{ color: colors.text }}>Durée :</strong> {vedette.dureeLabel ?? "—"}
                        </span>
                        <span style={{ fontSize: 12, color: colors.textLight }}>
                          <strong style={{ color: colors.text }}>Format :</strong> {vedette.modeLabel}
                        </span>
                        <span style={{ fontSize: 12, color: colors.textLight }}>
                          <strong style={{ color: colors.text }}>CPF :</strong> {vedette.cpfEligible ? "Éligible" : "Non éligible"}
                        </span>
                        <span style={{ fontSize: 12, color: colors.textLight }}>
                          <strong style={{ color: colors.text }}>FAFA :</strong> {vedette.fafaEligible ? "Éligible" : "Non éligible"}
                        </span>
                        <span style={{ fontSize: 12, color: colors.textLight }}>
                          <strong style={{ color: colors.text }}>Bon de Formation :</strong>{" "}
                          {vedette.bonFormationEligible ? "Éligible" : "Non éligible"}
                        </span>
                      </div>
                      <Hoverable
                        as={Link}
                        href={`/formations/${vedette.slug}`}
                        style={{
                          background: colors.red,
                          color: "#fff",
                          border: "none",
                          padding: "12px 24px",
                          borderRadius: 4,
                          fontSize: 13,
                          fontWeight: 700,
                          fontFamily: fontBody,
                          cursor: "pointer",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                        hoverStyle={{ background: colors.redDark }}
                      >
                        Voir la fiche complète
                      </Hoverable>
                    </>
                  )}
                </div>
                <OngletSections sections={data.sections} />
                </>
              )
            })()}

            {expandedTab === "info" && sidebarCategory !== "EDUCATEUR" && sidebarCategory !== "ARBITRAGE" && sidebarCategory !== "DEV" && (() => {
              const data = getOnglet(sidebarCategory, "INFO")
              return (
                <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
                  <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 12 }}>
                    {data.titre && <h3 style={tabTitleStyle}>{data.titre}</h3>}
                    {data.contenu && <p style={tabTextStyle}>{data.contenu}</p>}
                  </div>
                  <OngletMedia
                    data={data}
                    fallback={
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "repeating-linear-gradient(135deg,#1a3a6b,#1a3a6b 12px,#16305a 12px,#16305a 24px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.navy}>
                            <polygon points="6 4 20 12 6 20 6 4" />
                          </svg>
                        </div>
                        <span style={{ position: "absolute", bottom: 10, left: 12, fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.85)" }}>
                          VIDÉO — {data.titre}
                        </span>
                      </div>
                    }
                  />
                </div>
                <OngletSections sections={data.sections} />
                </>
              )
            })()}

            {expandedTab === "parcours" && sidebarCategory !== "EDUCATEUR" && sidebarCategory !== "TERRAIN" && (() => {
              const data = getOnglet(sidebarCategory, "PARCOURS")
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
                    <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 12 }}>
                      {data.titre && <h3 style={tabTitleStyle}>{data.titre}</h3>}
                      {data.contenu && <p style={{ ...tabTextStyle, fontSize: 13 }}>{data.contenu}</p>}
                    </div>
                    <OngletMedia data={data} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
                    {(byCategory.get(sidebarCategory) ?? []).map((f) => (
                      <Hoverable
                        as="div"
                        key={f.id}
                        onClick={() => setPopupFormationId(f.id)}
                        style={{
                          cursor: "pointer",
                          background: "#fff",
                          border: "1px solid #e4e9f2",
                          borderRadius: 8,
                          padding: 16,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          transition: "box-shadow 0.15s",
                        }}
                        hoverStyle={{ boxShadow: "0 6px 18px rgba(20,33,61,0.12)" }}
                      >
                        <span style={{ fontSize: 13, fontWeight: 700, color: colors.navy, lineHeight: 1.3 }}>{f.titre}</span>
                        <span style={{ fontSize: 11, color: colors.textLight }}>
                          {f.dureeLabel} · {f.modeLabel}
                        </span>
                      </Hoverable>
                    ))}
                  </div>
                </div>
              )
            })()}

            {expandedTab === "parcours" && sidebarCategory === "TERRAIN" && (() => {
              const data = getOnglet("TERRAIN", "PARCOURS")
              return (
              <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "start" }}>
                  {CLUB_COLUMNS.map((col) => (
                    <div key={col.groupe} style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                      <div
                        style={{
                          background: "#e4e8ee",
                          color: colors.navy,
                          fontFamily: fontHeading,
                          fontSize: 14,
                          fontWeight: 800,
                          letterSpacing: 0.2,
                          padding: "12px 16px",
                          borderRadius: 6,
                        }}
                      >
                        {col.label}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {(equivalenceByGroup.get(col.groupe) ?? []).map((f) => (
                          <ClubFormationRow key={f.id} f={f} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    border: `1.5px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    maxWidth: 520,
                  }}
                >
                  <span style={{ fontFamily: fontHeading, fontSize: 13, fontWeight: 800, color: colors.navy, letterSpacing: 0.5, textTransform: "uppercase" }}>
                    « Les formats »
                  </span>
                  {FORMAT_LEGEND.map((fmt) => (
                    <div key={fmt.type} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: colors.textMuted }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: FORMAT_COLOR[fmt.type], flexShrink: 0 }} />
                      <span>{fmt.label} : </span>
                      <span style={{ fontWeight: 800, color: colors.navy }}>{fmt.duree}</span>
                    </div>
                  ))}
                </div>
                <OngletSections sections={data.sections} />
              </div>
              )
            })()}

            {expandedTab === "club" && sidebarCategory === "TERRAIN" && (() => {
              const data = getOnglet("TERRAIN", "CLUB")
              return (
                <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
                  <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 16 }}>
                    {data.titre && <h3 style={{ ...tabTitleStyle, maxWidth: 820 }}>{data.titre}</h3>}
                    {data.contenu && <p style={{ ...tabTextStyle, maxWidth: 820 }}>{data.contenu}</p>}
                    <Hoverable
                      as={Link}
                      href="/contact"
                      style={{
                        alignSelf: "flex-start",
                        background: colors.red,
                        color: "#fff",
                        border: "none",
                        padding: "13px 26px",
                        borderRadius: 4,
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: fontBody,
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      hoverStyle={{ background: colors.redDark }}
                    >
                      Remplir le formulaire de contact
                    </Hoverable>
                  </div>
                  <OngletMedia data={data} />
                </div>
                <OngletSections sections={data.sections} />
                </>
              )
            })()}

            {expandedTab === "eduPresentation" && sidebarCategory === "EDUCATEUR" && (() => {
              const data = getOnglet("EDUCATEUR", "EDU_PRESENTATION")
              const proData = getOnglet("EDUCATEUR", "EDU_PRO")
              const benevoleData = getOnglet("EDUCATEUR", "EDU_BENEVOLE")
              const hasMedia = Boolean(data.videoFichierUrl || data.videoUrl || data.image)
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
                    {data.titre && <h3 style={tabTitleStyle}>{data.titre}</h3>}
                    {/* flow-root : contexte de mise en forme de bloc pour que ce conteneur
                        englobe correctement la vidéo/image flottée (clearfix moderne) */}
                    <div style={{ display: "flow-root" }}>
                      {hasMedia && (
                        <div style={{ float: "right", width: "min(360px,42%)", marginLeft: 24, marginBottom: 16 }}>
                          <OngletMedia data={data} />
                        </div>
                      )}
                      {data.contenu && <p style={{ ...tabTextStyle, maxWidth: "none" }}>{data.contenu}</p>}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24, alignItems: "start" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {proData.titre && (
                      <div
                        style={{
                          background: colors.gold,
                          color: colors.navy,
                          fontFamily: fontHeading,
                          fontSize: 16,
                          fontWeight: 800,
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                          padding: "12px 16px",
                          borderRadius: 6,
                          textAlign: "center",
                        }}
                      >
                        {proData.titre}
                      </div>
                    )}
                    {proData.contenu && <p style={{ ...tabTextStyle, maxWidth: "none" }}>{proData.contenu}</p>}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      {(equivalenceByGroup.get("PRO_TOP") ?? []).map((f) => (
                        <Hoverable
                          as={Link}
                          key={f.id}
                          href={`/formations/${f.slug}`}
                          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
                          hoverStyle={{ opacity: 0.85 }}
                        >
                          <img src={PRO_BADGE_SRC[f.slug]} alt="" style={{ height: 66, width: "auto", flexShrink: 0, position: "relative", zIndex: 1 }} />
                          <div
                            style={{
                              flex: 1,
                              background: colors.navy,
                              color: "#fff",
                              fontFamily: fontHeading,
                              fontSize: 12.5,
                              fontWeight: 800,
                              lineHeight: 1.25,
                              textAlign: "center",
                              padding: "10px 12px",
                              borderRadius: 6,
                              marginLeft: -12,
                            }}
                          >
                            {f.titre}
                          </div>
                        </Hoverable>
                      ))}
                    </div>

                    <SplitArrows />
                    <UpArrow height={16} />

                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
                      {(equivalenceByGroup.get("PRO_MID") ?? []).map((f) => (
                        <Hoverable
                          as={Link}
                          key={f.id}
                          href={`/formations/${f.slug}`}
                          style={{ ...nodeChipStyle(f), justifyContent: "center", textAlign: "center" }}
                          hoverStyle={{ opacity: 0.85 }}
                        >
                          {f.titre}
                        </Hoverable>
                      ))}
                    </div>

                    <UpArrow />

                    <div style={{ position: "relative", marginLeft: 40, display: "flex", flexDirection: "column", gap: 10 }}>
                      <RecyclageBracket />

                      <BrevetBlock
                        headerFormations={equivalenceByGroup.get("PRO_BEF") ?? []}
                        badgeSrc={PRO_BADGE_SRC["pro-bef"]}
                        headerBackground={colors.navy}
                        cells={[
                          { label: "Traditionnel", formations: equivalenceByGroup.get("PRO_BEF_TRAD") ?? [] },
                          { label: "Apprentissage", formations: equivalenceByGroup.get("PRO_BEF_APP") ?? [] },
                          { label: "VAE", formations: equivalenceByGroup.get("PRO_BEF_VAE") ?? [] },
                        ]}
                      />

                      <UpArrow height={22} />

                      <BrevetBlock
                        headerFormations={equivalenceByGroup.get("PRO_BMF") ?? []}
                        badgeSrc={PRO_BADGE_SRC["pro-bmf"]}
                        headerBackground={`linear-gradient(90deg, ${colors.navy}, #4d7fbd)`}
                        cells={[
                          { label: "Traditionnel", formations: equivalenceByGroup.get("PRO_BMF_TRAD") ?? [] },
                          { label: "Apprentissage", formations: equivalenceByGroup.get("PRO_BMF_APP") ?? [] },
                          { label: "VAE", formations: equivalenceByGroup.get("PRO_BMF_VAE") ?? [] },
                        ]}
                      />

                      {(equivalenceByGroup.get("PRO_MID2") ?? []).map((f) => (
                        <Hoverable
                          as={Link}
                          key={f.id}
                          href={`/formations/${f.slug}`}
                          style={{ ...nodeChipStyle(f), justifyContent: "center", textAlign: "center" }}
                          hoverStyle={{ opacity: 0.85 }}
                        >
                          {f.titre}
                        </Hoverable>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {benevoleData.titre && (
                      <div
                        style={{
                          background: colors.red,
                          color: "#fff",
                          fontFamily: fontHeading,
                          fontSize: 16,
                          fontWeight: 800,
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                          padding: "12px 16px",
                          borderRadius: 6,
                          textAlign: "center",
                        }}
                      >
                        {benevoleData.titre}
                      </div>
                    )}
                    {benevoleData.contenu && <p style={{ ...tabTextStyle, maxWidth: "none" }}>{benevoleData.contenu}</p>}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, alignItems: "start" }}>
                      {BENEVOLE_COLUMNS.map((col) => (
                        <div key={col.groupe} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div
                            style={{
                              background: colors.navy,
                              color: "#fff",
                              fontSize: 11,
                              fontWeight: 700,
                              textAlign: "center",
                              padding: "8px 6px",
                              borderRadius: 5,
                              letterSpacing: 0.3,
                            }}
                          >
                            {col.label}
                          </div>
                          {(equivalenceByGroup.get(col.groupe) ?? []).map((f) => (
                            <Hoverable
                              as={Link}
                              key={f.id}
                              href={`/formations/${f.slug}`}
                              style={nodeChipStyle(f)}
                              hoverStyle={{ opacity: 0.85 }}
                            >
                              <NodeBadge f={f} />
                              <span>{f.titre}</span>
                            </Hoverable>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        background: colors.navy,
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        textAlign: "center",
                        padding: "8px 6px",
                        borderRadius: 5,
                        letterSpacing: 0.3,
                        marginTop: 4,
                      }}
                    >
                      CERTIFICATIONS
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                      {(equivalenceByGroup.get("CERTIF") ?? []).map((f) => (
                        <Hoverable
                          as={Link}
                          key={f.id}
                          href={`/formations/${f.slug}`}
                          style={{ ...nodeChipStyle(f), textAlign: "center", justifyContent: "center" }}
                          hoverStyle={{ opacity: 0.85 }}
                        >
                          {f.titre}
                        </Hoverable>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>
              )
            })()}

            {expandedTab === "eduPro" && sidebarCategory === "EDUCATEUR" && (() => {
              const data = getOnglet("EDUCATEUR", "EDU_PRO")
              const list = (byCategory.get("EDUCATEUR") ?? []).filter((f) => f.filiere === "PROFESSIONNELLE")
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {data.titre && <h3 style={tabTitleStyle}>{data.titre}</h3>}
                  {data.contenu && <p style={tabTextStyle}>{data.contenu}</p>}
                  {(data.videoFichierUrl || data.videoUrl || data.image) && <OngletMedia data={data} />}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
                    {list.map((f) => (
                      <FormationGridCard key={f.id} f={f} />
                    ))}
                  </div>
                </div>
              )
            })()}

            {expandedTab === "eduBenevole" && sidebarCategory === "EDUCATEUR" && (() => {
              const data = getOnglet("EDUCATEUR", "EDU_BENEVOLE")
              const list = (byCategory.get("EDUCATEUR") ?? []).filter((f) => f.filiere === "BENEVOLE")
              const filteredList = benevoleFilter === "TOUS" ? list : list.filter((f) => f.groupeEquivalence === benevoleFilter)
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {data.titre && <h3 style={tabTitleStyle}>{data.titre}</h3>}
                  {data.contenu && <p style={tabTextStyle}>{data.contenu}</p>}
                  {(data.videoFichierUrl || data.videoUrl || data.image) && <OngletMedia data={data} />}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button style={benevoleFilter === "TOUS" ? tabActive : tabBase} onClick={() => setBenevoleFilter("TOUS")}>
                      Tous
                    </button>
                    {BENEVOLE_COLUMNS.map((col) => (
                      <button
                        key={col.groupe}
                        style={benevoleFilter === col.groupe ? tabActive : tabBase}
                        onClick={() => setBenevoleFilter(col.groupe)}
                      >
                        {col.groupe}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
                    {filteredList.map((f) => (
                      <FormationGridCard key={f.id} f={f} />
                    ))}
                  </div>
                  {filteredList.length === 0 && (
                    <p style={{ ...tabTextStyle, color: colors.textLight }}>Aucune formation dans cette catégorie.</p>
                  )}
                </div>
              )
            })()}

            {expandedTab === "eduEquivalences" && sidebarCategory === "EDUCATEUR" && (() => {
              const data = getOnglet("EDUCATEUR", "EDU_EQUIVALENCES")
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
                    <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 16 }}>
                      {data.titre && <h3 style={{ ...tabTitleStyle, maxWidth: 820 }}>{data.titre}</h3>}
                      {data.contenu && <p style={{ ...tabTextStyle, maxWidth: 820 }}>{data.contenu}</p>}
                    </div>
                    <OngletMedia data={data} />
                  </div>

                  {data.tableaux.map((t) => (
                    <div key={t.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {t.titre && (
                        <span style={{ fontFamily: fontHeading, fontSize: 13, fontWeight: 800, color: colors.navy, letterSpacing: 0.4, textTransform: "uppercase" }}>
                          {t.titre}
                        </span>
                      )}
                      <div style={{ overflowX: "auto", border: "1px solid #eef0f3", borderRadius: 8 }}>
                        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 480, fontFamily: fontBody }}>
                          <thead>
                            <tr style={{ background: colors.navy }}>
                              {t.entetes.map((h, i) => (
                                <th key={i} style={equivThStyle}>
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {t.lignes.map((row, i) => (
                              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f7f9fc" }}>
                                {row.map((cell, j) => (
                                  <td key={j} style={j === 0 ? { ...equivTdStyle, fontWeight: 700, color: colors.navy } : equivTdStyle}>
                                    {cell || "—"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        </div>
      </section>

      {popupFormation && (
        <div
          onClick={() => setPopupFormationId(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,33,61,0.55)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 10,
              maxWidth: 560,
              width: "100%",
              maxHeight: "85vh",
              overflow: "auto",
              padding: "clamp(20px,3vw,32px)",
              position: "relative",
              animation: "ir2fFadeIn 0.25s ease",
            }}
          >
            <button
              onClick={() => setPopupFormationId(null)}
              aria-label="Fermer"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "none",
                background: "#f5f7fb",
                color: colors.navy,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <span
              style={{
                display: "inline-flex",
                background: "#f5f5f5",
                color: colors.navy,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: 3,
                borderLeft: `3px solid ${colors.gold}`,
                width: "fit-content",
                marginBottom: 12,
              }}
            >
              {popupFormation.categorieLabel}
            </span>
            <h3 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 22, fontWeight: 800, margin: "0 40px 12px 0", lineHeight: 1.2 }}>
              {popupFormation.titre}
            </h3>
            <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>
              {popupFormation.description}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: colors.textLight }}>
                <strong style={{ color: colors.text }}>Durée :</strong> {popupFormation.dureeLabel}
              </span>
              <span style={{ fontSize: 12, color: colors.textLight }}>
                <strong style={{ color: colors.text }}>Format :</strong> {popupFormation.modeLabel}
              </span>
              <span style={{ fontSize: 12, color: colors.textLight }}>
                <strong style={{ color: colors.text }}>CPF :</strong> {popupFormation.cpfEligible ? "Éligible" : "Non éligible"}
              </span>
              <span style={{ fontSize: 12, color: colors.textLight }}>
                <strong style={{ color: colors.text }}>FAFA :</strong> {popupFormation.fafaEligible ? "Éligible" : "Non éligible"}
              </span>
              <span style={{ fontSize: 12, color: colors.textLight }}>
                <strong style={{ color: colors.text }}>Bon de Formation :</strong>{" "}
                {popupFormation.bonFormationEligible ? "Éligible" : "Non éligible"}
              </span>
            </div>
            <Hoverable
              as={Link}
              href={`/formations/${popupFormation.slug}`}
              style={{
                background: colors.red,
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: fontBody,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
              hoverStyle={{ background: colors.redDark }}
            >
              Voir la fiche complète
            </Hoverable>
          </div>
        </div>
      )}
    </main>
  )
}
