"use client"

import { useState, useActionState } from "react"
import { proposerCovoiturage, rejoindreCovoiturage, quitterCovoiturage, annulerCovoiturage } from "@/lib/actions/covoiturage"
import { colors, fontBody } from "@/lib/theme"
import type { FormationOption } from "@/lib/formations-shared"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" })

export type TrajetDisponible = {
  id: string
  depart: string
  destination: string
  dateDepart: string
  places: number
  placesRestantes: number
  statut: "OUVERT" | "COMPLET" | "ANNULE"
  commentaire: string | null
  conducteurNom: string
  isConducteur: boolean
  dejaInscrit: boolean
}

export type TrajetConduit = {
  id: string
  depart: string
  destination: string
  dateDepart: string
  places: number
  statut: "OUVERT" | "COMPLET" | "ANNULE"
  passagers: string[]
}

export type TrajetRejoint = {
  id: string
  depart: string
  destination: string
  dateDepart: string
  statut: "OUVERT" | "COMPLET" | "ANNULE"
  conducteurNom: string
}

export function CovoiturageManager({
  disponibles,
  conduits,
  rejoints,
  formations,
}: {
  disponibles: TrajetDisponible[]
  conduits: TrajetConduit[]
  rejoints: TrajetRejoint[]
  formations: FormationOption[]
}) {
  const [tab, setTab] = useState<"disponibles" | "mes-trajets">("disponibles")
  const [proposing, setProposing] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <TabButton active={tab === "disponibles"} onClick={() => setTab("disponibles")}>
            Trajets disponibles
          </TabButton>
          <TabButton active={tab === "mes-trajets"} onClick={() => setTab("mes-trajets")}>
            Mes trajets
          </TabButton>
        </div>
        {!proposing && (
          <button
            onClick={() => setProposing(true)}
            style={{
              background: colors.red,
              color: "#fff",
              border: "none",
              padding: "9px 18px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: "pointer",
            }}
          >
            + Proposer un trajet
          </button>
        )}
      </div>

      {proposing && <ProposerForm formations={formations} onDone={() => setProposing(false)} />}

      {tab === "disponibles" && <Disponibles items={disponibles} />}
      {tab === "mes-trajets" && <MesTrajets conduits={conduits} rejoints={rejoints} />}
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: active ? "none" : "1.5px solid #d8dde5",
        background: active ? colors.navy : "#fff",
        color: active ? "#fff" : colors.navy,
        padding: "9px 16px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: fontBody,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}

function Disponibles({ items }: { items: TrajetDisponible[] }) {
  if (items.length === 0) return <EmptyState label="Aucun trajet disponible pour le moment." />
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
      {items.map((t) => (
        <TrajetCard key={t.id} trajet={t} />
      ))}
    </div>
  )
}

function TrajetCard({ trajet }: { trajet: TrajetDisponible }) {
  const [state, action, pending] = useActionState(
    async (_prev: { error: string | null } | undefined) => rejoindreCovoiturage(trajet.id),
    undefined
  )
  const joined = trajet.dejaInscrit || state?.error === null

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>
        {trajet.depart} → {trajet.destination}
      </span>
      <span style={{ fontSize: 12, color: colors.textLight }}>{dateFormatter.format(new Date(trajet.dateDepart))}</span>
      <span style={{ fontSize: 12, color: colors.textLight }}>
        Conducteur : {trajet.conducteurNom} · {trajet.placesRestantes} place{trajet.placesRestantes > 1 ? "s" : ""} restante
        {trajet.placesRestantes > 1 ? "s" : ""}
      </span>
      {trajet.commentaire && <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>{trajet.commentaire}</p>}

      {trajet.isConducteur ? (
        <span style={{ fontSize: 12, color: colors.textLight, fontWeight: 600 }}>Vous êtes le conducteur</span>
      ) : joined ? (
        <span style={{ fontSize: 12, color: "#3f9142", fontWeight: 600 }}>Vous êtes inscrit</span>
      ) : trajet.statut === "COMPLET" ? (
        <span style={{ fontSize: 12, color: colors.textLight, fontWeight: 600 }}>Complet</span>
      ) : (
        <form action={action}>
          <button
            type="submit"
            disabled={pending}
            style={{
              alignSelf: "flex-start",
              background: colors.navy,
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: pending ? "default" : "pointer",
            }}
          >
            {pending ? "..." : "Rejoindre"}
          </button>
        </form>
      )}
      {state?.error && <span style={{ color: colors.red, fontSize: 11 }}>{state.error}</span>}
    </div>
  )
}

