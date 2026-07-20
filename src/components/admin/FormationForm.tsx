"use client"

import { useMemo, useState } from "react"
import {
  CATEGORIE_LABELS,
  STATUT_LABELS,
  TYPE_LABELS,
  FILIERE_LABELS,
  GROUPE_EQUIVALENCE_LABELS,
  VARIANTE_NODE_LABELS,
  slugify,
} from "@/lib/formations-shared"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import { ImageField } from "@/components/admin/ImageField"
import type {
  CategorieFormation,
  Filiere,
  TypeFormation,
  StatutFormation,
  GroupeEquivalence,
  VarianteNode,
  ModeInscription,
} from "@/generated/prisma"

type ProgrammeStep = { n: string; title: string; desc: string }
type SessionRow = { dateDebut: string; lieu: string; places: string }

export type FormationFormInitial = {
  titre: string
  slug: string
  description: string
  categorie: CategorieFormation
  filiere: Filiere | ""
  statut: StatutFormation
  type: TypeFormation
  dureeLabel: string
  modeLabel: string
  lieu: string
  prix: string
  places: string
  lienVisio: string
  image: string
  cpfEligible: boolean
  modeInscription: ModeInscription
  lienFffStagiaire: string
  lienFffClub: string
  formateurNom: string
  formateurRole: string
  ordre: string
  groupeEquivalence: GroupeEquivalence | ""
  varianteNode: VarianteNode | ""
  badgeNode: string
  shortNode: string
  programme: ProgrammeStep[]
  sessions: SessionRow[]
  formateurIds: string[]
}

const EMPTY: FormationFormInitial = {
  titre: "",
  slug: "",
  description: "",
  categorie: "EDUCATEUR",
  filiere: "",
  statut: "BROUILLON",
  type: "PRESENTIEL",
  dureeLabel: "",
  modeLabel: "",
  lieu: "",
  prix: "",
  places: "",
  lienVisio: "",
  image: "",
  cpfEligible: false,
  modeInscription: "INTERNE",
  lienFffStagiaire: "",
  lienFffClub: "",
  formateurNom: "",
  formateurRole: "",
  ordre: "0",
  groupeEquivalence: "",
  varianteNode: "",
  badgeNode: "",
  shortNode: "",
  programme: [],
  sessions: [],
  formateurIds: [],
}

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const labelStyle = { fontSize: 12, fontWeight: 700, color: colors.navy }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: "clamp(18px,3vw,28px)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 18, fontWeight: 800, margin: 0 }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

