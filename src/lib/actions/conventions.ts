"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { downloadStorageFile, uploadBytes } from "@/lib/storage"
import { fillConventionTemplate, stampSignature } from "@/lib/conventions/pdf"
import { buildConventionVariables, resolveSignataireContact, SIGNATAIRE_ORDER, SIGNATURE_FIELD_NAMES } from "@/lib/conventions/variables"
import { buildSessionConventionsZip } from "@/lib/conventions/zip"
import { notifySignataireASigner, ROLE_SIGNATAIRE_LABELS } from "@/lib/emails/convention-notifications"
import { sendEmail } from "@/lib/emails/send"
import { ConventionsZipEmail } from "@/lib/emails/ConventionsZipEmail"
import { optionalStr } from "@/lib/actions/form-utils"
import type { ConventionStagiaire, Session, Formation } from "@/generated/prisma"

type SessionAvecResponsable = Session & {
  formation: Pick<Formation, "titre">
  responsablePedagogiqueUser: { nom: string; prenom: string; email: string; telephone: string | null } | null
}

export type EnvoyerConventionsState = { error: string | null; sent: number; skipped: string[] }
export type ConventionActionState = { error: string | null }

/**
 * Active l'étape suivant `apresOrdre` (ou la toute première si `apresOrdre` vaut -1) : envoie le
 * lien de signature au signataire, et ne le passe à EN_ATTENTE que si l'email est parti pour de
 * vrai — jamais l'inverse. Un envoi raté (email manquant, service de messagerie indisponible)
 * remonte une erreur au lieu de laisser croire que l'étape a été notifiée ; les admins reçoivent
 * aussi une alerte (voir notifySignataireASigner). Marque la convention comme complète si le
 * dernier signataire vient de signer.
 */
async function avancerConvention(conventionStagiaireId: string, apresOrdre: number): Promise<{ ok: boolean; error?: string }> {
  const next = await prisma.conventionSignataire.findFirst({
    where: { conventionStagiaireId, ordre: apresOrdre + 1 },
  })
  if (!next) {
    await prisma.conventionStagiaire.update({ where: { id: conventionStagiaireId }, data: { completedAt: new Date() } })
    return { ok: true }
  }

  const { sent } = await notifySignataireASigner(next.id)
  if (!sent) {
    return { ok: false, error: `Circuit bloqué à l'étape "${ROLE_SIGNATAIRE_LABELS[next.role]}" — email manquant ou envoi impossible.` }
  }

  await prisma.conventionSignataire.update({ where: { id: next.id }, data: { statut: "EN_ATTENTE", envoyeAt: new Date() } })
  return { ok: true }
}

/** Le tuteur n'est pas toujours connu (souvent absent du fichier stagiaires) — son étape de
 * signature est simplement omise du circuit quand son email manque, plutôt que de tout bloquer.
 * Club et maître de stage restent obligatoires : ce sont des parties prenantes de la convention
 * elle-même (article 1), pas un simple contact informatif. */
function missingContactsFor(stagiaire: ConventionStagiaire): string[] {
  return [
    !stagiaire.emailClub && "email du club",
    !stagiaire.maitreDeStageEmail && "email du maître de stage",
  ].filter((v): v is string => Boolean(v))
}

/**
 * Génère le PDF personnalisé d'un stagiaire, crée ses signataires et active le premier. Suppose
 * que le stagiaire n'a pas encore de convention générée (pdfStoragePath null) et que les appelants
 * ont déjà vérifié via missingContactsFor() que les emails club/maître de stage sont renseignés —
 * resolveSignataireContact ne devrait donc jamais renvoyer null pour ces rôles-là ; si ça arrive
 * quand même (bug appelant, garde contournée), on l'arrête net plutôt que de créer un signataire
 * avec un email vide qui bloquerait le circuit plus tard sans explication. Le tuteur, lui, est
 * retiré du circuit (pas bloquant) si son email manque — voir missingContactsFor. `ordre` est
 * réattribué séquentiellement sur les signataires effectivement créés (0..n-1, sans trou) pour que
 * avancerConvention et la finalisation du PDF (voir convention-signature.ts) restent cohérents
 * que le tuteur soit présent ou non.
 *
 * Le responsable pédagogique ne fait plus partie de ce circuit par-stagiaire (voir SIGNATAIRE_ORDER)
 * : sa signature, capturée une seule fois pour toute la session (responsablePedagogiqueSignature*
 * — voir enverSignatureResponsablePedagogique), est directement incrustée dans le PDF fraîchement
 * généré via `signatureSessionPngBytes`, fourni par l'appelant pour éviter de la retélécharger à
 * chaque stagiaire d'un envoi groupé.
 */
