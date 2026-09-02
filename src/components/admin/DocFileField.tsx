"use client"

import { useState, type ChangeEvent } from "react"
import { colors, fontBody } from "@/lib/theme"

export function DocFileField({
  name,
  label,
  defaultUrl,
}: {
  name: string
  label: string
  defaultUrl?: string | null
}) {
  const [fileName, setFileName] = useState<string | null>(null)

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
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
          {fileName || defaultUrl ? "Changer le fichier" : "Choisir un fichier (PDF ou DOCX)"}
          <input
            type="file"
            name={`${name}File`}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onChange}
            style={{ display: "none" }}
          />
        </label>
        {(fileName || defaultUrl) && (
          <span style={{ fontSize: 12, color: colors.textLight }}>{fileName ?? "Fichier actuel conservé"}</span>
        )}
      </div>
      <input type="hidden" name={name} defaultValue={defaultUrl ?? ""} />
    </div>
  )
}
