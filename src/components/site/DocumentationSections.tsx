import { colors, fontHeading } from "@/lib/theme"

type DocEntry = {
  id: string
  titre: string
  description: string | null
  url: string
  format: "PDF" | "DOCX"
}

type DocGroup = {
  id: string
  titre: string
  documents: DocEntry[]
}

function docUrl(filename: string) {
  return `/documentation/${encodeURIComponent(filename)}`
}

function FileIcon({ format }: { format: "PDF" | "DOCX" }) {
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 8,
        background: format === "PDF" ? "rgba(227,6,19,0.08)" : "rgba(26,58,107,0.08)",
        color: format === "PDF" ? colors.red : colors.navy,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    </div>
  )
}

function DocumentCard({ doc }: { doc: DocEntry }) {
  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        background: "#ffffff",
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: 20,
        textDecoration: "none",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      className="doc-card"
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <FileIcon format={doc.format} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: colors.text, lineHeight: 1.3 }}>{doc.titre}</span>
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.6,
              color: colors.textLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
              padding: "1px 6px",
            }}
          >
            {doc.format}
          </span>
        </div>
      </div>
      {doc.description && (
        <p style={{ fontSize: 13, lineHeight: 1.55, color: colors.textMuted, margin: 0, flex: 1 }}>{doc.description}</p>
      )}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          fontWeight: 700,
          color: colors.navy,
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
  )
}

export function DocumentationSections({ groupes }: { groupes: DocGroup[] }) {
  return (
    <section style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 20px 80px", display: "flex", flexDirection: "column", gap: 56 }}>
      <style>{`
        .doc-card:hover { border-color: ${colors.navy}; box-shadow: 0 8px 20px rgba(26,58,107,0.1); }
      `}</style>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 28,
          background: "linear-gradient(135deg, #14213d 0%, #1a3a6b 100%)",
          borderRadius: 16,
          padding: "32px clamp(20px,4vw,40px)",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: 10,
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <img src="/images/qualiopi.png" alt="Certification Qualiopi" style={{ height: 56, width: "auto" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 240 }}>
          <span style={{ color: colors.gold, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
            Certification qualité
          </span>
          <h2 style={{ fontFamily: fontHeading, fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 800, color: "#ffffff", margin: 0 }}>
            IR2F est certifié Qualiopi
          </h2>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", margin: 0, maxWidth: 620 }}>
            La certification qualité a été délivrée au titre de la catégorie d&apos;action de formation. Elle atteste de la
            qualité de nos process pédagogiques et administratifs.
          </p>
        </div>
        <a
          href={docUrl("Certificat Qualiopi.pdf")}
          target="_blank"
          rel="noreferrer"
          style={{
            background: colors.red,
            color: "#ffffff",
            fontSize: 13.5,
            fontWeight: 700,
            padding: "12px 22px",
            borderRadius: 6,
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Voir le certificat
        </a>
      </div>

      {groupes.map((group) => (
        <div key={group.id} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <h2
            style={{
              fontFamily: fontHeading,
              fontSize: "clamp(19px,2.2vw,24px)",
              fontWeight: 800,
              color: colors.text,
              margin: 0,
              paddingBottom: 10,
              borderBottom: `2px solid ${colors.border}`,
            }}
          >
            {group.titre}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
            {group.documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
