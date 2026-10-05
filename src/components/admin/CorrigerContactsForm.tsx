"use client"

import { useActionState, useEffect } from "react"
import { corrigerContactsStagiaire } from "@/lib/actions/conventions"
import { colors, fontBody } from "@/lib/theme"

export type StagiaireContacts = {
  email: string
  emailClub: string | null
  tuteurEmail: string | null
  maitreDeStageEmail: string | null
}

const CHAMPS: { name: keyof StagiaireContacts; label: string; required?: boolean }[] = [
  { name: "email", label: "Email du stagiaire", required: true },
  { name: "emailClub", label: "Email du club" },
  { name: "tuteurEmail", label: "Email du tuteur (facultatif)" },
  { name: "maitreDeStageEmail", label: "Email du maître de stage" },
]

/** Correction des emails d'une ligne + (re)génération et envoi de sa convention — voir corrigerContactsStagiaire. */
export function CorrigerContactsForm({
  stagiaireId,
  contacts,
  conventionGeneree,
  onDone,
}: {
  stagiaireId: string
  contacts: StagiaireContacts
  conventionGeneree: boolean
  onDone: () => void
}) {
  const [state, action, isPending] = useActionState(
    async (_prev: { error: string | null } | undefined, formData: FormData) => corrigerContactsStagiaire(stagiaireId, formData),
    undefined
  )

  useEffect(() => {
    if (state && !state.error) onDone()
  }, [state, onDone])

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: fontBody, padding: "4px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {CHAMPS.map((c) => (
          <label key={c.name} style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11.5, fontWeight: 700, color: colors.navy }}>
            {c.label}
            <input
              type="email"
              name={c.name}
              defaultValue={contacts[c.name] ?? ""}
              required={c.required}
              style={{ padding: "7px 10px", border: "1px solid #d8dde5", borderRadius: 6, fontSize: 13, fontWeight: 400, color: colors.text, fontFamily: fontBody }}
            />
          </label>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 11.5, color: colors.textMuted, lineHeight: 1.5 }}>
        {conventionGeneree
          ? "La convention sera recréée avec ces adresses puis renvoyée au stagiaire. "
          : "La convention sera créée puis envoyée au stagiaire. "}
        Pensez à reporter la correction dans le fichier Excel : un nouvel import avec l&apos;ancienne adresse l&apos;annulerait.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: isPending ? "#e999a0" : colors.red,
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: isPending ? "default" : "pointer",
          }}
        >
          {isPending ? "Envoi..." : "Enregistrer et envoyer"}
        </button>
        <button
          type="button"
          onClick={onDone}
          disabled={isPending}
          style={{ background: "none", border: "none", color: colors.textMuted, fontSize: 12, fontWeight: 700, fontFamily: fontBody, cursor: "pointer" }}
        >
          Annuler
        </button>
        {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      </div>
    </form>
  )
}
