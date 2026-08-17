"use client"

import { useState, useActionState } from "react"
import { uploadDocument, updateDocument, deleteDocument } from "@/lib/actions/documents"
import { SignDocumentButton } from "@/components/dashboard/SignDocumentButton"
import { DocumentLinkActions } from "@/components/dashboard/DocumentLinkActions"
import { colors, fontBody } from "@/lib/theme"
import type { FormationOption } from "@/lib/formations-shared"
import type { DocumentCategorie } from "@/generated/prisma"

type Roster = { id: string; nom: string; prenom: string }

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
  downloadUrl: string | null
  categorie: DocumentCategorie
  public: boolean
  formationId: string | null
  createdAt: string
  formationTitre: string | null
  uploaderNom: string
  isMine: boolean
  hasSignatures: boolean
  partageIndividuel: boolean
  destinataireIds: string[]
  requiresViewerSignature: boolean
  isSignedByViewer: boolean
  signedAt: string | null
  signedByName: string | null
  fullySigned: boolean
  roleStatus: { label: string; done: boolean }[]
}

export function DocumentsManager({
  documents,
  formations,
  rosters,
}: {
  documents: DashboardDocument[]
  formations: FormationOption[]
  rosters: Record<string, Roster[]>
}) {
  const [adding, setAdding] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un document
        </button>
      )}
      {adding && <DocumentForm mode="create" formations={formations} rosters={rosters} onDone={() => setAdding(false)} />}

      {documents.length === 0 && !adding && (
        <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 24, color: colors.textLight, fontSize: 13 }}>
          Aucun document pour le moment.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
        {documents.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} formations={formations} rosters={rosters} />
        ))}
      </div>
    </div>
  )
}

function DocumentCard({
  doc,
  formations,
  rosters,
}: {
  doc: DashboardDocument
  formations: FormationOption[]
  rosters: Record<string, Roster[]>
}) {
  const [editing, setEditing] = useState(false)
  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteDocument(doc.id),
    undefined
  )

  if (editing) {
    return <DocumentForm mode="edit" doc={doc} formations={formations} rosters={rosters} onDone={() => setEditing(false)} />
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{doc.nom}</span>
        <DocumentLinkActions viewUrl={doc.url} downloadUrl={doc.downloadUrl} />
      </div>
      <span style={{ fontSize: 12, color: colors.textLight }}>
        {doc.formationTitre ? `${doc.formationTitre} · ` : ""}
        Ajouté par {doc.uploaderNom}
        {doc.public ? " · Partagé" : ""}
        {doc.categorie === "PEDAGOGIQUE" ? " · Contenu pédagogique" : ""}
      </span>

      {(doc.fullySigned || doc.roleStatus.length > 0) && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {doc.fullySigned ? (
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 12, color: "#1a6b3a", background: "#e6f4ea" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a6b3a" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Toutes les signatures recueillies
            </span>
          ) : (
            doc.roleStatus.map((r) => (
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
            ))
          )}
        </div>
      )}

      {doc.requiresViewerSignature && (
        <SignDocumentButton documentId={doc.id} signed={doc.isSignedByViewer} signedAt={doc.signedAt} signedByName={doc.signedByName} />
      )}

      {doc.isMine && (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => setEditing(true)}
            style={{
              background: "transparent",
              border: "1px solid #d8dde5",
              color: colors.navy,
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: fontBody,
            }}
          >
            Modifier
          </button>
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
        </div>
      )}
      {deleteState?.error && <span style={{ color: colors.red, fontSize: 11 }}>{deleteState.error}</span>}
    </div>
  )
}

