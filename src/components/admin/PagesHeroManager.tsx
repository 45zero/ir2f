"use client"

import { useActionState } from "react"
import { savePageHero } from "@/lib/actions/page-hero"
import { ImageField } from "@/components/admin/ImageField"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { PageCle } from "@/generated/prisma"

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
  padding: "clamp(18px,3vw,24px)",
  display: "flex",
  flexDirection: "column" as const,
  gap: 14,
}

const submitButtonStyle = {
  alignSelf: "flex-start" as const,
  background: colors.red,
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
}

export type AdminPageHero = {
  page: PageCle
  label: string
  titre: string
  sousTitre: string
  image: string
}

export function PagesHeroManager({ pages }: { pages: AdminPageHero[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {pages.map((p) => (
        <PageHeroForm key={p.page} data={p} />
      ))}
    </div>
  )
}

function PageHeroForm({ data }: { data: AdminPageHero }) {
  const boundSave = savePageHero.bind(null, data.page)
  const [state, formAction, pending] = useActionState(boundSave, undefined)

  return (
    <form action={formAction} style={sectionCardStyle}>
      <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 16, fontWeight: 800, margin: 0 }}>
        {data.label}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Titre</span>
          <input name="titre" defaultValue={data.titre} required style={fieldStyle} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Sous-titre</span>
          <input name="sousTitre" defaultValue={data.sousTitre} style={fieldStyle} />
        </div>
      </div>

      <ImageField name="image" label="Image de fond" defaultUrl={data.image} />

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
