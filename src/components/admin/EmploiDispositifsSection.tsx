"use client"

import { useActionState, useState } from "react"
import {
  saveDispositifFinancement,
  deleteDispositifFinancement,
  setDispositifFinancementActif,
  saveReferentEmploi,
  deleteReferentEmploi,
  setReferentEmploiActif,
  type EmploiActionState,
} from "@/lib/actions/emploi"
import { ImageField } from "@/components/admin/ImageField"
import { colors, fontBody } from "@/lib/theme"
import type { AdminDispositifFinancement, AdminReferentEmploi } from "@/components/admin/EmploiManager"

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

// ─── Dispositifs (onglets "Financements") ──────────────────

export function EmploiDispositifsSection({ items }: { items: AdminDispositifFinancement[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [referentsOpenId, setReferentsOpenId] = useState<string | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>
        Chaque dispositif devient un onglet dans la section « Financements & Subventions » de la page /emploi (FAFA Emploi, ANS Emploi,
        Conseil Régional...). L&apos;« ordre » détermine la position de l&apos;onglet.
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
                  <button style={smallButton("neutral")} onClick={() => setReferentsOpenId(referentsOpenId === item.id ? null : item.id)}>
                    Référents ({item.referents.length})
                  </button>
                  <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                    Modifier
                  </button>
                  <ActifToggle actif={item.actif} onToggle={() => setDispositifFinancementActif(item.id, !item.actif)} />
                  <DeleteButton label={item.titre} onDelete={() => deleteDispositifFinancement(item.id)} />
                </div>
              </div>
            </div>
          )}
          {referentsOpenId === item.id && <ReferentsSection dispositifId={item.id} items={item.referents} />}
        </div>
      ))}
      {items.length === 0 && !adding && <EmptyState label="Aucun dispositif de financement." />}
    </div>
  )
}

function DispositifForm({ item, onDone }: { item?: AdminDispositifFinancement; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: EmploiActionState | undefined, formData: FormData) => {
      const result = await saveDispositifFinancement(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="titre" placeholder="Titre de l'onglet (ex : FAFA EMPLOI)" required defaultValue={item?.titre} style={fieldStyle} />
        <input name="montantMisEnAvant" placeholder="Montant mis en avant (optionnel)" defaultValue={item?.montantMisEnAvant ?? ""} style={fieldStyle} />
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
        <input name="resume" placeholder="Phrase d'accroche courte (optionnel)" defaultValue={item?.resume ?? ""} style={{ ...fieldStyle, gridColumn: "1/-1" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <ImageField name="image" label="Logo du dispositif (optionnel)" defaultUrl={item?.image} />
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Vidéo (optionnel)</span>
          <input name="videoUrl" placeholder="Lien YouTube" defaultValue={item?.videoUrl ?? ""} style={fieldStyle} />
        </label>
      </div>

      <label style={{ display: "flex", flexDirection: "column", gap: 5, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Contenu complet</span>
        <textarea
          name="contenu"
          placeholder="Montants, conditions, informations importantes... (un saut de ligne double = nouveau paragraphe)"
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

// ─── Référents régionaux (rattachés à un dispositif) ────────

function ReferentsSection({ dispositifId, items }: { dispositifId: string; items: AdminReferentEmploi[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ ...cardStyle, background: colors.bg, gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Référents (département / référent / mail / code fiche)</span>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un référent
        </button>
      )}
      {adding && <ReferentForm dispositifId={dispositifId} onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <ReferentForm key={item.id} dispositifId={dispositifId} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={{ ...cardStyle, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{item.departement}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {[item.referent, item.email, item.codeFiche].filter(Boolean).join(" · ")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setReferentEmploiActif(item.id, !item.actif)} />
                <DeleteButton label={item.departement} onDelete={() => deleteReferentEmploi(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun référent pour ce dispositif." />}
    </div>
  )
}

function ReferentForm({
  dispositifId,
  item,
  onDone,
}: {
  dispositifId: string
  item?: AdminReferentEmploi
  onDone: () => void
}) {
  const [state, formAction, pending] = useActionState(
    async (prev: EmploiActionState | undefined, formData: FormData) => {
      const result = await saveReferentEmploi(prev, formData)
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
        <input name="departement" placeholder="Département" required defaultValue={item?.departement} style={fieldStyle} />
        <input name="referent" placeholder="Référent" required defaultValue={item?.referent} style={fieldStyle} />
        <input name="email" type="email" placeholder="Adresse mail" defaultValue={item?.email ?? ""} style={fieldStyle} />
        <input name="codeFiche" placeholder="Code fiche Le Compte ASSO" defaultValue={item?.codeFiche ?? ""} style={fieldStyle} />
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
