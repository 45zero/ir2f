"use client"

import { useActionState, useMemo, useState } from "react"
import {
  saveFormationTuile,
  saveFormationOnglet,
  saveFormationOngletTableau,
  deleteFormationOngletTableau,
  setFormationOngletTableauActif,
  saveFormationOngletSection,
  deleteFormationOngletSection,
  setFormationOngletSectionActif,
  type FormationsPageActionState,
} from "@/lib/actions/formations-page"
import { EFFET_VISUEL_LABELS, ONGLET_LABEL } from "@/lib/formations-page-shared"
import { CATEGORIE_LABELS } from "@/lib/formations-shared"
import { ImageField } from "@/components/admin/ImageField"
import { VideoField } from "@/components/admin/VideoField"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type {
  AdminFormationOnglet,
  AdminFormationOngletTableau,
  AdminFormationOngletSection,
  AdminFormationOption,
  AdminFormationTuile,
} from "@/lib/admin/formations-page"
import type { CategorieFormation, FormationOngletCle } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const sectionCardStyle = {
  background: "#fff",
  border: "1px solid #eef0f3",
  borderRadius: 10,
  padding: "clamp(16px,3vw,24px)",
  display: "flex",
  flexDirection: "column" as const,
  gap: 14,
}

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

const cardStyle = {
  background: "#fff",
  border: "1px solid #eef0f3",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
}

const tableRemoveButtonStyle = {
  border: "1px solid #f3c6cb",
  background: "transparent",
  color: colors.red,
  borderRadius: 4,
  width: 22,
  height: 22,
  fontSize: 11,
  cursor: "pointer",
  flexShrink: 0,
}

function ActifToggle({ actif, onToggle }: { actif: boolean; onToggle: () => void }) {
  return (
    <form action={onToggle}>
      <button type="submit" style={smallButton("neutral")}>
        {actif ? "Désactiver" : "Activer"}
      </button>
    </form>
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

function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20, color: colors.textLight, fontSize: 13 }}>
      {label}
    </div>
  )
}

function fieldLabel(text: string) {
  return <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>{text}</span>
}

function VisualFields({
  backgroundColor,
  opacity,
  effetVisuel,
}: {
  backgroundColor: string
  opacity: number
  effetVisuel: string
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10, alignItems: "center" }}>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: colors.textLight }}>
        Couleur de fond
        <input
          name="backgroundColor"
          type="color"
          defaultValue={backgroundColor}
          style={{ width: 44, height: 30, border: "1px solid #e2e5ea", borderRadius: 5, padding: 2, cursor: "pointer" }}
        />
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: colors.textLight }}>
        Opacité de l&apos;image
        <input name="opacity" type="range" min={0} max={100} defaultValue={opacity} style={{ flex: 1 }} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 12.5, color: colors.textLight }}>Effet visuel</span>
        <select name="effetVisuel" defaultValue={effetVisuel} style={fieldStyle}>
          {Object.entries(EFFET_VISUEL_LABELS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

// ─── Tuiles catégories ──────────────────────────────────

function TuileForm({ tuile }: { tuile: AdminFormationTuile }) {
  const [state, formAction, pending] = useActionState(
    (prev: FormationsPageActionState | undefined, formData: FormData) => saveFormationTuile(tuile.categorie, prev, formData),
    undefined
  )

  return (
    <form action={formAction} style={sectionCardStyle}>
      <h3 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 15, fontWeight: 800, margin: 0 }}>
        Tuile « {CATEGORIE_LABELS[tuile.categorie]} »
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {fieldLabel("Libellé affiché")}
        <input name="label" required defaultValue={tuile.label} style={fieldStyle} />
      </div>

      <ImageField name="image" label="Image de fond (optionnel)" defaultUrl={tuile.image} />

      <VisualFields backgroundColor={tuile.backgroundColor} opacity={tuile.opacity} effetVisuel={tuile.effetVisuel} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10, alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: colors.textLight }}>
          Couleur du texte
          <input
            name="textColor"
            type="color"
            defaultValue={tuile.textColor}
            style={{ width: 44, height: 30, border: "1px solid #e2e5ea", borderRadius: 5, padding: 2, cursor: "pointer" }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 12.5, color: colors.textLight }}>Police du texte</span>
          <select name="textFont" defaultValue={tuile.textFont} style={fieldStyle}>
            <option value="HEADING">Titre (Barlow)</option>
            <option value="BODY">Texte courant (Inter)</option>
          </select>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: colors.textLight }}>
          Couleur de la flèche
          <input
            name="arrowColor"
            type="color"
            defaultValue={tuile.arrowColor}
            style={{ width: 44, height: 30, border: "1px solid #e2e5ea", borderRadius: 5, padding: 2, cursor: "pointer" }}
          />
        </label>
      </div>

      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button type="submit" disabled={pending} style={submitButtonStyle}>
          {pending ? "Enregistrement..." : "Enregistrer"}
        </button>
        {state && !state.error && <span style={{ color: "#3f9142", fontSize: 12.5, fontWeight: 600 }}>Enregistré.</span>}
      </div>
    </form>
  )
}

