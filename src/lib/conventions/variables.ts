import "server-only"
import type { Formation, Session, ConventionStagiaire, RoleSignataire } from "@/generated/prisma"
import type { ConventionVariables } from "./pdf"

export {
  NATURE_INTERVENTION_OPTIONS,
  PUBLIC_VISE_OPTIONS,
  PUBLIC_NIVEAU_SPORTIF_OPTIONS,
  OBJECTIF_PEDAGOGIQUE_FIELDS,
  SIGNATURE_FIELD_NAMES,
  ALL_TEMPLATE_FIELD_NAMES,
  formatAdresseLigne,
} from "./variables-shared"

import { formatAdresseLigne } from "./variables-shared"

/**
 * Ordre strict du circuit de signature PAR STAGIAIRE : chaque étape n'est notifiée qu'une fois la
 * précédente signée. Le responsable pédagogique n'en fait plus partie — il signe une seule fois
 * pour toute la session (voir Session.responsablePedagogiqueSignature*), et cette signature est
 * incrustée automatiquement dans le PDF de chaque stagiaire de cette session à sa génération, sans
 * étape de circuit dédiée.
 */
export const SIGNATAIRE_ORDER: Exclude<RoleSignataire, "RESPONSABLE_PEDAGOGIQUE">[] = ["STAGIAIRE", "CLUB", "TUTEUR", "MAITRE_DE_STAGE"]

type SessionVars = Pick<Session, "dateDebut" | "dateFin" | "lieu"> & {
  formation: Pick<Formation, "titre">
  responsablePedagogiqueUser: { nom: string; prenom: string; email: string; telephone: string | null } | null
}

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
  | "clubAdresse"
  | "clubCp"
  | "clubVille"
  | "clubRepresentantNom"
  | "clubRepresentantQualite"
  | "tuteurNom"
  | "tuteurPrenom"
  | "tuteurEmail"
  | "tuteurQualite"
  | "tuteurAdresse"
  | "tuteurCp"
  | "tuteurVille"
  | "tuteurTelephone"
  | "tuteurQualification"
  | "maitreDeStageNom"
  | "maitreDeStagePrenom"
  | "maitreDeStageAdresse"
  | "maitreDeStageCp"
  | "maitreDeStageVille"
  | "maitreDeStageEmail"
  | "maitreDeStageQualite"
  | "publicVise"
  | "publicNiveauSportif"
  | "natureInterventionAutre"
>

const formationDatesLongFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" })
const formationDateDebutFormatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit", timeZone: "Europe/Paris" })
const formationDateFinFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeZone: "Europe/Paris" })

/**
 * Construit l'objet de variables injecté dans le modèle PDF. Les noms de clé ci-dessous sont le
 * contrat que l'admin doit reproduire comme noms de champs de formulaire dans le PDF fillable
 * (voir SIGNATURE_FIELD_NAMES pour les 5 emplacements de signature, remplis séparément). Le
 * tuteur et le maître de stage viennent du stagiaire (import Excel, propres à son club
 * d'accueil) ; le responsable pédagogique et les dates/lieu viennent de la session (une formation
 * peut avoir plusieurs sessions, chacune avec ses propres dates/lieu/responsable — voir
 * ConventionStagiaire.sessionId).
 */
export function buildConventionVariables(params: { session: SessionVars; stagiaire: StagiaireVars }): ConventionVariables {
  const { session, stagiaire } = params

  return {
    formation_titre: session.formation.titre,
    formation_lieu: session.lieu ?? "",
    formation_dates: `${formationDatesLongFormatter.format(session.dateDebut)}${session.lieu ? ` — ${session.lieu}` : ""}`,
    formation_date_debut: formationDateDebutFormatter.format(session.dateDebut),
    formation_date_fin: formationDateFinFormatter.format(session.dateFin),

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
    public_niveau_sportif: stagiaire.publicNiveauSportif ?? "",
    nature_intervention_autre_texte: stagiaire.natureInterventionAutre ?? "",

    club_nom: stagiaire.club ?? "",
    club_numero_affiliation: stagiaire.numeroAffiliationClub ?? "",
    club_email: stagiaire.emailClub ?? "",
    // "dont le siège est situé ....." (article 1) est une seule ligne dans le PDF, pas des champs
    // CP/Ville séparés comme pour le stagiaire — club_adresse regroupe donc tout sur une ligne ;
    // club_cp/club_ville restent disponibles séparément si un futur modèle les sépare.
    club_adresse: formatAdresseLigne(stagiaire.clubAdresse, stagiaire.clubCp, stagiaire.clubVille),
    club_cp: stagiaire.clubCp ?? "",
    club_ville: stagiaire.clubVille ?? "",
    club_representant_nom: stagiaire.clubRepresentantNom ?? "",
    club_representant_qualite: stagiaire.clubRepresentantQualite ?? "",

    tuteur_nom: stagiaire.tuteurNom ?? "",
    tuteur_prenom: stagiaire.tuteurPrenom ?? "",
    tuteur_nom_prenom: [stagiaire.tuteurPrenom, stagiaire.tuteurNom].filter(Boolean).join(" "),
    tuteur_email: stagiaire.tuteurEmail ?? "",
    tuteur_qualite: stagiaire.tuteurQualite ?? "",
    tuteur_adresse: stagiaire.tuteurAdresse ?? "",
    tuteur_cp: stagiaire.tuteurCp ?? "",
    tuteur_ville: stagiaire.tuteurVille ?? "",
    tuteur_telephone: stagiaire.tuteurTelephone ?? "",
    tuteur_qualification: stagiaire.tuteurQualification ?? "",

    maitre_de_stage_nom: stagiaire.maitreDeStageNom ?? "",
    maitre_de_stage_prenom: stagiaire.maitreDeStagePrenom ?? "",
    maitre_de_stage_nom_prenom: [stagiaire.maitreDeStagePrenom, stagiaire.maitreDeStageNom].filter(Boolean).join(" "),
    maitre_de_stage_adresse: stagiaire.maitreDeStageAdresse ?? "",
    maitre_de_stage_cp: stagiaire.maitreDeStageCp ?? "",
    maitre_de_stage_ville: stagiaire.maitreDeStageVille ?? "",
    maitre_de_stage_email: stagiaire.maitreDeStageEmail ?? "",
    maitre_de_stage_qualite: stagiaire.maitreDeStageQualite ?? "",

    responsable_pedagogique_nom: session.responsablePedagogiqueUser?.nom ?? "",
    responsable_pedagogique_prenom: session.responsablePedagogiqueUser?.prenom ?? "",
    responsable_pedagogique_nom_prenom: session.responsablePedagogiqueUser
      ? `${session.responsablePedagogiqueUser.prenom} ${session.responsablePedagogiqueUser.nom}`
      : "",
    responsable_pedagogique_email: session.responsablePedagogiqueUser?.email ?? "",
    responsable_pedagogique_telephone: session.responsablePedagogiqueUser?.telephone ?? "",
  }
}

/** Résout le nom/email du signataire courant pour une étape donnée. Retourne `null` si l'étape ne peut pas être servie (ex. pas d'email de club/tuteur/maître de stage renseigné à l'import). Le responsable pédagogique n'est plus résolu ici — voir SIGNATAIRE_ORDER. */
export function resolveSignataireContact(
  role: Exclude<RoleSignataire, "RESPONSABLE_PEDAGOGIQUE">,
  stagiaire: StagiaireVars
): { nom: string; email: string } | null {
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
  }
}
