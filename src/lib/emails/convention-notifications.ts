import "server-only"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/emails/send"
import { ConventionSignatureRequestEmail } from "@/lib/emails/ConventionSignatureRequestEmail"
import { ConventionSignatureAdminEmail } from "@/lib/emails/ConventionSignatureAdminEmail"
import { getAdminNotificationEmails } from "@/lib/emails/admin-recipients"
import type { RoleSignataire } from "@/generated/prisma"

export const ROLE_SIGNATAIRE_LABELS: Record<RoleSignataire, string> = {
  STAGIAIRE: "Le stagiaire",
  CLUB: "Le club",
  TUTEUR: "Le tuteur",
  MAITRE_DE_STAGE: "Le maître de stage",
  RESPONSABLE_PEDAGOGIQUE: "Le responsable pédagogique",
}

/** Envoie le lien de signature au signataire qui vient de passer à EN_ATTENTE. */
export async function notifySignataireASigner(signataireId: string) {
  const signataire = await prisma.conventionSignataire.findUnique({
    where: { id: signataireId },
    include: { conventionStagiaire: { include: { formation: { select: { titre: true } } } } },
  })
  if (!signataire || !signataire.email) return

  await sendEmail({
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
