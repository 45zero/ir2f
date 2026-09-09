"use client"

import { useActionState, useState } from "react"
import { savePopup, deletePopup, setPopupActif, type PopupActionState } from "@/lib/actions/popup"
import { TYPE_POPUP_LABELS } from "@/lib/popup-shared"
import { ImageField } from "@/components/admin/ImageField"
import { VideoField } from "@/components/admin/VideoField"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { TypePopup, TypeLien } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const labelStyle = { display: "flex", flexDirection: "column" as const, gap: 5 }
const labelText = { fontSize: 12, fontWeight: 700, color: colors.navy }

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
  background: "#fff",
  border: "1px solid #eef0f3",
  borderRadius: 10,
  padding: "clamp(16px,3vw,24px)",
  display: "flex",
  flexDirection: "column" as const,
  gap: 16,
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

export type AdminPopup = {
  id: string
  type: TypePopup
  actif: boolean
  image: string | null
  titre: string
  texte: string
  auteurNom: string | null
  auteurFonction: string | null
  signatureUrl: string | null
  youtubeUrl: string | null
  videoFichierUrl: string | null
  lienLabel: string | null
  lienUrl: string | null
  lienType: TypeLien | null
  delaiAffichage: number
  dateDebut: Date | null
  dateFin: Date | null
  ordre: number
}

function toDateInput(d: Date | null): string {
  return d ? new Date(d).toISOString().slice(0, 10) : ""
}

function formatPeriode(item: AdminPopup): string {
  if (!item.dateDebut && !item.dateFin) return ""
  const fmt = (d: Date | null) => (d ? new Date(d).toLocaleDateString("fr-FR") : "…")
  return `du ${fmt(item.dateDebut)} au ${fmt(item.dateFin)}`
}

export function PopupManager({ items }: { items: AdminPopup[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={sectionCardStyle}>
      <div>
        <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 19, fontWeight: 800, margin: 0 }}>
          Pop-up d&apos;accueil
        </h2>
        <p style={{ color: colors.textLight, fontSize: 12.5, margin: "4px 0 0" }}>
          S&apos;affiche à l&apos;arrivée sur le site, après le délai réglé ci-dessous. Un visiteur qui ferme un
          pop-up ne le revoit plus — seul un pop-up qu&apos;il n&apos;a jamais vu peut réapparaître. Si plusieurs
          pop-ups actifs sont éligibles en même temps, seul celui avec le plus petit « ordre » s&apos;affiche.
        </p>
      </div>

      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un pop-up
        </button>
      )}
      {adding && <PopupForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <PopupForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {[TYPE_POPUP_LABELS[item.type], `ordre ${item.ordre}`, formatPeriode(item)].filter(Boolean).join(" · ")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setPopupActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre} onDelete={() => deletePopup(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && (
        <div style={{ color: colors.textLight, fontSize: 13 }}>Aucun pop-up configuré.</div>
      )}
    </div>
  )
}

function PopupForm({ item, onDone }: { item?: AdminPopup; onDone: () => void }) {
  const [type, setType] = useState<TypePopup>(item?.type ?? "ANNONCE")
  const [state, formAction, pending] = useActionState(
    async (prev: PopupActionState | undefined, formData: FormData) => {
      const result = await savePopup(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <label style={labelStyle}>
          <span style={labelText}>Type de pop-up</span>
          <select name="type" value={type} onChange={(e) => setType(e.target.value as TypePopup)} style={fieldStyle}>
            {Object.entries(TYPE_POPUP_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <input name="titre" placeholder="Titre (usage interne, ex : Mot du président 2026)" required defaultValue={item?.titre} style={fieldStyle} />
        <label style={{ ...labelStyle, gridColumn: "1/-1" }}>
          <span style={labelText}>Texte</span>
          <textarea
            name="texte"
            placeholder={type === "EDITO" ? "Le mot du président..." : "Texte de l'annonce..."}
            rows={5}
            required
            defaultValue={item?.texte ?? ""}
            style={{ ...fieldStyle, resize: "vertical" }}
          />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <div>
          <ImageField
            name="image"
            label={type === "EDITO" ? "Photo (haut à gauche du pop-up)" : "Image (optionnelle)"}
            defaultUrl={item?.image}
            required={type === "EDITO"}
          />
        </div>

        {type === "EDITO" && (
          <>
            <label style={labelStyle}>
              <span style={labelText}>Nom du président</span>
              <input name="auteurNom" placeholder="Ex : Jean Dupont" defaultValue={item?.auteurNom ?? ""} style={fieldStyle} />
            </label>
            <label style={labelStyle}>
              <span style={labelText}>Fonction</span>
              <input name="auteurFonction" placeholder="Ex : Président de la LGEF" defaultValue={item?.auteurFonction ?? ""} style={fieldStyle} />
            </label>
            <div style={{ gridColumn: "1/-1" }}>
              <ImageField name="signature" label="Signature (image, optionnelle)" defaultUrl={item?.signatureUrl} />
            </div>
          </>
        )}

        {type === "ANNONCE" && (
          <>
            <label style={labelStyle}>
              <span style={labelText}>Vidéo — lien YouTube (optionnel)</span>
              <input name="youtubeUrl" placeholder="Lien YouTube" defaultValue={item?.youtubeUrl ?? ""} style={fieldStyle} />
            </label>
            <div style={{ gridColumn: "1/-1" }}>
              <VideoField name="videoFichier" label="Vidéo — ou fichier vidéo direct (optionnel)" defaultUrl={item?.videoFichierUrl} keyHint="popups-videos" />
            </div>
            <label style={labelStyle}>
              <span style={labelText}>Bouton — libellé</span>
              <input name="lienLabel" placeholder="Ex : En savoir plus" defaultValue={item?.lienLabel ?? ""} style={fieldStyle} />
            </label>
            <label style={labelStyle}>
              <span style={labelText}>Bouton — lien (page interne ou externe, optionnel)</span>
              <input name="lienUrl" placeholder="Ex : /financement ou https://..." defaultValue={item?.lienUrl ?? ""} style={fieldStyle} />
            </label>
            <label style={labelStyle}>
              <span style={labelText}>Type de lien</span>
              <select name="lienType" defaultValue={item?.lienType ?? "INTERNE"} style={fieldStyle}>
                <option value="INTERNE">Page du site</option>
                <option value="EXTERNE">Lien externe</option>
              </select>
            </label>
          </>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <label style={labelStyle}>
          <span style={labelText}>Délai avant ouverture (secondes)</span>
          <input name="delaiAffichage" type="number" min={0} defaultValue={item?.delaiAffichage ?? 4} style={fieldStyle} />
        </label>
        <label style={labelStyle}>
          <span style={labelText}>Diffusion du (optionnel)</span>
          <input name="dateDebut" type="date" defaultValue={toDateInput(item?.dateDebut ?? null)} style={fieldStyle} />
        </label>
        <label style={labelStyle}>
          <span style={labelText}>au (optionnel)</span>
          <input name="dateFin" type="date" defaultValue={toDateInput(item?.dateFin ?? null)} style={fieldStyle} />
        </label>
        <label style={labelStyle}>
          <span style={labelText}>Ordre (priorité si plusieurs pop-ups actifs)</span>
          <input name="ordre" type="number" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
        </label>
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
