"use client"

import { useState, useActionState } from "react"
import { uploadDocument, deleteDocument } from "@/lib/actions/documents"
import { SignDocumentButton } from "@/components/dashboard/SignDocumentButton"
import { colors, fontBody } from "@/lib/theme"
import type { FormationOption } from "@/lib/formations-shared"
import { SIGNATORY_ROLE_OPTIONS } from "@/lib/documents-shared"
import type { Role } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const addButtonStyle = {
  alignSelf: "flex-start" as const,
  background: "#f5f7fb",
  border: `1.5px solid ${colors.gold}`,
  color: colors.navy,
  padding: "9px 16px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
}

export type DashboardDocument = {
  id: string
  nom: string
  url: string | null
  public: boolean
  createdAt: string
  formationTitre: string | null
  uploaderNom: string
  isMine: boolean
  requiresViewerSignature: boolean
  isSignedByViewer: boolean
  roleStatus: { label: string; done: boolean }[]
}

export function DocumentsManager({
  documents,
  formations,
}: {
  documents: DashboardDocument[]
  formations: FormationOption[]
}) {
  const [adding, setAdding] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un document
        </button>
      )}
      {adding && <UploadForm formations={formations} onDone={() => setAdding(false)} />}

      {documents.length === 0 && !adding && (
        <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
          Aucun document pour le moment.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
        {documents.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  )
}

function DocumentCard({ doc }: { doc: DashboardDocument }) {
  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteDocument(doc.id),
    undefined
  )

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      {doc.url ? (
        <a href={doc.url} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 700, color: colors.navy, textDecoration: "none" }}>
          {doc.nom}
        </a>
      ) : (
        <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{doc.nom}</span>
      )}
      <span style={{ fontSize: 12, color: colors.textLight }}>
        {doc.formationTitre ? `${doc.formationTitre} · ` : ""}
        Ajouté par {doc.uploaderNom}
        {doc.public ? " · Partagé" : ""}
      </span>

      {doc.roleStatus.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {doc.roleStatus.map((r) => (
            <span
              key={r.label}
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                padding: "4px 9px",
                borderRadius: 12,
                color: r.done ? colors.navy : colors.red,
                background: r.done ? "#eef2f9" : "#fdeceb",
              }}
            >
              {r.label} {r.done ? "✓ signé" : "en attente"}
            </span>
          ))}
        </div>
      )}

      {doc.requiresViewerSignature && <SignDocumentButton documentId={doc.id} signed={doc.isSignedByViewer} />}

      {doc.isMine && (
        <form
          action={deleteAction}
          onSubmit={(e) => {
            if (!confirm(`Supprimer « ${doc.nom} » ?`)) e.preventDefault()
          }}
        >
          <button
            type="submit"
            disabled={deletePending}
            style={{
              background: "transparent",
              border: "1px solid #f3c6cb",
              color: colors.red,
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 12px",
              borderRadius: 4,
              cursor: deletePending ? "default" : "pointer",
              fontFamily: fontBody,
            }}
          >
            Supprimer
          </button>
        </form>
      )}
      {deleteState?.error && <span style={{ color: colors.red, fontSize: 11 }}>{deleteState.error}</span>}
    </div>
  )
}

function UploadForm({ formations, onDone }: { formations: FormationOption[]; onDone: () => void }) {
  const [mode, setMode] = useState<"file" | "url">("file")
  const [rolesRequis, setRolesRequis] = useState<Role[]>(["STAGIAIRE"])
  const [state, formAction, pending] = useActionState(
    async (prev: { error: string | null } | undefined, formData: FormData) => {
      const result = await uploadDocument(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  function toggleRole(role: Role) {
    setRolesRequis((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]))
  }

  return (
    <form
      action={formAction}
      style={{ background: "#fff", border: `1px solid ${colors.gold}`, borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="nom" placeholder="Nom du document" required style={fieldStyle} />
        <select name="formationId" defaultValue="" style={fieldStyle}>
          <option value="">Formation associée (optionnel)</option>
          {formations.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setMode("file")} style={mode === "file" ? modeActiveStyle : modeBaseStyle}>
          Fichier PDF
        </button>
        <button type="button" onClick={() => setMode("url")} style={mode === "url" ? modeActiveStyle : modeBaseStyle}>
          Lien externe
        </button>
      </div>

      {mode === "file" ? (
        <input name="file" type="file" accept="application/pdf" style={fieldStyle} />
      ) : (
        <input name="url" placeholder="Lien du document" style={fieldStyle} />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Qui doit signer ce document ?</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {SIGNATORY_ROLE_OPTIONS.map((r) => (
            <label key={r.value} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: colors.text }}>
              <input
                type="checkbox"
                name="rolesRequis"
                value={r.value}
                checked={rolesRequis.includes(r.value)}
                onChange={() => toggleRole(r.value)}
                style={{ width: 14, height: 14 }}
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
        <input type="checkbox" name="public" style={{ width: 15, height: 15 }} />
        Partager avec les autres stagiaires
      </label>
      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            alignSelf: "flex-start",
            background: colors.red,
            color: "#fff",
            border: "none",
            padding: "9px 18px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: pending ? "default" : "pointer",
          }}
        >
          {pending ? "Envoi..." : "Ajouter"}
        </button>
        <button
          type="button"
          onClick={onDone}
          style={{
            background: "transparent",
            border: "1px solid #d8dde5",
            color: colors.navy,
            fontSize: 12,
            fontWeight: 700,
            padding: "9px 14px",
            borderRadius: 4,
            cursor: "pointer",
            fontFamily: fontBody,
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  )
}

const modeBaseStyle = {
  border: "1.5px solid #d8dde5",
  background: "#fff",
  color: colors.navy,
  padding: "7px 14px",
  borderRadius: 16,
  fontSize: 12,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
}

const modeActiveStyle = { ...modeBaseStyle, border: "none", background: colors.navy, color: "#fff" }
