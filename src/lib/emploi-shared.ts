import type { SectionEmploi, TypeDocument, IconePratique } from "@/generated/prisma"

export const SECTION_EMPLOI_LABELS: Record<SectionEmploi, string> = {
  FINANCEMENTS: "Financements & Subventions",
  GESTION_EMPLOI: "Gestion de l'emploi",
  FORMATION_EMPLOYABILITE: "Formation–Employabilité",
}

export const TYPE_DOCUMENT_LABELS: Record<TypeDocument, string> = {
  FICHIER: "Fichier",
  LIEN_EXTERNE: "Lien externe",
}

export const ICONE_PRATIQUE_LABELS: Record<IconePratique, string> = {
  SOCIETAL: "Engagement sociétal",
  COTISATION: "Cotisation",
  PARTENARIAT: "Partenariat & mécénat",
  AUTRE: "Autre",
}
