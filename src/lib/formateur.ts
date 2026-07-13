import "server-only"
import { prisma } from "@/lib/prisma"

export async function getFormateurFormations(userId: string) {
  const links = await prisma.formationFormateur.findMany({
    where: { userId },
    include: {
      formation: {
        include: {
          inscriptions: {
            where: { statut: "VALIDEE" },
            include: { user: { select: { id: true, nom: true, prenom: true } } },
          },
          documents: { select: { id: true } },
          sessions: {
            where: { dateDebut: { gte: new Date() } },
            orderBy: { dateDebut: "asc" },
            take: 1,
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  })

  const allDocIds = links.flatMap((l) => l.formation.documents.map((d) => d.id))
  const signatures = allDocIds.length
    ? await prisma.signature.findMany({
        where: { documentId: { in: allDocIds } },
        select: { documentId: true, userId: true },
      })
    : []
  const signedPairs = new Set(signatures.map((s) => `${s.documentId}:${s.userId}`))

  return links.map((l) => {
    const f = l.formation
    const stagiaires = f.inscriptions.map((i) => i.user)
    const unsignedCount = f.documents.reduce(
      (acc, d) => acc + stagiaires.filter((s) => !signedPairs.has(`${d.id}:${s.id}`)).length,
      0
    )
    return {
      id: f.id,
      titre: f.titre,
      lieu: f.lieu,
      nextSession: f.sessions[0] ?? null,
      stagiaireCount: stagiaires.length,
      unsignedCount,
    }
  })
}

export async function getFormationRosterForFormateur(formationId: string, formateurUserId: string) {
  const link = await prisma.formationFormateur.findUnique({
    where: { userId_formationId: { userId: formateurUserId, formationId } },
  })
  if (!link) return null

  const [inscriptions, documents] = await Promise.all([
    prisma.inscription.findMany({
      where: { formationId, statut: "VALIDEE" },
      include: { user: { select: { id: true, nom: true, prenom: true } } },
      orderBy: { user: { nom: "asc" } },
    }),
    prisma.document.findMany({
      where: { formationId },
      include: { signatures: { select: { userId: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ])

  return inscriptions.map((i) => ({
    id: i.user.id,
    nom: i.user.nom,
    prenom: i.user.prenom,
    documents: documents.map((d) => ({
      id: d.id,
      nom: d.nom,
      signed: d.signatures.some((s) => s.userId === i.user.id),
    })),
  }))
}

export async function getFormateurAlerts(userId: string) {
  const inbox = await prisma.messageDestinataire.findMany({
    where: { userId },
    orderBy: { message: { createdAt: "desc" } },
    include: {
      message: { include: { expediteur: { select: { nom: true, prenom: true, role: true } } } },
    },
    take: 20,
  })

  return inbox.map((md) => ({
    id: md.id,
    messageId: md.messageId,
    lu: md.lu,
    contenu: md.message.contenu,
    createdAt: md.message.createdAt,
    from: `${md.message.expediteur.prenom} ${md.message.expediteur.nom}`,
    isAdmin: md.message.expediteur.role === "ADMIN",
    formationId: md.message.formationId,
  }))
}
