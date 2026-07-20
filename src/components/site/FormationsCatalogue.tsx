"use client"

import { useMemo, useState, type CSSProperties } from "react"
import Link from "next/link"
import { Hoverable } from "@/components/ui/Hoverable"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import { CATEGORIE_LABELS, FILIERE_LABELS, type CatalogueFormation } from "@/lib/formations-shared"
import type { CategorieFormation, GroupeEquivalence, VarianteNode } from "@/generated/prisma"

type CategoryInfo = { titre: string; corps: string } | null

type ExpandedTab = "info" | "parcours" | "club" | "eduPresentation" | "eduPro" | "eduBenevole" | "eduEquivalences"

const TILES: { id: CategorieFormation; label: string }[] = [
  { id: "EDUCATEUR", label: "Éducateurs" },
  { id: "ARBITRAGE", label: "Arbitres" },
  { id: "TERRAIN", label: "Tout Terrain" },
  { id: "DEV", label: "Chargé de Développement de Structures Sportives et Associatives (CDSSA)" },
]

const SIDEBAR_CATEGORIES: CategorieFormation[] = ["EDUCATEUR", "ARBITRAGE", "TERRAIN", "CLUB", "DEV"]

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

const chipBase: CSSProperties = {
  border: "1.5px solid transparent",
  background: "#eef2f9",
  color: colors.navy,
  padding: "9px 18px",
  borderRadius: 20,
  fontSize: 13,
  fontWeight: 600,
  fontFamily: fontBody,
  cursor: "pointer",
  whiteSpace: "nowrap",
}

const chipActive: CSSProperties = {
  ...chipBase,
  border: `1.5px solid ${colors.red}`,
  background: colors.red,
  color: "#fff",
  boxShadow: "0 4px 10px rgba(227,6,19,0.25)",
}

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

