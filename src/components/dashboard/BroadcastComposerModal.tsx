"use client"

import { useState, useActionState } from "react"
import { broadcastDocumentToFormation } from "@/lib/actions/documents"
import { colors, fontHeading, fontBody } from "@/lib/theme"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

export function BroadcastComposerModal({
  formationId,
  formationTitre,
  stagiaires,
  onClose,
}: {
  formationId: string
  formationTitre: string
  stagiaires: { id: string; nom: string; prenom: string }[]
  onClose: () => void
}) {
  const [state, formAction, pending] = useActionState(
    async (prev: { error: string | null } | undefined, formData: FormData) => {
      const result = await broadcastDocumentToFormation(prev, formData)
      if (!result.error) onClose()
      return result
    },
    undefined
  )
  const [selectedIds, setSelectedIds] = useState<string[]>(stagiaires.map((s) => s.id))
  const allSelected = selectedIds.length === stagiaires.length && stagiaires.length > 0

  function toggleAll() {
    setSelectedIds(allSelected ? [] : stagiaires.map((s) => s.id))
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,33,61,0.55)",
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
          borderRadius: 12,
          maxWidth: 440,
          width: "100%",
          maxHeight: "85vh",
          overflow: "auto",
          padding: "clamp(20px,3vw,28px)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "none",
            background: "#f5f7fb",
            color: colors.navy,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h3 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 18, fontWeight: 800, margin: "0 30px 0 0" }}>
          Envoyer un document — {formationTitre}
        </h3>
        <p style={{ color: colors.textLight, fontSize: 13, margin: 0 }}>Sélectionnez les stagiaires destinataires.</p>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input type="hidden" name="formationId" value={formationId} />
          <input name="nom" placeholder="Nom du document" required style={fieldStyle} />
          <input name="url" placeholder="Lien du document" required style={fieldStyle} />

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              type="button"
              onClick={toggleAll}
              style={{
                alignSelf: "flex-start",
                background: "transparent",
                border: "none",
                color: colors.navy,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: fontBody,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
            </button>
            {stagiaires.map((s) => (
              <label
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#f5f7fb",
                  padding: "10px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="stagiaires"
                  value={s.id}
                  checked={selectedIds.includes(s.id)}
                  onChange={() => toggleOne(s.id)}
                  style={{ width: 16, height: 16, accentColor: colors.navy }}
                />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: colors.text }}>
                  {s.prenom} {s.nom}
                </span>
              </label>
            ))}
          </div>

          {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}

          <button
            type="submit"
            disabled={pending || selectedIds.length === 0}
            style={{
              background: selectedIds.length === 0 ? "#e4e9f2" : colors.navy,
              color: selectedIds.length === 0 ? "#8a93a3" : "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: pending || selectedIds.length === 0 ? "default" : "pointer",
            }}
          >
            {pending ? "Envoi..." : `Envoyer à ${selectedIds.length} stagiaire(s)`}
          </button>
        </form>
      </div>
    </div>
  )
}
