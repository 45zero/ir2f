"use client"

import { useActionState, useState } from "react"
import {
  saveHeroSlide,
  deleteHeroSlide,
  setHeroSlideActif,
  saveStatCle,
  deleteStatCle,
  setStatCleActif,
  saveAccompagnementCard,
  deleteAccompagnementCard,
  setAccompagnementCardActif,
  saveAccueilContenu,
  type AccueilActionState,
} from "@/lib/actions/accueil"
import { ICONE_LABELS, TRANSITION_LABELS, ALIGNEMENT_LABELS } from "@/lib/accueil-shared"
import { ImageField } from "@/components/admin/ImageField"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { IconeAccompagnement, TransitionHero, AlignementHero } from "@/generated/prisma"

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
      <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 19, fontWeight: 800, margin: 0 }}>{title}</h2>
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

// ─── Carrousel (hero slides) ───────────────────────────

export type AdminHeroSlide = {
  id: string
  badge: string | null
  titre: string
  sousTitre: string | null
  logoUrl: string | null
  image: string
  ctaLabel: string | null
  formationId: string | null
  youtubeUrl: string | null
  alignement: AlignementHero
  overlayColor: string
  overlayOpacity: number
  transition: TransitionHero
  ordre: number
  actif: boolean
}

function HeroSlidesSection({ items, formationOptions }: { items: AdminHeroSlide[]; formationOptions: { id: string; titre: string }[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={sectionCardStyle}>
      <SectionTitle
        title="Carrousel (haut de l'accueil)"
        subtitle="Les images qui défilent en haut de la page. « Ordre » détermine la position dans le défilement."
      />
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter une image
        </button>
      )}
      {adding && <HeroSlideForm formationOptions={formationOptions} onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <HeroSlideForm key={item.id} item={item} formationOptions={formationOptions} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {[item.badge, ALIGNEMENT_LABELS[item.alignement], `ordre ${item.ordre}`].filter(Boolean).join(" · ")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setHeroSlideActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre} onDelete={() => deleteHeroSlide(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucune image dans le carrousel." />}
    </div>
  )
}

function HeroSlideForm({
  item,
  formationOptions,
  onDone,
}: {
  item?: AdminHeroSlide
  formationOptions: { id: string; titre: string }[]
  onDone: () => void
}) {
  const [state, formAction, pending] = useActionState(
    async (prev: AccueilActionState | undefined, formData: FormData) => {
      const result = await saveHeroSlide(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="badge" placeholder="Badge (optionnel, ex : Formation à venir)" defaultValue={item?.badge ?? ""} style={fieldStyle} />
        <input name="titre" placeholder="Titre affiché" required defaultValue={item?.titre} style={fieldStyle} />
        <textarea
          name="sousTitre"
          placeholder="Sous-titre (optionnel, texte affiché sous le titre)"
          rows={2}
          defaultValue={item?.sousTitre ?? ""}
          style={{ ...fieldStyle, gridColumn: "1/-1", resize: "vertical" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <div style={{ gridColumn: "1/-1" }}>
          <ImageField name="image" label="Image de fond" defaultUrl={item?.image} required />
        </div>
        <div>
          <ImageField name="logo" label="Logo (optionnel, affiché au-dessus du titre)" defaultUrl={item?.logoUrl} />
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Position du contenu</span>
          <select name="alignement" defaultValue={item?.alignement ?? "GAUCHE"} style={fieldStyle}>
            {Object.entries(ALIGNEMENT_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Bouton (optionnel)</span>
          <input name="ctaLabel" placeholder="Texte du bouton (laisser vide = pas de bouton)" defaultValue={item?.ctaLabel ?? ""} style={fieldStyle} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Formation liée au bouton</span>
          <select name="formationId" defaultValue={item?.formationId ?? ""} style={fieldStyle}>
            <option value="">Aucune formation liée</option>
            {formationOptions.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titre}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Vidéo (optionnel)</span>
          <input
            name="youtubeUrl"
            placeholder="Lien YouTube (affiche un bouton lecture)"
            defaultValue={item?.youtubeUrl ?? ""}
            style={fieldStyle}
          />
        </label>
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #eef0f3", paddingTop: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Superposition sur l&apos;image & transition</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: colors.textLight }}>
            Couleur
            <input
              name="overlayColor"
              type="color"
              defaultValue={item?.overlayColor ?? "#0a162e"}
              style={{ width: 44, height: 30, border: "1px solid #e2e5ea", borderRadius: 5, padding: 2, cursor: "pointer" }}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: colors.textLight }}>
            Opacité
            <input
              name="overlayOpacity"
              type="range"
              min={0}
              max={100}
              defaultValue={item?.overlayOpacity ?? 60}
              style={{ flex: 1 }}
            />
          </label>
          <select name="transition" defaultValue={item?.transition ?? "FADE"} style={fieldStyle}>
            {Object.entries(TRANSITION_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
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

// ─── Textes de la page ──────────────────────────────────

export type AdminAccueilContenu = {
  bandeauEmploiTitre: string
  accompagnementEyebrow: string
  accompagnementTitre: string
  contactTitre: string
  contactSousTitre: string
}

function TextesSection({ contenu }: { contenu: AdminAccueilContenu }) {
  const [state, formAction, pending] = useActionState(saveAccueilContenu, undefined)
  const [saved, setSaved] = useState(false)

  return (
    <form
      action={async (formData) => {
        setSaved(false)
        const result = await formAction(formData)
        return result
      }}
      style={sectionCardStyle}
    >
      <SectionTitle title="Textes de la page" subtitle="Les titres et phrases affichés à différents endroits de l'accueil." />

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Bandeau « accompagnement emploi »</span>
        <input name="bandeauEmploiTitre" defaultValue={contenu.bandeauEmploiTitre} required style={fieldStyle} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Bloc « Accompagnement Emploi »</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
          <input name="accompagnementEyebrow" placeholder="Petit texte au-dessus du titre" defaultValue={contenu.accompagnementEyebrow} required style={fieldStyle} />
          <input name="accompagnementTitre" placeholder="Titre" defaultValue={contenu.accompagnementTitre} required style={fieldStyle} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Bloc « Je souhaite être contacté »</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
          <input name="contactTitre" placeholder="Titre" defaultValue={contenu.contactTitre} required style={fieldStyle} />
          <input name="contactSousTitre" placeholder="Sous-titre" defaultValue={contenu.contactSousTitre} required style={fieldStyle} />
        </div>
      </div>

      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button type="submit" disabled={pending} style={submitButtonStyle}>
          {pending ? "Enregistrement..." : "Enregistrer les textes"}
        </button>
        {state && !state.error && <span style={{ color: "#3f9142", fontSize: 12.5, fontWeight: 600 }}>Enregistré.</span>}
      </div>
    </form>
  )
}

// ─── Cartes "Accompagnement Emploi" ────────────────────

export type AdminAccompagnementCard = {
  id: string
  titre: string
  description: string
  icone: IconeAccompagnement
  ordre: number
  actif: boolean
}

function AccompagnementSection({ items }: { items: AdminAccompagnementCard[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={sectionCardStyle}>
      <SectionTitle
        title="Cartes « Accompagnement Emploi »"
        subtitle="Les 3 cartes (ou plus) affichées sur fond bleu marine sur l'accueil."
      />
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter une carte
        </button>
      )}
      {adding && <AccompagnementForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <AccompagnementForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {ICONE_LABELS[item.icone]} · ordre {item.ordre}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setAccompagnementCardActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre} onDelete={() => deleteAccompagnementCard(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucune carte." />}
    </div>
  )
}

function AccompagnementForm({ item, onDone }: { item?: AdminAccompagnementCard; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: AccueilActionState | undefined, formData: FormData) => {
      const result = await saveAccompagnementCard(prev, formData)
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
        <select name="icone" defaultValue={item?.icone ?? "FINANCEMENT"} style={fieldStyle}>
          {Object.entries(ICONE_LABELS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
        <textarea
          name="description"
          placeholder="Description"
          required
          rows={2}
          defaultValue={item?.description}
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

// ─── Chiffres clés ──────────────────────────────────────

export type AdminStatCle = { id: string; valeur: string; label: string; ordre: number; actif: boolean }

function StatsSection({ items }: { items: AdminStatCle[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={sectionCardStyle}>
      <SectionTitle title="Chiffres clés" subtitle="La ligne de chiffres affichée en bas de l'accueil (ex : 1 200+, 94%...)." />
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un chiffre
        </button>
      )}
      {adding && <StatForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <StatForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>
                  {item.valeur} — {item.label}
                </span>
                <div style={{ fontSize: 12, color: colors.textLight }}>ordre {item.ordre}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setStatCleActif(item.id, !item.actif)} />
                <DeleteButton label={item.label} onDelete={() => deleteStatCle(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun chiffre clé." />}
    </div>
  )
}

function StatForm({ item, onDone }: { item?: AdminStatCle; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: AccueilActionState | undefined, formData: FormData) => {
      const result = await saveStatCle(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
        <input name="valeur" placeholder="Valeur (ex : 1 200+)" required defaultValue={item?.valeur} style={fieldStyle} />
        <input name="label" placeholder="Label (ex : Stagiaires formés / an)" required defaultValue={item?.label} style={fieldStyle} />
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

// ─── Écran principal ────────────────────────────────────

export function AccueilManager({
  heroSlides,
  formationOptions,
  contenu,
  accompagnementCards,
  statsCles,
}: {
  heroSlides: AdminHeroSlide[]
  formationOptions: { id: string; titre: string }[]
  contenu: AdminAccueilContenu
  accompagnementCards: AdminAccompagnementCard[]
  statsCles: AdminStatCle[]
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <HeroSlidesSection items={heroSlides} formationOptions={formationOptions} />
      <TextesSection contenu={contenu} />
      <AccompagnementSection items={accompagnementCards} />
      <StatsSection items={statsCles} />
    </div>
  )
}
