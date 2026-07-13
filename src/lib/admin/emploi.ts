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
