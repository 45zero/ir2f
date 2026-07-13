"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Hoverable } from "@/components/ui/Hoverable"
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

export function Header({ user }: { user: HeaderUser }) {
  const pathname = usePathname()

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
        boxShadow: "0 1px 0 rgba(26,58,107,0.1)",
        background: colors.navy,
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
          <Hoverable
            as={Link}
            href="/dashboard"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: 0.2,
            }}
            hoverStyle={{ color: colors.red }}
          >
            {user.name}
          </Hoverable>
        ) : (
          <Hoverable
            as={Link}
            href="/login"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: 0.2,
            }}
            hoverStyle={{ color: colors.red }}
          >
            Connexion
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
