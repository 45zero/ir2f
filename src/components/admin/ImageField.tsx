"use client"

import { useState, type ChangeEvent } from "react"
import { colors, fontBody } from "@/lib/theme"

export function ImageField({
  name,
  label,
  defaultUrl,
  required,
}: {
  name: string
  label: string
  defaultUrl?: string | null
  required?: boolean
}) {
  const [preview, setPreview] = useState(defaultUrl ?? "")
  const [fileName, setFileName] = useState<string | null>(null)

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setFileName(file.name)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {preview ? (
          <div
            style={{
              width: 88,
              height: 60,
              borderRadius: 6,
              backgroundImage: `url('${preview}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid #e2e5ea",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 88,
              height: 60,
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
          {fileName ? "Changer l'image" : "Choisir une image"}
          <input type="file" name={`${name}File`} accept="image/*" onChange={onChange} style={{ display: "none" }} />
        </label>
        {fileName && <span style={{ fontSize: 12, color: colors.textLight }}>{fileName}</span>}
      </div>
      <input type="hidden" name={name} defaultValue={defaultUrl ?? ""} />
      {required && !defaultUrl && (
        <span style={{ fontSize: 11, color: colors.textLight }}>Format JPG, PNG ou WebP.</span>
      )}
    </div>
  )
}
