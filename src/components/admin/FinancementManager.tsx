"use client"

import { useActionState, useMemo, useState } from "react"
import {
  saveDispositifFormation,
  deleteDispositifFormation,
  setDispositifFormationActif,
  saveLienFormation,
  deleteLienFormation,
  setLienFormationActif,
  saveContactFormation,
  deleteContactFormation,
  setContactFormationActif,
  saveDispositifFormationTableau,
  deleteDispositifFormationTableau,
  setDispositifFormationTableauActif,
  type FinancementActionState,
} from "@/lib/actions/financement"
import { ImageField } from "@/components/admin/ImageField"
import { colors, fontBody } from "@/lib/theme"

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

// ─── Types ───────────────────────────────────────────────

export type AdminLienFormation = { id: string; dispositifId: string; label: string; url: string; ordre: number; actif: boolean }
export type AdminContactFormation = {
  id: string
  dispositifId: string
  zone: string | null
  nom: string
  telephone: string | null
  email: string | null
  ordre: number
  actif: boolean
}
export type AdminDispositifFormationTableau = {
  id: string
  dispositifId: string
  titre: string | null
  entetes: unknown
  lignes: unknown
  ordre: number
  actif: boolean
}
export type AdminDispositifFormation = {
  id: string
  titre: string
  resume: string | null
  contenu: string
  montantMisEnAvant: string | null
  image: string | null
  videoUrl: string | null
  ordre: number
  actif: boolean
  liens: AdminLienFormation[]
  contacts: AdminContactFormation[]
  tableaux: AdminDispositifFormationTableau[]
}

// ─── Écran principal ────────────────────────────────────

type SubPanel = "liens" | "contacts" | "tableaux" | null

export function FinancementManager({ items }: { items: AdminDispositifFormation[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [openPanel, setOpenPanel] = useState<{ id: string; panel: SubPanel } | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>
        Chaque dispositif devient un onglet sur la page publique /financement (Bourse FAFA Formation, Bons de formation, CPF,
        AFDAS...). L&apos;« ordre » détermine la position de l&apos;onglet.
      </p>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un dispositif
        </button>
      )}
      {adding && <DispositifForm onDone={() => setAdding(false)} />}

      {items.map((item) => (
        <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {editingId === item.id ? (
            <DispositifForm item={item} onDone={() => setEditingId(null)} />
          ) : (
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                  <div style={{ fontSize: 12, color: colors.textLight }}>
                    {item.montantMisEnAvant ? `${item.montantMisEnAvant} · ` : ""}ordre {item.ordre}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  {(["liens", "contacts", "tableaux"] as const).map((panel) => (
                    <button
                      key={panel}
                      style={smallButton("neutral")}
                      onClick={() =>
                        setOpenPanel(openPanel?.id === item.id && openPanel.panel === panel ? null : { id: item.id, panel })
                      }
                    >
                      {panel === "liens" ? `Liens (${item.liens.length})` : panel === "contacts" ? `Contacts (${item.contacts.length})` : `Tableaux (${item.tableaux.length})`}
                    </button>
                  ))}
                  <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                    Modifier
                  </button>
                  <ActifToggle actif={item.actif} onToggle={() => setDispositifFormationActif(item.id, !item.actif)} />
                  <DeleteButton label={item.titre} onDelete={() => deleteDispositifFormation(item.id)} />
                </div>
              </div>
            </div>
          )}
          {openPanel?.id === item.id && openPanel.panel === "liens" && <LiensSection dispositifId={item.id} items={item.liens} />}
          {openPanel?.id === item.id && openPanel.panel === "contacts" && (
            <ContactsSection dispositifId={item.id} items={item.contacts} />
          )}
          {openPanel?.id === item.id && openPanel.panel === "tableaux" && (
            <TableauxSection dispositifId={item.id} items={item.tableaux} />
          )}
        </div>
      ))}
      {items.length === 0 && !adding && <EmptyState label="Aucun dispositif de financement." />}
    </div>
  )
}

