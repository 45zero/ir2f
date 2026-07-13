import type { StatutInscription } from "@/generated/prisma"

export const STATUT_INSCRIPTION_LABELS: Record<StatutInscription, string> = {
  EN_ATTENTE: "En attente",
  VALIDEE: "Validée",
  REFUSEE: "Refusée",
}
