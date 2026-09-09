"use client"

import { useState, useSyncExternalStore } from "react"
import { colors, fontBody } from "@/lib/theme"

function subscribeNoop() {
  return () => {}
}

function getCanNativeShare() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function"
}

function getCanNativeShareServer() {
  return false
}

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  background: "transparent",
  border: "1px solid #e2e5ea",
  color: colors.navy,
  borderRadius: 6,
  padding: "8px 14px",
  fontSize: 12.5,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
  textDecoration: "none",
}

export function ArticleShareActions({ url, title }: { url: string; title: string }) {
  const canNativeShare = useSyncExternalStore(subscribeNoop, getCanNativeShare, getCanNativeShareServer)
  const [copied, setCopied] = useState(false)

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url })
    } catch {
      // L'utilisateur a annulé le partage — rien à faire.
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Presse-papier indisponible (contexte non sécurisé, permission refusée...) — pas d'action de repli.
    }
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      {canNativeShare && (
        <button type="button" onClick={handleNativeShare} style={buttonStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.6" y1="10.6" x2="15.4" y2="6.4" />
            <line x1="8.6" y1="13.4" x2="15.4" y2="17.6" />
          </svg>
          Partager
        </button>
      )}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        style={buttonStyle}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
        Facebook
      </a>
      <button type="button" onClick={handleCopy} style={buttonStyle}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {copied ? "Copié !" : "Copier le lien"}
      </button>
    </div>
  )
}