function TuilesSection({ tuiles }: { tuiles: AdminFormationTuile[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 19, fontWeight: 800, margin: 0 }}>
          Tuiles catégories
        </h2>
        <p style={{ color: colors.textLight, fontSize: 12.5, margin: "4px 0 0" }}>
          Les 4 cartes cliquables en haut de la page « Nos Formations ».
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {tuiles.map((t) => (
          <TuileForm key={t.categorie} tuile={t} />
        ))}
      </div>
    </div>
  )
}

// ─── Tableaux (onglets) ─────────────────────────────────

function TableauxSection({
  categorie,
  onglet,
  items,
}: {
  categorie: CategorieFormation
  onglet: FormationOngletCle
  items: AdminFormationOngletTableau[]
}) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ ...cardStyle, background: colors.bg, gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Tableaux (lignes et colonnes libres)</span>
      {!adding && (
        <button type="button" style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un tableau
        </button>
      )}
      {adding && <TableauForm categorie={categorie} onglet={onglet} onDone={() => setAdding(false)} />}
      {items.map((item) =>
        editingId === item.id ? (
          <TableauForm key={item.id} categorie={categorie} onglet={onglet} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={{ ...cardStyle, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{item.titre || "(sans titre)"}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {item.entetes.length} colonnes · {item.lignes.length} lignes
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button type="button" style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setFormationOngletTableauActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre || "ce tableau"} onDelete={() => deleteFormationOngletTableau(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun tableau pour cet onglet." />}
    </div>
  )
}

function TableauForm({
  categorie,
  onglet,
  item,
  onDone,
}: {
  categorie: CategorieFormation
  onglet: FormationOngletCle
  item?: AdminFormationOngletTableau
  onDone: () => void
}) {
  const [entetes, setEntetes] = useState<string[]>(item?.entetes ?? ["Colonne 1", "Colonne 2"])
  const [lignes, setLignes] = useState<string[][]>(item?.lignes ?? [["", ""]])

  const entetesJson = useMemo(() => JSON.stringify(entetes), [entetes])
  const lignesJson = useMemo(() => JSON.stringify(lignes), [lignes])

  const [state, formAction, pending] = useActionState(
    async (prev: FormationsPageActionState | undefined, formData: FormData) => {
      const result = await saveFormationOngletTableau(categorie, onglet, prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  function addColumn() {
    setEntetes((e) => [...e, `Colonne ${e.length + 1}`])
    setLignes((rows) => rows.map((row) => [...row, ""]))
  }

  function removeColumn(colIdx: number) {
    setEntetes((e) => e.filter((_, i) => i !== colIdx))
    setLignes((rows) => rows.map((row) => row.filter((_, i) => i !== colIdx)))
  }

  function addRow() {
    setLignes((rows) => [...rows, entetes.map(() => "")])
  }

  function removeRow(rowIdx: number) {
    setLignes((rows) => rows.filter((_, i) => i !== rowIdx))
  }

  return (
    <form action={formAction} style={{ ...cardStyle, background: "#fff", border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="entetes" value={entetesJson} />
      <input type="hidden" name="lignes" value={lignesJson} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
        <input name="titre" placeholder="Titre du tableau (optionnel)" defaultValue={item?.titre ?? ""} style={fieldStyle} />
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              {entetes.map((h, colIdx) => (
                <th key={colIdx} style={{ padding: 4 }}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <input
                      value={h}
                      onChange={(e) => setEntetes((es) => es.map((ee, i) => (i === colIdx ? e.target.value : ee)))}
                      style={{ ...fieldStyle, fontWeight: 700, minWidth: 100 }}
                    />
                    {entetes.length > 1 && (
                      <button type="button" onClick={() => removeColumn(colIdx)} style={tableRemoveButtonStyle}>
                        ✕
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th style={{ padding: 4 }}>
                <button type="button" onClick={addColumn} style={addButtonStyle}>
                  + Colonne
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => (
                  <td key={colIdx} style={{ padding: 4 }}>
                    <input
                      value={cell}
                      onChange={(e) =>
                        setLignes((rows) =>
                          rows.map((r, rIdx) => (rIdx === rowIdx ? r.map((c, cIdx) => (cIdx === colIdx ? e.target.value : c)) : r))
                        )
                      }
                      style={{ ...fieldStyle, minWidth: 100 }}
                    />
                  </td>
                ))}
                <td style={{ padding: 4 }}>
                  <button type="button" onClick={() => removeRow(rowIdx)} style={tableRemoveButtonStyle}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={addRow} style={addButtonStyle}>
        + Ligne
      </button>

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

// ─── Sections libres (Arbitres, Tout Terrain, Développement) ────

function SectionsSection({
  categorie,
  onglet,
  items,
}: {
  categorie: CategorieFormation
  onglet: FormationOngletCle
  items: AdminFormationOngletSection[]
}) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ ...cardStyle, background: colors.bg, gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>
        Sections supplémentaires (empilées sous le contenu ci-dessus)
      </span>
      {!adding && (
        <button type="button" style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter une section
        </button>
      )}
      {adding && <SectionForm categorie={categorie} onglet={onglet} onDone={() => setAdding(false)} />}
      {items.map((item) =>
        editingId === item.id ? (
          <SectionForm key={item.id} categorie={categorie} onglet={onglet} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={{ ...cardStyle, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{item.titre || "(sans titre)"}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {item.images.length} image{item.images.length > 1 ? "s" : ""}
                  {item.videoUrl || item.videoFichierUrl ? " · vidéo" : ""}
                  {item.tableauEntetes ? " · tableau" : ""}
                  {item.lienUrl ? " · lien" : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button type="button" style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setFormationOngletSectionActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre || "cette section"} onDelete={() => deleteFormationOngletSection(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucune section supplémentaire." />}
    </div>
  )
}

function SectionForm({
  categorie,
  onglet,
  item,
  onDone,
}: {
  categorie: CategorieFormation
  onglet: FormationOngletCle
  item?: AdminFormationOngletSection
  onDone: () => void
}) {
  const [images, setImages] = useState<string[]>(item?.images ?? [])
  const [hasTableau, setHasTableau] = useState(Boolean(item?.tableauEntetes))
  const [tableauEntetes, setTableauEntetes] = useState<string[]>(item?.tableauEntetes ?? ["Colonne 1"])
  const [tableauLignes, setTableauLignes] = useState<string[][]>(item?.tableauLignes ?? [[""]])

  const tableauEntetesJson = useMemo(() => JSON.stringify(hasTableau ? tableauEntetes : []), [hasTableau, tableauEntetes])
  const tableauLignesJson = useMemo(() => JSON.stringify(hasTableau ? tableauLignes : []), [hasTableau, tableauLignes])

  const [state, formAction, pending] = useActionState(
    async (prev: FormationsPageActionState | undefined, formData: FormData) => {
      const result = await saveFormationOngletSection(categorie, onglet, prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  function addTableColumn() {
    setTableauEntetes((e) => [...e, `Colonne ${e.length + 1}`])
    setTableauLignes((rows) => rows.map((row) => [...row, ""]))
  }

  function removeTableColumn(colIdx: number) {
    setTableauEntetes((e) => e.filter((_, i) => i !== colIdx))
    setTableauLignes((rows) => rows.map((row) => row.filter((_, i) => i !== colIdx)))
  }

  function addTableRow() {
    setTableauLignes((rows) => [...rows, tableauEntetes.map(() => "")])
  }

  function removeTableRow(rowIdx: number) {
    setTableauLignes((rows) => rows.filter((_, i) => i !== rowIdx))
  }

  return (
    <form action={formAction} style={{ ...cardStyle, background: "#fff", border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="imageCount" value={images.length} />
      <input type="hidden" name="tableauEntetes" value={tableauEntetesJson} />
      <input type="hidden" name="tableauLignes" value={tableauLignesJson} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
        <input name="titre" placeholder="Titre de la section (optionnel)" defaultValue={item?.titre ?? ""} style={fieldStyle} />
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
      </div>

      <textarea
        name="contenu"
        placeholder="Texte (optionnel)"
        rows={4}
        defaultValue={item?.contenu ?? ""}
        style={{ ...fieldStyle, resize: "vertical" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {fieldLabel("Images")}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {images.map((img, j) => (
            <div key={j} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <ImageField name={`image_${j}`} label={`Image ${j + 1}`} defaultUrl={img} />
              <button
                type="button"
                onClick={() => setImages((imgs) => imgs.filter((_, idx) => idx !== j))}
                style={{ ...smallButton("danger"), alignSelf: "flex-start" }}
              >
                Retirer l&apos;image
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setImages((imgs) => [...imgs, ""])} style={addButtonStyle}>
            + Image
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {fieldLabel("Vidéo (optionnel)")}
        <input name="videoUrl" placeholder="Lien YouTube" defaultValue={item?.videoUrl ?? ""} style={fieldStyle} />
        <VideoField
          name="videoFichier"
          label="Ou fichier vidéo direct"
          defaultUrl={item?.videoFichierUrl}
          keyHint={`formations-sections-videos/${categorie.toLowerCase()}-${onglet.toLowerCase()}`}
        />
      </div>

      {hasTableau ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {fieldLabel("Tableau")}
          <input name="tableauTitre" placeholder="Titre du tableau (optionnel)" defaultValue={item?.tableauTitre ?? ""} style={fieldStyle} />
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  {tableauEntetes.map((h, colIdx) => (
                    <th key={colIdx} style={{ padding: 4 }}>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <input
                          value={h}
                          onChange={(e) => setTableauEntetes((es) => es.map((ee, i) => (i === colIdx ? e.target.value : ee)))}
                          style={{ ...fieldStyle, fontWeight: 700, minWidth: 100 }}
                        />
                        {tableauEntetes.length > 1 && (
                          <button type="button" onClick={() => removeTableColumn(colIdx)} style={tableRemoveButtonStyle}>
                            ✕
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                  <th style={{ padding: 4 }}>
                    <button type="button" onClick={addTableColumn} style={addButtonStyle}>
                      + Colonne
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableauLignes.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, colIdx) => (
                      <td key={colIdx} style={{ padding: 4 }}>
                        <input
                          value={cell}
                          onChange={(e) =>
                            setTableauLignes((rows) =>
                              rows.map((r, rIdx) => (rIdx === rowIdx ? r.map((c, cIdx) => (cIdx === colIdx ? e.target.value : c)) : r))
                            )
                          }
                          style={{ ...fieldStyle, minWidth: 100 }}
                        />
                      </td>
                    ))}
                    <td style={{ padding: 4 }}>
                      <button type="button" onClick={() => removeTableRow(rowIdx)} style={tableRemoveButtonStyle}>
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={addTableRow} style={addButtonStyle}>
              + Ligne
            </button>
            <button type="button" onClick={() => setHasTableau(false)} style={smallButton("danger")}>
              Retirer le tableau
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setHasTableau(true)} style={{ ...addButtonStyle, alignSelf: "flex-start" }}>
          + Tableau
        </button>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {fieldLabel("Lien (optionnel)")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
          <input name="lienLabel" placeholder="Libellé du bouton" defaultValue={item?.lienLabel ?? ""} style={fieldStyle} />
          <input name="lienUrl" placeholder="URL" defaultValue={item?.lienUrl ?? ""} style={fieldStyle} />
        </div>
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

// ─── Onglets ────────────────────────────────────────────

function OngletForm({ onglet, formationOptions }: { onglet: AdminFormationOnglet; formationOptions: AdminFormationOption[] }) {
  const showVedette = onglet.onglet === "INFO" && (onglet.categorie === "ARBITRAGE" || onglet.categorie === "DEV")
  const vedetteOptions = formationOptions.filter((f) => f.categorie === onglet.categorie)
  const [state, formAction, pending] = useActionState(
    (prev: FormationsPageActionState | undefined, formData: FormData) =>
      saveFormationOnglet(onglet.categorie, onglet.onglet, prev, formData),
    undefined
  )

  return (
    <div style={sectionCardStyle}>
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h3 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 15, fontWeight: 800, margin: 0 }}>
        {ONGLET_LABEL[onglet.onglet]}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {fieldLabel("Titre (optionnel)")}
        <input name="titre" defaultValue={onglet.titre ?? ""} style={fieldStyle} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {fieldLabel("Contenu (optionnel)")}
        <textarea
          name="contenu"
          rows={5}
          defaultValue={onglet.contenu ?? ""}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {fieldLabel("Vidéo — lien YouTube (optionnel)")}
        <input name="videoUrl" placeholder="Lien YouTube" defaultValue={onglet.videoUrl ?? ""} style={fieldStyle} />
      </div>

      <VideoField
        name="videoFichier"
        label="Vidéo — ou fichier vidéo direct (optionnel)"
        defaultUrl={onglet.videoFichierUrl}
        keyHint={`formations-onglets-videos/${onglet.categorie.toLowerCase()}-${onglet.onglet.toLowerCase()}`}
      />

      <ImageField name="image" label="Image (optionnel, affichée si pas de vidéo)" defaultUrl={onglet.image} />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 12.5, color: colors.textLight }}>Taille de l&apos;image ({onglet.imageTaille}%)</span>
        <input name="imageTaille" type="range" min={20} max={100} defaultValue={onglet.imageTaille} />
      </div>

      <VisualFields backgroundColor={onglet.backgroundColor} opacity={onglet.opacity} effetVisuel={onglet.effetVisuel} />

      {showVedette && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {fieldLabel("Formation vedette (durée/format/CPF + bouton «Voir la fiche complète» repris automatiquement)")}
          <select name="formationVedetteId" defaultValue={onglet.formationVedetteId ?? ""} style={fieldStyle}>
            <option value="">— Aucune —</option>
            {vedetteOptions.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titre}
              </option>
            ))}
          </select>
        </div>
      )}

      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button type="submit" disabled={pending} style={submitButtonStyle}>
          {pending ? "Enregistrement..." : "Enregistrer"}
        </button>
        {state && !state.error && <span style={{ color: "#3f9142", fontSize: 12.5, fontWeight: 600 }}>Enregistré.</span>}
      </div>
      </form>

      <TableauxSection categorie={onglet.categorie} onglet={onglet.onglet} items={onglet.tableaux} />

      {onglet.categorie !== "EDUCATEUR" && (
        <SectionsSection categorie={onglet.categorie} onglet={onglet.onglet} items={onglet.sections} />
      )}
    </div>
  )
}

function OngletsParCategorie({
  categorie,
  onglets,
  formationOptions,
}: {
  categorie: AdminFormationOnglet["categorie"]
  onglets: AdminFormationOnglet[]
  formationOptions: AdminFormationOption[]
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 19, fontWeight: 800, margin: 0 }}>
        Onglets — {CATEGORIE_LABELS[categorie]}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        {onglets.map((o) => (
          <OngletForm key={`${o.categorie}-${o.onglet}`} onglet={o} formationOptions={formationOptions} />
        ))}
      </div>
    </div>
  )
}

// ─── Écran principal ────────────────────────────────────

export function FormationsPageManager({
  tuiles,
  onglets,
  formationOptions,
}: {
  tuiles: AdminFormationTuile[]
  onglets: AdminFormationOnglet[]
  formationOptions: AdminFormationOption[]
}) {
  const categories = Array.from(new Set(onglets.map((o) => o.categorie)))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <TuilesSection tuiles={tuiles} />
      {categories.map((categorie) => (
        <OngletsParCategorie
          key={categorie}
          categorie={categorie}
          onglets={onglets.filter((o) => o.categorie === categorie)}
          formationOptions={formationOptions}
        />
      ))}
    </div>
  )
}
