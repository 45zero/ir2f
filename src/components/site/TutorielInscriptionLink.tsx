"use client"

import { useEffect, useState } from "react"
import { getYoutubeEmbedUrl } from "@/lib/youtube"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { TutorielInscriptionMode } from "@/generated/prisma"

export type SiteTutorielInscription = {
  mode: TutorielInscriptionMode
  lienUrl: string | null
  pdfUrl: string | null
  youtubeUrl: string | null
  videoFichierUrl: string | null
}

const linkStyle = {
  fontFamily: fontBody,
  fontSize: 11.5,
  color: colors.textLight,
  textDecoration: "underline",
  textUnderlineOffset: 3,
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
}

export function TutorielInscriptionLink({
  label,
  tutoriel,
}: {
  label: string
  tutoriel: SiteTutorielInscription | null | undefined
}) {
  const [open, setOpen] = useState(false)

  if (!tutoriel) return null
  const hasContent =
    (tutoriel.mode === "LIEN" && tutoriel.lienUrl) ||
    (tutoriel.mode === "PDF" && tutoriel.pdfUrl) ||
    (tutoriel.mode === "VIDEO" && (tutoriel.youtubeUrl || tutoriel.videoFichierUrl))
  if (!hasContent) return null

  if (tutoriel.mode === "LIEN") {
    return (
      <a href={tutoriel.lienUrl!} target="_blank" rel="noreferrer" style={linkStyle}>
        {label}
      </a>
    )
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={linkStyle}>
        {label}
      </button>
      {open && <TutorielModal label={label} tutoriel={tutoriel} onClose={() => setOpen(false)} />}
    </>
  )
}

function TutorielModal({
  label,
  tutoriel,
  onClose,
}: {
  label: string
  tutoriel: SiteTutorielInscription
  onClose: () => void
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  const embedUrl = tutoriel.youtubeUrl ? getYoutubeEmbedUrl(tutoriel.youtubeUrl) : null

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,33,61,0.65)",
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "100%",
          maxWidth: 640,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "clamp(20px,4vw,28px)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          animation: "ir2fFadeIn 0.25s ease",
          boxShadow: "0 20px 60px rgba(10,22,46,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 18, fontWeight: 800, margin: 0 }}>
            {label}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "none",
              background: "#f5f7fb",
              color: colors.navy,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {tutoriel.mode === "PDF" && tutoriel.pdfUrl && (
          <>
            <iframe
              src={tutoriel.pdfUrl}
              title={label}
              style={{ width: "100%", height: "65vh", border: "1px solid #eef0f3", borderRadius: 8 }}
            />
            <a href={tutoriel.pdfUrl} download style={downloadButtonStyle}>
              Télécharger le PDF
            </a>
          </>
        )}

        {tutoriel.mode === "VIDEO" && (
          <>
            {tutoriel.videoFichierUrl ? (
              <video
                src={tutoriel.videoFichierUrl}
                controls
                style={{ width: "100%", borderRadius: 8, background: "#000" }}
              />
            ) : embedUrl ? (
              <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 8, overflow: "hidden" }}>
                <iframe
                  src={embedUrl}
                  title={label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            ) : null}
            {tutoriel.videoFichierUrl && (
              <a href={tutoriel.videoFichierUrl} download style={downloadButtonStyle}>
                Télécharger la vidéo
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const downloadButtonStyle = {
  alignSelf: "flex-start" as const,
  background: colors.navy,
  color: "#fff",
  textDecoration: "none",
  padding: "9px 18px",
  borderRadius: 4,
  fontSize: 12.5,
  fontWeight: 700,
  fontFamily: fontBody,
}