function DispositifForm({ item, onDone }: { item?: AdminDispositifFormation; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: FinancementActionState | undefined, formData: FormData) => {
      const result = await saveDispositifFormation(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="titre" placeholder="Titre de l'onglet (ex : BOURSE FAFA FORMATION)" required defaultValue={item?.titre} style={fieldStyle} />
        <input name="montantMisEnAvant" placeholder="Montant mis en avant (optionnel)" defaultValue={item?.montantMisEnAvant ?? ""} style={fieldStyle} />
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
        <input name="resume" placeholder="Phrase d'accroche courte (optionnel)" defaultValue={item?.resume ?? ""} style={{ ...fieldStyle, gridColumn: "1/-1" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <ImageField name="image" label="Logo du dispositif (optionnel)" defaultUrl={item?.image} />
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Vidéo (optionnel)</span>
          <input name="videoUrl" placeholder="Lien YouTube ou fichier /videos/xxx.mp4" defaultValue={item?.videoUrl ?? ""} style={fieldStyle} />
        </label>
      </div>

      <label style={{ display: "flex", flexDirection: "column", gap: 5, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Contenu complet</span>
        <textarea
          name="contenu"
          placeholder="Texte complet du dispositif (un saut de ligne double = nouveau paragraphe)"
          required
          rows={10}
          defaultValue={item?.contenu}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </label>

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

// ─── Liens (bannières CTA) ──────────────────────────────

function LiensSection({ dispositifId, items }: { dispositifId: string; items: AdminLienFormation[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ ...cardStyle, background: colors.bg, gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Liens (bannières cliquables)</span>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un lien
        </button>
      )}
      {adding && <LienForm dispositifId={dispositifId} onDone={() => setAdding(false)} />}
      {items.map((item) =>
        editingId === item.id ? (
          <LienForm key={item.id} dispositifId={dispositifId} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={{ ...cardStyle, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{item.label}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>{item.url}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setLienFormationActif(item.id, !item.actif)} />
                <DeleteButton label={item.label} onDelete={() => deleteLienFormation(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun lien pour ce dispositif." />}
    </div>
  )
}

function LienForm({ dispositifId, item, onDone }: { dispositifId: string; item?: AdminLienFormation; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: FinancementActionState | undefined, formData: FormData) => {
      const result = await saveLienFormation(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, background: "#fff", border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="dispositifId" value={dispositifId} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
        <input name="label" placeholder="Libellé (ex : Demande de bourse - porteur de projet stagiaire)" required defaultValue={item?.label} style={{ ...fieldStyle, gridColumn: "1/-1" }} />
        <input name="url" placeholder="URL" required defaultValue={item?.url} style={fieldStyle} />
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

// ─── Contacts régionaux ──────────────────────────────────

function ContactsSection({ dispositifId, items }: { dispositifId: string; items: AdminContactFormation[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ ...cardStyle, background: colors.bg, gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Contacts régionaux</span>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un contact
        </button>
      )}
      {adding && <ContactForm dispositifId={dispositifId} onDone={() => setAdding(false)} />}
      {items.map((item) =>
        editingId === item.id ? (
          <ContactForm key={item.id} dispositifId={dispositifId} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={{ ...cardStyle, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{item.nom}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {[item.zone, item.telephone, item.email].filter(Boolean).join(" · ")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setContactFormationActif(item.id, !item.actif)} />
                <DeleteButton label={item.nom} onDelete={() => deleteContactFormation(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun contact pour ce dispositif." />}
    </div>
  )
}

function ContactForm({ dispositifId, item, onDone }: { dispositifId: string; item?: AdminContactFormation; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: FinancementActionState | undefined, formData: FormData) => {
      const result = await saveContactFormation(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, background: "#fff", border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="dispositifId" value={dispositifId} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
        <input name="zone" placeholder="Zone/territoire (optionnel)" defaultValue={item?.zone ?? ""} style={{ ...fieldStyle, gridColumn: "1/-1" }} />
        <input name="nom" placeholder="Nom" required defaultValue={item?.nom} style={fieldStyle} />
        <input name="telephone" placeholder="Téléphone" defaultValue={item?.telephone ?? ""} style={fieldStyle} />
        <input name="email" type="email" placeholder="Email" defaultValue={item?.email ?? ""} style={fieldStyle} />
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

// ─── Tableaux ─────────────────────────────────────────────

function TableauxSection({ dispositifId, items }: { dispositifId: string; items: AdminDispositifFormationTableau[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ ...cardStyle, background: colors.bg, gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Tableaux (calendrier, récapitulatif...)</span>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un tableau
        </button>
      )}
      {adding && <TableauForm dispositifId={dispositifId} onDone={() => setAdding(false)} />}
      {items.map((item) =>
        editingId === item.id ? (
          <TableauForm key={item.id} dispositifId={dispositifId} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={{ ...cardStyle, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{item.titre || "(sans titre)"}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {(item.entetes as string[]).length} colonnes · {(item.lignes as string[][]).length} lignes
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setDispositifFormationTableauActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre || "ce tableau"} onDelete={() => deleteDispositifFormationTableau(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun tableau pour ce dispositif." />}
    </div>
  )
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

function TableauForm({
  dispositifId,
  item,
  onDone,
}: {
  dispositifId: string
  item?: AdminDispositifFormationTableau
  onDone: () => void
}) {
  const [entetes, setEntetes] = useState<string[]>((item?.entetes as string[]) ?? ["Colonne 1", "Colonne 2"])
  const [lignes, setLignes] = useState<string[][]>((item?.lignes as string[][]) ?? [["", ""]])

  const entetesJson = useMemo(() => JSON.stringify(entetes), [entetes])
  const lignesJson = useMemo(() => JSON.stringify(lignes), [lignes])

  const [state, formAction, pending] = useActionState(
    async (prev: FinancementActionState | undefined, formData: FormData) => {
      const result = await saveDispositifFormationTableau(prev, formData)
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
      <input type="hidden" name="dispositifId" value={dispositifId} />
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
