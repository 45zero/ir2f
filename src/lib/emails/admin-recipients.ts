import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAdminNotificationEmails(): Promise<string[]> {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN", actif: true },
    select: { email: true },
  })
  return admins.map((a) => a.email)
}