function DocumentForm({
  mode: formMode,
  doc,
  formations,
  rosters,
  onDone,
}: {
  mode: "create" | "edit"
  doc?: DashboardDocument
  formations: FormationOption[]
  rosters: Record<string, Roster[]>
  onDone: () => void
}) {
  const [mode, setMode] = useState<"file" | "url">("file")
  const [categorie, setCategorie] = useState<DocumentCategorie>(doc?.categorie ?? "ADMINISTRATIF")
  const [formationId, setFormationId] = useState(doc?.formationId ?? "")
  const [partageMode, setPartageMode] = useState<"groupe" | "individuel">(doc?.partageIndividuel ? "individuel" : "groupe")
  const [destinataires, setDestinataires] = useState<string[]>(doc?.destinataireIds ?? [])
  const canReplaceSource = formMode === "create" || !doc?.hasSignatures
  const roster = rosters[formationId] ?? []
  const allSelected = destinataires.length === roster.length && roster.length > 0
  const [state, formAction, pending] = useActionState(
    async (prev: { error: string | null } | undefined, formData: FormData) => {
      const result = formMode === "edit" ? await updateDocument(prev, formData) : await uploadDocument(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  function toggleDestinataire(id: string) {
    setDestinataires((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleAllDestinataires() {
    setDestinataires(allSelected ? [] : roster.map((s) => s.id))
  }

  return (
    <form
      action={formAction}
      style={{ background: "#fff", border: `1px solid ${colors.gold}`, borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}
    >
      {doc && <input type="hidden" name="id" value={doc.id} />}
      <input type="hidden" name="categorie" value={categorie} />

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setCategorie("ADMINISTRATIF")} style={categorie === "ADMINISTRATIF" ? modeActiveStyle : modeBaseStyle}>
          Document administratif
        </button>
        <button type="button" onClick={() => setCategorie("PEDAGOGIQUE")} style={categorie === "PEDAGOGIQUE" ? modeActiveStyle : modeBaseStyle}>
          Contenu pédagogique
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="nom" placeholder="Nom du document" defaultValue={doc?.nom} required style={fieldStyle} />
        <select
          name="formationId"
          value={formationId}
          onChange={(e) => setFormationId(e.target.value)}
          style={fieldStyle}
        >
          <option value="">Formation associée (optionnel)</option>
          {formations.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titre}
            </option>
          ))}
        </select>
      </div>

      {canReplaceSource ? (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => setMode("file")} style={mode === "file" ? modeActiveStyle : modeBaseStyle}>
              {categorie === "ADMINISTRATIF" ? "Fichier PDF" : "Fichier"}
            </button>
            <button type="button" onClick={() => setMode("url")} style={mode === "url" ? modeActiveStyle : modeBaseStyle}>
              Lien externe {categorie === "PEDAGOGIQUE" ? "(vidéo, exercice...)" : ""}
            </button>
          </div>

          {mode === "file" ? (
            <input name="file" type="file" accept={categorie === "ADMINISTRATIF" ? "application/pdf" : undefined} style={fieldStyle} />
          ) : (
            <input
              name="url"
              placeholder={categorie === "PEDAGOGIQUE" ? "Lien vidéo, exercice, ressource..." : "Lien du document"}
              style={fieldStyle}
            />
          )}
          {formMode === "edit" && (
            <span style={{ fontSize: 11, color: colors.textLight }}>
              Laissez vide pour conserver le fichier ou lien actuel.
            </span>
          )}
        </>
      ) : (
        <span style={{ fontSize: 11.5, color: colors.textLight }}>
          Fichier/lien non modifiable : ce document a déjà été signé.
        </span>
      )}

      {formationId && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>
            Partager avec les membres inscrits dans la formation
          </span>
          <input type="hidden" name="partageMode" value={partageMode} />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => setPartageMode("groupe")} style={partageMode === "groupe" ? modeActiveStyle : modeBaseStyle}>
              Groupé (toute la formation)
            </button>
            <button type="button" onClick={() => setPartageMode("individuel")} style={partageMode === "individuel" ? modeActiveStyle : modeBaseStyle}>
              Individuel
            </button>
          </div>

          {partageMode === "individuel" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {roster.length === 0 ? (
                <span style={{ fontSize: 12, color: colors.textLight }}>
                  Aucun stagiaire inscrit et validé pour cette formation.
                </span>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={toggleAllDestinataires}
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
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 180, overflowY: "auto" }}>
                    {roster.map((s) => (
                      <label key={s.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: colors.text }}>
                        <input
                          type="checkbox"
                          name="destinataires"
                          value={s.id}
                          checked={destinataires.includes(s.id)}
                          onChange={() => toggleDestinataire(s.id)}
                          style={{ width: 14, height: 14 }}
                        />
                        {s.prenom} {s.nom}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
        <input type="checkbox" name="public" defaultChecked={doc?.public} style={{ width: 15, height: 15 }} />
        Partager avec les autres stagiaires
      </label>
      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          disabled={pending || (Boolean(formationId) && partageMode === "individuel" && destinataires.length === 0)}
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
          {pending ? "Envoi..." : formMode === "edit" ? "Enregistrer" : "Ajouter"}
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
