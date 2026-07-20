"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { str, optionalStr } from "@/lib/actions/form-utils"
import { sendEmail } from "@/lib/emails/send"
import { NouvelleDemandeAdminEmail } from "@/lib/emails/NouvelleDemandeAdminEmail"
import { getAdminNotificationEmails } from "@/lib/emails/admin-recipients"
import { getContactTheme } from "@/lib/contact-themes"

export type ContactState = { status: "idle" | "success" | "error"; message?: string }

export async function submitContactRequest(
  _prevState: ContactState | undefined,
  formData: FormData
): Promise<ContactState> {
  const type = str(formData, "type")
  const thematiqueValue = str(formData, "thematique")
  const nom = str(formData, "nom")
  const prenom = str(formData, "prenom")
  const email = str(formData, "email")
  const telephone = optionalStr(formData, "telephone")
  const clubNom = optionalStr(formData, "clubNom")
  const formationId = optionalStr(formData, "formationId")
  const messageRaw = optionalStr(formData, "message")

  const theme = getContactTheme(thematiqueValue)

  if (!theme) {
    return { status: "error", message: "Merci de sélectionner une thématique." }
  }

  if (!nom || !prenom || !email) {
    return { status: "error", message: "Merci de renseigner votre nom, prénom et email." }
  }

  const parts: string[] = [`Thématique : ${theme.label}`]
  if (type === "club" && clubNom) parts.push(`Club : ${clubNom}`)
  if (messageRaw) parts.push(messageRaw)

  const session = await auth()
  const message = parts.length > 0 ? parts.join("\n\n") : null

  const formation = formationId
    ? await prisma.formation.findUnique({ where: { id: formationId }, select: { titre: true } })
    : null

  await prisma.demandeInscription.create({
    data: {
      nom,
      prenom,
      email,
      telephone,
      formationId: formationId || null,
      userId: session?.user?.id ?? null,
      message,
    },
  })

  revalidatePath("/admin/inscriptions")

  const adminEmails = await getAdminNotificationEmails()
  const recipients = Array.from(new Set([...adminEmails, theme.email]))
  if (recipients.length > 0) {
    await sendEmail({
      to: recipients,
      subject: `Nouvelle demande d'inscription IR2F — ${theme.label}`,
      react: NouvelleDemandeAdminEmail({ nom, prenom, email, formationTitre: formation?.titre, message }),
    })
  }

  return {
    status: "success",
    message: "Votre demande a bien été envoyée. Un conseiller IR2F revient vers vous sous 48h.",
  }
}
