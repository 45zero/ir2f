import { getOrganigramme } from "@/lib/organigramme"
import { colors, fontHeading } from "@/lib/theme"

export async function OrganigrammeAttachment() {
  const organigramme = await getOrganigramme()
  if (!organigramme) return null

  return (
    <section style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px 72px" }}>
      <a
        href={organigramme.url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "#ffffff",
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: "20px clamp(20px,3vw,28px)",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            background: "rgba(227,6,19,0.08)",
            color: colors.red,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: fontHeading, fontSize: 15, fontWeight: 800, color: colors.navy }}>
            Organigramme IR2F
          </span>
          <span style={{ fontSize: 13, color: colors.textMuted }}>Pièce jointe — PDF</span>
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 700,
            color: colors.navy,
            flexShrink: 0,
          }}
        >
          Télécharger
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </span>
      </a>
    </section>
  )
}
