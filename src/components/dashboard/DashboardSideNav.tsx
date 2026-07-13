"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { colors, fontBody } from "@/lib/theme"

type Item = { href: string; label: string; exact: boolean; icon: React.ReactNode; badge?: boolean }

const DASHBOARD_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
)
const FORMATIONS_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
const DOCUMENTS_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)
const MESSAGES_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const COVOITURAGE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17l1.5-6.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 17M7 9V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
  </svg>
)

const STAGIAIRE_ITEMS: Item[] = [
  { href: "/dashboard", label: "Tableau de bord", exact: true, icon: DASHBOARD_ICON },
  { href: "/dashboard/formations", label: "Formations", exact: false, icon: FORMATIONS_ICON },
  { href: "/dashboard/documents", label: "Documents", exact: false, icon: DOCUMENTS_ICON },
  { href: "/dashboard/messages", label: "Messagerie", exact: false, icon: MESSAGES_ICON },
  { href: "/dashboard/covoiturage", label: "Covoiturage", exact: false, icon: COVOITURAGE_ICON },
]

function formateurItems(alertsCount: number): Item[] {
  return [
    { href: "/dashboard", label: "Tableau de bord", exact: true, icon: DASHBOARD_ICON },
    { href: "/dashboard/formations", label: "Formations", exact: false, icon: FORMATIONS_ICON },
    { href: "/dashboard/messages", label: "Messagerie", exact: false, icon: MESSAGES_ICON, badge: alertsCount > 0 },
  ]
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

export function DashboardSideNav({
  role,
  name,
  formateurAlertsCount = 0,
}: {
  role: string
  name: string
  formateurAlertsCount?: number
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [expanded, setExpanded] = useState(true)

  const items = role === "FORMATEUR" ? formateurItems(formateurAlertsCount) : STAGIAIRE_ITEMS
  const avatarBg = role === "FORMATEUR" ? "linear-gradient(135deg,#e30613,#c00510)" : "linear-gradient(135deg,#1a3a6b,#2a5090)"
  const roleLabel = role === "FORMATEUR" ? "Formateur" : role === "STAGIAIRE" ? "Stagiaire" : role
  const roleLabelColor = role === "FORMATEUR" ? colors.red : colors.gold

  return (
    <aside
      style={{
        flex: expanded ? "0 0 220px" : "0 0 68px",
        minWidth: expanded ? 200 : 68,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: 14,
        alignSelf: "flex-start",
        transition: "flex-basis 0.15s, min-width 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: expanded ? "flex-start" : "center", gap: 10, padding: "2px 4px 12px" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: avatarBg,
            color: "#fff",
            fontSize: 13,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {initialsOf(name)}
        </div>
        {expanded && (
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {name}
            </span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: roleLabelColor, letterSpacing: 0.6, textTransform: "uppercase" }}>
              {roleLabel}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? "Réduire le menu" : "Ouvrir le menu"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: 9,
          borderRadius: 8,
          border: "1px solid #eef0f3",
          background: "#fff",
          color: "#8a93a3",
          cursor: "pointer",
          marginBottom: 4,
          fontFamily: fontBody,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ transform: expanded ? "none" : "rotate(180deg)" }}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {expanded && <span style={{ fontSize: 12, fontWeight: 600 }}>Réduire</span>}
      </button>

      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: expanded ? "10px 14px" : "10px",
              justifyContent: expanded ? "flex-start" : "center",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              color: active ? "#fff" : colors.navy,
              background: active ? colors.navy : "transparent",
            }}
          >
            {item.icon}
            {expanded && <span>{item.label}</span>}
            {item.badge && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: active ? "#fff" : colors.red,
                  marginLeft: expanded ? "auto" : 0,
                  flexShrink: 0,
                }}
              />
            )}
          </Link>
        )
      })}

      <div style={{ height: 1, background: "#eef0f3", margin: "10px 0" }} />

      <button
        onClick={() => router.push("/")}
        title="Retour au site"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: expanded ? "10px 14px" : "10px",
          justifyContent: expanded ? "flex-start" : "center",
          borderRadius: 8,
          border: "none",
          background: "transparent",
          color: "#8a93a3",
          fontSize: 13,
          fontWeight: 600,
          fontFamily: fontBody,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
          <path d="M9 21V12H15V21" />
          <path d="M3 10L12 3L21 10V20A1 1 0 0 1 20 21H4A1 1 0 0 1 3 20Z" />
        </svg>
        {expanded && <span>Retour au site</span>}
      </button>

      {role === "ADMIN" && (
        <>
          <div style={{ height: 1, background: "#eef0f3", margin: "8px 0" }} />
          <Link
            href="/admin"
            title="Interface admin"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: expanded ? "10px 14px" : "10px",
              justifyContent: expanded ? "flex-start" : "center",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              color: colors.red,
            }}
          >
            {expanded ? "Interface admin" : "A"}
          </Link>
        </>
      )}
    </aside>
  )
}
