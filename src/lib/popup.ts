import "server-only"
import { prisma } from "@/lib/prisma"

// Pop-ups actifs et dans leur fenêtre de diffusion (dateDebut/dateFin), du plus prioritaire au
// moins prioritaire — PopupGate.tsx (client) affiche le premier que le visiteur n'a pas déjà vu.
export async function getActivePopups() {
  const now = new Date()
  return prisma.popup.findMany({
    where: {
      actif: true,
      AND: [
        { OR: [{ dateDebut: null }, { dateDebut: { lte: now } }] },
        { OR: [{ dateFin: null }, { dateFin: { gte: now } }] },
      ],
    },
    orderBy: [{ ordre: "asc" }, { createdAt: "desc" }],
  })
}
