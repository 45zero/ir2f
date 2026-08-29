"use client"

import { useState } from "react"
import { colors, fontHeading, fontBody } from "@/lib/theme"

type DocumentUtile = { id: string; nom: string; url: string | null; previewUrl: string | null; mimeType: string | null }

function isPreviewablePdf(doc: DocumentUtile): boolean {
  if (doc.mimeType === "application/pdf") return true
  return Boolean(doc.url && doc.url.split("?")[0].toLowerCase().endsWith(".pdf"))
}

// Certains "documents utiles" sont en réalité de simples liens vers une page web (ex. une page
// de résultats, ou une autre page du site) plutôt qu'un fichier téléchargeable — les forcer dans
// le pop-up d'aperçu/téléchargement produit un "fichier" qui n'est en fait que du HTML. On les
// distingue par extension de fichier reconnue dans l'URL (ou par la présence d'un mimeType pour
// les fichiers uploadés, qui en ont toujours un).
const FILE_EXTENSION = /\.(pdf|docx?|xlsx?|pptx?|csv|zip|rar|7z|png|jpe?g|gif|webp|txt|odt|ods)(?:[?#]|$)/i

function isDownloadableFile(doc: DocumentUtile): boolean {
  if (doc.mimeType) return true
  return Boolean(doc.url && FILE_EXTENSION.test(doc.url))
}

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#fff",
  border: "1px solid #eef0f3",
  borderRadius: 8,
  padding: "12px 16px",
  fontSize: 13,
  fontWeight: 600,
  color: colors.navy,
  fontFamily: fontBody,
  textAlign: "left" as const,
  cursor: "pointer",
  width: "100%",
}

const downloadButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: colors.red,
  color: "#fff",
  border: "none",
  padding: "9px 16px",
  borderRadius: 4,
  fontSize: 12.5,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
  textDecoration: "none",
  flexShrink: 0,
}

// Aperçu avant téléchargement : cliquer sur un document ouvre un pop-up (iframe pour les PDF,
// message + bouton sinon) plutôt que de lancer le téléchargement directement — évite la confusion
// quand le navigateur enregistre un fichier sans que l'utilisateur ait vu de quoi il s'agissait.
export function DocumentsUtiles({ documents }: { documents: DocumentUtile[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const items = documents.filter((d): d is DocumentUtile & { url: string } => Boolean(d.url))
  const openDoc = items.find((d) => d.id === openId) ?? null

  if (items.length === 0) return null

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 22, fontWeight: 800, margin: 0 }}>
        Documents utiles
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((doc) =>
          isDownloadableFile(doc) ? (
            <button
              key={doc.id}
              type="button"
              onClick={() => setOpenId(doc.id)}
              style={rowStyle}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
              {doc.nom}
            </button>
          ) : (
            <a key={doc.id} href={doc.url} target="_blank" rel="noreferrer" style={{ ...rowStyle, textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {doc.nom}
            </a>
          )
        )}
      </div>

      {openDoc && (
        <div
          onClick={() => setOpenId(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,33,61,0.65)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 10,
              width: "100%",
              maxWidth: 900,
              height: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "ir2fFadeIn 0.2s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "14px 20px",
                borderBottom: "1px solid #eef0f3",
              }}
            >
              <span
                style={{
                  fontFamily: fontHeading,
                  fontWeight: 800,
                  color: colors.navy,
                  fontSize: 15,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {openDoc.nom}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <a href={openDoc.url} download style={downloadButtonStyle}>
                  Télécharger
                </a>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
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
            </div>
            <div style={{ flex: 1, background: "#f5f7fb" }}>
              {isPreviewablePdf(openDoc) ? (
                <iframe src={openDoc.previewUrl ?? openDoc.url} title={openDoc.nom} style={{ width: "100%", height: "100%", border: "none" }} />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 14,
                    color: colors.textLight,
                    fontSize: 13,
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  <span>Aperçu non disponible pour ce type de fichier.</span>
                  <a href={openDoc.url} download style={downloadButtonStyle}>
                    Télécharger le fichier
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
