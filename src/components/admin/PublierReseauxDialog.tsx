"use client"

import { useState } from "react"
import { getContentPublishContext, type ContentPublishContext } from "@/lib/actions/social-publish"
import { PublierReseauxPanel, type PublierReseauxCompte } from "@/components/admin/PublierReseauxPanel"
import { colors, fontBody, fontHeading } from "@/lib/theme"
import type { PublishableType } from "@/lib/social/publication"

const triggerButtonStyle: React.CSSProperties = {
  background: colors.red,
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 4,
  fontSize: 11.5,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
  whiteSpace: "nowrap",
}

/** Ouvre le panneau "Publier sur les réseaux" (identique à celui de la page article/formation) dans une boîte de dialogue, sans quitter /admin/publications — évite d'avoir à ouvrir le contenu correspondant juste pour le publier. */
export function PublierReseauxDialogTrigger({
  entityType,
  entityId,
  titre,
  comptes,
}: {
  entityType: PublishableType
  entityId: string
  titre: string
  comptes: PublierReseauxCompte[]
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [context, setContext] = useState<ContentPublishContext | null>(null)

  async function handleOpen() {
    setOpen(true)
    setLoading(true)
    setError(null)
    try {
      const ctx = await getContentPublishContext(entityType, entityId)
      if (!ctx) setError("Contenu introuvable.")
      setContext(ctx)
    } catch {
      setError("Erreur lors du chargement.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button type="button" onClick={handleOpen} style={triggerButtonStyle}>
        Publier
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "40px 16px",
            overflowY: "auto",
            zIndex: 100,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div style={{ background: "#fff", borderRadius: 12, maxWidth: 660, width: "100%", padding: "clamp(16px,3vw,24px)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
              <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 17, fontWeight: 800, margin: 0 }}>{titre}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                style={{ background: "none", border: "none", fontSize: 22, lineHeight: 1, cursor: "pointer", color: colors.textMuted }}
              >
                ×
              </button>
            </div>
            {loading && <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>Chargement...</p>}
            {error && <p style={{ fontSize: 13, color: colors.red, margin: 0 }}>{error}</p>}
            {context && (
              <PublierReseauxPanel
                entityType={entityType}
                entityId={entityId}
                comptes={comptes}
                reseauxPublies={context.reseauxPublies}
                defaultMessage={context.defaultMessage}
                images={context.images}
                videos={context.videos}
                hideFooterLink
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
