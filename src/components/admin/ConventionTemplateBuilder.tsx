"use client"

import { useState, useActionState } from "react"
import { analyzeTemplateUpload, finalizeConventionTemplate, type AnalyzeTemplateState } from "@/lib/actions/convention-template-builder"
import { ASSIGNABLE_TEMPLATE_FIELD_NAMES, SIGNATURE_FIELD_NAMES } from "@/lib/conventions/variables-shared"
import type { DetectedField } from "@/lib/conventions/template-analysis"
import { colors, fontBody } from "@/lib/theme"
import type { RoleSignataire } from "@/generated/prisma"

const SIGNATURE_ROLE_LABELS: Record<RoleSignataire, string> = {
  STAGIAIRE: "Stagiaire",
  CLUB: "Club",
  TUTEUR: "Tuteur",
  MAITRE_DE_STAGE: "Maître de stage",
  RESPONSABLE_PEDAGOGIQUE: "Responsable pédagogique",
}

const KIND_LABELS: Record<DetectedField["kind"], string> = {
  text: "Champs texte (lignes en pointillés)",
  checkbox: "Cases à cocher",
  signature: "Emplacements de signature",
}

const TEXT_VARIABLE_NAMES = ASSIGNABLE_TEMPLATE_FIELD_NAMES.filter((n) => !n.startsWith("check_"))
const CHECKBOX_VARIABLE_NAMES = ASSIGNABLE_TEMPLATE_FIELD_NAMES.filter((n) => n.startsWith("check_"))

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let binary = ""
  const chunkSize = 0x8000
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
  }
  return btoa(binary)
}

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
}