async function genererEtActiverConvention(
  stagiaire: ConventionStagiaire,
  session: SessionAvecResponsable,
  templateBytes: Uint8Array,
  signatureSessionPngBytes: Uint8Array
): Promise<{ ok: boolean; error?: string }> {
  const variables = buildConventionVariables({ session, stagiaire })
  let filled = await fillConventionTemplate(templateBytes, variables)
  filled = await stampSignature(
    filled,
    SIGNATURE_FIELD_NAMES.RESPONSABLE_PEDAGOGIQUE,
    signatureSessionPngBytes,
    session.responsablePedagogiqueSignatureSignedAt!
  )
  const storagePath = `conventions/generated/${stagiaire.id}.pdf`
  await uploadBytes(filled, storagePath, "application/pdf")

  const signataireRows = SIGNATAIRE_ORDER.flatMap((role) => {
    const contact = resolveSignataireContact(role, stagiaire)
    if (!contact) {
      if (role === "TUTEUR") return []
      throw new Error(`Informations manquantes pour l'étape "${ROLE_SIGNATAIRE_LABELS[role]}".`)
    }
    return [{ role, nom: contact.nom, email: contact.email }]
  }).map((row, ordre) => ({ ...row, ordre }))

  await prisma.$transaction([
    prisma.conventionStagiaire.update({
      where: { id: stagiaire.id },
      data: { pdfStoragePath: storagePath, envoyeAt: new Date() },
    }),
    prisma.conventionSignataire.createMany({
      data: signataireRows.map((r) => ({ ...r, conventionStagiaireId: stagiaire.id })),
    }),
  ])

  return avancerConvention(stagiaire.id, -1)
}

/** Vérifie que le responsable pédagogique a bien signé une première fois pour cette session —
 * condition préalable à toute génération de convention, puisque sa signature est incrustée
 * directement dans chaque PDF (voir genererEtActiverConvention). */
function requireResponsablePedagogiqueSignature(session: Session): string | null {
  if (!session.responsablePedagogiqueUserId) return "Aucun responsable pédagogique désigné pour cette session."
  if (!session.responsablePedagogiqueSignatureSignedAt || !session.responsablePedagogiqueSignatureStoragePath) {
    return "Le responsable pédagogique n'a pas encore signé — envoyez-lui d'abord la demande de signature ci-dessus."
  }
  return null
}

export async function envoyerConventions(sessionId: string): Promise<EnvoyerConventionsState> {
  await requireAdmin()

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      formation: { select: { id: true, titre: true } },
      conventionTemplate: true,
      conventionStagiaires: { where: { pdfStoragePath: null } },
      responsablePedagogiqueUser: { select: { nom: true, prenom: true, email: true, telephone: true } },
    },
  })
  if (!session) return { error: "Session introuvable.", sent: 0, skipped: [] }
  if (!session.conventionTemplate) {
    return { error: "Aucun modèle de convention associé à cette session.", sent: 0, skipped: [] }
  }
  const responsableError = requireResponsablePedagogiqueSignature(session)
  if (responsableError) return { error: responsableError, sent: 0, skipped: [] }
  if (session.conventionStagiaires.length === 0) {
    return { error: "Aucun nouveau stagiaire à traiter.", sent: 0, skipped: [] }
  }

  const templateBytes = await downloadStorageFile(session.conventionTemplate.storagePath)
  const signatureSessionPngBytes = await downloadStorageFile(session.responsablePedagogiqueSignatureStoragePath!)

  let sent = 0
  const skipped: string[] = []

  for (const stagiaire of session.conventionStagiaires) {
    const missing = missingContactsFor(stagiaire)
    if (missing.length > 0) {
      skipped.push(`${stagiaire.prenom} ${stagiaire.nom} (${missing.join(", ")} manquant)`)
      continue
    }

    try {
      const result = await genererEtActiverConvention(stagiaire, session, templateBytes, signatureSessionPngBytes)
      if (result.ok) sent++
      else skipped.push(`${stagiaire.prenom} ${stagiaire.nom} (${result.error})`)
    } catch (e) {
      skipped.push(`${stagiaire.prenom} ${stagiaire.nom} (${e instanceof Error ? e.message : "erreur inattendue"})`)
    }
  }

  revalidatePath(`/admin/formations/${session.formation.id}/conventions/${sessionId}`)
  return { error: null, sent, skipped }
}

export async function envoyerConventionStagiaire(stagiaireId: string): Promise<ConventionActionState> {
  await requireAdmin()

  const stagiaire = await prisma.conventionStagiaire.findUnique({
    where: { id: stagiaireId },
    include: {
      session: {
        include: {
          formation: { select: { id: true, titre: true } },
          conventionTemplate: true,
          responsablePedagogiqueUser: { select: { nom: true, prenom: true, email: true, telephone: true } },
        },
      },
    },
  })
  if (!stagiaire) return { error: "Stagiaire introuvable." }
  if (stagiaire.pdfStoragePath) return { error: "La convention a déjà été envoyée pour ce stagiaire." }

  const { session } = stagiaire
  if (!session) return { error: "Ce stagiaire n'est rattaché à aucune session." }
  if (!session.conventionTemplate) return { error: "Aucun modèle de convention associé à cette session." }
  const responsableError = requireResponsablePedagogiqueSignature(session)
  if (responsableError) return { error: responsableError }

  const missing = missingContactsFor(stagiaire)
  if (missing.length > 0) return { error: `Informations manquantes : ${missing.join(", ")}.` }

  const templateBytes = await downloadStorageFile(session.conventionTemplate.storagePath)
  const signatureSessionPngBytes = await downloadStorageFile(session.responsablePedagogiqueSignatureStoragePath!)

  let result: { ok: boolean; error?: string }
  try {
    result = await genererEtActiverConvention(stagiaire, session, templateBytes, signatureSessionPngBytes)
  } catch (e) {
    result = { ok: false, error: e instanceof Error ? e.message : "Erreur inattendue lors de la génération de la convention." }
  }

  revalidatePath(`/admin/formations/${session.formation.id}/conventions/${session.id}`)
  revalidatePath("/dashboard/formations")
  return { error: result.ok ? null : (result.error ?? "Échec de l'envoi.") }
}

