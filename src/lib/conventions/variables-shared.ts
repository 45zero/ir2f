// Constantes de l'article 3 (nature de l'intervention, public visé, objectifs pédagogiques),
// utilisées à la fois côté serveur (variables.ts, "use server") et côté client (formulaire de
// signature du stagiaire) — pas d'import "server-only" ici, volontairement.

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
