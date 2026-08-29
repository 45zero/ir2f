import "server-only"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/emails/send"
import { ConventionSignatureRequestEmail } from "@/lib/emails/ConventionSignatureRequestEmail"
import { ConventionSignatureAdminEmail } from "@/lib/emails/ConventionSignatureAdminEmail"
import { ConventionSignatureBlockedAdminEmail } from "@/lib/emails/ConventionSignatureBlockedAdminEmail"
import { ConventionFormationSignatureRequestEmail } from "@/lib/emails/ConventionFormationSignatureRequestEmail"
import { getAdminNotificationEmails } from "@/lib/emails/admin-recipients"
import type { RoleSignataire } from "@/generated/prisma"

export const ROLE_SIGNATAIRE_LABELS: Record<RoleSignataire, string> = {
  STAGIAIRE: "Le stagiaire",
  CLUB: "Le club",
  TUTEUR: "Le tuteur",
  MAITRE_DE_STAGE: "Le maître de stage",
  RESPONSABLE_PEDAGOGIQUE: "Le responsable pédagogique",
}

/** Alerte les admins par email quand une étape du circuit ne peut pas être notifiée — jamais
 * d'échec silencieux : soit l'étape est envoyée, soit quelqu'un en est informé. */
async function alertAdminsSignatureBloquee(params: {
  formationTitre: string
  stagiairePrenom: string
  stagiaireNom: string
  role: RoleSignataire
  raison: string
}) {
  const adminEmails = await getAdminNotificationEmails()
  await Promise.all(
    adminEmails.map((email) =>
      sendEmail({
        to: email,
        subject: `Convention bloquée — ${params.stagiairePrenom} ${params.stagiaireNom}`,
        react: ConventionSignatureBlockedAdminEmail({
          formationTitre: params.formationTitre,
          stagiairePrenom: params.stagiairePrenom,
          stagiaireNom: params.stagiaireNom,
          roleLabel: ROLE_SIGNATAIRE_LABELS[params.role],
          raison: params.raison,
        }),
      })
    )
  )
}

/**
 * Envoie le lien de signature au signataire qui vient de passer à EN_ATTENTE. Retourne `sent:
 * false` (jamais silencieusement) si l'email manque ou si l'envoi échoue (service de messagerie
 * indisponible) — dans les deux cas les admins reçoivent une alerte pour agir, et l'appelant ne
 * doit PAS marquer l'étape comme envoyée.
 */
export async function notifySignataireASigner(signataireId: string): Promise<{ sent: boolean }> {
  const signataire = await prisma.conventionSignataire.findUnique({
    where: { id: signataireId },
    include: { conventionStagiaire: { include: { formation: { select: { titre: true } } } } },
  })
  if (!signataire) return { sent: false }

  const contexte = {
    formationTitre: signataire.conventionStagiaire.formation.titre,
    stagiairePrenom: signataire.conventionStagiaire.prenom,
    stagiaireNom: signataire.conventionStagiaire.nom,
    role: signataire.role,
  }

  if (!signataire.email) {
    await alertAdminsSignatureBloquee({ ...contexte, raison: "aucun email renseigné pour ce signataire" })
    return { sent: false }
  }

  const { sent } = await sendEmail({
    to: signataire.email,
    subject: `Convention de stage à signer — ${signataire.conventionStagiaire.formation.titre}`,
    react: ConventionSignatureRequestEmail({
      nom: signataire.nom,
      formationTitre: signataire.conventionStagiaire.formation.titre,
      stagiairePrenom: signataire.conventionStagiaire.prenom,
      stagiaireNom: signataire.conventionStagiaire.nom,
      token: signataire.token,
    }),
  })

  if (!sent) {
    await alertAdminsSignatureBloquee({ ...contexte, raison: "échec technique de l'envoi (service de messagerie)" })
  }

  return { sent }
}

/**
 * Envoie la demande de signature unique au responsable pédagogique d'une formation. Même contrat
 * que notifySignataireASigner : jamais d'échec silencieux, l'appelant ne doit pas marquer la
 * demande comme envoyée si `sent` est faux.
 */
export async function notifyResponsablePedagogiqueASigner(params: {
  email: string
  nom: string
  formationTitre: string
  token: string
}): Promise<{ sent: boolean }> {
  const { sent } = await sendEmail({
    to: params.email,
    subject: `Signature responsable pédagogique — ${params.formationTitre}`,
    react: ConventionFormationSignatureRequestEmail({ nom: params.nom, formationTitre: params.formationTitre, token: params.token }),
  })

  if (!sent) {
    const adminEmails = await getAdminNotificationEmails()
    await Promise.all(
      adminEmails.map((email) =>
        sendEmail({
          to: email,
          subject: `Échec d'envoi — signature responsable pédagogique (${params.formationTitre})`,
          react: ConventionSignatureBlockedAdminEmail({
            formationTitre: params.formationTitre,
            stagiairePrenom: "",
            stagiaireNom: "",
            roleLabel: "Le responsable pédagogique",
            raison: "échec technique de l'envoi (service de messagerie)",
          }),
        })
      )
    )
  }

  return { sent }
}

/** Notifie les admins de l'avancement (signature ou refus) d'une étape. */
export async function notifyAdminSignatureProgress(params: {
  formationTitre: string
  stagiairePrenom: string
  stagiaireNom: string
  role: RoleSignataire
  refused: boolean
  motif?: string | null
}) {
  const adminEmails = await getAdminNotificationEmails()
  const roleLabel = ROLE_SIGNATAIRE_LABELS[params.role]

  await Promise.all(
    adminEmails.map((email) =>
      sendEmail({
        to: email,
        subject: params.refused
          ? `Convention refusée — ${params.stagiairePrenom} ${params.stagiaireNom}`
          : `Signature enregistrée — ${params.stagiairePrenom} ${params.stagiaireNom}`,
        react: ConventionSignatureAdminEmail({
          formationTitre: params.formationTitre,
          stagiairePrenom: params.stagiairePrenom,
          stagiaireNom: params.stagiaireNom,
          roleLabel,
          refused: params.refused,
          motif: params.motif,
        }),
      })
    )
  )
}
