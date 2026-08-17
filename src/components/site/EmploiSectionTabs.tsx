"use client"

import { useState, type ReactNode } from "react"
import { colors, fontHeading } from "@/lib/theme"
import type { SectionEmploi } from "@/generated/prisma"

export type EmploiSectionTab = {
  key: SectionEmploi
  label: string
  icon: ReactNode
  content: ReactNode
}

export function EmploiSectionTabs({ tabs }: { tabs: EmploiSectionTab[] }) {
  const [active, setActive] = useState<SectionEmploi | undefined>(tabs[0]?.key)
  const current = tabs.find((t) => t.key === active) ?? tabs[0]

  if (!current) return null

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
        {tabs.map((t) => {
          const isActive = t.key === current.key
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: isActive ? colors.red : colors.navy,
                border: "none",
                borderRadius: 8,
                padding: 20,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {t.icon}
              <span style={{ fontFamily: fontHeading, color: "#fff", fontSize: 16, fontWeight: 700 }}>{t.label}</span>
            </button>
          )
        })}
      </div>

      <div>{current.content}</div>
    </div>
  )
}
