"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Hoverable } from "@/components/ui/Hoverable"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { FormationCard } from "@/lib/formations-shared"

const FILTERS = [
  { value: "all", label: "Tout" },
  { value: "EDUCATEUR", label: "Éducateur" },
  { value: "ARBITRAGE", label: "Arbitrage" },
  { value: "TERRAIN", label: "Tout Terrain" },
  { value: "CLUB", label: "Club" },
  { value: "DEV", label: "Chargé de développement" },
]

export function HomeSearch({ formations }: { formations: FormationCard[] }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = useMemo(() => {
    return formations.filter((f) => {
      const matchCat = filter === "all" || f.categorie === filter
      const matchSearch = !query || f.titre.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchSearch
    })
  }, [formations, filter, query])

  const showResults = query.length > 0 || filter !== "all"

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 4 }}>
        <div
          style={{
            flex: "1 1 380px",
            minWidth: 260,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#f5f7fb",
            border: "1.5px solid #e4e9f2",
            borderRadius: 26,
            padding: "5px 5px 5px 18px",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une formation..."
            style={{
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: fontBody,
              flex: 1,
              color: colors.text,
              background: "transparent",
            }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              background: colors.navy,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: "pointer",
              padding: "9px 14px",
              borderRadius: 24,
              flexShrink: 0,
            }}
          >
            {FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <Hoverable
          as={Link}
          href="/formations"
          style={{
            background: colors.red,
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: 26,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
          hoverStyle={{ background: colors.redDark }}
        >
          Explorer nos formations
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Hoverable>
      </div>

      {showResults && (
        <div
          style={{
            borderTop: "1px solid #eef0f3",
            paddingTop: 16,
            marginTop: 4,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20,
          }}
        >
          {filtered.map((f) => (
            <Hoverable
              as={Link}
              href={`/formations/${f.slug}`}
              key={f.id}
              style={{
                cursor: "pointer",
                borderRadius: 10,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 2px 10px rgba(20,33,61,0.08)",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                transition: "box-shadow 0.15s",
              }}
              hoverStyle={{ boxShadow: "0 10px 26px rgba(20,33,61,0.16)" }}
            >
              <div
                style={{
                  height: 120,
                  backgroundImage: f.image ? `url('${f.image}')` : undefined,
                  backgroundColor: f.image ? undefined : "#1a3a6b",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "rgba(255,255,255,0.9)",
                    color: colors.navy,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 9px",
                    borderRadius: 3,
                    letterSpacing: 0.4,
                  }}
                >
                  {f.categorieLabel}
                </span>
              </div>
              <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.navy, lineHeight: 1.3, fontFamily: fontHeading }}>
                  {f.titre}
                </span>
                <span style={{ fontSize: 12, color: colors.textLight }}>{f.dureeLabel}</span>
              </div>
              <div
                style={{
                  background: f.cpfEligible ? colors.gold : colors.navy,
                  padding: "9px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {f.cpfEligible && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: 0.3 }}>
                  {f.footerLabel}
                </span>
              </div>
            </Hoverable>
          ))}
          {filtered.length === 0 && (
            <span style={{ color: colors.textLight, fontSize: 14, padding: "8px 0" }}>
              Aucune formation ne correspond à votre recherche.
            </span>
          )}
        </div>
      )}
    </div>
  )
}