export function FormationsCatalogue({
  formations,
  categoryInfo,
  initialCategory,
}: {
  formations: CatalogueFormation[]
  categoryInfo: Record<CategorieFormation, CategoryInfo>
  initialCategory: CategorieFormation
}) {
  const [sidebarCategory, setSidebarCategory] = useState<CategorieFormation>(initialCategory)
  const [expandedCategory, setExpandedCategory] = useState<CategorieFormation | null>(initialCategory)
  const [expandedTab, setExpandedTab] = useState<ExpandedTab>(initialCategory === "EDUCATEUR" ? "eduPresentation" : "info")
  const [eduTrackFilter, setEduTrackFilter] = useState<"pro" | "benevole" | null>(null)
  const [popupFormationId, setPopupFormationId] = useState<string | null>(null)

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

  function toggleCategoryPanel(cat: CategorieFormation) {
    setSidebarCategory(cat)
    setExpandedCategory((current) => (current === cat ? null : cat))
    setExpandedTab("info")
    setPopupFormationId(null)
  }

  const formationsPageList = useMemo(() => {
    const pool = byCategory.get(sidebarCategory) ?? []
    if (sidebarCategory !== "EDUCATEUR" || !eduTrackFilter) return pool
    const wanted = eduTrackFilter === "pro" ? "PROFESSIONNELLE" : "BENEVOLE"
    return pool.filter((f) => f.filiere === wanted)
  }, [byCategory, sidebarCategory, eduTrackFilter])

  const popupFormation = popupFormationId ? formations.find((f) => f.id === popupFormationId) ?? null : null
  const info = expandedCategory ? categoryInfo[expandedCategory] : null

  return (
    <main style={{ animation: "ir2fFadeIn 0.4s ease" }}>
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 20px 8px" }}>
        <span style={{ color: colors.red, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
          Catalogue
        </span>
        <div style={{ margin: "6px 0 28px" }}>
          <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 800, margin: 0 }}>
          NOTRE OFFRE DE FORMATION
          </h1>
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {TILES.map((tile) => (
            <div
              key={tile.id}
              onClick={() => toggleCategoryPanel(tile.id)}
              style={{
                cursor: "pointer",
                position: "relative",
                minHeight: 150,
                borderRadius: 8,
                overflow: "hidden",
                background: "repeating-linear-gradient(135deg,#c9a84c,#c9a84c 12px,#b3934a 12px,#b3934a 24px)",
                display: "flex",
                alignItems: "flex-end",
                padding: 18,
                boxShadow: sidebarCategory === tile.id ? "0 0 0 3px #1a3a6b inset" : undefined,
              }}
            >
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
                    color: colors.navy,
                    fontFamily: fontHeading,
                    fontSize: tile.id === "DEV" ? 13 : 19,
                    fontWeight: 800,
                    lineHeight: 1.15,
                  }}
                >
                  {tile.label}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {expandedCategory && (
        <section style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px 32px" }}>
          <div
            style={{
              background: "#f5f7fb",
              borderLeft: `4px solid ${colors.gold}`,
              borderRadius: 8,
              padding: "clamp(20px,3vw,32px)",
              position: "relative",
              animation: "ir2fFadeIn 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <button
              onClick={() => setExpandedCategory(null)}
              aria-label="Fermer"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "none",
                background: "#fff",
                color: colors.navy,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(20,33,61,0.12)",
                zIndex: 2,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {expandedCategory === "EDUCATEUR" ? (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingRight: 40 }}>
                <button style={expandedTab === "eduPresentation" ? tabActive : tabBase} onClick={() => setExpandedTab("eduPresentation")}>
                  Présentation et parcours
                </button>
                <button style={expandedTab === "eduPro" ? tabActive : tabBase} onClick={() => setExpandedTab("eduPro")}>
                  Formations professionnelles
                </button>
                <button style={expandedTab === "eduBenevole" ? tabActive : tabBase} onClick={() => setExpandedTab("eduBenevole")}>
                  Formations bénévoles
                </button>
                <button style={expandedTab === "eduEquivalences" ? tabActive : tabBase} onClick={() => setExpandedTab("eduEquivalences")}>
                  Équivalences et passerelles
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingRight: 40 }}>
                <button style={expandedTab === "info" ? tabActive : tabBase} onClick={() => setExpandedTab("info")}>
                  Présentation
                </button>
                <button style={expandedTab === "parcours" ? tabActive : tabBase} onClick={() => setExpandedTab("parcours")}>
                  Les différents parcours
                </button>
                {expandedCategory === "TERRAIN" && (
                  <button style={expandedTab === "club" ? tabActive : tabBase} onClick={() => setExpandedTab("club")}>
                    Accueillir une formation dans mon club
                  </button>
                )}
              </div>
            )}

            {expandedTab === "info" && info && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 12 }}>
                  <h3 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                    {info.titre}
                  </h3>
                  <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.65, margin: 0, whiteSpace: "pre-line", maxWidth: 640 }}>
                    {info.corps}
                  </p>
                </div>
                <div
                  style={{
                    flex: "1 1 280px",
                    minWidth: 240,
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
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.navy}>
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  </div>
                  <span style={{ position: "absolute", bottom: 10, left: 12, fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.85)" }}>
                    VIDÉO — {info.titre}
                  </span>
                </div>
              </div>
            )}

            {expandedTab === "parcours" && expandedCategory !== "EDUCATEUR" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ color: colors.textMuted, fontSize: 13, margin: 0 }}>
                  Cliquez sur une formation pour en voir le détail.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
                  {(byCategory.get(expandedCategory) ?? []).map((f) => (
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
            )}

            {expandedTab === "club" && expandedCategory === "TERRAIN" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800, margin: 0, lineHeight: 1.2, maxWidth: 820 }}>
                  ACCUEILLIR UNE FORMATION AU SEIN DE MON CLUB
                </h3>
                <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.65, margin: 0, maxWidth: 820 }}>
                  L&apos;Institut Régional de Formation du Football de la Ligue du Grand Est souhaite recueillir les besoins en
                  formations « Tout Terrain » (dirigeants, bénévoles, éducateurs, arbitres, parents) des clubs sur le territoire afin
                  de proposer une offre adaptée à vos besoins.
                </p>
                <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.65, margin: 0, maxWidth: 820 }}>
                  Veuillez remplir le formulaire ci-dessous pour recevoir une formation au sein des locaux de votre club et former
                  vos bénévoles !
                </p>
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
            )}

            {expandedTab === "eduPresentation" && expandedCategory === "EDUCATEUR" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
                  <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                    La filière de formation des éducateurs de la FFF s&apos;adapte à vos besoins en proposant deux parcours :
                    bénévole ou professionnel. Selon votre projet, si vous souhaitez perfectionner vos compétences
                    d&apos;éducateur(rice) sans en faire votre métier, choisissez le parcours bénévole. Plusieurs types de
                    formations existent, dont la durée peut varier de 8h à 161h permettant d&apos;encadrer différents publics
                    (enfants, jeunes et seniors) et toutes les pratiques comme le Futsal, Futnet, Beach soccer,
                    l&apos;Handi-foot …
                  </p>
                  <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                    En revanche, si vous souhaitez devenir éducateur(rice) ou entraîneur(e) et en faire votre métier,
                    choisissez le parcours professionnel en commençant par le Brevet de moniteur de football (BMF) ou le
                    Brevet d&apos;entraîneur de football (BEF) si vous justifiez des prérequis spécifiques. Le BMF est
                    accessible sous différentes formes, en apprentissage, par la formation continue.
                  </p>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr>
                        {["Formation", "Filière", "Durée", "Format", "CPF"].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: "left",
                              padding: "10px 12px",
                              background: colors.navy,
                              color: "#fff",
                              fontSize: 11,
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: 0.4,
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(byCategory.get("EDUCATEUR") ?? []).map((f, i) => (
                        <tr key={f.id} style={{ background: i % 2 === 0 ? "#fff" : "#f5f7fb" }}>
                          <td style={{ padding: "9px 12px", fontWeight: 600, color: colors.navy }}>{f.titre}</td>
                          <td style={{ padding: "9px 12px", color: colors.textMuted }}>{f.filiere ? FILIERE_LABELS[f.filiere] : "—"}</td>
                          <td style={{ padding: "9px 12px", color: colors.textMuted }}>{f.dureeLabel}</td>
                          <td style={{ padding: "9px 12px", color: colors.textMuted }}>{f.modeLabel}</td>
                          <td style={{ padding: "9px 12px", color: colors.textMuted }}>{f.cpfEligible ? "Éligible" : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {expandedTab === "eduPro" && expandedCategory === "EDUCATEUR" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 560 }}>
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
                  Formations professionnelles (BEF, BMF, FPC)
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {(equivalenceByGroup.get("PRO_TOP") ?? []).map((f) => (
                    <Hoverable
                      as={Link}
                      key={f.id}
                      href={`/formations/${f.slug}`}
                      style={{ ...nodeChipStyle(f), justifyContent: "center", textAlign: "center" }}
                      hoverStyle={{ opacity: 0.85 }}
                    >
                      <NodeBadge f={f} />
                      <span>{f.shortNode}</span>
                    </Hoverable>
                  ))}
                </div>

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

                {(equivalenceByGroup.get("PRO_BEF") ?? []).map((f) => (
                  <Hoverable
                    as={Link}
                    key={f.id}
                    href={`/formations/${f.slug}`}
                    style={{ ...nodeChipStyle(f), justifyContent: "center", textAlign: "center", fontSize: 13 }}
                    hoverStyle={{ opacity: 0.85 }}
                  >
                    <NodeBadge f={f} />
                    <span>{f.shortNode} — {f.titre}</span>
                  </Hoverable>
                ))}

                {(equivalenceByGroup.get("PRO_BMF") ?? []).map((f) => (
                  <Hoverable
                    as={Link}
                    key={f.id}
                    href={`/formations/${f.slug}`}
                    style={{ ...nodeChipStyle(f), justifyContent: "center", textAlign: "center", fontSize: 13 }}
                    hoverStyle={{ opacity: 0.85 }}
                  >
                    <NodeBadge f={f} />
                    <span>{f.shortNode} — {f.titre}</span>
                  </Hoverable>
                ))}

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

                {(equivalenceByGroup.get("PRO_BOTTOM") ?? []).map((f) => (
                  <Hoverable
                    as={Link}
                    key={f.id}
                    href={`/formations/${f.slug}`}
                    style={{ ...nodeChipStyle(f), justifyContent: "center", textAlign: "center", fontSize: 13, marginTop: 4 }}
                    hoverStyle={{ opacity: 0.85 }}
                  >
                    {f.shortNode} — {f.titre}
                  </Hoverable>
                ))}
              </div>
            )}

            {expandedTab === "eduBenevole" && expandedCategory === "EDUCATEUR" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 700 }}>
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
                  Formations bénévoles (AF, CFI, DF, Certifications)
                </div>
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
            )}

            {expandedTab === "eduEquivalences" && expandedCategory === "EDUCATEUR" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.65, margin: 0, maxWidth: 820 }}>
                  Certaines formations bénévoles permettent d&apos;obtenir des équivalences vers les diplômes fédéraux, sous
                  conditions.
                </p>
                <p style={{ color: colors.red, fontSize: 12, lineHeight: 1.6, margin: 0, fontWeight: 600, maxWidth: 820 }}>
                  Attention : seules les personnes titulaires du CFF2 certifié ou du CFF3 certifié peuvent s&apos;inscrire sur
                  les journées complémentaires pour obtenir les équivalences des Diplômes Fédéraux. Les personnes titulaires de
                  CFI (même certifiés) ne sont pas éligibles aux journées complémentaires.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

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

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "12px 20px 80px" }}>
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          <aside
            style={{
              flex: "0 0 220px",
              minWidth: 200,
              display: "flex",
              flexDirection: "column",
              gap: 22,
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: 10,
              padding: 22,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.8 }}>
                Catégorie
              </span>
              {SIDEBAR_CATEGORIES.map((cat) => (
                <label key={cat} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: colors.text, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={sidebarCategory === cat}
                    onChange={() => {
                      setSidebarCategory(cat)
                      setEduTrackFilter(null)
                    }}
                    style={{ accentColor: colors.navy, width: 15, height: 15, cursor: "pointer" }}
                  />
                  {CATEGORIE_LABELS[cat]}
                </label>
              ))}
            </div>
          </aside>

          <div style={{ flex: "1 1 600px", minWidth: 280 }}>
            {sidebarCategory === "EDUCATEUR" && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                <button
                  style={eduTrackFilter === "pro" ? chipActive : chipBase}
                  onClick={() => setEduTrackFilter((v) => (v === "pro" ? null : "pro"))}
                >
                  Formation professionnelle
                </button>
                <button
                  style={eduTrackFilter === "benevole" ? chipActive : chipBase}
                  onClick={() => setEduTrackFilter((v) => (v === "benevole" ? null : "benevole"))}
                >
                  Formation bénévole
                </button>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
              {formationsPageList.map((f) => (
                <Hoverable
                  as={Link}
                  href={`/formations/${f.slug}`}
                  key={f.id}
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
