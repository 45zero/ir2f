"use client"

import { useActionState, useState } from "react"
import {
  saveDocumentationGroupe,
  deleteDocumentationGroupe,
  saveDocumentationFichier,
  deleteDocumentationFichier,
  type DocumentationActionState,
} from "@/lib/actions/documentation"
import { DocFileField } from "@/components/admin/DocFileField"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { DocumentationFormat } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
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

const smallButton = (variant: "neutral" | "danger") => ({
  background: "transparent",
  border: `1px solid ${variant === "danger" ? "#f3c6cb" : "#d8dde5"}`,
  color: variant === "danger" ? colors.red : colors.navy,
  fontSize: 12,
  fontWeight: 700,
  padding: "5px 10px",
  borderRadius: 4,
  cursor: "pointer",
  fontFamily: fontBody,
})

const submitButtonStyle = {
  alignSelf: "flex-start" as const,
  background: colors.red,
  color: "#fff",
  border: "none",
  padding: "9px 18px",
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #eef0f3",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
}

const sectionCardStyle = {
  background: "#fafbfd",
  border: "1px solid #eef0f3",
  borderRadius: 10,
  padding: 18,
  display: "flex",
  flexDirection: "column" as const,
  gap: 14,
}

function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20, color: colors.textLight, fontSize: 13 }}>
      {label}
    </div>
  )
}

function DeleteButton({ label, onDelete }: { label: string; onDelete: () => void }) {
  return (
    <form
      action={onDelete}
      onSubmit={(e) => {
        if (!confirm(`Supprimer « ${label} » ?`)) e.preventDefault()
      }}
    >
      <button type="submit" style={smallButton("danger")}>
        Supprimer
      </button>
    </form>
  )
}

export type AdminDocumentationFichier = {
  id: string
  groupeId: string
  titre: string
  description: string | null
  url: string
  format: DocumentationFormat
  ordre: number
}

export type AdminDocumentationGroupe = {
  id: string
  titre: string
  ordre: number
  documents: AdminDocumentationFichier[]
}

export function DocumentationManager({ groupes }: { groupes: AdminDocumentationGroupe[] }) {
  const [addingGroupe, setAddingGroupe] = useState(false)
  const [editingGroupeId, setEditingGroupeId] = useState<string | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {!addingGroupe && (
        <button style={addButtonStyle} onClick={() => setAddingGroupe(true)}>
          + Ajouter une rubrique
        </button>
      )}
      {addingGroupe && <GroupeForm onDone={() => setAddingGroupe(false)} />}

      {groupes.map((groupe) =>
        editingGroupeId === groupe.id ? (
          <GroupeForm key={groupe.id} item={groupe} onDone={() => setEditingGroupeId(null)} />
        ) : (
          <div key={groupe.id} style={sectionCardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 17, fontWeight: 800, margin: 0 }}>
                {groupe.titre}
              </h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={smallButton("neutral")} onClick={() => setEditingGroupeId(groupe.id)}>
                  Modifier la rubrique
                </button>
                <DeleteButton
                  label={groupe.titre}
                  onDelete={() => deleteDocumentationGroupe(groupe.id)}
                />
              </div>
            </div>
            <FichiersSection groupeId={groupe.id} items={groupe.documents} />
          </div>
        )
      )}
      {groupes.length === 0 && !addingGroupe && <EmptyState label="Aucune rubrique de documentation." />}
    </div>
  )
}

function GroupeForm({ item, onDone }: { item?: AdminDocumentationGroupe; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: DocumentationActionState | undefined, formData: FormData) => {
      const result = await saveDocumentationGroupe(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="titre" placeholder="Titre de la rubrique" required defaultValue={item?.titre} style={fieldStyle} />
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
      </div>
      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={pending} style={submitButtonStyle}>
          {pending ? "Enregistrement..." : "Enregistrer"}
        </button>
        <button type="button" onClick={onDone} style={smallButton("neutral")}>
          Annuler
        </button>
      </div>
    </form>
  )
}

function FichiersSection({ groupeId, items }: { groupeId: string; items: AdminDocumentationFichier[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un document
        </button>
      )}
      {adding && <FichierForm groupeId={groupeId} onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <FichierForm key={item.id} groupeId={groupeId} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={{ ...cardStyle, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>{item.format}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <a href={item.url} target="_blank" rel="noreferrer" style={smallButton("neutral")}>
                  Voir
                </a>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <DeleteButton label={item.titre} onDelete={() => deleteDocumentationFichier(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun document dans cette rubrique." />}
    </div>
  )
}

function FichierForm({
  groupeId,
  item,
  onDone,
}: {
  groupeId: string
  item?: AdminDocumentationFichier
  onDone: () => void
}) {
  const [state, formAction, pending] = useActionState(
    async (prev: DocumentationActionState | undefined, formData: FormData) => {
      const result = await saveDocumentationFichier(groupeId, prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="titre" placeholder="Titre du document" required defaultValue={item?.titre} style={fieldStyle} />
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
      </div>
      <textarea
        name="description"
        placeholder="Description (optionnel)"
        rows={2}
        defaultValue={item?.description ?? ""}
        style={{ ...fieldStyle, resize: "vertical" }}
      />
      <DocFileField name="fichier" label="Fichier" defaultUrl={item?.url} />
      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={pending} style={submitButtonStyle}>
          {pending ? "Enregistrement..." : "Enregistrer"}
        </button>
        <button type="button" onClick={onDone} style={smallButton("neutral")}>
          Annuler
        </button>
      </div>
    </form>
  )
}
