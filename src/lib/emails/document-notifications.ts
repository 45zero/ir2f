import "server-only"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/emails/send"
import { DocumentASignerEmail } from "@/lib/emails/DocumentASignerEmail"
import type { Role } from "@/generated/prisma"

function dashboardPathFor(role: Role) {
  return role === "FORMATEUR" ? "/dashboard" : "/dashboard/documents"
}

export async function notifyDocumentSignataires({
  documentNom,
  formationId,
  formationTitre,
  rolesRequis,
  stagiaireIds = [],
  excludeUserId,
}: {
  documentNom: string
  formationId: string | null
  formationTitre: string | null
  rolesRequis: Role[]
  stagiaireIds?: string[]
  excludeUserId: string
}) {
  type Recipient = { id: string; email: string; prenom: string; role: Role }
  const recipients: Recipient[] = []

  if (rolesRequis.includes("STAGIAIRE") && stagiaireIds.length > 0) {
    const stagiaires = await prisma.user.findMany({
      where: { id: { in: stagiaireIds }, actif: true },
      select: { id: true, email: true, prenom: true, role: true },
    })
    recipients.push(...stagiaires)
  }

  if (rolesRequis.includes("FORMATEUR") && formationId) {
    const links = await prisma.formationFormateur.findMany({
      where: { formationId },
      include: { user: { select: { id: true, email: true, prenom: true, role: true, actif: true } } },
    })
    recipients.push(...links.map((l) => l.user).filter((u) => u.actif))
  }

  for (const role of ["ADMIN", "DIRECTION"] as const) {
    if (rolesRequis.includes(role)) {
      const users = await prisma.user.findMany({
        where: { role, actif: true },
        select: { id: true, email: true, prenom: true, role: true },
      })
      recipients.push(...users)
    }
  }

  const uniqueRecipients = new Map(recipients.map((r) => [r.id, r]))
  uniqueRecipients.delete(excludeUserId)

  await Promise.all(
    Array.from(uniqueRecipients.values()).map((r) =>
      sendEmail({
        to: r.email,
        subject: `Document à signer — ${documentNom}`,
        react: DocumentASignerEmail({
          prenom: r.prenom,
          documentNom,
          formationTitre,
          dashboardPath: dashboardPathFor(r.role),
        }),
      })
    )
  )
}