async function findRenvoiTarget(signataireId: string) {
  const signataire = await prisma.conventionSignataire.findUnique({
    where: { id: signataireId },
    select: { id: true, statut: true, email: true, conventionStagiaireId: true },
  })
  if (!signataire) return { error: "Signataire introuvable." as const, signataire: null }
  if (signataire.statut === "SIGNE") return { error: "Cette étape est déjà signée." as const, signataire: null }
  return { error: null, signataire }
}

async function marquerRenvoiEnvoye(signataireId: string, canal: "MAIL" | "WHATSAPP") {
  const session = await requireAdmin()
  const auteur = session?.user?.name?.split(" ")[0] || "Admin"

  const target = await prisma.conventionSignataire.update({
    where: { id: signataireId },
    data: {
      statut: "EN_ATTENTE",
      envoyeAt: new Date(),
      dernierRenvoiPar: auteur,
      dernierRenvoiCanal: canal,
      dernierRenvoiAt: new Date(),
    },
    select: { conventionStagiaireId: true },
  })

  const stagiaire = await prisma.conventionStagiaire.findUnique({
    where: { id: target.conventionStagiaireId },
    select: { formationId: true, sessionId: true },
  })
  if (stagiaire) {
    revalidatePath(`/admin/formations/${stagiaire.formationId}/conventions/${stagiaire.sessionId}`)
    revalidatePath("/dashboard/formations")
  }
}

/**
 * Renvoie le lien de signature par email (Resend). Comme avancerConvention : l'email part d'abord,
 * l'étape n'est marquée "envoyée" qu'une fois l'envoi confirmé — jamais l'inverse. Un email
 * manquant ou un échec d'envoi remonte une vraie erreur (et déclenche l'alerte admin, voir
 * notifySignataireASigner) plutôt que de laisser croire que le signataire a été relancé.
 */
export async function renvoyerEtape(signataireId: string): Promise<ConventionActionState> {
  await requireAdmin()

  const { error, signataire } = await findRenvoiTarget(signataireId)
  if (error) return { error }
  if (!signataire.email) return { error: "Aucun email renseigné pour ce signataire — complétez d'abord ses informations." }

  const { sent } = await notifySignataireASigner(signataireId)
  if (!sent) return { error: "Échec de l'envoi de l'email (service de messagerie indisponible) — réessayez dans quelques minutes." }

  await marquerRenvoiEnvoye(signataireId, "MAIL")
  return { error: null }
}

/** Marque un renvoi par WhatsApp (le lien wa.me est ouvert côté client) — ne déclenche pas d'email. */
export async function logRenvoiWhatsapp(signataireId: string): Promise<ConventionActionState> {
  await requireAdmin()
  const { error } = await findRenvoiTarget(signataireId)
  if (error) return { error }
  await marquerRenvoiEnvoye(signataireId, "WHATSAPP")
  return { error: null }
}

export type EnvoyerZipState = { error: string | null; success: boolean }

/** Envoie par email les conventions déjà générées d'une session, zippées en pièce jointe. */
export async function envoyerConventionsZipParEmail(
  sessionId: string,
  _prev: EnvoyerZipState | undefined,
  formData: FormData
): Promise<EnvoyerZipState> {
  await requireAdmin()

  const email = optionalStr(formData, "email")
  if (!email) return { error: "Merci de renseigner une adresse email.", success: false }

  const session = await prisma.session.findUnique({ where: { id: sessionId }, select: { formation: { select: { titre: true } } } })
  if (!session) return { error: "Session introuvable.", success: false }

  const zip = await buildSessionConventionsZip(sessionId)
  if (!zip) return { error: "Aucune convention générée pour cette session.", success: false }

  const { sent } = await sendEmail({
    to: email,
    subject: `Conventions de stage — ${session.formation.titre}`,
    react: ConventionsZipEmail({ formationTitre: session.formation.titre, count: zip.count }),
    attachments: [{ filename: zip.filename, content: zip.buffer }],
  })
  if (!sent) return { error: "Échec de l'envoi de l'email — réessayez dans quelques minutes.", success: false }

  return { error: null, success: true }
}

export { avancerConvention }
