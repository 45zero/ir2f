"use client"

import { useActionState, useState } from "react"
import {
  saveDocumentPasserelle,
  deleteDocumentPasserelle,
  setDocumentPasserelleActif,
  savePartenaire,
  deletePartenaire,
  setPartenaireActif,
  saveContact,
  deleteContact,
  setContactActif,
  saveVideo,
  deleteVideo,
  setVideoActif,
  saveWebinaire,
  deleteWebinaire,
  setWebinaireActif,
  type EmploiActionState,
} from "@/lib/actions/emploi"
import { SECTION_EMPLOI_LABELS, TYPE_DOCUMENT_LABELS } from "@/lib/emploi-shared"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { SectionEmploi, TypeDocument } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const tabBase = {
  border: "1.5px solid #d8dde5",
  background: "#fff",
  color: colors.navy,
  padding: "9px 16px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer" as const,
}

const tabActive = { ...tabBase, border: "none", background: colors.navy, color: "#fff" }

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

type Tab = "documents" | "partenaires" | "contacts" | "videos" | "webinaires"

const TABS: { value: Tab; label: string }[] = [
  { value: "documents", label: "Documents passerelles" },
  { value: "partenaires", label: "Partenaires" },
  { value: "contacts", label: "Contacts" },
  { value: "videos", label: "Vidéos" },
  { value: "webinaires", label: "Webinaires" },
]

export type AdminDocumentPasserelle = {
  id: string
  titre: string
  url: string
  type: TypeDocument
  section: SectionEmploi
  ordre: number
  actif: boolean
}
export type AdminPartenaire = { id: string; nom: string; logoUrl: string | null; siteUrl: string | null; ordre: number; actif: boolean }
export type AdminContact = {
  id: string
  nom: string
  prenom: string | null
  email: string | null
  telephone: string | null
  poste: string | null
  section: SectionEmploi | null
  ordre: number
  actif: boolean
}
export type AdminVideo = {
  id: string
  titre: string
  url: string
  description: string | null
  section: SectionEmploi | null
  ordre: number
  actif: boolean
}
export type AdminWebinaire = { id: string; titre: string; description: string | null; date: string; lien: string | null; actif: boolean }

