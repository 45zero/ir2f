"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber, parseJsonArray } from "@/lib/actions/form-utils"
import { resolveImageUrl } from "@/lib/storage"
import { Prisma } from "@/generated/prisma"
import type { CategorieFormation } from "@/generated/prisma"
import type { ArticleSection } from "@/lib/articles-shared"

export type ArticleActionState = { error: string | null }

function revalidateArticles(slug?: string, previousSlug?: string) {
  revalidatePath("/admin/articles")
  revalidatePath("/")
  revalidatePath("/actualites")
  if (slug) revalidatePath(`/actualites/${slug}`)
  if (previousSlug && previousSlug !== slug) revalidatePath(`/actualites/${previousSlug}`)
}

async function resolveSectionMedia(formData: FormData, section: ArticleSection, i: number): Promise<ArticleSection> {
  const imageCount = optionalNumber(formData, `sectionImageCount_${i}`) ?? 0
  const images: string[] = []
  for (let j = 0; j < imageCount; j++) {
    const url = await resolveImageUrl(formData, `sectionImage_${i}_${j}`, `articles-sections/${i}-${j}`)
    if (url) images.push(url)
  }
  const videoFichierUrl = optionalStr(formData, `sectionVideo_${i}`)

  const lienType = optionalStr(formData, `sectionLienType_${i}`) as "INTERNE" | "EXTERNE" | null
  const lienUrl = optionalStr(formData, `sectionLienUrl_${i}`)
  const lien = lienType && lienUrl ? { type: lienType, url: lienUrl, label: optionalStr(formData, `sectionLienLabel_${i}`) ?? "" } : null

  return { ...section, images, videoUrl: section.videoUrl || null, videoFichierUrl, lien }
}

async function buildArticleData(formData: FormData) {
  const sectionsRaw = parseJsonArray<ArticleSection>(formData, "sections")
  const sectionsResolved = await Promise.all(sectionsRaw.map((s, i) => resolveSectionMedia(formData, s, i)))
  const sections = sectionsResolved.filter((s) => s.title?.trim() || s.desc?.trim())

  return {
    titre: str(formData, "titre"),
    slug: str(formData, "slug"),
    contenu: str(formData, "contenu"),
    textePartage: optionalStr(formData, "textePartage"),
    image: await resolveImageUrl(formData, "image", "articles"),
    imageCouvertureVisible: formData.get("imageCouvertureVisible") === "on",
    categorie: optionalStr(formData, "categorie") as CategorieFormation | null,
    publie: formData.get("publie") === "on",
    diffuserReseaux: formData.get("diffuserReseaux") === "on",
    sections: sections.length > 0 ? sections : Prisma.JsonNull,
  }
}

export async function createArticle(
  _prev: ArticleActionState | undefined,
  formData: FormData
): Promise<ArticleActionState> {
  const session = await requireAdmin()

  const data = await buildArticleData(formData)
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

  const data = await buildArticleData(formData)
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
