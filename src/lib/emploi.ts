import "server-only"
import { prisma } from "@/lib/prisma"
import type { SectionEmploi, IconePratique } from "@/generated/prisma"

export type EmploiDocument = { id: string; titre: string; url: string; type: "FICHIER" | "LIEN_EXTERNE" }
export type EmploiContact = {
  id: string
  nom: string
  prenom: string | null
  email: string | null
  telephone: string | null
  poste: string | null
}
export type EmploiVideo = { id: string; titre: string; url: string; videoFichierUrl: string | null; description: string | null }

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

export type EmploiReferent = {
  id: string
  departement: string
  referent: string
  email: string | null
  codeFiche: string | null
}

export type EmploiDispositif = {
  id: string
  titre: string
  resume: string | null
  contenu: string
  montantMisEnAvant: string | null
  image: string | null
  videoUrl: string | null
  videoFichierUrl: string | null
  documents: EmploiDocument[]
  videos: EmploiVideo[]
  referents: EmploiReferent[]
}

export type EmploiPratiqueCard = {
  id: string
  titre: string
  description: string | null
  icone: IconePratique
}

export type EmploiPageContenuData = {
  introTexte: string
  introListe: string
  videoCommunauteUrl: string | null
  videoCommunauteFichierUrl: string | null
}

export type GestionEmploiContenuData = {
  eLearningTitre: string | null
  eLearningTexte: string | null
  eLearningLienLabel: string | null
  eLearningLienUrl: string | null
  creerEmploiTexte: string
  creerEmploiLienLabel: string | null
  creerEmploiLienUrl: string | null
  communauteTitre: string | null
  communauteTexte: string | null
  communauteVideoUrl: string | null
  communauteVideoFichierUrl: string | null
  communauteLienEnSavoirPlusUrl: string | null
  communauteLienRejoindreUrl: string | null
}

export type FormationEmployabiliteContenuData = {
  introTexte: string | null
  indicateursNote: string | null
}

const SECTIONS: SectionEmploi[] = ["FINANCEMENTS", "GESTION_EMPLOI", "FORMATION_EMPLOYABILITE"]

const EMPLOI_PAGE_CONTENU_DEFAUT: EmploiPageContenuData = {
  introTexte: "",
  introListe: "",
  videoCommunauteUrl: null,
  videoCommunauteFichierUrl: null,
}

const GESTION_EMPLOI_CONTENU_DEFAUT: GestionEmploiContenuData = {
  eLearningTitre: null,
  eLearningTexte: null,
  eLearningLienLabel: null,
  eLearningLienUrl: null,
  creerEmploiTexte: "",
  creerEmploiLienLabel: null,
  creerEmploiLienUrl: null,
  communauteTitre: null,
  communauteTexte: null,
  communauteVideoUrl: null,
  communauteVideoFichierUrl: null,
  communauteLienEnSavoirPlusUrl: null,
  communauteLienRejoindreUrl: null,
}

const FORMATION_EMPLOYABILITE_CONTENU_DEFAUT: FormationEmployabiliteContenuData = {
  introTexte: null,
  indicateursNote: null,
}

export async function getEmploiPageData(): Promise<{
  sections: EmploiSectionData[]
  partenaires: EmploiPartenaire[]
  webinaires: EmploiWebinaire[]
  dispositifs: EmploiDispositif[]
  pratiqueCards: EmploiPratiqueCard[]
  pageContenu: EmploiPageContenuData
  gestionEmploiContenu: GestionEmploiContenuData
  formationEmployabiliteContenu: FormationEmployabiliteContenuData
}> {
  const [documents, contacts, videos, partenaires, webinaires, dispositifsRaw, pratiqueCards, pageContenuRow, gestionRow, formationRow] =
    await Promise.all([
      prisma.documentPasserelle.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
      prisma.contact.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
      prisma.video.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
      prisma.partenaire.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
      prisma.webinaire.findMany({
        where: { actif: true, date: { gte: new Date() } },
        orderBy: { date: "asc" },
      }),
      prisma.dispositifFinancement.findMany({
        where: { actif: true },
        orderBy: { ordre: "asc" },
        include: {
          documents: { where: { actif: true }, orderBy: { ordre: "asc" } },
          videos: { where: { actif: true }, orderBy: { ordre: "asc" } },
          referents: { where: { actif: true }, orderBy: { ordre: "asc" } },
        },
      }),
      prisma.pratiqueEmploiCard.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
      prisma.emploiPageContenu.findUnique({ where: { id: "emploi" } }),
      prisma.gestionEmploiContenu.findUnique({ where: { id: "gestion-emploi" } }),
      prisma.formationEmployabiliteContenu.findUnique({ where: { id: "formation-employabilite" } }),
    ])

  const sections: EmploiSectionData[] = SECTIONS.map((section) => ({
    section,
    documents: documents.filter((d) => d.section === section && !d.dispositifId),
    contacts: contacts.filter((c) => c.section === section),
    videos: videos.filter((v) => v.section === section && !v.dispositifId),
  }))

  const dispositifs: EmploiDispositif[] = dispositifsRaw.map((d) => ({
    id: d.id,
    titre: d.titre,
    resume: d.resume,
    contenu: d.contenu,
    montantMisEnAvant: d.montantMisEnAvant,
    image: d.image,
    videoUrl: d.videoUrl,
    videoFichierUrl: d.videoFichierUrl,
    documents: d.documents,
    videos: d.videos,
    referents: d.referents,
  }))

  return {
    sections,
    partenaires,
    webinaires,
    dispositifs,
    pratiqueCards,
    pageContenu: pageContenuRow ?? EMPLOI_PAGE_CONTENU_DEFAUT,
    gestionEmploiContenu: gestionRow ?? GESTION_EMPLOI_CONTENU_DEFAUT,
    formationEmployabiliteContenu: formationRow ?? FORMATION_EMPLOYABILITE_CONTENU_DEFAUT,
  }
}
