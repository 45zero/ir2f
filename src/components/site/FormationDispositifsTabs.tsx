"use client"

import { useState } from "react"
import { HoverLink } from "@/components/ui/HoverLink"
import { getYoutubeEmbedUrl, isVideoFileUrl } from "@/lib/youtube"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { DispositifFormationData } from "@/lib/financement"

const tabBase = {
  border: "1.5px solid #d8dde5",
  background: "#fff",
  color: colors.navy,
  padding: "9px 16px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer" as const,
  whiteSpace: "nowrap" as const,
}

const tabActive = { ...tabBase, border: "none", background: colors.navy, color: "#fff" }

export function FormationDispositifsTabs({ dispositifs }: { dispositifs: DispositifFormationData[] }) {
  const [activeId, setActiveId] = useState<string | undefined>(dispositifs[0]?.id)
  const active = dispositifs.find((d) => d.id === activeId) ?? dispositifs[0]

  if (!active) return null

  const embedUrl = active.videoUrl ? getYoutubeEmbedUrl(active.videoUrl) : null
  const videoIsFile = active.videoUrl ? isVideoFileUrl(active.videoUrl) : false

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {dispositifs.map((d) => (
          <button key={d.id} style={d.id === active.id ? tabActive : tabBase} onClick={() => setActiveId(d.id)}>
            {d.titre}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {active.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.image} alt={active.titre} style={{ height: 48, width: "auto" }} />
          )}
          {active.montantMisEnAvant && (
            <span
              style={{
                background: "#fff7e6",
                border: `1px solid ${colors.gold}`,
                color: colors.navy,
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {active.montantMisEnAvant}
            </span>
          )}
        </div>

        {active.resume && (
          <p style={{ fontSize: 15, fontWeight: 700, color: colors.navy, margin: 0, lineHeight: 1.5 }}>{active.resume}</p>
        )}

        {(embedUrl || videoIsFile) && (
          <div style={{ aspectRatio: "16/9", maxWidth: 640, borderRadius: 8, overflow: "hidden" }}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={active.titre}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <video controls preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}>
                <source src={active.videoUrl!} />
              </video>
            )}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {active.contenu
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean)
            .map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: colors.text, whiteSpace: "pre-line" }}>
                {p}
              </p>
            ))}
        </div>

        {active.tableaux.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {active.tableaux.map((t) => (
              <div key={t.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {t.titre && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
                    {t.titre}
                  </span>
                )}
                <div style={{ overflowX: "auto", border: "1px solid #eef0f3", borderRadius: 8 }}>
                  <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, fontFamily: fontBody }}>
                    <thead>
                      <tr style={{ background: colors.navy }}>
                        {t.entetes.map((h, i) => (
                          <th key={i} style={thStyle}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.lignes.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f7f9fc" }}>
                          {row.map((cell, j) => (
                            <td key={j} style={tdStyle}>
                              {cell || "—"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {active.liens.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {active.liens.map((l) => (
              <HoverLink
                key={l.id}
                href={l.url}
                target="_blank"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  background: colors.navy,
                  color: "#fff",
                  borderRadius: 6,
                  padding: "14px 20px",
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: 0.3,
                }}
                hoverStyle={{ background: colors.navyDark }}
              >
                {l.label}
              </HoverLink>
            ))}
          </div>
        )}

        {active.contacts.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
              Contacts
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
              {active.contacts.map((c) => (
                <div key={c.id} style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 14 }}>
                  {c.zone && (
                    <div style={{ fontSize: 11, fontWeight: 700, color: colors.gold, textTransform: "uppercase", marginBottom: 4 }}>
                      {c.zone}
                    </div>
                  )}
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{c.nom}</div>
                  {c.telephone && <div style={{ fontSize: 12, color: colors.textLight }}>{c.telephone}</div>}
                  {c.email && <div style={{ fontSize: 12, color: colors.textLight }}>{c.email}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const thStyle = {
  textAlign: "left" as const,
  color: "#fff",
  fontWeight: 700,
  fontSize: 12,
  padding: "10px 14px",
  fontFamily: fontHeading,
}

const tdStyle = {
  padding: "9px 14px",
  color: colors.text,
  borderTop: "1px solid #eef0f3",
}
