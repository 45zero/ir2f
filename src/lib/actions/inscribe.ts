"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { str, optionalStr } from "@/lib/actions/form-utils"
import { sendEmail } from "@/lib/emails/send"
import { NouvelleDemandeAdminEmail } from "@/lib/emails/NouvelleDemandeAdminEmail"
import { getAdminNotificationEmails } from "@/lib/emails/admin-recipients"

export type InscribeState = { status: "idle" | "success" | "error" | "already"; message?: string }

export async function requestInscription(
  formationId: string,
  sessionLabel: string | null,
  _prevState: InscribeState | undefined,
  formData: FormData
): Promise<InscribeState> {
  const session = await auth()

  let nom: string
  let prenom: string
  let email: string
  let telephone: string | null
  let userId: string | null = null

  if (session?.user) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user) return { status: "error", message: "Utilisateur introuvable." }

    nom = user.nom
    prenom = user.prenom
    email = user.email
    telephone = user.telephone
    userId = user.id

    const existingInscription = await prisma.inscription.findUnique({
      where: { userId_formationId: { userId, formationId } },
    })
    if (existingInscription) {
      return { status: "already", message: "Vous êtes déjà inscrit à cette formation." }
    }

    const existingDemande = await prisma.demandeInscription.findFirst({
      where: { userId, formationId, statut: "EN_ATTENTE" },
    })
    if (existingDemande) {
      return { status: "already", message: "Votre demande est déjà en cours de traitement." }
    }
  } else {
    nom = str(formData, "nom")
    prenom = str(formData, "prenom")
    email = str(formData, "email")
    telephone = optionalStr(formData, "telephone")

    if (!nom || !prenom || !email) {
      return { status: "error", message: "Merci de renseigner votre nom, prénom et email." }
    }

    const existingDemande = await prisma.demandeInscription.findFirst({
      where: { email, formationId, statut: "EN_ATTENTE" },
    })
    if (existingDemande) {
      return { status: "already", message: "Une demande est déjà en cours pour cet email." }
    }
  }

  const message = sessionLabel ? `Session souhaitée : ${sessionLabel}` : null

  await prisma.demandeInscription.create({
    data: { nom, prenom, email, telephone, formationId, userId, message },
  })

  revalidatePath("/admin/inscriptions")

  const formation = await prisma.formation.findUnique({ where: { id: formationId }, select: { titre: true } })
  const adminEmails = await getAdminNotificationEmails()
  if (adminEmails.length > 0) {
    await sendEmail({
      to: adminEmails,
      subject: "Nouvelle demande d'inscription IR2F",
      react: NouvelleDemandeAdminEmail({ nom, prenom, email, formationTitre: formation?.titre, message }),
    })
  }

  return {
    status: "success",
    message: "Votre demande d'inscription a bien été envoyée. Un conseiller IR2F revient vers vous sous 48h.",
  }
}
