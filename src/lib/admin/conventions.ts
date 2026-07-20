import "server-only"
import { prisma } from "@/lib/prisma"

export async function getConventionTemplatesForSelect() {
  return prisma.conventionTemplate.findMany({ orderBy: { nom: "asc" }, select: { id: true, nom: true } })
}

export async function getFormationConventionSuivi(formationId: string) {
  return prisma.formation.findUnique({
    where: { id: formationId },
    select: {
      id: true,
      titre: true,
      conventionTemplateId: true,
      responsablePedagogiqueNom: true,
      responsablePedagogiquePrenom: true,
      responsablePedagogiqueEmail: true,
      responsablePedagogiqueTelephone: true,
      conventionStagiaires: {
        orderBy: { createdAt: "asc" },
        include: { signataires: { orderBy: { ordre: "asc" } } },
      },
    },
  })
}
