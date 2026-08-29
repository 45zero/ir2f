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

/**
 * Ordre strict du circuit de signature PAR STAGIAIRE : chaque étape n'est notifiée qu'une fois la
 * précédente signée. Le responsable pédagogique n'en fait plus partie — il signe une seule fois
 * pour toute la formation (voir Formation.responsablePedagogiqueSignature*), et cette signature
 * est incrustée automatiquement dans le PDF de chaque stagiaire à sa génération, sans étape de
 * circuit dédiée.
 */
export const SIGNATAIRE_ORDER: Exclude<RoleSignataire, "RESPONSABLE_PEDAGOGIQUE">[] = ["STAGIAIRE", "CLUB", "TUTEUR", "MAITRE_DE_STAGE"]

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
> & {
  // Priorité sur les champs texte ci-dessus (repli pour les formations créées avant le passage à
  // un utilisateur IR2F lié — voir schema.prisma).
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
  | "maitreDeStageNom"
  | "maitreDeStagePrenom"
  | "maitreDeStageAdresse"
  | "maitreDeStageCp"
  | "maitreDeStageVille"
  | "maitreDeStageEmail"
  | "publicVise"
  | "natureInterventionAutre"
>

const formationDateDebutFormatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit", timeZone: "Europe/Paris" })
const formationDateFinFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeZone: "Europe/Paris" })

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
    // "dont le siège est situé ....." (article 1) est une seule ligne dans le PDF, pas des champs
    // CP/Ville séparés comme pour le stagiaire — club_adresse regroupe donc tout sur une ligne ;
    // club_cp/club_ville restent disponibles séparément si un futur modèle les sépare.
    club_adresse: [stagiaire.clubAdresse, [stagiaire.clubCp, stagiaire.clubVille].filter(Boolean).join(" ")].filter(Boolean).join(", "),
    club_cp: stagiaire.clubCp ?? "",
    club_ville: stagiaire.clubVille ?? "",
    club_representant_nom: stagiaire.clubRepresentantNom ?? "",
    club_representant_qualite: stagiaire.clubRepresentantQualite ?? "",

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

    responsable_pedagogique_nom: formation.responsablePedagogiqueUser?.nom ?? formation.responsablePedagogiqueNom ?? "",
    responsable_pedagogique_prenom: formation.responsablePedagogiqueUser?.prenom ?? formation.responsablePedagogiquePrenom ?? "",
    responsable_pedagogique_nom_prenom: formation.responsablePedagogiqueUser
      ? `${formation.responsablePedagogiqueUser.prenom} ${formation.responsablePedagogiqueUser.nom}`
      : [formation.responsablePedagogiquePrenom, formation.responsablePedagogiqueNom].filter(Boolean).join(" "),
    responsable_pedagogique_email: formation.responsablePedagogiqueUser?.email ?? formation.responsablePedagogiqueEmail ?? "",
    responsable_pedagogique_telephone: formation.responsablePedagogiqueUser?.telephone ?? formation.responsablePedagogiqueTelephone ?? "",
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
