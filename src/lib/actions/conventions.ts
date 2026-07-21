"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { downloadStorageFile, uploadBytes } from "@/lib/storage"
import { fillConventionTemplate } from "@/lib/conventions/pdf"
import { buildConventionVariables, resolveSignataireContact, SIGNATAIRE_ORDER } from "@/lib/conventions/variables"
import { notifySignataireASigner } from "@/lib/emails/convention-notifications"
import type { ConventionStagiaire, Formation } from "@/generated/prisma"

export type EnvoyerConventionsState = { error: string | null; sent: number; skipped: string[] }
export type ConventionActionState = { error: string | null }

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" })

async function computeFormationDateLabel(formationId: string): Promise<string | null> {
  const now = new Date()
  const nextSession = await prisma.session.findFirst({
    where: { formationId, dateDebut: { gte: now } },
    orderBy: { dateDebut: "asc" },
  })
  const session = nextSession ?? (await prisma.session.findFirst({ where: { formationId }, orderBy: { dateDebut: "desc" } }))
  if (!session) return null
  return `${dateFormatter.format(session.dateDebut)}${session.lieu ? ` — ${session.lieu}` : ""}`
}

/** Active l'étape suivant `apresOrdre` (ou la toute première si `apresOrdre` vaut -1) : passe le signataire à EN_ATTENTE et lui envoie le lien de signature. Marque la convention comme complète si le dernier signataire vient de signer. */
async function avancerConvention(conventionStagiaireId: string, apresOrdre: number) {
  const next = await prisma.conventionSignataire.findFirst({
    where: { conventionStagiaireId, ordre: apresOrdre + 1 },
  })
  if (!next) {
    await prisma.conventionStagiaire.update({ where: { id: conventionStagiaireId }, data: { completedAt: new Date() } })
    return
  }
  await prisma.conventionSignataire.update({ where: { id: next.id }, data: { statut: "EN_ATTENTE", envoyeAt: new Date() } })
  await notifySignataireASigner(next.id)
}

function missingContactsFor(stagiaire: ConventionStagiaire): string[] {
  return [
    !stagiaire.emailClub && "email du club",
    !stagiaire.tuteurEmail && "email du tuteur",
    !stagiaire.maitreDeStageEmail && "email du maître de stage",
  ].filter((v): v is string => Boolean(v))
}

/** Génère le PDF personnalisé d'un stagiaire, crée ses 5 signataires et active le premier. Suppose que le stagiaire n'a pas encore de convention générée (pdfStoragePath null). */
async function genererEtActiverConvention(
  stagiaire: ConventionStagiaire,
  formation: Formation,
  templateBytes: Uint8Array,
  dateLabel: string | null
) {
  const variables = buildConventionVariables({ formation, formationDateLabel: dateLabel, stagiaire })
  const filled = await fillConventionTemplate(templateBytes, variables)
  const storagePath = `conventions/generated/${stagiaire.id}.pdf`
  await uploadBytes(filled, storagePath, "application/pdf")

  const signataireRows = SIGNATAIRE_ORDER.map((role, ordre) => {
    const contact = resolveSignataireContact(role, stagiaire, formation)
    return { role, ordre, nom: contact?.nom ?? "", email: contact?.email ?? "" }
  })

  await prisma.$transaction([
    prisma.conventionStagiaire.update({
      where: { id: stagiaire.id },
      data: { pdfStoragePath: storagePath, envoyeAt: new Date() },
    }),
    prisma.conventionSignataire.createMany({
      data: signataireRows.map((r) => ({ ...r, conventionStagiaireId: stagiaire.id })),
    }),
  ])

  await avancerConvention(stagiaire.id, -1)
}

