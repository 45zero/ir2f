"use client"

import { useRef, useState, type PointerEvent } from "react"
import { colors, fontBody } from "@/lib/theme"

function tabStyle(active: boolean) {
  return {
    background: active ? colors.navy : "#f5f7fb",
    color: active ? "#fff" : colors.navy,
    border: `1px solid ${active ? colors.navy : "#d8dde5"}`,
    padding: "7px 14px",
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: fontBody,
    cursor: "pointer",
  }
}

export function SignaturePad({ name }: { name: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const hasDrawn = useRef(false)
  const [mode, setMode] = useState<"draw" | "type">("draw")
  const [typedName, setTypedName] = useState("")
  const [dataUrl, setDataUrl] = useState("")

  function clearCanvas() {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    hasDrawn.current = false
    setDataUrl("")
  }

  function pointerPos(e: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }

  function onPointerDown(e: PointerEvent<HTMLCanvasElement>) {
    if (mode !== "draw") return
    drawing.current = true
    const ctx = canvasRef.current!.getContext("2d")!
    const { x, y } = pointerPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function onPointerMove(e: PointerEvent<HTMLCanvasElement>) {
    if (mode !== "draw" || !drawing.current) return
    const ctx = canvasRef.current!.getContext("2d")!
    const { x, y } = pointerPos(e)
    ctx.lineTo(x, y)
    ctx.strokeStyle = colors.text
    ctx.lineWidth = 2.4
    ctx.lineCap = "round"
    ctx.stroke()
    hasDrawn.current = true
  }

  function onPointerUp() {
    if (!drawing.current) return
    drawing.current = false
    if (hasDrawn.current) setDataUrl(canvasRef.current!.toDataURL("image/png"))
  }

  function onTypedNameChange(value: string) {
    setTypedName(value)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (!value.trim()) {
      setDataUrl("")
      return
    }
    ctx.font = "40px cursive"
    ctx.fillStyle = colors.text
    ctx.textBaseline = "middle"
    ctx.fillText(value, 16, canvas.height / 2)
    setDataUrl(canvas.toDataURL("image/png"))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => {
            setMode("draw")
            clearCanvas()
          }}
          style={tabStyle(mode === "draw")}
        >
          Dessiner ma signature
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("type")
            setTypedName("")
            clearCanvas()
          }}
          style={tabStyle(mode === "type")}
        >
          Taper mon nom
        </button>
      </div>

      {mode === "type" && (
        <input
          value={typedName}
          onChange={(e) => onTypedNameChange(e.target.value)}
          placeholder="Votre nom"
          style={{
            border: "1px solid #e2e5ea",
            borderRadius: 5,
            padding: "9px 12px",
            fontSize: 13,
            fontFamily: fontBody,
            outline: "none",
            maxWidth: 300,
          }}
        />
      )}

      <canvas
        ref={canvasRef}
        width={480}
        height={140}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          width: "100%",
          maxWidth: 480,
          height: 140,
          border: "1.5px dashed #d8dde5",
          borderRadius: 8,
          background: "#fff",
          touchAction: "none",
          cursor: mode === "draw" ? "crosshair" : "default",
        }}
      />

      {mode === "draw" && (
        <button
          type="button"
          onClick={clearCanvas}
          style={{
            alignSelf: "flex-start",
            background: "transparent",
            border: "none",
            color: colors.textLight,
            fontSize: 11.5,
            textDecoration: "underline",
            cursor: "pointer",
            fontFamily: fontBody,
            padding: 0,
          }}
        >
          Effacer
        </button>
      )}

      <input type="hidden" name={name} value={dataUrl} readOnly />
    </div>
  )
}
