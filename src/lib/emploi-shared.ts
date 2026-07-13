import type { SectionEmploi, TypeDocument } from "@/generated/prisma"

export const SECTION_EMPLOI_LABELS: Record<SectionEmploi, string> = {
  FINANCEMENTS: "Financements & Subventions",
  GESTION_EMPLOI: "Gestion de l'emploi",
  FORMATION_EMPLOYABILITE: "Formation–Employabilité",
}

export const TYPE_DOCUMENT_LABELS: Record<TypeDocument, string> = {
  FICHIER: "Fichier",
  LIEN_EXTERNE: "Lien externe",
}
