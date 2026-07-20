import "server-only"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"
import { computeDocumentFullySigned } from "@/lib/documents-completion"
import type { Role } from "@/generated/prisma"

export async function getAllFormationsRosterAdmin() {
  const formations = await prisma.formation.findMany({
    orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
    include: {
      inscriptions: {
        where: { statut: "VALIDEE" },
        include: { user: { select: { id: true, nom: true, prenom: true, email: true, telephone: true } } },
        orderBy: { user: { nom: "asc" } },
      },
      documents: { select: { id: true, rolesRequis: true } },
      sessions: {
        where: { dateDebut: { gte: new Date() } },
        orderBy: { dateDebut: "asc" },
        take: 1,
      },
      covoiturages: {
        where: { statut: { in: ["OUVERT", "COMPLET"] }, dateDepart: { gte: new Date() } },
        select: { id: true },
      },
    },
  })

  const allDocIds = formations.flatMap((f) => f.documents.map((d) => d.id))
  const documents = allDocIds.length
    ? await prisma.document.findMany({
        where: { id: { in: allDocIds } },
        include: { signatures: { select: { userId: true, signedAt: true, user: { select: { role: true } } } } },
      })
    : []
  const docsById = new Map(documents.map((d) => [d.id, d]))

  const sigsByDoc = new Map<string, { userId: string; role: Role }[]>()
  for (const d of documents) {
    sigsByDoc.set(
      d.id,
      d.signatures.map((s) => ({ userId: s.userId, role: s.user.role }))
    )
  }

  return Promise.all(
    formations.map(async (f) => {
      const stagiairesUsers = f.inscriptions.map((i) => ({ ...i.user, origine: i.origine }))
      const stagiaireIds = stagiairesUsers.map((s) => s.id)

      const stagiaireDocs = f.documents.filter((d) => d.rolesRequis.includes("STAGIAIRE"))
      const unsignedCount = stagiaireDocs.reduce((acc, d) => {
        const signedIds = new Set((sigsByDoc.get(d.id) ?? []).filter((s) => s.role === "STAGIAIRE").map((s) => s.userId))
        return acc + stagiairesUsers.filter((s) => !signedIds.has(s.id)).length
      }, 0)

      // Seuls les documents nécessitant au moins une signature comptent ici — le contenu
      // pédagogique (rolesRequis vide) ne doit pas gonfler artificiellement ce ratio.
      const signableDocs = f.documents.filter((d) => d.rolesRequis.length > 0)
      const fullySignedDocumentsCount = signableDocs.filter((d) =>
        computeDocumentFullySigned({
          rolesRequis: d.rolesRequis,
          signatures: sigsByDoc.get(d.id) ?? [],
          stagiaireRosterIds: stagiaireIds,
        })
      ).length

      const resolvedDocs = await Promise.all(
        f.documents.map(async (d) => {
          const full = docsById.get(d.id)
          if (!full) return null
          return {
            id: full.id,
            nom: full.nom,
            signatures: full.signatures,
            viewUrl: full.storagePath ? await getSignedDocumentUrl(full.storagePath) : full.url,
            downloadUrl: full.storagePath ? await getSignedDocumentDownloadUrl(full.storagePath, full.nom) : full.url,
          }
        })
      )
      const resolved = resolvedDocs.filter((d): d is NonNullable<typeof d> => d !== null)

      return {
        id: f.id,
        titre: f.titre,
        lieu: f.lieu,
        nextSession: f.sessions[0] ?? null,
        stagiaireCount: stagiairesUsers.length,
        unsignedCount,
        documentsCount: signableDocs.length,
        fullySignedDocumentsCount,
        covoiturageCount: f.covoiturages.length,
        stagiaires: stagiairesUsers.map((s) => ({
          id: s.id,
          nom: s.nom,
          prenom: s.prenom,
          email: s.email,
          telephone: s.telephone,
          origine: s.origine,
          documents: resolved.map((d) => {
            const sig = d.signatures.find((sig) => sig.userId === s.id)
            return {
              id: d.id,
              nom: d.nom,
              signed: Boolean(sig),
              signedAt: sig ? sig.signedAt.toISOString() : null,
              viewUrl: d.viewUrl,
              downloadUrl: d.downloadUrl,
            }
          }),
        })),
      }
    })
  )
}
