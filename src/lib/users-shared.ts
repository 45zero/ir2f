import type { Role } from "@/generated/prisma"

export const ROLE_LABELS: Record<Role, string> = {
  STAGIAIRE: "Stagiaire",
  FORMATEUR: "Formateur",
  ADMIN: "Administrateur",
  DIRECTION: "Direction",
}
