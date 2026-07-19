"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr } from "@/lib/actions/form-utils"
import type { CategorieFormation } from "@/generated/prisma"

export type ArticleActionState = { error: string | null }

function revalidateArticles(slug?: string, previousSlug?: string) {
  revalidatePath("/admin/articles")
  revalidatePath("/")
  revalidatePath("/actualites")
  if (slug) revalidatePath(`/actualites/${slug}`)
  if (previousSlug && previousSlug !== slug) revalidatePath(`/actualites/${previousSlug}`)
}

function buildArticleData(formData: FormData) {
  return {
    titre: str(formData, "titre"),
    slug: str(formData, "slug"),
    contenu: str(formData, "contenu"),
    image: optionalStr(formData, "image"),
    categorie: optionalStr(formData, "categorie") as CategorieFormation | null,
    publie: formData.get("publie") === "on",
  }
}

export async function createArticle(
  _prev: ArticleActionState | undefined,
  formData: FormData
): Promise<ArticleActionState> {
  const session = await requireAdmin()

  const data = buildArticleData(formData)
  if (!data.titre || !data.slug || !data.contenu) {
    return { error: "Le titre, le slug et le contenu sont obligatoires." }
  }

  const article = await prisma.article.create({
    data: { ...data, auteurId: session!.user.id },
  })

  revalidateArticles(article.slug)
  redirect("/admin/articles")
}

export async function updateArticle(id: string, formData: FormData): Promise<ArticleActionState> {
  await requireAdmin()

  const existing = await prisma.article.findUnique({ where: { id }, select: { slug: true } })

  const data = buildArticleData(formData)
  if (!data.titre || !data.slug || !data.contenu) {
    return { error: "Le titre, le slug et le contenu sont obligatoires." }
  }

  const article = await prisma.article.update({ where: { id }, data })

  revalidateArticles(article.slug, existing?.slug)
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
