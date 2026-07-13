"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { str, optionalStr } from "@/lib/actions/form-utils"

export type MessageActionState = { error: string | null }

export async function sendMessage(
  _prev: MessageActionState | undefined,
  formData: FormData
): Promise<MessageActionState> {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const sujet = optionalStr(formData, "sujet")
  const contenu = str(formData, "contenu")
  const destinataireIds = formData.getAll("destinataires").map(String).filter(Boolean)

  if (!contenu) return { error: "Le message ne peut pas être vide." }
  if (destinataireIds.length === 0) return { error: "Sélectionnez au moins un destinataire." }

  await prisma.message.create({
    data: {
      expediteurId: session.user.id,
      sujet,
      contenu,
      destinataires: { create: destinataireIds.map((userId) => ({ userId })) },
    },
  })

  revalidatePath("/dashboard/messages")
  return { error: null }
}

export async function markMessageAsRead(messageId: string) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  await prisma.messageDestinataire.updateMany({
    where: { messageId, userId: session.user.id, lu: false },
    data: { lu: true, luAt: new Date() },
  })

  revalidatePath("/dashboard/messages")
}
