"use client"

import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { flushSync } from "react-dom"
import { colors, fontBody } from "@/lib/theme"
import { getVideoUploadTarget } from "@/lib/actions/video-upload"
import { getBrowserSupabase } from "@/lib/supabase-browser"
import { VIDEOS_BUCKET } from "@/lib/storage-shared"

export function VideoField({
  name,
  label,
  defaultUrl,
  keyHint,
  onUploadStateChange,
}: {
  name: string
  label: string
  defaultUrl?: string | null
  keyHint: string
  // Prévient le formulaire parent qu'un envoi est en cours et lui fournit la promesse
  // correspondante, pour qu'il puisse l'attendre avant de soumettre (voir TutorielInscriptionManager.tsx) —
  // plus fiable que de compter uniquement sur le blocage de la soumission ci-dessous.
  onUploadStateChange?: (uploading: boolean, pending: Promise<void> | null) => void
}) {
  // Champ piloté par du state React (pas defaultValue/ref) : React réinitialise automatiquement
  // tout champ non contrôlé d'un <form action={...}> à chaque tentative de soumission (succès ou
  // échec), ce qui effaçait silencieusement l'URL de la vidéo tout juste envoyée. Un champ
  // contrôlé (value + onChange, ici via setUrl) échappe à cette réinitialisation.
  const [url, setUrl] = useState(defaultUrl ?? "")
  const [preview, setPreview] = useState(defaultUrl ?? "")
  const [fileName, setFileName] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle")
  const [errorDetail, setErrorDetail] = useState<string | null>(null)
  const [blockedMessage, setBlockedMessage] = useState(false)
  const hiddenRef = useRef<HTMLInputElement>(null)
  const uploadingRef = useRef(false)
  const blockedSubmitRef = useRef(false)

  // Filet de sécurité pour une soumission déclenchée autrement qu'en cliquant sur le bouton
  // « Enregistrer » (ex. touche Entrée dans un champ texte) : le formulaire parent attend
  // normalement la promesse d'envoi (onUploadStateChange) avant de soumettre, mais ce blocage
  // couvre les cas où ce n'est pas possible.
  useEffect(() => {
    const form = hiddenRef.current?.form
    if (!form) return
    function onSubmit(e: SubmitEvent) {
      if (uploadingRef.current) {
        e.preventDefault()
        setBlockedMessage(true)
        blockedSubmitRef.current = true
      }
    }
    form.addEventListener("submit", onSubmit)
    return () => form.removeEventListener("submit", onSubmit)
  }, [])

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setFileName(file.name)
    setStatus("uploading")
    setErrorDetail(null)
    setBlockedMessage(false)
    uploadingRef.current = true
    setUrl("")

    const uploadPromise = (async () => {
      try {
        const { storagePath, token, publicUrl } = await getVideoUploadTarget(keyHint, file.name)
        const { error } = await getBrowserSupabase().storage.from(VIDEOS_BUCKET).uploadToSignedUrl(storagePath, token, file)
        if (error) throw error
        // flushSync : le champ étant maintenant contrôlé (value=url), la resoumission juste après
        // doit voir l'URL déjà commitée dans le DOM, pas une mise à jour encore en attente.
        flushSync(() => {
          setUrl(publicUrl)
          setStatus("idle")
          setBlockedMessage(false)
        })
        if (blockedSubmitRef.current) {
          blockedSubmitRef.current = false
          hiddenRef.current?.form?.requestSubmit()
        }
      } catch (err) {
        // L'envoi a échoué : on restaure la vidéo précédente (aperçu + champ caché) pour qu'un
        // enregistrement fait sans remarquer l'erreur n'efface pas la vidéo existante.
        setPreview(defaultUrl ?? "")
        setFileName(null)
        setUrl(defaultUrl ?? "")
        setStatus("error")
        setErrorDetail(err instanceof Error ? err.message : String(err))
        blockedSubmitRef.current = false
      } finally {
        uploadingRef.current = false
        onUploadStateChange?.(false, null)
      }
    })()

    onUploadStateChange?.(true, uploadPromise)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {preview ? (
          <video
            src={preview}
            controls
            preload="metadata"
            style={{ width: 140, height: 78, borderRadius: 6, border: "1px solid #e2e5ea", background: "#000", flexShrink: 0 }}
          />
        ) : (
          <div
            style={{
              width: 140,
              height: 78,
              borderRadius: 6,
              border: "1px dashed #d8dde5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b7bfcc",
              fontSize: 10,
              flexShrink: 0,
            }}
          >
            Aucune
          </div>
        )}
        <label
          style={{
            background: "#f5f7fb",
            border: "1.5px solid #d8dde5",
            color: colors.navy,
            padding: "9px 16px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: "pointer",
          }}
        >
          {fileName ? "Changer la vidéo" : "Choisir un fichier vidéo"}
          <input type="file" accept="video/*" onChange={onChange} style={{ display: "none" }} />
        </label>
        {status === "uploading" && <span style={{ fontSize: 12, color: colors.textLight }}>Envoi en cours…</span>}
        {status === "error" && (
          <span style={{ fontSize: 12, color: colors.red }}>
            Échec de l&apos;envoi{errorDetail ? ` : ${errorDetail}` : ""}. Réessayez.
          </span>
        )}
        {status === "idle" && fileName && <span style={{ fontSize: 12, color: colors.textLight }}>{fileName}</span>}
      </div>
      {blockedMessage && (
        <span style={{ fontSize: 12, color: colors.red, fontWeight: 600 }}>
          La vidéo est encore en cours d&apos;envoi — l&apos;enregistrement se fera automatiquement dès la fin de l&apos;envoi.
        </span>
      )}
      <input ref={hiddenRef} type="hidden" name={name} value={url} readOnly />
    </div>
  )
}
