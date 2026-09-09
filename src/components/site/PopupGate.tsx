"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { hasSeenPopup, markPopupSeen } from "@/lib/popup-shared"
import { getYoutubeEmbedUrl, isVideoFileUrl } from "@/lib/youtube"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { TypeLien, TypePopup } from "@/generated/prisma"

export type SitePopup = {
  id: string
  type: TypePopup
  image: string | null
  titre: string
  texte: string
  auteurNom: string | null
  auteurFonction: string | null
  signatureUrl: string | null
  youtubeUrl: string | null
  videoFichierUrl: string | null
  lienLabel: string | null
  lienUrl: string | null
  lienType: TypeLien | null
  delaiAffichage: number
}

export function PopupGate({ popups }: { popups: SitePopup[] }) {
  const [open, setOpen] = useState<SitePopup | null>(null)

  useEffect(() => {
    const candidate = popups.find((p) => !hasSeenPopup(p.id))
    if (!candidate) return

    const timer = setTimeout(() => {
      markPopupSeen(candidate.id)
      setOpen(candidate)
    }, Math.max(0, candidate.delaiAffichage) * 1000)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!open) return null
  return <PopupModal popup={open} onClose={() => setOpen(null)} />
}

function PopupModal({ popup, onClose }: { popup: SitePopup; onClose: () => void }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  const embedUrl = popup.youtubeUrl ? getYoutubeEmbedUrl(popup.youtubeUrl) : null

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
        aria-label={popup.titre}
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "clamp(20px,4vw,32px)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          animation: "ir2fFadeIn 0.25s ease",
          boxShadow: "0 20px 60px rgba(10,22,46,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {popup.image && (
              <img
                src={popup.image}
                alt=""
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${colors.gold}`,
                  flexShrink: 0,
                }}
              />
            )}
            <div>
              <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 20, fontWeight: 800, margin: 0, lineHeight: 1.15 }}>
                {popup.titre}
              </h2>
              {popup.type === "EDITO" && popup.auteurFonction && (
                <span style={{ fontFamily: fontBody, fontSize: 12.5, color: colors.textLight }}>{popup.auteurFonction}</span>
              )}
            </div>
          </div>
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

        {!popup.image && popup.type === "ANNONCE" && popup.videoFichierUrl && isVideoFileUrl(popup.videoFichierUrl) && (
          <video src={popup.videoFichierUrl} controls style={{ width: "100%", borderRadius: 8, background: "#000" }} />
        )}
        {embedUrl && (
          <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 8, overflow: "hidden" }}>
            <iframe
              src={embedUrl}
              title={popup.titre}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        )}

        <p style={{ fontFamily: fontBody, fontSize: 14.5, color: colors.text, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>
          {popup.texte}
        </p>

        {popup.type === "EDITO" && (popup.signatureUrl || popup.auteurNom) && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, borderTop: "1px solid #eef0f3", paddingTop: 14 }}>
            {popup.signatureUrl && <img src={popup.signatureUrl} alt="Signature" style={{ height: 44, objectFit: "contain" }} />}
            {popup.auteurNom && (
              <span style={{ fontFamily: fontHeading, fontWeight: 700, color: colors.navy, fontSize: 14 }}>{popup.auteurNom}</span>
            )}
          </div>
        )}

        {popup.type === "ANNONCE" && popup.lienUrl && (
          <PopupCtaButton lienUrl={popup.lienUrl} lienType={popup.lienType} label={popup.lienLabel || "En savoir plus"} onClose={onClose} />
        )}
      </div>
    </div>
  )
}

function PopupCtaButton({
  lienUrl,
  lienType,
  label,
  onClose,
}: {
  lienUrl: string
  lienType: TypeLien | null
  label: string
  onClose: () => void
}) {
  const buttonStyle = {
    alignSelf: "flex-start" as const,
    background: colors.red,
    color: "#fff",
    textDecoration: "none",
    padding: "11px 22px",
    borderRadius: 24,
    fontSize: 13.5,
    fontWeight: 700,
    fontFamily: fontBody,
  }

  if (lienType === "EXTERNE") {
    return (
      <a href={lienUrl} target="_blank" rel="noreferrer" style={buttonStyle} onClick={onClose}>
        {label} ↗
      </a>
    )
  }
  return (
    <Link href={lienUrl} style={buttonStyle} onClick={onClose}>
      {label}
    </Link>
  )
}
