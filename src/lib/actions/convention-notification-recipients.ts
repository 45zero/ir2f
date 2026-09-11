"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr } from "@/lib/actions/form-utils"
import type { CategorieNotificationConvention } from "@/generated/prisma"

export type NotificationRecipientActionState = { error: string | null }

/** Ajoute un destinataire (email libre, pas de compte requis) à la liste notifiée automatiquement
 * quand une convention de stage est intégralement signée — voir notifyConventionComplete. */
export async function ajouterNotificationDestinataire(
  categorie: CategorieNotificationConvention,
  _prev: NotificationRecipientActionState | undefined,
  formData: FormData
): Promise<NotificationRecipientActionState> {
  await requireAdmin()

  const email = str(formData, "email").trim().toLowerCase()
  if (!email || !email.includes("@")) return { error: "Adresse email invalide." }
  const nom = optionalStr(formData, "nom")

  try {
    await prisma.conventionNotificationDestinataire.create({ data: { categorie, email, nom } })
  } catch {
    return { error: "Cette adresse est déjà dans la liste." }
  }

  revalidatePath("/admin/conventions/notifications")
  return { error: null }
}

export async function supprimerNotificationDestinataire(id: string): Promise<NotificationRecipientActionState> {
  await requireAdmin()
  await prisma.conventionNotificationDestinataire.delete({ where: { id } })
  revalidatePath("/admin/conventions/notifications")
  return { error: null }
}
