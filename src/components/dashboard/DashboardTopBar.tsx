"use client"

import Link from "next/link"
import { Hoverable } from "@/components/ui/Hoverable"
import { logout } from "@/lib/actions/auth"
import { colors, fontBody } from "@/lib/theme"
import { ROLE_LABELS } from "@/lib/users-shared"
import type { Role } from "@/generated/prisma"

export function DashboardTopBar({ user }: { user: { name: string; role: string } }) {
  return (
    <header
      style={{
        background: colors.navy,
        padding: "0 clamp(16px,4vw,40px)",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        <img src="/images/logo-ir2f.png" alt="IR2F" style={{ height: 44, width: "auto" }} />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{user.name}</span>
          <span
            style={{
              color: colors.gold,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            {ROLE_LABELS[user.role as Role] ?? user.role}
          </span>
        </div>
        <form action={logout}>
          <Hoverable
            as="button"
            type="submit"
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "8px 16px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: fontBody,
              cursor: "pointer",
            }}
            hoverStyle={{ background: "rgba(255,255,255,0.1)" }}
          >
            Déconnexion
          </Hoverable>
        </form>
      </div>
    </header>
  )
}
