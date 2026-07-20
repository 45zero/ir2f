"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { str, optionalStr } from "@/lib/actions/form-utils"
import { generateTempPassword } from "@/lib/auth/temp-password"
import { sendEmail } from "@/lib/emails/send"
import { AccountCreatedEmail } from "@/lib/emails/AccountCreatedEmail"
import { InscriptionFffAdminEmail } from "@/lib/emails/InscriptionFffAdminEmail"
import { getAdminNotificationEmails } from "@/lib/emails/admin-recipients"
import type { OrigineInscription } from "@/generated/prisma"

export type FffInscriptionCible = "STAGIAIRE" | "CLUB"

export type FffInscriptionState = { status: "idle" | "error"; message?: string }

export async function enrolerViaFff(
  formationId: string,
  cible: FffInscriptionCible,
  _prevState: FffInscriptionState | undefined,
  formData: FormData
): Promise<FffInscriptionState> {
  const nom = str(formData, "nom")
  const prenom = str(formData, "prenom")
  const email = str(formData, "email")
  const telephone = optionalStr(formData, "telephone")

  if (!nom || !prenom || !email) {
    return { status: "error", message: "Merci de renseigner le nom, le prénom et l'email." }
  }

  const formation = await prisma.formation.findUnique({ where: { id: formationId } })
  if (!formation || formation.modeInscription !== "PORTAIL_FFF") {
    return { status: "error", message: "Cette formation ne propose pas d'inscription via la FFF." }
  }

  const lienFff = cible === "STAGIAIRE" ? formation.lienFffStagiaire : formation.lienFffClub
  if (!lienFff) {
    return { status: "error", message: "Le lien d'inscription FFF n'est pas configuré pour cette formation." }
  }

  let user = await prisma.user.findUnique({ where: { email } })
  let tempPassword: string | undefined

  if (!user) {
    tempPassword = generateTempPassword()
    const hash = await bcrypt.hash(tempPassword, 10)
    user = await prisma.user.create({
      data: { email, nom, prenom, telephone, role: "STAGIAIRE", password: hash, actif: true },
    })
  }

  const origine: OrigineInscription = cible === "STAGIAIRE" ? "FFF_STAGIAIRE" : "FFF_CLUB"

  await prisma.inscription.upsert({
    where: { userId_formationId: { userId: user.id, formationId } },
    update: { statut: "VALIDEE", origine },
    create: { userId: user.id, formationId, statut: "VALIDEE", origine },
  })

  revalidatePath("/admin/inscriptions")
  revalidatePath("/dashboard")

  if (tempPassword) {
    await sendEmail({
      to: email,
      subject: "Votre compte IR2F",
      react: AccountCreatedEmail({ prenom, email, tempPassword }),
    })
  }

  const adminEmails = await getAdminNotificationEmails()
  if (adminEmails.length > 0) {
    await sendEmail({
      to: adminEmails,
      subject: "Nouvelle inscription via le portail FFF",
      react: InscriptionFffAdminEmail({ nom, prenom, email, telephone, formationTitre: formation.titre, origine: cible }),
    })
  }

  redirect(lienFff)
}
