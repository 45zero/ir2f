import "server-only"
import { prisma } from "@/lib/prisma"
import type { CategorieNotificationConvention } from "@/generated/prisma"

export async function getAdminNotificationEmails(): Promise<string[]> {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN", actif: true },
    select: { email: true },
  })
  return admins.map((a) => a.email)
}

/** Destinataires configurés depuis /admin/conventions/notifications pour une catégorie donnée
 * (ADMIN ou COMPTABILITE) — liste d'emails libres, distincte des comptes ADMIN (voir
 * ConventionNotificationDestinataire). Utilisée uniquement par notifyConventionComplete ; les
 * alertes de circuit bloqué/refus continuent d'utiliser getAdminNotificationEmails ci-dessus. */
export async function getConventionNotificationEmails(categorie: CategorieNotificationConvention): Promise<string[]> {
  const destinataires = await prisma.conventionNotificationDestinataire.findMany({
    where: { categorie },
    select: { email: true },
  })
  return destinataires.map((d) => d.email)
}
