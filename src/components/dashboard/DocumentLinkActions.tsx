import { colors } from "@/lib/theme"

const iconStyle = {
  width: 30,
  height: 30,
  borderRadius: 6,
  border: "1px solid #e2e5ea",
  color: colors.navy,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}

export function DocumentLinkActions({ viewUrl, downloadUrl }: { viewUrl: string | null; downloadUrl?: string | null }) {
  if (!viewUrl) return null

  return (
    <div style={{ display: "flex", gap: 6 }}>
      <a href={viewUrl} target="_blank" rel="noreferrer" title="Consulter" aria-label="Consulter" style={iconStyle}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </a>
      {downloadUrl && (
        <a href={downloadUrl} title="Télécharger" aria-label="Télécharger" style={iconStyle}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      )}
    </div>
  )
}
