import "server-only"
import { prisma } from "@/lib/prisma"

export async function getConventionTemplatesForSelect() {
  return prisma.conventionTemplate.findMany({ orderBy: { nom: "asc" }, select: { id: true, nom: true } })
}

/** Sessions d'une formation avec un résumé d'avancement convention — pour la page liste /admin/formations/[id]/conventions. */
export async function getFormationSessionsConventionSuivi(formationId: string) {
  return prisma.formation.findUnique({
    where: { id: formationId },
    select: {
      id: true,
      titre: true,
      sessions: {
        orderBy: { dateDebut: "asc" },
        select: {
          id: true,
          dateDebut: true,
          lieu: true,
          conventionTemplateId: true,
          responsablePedagogiqueUserId: true,
          responsablePedagogiqueUser: { select: { nom: true, prenom: true } },
          responsablePedagogiqueSignatureSignedAt: true,
          _count: { select: { conventionStagiaires: true } },
        },
      },
    },
  })
}

/** Détail convention d'une session précise — pour /admin/formations/[id]/conventions/[sessionId]. */
export async function getSessionConventionSuivi(sessionId: string) {
  return prisma.session.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      dateDebut: true,
      lieu: true,
      formationId: true,
      formation: { select: { id: true, titre: true } },
      conventionTemplateId: true,
      responsablePedagogiqueUserId: true,
      responsablePedagogiqueUser: { select: { nom: true, prenom: true, email: true } },
      responsablePedagogiqueSignatureEnvoyeAt: true,
      responsablePedagogiqueSignatureSignedAt: true,
      conventionStagiaires: {
        orderBy: { createdAt: "asc" },
        include: { signataires: { orderBy: { ordre: "asc" } } },
      },
    },
  })
}
