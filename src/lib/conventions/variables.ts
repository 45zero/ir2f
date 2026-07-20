import "server-only"
import type { Formation, ConventionStagiaire, RoleSignataire } from "@/generated/prisma"
import type { ConventionVariables } from "./pdf"

/** Ordre strict du circuit de signature : chaque étape n'est notifiée qu'une fois la précédente signée. */
export const SIGNATAIRE_ORDER: RoleSignataire[] = ["STAGIAIRE", "CLUB", "TUTEUR", "MAITRE_DE_STAGE", "RESPONSABLE_PEDAGOGIQUE"]

/** Noms des champs-emplacements de signature que le modèle PDF doit contenir (vides, un par rôle). */
export const SIGNATURE_FIELD_NAMES: Record<RoleSignataire, string> = {
  STAGIAIRE: "signature_stagiaire",
  CLUB: "signature_club",
  TUTEUR: "signature_tuteur",
  MAITRE_DE_STAGE: "signature_maitre_de_stage",
  RESPONSABLE_PEDAGOGIQUE: "signature_responsable_pedagogique",
}

type FormationVars = Pick<
  Formation,
  "titre" | "lieu" | "responsablePedagogiqueNom" | "responsablePedagogiquePrenom" | "responsablePedagogiqueEmail" | "responsablePedagogiqueTelephone"
>

type StagiaireVars = Pick<
  ConventionStagiaire,
  | "civilite"
  | "nom"
  | "prenom"
  | "dateNaissance"
  | "adresse"
  | "cp"
  | "ville"
  | "telephone"
  | "email"
  | "club"
  | "numeroAffiliationClub"
  | "emailClub"
  | "tuteurNom"
  | "tuteurPrenom"
  | "tuteurEmail"
  | "maitreDeStageNom"
  | "maitreDeStagePrenom"
  | "maitreDeStageAdresse"
  | "maitreDeStageCp"
  | "maitreDeStageVille"
  | "maitreDeStageEmail"
>

/**
 * Construit l'objet de variables injecté dans le modèle PDF. Les noms de clé ci-dessous sont le
 * contrat que l'admin doit reproduire comme noms de champs de formulaire dans le PDF fillable
 * (voir SIGNATURE_FIELD_NAMES pour les 5 emplacements de signature, remplis séparément). Le
 * tuteur et le maître de stage viennent du stagiaire (import Excel, propres à son club
 * d'accueil) ; seul le responsable pédagogique vient de la formation.
 */
export function buildConventionVariables(params: { formation: FormationVars; formationDateLabel: string | null; stagiaire: StagiaireVars }): ConventionVariables {
  const { formation, stagiaire } = params

  return {
    formation_titre: formation.titre,
    formation_lieu: formation.lieu ?? "",
    formation_dates: params.formationDateLabel ?? "",

    stagiaire_civilite: stagiaire.civilite ?? "",
    stagiaire_nom: stagiaire.nom,
    stagiaire_prenom: stagiaire.prenom,
    stagiaire_date_naissance: stagiaire.dateNaissance ?? "",
    stagiaire_adresse: stagiaire.adresse ?? "",
    stagiaire_cp: stagiaire.cp ?? "",
    stagiaire_ville: stagiaire.ville ?? "",
    stagiaire_telephone: stagiaire.telephone ?? "",
    stagiaire_email: stagiaire.email,

    club_nom: stagiaire.club ?? "",
    club_numero_affiliation: stagiaire.numeroAffiliationClub ?? "",
    club_email: stagiaire.emailClub ?? "",

    tuteur_nom: stagiaire.tuteurNom ?? "",
    tuteur_prenom: stagiaire.tuteurPrenom ?? "",
    tuteur_email: stagiaire.tuteurEmail ?? "",

    maitre_de_stage_nom: stagiaire.maitreDeStageNom ?? "",
    maitre_de_stage_prenom: stagiaire.maitreDeStagePrenom ?? "",
    maitre_de_stage_adresse: stagiaire.maitreDeStageAdresse ?? "",
    maitre_de_stage_cp: stagiaire.maitreDeStageCp ?? "",
    maitre_de_stage_ville: stagiaire.maitreDeStageVille ?? "",
    maitre_de_stage_email: stagiaire.maitreDeStageEmail ?? "",

    responsable_pedagogique_nom: formation.responsablePedagogiqueNom ?? "",
    responsable_pedagogique_prenom: formation.responsablePedagogiquePrenom ?? "",
    responsable_pedagogique_email: formation.responsablePedagogiqueEmail ?? "",
    responsable_pedagogique_telephone: formation.responsablePedagogiqueTelephone ?? "",
  }
}

/** Liste complète des noms de champs attendus dans un modèle PDF fillable — affichée à l'admin comme référence lors de l'upload d'un modèle. */
export const ALL_TEMPLATE_FIELD_NAMES: string[] = [
  "formation_titre",
  "formation_lieu",
  "formation_dates",
  "stagiaire_civilite",
  "stagiaire_nom",
  "stagiaire_prenom",
  "stagiaire_date_naissance",
  "stagiaire_adresse",
  "stagiaire_cp",
  "stagiaire_ville",
  "stagiaire_telephone",
  "stagiaire_email",
  "club_nom",
  "club_numero_affiliation",
  "club_email",
  "tuteur_nom",
  "tuteur_prenom",
  "tuteur_email",
  "maitre_de_stage_nom",
  "maitre_de_stage_prenom",
  "maitre_de_stage_adresse",
  "maitre_de_stage_cp",
  "maitre_de_stage_ville",
  "maitre_de_stage_email",
  "responsable_pedagogique_nom",
  "responsable_pedagogique_prenom",
  "responsable_pedagogique_email",
  "responsable_pedagogique_telephone",
  ...Object.values(SIGNATURE_FIELD_NAMES),
]

/** Résout le nom/email du signataire courant pour une étape donnée. Retourne `null` si l'étape ne peut pas être servie (ex. pas d'email de club/tuteur/maître de stage renseigné à l'import, ou responsable pédagogique manquant sur la formation). */
export function resolveSignataireContact(role: RoleSignataire, stagiaire: StagiaireVars, formation: FormationVars): { nom: string; email: string } | null {
  switch (role) {
    case "STAGIAIRE":
      return { nom: `${stagiaire.prenom} ${stagiaire.nom}`, email: stagiaire.email }
    case "CLUB":
      return stagiaire.emailClub ? { nom: stagiaire.club ?? "Club", email: stagiaire.emailClub } : null
    case "TUTEUR":
      return stagiaire.tuteurEmail
        ? { nom: [stagiaire.tuteurPrenom, stagiaire.tuteurNom].filter(Boolean).join(" ") || "Tuteur", email: stagiaire.tuteurEmail }
        : null
    case "MAITRE_DE_STAGE":
      return stagiaire.maitreDeStageEmail
        ? { nom: [stagiaire.maitreDeStagePrenom, stagiaire.maitreDeStageNom].filter(Boolean).join(" ") || "Maître de stage", email: stagiaire.maitreDeStageEmail }
        : null
    case "RESPONSABLE_PEDAGOGIQUE":
      return formation.responsablePedagogiqueEmail
        ? {
            nom: [formation.responsablePedagogiquePrenom, formation.responsablePedagogiqueNom].filter(Boolean).join(" ") || "Responsable pédagogique",
            email: formation.responsablePedagogiqueEmail,
          }
        : null
  }
}
