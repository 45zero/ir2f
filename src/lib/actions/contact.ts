"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { str, optionalStr } from "@/lib/actions/form-utils"
import { sendEmail } from "@/lib/emails/send"
import { NouvelleDemandeContactEmail } from "@/lib/emails/NouvelleDemandeContactEmail"
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
  const messageRaw = optionalStr(formData, "message")

  const theme = getContactTheme(thematiqueValue)

  if (!theme) {
    return { status: "error", message: "Merci de sélectionner une thématique." }
  }

  if (!nom || !prenom || !email) {
    return { status: "error", message: "Merci de renseigner votre nom, prénom et email." }
  }

  const parts: string[] = []
  if (type === "club" && clubNom) parts.push(`Club : ${clubNom}`)
  if (messageRaw) parts.push(messageRaw)
  const message = parts.length > 0 ? parts.join("\n\n") : null

  await prisma.demandeContact.create({
    data: { thematique: thematiqueValue, nom, prenom, email, telephone, message },
  })

  revalidatePath("/admin/demandes-contact")

  const adminEmails = await getAdminNotificationEmails()
  const recipients = Array.from(new Set([...adminEmails, theme.email]))
  if (recipients.length > 0) {
    await sendEmail({
      to: recipients,
      subject: `Nouvelle demande de contact IR2F — ${theme.label}`,
      react: NouvelleDemandeContactEmail({ thematiqueLabel: theme.label, nom, prenom, email, telephone, message }),
    })
  }

  return {
    status: "success",
    message: "Votre demande a bien été envoyée. Un conseiller IR2F revient vers vous sous 48h.",
  }
}
