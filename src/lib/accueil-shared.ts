import type { IconeAccompagnement, TransitionHero } from "@/generated/prisma"

export const ICONE_LABELS: Record<IconeAccompagnement, string> = {
  FINANCEMENT: "Financement (cercle)",
  GESTION: "Gestion (mallette)",
  FORMATION: "Formation (livre)",
  CONTACT: "Contact (personnes)",
  DOCUMENT: "Document (feuille)",
  VALIDATION: "Validation (coche)",
}

export const TRANSITION_LABELS: Record<TransitionHero, string> = {
  FADE: "Fondu",
  SLIDE_GAUCHE: "Glissement vers la gauche",
  SLIDE_DROITE: "Glissement vers la droite",
}
