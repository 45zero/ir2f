import "server-only"
import { prisma } from "@/lib/prisma"

export async function getAllDocumentsPasserelle() {
  return prisma.documentPasserelle.findMany({ orderBy: [{ section: "asc" }, { ordre: "asc" }] })
}

export async function getAllPartenaires() {
  return prisma.partenaire.findMany({ orderBy: { ordre: "asc" } })
}

export async function getAllContacts() {
  return prisma.contact.findMany({ orderBy: [{ section: "asc" }, { ordre: "asc" }] })
}

export async function getAllVideos() {
  return prisma.video.findMany({ orderBy: [{ section: "asc" }, { ordre: "asc" }] })
}

export async function getAllWebinaires() {
  return prisma.webinaire.findMany({ orderBy: { date: "desc" } })
}

export async function getAllDispositifsFinancement() {
  return prisma.dispositifFinancement.findMany({
    orderBy: { ordre: "asc" },
    include: {
      referents: { orderBy: { ordre: "asc" } },
    },
  })
}

export async function getAllPratiqueCards() {
  return prisma.pratiqueEmploiCard.findMany({ orderBy: { ordre: "asc" } })
}

export async function getEmploiPageContenu() {
  return prisma.emploiPageContenu.findUnique({ where: { id: "emploi" } })
}

export async function getGestionEmploiContenu() {
  return prisma.gestionEmploiContenu.findUnique({ where: { id: "gestion-emploi" } })
}

export async function getFormationEmployabiliteContenu() {
  return prisma.formationEmployabiliteContenu.findUnique({ where: { id: "formation-employabilite" } })
}
