"use client"

import { useActionState, useMemo, useState } from "react"
import { colors, fontBody } from "@/lib/theme"
import { CATEGORIE_LABELS } from "@/lib/formations-shared"
import { createArticle, updateArticle, type ArticleActionState } from "@/lib/actions/articles"
import { ImageField } from "@/components/admin/ImageField"
import { VideoField } from "@/components/admin/VideoField"
import { StepTableEditor, type StepTable } from "@/components/admin/FormationForm"
import type { CategorieFormation } from "@/generated/prisma"
import type { ArticleSection } from "@/lib/articles-shared"

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
  background: "transparent",
  border: "1px dashed #c7ceda",
  color: colors.navy,
  padding: "7px 12px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
}

const removeButtonStyle = {
  background: "transparent",
  border: "1px solid #f3c6cb",
  color: colors.red,
  padding: "7px 12px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
  alignSelf: "flex-start" as const,
}

export type ArticleFormInitial = {
  titre: string
  slug: string
  contenu: string
  textePartage: string
  image: string
  imageCouvertureVisible: boolean
  categorie: CategorieFormation | ""
  publie: boolean
  diffuserReseaux: boolean
  sections: ArticleSection[]
}

function SectionEditor({
  sections,
  setSections,
}: {
  sections: ArticleSection[]
  setSections: (fn: (s: ArticleSection[]) => ArticleSection[]) => void
}) {
  function updateSection(i: number, patch: Partial<ArticleSection>) {
    setSections((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {sections.map((section, i) => (
        <div
          key={i}
          style={{ display: "flex", flexDirection: "column", gap: 10, background: "#f5f7fb", borderRadius: 8, padding: 14 }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, minWidth: 24, paddingTop: 10 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                placeholder="Titre de la section"
                value={section.title}
                onChange={(e) => updateSection(i, { title: e.target.value })}
                style={fieldStyle}
              />
              <textarea
                placeholder="Description"
                value={section.desc}
                onChange={(e) => updateSection(i, { desc: e.target.value })}
                rows={3}
                style={{ ...fieldStyle, resize: "vertical" }}
              />

              {section.table ? (
                <StepTableEditor
                  table={section.table}
                  setTable={(fn) => updateSection(i, { table: fn(section.table as StepTable) })}
                  onRemove={() => updateSection(i, { table: undefined })}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => updateSection(i, { table: { headers: ["Colonne 1"], rows: [[""]] } })}
                  style={{ ...addButtonStyle, alignSelf: "flex-start" }}
                >
                  + Tableau
                </button>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {(section.images ?? []).map((img, j) => (
                  <div key={j} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <ImageField name={`sectionImage_${i}_${j}`} label={`Image ${j + 1}`} defaultUrl={img} />
                    <button
                      type="button"
                      onClick={() => updateSection(i, { images: (section.images ?? []).filter((_, idx) => idx !== j) })}
                      style={{ ...removeButtonStyle, alignSelf: "flex-start" }}
                    >
                      Retirer l&apos;image
                    </button>
                  </div>
                ))}
                <input type="hidden" name={`sectionImageCount_${i}`} value={(section.images ?? []).length} />
                <button
                  type="button"
                  onClick={() => updateSection(i, { images: [...(section.images ?? []), ""] })}
                  style={{ ...addButtonStyle, alignSelf: "flex-start" }}
                >
                  + Image
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <input
                  placeholder="Lien vidéo YouTube (optionnel)"
                  value={section.videoUrl ?? ""}
                  onChange={(e) => updateSection(i, { videoUrl: e.target.value })}
                  style={fieldStyle}
                />
                <VideoField
                  name={`sectionVideo_${i}`}
                  label="Ou fichier vidéo direct (optionnel)"
                  defaultUrl={section.videoFichierUrl}
                  keyHint={`articles-sections-videos/${i}`}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, background: "#fff", border: "1px solid #e2e5ea", borderRadius: 6, padding: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Lien de redirection (optionnel)</span>
                <div style={{ display: "flex", gap: 14 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: colors.text }}>
                    <input
                      type="radio"
                      name={`sectionLienType_${i}`}
                      value="INTERNE"
                      checked={(section.lien?.type ?? "INTERNE") === "INTERNE"}
                      onChange={() => updateSection(i, { lien: { type: "INTERNE", url: section.lien?.url ?? "", label: section.lien?.label ?? "" } })}
                    />
                    Page interne
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: colors.text }}>
                    <input
                      type="radio"
                      name={`sectionLienType_${i}`}
                      value="EXTERNE"
                      checked={section.lien?.type === "EXTERNE"}
                      onChange={() => updateSection(i, { lien: { type: "EXTERNE", url: section.lien?.url ?? "", label: section.lien?.label ?? "" } })}
                    />
                    URL externe
                  </label>
                </div>
                <input
                  name={`sectionLienUrl_${i}`}
                  placeholder="Ex : /formations ou https://..."
                  value={section.lien?.url ?? ""}
                  onChange={(e) => updateSection(i, { lien: { type: section.lien?.type ?? "INTERNE", url: e.target.value, label: section.lien?.label ?? "" } })}
                  style={fieldStyle}
                />
                <input
                  name={`sectionLienLabel_${i}`}
                  placeholder="Texte du bouton (ex : Voir les formations)"
                  value={section.lien?.label ?? ""}
                  onChange={(e) => updateSection(i, { lien: { type: section.lien?.type ?? "INTERNE", url: section.lien?.url ?? "", label: e.target.value } })}
                  style={fieldStyle}
                />
              </div>
            </div>
            <button type="button" onClick={() => setSections((prev) => prev.filter((_, idx) => idx !== i))} style={removeButtonStyle}>
              Retirer
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => setSections((prev) => [...prev, { n: "", title: "", desc: "" }])} style={addButtonStyle}>
        + Ajouter une section
      </button>
    </div>
  )
}

export function ArticleForm({
  id,
  initial,
  submitLabel,
}: {
  id?: string
  initial?: ArticleFormInitial
  submitLabel: string
}) {
  const [state, formAction, isPending] = useActionState(
    (prevState: ArticleActionState | undefined, formData: FormData) =>
      id ? updateArticle(id, formData) : createArticle(prevState, formData),
    undefined
  )
  const [sections, setSections] = useState<ArticleSection[]>(initial?.sections ?? [])
  const sectionsJson = useMemo(
    () => JSON.stringify(sections.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0") }))),
    [sections]
  )

  return (
    <form
      action={formAction}
      style={{
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: "clamp(18px,3vw,28px)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 720,
      }}
    >
      <input type="hidden" name="sections" value={sectionsJson} />

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Titre</span>
        <input name="titre" required defaultValue={initial?.titre} style={fieldStyle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>
          Slug (utilisé dans l&apos;URL /actualites/…)
        </span>
        <input name="slug" required defaultValue={initial?.slug} style={fieldStyle} />
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 8 }}>
          <ImageField name="image" label="Image" defaultUrl={initial?.image} />
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: colors.text }}>
            <input
              type="checkbox"
              name="imageCouvertureVisible"
              defaultChecked={initial?.imageCouvertureVisible ?? true}
              style={{ width: 15, height: 15 }}
            />
            Afficher cette image en haut de l&apos;actualité (reste toujours visible dans la liste)
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: "1 1 200px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Catégorie</span>
          <select name="categorie" defaultValue={initial?.categorie ?? ""} style={fieldStyle}>
            <option value="">Aucune (générique IR2F)</option>
            {Object.entries(CATEGORIE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Contenu</span>
        <textarea
          name="contenu"
          required
          rows={12}
          defaultValue={initial?.contenu}
          style={{ ...fieldStyle, resize: "vertical", fontFamily: "monospace" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Texte de partage (optionnel)</span>
        <span style={{ fontSize: 11.5, color: colors.textLight }}>
          Texte court utilisé comme légende quand l&apos;article est partagé sur les réseaux sociaux (bouton
          Partager, aperçu Facebook). Laissez vide pour utiliser le début du contenu.
        </span>
        <textarea
          name="textePartage"
          rows={3}
          defaultValue={initial?.textePartage}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: colors.navy }}>Sections (photos, vidéos, tableaux, lien)</span>
        <SectionEditor sections={sections} setSections={setSections} />
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
        <input type="checkbox" name="publie" defaultChecked={initial?.publie} style={{ width: 15, height: 15 }} />
        Publié (visible sur le site public)
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
        <input
          type="checkbox"
          name="diffuserReseaux"
          defaultChecked={initial?.diffuserReseaux ?? true}
          style={{ width: 15, height: 15 }}
        />
        Diffuser sur les réseaux (apparaît dans «&nbsp;À publier&nbsp;» une fois publié)
      </label>

      {state?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        style={{
          alignSelf: "flex-start",
          background: isPending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Enregistrement..." : submitLabel}
      </button>
    </form>
  )
}
