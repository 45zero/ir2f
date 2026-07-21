import "server-only"
import type { Formation, ConventionStagiaire, RoleSignataire } from "@/generated/prisma"
import type { ConventionVariables } from "./pdf"

export {
  NATURE_INTERVENTION_OPTIONS,
  PUBLIC_VISE_OPTIONS,
  OBJECTIF_PEDAGOGIQUE_FIELDS,
  SIGNATURE_FIELD_NAMES,
  ALL_TEMPLATE_FIELD_NAMES,
} from "./variables-shared"

/** Ordre strict du circuit de signature : chaque étape n'est notifiée qu'une fois la précédente signée. */
export const SIGNATAIRE_ORDER: RoleSignataire[] = ["STAGIAIRE", "CLUB", "TUTEUR", "MAITRE_DE_STAGE", "RESPONSABLE_PEDAGOGIQUE"]

type FormationVars = Pick<
  Formation,
  | "titre"
  | "lieu"
  | "responsablePedagogiqueNom"
  | "responsablePedagogiquePrenom"
  | "responsablePedagogiqueEmail"
  | "responsablePedagogiqueTelephone"
  | "dateDebut"
  | "dateFin"
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
  | "publicVise"
  | "natureInterventionAutre"
>

const formationDateDebutFormatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })
const formationDateFinFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short" })

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
    formation_date_debut: formation.dateDebut ? formationDateDebutFormatter.format(formation.dateDebut) : "",
    formation_date_fin: formation.dateFin ? formationDateFinFormatter.format(formation.dateFin) : "",

    stagiaire_civilite: stagiaire.civilite ?? "",
    stagiaire_nom: stagiaire.nom,
    stagiaire_prenom: stagiaire.prenom,
    stagiaire_nom_prenom: `${stagiaire.prenom} ${stagiaire.nom}`.trim(),
    stagiaire_date_naissance: stagiaire.dateNaissance ?? "",
    stagiaire_adresse: stagiaire.adresse ?? "",
    stagiaire_cp: stagiaire.cp ?? "",
    stagiaire_ville: stagiaire.ville ?? "",
    stagiaire_telephone: stagiaire.telephone ?? "",
    stagiaire_email: stagiaire.email,
    stagiaire_public_vise: stagiaire.publicVise ?? "",
    nature_intervention_autre_texte: stagiaire.natureInterventionAutre ?? "",

    club_nom: stagiaire.club ?? "",
    club_numero_affiliation: stagiaire.numeroAffiliationClub ?? "",
    club_email: stagiaire.emailClub ?? "",

    tuteur_nom: stagiaire.tuteurNom ?? "",
    tuteur_prenom: stagiaire.tuteurPrenom ?? "",
    tuteur_nom_prenom: [stagiaire.tuteurPrenom, stagiaire.tuteurNom].filter(Boolean).join(" "),
    tuteur_email: stagiaire.tuteurEmail ?? "",

    maitre_de_stage_nom: stagiaire.maitreDeStageNom ?? "",
    maitre_de_stage_prenom: stagiaire.maitreDeStagePrenom ?? "",
    maitre_de_stage_nom_prenom: [stagiaire.maitreDeStagePrenom, stagiaire.maitreDeStageNom].filter(Boolean).join(" "),
    maitre_de_stage_adresse: stagiaire.maitreDeStageAdresse ?? "",
    maitre_de_stage_cp: stagiaire.maitreDeStageCp ?? "",
    maitre_de_stage_ville: stagiaire.maitreDeStageVille ?? "",
    maitre_de_stage_email: stagiaire.maitreDeStageEmail ?? "",

    responsable_pedagogique_nom: formation.responsablePedagogiqueNom ?? "",
    responsable_pedagogique_prenom: formation.responsablePedagogiquePrenom ?? "",
    responsable_pedagogique_nom_prenom: [formation.responsablePedagogiquePrenom, formation.responsablePedagogiqueNom].filter(Boolean).join(" "),
    responsable_pedagogique_email: formation.responsablePedagogiqueEmail ?? "",
    responsable_pedagogique_telephone: formation.responsablePedagogiqueTelephone ?? "",
  }
}

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
