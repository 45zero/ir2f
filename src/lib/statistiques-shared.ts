// Constantes partagées (sans Prisma) pour l'onglet admin « Statistiques ».

export const STAT_SECTIONS = [
  { key: "accueil", label: "Accueil", prefix: "/" },
  { key: "formations", label: "Formations", prefix: "/formations" },
  { key: "emploi", label: "Emploi", prefix: "/emploi" },
  { key: "financement", label: "Financement", prefix: "/financement" },
  { key: "documentation", label: "Documentation", prefix: "/documentation" },
  { key: "actualites", label: "Actualités", prefix: "/actualites" },
  { key: "contact", label: "Contact", prefix: "/contact" },
  { key: "convention", label: "Conventions", prefix: "/convention" },
] as const

export type StatSectionKey = "ensemble" | (typeof STAT_SECTIONS)[number]["key"]

export const STAT_PERIODES = [
  { jours: 7, label: "7 jours" },
  { jours: 30, label: "30 jours" },
  { jours: 90, label: "90 jours" },
  { jours: 365, label: "12 mois" },
] as const
