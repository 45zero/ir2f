"use server"

import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { generateTempPassword } from "@/lib/auth/temp-password"
import { sendEmail } from "@/lib/emails/send"
import { AccountCreatedEmail } from "@/lib/emails/AccountCreatedEmail"
import { InscriptionConfirmeeEmail } from "@/lib/emails/InscriptionConfirmeeEmail"
import { DemandeRefuseeEmail } from "@/lib/emails/DemandeRefuseeEmail"

export type DemandeActionState = {
  error: string | null
  tempPassword?: string
  email?: string
  accountCreated?: boolean
}

export async function validateDemande(
  id: string,
  _prevState: DemandeActionState | undefined
): Promise<DemandeActionState> {
  await requireAdmin()

  const demande = await prisma.demandeInscription.findUnique({ where: { id } })
  if (!demande) return { error: "Demande introuvable." }
  if (demande.statut !== "EN_ATTENTE") return { error: "Cette demande a déjà été traitée." }

  let userId = demande.userId
  let tempPassword: string | undefined

  if (!userId) {
    let user = await prisma.user.findUnique({ where: { email: demande.email } })
    if (!user) {
      tempPassword = generateTempPassword()
      const hash = await bcrypt.hash(tempPassword, 10)
      user = await prisma.user.create({
        data: {
          email: demande.email,
          nom: demande.nom,
          prenom: demande.prenom,
          telephone: demande.telephone,
          role: "STAGIAIRE",
          password: hash,
          actif: true,
        },
      })
    }
    userId = user.id
  }

  let formationTitre: string | undefined
  if (demande.formationId) {
    await prisma.inscription.upsert({
      where: { userId_formationId: { userId, formationId: demande.formationId } },
      update: { statut: "VALIDEE" },
      create: { userId, formationId: demande.formationId, statut: "VALIDEE" },
    })
    const formation = await prisma.formation.findUnique({
      where: { id: demande.formationId },
      select: { titre: true },
    })
    formationTitre = formation?.titre
  }

  await prisma.demandeInscription.update({
    where: { id },
    data: { statut: "VALIDEE", userId },
  })

  revalidatePath("/admin/inscriptions")
  revalidatePath("/admin/users")
  revalidatePath("/dashboard")

  if (tempPassword) {
    await sendEmail({
      to: demande.email,
      subject: "Votre compte IR2F",
      react: AccountCreatedEmail({ prenom: demande.prenom, email: demande.email, tempPassword }),
    })
  } else {
    await sendEmail({
      to: demande.email,
      subject: "Votre demande IR2F a été validée",
      react: InscriptionConfirmeeEmail({ prenom: demande.prenom, formationTitre }),
    })
  }

  return { error: null, tempPassword, email: demande.email, accountCreated: Boolean(tempPassword) }
}

export async function refuseDemande(
  id: string,
  _prevState: DemandeActionState | undefined
): Promise<DemandeActionState> {
  await requireAdmin()

  const demande = await prisma.demandeInscription.findUnique({ where: { id } })
  if (!demande) return { error: "Demande introuvable." }
  if (demande.statut !== "EN_ATTENTE") return { error: "Cette demande a déjà été traitée." }

  await prisma.demandeInscription.update({ where: { id }, data: { statut: "REFUSEE" } })
  revalidatePath("/admin/inscriptions")

  await sendEmail({
    to: demande.email,
    subject: "Votre demande IR2F",
    react: DemandeRefuseeEmail({ prenom: demande.prenom }),
  })

  return { error: null }
}
