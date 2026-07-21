// Constantes de conventions partagées entre code serveur (variables.ts) et code client
// (formulaire de signature, assistant de préparation de modèle) — pas d'import "server-only" ici,
// volontairement (voir la note "server/client boundary" dans la mémoire du projet).
import type { RoleSignataire } from "@/generated/prisma"

/** Noms des champs-emplacements de signature que le modèle PDF doit contenir (vides, un par rôle). */
export const SIGNATURE_FIELD_NAMES: Record<RoleSignataire, string> = {
  STAGIAIRE: "signature_stagiaire",
  CLUB: "signature_club",
  TUTEUR: "signature_tuteur",
  MAITRE_DE_STAGE: "signature_maitre_de_stage",
  RESPONSABLE_PEDAGOGIQUE: "signature_responsable_pedagogique",
}

/** Options de "Nature de l'intervention pédagogique" (article 3) — choix multiple. */
export const NATURE_INTERVENTION_OPTIONS = [
  { value: "ENSEIGNEMENT", label: "Enseignement de la pratique du football", champ: "check_nature_enseignement" },
  { value: "ENTRAINEMENT", label: "Entraînement d'une équipe de football", champ: "check_nature_entrainement" },
  { value: "COMPETITION", label: "Compétition", champ: "check_nature_competition" },
  { value: "VIE_ASSOCIATIVE", label: "Participation à la vie associative", champ: "check_nature_vie_associative" },
  { value: "SOUTIEN_ADMIN", label: "Soutien à la gestion administrative et financière d'une association", champ: "check_nature_soutien_admin" },
  { value: "AUTRE", label: "Autre", champ: "check_nature_autre" },
] as const

export type NatureIntervention = (typeof NATURE_INTERVENTION_OPTIONS)[number]["value"]

/** Catégories d'âge pour "Préciser le public" (article 3) — choix unique. */
export const PUBLIC_VISE_OPTIONS = ["U7", "U8", "U9", "U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "U18", "U19", "SENIORS"] as const

/** Les 3 paires Oui/Non "Objectifs pédagogiques" (article 3). */
export const OBJECTIF_PEDAGOGIQUE_FIELDS = [
  {
    key: "objectifEncadrementSeul",
    formKey: "objectif_seul",
    label: "Encadrement seul de diverses actions pédagogiques",
    champOui: "check_objectif_seul_oui",
    champNon: "check_objectif_seul_non",
  },
  {
    key: "objectifEncadrementAutonomie",
    formKey: "objectif_autonomie",
    label: "Encadrement en autonomie, en présence du tuteur",
    champOui: "check_objectif_autonomie_oui",
    champNon: "check_objectif_autonomie_non",
  },
  {
    key: "objectifEncadrementPonctuel",
    formKey: "objectif_ponctuel",
    label: "Encadrement ponctuel de diverses actions éducatives",
    champOui: "check_objectif_ponctuel_oui",
    champNon: "check_objectif_ponctuel_non",
  },
] as const

/** Variables "données" (hors signature) attendues dans un modèle PDF fillable — la liste que l'admin voit lors de l'upload direct, et parmi laquelle on choisit lors de l'assistant de préparation. */
export const ASSIGNABLE_TEMPLATE_FIELD_NAMES: string[] = [
  "formation_titre",
  "formation_lieu",
  "formation_dates",
  "formation_date_debut",
  "formation_date_fin",
  "stagiaire_civilite",
  "stagiaire_nom",
  "stagiaire_prenom",
  "stagiaire_nom_prenom",
  "stagiaire_date_naissance",
  "stagiaire_adresse",
  "stagiaire_cp",
  "stagiaire_ville",
  "stagiaire_telephone",
  "stagiaire_email",
  "stagiaire_public_vise",
  "nature_intervention_autre_texte",
  "club_nom",
  "club_numero_affiliation",
  "club_email",
  "tuteur_nom",
  "tuteur_prenom",
  "tuteur_nom_prenom",
  "tuteur_email",
  "maitre_de_stage_nom",
  "maitre_de_stage_prenom",
  "maitre_de_stage_nom_prenom",
  "maitre_de_stage_adresse",
  "maitre_de_stage_cp",
  "maitre_de_stage_ville",
  "maitre_de_stage_email",
  "responsable_pedagogique_nom",
  "responsable_pedagogique_prenom",
  "responsable_pedagogique_nom_prenom",
  "responsable_pedagogique_email",
  "responsable_pedagogique_telephone",
  ...NATURE_INTERVENTION_OPTIONS.map((o) => o.champ),
  ...OBJECTIF_PEDAGOGIQUE_FIELDS.flatMap((o) => [o.champOui, o.champNon]),
]

/** Toutes les variables attendues, signatures comprises. */
export const ALL_TEMPLATE_FIELD_NAMES: string[] = [...ASSIGNABLE_TEMPLATE_FIELD_NAMES, ...Object.values(SIGNATURE_FIELD_NAMES)]
