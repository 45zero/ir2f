"use server"

import { prisma } from "@/lib/prisma"
import { parseJsonArray } from "@/lib/actions/form-utils"

export type SessionInput = {
  id?: string
  dateDebut: string
  lieu: string
  places: string
  conventionTemplateId: string
  responsablePedagogiqueUserId: string
}

/**
 * Réconcilie les sessions soumises par le formulaire formation avec celles en base, par id stable
 * (remplace l'ancien pattern delete-all/recreate-all — inadapté maintenant que les sessions
 * portent des conventions/stagiaires qu'on ne peut pas se permettre d'orpheliner à chaque
 * enregistrement de la formation). Lignes sans id → créées ; avec id encore présent → mises à
 * jour ; en base mais absentes de la soumission → supprimées, sauf si elles ont des
 * conventionStagiaires (ignorées silencieusement — la protection principale est côté UI, voir
 * `hasStagiaires` dans SessionsEditor qui désactive le retrait dans ce cas).
 */
export async function syncSessions(formationId: string, formData: FormData) {
  const sessions = parseJsonArray<SessionInput>(formData, "sessions").filter((s) => s.dateDebut)

  const existing = await prisma.session.findMany({
    where: { formationId },
    select: { id: true, _count: { select: { conventionStagiaires: true } } },
  })
  const submittedIds = new Set(sessions.filter((s) => s.id).map((s) => s.id))
  const toDelete = existing.filter((s) => !submittedIds.has(s.id) && s._count.conventionStagiaires === 0)
  if (toDelete.length > 0) {
    await prisma.session.deleteMany({ where: { id: { in: toDelete.map((s) => s.id) } } })
  }

  for (const s of sessions) {
    const data = {
      formationId,
      dateDebut: new Date(s.dateDebut),
      dateFin: new Date(s.dateDebut),
      lieu: s.lieu || null,
      places: s.places ? Number(s.places) : null,
      conventionTemplateId: s.conventionTemplateId || null,
      responsablePedagogiqueUserId: s.responsablePedagogiqueUserId || null,
    }
    if (s.id) {
      await prisma.session.update({ where: { id: s.id }, data })
    } else {
      await prisma.session.create({ data })
    }
  }
}

/** Garde utilisée par deleteFormation — doit bloquer toute la suppression plutôt qu'ignorer silencieusement une ligne comme syncSessions ci-dessus. */
export async function formationHasSessionWithConventions(formationId: string): Promise<boolean> {
  const count = await prisma.session.count({ where: { formationId, conventionStagiaires: { some: {} } } })
  return count > 0
}
