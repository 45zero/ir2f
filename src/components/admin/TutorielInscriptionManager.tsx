"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { saveTutorielInscription, type TutorielInscriptionActionState } from "@/lib/actions/tutoriel-inscription"
import { VideoField } from "@/components/admin/VideoField"
import { DocFileField } from "@/components/admin/DocFileField"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { TutorielInscriptionCible, TutorielInscriptionMode } from "@/generated/prisma"

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

const MODE_LABELS: Record<TutorielInscriptionMode, string> = {
  LIEN: "Redirection vers un lien",
  PDF: "Fichier PDF",
  VIDEO: "Vidéo",
}

export type AdminTutorielInscription = {
  cible: TutorielInscriptionCible
  mode: TutorielInscriptionMode
  lienUrl: string | null
  pdfUrl: string | null
  youtubeUrl: string | null
  videoFichierUrl: string | null
}

const CIBLE_LABEL: Record<TutorielInscriptionCible, string> = {
  STAGIAIRE: "Tutoriel inscription stagiaire",
  CLUB: "Tutoriel inscription club",
}

export function TutorielInscriptionManager({
  formationId,
  items,
}: {
  formationId: string
  items: Partial<Record<TutorielInscriptionCible, AdminTutorielInscription>>
}) {
  return (
    <div style={sectionCardStyle}>
      <div>
        <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 19, fontWeight: 800, margin: 0 }}>
          Tutoriels d&apos;inscription
        </h2>
        <p style={{ color: colors.textLight, fontSize: 12.5, margin: "4px 0 0" }}>
          Un petit lien discret apparaît sous « Je m&apos;inscris » et « Le club m&apos;inscrit ! » sur la fiche
          publique de cette formation (mode d&apos;inscription « Portail FFF » uniquement). Laissez un tutoriel
          non configuré pour que son lien n&apos;apparaisse pas.
        </p>
      </div>

      <TutorielForm formationId={formationId} cible="STAGIAIRE" item={items.STAGIAIRE} />
      <TutorielForm formationId={formationId} cible="CLUB" item={items.CLUB} />
    </div>
  )
}

function TutorielForm({
  formationId,
  cible,
  item,
}: {
  formationId: string
  cible: TutorielInscriptionCible
  item?: AdminTutorielInscription
}) {
  // Tous ces champs sont pilotés par du state React (value + onChange), pas par defaultValue :
  // React réinitialise automatiquement les champs non contrôlés d'un <form action={...}> à chaque
  // tentative de soumission, y compris en cas d'échec — un champ contrôlé y échappe.
  const [mode, setMode] = useState<TutorielInscriptionMode>(item?.mode ?? "LIEN")
  const [lienUrl, setLienUrl] = useState(item?.lienUrl ?? "")
  const [youtubeUrl, setYoutubeUrl] = useState(item?.youtubeUrl ?? "")
  const [videoUploading, setVideoUploading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const modeSelectRef = useRef<HTMLSelectElement>(null)
  const videoUploadPromiseRef = useRef<Promise<void> | null>(null)
  const [state, formAction, pending] = useActionState(
    (prev: TutorielInscriptionActionState | undefined, formData: FormData) =>
      saveTutorielInscription(formationId, cible, prev, formData),
    undefined
  )

  // React réinitialise le <form> au niveau du DOM natif à chaque tentative de soumission (succès
  // ou échec) — pour un <select> contrôlé, ça peut désynchroniser l'option affichée de l'état React
  // si React ne rejoue pas l'écriture (il pense que rien n'a changé). On force la resynchronisation
  // à chaque rendu pour que le menu affiché corresponde toujours à `mode`.
  useEffect(() => {
    if (modeSelectRef.current) modeSelectRef.current.value = mode
  })

  return (
    <form ref={formRef} action={formAction} style={cardStyle}>
      <span style={{ fontWeight: 700, fontSize: 14, color: colors.navy }}>{CIBLE_LABEL[cible]}</span>

      <label style={labelStyle}>
        <span style={labelText}>Mode</span>
        <select
          ref={modeSelectRef}
          name="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as TutorielInscriptionMode)}
          style={fieldStyle}
        >
          {Object.entries(MODE_LABELS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </label>

      {mode === "LIEN" && (
        <label style={labelStyle}>
          <span style={labelText}>Lien (ouvert dans un nouvel onglet)</span>
          <input
            name="lienUrl"
            placeholder="https://..."
            value={lienUrl}
            onChange={(e) => setLienUrl(e.target.value)}
            style={fieldStyle}
          />
        </label>
      )}

      {mode === "PDF" && <DocFileField name="pdf" label="Fichier PDF" defaultUrl={item?.pdfUrl} />}

      {mode === "VIDEO" && (
        <>
          <label style={labelStyle}>
            <span style={labelText}>Vidéo — lien YouTube (optionnel si fichier vidéo fourni)</span>
            <input
              name="youtubeUrl"
              placeholder="Lien YouTube"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              style={fieldStyle}
            />
          </label>
          <VideoField
            name="videoFichier"
            label="Vidéo — ou fichier vidéo direct (optionnel)"
            defaultUrl={item?.videoFichierUrl}
            keyHint={`tutoriels-inscription-videos/${formationId}`}
            onUploadStateChange={(uploading, promise) => {
              setVideoUploading(uploading)
              videoUploadPromiseRef.current = promise
            }}
          />
        </>
      )}

      {mode === "VIDEO" && videoUploading && (
        <span style={{ color: colors.textLight, fontSize: 12 }}>Envoi de la vidéo en cours, merci de patienter…</span>
      )}
      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <button
        type="button"
        disabled={pending || (mode === "VIDEO" && videoUploading)}
        style={submitButtonStyle}
        onClick={async () => {
          // On attend explicitement la fin de l'envoi vidéo en cours avant de soumettre, plutôt que
          // de compter uniquement sur l'attribut disabled (qui n'empêche pas une soumission par
          // touche Entrée) : sans ça, un clic pile pendant l'upload pouvait partir avec un champ
          // vidéo encore vide.
          if (mode === "VIDEO" && videoUploadPromiseRef.current) {
            await videoUploadPromiseRef.current
          }
          formRef.current?.requestSubmit()
        }}
      >
        {mode === "VIDEO" && videoUploading ? "Envoi de la vidéo..." : pending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  )
}
