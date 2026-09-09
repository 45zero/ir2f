import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAllPopups() {
  return prisma.popup.findMany({ orderBy: { ordre: "asc" } })
}
