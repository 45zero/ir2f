"use client"

import { useState, useActionState } from "react"
import { uploadDocument, signDocument, deleteDocument } from "@/lib/actions/documents"
import { colors, fontBody } from "@/lib/theme"
import type { FormationOption } from "@/lib/formations-shared"

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
  url: string
  public: boolean
  createdAt: string
  formationTitre: string | null
  uploaderNom: string
  isMine: boolean
  isSigned: boolean
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
  const [signState, signAction, signPending] = useActionState(
    async () => {
      await signDocument(doc.id)
      return { done: true }
    },
    undefined
  )
  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteDocument(doc.id),
    undefined
  )

  const signed = doc.isSigned || Boolean(signState?.done)

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      <a href={doc.url} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 700, color: colors.navy, textDecoration: "none" }}>
        {doc.nom}
      </a>
      <span style={{ fontSize: 12, color: colors.textLight }}>
        {doc.formationTitre ? `${doc.formationTitre} · ` : ""}
        Ajouté par {doc.uploaderNom}
        {doc.public ? " · Partagé" : ""}
      </span>

      {signed ? (
        <span style={{ color: "#3f9142", fontSize: 12, fontWeight: 600 }}>Signé électroniquement</span>
      ) : (
        <form action={signAction}>
          <button
            type="submit"
            disabled={signPending}
            style={{
              alignSelf: "flex-start",
              background: colors.navy,
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: signPending ? "default" : "pointer",
            }}
          >
            {signPending ? "..." : "Signer électroniquement"}
          </button>
        </form>
      )}

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
  const [state, formAction, pending] = useActionState(
    async (prev: { error: string | null } | undefined, formData: FormData) => {
      const result = await uploadDocument(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form
      action={formAction}
      style={{ background: "#fff", border: `1px solid ${colors.gold}`, borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="nom" placeholder="Nom du document" required style={fieldStyle} />
        <input name="url" placeholder="Lien du document" required style={fieldStyle} />
        <select name="formationId" defaultValue="" style={fieldStyle}>
          <option value="">Formation associée (optionnel)</option>
          {formations.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titre}
            </option>
          ))}
        </select>
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