export function EmploiManager({
  documents,
  partenaires,
  contacts,
  videos,
  webinaires,
}: {
  documents: AdminDocumentPasserelle[]
  partenaires: AdminPartenaire[]
  contacts: AdminContact[]
  videos: AdminVideo[]
  webinaires: AdminWebinaire[]
}) {
  const [tab, setTab] = useState<Tab>("documents")

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button key={t.value} style={tab === t.value ? tabActive : tabBase} onClick={() => setTab(t.value)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "documents" && <DocumentsSection items={documents} />}
      {tab === "partenaires" && <PartenairesSection items={partenaires} />}
      {tab === "contacts" && <ContactsSection items={contacts} />}
      {tab === "videos" && <VideosSection items={videos} />}
      {tab === "webinaires" && <WebinairesSection items={webinaires} />}
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

// ─── Documents passerelles ─────────────────────────────

function DocumentsSection({ items }: { items: AdminDocumentPasserelle[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un document
        </button>
      )}
      {adding && <DocumentForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <DocumentForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {SECTION_EMPLOI_LABELS[item.section]} · {TYPE_DOCUMENT_LABELS[item.type]}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setDocumentPasserelleActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre} onDelete={() => deleteDocumentPasserelle(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun document passerelle." />}
    </div>
  )
}

function DocumentForm({ item, onDone }: { item?: AdminDocumentPasserelle; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: EmploiActionState | undefined, formData: FormData) => {
      const result = await saveDocumentPasserelle(prev, formData)
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
        <input name="url" placeholder="URL" required defaultValue={item?.url} style={fieldStyle} />
        <select name="type" defaultValue={item?.type ?? "LIEN_EXTERNE"} style={fieldStyle}>
          {Object.entries(TYPE_DOCUMENT_LABELS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <select name="section" required defaultValue={item?.section ?? ""} style={fieldStyle}>
          <option value="" disabled>
            Section
          </option>
          {Object.entries(SECTION_EMPLOI_LABELS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
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

// ─── Partenaires ────────────────────────────────────────

function PartenairesSection({ items }: { items: AdminPartenaire[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un partenaire
        </button>
      )}
      {adding && <PartenaireForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <PartenaireForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.nom}</span>
                {item.siteUrl && <div style={{ fontSize: 12, color: colors.textLight }}>{item.siteUrl}</div>}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setPartenaireActif(item.id, !item.actif)} />
                <DeleteButton label={item.nom} onDelete={() => deletePartenaire(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun partenaire." />}
    </div>
  )
}

function PartenaireForm({ item, onDone }: { item?: AdminPartenaire; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: EmploiActionState | undefined, formData: FormData) => {
      const result = await savePartenaire(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="nom" placeholder="Nom" required defaultValue={item?.nom} style={fieldStyle} />
        <input name="logoUrl" placeholder="URL du logo" defaultValue={item?.logoUrl ?? ""} style={fieldStyle} />
        <input name="siteUrl" placeholder="Site web" defaultValue={item?.siteUrl ?? ""} style={fieldStyle} />
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

// ─── Contacts ───────────────────────────────────────────

function ContactsSection({ items }: { items: AdminContact[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un contact
        </button>
      )}
      {adding && <ContactForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <ContactForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>
                  {item.prenom} {item.nom}
                </span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {[item.poste, item.email, item.telephone].filter(Boolean).join(" · ") || "—"}
                  {item.section ? ` · ${SECTION_EMPLOI_LABELS[item.section]}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setContactActif(item.id, !item.actif)} />
                <DeleteButton label={item.nom} onDelete={() => deleteContact(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun contact." />}
    </div>
  )
}

function ContactForm({ item, onDone }: { item?: AdminContact; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: EmploiActionState | undefined, formData: FormData) => {
      const result = await saveContact(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="nom" placeholder="Nom" required defaultValue={item?.nom} style={fieldStyle} />
        <input name="prenom" placeholder="Prénom" defaultValue={item?.prenom ?? ""} style={fieldStyle} />
        <input name="poste" placeholder="Poste" defaultValue={item?.poste ?? ""} style={fieldStyle} />
        <input name="email" type="email" placeholder="Email" defaultValue={item?.email ?? ""} style={fieldStyle} />
        <input name="telephone" placeholder="Téléphone" defaultValue={item?.telephone ?? ""} style={fieldStyle} />
        <select name="section" defaultValue={item?.section ?? ""} style={fieldStyle}>
          <option value="">— Section (optionnel) —</option>
          {Object.entries(SECTION_EMPLOI_LABELS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
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

// ─── Vidéos ─────────────────────────────────────────────

function VideosSection({ items }: { items: AdminVideo[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter une vidéo
        </button>
      )}
      {adding && <VideoForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <VideoForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>
                  {item.section ? SECTION_EMPLOI_LABELS[item.section] : "—"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setVideoActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre} onDelete={() => deleteVideo(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucune vidéo." />}
    </div>
  )
}

function VideoForm({ item, onDone }: { item?: AdminVideo; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: EmploiActionState | undefined, formData: FormData) => {
      const result = await saveVideo(prev, formData)
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
        <input name="url" placeholder="URL" required defaultValue={item?.url} style={fieldStyle} />
        <select name="section" defaultValue={item?.section ?? ""} style={fieldStyle}>
          <option value="">— Section (optionnel) —</option>
          {Object.entries(SECTION_EMPLOI_LABELS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <input name="ordre" type="number" placeholder="Ordre" defaultValue={item?.ordre ?? 0} style={fieldStyle} />
        <textarea
          name="description"
          placeholder="Description"
          defaultValue={item?.description ?? ""}
          rows={2}
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

// ─── Webinaires ─────────────────────────────────────────

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" })

function WebinairesSection({ items }: { items: AdminWebinaire[] }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!adding && (
        <button style={addButtonStyle} onClick={() => setAdding(true)}>
          + Ajouter un webinaire
        </button>
      )}
      {adding && <WebinaireForm onDone={() => setAdding(false)} />}

      {items.map((item) =>
        editingId === item.id ? (
          <WebinaireForm key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.titre}</span>
                <div style={{ fontSize: 12, color: colors.textLight }}>{dateTimeFormatter.format(new Date(item.date))}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button style={smallButton("neutral")} onClick={() => setEditingId(item.id)}>
                  Modifier
                </button>
                <ActifToggle actif={item.actif} onToggle={() => setWebinaireActif(item.id, !item.actif)} />
                <DeleteButton label={item.titre} onDelete={() => deleteWebinaire(item.id)} />
              </div>
            </div>
          </div>
        )
      )}
      {items.length === 0 && !adding && <EmptyState label="Aucun webinaire." />}
    </div>
  )
}

function WebinaireForm({ item, onDone }: { item?: AdminWebinaire; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: EmploiActionState | undefined, formData: FormData) => {
      const result = await saveWebinaire(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  const defaultDate = item ? new Date(item.date).toISOString().slice(0, 16) : ""

  return (
    <form action={formAction} style={{ ...cardStyle, border: `1px solid ${colors.gold}` }}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        <input name="titre" placeholder="Titre" required defaultValue={item?.titre} style={fieldStyle} />
        <input name="date" type="datetime-local" required defaultValue={defaultDate} style={fieldStyle} />
        <input name="lien" placeholder="Lien de connexion" defaultValue={item?.lien ?? ""} style={fieldStyle} />
        <textarea
          name="description"
          placeholder="Description"
          defaultValue={item?.description ?? ""}
          rows={2}
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

function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20, color: colors.textLight, fontSize: 13 }}>
      {label}
    </div>
  )
}
