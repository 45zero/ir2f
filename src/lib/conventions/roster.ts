import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"

/** Stagiaires + statut de leur convention pour une formation, prêts à afficher dans un roster (dashboard formateur/admin ou page admin dédiée). */
export async function getConventionStagiairesForRoster(formationId: string) {
  const stagiaires = await prisma.conventionStagiaire.findMany({
    where: { formationId },
    orderBy: { createdAt: "asc" },
    include: { signataires: { orderBy: { ordre: "asc" } } },
  })

  return Promise.all(
    stagiaires.map(async (s) => ({
      id: s.id,
      nom: s.nom,
      prenom: s.prenom,
      club: s.club,
      sent: Boolean(s.pdfStoragePath),
      pdfViewUrl: s.pdfStoragePath ? await getSignedDocumentUrl(s.pdfStoragePath) : null,
      pdfDownloadUrl: s.pdfStoragePath
        ? await getSignedDocumentDownloadUrl(s.pdfStoragePath, `Convention - ${s.prenom} ${s.nom}.pdf`)
        : null,
      signataires: s.signataires.map((sig) => ({
        id: sig.id,
        role: sig.role,
        statut: sig.statut,
        motifRefus: sig.motifRefus,
        signedAt: sig.signedAt?.toISOString() ?? null,
        ipAddress: sig.ipAddress,
        token: sig.token,
        nom: sig.nom,
        dernierRenvoiPar: sig.dernierRenvoiPar,
        dernierRenvoiCanal: sig.dernierRenvoiCanal,
        dernierRenvoiAt: sig.dernierRenvoiAt?.toISOString() ?? null,
      })),
    }))
  )
}

export type ConventionRosterRow = Awaited<ReturnType<typeof getConventionStagiairesForRoster>>[number]