function MesTrajets({ conduits, rejoints }: { conduits: TrajetConduit[]; rejoints: TrajetRejoint[] }) {
  if (conduits.length === 0 && rejoints.length === 0) {
    return <EmptyState label="Vous n'avez proposé ni rejoint aucun trajet." />
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {conduits.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase" }}>Trajets que je conduis</span>
          {conduits.map((t) => (
            <ConduitCard key={t.id} trajet={t} />
          ))}
        </div>
      )}
      {rejoints.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy, textTransform: "uppercase" }}>Trajets rejoints</span>
          {rejoints.map((t) => (
            <RejointCard key={t.id} trajet={t} />
          ))}
        </div>
      )}
    </div>
  )
}

function ConduitCard({ trajet }: { trajet: TrajetConduit }) {
  const [state, action, pending] = useActionState(
    async (_prev: { error: string | null } | undefined) => annulerCovoiturage(trajet.id),
    undefined
  )
  const annule = trajet.statut === "ANNULE" || state?.error === null

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>
        {trajet.depart} → {trajet.destination}
      </span>
      <span style={{ fontSize: 12, color: colors.textLight }}>{dateFormatter.format(new Date(trajet.dateDepart))}</span>
      <span style={{ fontSize: 12, color: colors.textLight }}>
        Passagers : {trajet.passagers.length > 0 ? trajet.passagers.join(", ") : "aucun pour le moment"}
      </span>
      {annule ? (
        <span style={{ fontSize: 12, color: colors.textLight, fontWeight: 600 }}>Trajet annulé</span>
      ) : (
        <form action={action}>
          <button
            type="submit"
            disabled={pending}
            style={{ background: "transparent", border: "1px solid #f3c6cb", color: colors.red, fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 4, cursor: pending ? "default" : "pointer", fontFamily: fontBody }}
          >
            Annuler ce trajet
          </button>
        </form>
      )}
      {state?.error && <span style={{ color: colors.red, fontSize: 11 }}>{state.error}</span>}
    </div>
  )
}

function RejointCard({ trajet }: { trajet: TrajetRejoint }) {
  const [left, action] = useActionState(async () => {
    await quitterCovoiturage(trajet.id)
    return true
  }, false)

  if (left) return null

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>
        {trajet.depart} → {trajet.destination}
      </span>
      <span style={{ fontSize: 12, color: colors.textLight }}>
        {dateFormatter.format(new Date(trajet.dateDepart))} · Conducteur : {trajet.conducteurNom}
      </span>
      <form action={action}>
        <button
          type="submit"
          style={{ alignSelf: "flex-start", background: "transparent", border: "1px solid #d8dde5", color: colors.navy, fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 4, cursor: "pointer", fontFamily: fontBody }}
        >
          Se désinscrire
        </button>
      </form>
    </div>
  )
}

function ProposerForm({ formations, onDone }: { formations: FormationOption[]; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: { error: string | null } | undefined, formData: FormData) => {
      const result = await proposerCovoiturage(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ background: "#fff", border: `1px solid ${colors.gold}`, borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
        <input name="depart" placeholder="Départ" required style={fieldStyle} />
        <input name="destination" placeholder="Destination" required style={fieldStyle} />
        <input name="dateDepart" type="datetime-local" required style={fieldStyle} />
        <input name="places" type="number" min={1} placeholder="Places" defaultValue={3} style={fieldStyle} />
        <select name="formationId" defaultValue="" style={fieldStyle}>
          <option value="">Formation associée (optionnel)</option>
          {formations.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titre}
            </option>
          ))}
        </select>
      </div>
      <textarea name="commentaire" placeholder="Commentaire (optionnel)" rows={2} style={{ ...fieldStyle, resize: "vertical" }} />
      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          disabled={pending}
          style={{ alignSelf: "flex-start", background: colors.red, color: "#fff", border: "none", padding: "9px 18px", borderRadius: 4, fontSize: 13, fontWeight: 700, fontFamily: fontBody, cursor: pending ? "default" : "pointer" }}
        >
          {pending ? "Envoi..." : "Proposer"}
        </button>
        <button
          type="button"
          onClick={onDone}
          style={{ background: "transparent", border: "1px solid #d8dde5", color: colors.navy, fontSize: 12, fontWeight: 700, padding: "9px 14px", borderRadius: 4, cursor: "pointer", fontFamily: fontBody }}
        >
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
