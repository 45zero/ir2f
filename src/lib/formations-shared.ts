// Constantes et types purs, sans dépendance Prisma/pg — importables depuis un
// composant client sans faire fuiter le driver Postgres (Node-only) au bundle navigateur.
import type {
  CategorieFormation,
  TypeFormation,
  Filiere,
  GroupeEquivalence,
  VarianteNode,
  StatutFormation,
} from "@/generated/prisma"

export const CATEGORIE_LABELS: Record<CategorieFormation, string> = {
  EDUCATEUR: "Éducateur",
  ARBITRAGE: "Arbitrage",
  TERRAIN: "Tout Terrain",
  CLUB: "Club",
  DEV: "Chargé de développement",
}

export const TYPE_LABELS: Record<TypeFormation, string> = {
  PRESENTIEL: "Présentiel",
  VISIO: "Visio",
  ELEARNING: "E-learning",
  MIXTE: "Mixte",
}

export const STATUT_LABELS: Record<StatutFormation, string> = {
  BROUILLON: "Brouillon",
  PUBLIEE: "Publiée",
  ARCHIVEE: "Archivée",
}

export const FILIERE_LABELS: Record<Filiere, string> = {
  PROFESSIONNELLE: "Professionnelle",
  BENEVOLE: "Bénévole",
}

export const GROUPE_EQUIVALENCE_LABELS: Record<GroupeEquivalence, string> = {
  AF: "Attestations fédérales (AF)",
  CFI: "Certificats fédéraux initiateurs (CFI)",
  DF: "Diplômes fédéraux (DF)",
  CERTIF: "Certifications",
  PRO_TOP: "Parcours pro — haut",
  PRO_MID: "Parcours pro — milieu",
  PRO_BEF: "Parcours pro — BEF",
  PRO_BMF: "Parcours pro — BMF",
  PRO_MID2: "Parcours pro — recyclage",
  PRO_BOTTOM: "Parcours pro — bas",
}

export const VARIANTE_NODE_LABELS: Record<VarianteNode, string> = {
  NAVY: "Bleu marine",
  LIGHT: "Bleu clair",
  RED: "Rouge",
  OUTLINE: "Contour",
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export type FormationCard = {
  id: string
  slug: string
  titre: string
  categorie: CategorieFormation
  categorieLabel: string
  dureeLabel: string | null
  image: string | null
  cpfEligible: boolean
  modeLabel: string
  footerLabel: string
}

export type CatalogueFormation = FormationCard & {
  description: string | null
  filiere: Filiere | null
  groupeEquivalence: GroupeEquivalence | null
  varianteNode: VarianteNode | null
  badgeNode: string | null
  shortNode: string | null
}

export type FormationOption = { id: string; titre: string }

type RawFormation = {
  id: string
  slug: string
  titre: string
  categorie: CategorieFormation
  dureeLabel: string | null
  image: string | null
  cpfEligible: boolean
  modeLabel: string | null
  type: TypeFormation
}

export function toCard(f: RawFormation): FormationCard {
  const modeLabel = f.modeLabel ?? TYPE_LABELS[f.type]
  return {
    id: f.id,
    slug: f.slug,
    titre: f.titre,
    categorie: f.categorie,
    categorieLabel: CATEGORIE_LABELS[f.categorie],
    dureeLabel: f.dureeLabel,
    image: f.image,
    cpfEligible: f.cpfEligible,
    modeLabel,
    footerLabel: f.cpfEligible ? "Éligible CPF" : modeLabel,
  }
}
