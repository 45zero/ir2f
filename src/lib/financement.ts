import "server-only"
import { prisma } from "@/lib/prisma"

export type FinancementLien = { id: string; label: string; url: string }
export type FinancementContact = { id: string; zone: string | null; nom: string; telephone: string | null; email: string | null }
export type FinancementTableau = { id: string; titre: string | null; entetes: string[]; lignes: string[][] }

export type DispositifFormationData = {
  id: string
  titre: string
  resume: string | null
  contenu: string
  montantMisEnAvant: string | null
  image: string | null
  videoUrl: string | null
  liens: FinancementLien[]
  contacts: FinancementContact[]
  tableaux: FinancementTableau[]
}

export async function getFinancementPageData(): Promise<{ dispositifs: DispositifFormationData[] }> {
  const dispositifsRaw = await prisma.dispositifFormation.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
    include: {
      liens: { where: { actif: true }, orderBy: { ordre: "asc" } },
      contacts: { where: { actif: true }, orderBy: { ordre: "asc" } },
      tableaux: { where: { actif: true }, orderBy: { ordre: "asc" } },
    },
  })

  const dispositifs: DispositifFormationData[] = dispositifsRaw.map((d) => ({
    id: d.id,
    titre: d.titre,
    resume: d.resume,
    contenu: d.contenu,
    montantMisEnAvant: d.montantMisEnAvant,
    image: d.image,
    videoUrl: d.videoUrl,
    liens: d.liens,
    contacts: d.contacts,
    tableaux: d.tableaux.map((t) => ({
      id: t.id,
      titre: t.titre,
      entetes: t.entetes as string[],
      lignes: t.lignes as string[][],
    })),
  }))

  return { dispositifs }
}
