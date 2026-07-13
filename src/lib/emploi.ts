import "server-only"
import { prisma } from "@/lib/prisma"
import type { SectionEmploi } from "@/generated/prisma"

export type EmploiDocument = { id: string; titre: string; url: string; type: "FICHIER" | "LIEN_EXTERNE" }
export type EmploiContact = {
  id: string
  nom: string
  prenom: string | null
  email: string | null
  telephone: string | null
  poste: string | null
}
export type EmploiVideo = { id: string; titre: string; url: string; description: string | null }

export type EmploiSectionData = {
  section: SectionEmploi
  documents: EmploiDocument[]
  contacts: EmploiContact[]
  videos: EmploiVideo[]
}

export type EmploiPartenaire = { id: string; nom: string; logoUrl: string | null; siteUrl: string | null }

export type EmploiWebinaire = {
  id: string
  titre: string
  description: string | null
  date: Date
  lien: string | null
}

const SECTIONS: SectionEmploi[] = ["FINANCEMENTS", "GESTION_EMPLOI", "FORMATION_EMPLOYABILITE"]

export async function getEmploiPageData(): Promise<{
  sections: EmploiSectionData[]
  partenaires: EmploiPartenaire[]
  webinaires: EmploiWebinaire[]
}> {
  const [documents, contacts, videos, partenaires, webinaires] = await Promise.all([
    prisma.documentPasserelle.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
    prisma.contact.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
    prisma.video.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
    prisma.partenaire.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
    prisma.webinaire.findMany({
      where: { actif: true, date: { gte: new Date() } },
      orderBy: { date: "asc" },
    }),
  ])

  const sections: EmploiSectionData[] = SECTIONS.map((section) => ({
    section,
    documents: documents.filter((d) => d.section === section),
    contacts: contacts.filter((c) => c.section === section),
    videos: videos.filter((v) => v.section === section),
  }))

  return { sections, partenaires, webinaires }
}
