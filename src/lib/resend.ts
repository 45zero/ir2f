import "server-only"
import { Resend } from "resend"

// Reste `null` tant que RESEND_API_KEY n'est pas configurée (domaine pas encore
// vérifié côté Resend) — voir src/lib/emails/send.ts pour le no-op associé.
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL ?? "IR2F <noreply@ir2f.lgef.fr>"
