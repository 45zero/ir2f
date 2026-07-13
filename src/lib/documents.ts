import "server-only"
import { prisma } from "@/lib/prisma"

export async function getMesDocuments(userId: string) {
  return prisma.document.findMany({
    where: {
      OR: [
        { uploaderId: userId },
        { public: true },
        { formation: { inscriptions: { some: { userId, statut: "VALIDEE" } } } },
      ],
    },
    orderBy: { createdAt: "desc" },
    include: {
      formation: { select: { titre: true } },
      uploader: { select: { nom: true, prenom: true } },
      signatures: { where: { userId } },
    },
  })
}
