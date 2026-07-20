import type { IconeAccompagnement, TransitionHero, AlignementHero } from "@/generated/prisma"

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

export const ALIGNEMENT_LABELS: Record<AlignementHero, string> = {
  GAUCHE: "À gauche",
  CENTRE: "Au centre",
  DROITE: "À droite",
}
