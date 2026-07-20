import type { PageCle } from "@/generated/prisma"

export const PAGE_CLE_LIST: PageCle[] = ["FORMATIONS", "CONTACT", "EMPLOI", "ACTUALITES"]

export const PAGE_HERO_LABEL: Record<PageCle, string> = {
  FORMATIONS: "Formations",
  CONTACT: "Contact",
  EMPLOI: "Emploi",
  ACTUALITES: "Actualités",
}

export const PAGE_HERO_EYEBROW: Record<PageCle, string> = {
  FORMATIONS: "Catalogue",
  CONTACT: "Contact",
  EMPLOI: "IR2F vous accompagne",
  ACTUALITES: "IR2F",
}

export const PAGE_HERO_ROUTE: Record<PageCle, string> = {
  FORMATIONS: "/formations",
  CONTACT: "/contact",
  EMPLOI: "/emploi",
  ACTUALITES: "/actualites",
}

export const PAGE_HERO_DEFAULTS: Record<PageCle, { titre: string; sousTitre: string | null }> = {
  FORMATIONS: { titre: "NOTRE OFFRE DE FORMATION", sousTitre: null },
  CONTACT: {
    titre: "Parlons de votre projet",
    sousTitre:
      "Une question sur nos formations, un club qui souhaite accueillir une session, ou un projet d'inscription ? Dites-nous en plus, un conseiller IR2F revient vers vous sous 48h.",
  },
  EMPLOI: {
    titre: "Accompagnement Emploi",
    sousTitre:
      "Financements, gestion de l'emploi, formation-employabilité : retrouvez ici les ressources, contacts et vidéos pour vous accompagner dans vos démarches.",
  },
  ACTUALITES: { titre: "Toutes les actualités", sousTitre: null },
}
