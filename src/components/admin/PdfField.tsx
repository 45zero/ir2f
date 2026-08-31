"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { colors, fontBody } from "@/lib/theme"

const nomFieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "8px 10px",
  fontSize: 12.5,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

export function PdfField({
  name,
  label,
  defaultUrl,
  defaultNom,
}: {
  name: string
  label: string
  defaultUrl?: string | null
  defaultNom?: string | null
}) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [nom, setNom] = useState(defaultNom ?? "")
  const inputRef = useRef<HTMLInputElement>(null)

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setNom((prev) => prev || file.name.replace(/\.pdf$/i, ""))
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
          {fileName || defaultUrl ? "Changer le PDF" : "Choisir un PDF"}
          <input
            ref={inputRef}
            type="file"
            name={`${name}File`}
            accept="application/pdf"
            onChange={onChange}
            style={{ display: "none" }}
          />
        </label>
        {(fileName || defaultUrl) && (
          <span style={{ fontSize: 12, color: colors.textLight }}>{fileName ?? "PDF actuel conservé"}</span>
        )}
      </div>
      <input
        placeholder="Nom affiché (ex. « Calendrier des sessions »)"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        name={`${name}Nom`}
        style={nomFieldStyle}
      />
      <input type="hidden" name={name} defaultValue={defaultUrl ?? ""} />
    </div>
  )
}
