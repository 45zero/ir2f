import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"
import type { RoleSignataire, StatutSignature } from "@/generated/prisma"

type ResponsablePedagogiqueSessionInfo = {
  responsablePedagogiqueUser: { nom: string; prenom: string } | null
  responsablePedagogiqueSignatureEnvoyeAt: Date | null
  responsablePedagogiqueSignatureSignedAt: Date | null
  responsablePedagogiqueSignatureIpAddress: string | null
}

/**
 * Le responsable pédagogique ne fait pas partie du circuit `ConventionSignataire` par stagiaire —
 * il signe une seule fois pour toute la session (voir `Session.responsablePedagogiqueSignature*`
 * et `SIGNATAIRE_ORDER` dans variables.ts) et cette même signature est incrustée dans le PDF de
 * chaque stagiaire de la session. Les pastilles de suivi traitent pourtant les 5 rôles de façon
 * uniforme (une colonne par rôle) : sans cette ligne synthétique, la colonne "Responsable
 * pédagogique" ne trouvait jamais d'entrée dans `signataires` et restait grise indéfiniment, même
 * une fois la signature de session bien présente dans les PDF générés.
 */
export function buildResponsablePedagogiqueSignatairePseudoRow(session: ResponsablePedagogiqueSessionInfo) {
  const statut: StatutSignature = session.responsablePedagogiqueSignatureSignedAt
    ? "SIGNE"
    : session.responsablePedagogiqueSignatureEnvoyeAt
      ? "EN_ATTENTE"
      : "NON_ENVOYE"

  return {
    id: "responsable-pedagogique-session",
    role: "RESPONSABLE_PEDAGOGIQUE" as RoleSignataire,
    statut,
    motifRefus: null,
    signedAt: session.responsablePedagogiqueSignatureSignedAt?.toISOString() ?? null,
    ipAddress: session.responsablePedagogiqueSignatureIpAddress,
    token: "",
    nom: session.responsablePedagogiqueUser
      ? `${session.responsablePedagogiqueUser.prenom} ${session.responsablePedagogiqueUser.nom}`
      : "",
    dernierRenvoiPar: null,
    dernierRenvoiCanal: null,
    dernierRenvoiAt: null,
  }
}

/** Stagiaires + statut de leur convention pour une formation, prêts à afficher dans un roster (dashboard formateur/admin ou page admin dédiée). */
export async function getConventionStagiairesForRoster(formationId: string) {
  const stagiaires = await prisma.conventionStagiaire.findMany({
    where: { formationId },
    orderBy: { createdAt: "asc" },
    include: {
      signataires: { orderBy: { ordre: "asc" } },
      session: {
        select: {
          responsablePedagogiqueUser: { select: { nom: true, prenom: true } },
          responsablePedagogiqueSignatureEnvoyeAt: true,
          responsablePedagogiqueSignatureSignedAt: true,
          responsablePedagogiqueSignatureIpAddress: true,
        },
      },
    },
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
      signataires: [
        ...s.signataires.map((sig) => ({
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
        buildResponsablePedagogiqueSignatairePseudoRow(s.session),
      ],
    }))
  )
}

export type ConventionRosterRow = Awaited<ReturnType<typeof getConventionStagiairesForRoster>>[number]