export function ConventionTemplateBuilder() {
  const [fileBase64, setFileBase64] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")
  const [nom, setNom] = useState("")
  const [reading, setReading] = useState(false)
  const [fields, setFields] = useState<(DetectedField & { assignedValue: string })[] | null>(null)

  const [analyzeState, analyzeAction, analyzePending] = useActionState(
    async (_prev: AnalyzeTemplateState | undefined): Promise<AnalyzeTemplateState> => {
      if (!fileBase64) return { error: "Sélectionnez un fichier PDF.", fields: null, fileBase64: null }
      const result = await analyzeTemplateUpload(fileBase64)
      if (result.fields) setFields(result.fields.map((f) => ({ ...f, assignedValue: f.kind === "signature" ? (f.suggestedRole ?? "") : "" })))
      return result
    },
    undefined
  )

  const [finalizeState, finalizeAction, finalizePending] = useActionState(
    async (_prev: { error: string | null; success: boolean } | undefined) => {
      if (!fileBase64 || !fields) return { error: "Session expirée, recommencez l'analyse.", success: false }
      const placements = fields
        .filter((f) => f.assignedValue)
        .map((f) => ({
          name: f.kind === "signature" ? SIGNATURE_FIELD_NAMES[f.assignedValue as RoleSignataire] : f.assignedValue,
          page: f.page,
          x: f.x,
          y: f.y,
          width: f.width,
          height: f.height,
          background: f.kind === "text",
        }))
      const result = await finalizeConventionTemplate({ fileBase64, nom, placements })
      if (result.success) {
        setFields(null)
        setFileBase64(null)
        setFileName("")
        setNom("")
      }
      return result
    },
    undefined
  )

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setReading(true)
    try {
      setFileBase64(await fileToBase64(file))
      setFileName(file.name)
    } finally {
      setReading(false)
    }
  }

  function updateAssignment(id: string, value: string) {
    setFields((prev) => prev?.map((f) => (f.id === id ? { ...f, assignedValue: value } : f)) ?? null)
  }

  if (!fields) {
    return (
      <form
        action={analyzeAction}
        style={{ display: "flex", flexDirection: "column", gap: 12, background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: "16px 18px" }}
      >
        <p style={{ fontSize: 12.5, color: colors.textMuted, margin: 0 }}>
          Dépose un PDF « brut » (lignes en pointillés, cases □) — l&apos;assistant détecte automatiquement les
          emplacements à remplir ; tu valides ensuite chacun avant de créer le modèle.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <input type="file" accept="application/pdf" onChange={onFileChange} style={{ fontSize: 13, fontFamily: fontBody }} />
          {fileName && <span style={{ fontSize: 12.5, color: colors.navy, fontWeight: 700 }}>{fileName}</span>}
        </div>
        <button
          type="submit"
          disabled={!fileBase64 || reading || analyzePending}
          style={{
            alignSelf: "flex-start",
            background: !fileBase64 || reading || analyzePending ? "#e999a0" : colors.red,
            color: "#fff",
            border: "none",
            padding: "9px 18px",
            borderRadius: 4,
            fontSize: 12.5,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: !fileBase64 || reading || analyzePending ? "default" : "pointer",
          }}
        >
          {analyzePending ? "Analyse..." : "Analyser le document"}
        </button>
        {analyzeState?.error && <span style={{ color: colors.red, fontSize: 12.5 }}>{analyzeState.error}</span>}
      </form>
    )
  }

  const grouped = (["text", "checkbox", "signature"] as const).map((kind) => ({
    kind,
    items: fields.filter((f) => f.kind === kind),
  }))

  return (
    <form
      action={finalizeAction}
      style={{ display: "flex", flexDirection: "column", gap: 16, background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: "16px 18px" }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Nom du modèle</span>
          <input value={nom} onChange={(e) => setNom(e.target.value)} required style={{ ...fieldStyle, minWidth: 260 }} />
        </label>
        <button
          type="button"
          onClick={() => {
            setFields(null)
            setFileBase64(null)
            setFileName("")
          }}
          style={{ background: "transparent", border: "1px solid #d8dde5", color: colors.navy, padding: "9px 14px", borderRadius: 4, fontSize: 12, fontWeight: 700, fontFamily: fontBody, cursor: "pointer" }}
        >
          Recommencer
        </button>
      </div>

      {grouped.map(({ kind, items }) => (
        <div key={kind} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase", letterSpacing: 0.4 }}>
            {KIND_LABELS[kind]} ({items.length})
          </span>
          {items.length === 0 && <span style={{ fontSize: 12, color: colors.textLight }}>Aucun détecté.</span>}
          {items.map((f) => (
            <div
              key={f.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 12px",
                background: "#f5f7fb",
                borderRadius: 6,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 11, color: colors.textLight, minWidth: 24 }}>p{f.page}</span>
              <span style={{ fontSize: 12.5, color: colors.text, flex: "1 1 320px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={f.context}>
                {f.context}
              </span>
              {f.kind === "signature" ? (
                <select value={f.assignedValue} onChange={(e) => updateAssignment(f.id, e.target.value)} style={{ ...fieldStyle, minWidth: 200 }}>
                  <option value="">— Ignorer —</option>
                  {(Object.keys(SIGNATURE_ROLE_LABELS) as RoleSignataire[]).map((role) => (
                    <option key={role} value={role}>
                      {SIGNATURE_ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>
              ) : (
                <select value={f.assignedValue} onChange={(e) => updateAssignment(f.id, e.target.value)} style={{ ...fieldStyle, minWidth: 240 }}>
                  <option value="">— Ignorer —</option>
                  {(f.kind === "checkbox" ? CHECKBOX_VARIABLE_NAMES : TEXT_VARIABLE_NAMES).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      ))}

      {finalizeState?.error && <span style={{ color: colors.red, fontSize: 12.5 }}>{finalizeState.error}</span>}
      {finalizeState?.success && <span style={{ color: "#1a6b3a", fontSize: 12.5, fontWeight: 700 }}>Modèle créé avec succès.</span>}

      <button
        type="submit"
        disabled={finalizePending}
        style={{
          alignSelf: "flex-start",
          background: finalizePending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "11px 20px",
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: finalizePending ? "default" : "pointer",
        }}
      >
        {finalizePending ? "Création..." : "Créer le modèle"}
      </button>
    </form>
  )
}
