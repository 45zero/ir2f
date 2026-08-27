"use client"

import Link from "next/link"
import { Hoverable } from "@/components/ui/Hoverable"
import { colors } from "@/lib/theme"

const NAV_LINKS = [
  { href: "/formations", label: "Formations" },
  { href: "/emploi", label: "Emploi" },
  { href: "/financement", label: "Financement" },
  { href: "/documentation", label: "Documentation" },
  { href: "/contact", label: "Contact" },
]

const SOCIAL_LINKS = ["Facebook", "Instagram", "YouTube"]

const footerLinkStyle = {
  color: "rgba(255,255,255,0.75)",
  fontSize: 13,
  cursor: "pointer" as const,
  textDecoration: "none" as const,
}

export function Footer() {
  return (
    <footer style={{ background: "#14213d", padding: "56px clamp(20px,5vw,60px) 28px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28 }}>
            <img
              src="/images/logofff.png"
              alt="FFF"
              style={{ height: 84, width: "auto" }}
            />
            <img src="/images/logo-lgef.png" alt="Ligue Grand Est de Football" style={{ height: 64, width: "auto" }} />
            <div
              style={{
                background: "#ffffff",
                borderRadius: 6,
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src="/images/qualiopi.png" alt="Certification Qualiopi" style={{ height: 40, width: "auto" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span
                style={{
                  color: colors.gold,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Navigation
              </span>
              {NAV_LINKS.map((link, i) => (
                <Hoverable
                  as={Link}
                  key={`${link.href}-${i}`}
                  href={link.href}
                  style={footerLinkStyle}
                  hoverStyle={{ color: "#ffffff" }}
                >
                  {link.label}
                </Hoverable>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span
                style={{
                  color: colors.gold,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Suivez-nous
              </span>
              {SOCIAL_LINKS.map((label) => (
                <Hoverable
                  as="a"
                  key={label}
                  style={{ ...footerLinkStyle, display: "flex", alignItems: "center", gap: 8 }}
                  hoverStyle={{ color: "#ffffff" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                  {label}
                </Hoverable>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
            © 2026 IR2F — Institut Régional de Formation Football · Ligue Grand Est FFF
          </span>
        </div>
      </div>
    </footer>
  )
}
