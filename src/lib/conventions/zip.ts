import "server-only"
import JSZip from "jszip"
import { prisma } from "@/lib/prisma"
import { downloadStorageFile } from "@/lib/storage"

/** Zippe les conventions déjà générées (pdfStoragePath renseigné) d'une session — y compris celles pas encore entièrement signées, voir l'avertissement affiché côté UI avant téléchargement/envoi. */
export async function buildSessionConventionsZip(sessionId: string): Promise<{ filename: string; buffer: Buffer; count: number } | null> {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: {
      formation: { select: { titre: true } },
      conventionStagiaires: {
        where: { pdfStoragePath: { not: null } },
        select: { nom: true, prenom: true, pdfStoragePath: true },
      },
    },
  })
  if (!session || session.conventionStagiaires.length === 0) return null

  const zip = new JSZip()
  for (const s of session.conventionStagiaires) {
    const bytes = await downloadStorageFile(s.pdfStoragePath!)
    zip.file(`${s.prenom}-${s.nom}.pdf`.replace(/\s+/g, "_"), bytes)
  }
  const buffer = await zip.generateAsync({ type: "nodebuffer" })
  const filename = `conventions-${session.formation.titre}.zip`.replace(/[^\w.-]+/g, "_")
  return { filename, buffer, count: session.conventionStagiaires.length }
}
