// Module interne (sans directive server action) : faire avancer le circuit de signature ne doit jamais être
// appelable directement depuis le navigateur — sinon n'importe qui pourrait marquer une convention
// comme entièrement signée. Appelé uniquement par les actions admin et par la signature via jeton.
import "server-only"
import { prisma } from "@/lib/prisma"
import { notifySignataireASigner, ROLE_SIGNATAIRE_LABELS } from "@/lib/emails/convention-notifications"

/**
 * Active l'étape suivant `apresOrdre` (ou la toute première si `apresOrdre` vaut -1) : envoie le
 * lien de signature au signataire, et ne le passe à EN_ATTENTE que si l'email est parti pour de
 * vrai — jamais l'inverse. Un envoi raté (email manquant, service de messagerie indisponible)
 * remonte une erreur au lieu de laisser croire que l'étape a été notifiée ; les admins reçoivent
 * aussi une alerte (voir notifySignataireASigner). Marque la convention comme complète si le
 * dernier signataire vient de signer.
 */
export async function avancerConvention(conventionStagiaireId: string, apresOrdre: number): Promise<{ ok: boolean; error?: string }> {
  const next = await prisma.conventionSignataire.findFirst({
    where: { conventionStagiaireId, ordre: apresOrdre + 1 },
  })
  if (!next) {
    await prisma.conventionStagiaire.update({ where: { id: conventionStagiaireId }, data: { completedAt: new Date() } })
    return { ok: true }
  }
  // L'étape suivante est déjà en attente ou signée : la réinitialisation d'un signataire
  // intermédiaire (reinitialiserSignatureEtape) peut faire resigner quelqu'un dont l'étape
  // suivante avait déjà progressé — ne jamais l'écraser ni la re-notifier dans ce cas.
  if (next.statut !== "NON_ENVOYE") return { ok: true }

  const { sent } = await notifySignataireASigner(next.id)
  if (!sent) {
    return { ok: false, error: `Circuit bloqué à l'étape "${ROLE_SIGNATAIRE_LABELS[next.role]}" — email manquant ou envoi impossible.` }
  }

  await prisma.conventionSignataire.update({ where: { id: next.id }, data: { statut: "EN_ATTENTE", envoyeAt: new Date() } })
  return { ok: true }
}
