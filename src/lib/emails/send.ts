import "server-only"
import type { ReactElement } from "react"
import { resend, EMAIL_FROM } from "@/lib/resend"

export async function sendEmail({
  to,
  subject,
  react,
  attachments,
}: {
  to: string | string[]
  subject: string
  react: ReactElement
  attachments?: { filename: string; content: Buffer }[]
}): Promise<{ sent: boolean }> {
  if (!resend) {
    console.log(`[email] Resend non configuré — email "${subject}" non envoyé à ${to}`)
    return { sent: false }
  }

  const { error } = await resend.emails.send({ from: EMAIL_FROM, to, subject, react, attachments })
  if (error) {
    console.error(`[email] Échec d'envoi "${subject}" à ${to} :`, error)
    return { sent: false }
  }
  return { sent: true }
}