export async function envoyerConventions(formationId: string): Promise<EnvoyerConventionsState> {
  await requireAdmin()

  const formation = await prisma.formation.findUnique({
    where: { id: formationId },
    include: {
      conventionTemplate: true,
      conventionStagiaires: { where: { pdfStoragePath: null } },
    },
  })
  if (!formation) return { error: "Formation introuvable.", sent: 0, skipped: [] }
  if (!formation.conventionTemplate) {
    return { error: "Aucun modèle de convention associé à cette formation.", sent: 0, skipped: [] }
  }
  if (!formation.responsablePedagogiqueEmail) {
    return { error: "Responsable pédagogique non renseigné pour cette formation.", sent: 0, skipped: [] }
  }
  if (formation.conventionStagiaires.length === 0) {
    return { error: "Aucun nouveau stagiaire à traiter.", sent: 0, skipped: [] }
  }

  const templateBytes = await downloadStorageFile(formation.conventionTemplate.storagePath)
  const dateLabel = await computeFormationDateLabel(formationId)

  let sent = 0
  const skipped: string[] = []

  for (const stagiaire of formation.conventionStagiaires) {
    const missing = missingContactsFor(stagiaire)
    if (missing.length > 0) {
      skipped.push(`${stagiaire.prenom} ${stagiaire.nom} (${missing.join(", ")} manquant)`)
      continue
    }

    await genererEtActiverConvention(stagiaire, formation, templateBytes, dateLabel)
    sent++
  }

  revalidatePath(`/admin/formations/${formationId}/conventions`)
  return { error: null, sent, skipped }
}

export async function envoyerConventionStagiaire(stagiaireId: string): Promise<ConventionActionState> {
  await requireAdmin()

  const stagiaire = await prisma.conventionStagiaire.findUnique({
    where: { id: stagiaireId },
    include: { formation: { include: { conventionTemplate: true } } },
  })
  if (!stagiaire) return { error: "Stagiaire introuvable." }
  if (stagiaire.pdfStoragePath) return { error: "La convention a déjà été envoyée pour ce stagiaire." }

  const { formation } = stagiaire
  if (!formation.conventionTemplate) return { error: "Aucun modèle de convention associé à cette formation." }
  if (!formation.responsablePedagogiqueEmail) return { error: "Responsable pédagogique non renseigné pour cette formation." }

  const missing = missingContactsFor(stagiaire)
  if (missing.length > 0) return { error: `Informations manquantes : ${missing.join(", ")}.` }

  const templateBytes = await downloadStorageFile(formation.conventionTemplate.storagePath)
  const dateLabel = await computeFormationDateLabel(formation.id)
  await genererEtActiverConvention(stagiaire, formation, templateBytes, dateLabel)

  revalidatePath(`/admin/formations/${formation.id}/conventions`)
  revalidatePath("/dashboard/formations")
  return { error: null }
}

async function marquerRenvoi(signataireId: string, canal: "MAIL" | "WHATSAPP") {
  const session = await requireAdmin()
  const auteur = session?.user?.name?.split(" ")[0] || "Admin"

  const signataire = await prisma.conventionSignataire.findUnique({
    where: { id: signataireId },
    select: { id: true, statut: true, conventionStagiaireId: true },
  })
  if (!signataire) return { error: "Signataire introuvable." as const, signataire: null }
  if (signataire.statut === "SIGNE") return { error: "Cette étape est déjà signée." as const, signataire: null }

  await prisma.conventionSignataire.update({
    where: { id: signataireId },
    data: {
      statut: "EN_ATTENTE",
      envoyeAt: new Date(),
      dernierRenvoiPar: auteur,
      dernierRenvoiCanal: canal,
      dernierRenvoiAt: new Date(),
    },
  })

  const stagiaire = await prisma.conventionStagiaire.findUnique({
    where: { id: signataire.conventionStagiaireId },
    select: { formationId: true },
  })
  if (stagiaire) {
    revalidatePath(`/admin/formations/${stagiaire.formationId}/conventions`)
    revalidatePath("/dashboard/formations")
  }
  return { error: null, signataire }
}

/** Renvoie le lien de signature par email (Resend). */
export async function renvoyerEtape(signataireId: string): Promise<ConventionActionState> {
  const result = await marquerRenvoi(signataireId, "MAIL")
  if (result.error) return { error: result.error }
  await notifySignataireASigner(signataireId)
  return { error: null }
}

/** Marque un renvoi par WhatsApp (le lien wa.me est ouvert côté client) — ne déclenche pas d'email. */
export async function logRenvoiWhatsapp(signataireId: string): Promise<ConventionActionState> {
  const result = await marquerRenvoi(signataireId, "WHATSAPP")
  return { error: result.error }
}

export { avancerConvention }
