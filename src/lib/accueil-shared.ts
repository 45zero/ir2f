import type { IconeAccompagnement } from "@/generated/prisma"

export const ICONE_LABELS: Record<IconeAccompagnement, string> = {
  FINANCEMENT: "Financement (cercle)",
  GESTION: "Gestion (mallette)",
  FORMATION: "Formation (livre)",
  CONTACT: "Contact (personnes)",
  DOCUMENT: "Document (feuille)",
  VALIDATION: "Validation (coche)",
}
