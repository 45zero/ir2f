"use client"

import { useActionState, useState } from "react"
import {
  saveEmploiPageContenu,
  saveGestionEmploiContenu,
  saveFormationEmployabiliteContenu,
  savePratiqueEmploiCard,
  deletePratiqueEmploiCard,
  setPratiqueEmploiCardActif,
  type EmploiActionState,
} from "@/lib/actions/emploi"
import { ICONE_PRATIQUE_LABELS } from "@/lib/emploi-shared"
import { VideoField } from "@/components/admin/VideoField"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type {
  AdminEmploiPageContenu,
  AdminGestionEmploiContenu,
  AdminFormationEmployabiliteContenu,
  AdminPratiqueCard,
} from "@/components/admin/EmploiManager"

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
  background: "#fff",
  border: "1px solid #eef0f3",
  borderRadius: 10,
  padding: "clamp(16px,3vw,24px)",
  display: "flex",
  flexDirection: "column" as const,
  gap: 16,
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h3 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 17, fontWeight: 800, margin: 0 }}>{title}</h3>
      {subtitle && <p style={{ color: colors.textLight, fontSize: 12.5, margin: "4px 0 0" }}>{subtitle}</p>}
    </div>
  )
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

// ─── Écran principal ────────────────────────────────────

export function EmploiContenusSection({
  pageContenu,
  gestionEmploiContenu,
  formationEmployabiliteContenu,
  pratiqueCards,
}: {
  pageContenu: AdminEmploiPageContenu
  gestionEmploiContenu: AdminGestionEmploiContenu
  formationEmployabiliteContenu: AdminFormationEmployabiliteContenu
  pratiqueCards: AdminPratiqueCard[]
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageContenuForm contenu={pageContenu} />
      <GestionEmploiContenuForm contenu={gestionEmploiContenu} />
      <PratiquesSection items={pratiqueCards} />
      <FormationEmployabiliteContenuForm contenu={formationEmployabiliteContenu} />
    </div>
  )
}

// ─── Bloc de présentation (haut de /emploi) ────────────

