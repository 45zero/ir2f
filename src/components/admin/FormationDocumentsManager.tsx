"use client"

import { useState, useActionState } from "react"
import { uploadDocument, updateFormationDocument, deleteDocument } from "@/lib/actions/documents"
import { colors, fontBody } from "@/lib/theme"

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

export type FormationDocumentRow = {
  id: string
  nom: string
  visiblePublic: boolean
  ordre: number
  viewUrl: string | null
  downloadUrl: string | null
}

export function FormationDocumentsManager({
  formationId,
  documents,
}: {
  formationId: string
  documents: FormationDocumentRow[]
}) {
  const [adding, setAdding] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un document
        </button>
      )}
      {adding && <UploadForm formationId={formationId} onDone={() => setAdding(false)} />}

      {documents.length === 0 && !adding && (
        <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
          Aucun document pour cette formation.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {documents.map((doc) => (
          <DocumentRow key={doc.id} doc={doc} formationId={formationId} />
        ))}
      </div>
    </div>
  )
}

function DocumentRow({ doc, formationId }: { doc: FormationDocumentRow; formationId: string }) {
  const [updateState, updateAction, updatePending] = useActionState(updateFormationDocument, undefined)
  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteDocument(doc.id),
    undefined
  )

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 8,
        padding: 14,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{doc.nom}</span>
        {doc.viewUrl && (
          <a href={doc.viewUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: colors.navy }}>
            Voir le document
          </a>
        )}
      </div>

      <form action={updateAction} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <input type="hidden" name="id" value={doc.id} />
        <input type="hidden" name="formationId" value={formationId} />
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: colors.text }}>
          <input type="checkbox" name="visiblePublic" defaultChecked={doc.visiblePublic} style={{ width: 15, height: 15 }} />
          Visible sur la fiche publique
        </label>
        <input
          name="ordre"
          type="number"
          defaultValue={doc.ordre}
          title="Ordre d'affichage"
          style={{ ...fieldStyle, width: 70 }}
        />
        <button
          type="submit"
          disabled={updatePending}
          style={{
            background: colors.navy,
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: updatePending ? "default" : "pointer",
          }}
        >
          {updatePending ? "..." : "Enregistrer"}
        </button>
      </form>

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
            padding: "8px 12px",
            borderRadius: 4,
            cursor: deletePending ? "default" : "pointer",
            fontFamily: fontBody,
          }}
        >
          Supprimer
        </button>
      </form>
      {updateState?.error && <span style={{ color: colors.red, fontSize: 11, width: "100%" }}>{updateState.error}</span>}
      {deleteState?.error && <span style={{ color: colors.red, fontSize: 11, width: "100%" }}>{deleteState.error}</span>}
    </div>
  )
}

function UploadForm({ formationId, onDone }: { formationId: string; onDone: () => void }) {
  const [mode, setMode] = useState<"file" | "url">("file")
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
      <input type="hidden" name="formationId" value={formationId} />
      <input type="hidden" name="categorie" value="ADMINISTRATIF" />

      <input name="nom" placeholder="Nom du document (ex. « Fiche RNCP »)" required style={fieldStyle} />

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setMode("file")} style={mode === "file" ? modeActiveStyle : modeBaseStyle}>
          Fichier
        </button>
        <button type="button" onClick={() => setMode("url")} style={mode === "url" ? modeActiveStyle : modeBaseStyle}>
          Lien externe
        </button>
      </div>

      {mode === "file" ? (
        <input name="file" type="file" style={fieldStyle} />
      ) : (
        <input name="url" placeholder="Lien du document" style={fieldStyle} />
      )}

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
        <input type="checkbox" name="visiblePublic" defaultChecked style={{ width: 15, height: 15 }} />
        Afficher sur la page publique de la formation
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
