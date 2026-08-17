"use client"

import { useState } from "react"
import { HoverLink } from "@/components/ui/HoverLink"
import { getYoutubeEmbedUrl, isVideoFileUrl } from "@/lib/youtube"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { EmploiDispositif } from "@/lib/emploi"

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

export function FinancementsTabs({ dispositifs }: { dispositifs: EmploiDispositif[] }) {
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

        {active.documents.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
            {active.documents.map((d) => (
              <HoverLink
                key={d.id}
                href={d.url}
                target="_blank"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#fff",
                  border: "1px solid #eef0f3",
                  borderRadius: 8,
                  padding: "12px 14px",
                  textDecoration: "none",
                  color: colors.text,
                  fontSize: 13,
                  fontWeight: 600,
                }}
                hoverStyle={{ boxShadow: "0 4px 14px rgba(20,33,61,0.1)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M12 3v12" />
                  <polyline points="7 10 12 15 17 10" />
                  <path d="M4 19h16" />
                </svg>
                {d.titre}
              </HoverLink>
            ))}
          </div>
        )}

        {active.videos.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {active.videos.map((v) => {
              const videoEmbed = getYoutubeEmbedUrl(v.url)
              return (
                <div key={v.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {videoEmbed ? (
                    <div style={{ aspectRatio: "16/9", borderRadius: 8, overflow: "hidden" }}>
                      <iframe
                        src={videoEmbed}
                        title={v.titre}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: "100%", height: "100%", border: "none" }}
                      />
                    </div>
                  ) : (
                    <HoverLink href={v.url} target="_blank" style={{ textDecoration: "none" }} hoverStyle={{ opacity: 0.9 }}>
                      <div
                        style={{
                          aspectRatio: "16/9",
                          borderRadius: 8,
                          overflow: "hidden",
                          background: "repeating-linear-gradient(135deg,#1a3a6b,#1a3a6b 12px,#16305a 12px,#16305a 24px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={colors.navy}>
                            <polygon points="6 4 20 12 6 20 6 4" />
                          </svg>
                        </div>
                      </div>
                    </HoverLink>
                  )}
                  <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{v.titre}</span>
                  {v.description && <span style={{ fontSize: 12, color: colors.textLight }}>{v.description}</span>}
                </div>
              )
            })}
          </div>
        )}

        {active.referents.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
              Référents
            </span>
            <div style={{ overflowX: "auto", border: "1px solid #eef0f3", borderRadius: 8 }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, fontFamily: fontBody }}>
                <thead>
                  <tr style={{ background: colors.navy }}>
                    <th style={{ ...thStyle }}>Département</th>
                    <th style={{ ...thStyle }}>Référent</th>
                    <th style={{ ...thStyle }}>Adresse mail</th>
                    <th style={{ ...thStyle }}>Code fiche</th>
                  </tr>
                </thead>
                <tbody>
                  {active.referents.map((r, i) => (
                    <tr key={r.id} style={{ background: i % 2 === 0 ? "#fff" : "#f7f9fc" }}>
                      <td style={tdStyle}>{r.departement}</td>
                      <td style={tdStyle}>{r.referent}</td>
                      <td style={tdStyle}>{r.email ?? "—"}</td>
                      <td style={tdStyle}>{r.codeFiche ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