function PageContenuForm({ contenu }: { contenu: AdminEmploiPageContenu }) {
  const [state, formAction, pending] = useActionState(saveEmploiPageContenu, undefined)

  return (
    <form action={formAction} style={sectionCardStyle}>
      <SectionTitle title="Bloc de présentation" subtitle="Le texte affiché en haut de la page /emploi, juste sous le bandeau." />
      <textarea
        name="introTexte"
        placeholder="Texte de présentation"
        rows={4}
        defaultValue={contenu.introTexte}
        style={{ ...fieldStyle, resize: "vertical" }}
      />
      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Liste à puces (une ligne = une puce)</span>
        <textarea
          name="introListe"
          placeholder={"La gestion opérationnelle du FAFA Emploi...\nLe développement de l'Emploi au sein des clubs amateurs..."}
          rows={4}
          defaultValue={contenu.introListe}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Vidéo « Communauté Employeur IEFF » — lien YouTube (optionnel)</span>
        <input name="videoCommunauteUrl" placeholder="Lien YouTube" defaultValue={contenu.videoCommunauteUrl ?? ""} style={fieldStyle} />
      </label>
      <VideoField name="videoCommunauteFichier" label="Ou fichier vidéo direct (optionnel)" defaultUrl={contenu.videoCommunauteFichierUrl} />
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

// ─── Gestion de l'emploi ────────────────────────────────

function GestionEmploiContenuForm({ contenu }: { contenu: AdminGestionEmploiContenu }) {
  const [state, formAction, pending] = useActionState(saveGestionEmploiContenu, undefined)

  return (
    <form action={formAction} style={sectionCardStyle}>
      <SectionTitle title="Section « Gestion de l'emploi »" />

      <div style={{ display: "flex", flexDirection: "column", gap: 10, borderBottom: "1px solid #eef0f3", paddingBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Module e-learning</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
          <input name="eLearningTitre" placeholder="Titre" defaultValue={contenu.eLearningTitre ?? ""} style={fieldStyle} />
          <input name="eLearningLienLabel" placeholder="Texte du bouton (ex : Formez-vous !)" defaultValue={contenu.eLearningLienLabel ?? ""} style={fieldStyle} />
          <input name="eLearningLienUrl" placeholder="Lien du module e-learning" defaultValue={contenu.eLearningLienUrl ?? ""} style={{ ...fieldStyle, gridColumn: "1/-1" }} />
          <textarea
            name="eLearningTexte"
            placeholder="Texte de présentation"
            rows={2}
            defaultValue={contenu.eLearningTexte ?? ""}
            style={{ ...fieldStyle, gridColumn: "1/-1", resize: "vertical" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, borderBottom: "1px solid #eef0f3", paddingBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>« Créer un emploi »</span>
        <textarea
          name="creerEmploiTexte"
          placeholder="Texte de présentation"
          rows={5}
          defaultValue={contenu.creerEmploiTexte}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
          <input name="creerEmploiLienLabel" placeholder="Texte du lien" defaultValue={contenu.creerEmploiLienLabel ?? ""} style={fieldStyle} />
          <input name="creerEmploiLienUrl" placeholder="URL (page FFF)" defaultValue={contenu.creerEmploiLienUrl ?? ""} style={fieldStyle} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Communauté employeur</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
          <input name="communauteTitre" placeholder="Titre" defaultValue={contenu.communauteTitre ?? ""} style={fieldStyle} />
          <input name="communauteVideoUrl" placeholder="Vidéo (lien YouTube, optionnel)" defaultValue={contenu.communauteVideoUrl ?? ""} style={fieldStyle} />
          <textarea
            name="communauteTexte"
            placeholder="Texte de présentation"
            rows={3}
            defaultValue={contenu.communauteTexte ?? ""}
            style={{ ...fieldStyle, gridColumn: "1/-1", resize: "vertical" }}
          />
          <div style={{ gridColumn: "1/-1" }}>
            <VideoField name="communauteVideoFichier" label="Ou fichier vidéo direct (optionnel)" defaultUrl={contenu.communauteVideoFichierUrl} />
          </div>
          <input name="communauteLienEnSavoirPlusUrl" placeholder="Lien « En savoir plus »" defaultValue={contenu.communauteLienEnSavoirPlusUrl ?? ""} style={fieldStyle} />
          <input name="communauteLienRejoindreUrl" placeholder="Lien « Rejoignez la communauté »" defaultValue={contenu.communauteLienRejoindreUrl ?? ""} style={fieldStyle} />
        </div>
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

// ─── Cartes "pratiques" (hexagones) ─────────────────────

function PratiquesSection({ items }: { items: AdminPratiqueCard[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={sectionCardStyle}>
      <SectionTitle
        title="Cartes « Développer ses pratiques » (Gestion de l'emploi)"
        subtitle="Les cartes hexagonales affichées sous le bloc « Créer un emploi »."
      />
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter une carte
        </button>
      )}
      {adding && <PratiqueForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <PratiqueForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {ICONE_PRATIQUE_LABELS[item.icone]} · ordre {item.ordre}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setPratiqueEmploiCardActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre} onDelete={() => deletePratiqueEmploiCard(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucune carte." />}
    </div>
  )
}

function PratiqueForm({ item, onDone }: { item?: AdminPratiqueCard; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: EmploiActionState | undefined, formData: FormData) => {
      const result = await savePratiqueEmploiCard(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="titre" placeholder="Titre" required defaultValue={item?.titre} style={fieldStyle} />
        <select name="icone" defaultValue={item?.icone ?? "AUTRE"} style={fieldStyle}>
          {Object.entries(ICONE_PRATIQUE_LABELS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
        <textarea
          name="description"
          placeholder="Description"
          rows={2}
          defaultValue={item?.description ?? ""}
          style={{ ...fieldStyle, gridColumn: "1/-1", resize: "vertical" }}
        />
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

// ─── Formation-Employabilité ─────────────────────────────

function FormationEmployabiliteContenuForm({ contenu }: { contenu: AdminFormationEmployabiliteContenu }) {
  const [state, formAction, pending] = useActionState(saveFormationEmployabiliteContenu, undefined)

  return (
    <form action={formAction} style={sectionCardStyle}>
      <SectionTitle title="Section « Formation-Employabilité »" />
      <textarea
        name="introTexte"
        placeholder="Texte d'introduction"
        rows={2}
        defaultValue={contenu.introTexte ?? ""}
        style={{ ...fieldStyle, resize: "vertical" }}
      />
      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Indicateurs employabilité (optionnel)</span>
        <textarea
          name="indicateursNote"
          placeholder="Note affichée dans l'encart « Indicateurs employabilité »"
          rows={3}
          defaultValue={contenu.indicateursNote ?? ""}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </label>
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
