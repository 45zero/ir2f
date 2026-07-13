"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { str, optionalStr, optionalNumber } from "@/lib/actions/form-utils"

export type CovoiturageActionState = { error: string | null }

function revalidateCovoiturage() {
  revalidatePath("/dashboard/covoiturage")
}

export async function proposerCovoiturage(
  _prev: CovoiturageActionState | undefined,
  formData: FormData
): Promise<CovoiturageActionState> {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const depart = str(formData, "depart")
  const destination = str(formData, "destination")
  const dateDepartRaw = str(formData, "dateDepart")
  const places = optionalNumber(formData, "places") ?? 1
  const commentaire = optionalStr(formData, "commentaire")
  const formationId = optionalStr(formData, "formationId")

  if (!depart || !destination || !dateDepartRaw) {
    return { error: "Départ, destination et date sont obligatoires." }
  }
  if (places < 1) {
    return { error: "Le nombre de places doit être au moins 1." }
  }

  await prisma.covoiturage.create({
    data: {
      conducteurId: session.user.id,
      depart,
      destination,
      dateDepart: new Date(dateDepartRaw),
      places,
      commentaire,
      formationId,
      statut: "OUVERT",
    },
  })

  revalidateCovoiturage()
  return { error: null }
}

export async function rejoindreCovoiturage(covoiturageId: string): Promise<CovoiturageActionState> {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const covoit = await prisma.covoiturage.findUnique({
    where: { id: covoiturageId },
    include: { _count: { select: { passagers: true } } },
  })
  if (!covoit) return { error: "Trajet introuvable." }
  if (covoit.conducteurId === userId) return { error: "Vous êtes le conducteur de ce trajet." }
  if (covoit.statut !== "OUVERT") return { error: "Ce trajet n'est plus disponible." }

  const existing = await prisma.covoiturage.findFirst({
    where: { id: covoiturageId, passagers: { some: { userId } } },
  })
  if (existing) return { error: "Vous êtes déjà inscrit à ce trajet." }

  if (covoit._count.passagers >= covoit.places) {
    return { error: "Ce trajet est complet." }
  }

  await prisma.covoiturage.update({
    where: { id: covoiturageId },
    data: { passagers: { create: { userId } } },
  })

  const newCount = covoit._count.passagers + 1
  if (newCount >= covoit.places) {
    await prisma.covoiturage.update({ where: { id: covoiturageId }, data: { statut: "COMPLET" } })
  }

  revalidateCovoiturage()
  return { error: null }
}

export async function quitterCovoiturage(covoiturageId: string) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  await prisma.covoiturage.update({
    where: { id: covoiturageId },
    data: { passagers: { deleteMany: { userId: session.user.id } }, statut: "OUVERT" },
  })

  revalidateCovoiturage()
}

export async function annulerCovoiturage(covoiturageId: string): Promise<CovoiturageActionState> {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const covoit = await prisma.covoiturage.findUnique({ where: { id: covoiturageId }, select: { conducteurId: true } })
  if (!covoit) return { error: "Trajet introuvable." }
  if (covoit.conducteurId !== session.user.id) {
    return { error: "Seul le conducteur peut annuler ce trajet." }
  }

  await prisma.covoiturage.update({ where: { id: covoiturageId }, data: { statut: "ANNULE" } })
  revalidateCovoiturage()
  return { error: null }
}
