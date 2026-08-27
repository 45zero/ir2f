"use client"

import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { colors, fontBody } from "@/lib/theme"
import { getVideoUploadTarget } from "@/lib/actions/video-upload"
import { getBrowserSupabase } from "@/lib/supabase-browser"
import { VIDEOS_BUCKET } from "@/lib/storage-shared"

export function VideoField({
  name,
  label,
  defaultUrl,
  keyHint,
}: {
  name: string
  label: string
  defaultUrl?: string | null
  keyHint: string
}) {
  const [preview, setPreview] = useState(defaultUrl ?? "")
  const [fileName, setFileName] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle")
  const [blockedMessage, setBlockedMessage] = useState(false)
  const hiddenRef = useRef<HTMLInputElement>(null)
  const uploadingRef = useRef(false)

  // L'aperçu s'affiche dès le choix du fichier, mais l'envoi réel vers Supabase prend du temps
  // en tâche de fond : on bloque la soumission du formulaire tant qu'il n'est pas terminé, sinon
  // le champ vidéo part vide et la vidéo « disparaît » après enregistrement.
  useEffect(() => {
    const form = hiddenRef.current?.form
    if (!form) return
    function onSubmit(e: SubmitEvent) {
      if (uploadingRef.current) {
        e.preventDefault()
        setBlockedMessage(true)
      }
    }
    form.addEventListener("submit", onSubmit)
    return () => form.removeEventListener("submit", onSubmit)
  }, [])

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setFileName(file.name)
    setStatus("uploading")
    setBlockedMessage(false)
    uploadingRef.current = true
    if (hiddenRef.current) hiddenRef.current.value = ""

    try {
      const { storagePath, token, publicUrl } = await getVideoUploadTarget(keyHint, file.name)
      const { error } = await getBrowserSupabase().storage.from(VIDEOS_BUCKET).uploadToSignedUrl(storagePath, token, file)
      if (error) throw error
      if (hiddenRef.current) hiddenRef.current.value = publicUrl
      setStatus("idle")
      setBlockedMessage(false)
    } catch {
      setStatus("error")
    } finally {
      uploadingRef.current = false
    }
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
        {status === "error" && <span style={{ fontSize: 12, color: colors.red }}>Échec de l&apos;envoi, réessayez.</span>}
        {status === "idle" && fileName && <span style={{ fontSize: 12, color: colors.textLight }}>{fileName}</span>}
      </div>
      {blockedMessage && (
        <span style={{ fontSize: 12, color: colors.red, fontWeight: 600 }}>
          La vidéo est encore en cours d&apos;envoi — attends la fin puis clique à nouveau sur Enregistrer.
        </span>
      )}
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={defaultUrl ?? ""} />
    </div>
  )
}
