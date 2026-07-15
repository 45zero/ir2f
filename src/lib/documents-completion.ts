import "server-only"
import { prisma } from "@/lib/prisma"
import type { Role } from "@/generated/prisma"

export function computeDocumentFullySigned({
  rolesRequis,
  signatures,
  stagiaireRosterIds,
}: {
  rolesRequis: Role[]
  signatures: { userId: string; role: Role }[]
  stagiaireRosterIds: string[] | null
}): boolean {
  if (rolesRequis.length === 0) return true

  for (const role of rolesRequis) {
    if (role === "STAGIAIRE") {
      if (!stagiaireRosterIds || stagiaireRosterIds.length === 0) {
        if (!signatures.some((s) => s.role === "STAGIAIRE")) return false
      } else {
        const signedIds = new Set(signatures.filter((s) => s.role === "STAGIAIRE").map((s) => s.userId))
        if (!stagiaireRosterIds.every((id) => signedIds.has(id))) return false
      }
    } else if (!signatures.some((s) => s.role === role)) {
      return false
    }
  }
  return true
}

export async function checkDocumentFullySignedById(documentId: string): Promise<boolean> {
  const doc = await prisma.document.findUnique({
    where: { id: documentId },
    select: {
      formationId: true,
      rolesRequis: true,
      signatures: { select: { userId: true, user: { select: { role: true } } } },
    },
  })
  if (!doc) return false

  let stagiaireRosterIds: string[] | null = null
  if (doc.formationId && doc.rolesRequis.includes("STAGIAIRE")) {
    const roster = await prisma.inscription.findMany({
      where: { formationId: doc.formationId, statut: "VALIDEE" },
      select: { userId: true },
    })
    stagiaireRosterIds = roster.map((r) => r.userId)
  }

  return computeDocumentFullySigned({
    rolesRequis: doc.rolesRequis,
    signatures: doc.signatures.map((s) => ({ userId: s.userId, role: s.user.role })),
    stagiaireRosterIds,
  })
}
