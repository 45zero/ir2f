import { getOrganigramme } from "@/lib/organigramme"
import { colors, fontHeading } from "@/lib/theme"

export async function OrganigrammeAttachment() {
  const organigramme = await getOrganigramme()
  if (!organigramme) return null

  return (
    <section style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px 72px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ fontFamily: fontHeading, fontSize: "clamp(19px,2.2vw,24px)", fontWeight: 800, color: colors.text, margin: 0 }}>
          Organigramme IR2F
        </h2>
        <a
          href={organigramme.downloadUrl}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 700,
            color: colors.navy,
            textDecoration: "none",
          }}
        >
          Télécharger le PDF
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      </div>

      <div
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          overflow: "hidden",
          background: "#f5f7fb",
        }}
      >
        <object data={organigramme.viewUrl} type="application/pdf" width="100%" height={720} style={{ display: "block", border: "none" }}>
          <div style={{ padding: 24, textAlign: "center", fontSize: 13.5, color: colors.textMuted }}>
            L&apos;aperçu du PDF n&apos;est pas disponible sur cet appareil.{" "}
            <a href={organigramme.downloadUrl} style={{ color: colors.navy, fontWeight: 700 }}>
              Télécharger l&apos;organigramme
            </a>
            .
          </div>
        </object>
      </div>
    </section>
  )
}
