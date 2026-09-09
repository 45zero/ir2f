import "server-only"
import { prisma } from "@/lib/prisma"
import type { TutorielInscriptionCible } from "@/generated/prisma"

// Utilisé côté site (lien discret sous les boutons FFF) et côté admin (formulaires de config) :
// pas de notion « actif » ici, un tutoriel s'affiche dès qu'il est configuré pour sa cible.
export async function getTutorielsInscription() {
  const items = await prisma.tutorielInscription.findMany()
  return Object.fromEntries(items.map((t) => [t.cible, t])) as Partial<
    Record<TutorielInscriptionCible, (typeof items)[number]>
  >
}
