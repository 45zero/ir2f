"use client"

import { useState } from "react"
import { colors } from "@/lib/theme"

export type StatsChartPoint = { date: string; vues: number; visites: number }

function formatDate(key: string, unit: "day" | "month", long = false): string {
  const [y, m, d] = key.split("-").map(Number)
  const date = new Date(Date.UTC(y, m - 1, d ?? 1, 12))
  if (unit === "month") {
    return date.toLocaleDateString("fr-FR", { month: long ? "long" : "short", year: long ? "numeric" : "2-digit", timeZone: "UTC" })
  }
  return date.toLocaleDateString("fr-FR", long
    ? { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }
    : { day: "numeric", month: "short", timeZone: "UTC" })
}

// Histogramme des pages vues (une seule série, donc pas de légende).
export function StatsBarChart({ points, unit }: { points: StatsChartPoint[]; unit: "day" | "month" }) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 760
  const H = 220
  const padL = 36
  const padB = 24
  const padT = 10
  const plotW = W - padL - 8
  const plotH = H - padB - padT
  const max = Math.max(1, ...points.map((p) => p.vues))
  const niceMax = (() => {
    const pow = 10 ** Math.floor(Math.log10(max))
    return Math.ceil(max / pow) * pow
  })()
  const slot = plotW / Math.max(1, points.length)
  const barW = Math.max(2, Math.min(28, slot - 2))
  const ticks = [0, niceMax / 2, niceMax]
  const labelEvery = Math.ceil(points.length / 8)
  const h = hover !== null ? points[hover] : null

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img"
        aria-label="Pages vues par période" onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => {
          const y = padT + plotH - (t / niceMax) * plotH
          return (
            <g key={t}>
              <line x1={padL} x2={W - 8} y1={y} y2={y} stroke="#eef0f3" strokeWidth={1} />
              <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={10} fill={colors.textLight}>
                {Math.round(t)}
              </text>
            </g>
          )
        })}
        {points.map((p, i) => {
          const x = padL + i * slot + (slot - barW) / 2
          const bh = (p.vues / niceMax) * plotH
          const y = padT + plotH - bh
          const r = Math.min(4, barW / 2, bh)
          return (
            <g key={p.date} onMouseEnter={() => setHover(i)}>
              <rect x={padL + i * slot} y={padT} width={slot} height={plotH} fill="transparent" />
              {bh > 0 && (
                <path
                  d={`M${x},${padT + plotH} V${y + r} Q${x},${y} ${x + r},${y} H${x + barW - r} Q${x + barW},${y} ${x + barW},${y + r} V${padT + plotH} Z`}
                  fill={colors.navy}
                  opacity={hover === null || hover === i ? 1 : 0.45}
                />
              )}
              {i % labelEvery === 0 && (
                <text x={padL + i * slot + slot / 2} y={H - 6} textAnchor="middle" fontSize={10} fill={colors.textLight}>
                  {formatDate(p.date, unit)}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      {h && hover !== null && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${Math.min(80, Math.max(5, ((padL + hover * slot + slot / 2) / W) * 100))}%`,
            transform: "translateX(-50%)",
            background: "#fff",
            border: "1px solid #e2e6ec",
            borderRadius: 8,
            boxShadow: "0 4px 14px rgba(20,33,61,.12)",
            padding: "8px 12px",
            fontSize: 12,
            color: colors.text,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 4, textTransform: "capitalize" }}>{formatDate(h.date, unit, true)}</div>
          <div>{h.vues} page{h.vues > 1 ? "s" : ""} vue{h.vues > 1 ? "s" : ""}</div>
          <div style={{ color: colors.textMuted }}>{h.visites} visiteur{h.visites > 1 ? "s" : ""}</div>
        </div>
      )}
    </div>
  )
}
