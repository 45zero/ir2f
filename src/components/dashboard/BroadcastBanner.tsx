"use client"

import Link from "next/link"
import { markMessageAsRead } from "@/lib/actions/messages"
import { colors } from "@/lib/theme"

export type BroadcastBannerItem = {
  messageId: string
  title: string
  text: string
  isDocument: boolean
}

export function BroadcastBanner({ items }: { items: BroadcastBannerItem[] }) {
  if (items.length === 0) return null

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((b) => (
        <Link
          key={b.messageId}
          href="/dashboard/formations"
          onClick={() => markMessageAsRead(b.messageId)}
          style={{
            cursor: "pointer",
            background: "#fffaf0",
            border: `1.5px solid ${colors.gold}`,
            borderRadius: 12,
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            textDecoration: "none",
          }}
        >
          <div style={{ width: 38, height: 38, borderRadius: 10, background: colors.gold, color: colors.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {b.isDocument ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: colors.text }}>{b.title}</span>
            <span style={{ fontSize: 12.5, color: colors.textLight }}>{b.text}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      ))}
    </div>
  )
}
