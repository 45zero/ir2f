"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { generateTempPassword } from "@/lib/auth/temp-password"
import { str, optionalStr } from "@/lib/actions/form-utils"
import { sendEmail } from "@/lib/emails/send"
import { AccountCreatedEmail } from "@/lib/emails/AccountCreatedEmail"
import { Prisma, type Role } from "@/generated/prisma"

export type UserActionState = { error: string | null; tempPassword?: string; email?: string }

export async function createUser(
  _prevState: UserActionState | undefined,
  formData: FormData
): Promise<UserActionState> {
  await requireAdmin()

  const email = str(formData, "email")
  const nom = str(formData, "nom")
  const prenom = str(formData, "prenom")
  const telephone = optionalStr(formData, "telephone")
  const role = str(formData, "role") as Role

  if (!email || !nom || !prenom) {
    return { error: "Email, nom et prénom sont obligatoires." }
  }

  const tempPassword = generateTempPassword()
  const hash = await bcrypt.hash(tempPassword, 10)

  try {
    await prisma.user.create({
      data: { email, nom, prenom, telephone, role, password: hash, actif: true },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Cet email est déjà utilisé par un autre compte." }
    }
    throw error
  }

  revalidatePath("/admin/users")

  await sendEmail({
    to: email,
    subject: "Votre compte IR2F",
    react: AccountCreatedEmail({ prenom, email, tempPassword }),
  })

  return { error: null, tempPassword, email }
}

export async function updateUser(id: string, formData: FormData): Promise<UserActionState> {
  const session = await requireAdmin()

  const email = str(formData, "email")
  const nom = str(formData, "nom")
  const prenom = str(formData, "prenom")
  const telephone = optionalStr(formData, "telephone")
  const role = str(formData, "role") as Role
  const actif = formData.get("actif") === "on"

  if (!email || !nom || !prenom) {
    return { error: "Email, nom et prénom sont obligatoires." }
  }

  if (session?.user?.id === id && (role !== "ADMIN" || !actif)) {
    return { error: "Vous ne pouvez pas retirer vos propres droits administrateur ni vous désactiver vous-même." }
  }

  try {
    await prisma.user.update({ where: { id }, data: { email, nom, prenom, telephone, role, actif } })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Cet email est déjà utilisé par un autre compte." }
    }
    throw error
  }

  revalidatePath("/admin/users")
  redirect("/admin/users")
}

export async function setUserActif(id: string, actif: boolean) {
  const session = await requireAdmin()
  if (session?.user?.id === id && !actif) {
    return
  }
  await prisma.user.update({ where: { id }, data: { actif } })
  revalidatePath("/admin/users")
}

export async function deleteUser(id: string): Promise<{ error: string | null }> {
  const session = await requireAdmin()

  if (session?.user?.id === id) {
    return { error: "Vous ne pouvez pas supprimer votre propre compte." }
  }

  try {
    await prisma.user.delete({ where: { id } })
  } catch {
    return {
      error:
        "Impossible de supprimer : des inscriptions, messages, documents ou autres données sont liés à ce compte. Désactivez-le à la place.",
    }
  }

  revalidatePath("/admin/users")
  return { error: null }
}

export async function resetUserPassword(
  id: string,
  _prevState: UserActionState | undefined
): Promise<UserActionState> {
  await requireAdmin()

  const tempPassword = generateTempPassword()
  const hash = await bcrypt.hash(tempPassword, 10)
  const user = await prisma.user.update({ where: { id }, data: { password: hash } })

  await sendEmail({
    to: user.email,
    subject: "Votre mot de passe IR2F a été réinitialisé",
    react: AccountCreatedEmail({ prenom: user.prenom, email: user.email, tempPassword, isReset: true }),
  })

  return { error: null, tempPassword, email: user.email }
}
