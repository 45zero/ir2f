"use client"

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
  cursor: "pointer",
}

export function ConventionShareActions({
  viewUrl,
  downloadUrl,
  nomPrenom,
}: {
  viewUrl: string | null
  downloadUrl: string | null
  nomPrenom: string
}) {
  if (!viewUrl) return null

  const subject = encodeURIComponent(`Convention de stage — ${nomPrenom}`)
  const mailBody = encodeURIComponent(`Bonjour,\n\nVoici le lien de la convention de stage de ${nomPrenom} :\n${viewUrl}`)
  const waMessage = encodeURIComponent(`Convention de stage de ${nomPrenom} : ${viewUrl}`)

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
      <a href={`mailto:?subject=${subject}&body=${mailBody}`} title="Partager par email" aria-label="Partager par email" style={iconStyle}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 6 10 7 10-7" />
        </svg>
      </a>
      <a
        href={`https://wa.me/?text=${waMessage}`}
        target="_blank"
        rel="noreferrer"
        title="Partager par WhatsApp"
        aria-label="Partager par WhatsApp"
        style={iconStyle}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 20l1-5.5A8.5 8.5 0 1 1 21 11.5z" />
          <path d="M8.5 10.5c0 3 2.5 5.5 5.5 5.5" strokeLinecap="round" />
        </svg>
      </a>
    </div>
  )
}
