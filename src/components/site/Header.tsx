"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Hoverable } from "@/components/ui/Hoverable"
import { logout } from "@/lib/actions/auth"
import { colors, fontBody } from "@/lib/theme"

export type HeaderUser = {
  name: string
  role: string
} | null

const NAV_LINKS = [
  { href: "/formations", label: "Formations" },
  { href: "/emploi", label: "Financement" },
  { href: "/emploi", label: "Documentation" },
  { href: "/contact", label: "Contact" },
]

const HERO_PATHS = new Set(["/", "/formations", "/contact", "/emploi", "/actualites"])

const ROLE_LABELS: Record<string, string> = {
  STAGIAIRE: "Stagiaire",
  FORMATEUR: "Formateur",
  ADMIN: "Administration",
  DIRECTION: "Direction",
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function Header({ user }: { user: HeaderUser }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const hasHero = HERO_PATHS.has(pathname)

  useEffect(() => {
    if (!hasHero) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [hasHero])

  const overlay = hasHero && !scrolled

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px,4vw,40px)",
        zIndex: 1000,
        boxShadow: overlay ? "none" : "0 1px 0 rgba(26,58,107,0.1)",
        background: overlay ? "transparent" : colors.navy,
        transition: "background-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
      >
        <img
          src="/images/logo-ir2f.png"
          alt="IR2F"
          style={{ height: 52, width: "auto", display: "block" }}
        />
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2vw,32px)" }}>
        {NAV_LINKS.map((link, i) => (
          <Hoverable
            as={Link}
            key={`${link.href}-${i}`}
            href={link.href}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: pathname.startsWith(link.href) && link.href !== "/emploi" ? colors.red : "#ffffff",
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: 0.2,
            }}
            hoverStyle={{ color: colors.red }}
          >
            {link.label}
          </Hoverable>
        ))}

        {user ? (
          <div style={{ position: "relative" }}>
            <Hoverable
              as="button"
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1.5px solid rgba(255,255,255,0.5)",
                padding: "7px 12px 7px 8px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: fontBody,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              hoverStyle={{ borderColor: "#ffffff" }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: colors.gold,
                  color: colors.navy,
                  fontSize: 10,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {initialsOf(user.name)}
              </span>
              {user.name}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Hoverable>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "#ffffff",
                  borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(20,33,61,0.18)",
                  padding: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minWidth: 190,
                  zIndex: 1100,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: colors.gold,
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                    padding: "6px 12px 4px",
                  }}
                >
                  {ROLE_LABELS[user.role] ?? user.role}
                </span>
                <Hoverable
                  as={Link}
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 6,
                    color: colors.text,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: fontBody,
                    cursor: "pointer",
                    textAlign: "left",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                  hoverStyle={{ background: "#f5f7fb" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  Mon espace
                </Hoverable>
                <form action={logout}>
                  <Hoverable
                    as="button"
                    type="submit"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 6,
                      border: "none",
                      background: "transparent",
                      color: colors.text,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: fontBody,
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                    }}
                    hoverStyle={{ background: "#f5f7fb" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Déconnexion
                  </Hoverable>
                </form>
              </div>
            )}
          </div>
        ) : (
          <Hoverable
            as={Link}
            href="/login"
            aria-label="Connexion"
            style={{
              background: "transparent",
              color: "#ffffff",
              border: "1.5px solid rgba(255,255,255,0.5)",
              padding: "9px 14px",
              borderRadius: 20,
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            hoverStyle={{ borderColor: "#ffffff" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Hoverable>
        )}

        <Hoverable
          as={Link}
          href="/formations"
          style={{
            background: colors.red,
            color: "#ffffff",
            border: "none",
            padding: "11px 22px",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: "pointer",
            letterSpacing: 0.2,
            textDecoration: "none",
            display: "inline-block",
          }}
          hoverStyle={{ background: colors.redDark }}
        >
          Accès Formation
        </Hoverable>
      </nav>
    </header>
  )
}
