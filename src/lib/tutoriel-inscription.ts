import "server-only"
import { prisma } from "@/lib/prisma"
import type { TutorielInscriptionCible } from "@/generated/prisma"

// Utilisé côté site (lien discret sous les boutons FFF de la fiche formation) et côté admin
// (formulaire de config propre à la formation) : pas de notion « actif » ici, un tutoriel
// s'affiche dès qu'il est configuré pour sa cible sur cette formation.
export async function getTutorielsInscription(formationId: string) {
  const items = await prisma.tutorielInscription.findMany({ where: { formationId } })
  return Object.fromEntries(items.map((t) => [t.cible, t])) as Partial<
    Record<TutorielInscriptionCible, (typeof items)[number]>
  >
}
