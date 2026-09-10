import { HoverLink } from "@/components/ui/HoverLink"
import { EmploiRecontacterButton } from "@/components/site/EmploiRecontacterButton"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { AccueilContenuData } from "@/lib/home"

/**
 * `showButton2`/`button1AsPopup` sont utilisés uniquement par /emploi : le bouton 2 ("En savoir
 * plus") n'y a pas de destination pertinente et le bouton 1 pointe par défaut vers l'ancre
 * "#contact" qui n'existe que sur l'accueil, jamais sur /emploi. L'accueil garde le comportement
 * par défaut (deux boutons, liens normaux) — ce composant/contenu étant partagé entre les deux
 * pages, ne pas changer les valeurs par défaut ici affecterait l'accueil aussi.
 */
export function BandeauEmploiCta({
  contenu,
  showButton2 = true,
  button1AsPopup = false,
}: {
  contenu: AccueilContenuData
  showButton2?: boolean
  button1AsPopup?: boolean
}) {
  if (!contenu.bandeauEmploiActif) return null

  return (
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
          {button1AsPopup ? (
            <EmploiRecontacterButton
              label={contenu.bandeauBouton1Label}
              buttonStyle={{
                background: colors.red,
                color: "#fff",
                border: "none",
                padding: "12px 22px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: fontBody,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            />
          ) : (
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
          )}
          {showButton2 && (
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
          )}
        </div>
      </div>
    </section>
  )
}
