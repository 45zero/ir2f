"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str } from "@/lib/actions/form-utils"

export type ArticleActionState = { error: string | null }

function revalidateArticles() {
  revalidatePath("/admin/articles")
  revalidatePath("/articles")
}

export async function createArticle(
  _prev: ArticleActionState | undefined,
  formData: FormData
): Promise<ArticleActionState> {
  const session = await requireAdmin()

  const titre = str(formData, "titre")
  const contenu = str(formData, "contenu")
  const publie = formData.get("publie") === "on"

  if (!titre || !contenu) {
    return { error: "Le titre et le contenu sont obligatoires." }
  }

  await prisma.article.create({
    data: { titre, contenu, publie, auteurId: session!.user.id },
  })

  revalidateArticles()
  redirect("/admin/articles")
}

export async function updateArticle(id: string, formData: FormData): Promise<ArticleActionState> {
  await requireAdmin()

  const titre = str(formData, "titre")
  const contenu = str(formData, "contenu")
  const publie = formData.get("publie") === "on"

  if (!titre || !contenu) {
    return { error: "Le titre et le contenu sont obligatoires." }
  }

  await prisma.article.update({ where: { id }, data: { titre, contenu, publie } })

  revalidateArticles()
  redirect("/admin/articles")
}

export async function setArticlePublie(id: string, publie: boolean) {
  await requireAdmin()
  await prisma.article.update({ where: { id }, data: { publie } })
  revalidateArticles()
}

export async function deleteArticle(id: string): Promise<{ error: string | null }> {
  await requireAdmin()
  try {
    await prisma.article.delete({ where: { id } })
  } catch {
    return { error: "Impossible de supprimer cet article." }
  }
  revalidateArticles()
  return { error: null }
}
