import type { CSSProperties } from "react"
import type { EffetVisuel } from "@/generated/prisma"

// Style appliqué au calque image/vidéo d'une tuile ou d'un onglet selon
// l'effet visuel choisi en admin (voir FormationTuile / FormationOnglet).
export function effetVisuelStyle(effet: EffetVisuel): CSSProperties {
  switch (effet) {
    case "NOIR_BLANC":
      return { filter: "grayscale(1)" }
    case "FLOU":
      return { filter: "blur(4px)", transform: "scale(1.08)" }
    case "FONDU":
      return { animation: "ir2fFadeIn 0.7s ease" }
    case "PARALLAXE":
      return { backgroundAttachment: "fixed" }
    default:
      return {}
  }
}

export function effetVisuelHoverStyle(effet: EffetVisuel): CSSProperties | undefined {
  return effet === "ZOOM" ? { transform: "scale(1.05)" } : undefined
}