export function FormationForm({
  action,
  initial,
  submitLabel,
  formateurUsers,
}: {
  action: (formData: FormData) => Promise<void>
  initial?: FormationFormInitial
  submitLabel: string
  formateurUsers: { id: string; nom: string; prenom: string }[]
}) {
  const data = initial ?? EMPTY
  const [titre, setTitre] = useState(data.titre)
  const [slug, setSlug] = useState(data.slug)
  const [slugTouched, setSlugTouched] = useState(Boolean(data.slug))
  const [programme, setProgramme] = useState<ProgrammeStep[]>(data.programme)
  const [sessions, setSessions] = useState<SessionRow[]>(data.sessions)
  const [formateurIds, setFormateurIds] = useState<string[]>(data.formateurIds)
  const [modeInscription, setModeInscription] = useState<ModeInscription>(data.modeInscription)

  const programmeJson = useMemo(
    () => JSON.stringify(programme.map((p, i) => ({ ...p, n: String(i + 1).padStart(2, "0") }))),
    [programme]
  )
  const sessionsJson = useMemo(() => JSON.stringify(sessions), [sessions])

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <input type="hidden" name="programme" value={programmeJson} />
      <input type="hidden" name="sessions" value={sessionsJson} />

      <SectionCard title="Informations générales">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          <Field label="Titre">
            <input
              name="titre"
              required
              value={titre}
              onChange={(e) => {
                setTitre(e.target.value)
                if (!slugTouched) setSlug(slugify(e.target.value))
              }}
              style={fieldStyle}
            />
          </Field>
          <Field label="Slug (URL)">
            <input
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value)
                setSlugTouched(true)
              }}
              style={fieldStyle}
            />
          </Field>
          <Field label="Catégorie">
            <select name="categorie" defaultValue={data.categorie} style={fieldStyle}>
              {Object.entries(CATEGORIE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Filière">
            <select name="filiere" defaultValue={data.filiere} style={fieldStyle}>
              <option value="">—</option>
              {Object.entries(FILIERE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Statut">
            <select name="statut" defaultValue={data.statut} style={fieldStyle}>
              {Object.entries(STATUT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ordre d'affichage">
            <input name="ordre" type="number" defaultValue={data.ordre} style={fieldStyle} />
          </Field>
        </div>
        <Field label="Description">
          <textarea name="description" defaultValue={data.description} rows={4} style={{ ...fieldStyle, resize: "vertical" }} />
        </Field>
      </SectionCard>

      <SectionCard title="Détails pratiques">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          <Field label="Type">
            <select name="type" defaultValue={data.type} style={fieldStyle}>
              {Object.entries(TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Durée (libellé, ex. « 3 mois »)">
            <input name="dureeLabel" defaultValue={data.dureeLabel} style={fieldStyle} />
          </Field>
          <Field label="Format (libellé, override optionnel)">
            <input name="modeLabel" defaultValue={data.modeLabel} style={fieldStyle} />
          </Field>
          <Field label="Lieu">
            <input name="lieu" defaultValue={data.lieu} style={fieldStyle} />
          </Field>
          <Field label="Prix (€)">
            <input name="prix" type="number" step="0.01" defaultValue={data.prix} style={fieldStyle} />
          </Field>
          <Field label="Places">
            <input name="places" type="number" defaultValue={data.places} style={fieldStyle} />
          </Field>
          <Field label="Lien visio">
            <input name="lienVisio" defaultValue={data.lienVisio} style={fieldStyle} />
          </Field>
          <ImageField name="image" label="Image" defaultUrl={data.image} />
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text, marginTop: 20 }}>
            <input type="checkbox" name="cpfEligible" defaultChecked={data.cpfEligible} style={{ width: 15, height: 15 }} />
            Éligible CPF
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Inscription">
        <Field label="Mode d'inscription">
          <select
            name="modeInscription"
            value={modeInscription}
            onChange={(e) => setModeInscription(e.target.value as ModeInscription)}
            style={fieldStyle}
          >
            <option value="INTERNE">Interne (formulaire IR2F)</option>
            <option value="PORTAIL_FFF">Portail FFF (redirection externe)</option>
          </select>
        </Field>
        {modeInscription === "PORTAIL_FFF" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
            <Field label="Lien FFF — inscription par le stagiaire">
              <input
                name="lienFffStagiaire"
                type="url"
                placeholder="https://..."
                defaultValue={data.lienFffStagiaire}
                style={fieldStyle}
              />
            </Field>
            <Field label="Lien FFF — inscription par le club">
              <input
                name="lienFffClub"
                type="url"
                placeholder="https://..."
                defaultValue={data.lienFffClub}
                style={fieldStyle}
              />
            </Field>
            <p style={{ gridColumn: "1 / -1", color: colors.textLight, fontSize: 12, margin: 0 }}>
              Renseignez au moins un des deux liens. Avant la redirection, le nom, prénom, email et téléphone du
              stagiaire sont capturés et ajoutés à la liste des stagiaires de cette formation.
            </p>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Formateur">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          <Field label="Nom (affiché sur la fiche publique)">
            <input name="formateurNom" defaultValue={data.formateurNom} style={fieldStyle} />
          </Field>
          <Field label="Rôle (affiché sur la fiche publique)">
            <input name="formateurRole" defaultValue={data.formateurRole} style={fieldStyle} />
          </Field>
        </div>
        <Field label="Compte(s) formateur assigné(s) (accès à l'espace formateur pour cette formation)">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {formateurUsers.length === 0 && (
              <span style={{ fontSize: 12.5, color: colors.textLight }}>
                Aucun compte avec le rôle Formateur pour le moment.
              </span>
            )}
            {formateurUsers.map((u) => (
              <label key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: colors.text }}>
                <input
                  type="checkbox"
                  name="formateurIds"
                  value={u.id}
                  checked={formateurIds.includes(u.id)}
                  onChange={(e) =>
                    setFormateurIds((prev) =>
                      e.target.checked ? [...prev, u.id] : prev.filter((id) => id !== u.id)
                    )
                  }
                  style={{ width: 15, height: 15 }}
                />
                {u.prenom} {u.nom}
              </label>
            ))}
          </div>
        </Field>
      </SectionCard>

      <SectionCard title="Programme détaillé">
        <ProgrammeEditor programme={programme} setProgramme={setProgramme} />
      </SectionCard>

      <SectionCard title="Sessions">
        <SessionsEditor sessions={sessions} setSessions={setSessions} />
      </SectionCard>

      <details>
        <summary style={{ cursor: "pointer", fontSize: 13, fontWeight: 700, color: colors.navy, padding: "4px 0" }}>
          Avancé — diagramme équivalences et passerelles
        </summary>
        <div style={{ marginTop: 12 }}>
          <SectionCard title="Nœud du diagramme (optionnel)">
            <p style={{ color: colors.textLight, fontSize: 12, margin: 0 }}>
              À renseigner uniquement si cette formation doit apparaître dans le diagramme « Équivalences et
              passerelles » de la catégorie Éducateur.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
              <Field label="Groupe">
                <select name="groupeEquivalence" defaultValue={data.groupeEquivalence} style={fieldStyle}>
                  <option value="">— Aucun (hors diagramme) —</option>
                  {Object.entries(GROUPE_EQUIVALENCE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Couleur">
                <select name="varianteNode" defaultValue={data.varianteNode} style={fieldStyle}>
                  <option value="">—</option>
                  {Object.entries(VARIANTE_NODE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Badge (ex. « A », « Pro »)">
                <input name="badgeNode" defaultValue={data.badgeNode} style={fieldStyle} />
              </Field>
              <Field label="Libellé court (ex. « BEF »)">
                <input name="shortNode" defaultValue={data.shortNode} style={fieldStyle} />
              </Field>
            </div>
          </SectionCard>
        </div>
      </details>

      <button
        type="submit"
        style={{
          alignSelf: "flex-start",
          background: colors.red,
          color: "#fff",
          border: "none",
          padding: "13px 28px",
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: "pointer",
        }}
      >
        {submitLabel}
      </button>
    </form>
  )
}

function ProgrammeEditor({
  programme,
  setProgramme,
}: {
  programme: ProgrammeStep[]
  setProgramme: (fn: (p: ProgrammeStep[]) => ProgrammeStep[]) => void
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {programme.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ ...labelStyle, minWidth: 24, paddingTop: 10 }}>{String(i + 1).padStart(2, "0")}</span>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              placeholder="Titre de l'étape"
              value={step.title}
              onChange={(e) =>
                setProgramme((p) => p.map((s, idx) => (idx === i ? { ...s, title: e.target.value } : s)))
              }
              style={fieldStyle}
            />
            <input
              placeholder="Description"
              value={step.desc}
              onChange={(e) =>
                setProgramme((p) => p.map((s, idx) => (idx === i ? { ...s, desc: e.target.value } : s)))
              }
              style={fieldStyle}
            />
          </div>
          <button
            type="button"
            onClick={() => setProgramme((p) => p.filter((_, idx) => idx !== i))}
            style={removeButtonStyle}
          >
            Retirer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setProgramme((p) => [...p, { n: "", title: "", desc: "" }])}
        style={addButtonStyle}
      >
        + Ajouter une étape
      </button>
    </div>
  )
}

function SessionsEditor({
  sessions,
  setSessions,
}: {
  sessions: SessionRow[]
  setSessions: (fn: (s: SessionRow[]) => SessionRow[]) => void
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {sessions.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="date"
            value={s.dateDebut}
            onChange={(e) => setSessions((prev) => prev.map((row, idx) => (idx === i ? { ...row, dateDebut: e.target.value } : row)))}
            style={{ ...fieldStyle, flex: "1 1 160px" }}
          />
          <input
            placeholder="Lieu"
            value={s.lieu}
            onChange={(e) => setSessions((prev) => prev.map((row, idx) => (idx === i ? { ...row, lieu: e.target.value } : row)))}
            style={{ ...fieldStyle, flex: "1 1 160px" }}
          />
          <input
            placeholder="Places"
            type="number"
            value={s.places}
            onChange={(e) => setSessions((prev) => prev.map((row, idx) => (idx === i ? { ...row, places: e.target.value } : row)))}
            style={{ ...fieldStyle, flex: "0 1 100px" }}
          />
          <button type="button" onClick={() => setSessions((prev) => prev.filter((_, idx) => idx !== i))} style={removeButtonStyle}>
            Retirer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setSessions((prev) => [...prev, { dateDebut: "", lieu: "", places: "" }])}
        style={addButtonStyle}
      >
        + Ajouter une session
      </button>
    </div>
  )
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

const removeButtonStyle = {
  background: "transparent",
  border: "1px solid #f3c6cb",
  color: colors.red,
  padding: "9px 12px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer",
}
