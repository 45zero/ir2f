"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { colors } from "@/lib/theme"

const ITEMS = [
  { href: "/admin/accueil", label: "Page d'accueil", enabled: true },
  { href: "/admin/pages-hero", label: "Bandeaux (Hero)", enabled: true },
  { href: "/admin/formations", label: "Formations", enabled: true },
  { href: "/admin/formations-page", label: "Page « Nos Formations »", enabled: true },
  { href: "/admin/inscriptions", label: "Inscriptions", enabled: true },
  { href: "/admin/demandes-contact", label: "Demandes de contact", enabled: true },
  { href: "/admin/users", label: "Utilisateurs", enabled: true },
  { href: "/admin/emploi", label: "Emploi", enabled: true },
  { href: "/admin/articles", label: "Actualités", enabled: true },
]

export function AdminSideNav() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        flex: "0 0 220px",
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: 14,
        alignSelf: "flex-start",
      }}
    >
      {ITEMS.map((item) => {
        const active = pathname.startsWith(item.href)
        if (!item.enabled) {
          return (
            <span
              key={item.href}
              style={{
                padding: "10px 14px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "#b7bfcc",
                cursor: "default",
              }}
            >
              {item.label} <span style={{ fontSize: 10, fontWeight: 700 }}>· bientôt</span>
            </span>
          )
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              color: active ? "#fff" : colors.navy,
              background: active ? colors.navy : "transparent",
            }}
          >
            {item.label}
          </Link>
        )
      })}
    </aside>
  )
}
