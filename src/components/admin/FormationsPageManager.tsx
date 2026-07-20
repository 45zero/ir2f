"use client"

import { useActionState } from "react"
import { saveFormationTuile, saveFormationOnglet, type FormationsPageActionState } from "@/lib/actions/formations-page"
import { EFFET_VISUEL_LABELS, ONGLET_LABEL } from "@/lib/formations-page-shared"
import { CATEGORIE_LABELS } from "@/lib/formations-shared"
import { ImageField } from "@/components/admin/ImageField"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { AdminFormationOnglet, AdminFormationTuile } from "@/lib/admin/formations-page"

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

// ─── Onglets ────────────────────────────────────────────

function OngletForm({ onglet }: { onglet: AdminFormationOnglet }) {
  const [state, formAction, pending] = useActionState(
    (prev: FormationsPageActionState | undefined, formData: FormData) =>
      saveFormationOnglet(onglet.categorie, onglet.onglet, prev, formData),
    undefined
  )

  return (
    <form action={formAction} style={sectionCardStyle}>
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
        {fieldLabel("Vidéo (optionnel)")}
        <input name="videoUrl" placeholder="Lien YouTube" defaultValue={onglet.videoUrl ?? ""} style={fieldStyle} />
      </div>

      <ImageField name="image" label="Image (optionnel, affichée si pas de vidéo)" defaultUrl={onglet.image} />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 12.5, color: colors.textLight }}>Taille de l&apos;image ({onglet.imageTaille}%)</span>
        <input name="imageTaille" type="range" min={20} max={100} defaultValue={onglet.imageTaille} />
      </div>

      <VisualFields backgroundColor={onglet.backgroundColor} opacity={onglet.opacity} effetVisuel={onglet.effetVisuel} />

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

function OngletsParCategorie({ categorie, onglets }: { categorie: AdminFormationOnglet["categorie"]; onglets: AdminFormationOnglet[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 19, fontWeight: 800, margin: 0 }}>
        Onglets — {CATEGORIE_LABELS[categorie]}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        {onglets.map((o) => (
          <OngletForm key={`${o.categorie}-${o.onglet}`} onglet={o} />
        ))}
      </div>
    </div>
  )
}

// ─── Écran principal ────────────────────────────────────

export function FormationsPageManager({
  tuiles,
  onglets,
}: {
  tuiles: AdminFormationTuile[]
  onglets: AdminFormationOnglet[]
}) {
  const categories = Array.from(new Set(onglets.map((o) => o.categorie)))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <TuilesSection tuiles={tuiles} />
      {categories.map((categorie) => (
        <OngletsParCategorie key={categorie} categorie={categorie} onglets={onglets.filter((o) => o.categorie === categorie)} />
      ))}
    </div>
  )
}
