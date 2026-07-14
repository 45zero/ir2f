import type { Role } from "@/generated/prisma"

export const SIGNATORY_ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "STAGIAIRE", label: "Stagiaire" },
  { value: "FORMATEUR", label: "Formateur" },
  { value: "ADMIN", label: "Admin" },
  { value: "DIRECTION", label: "Direction (président de ligue)" },
]
