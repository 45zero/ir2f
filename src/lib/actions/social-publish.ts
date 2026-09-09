"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { publishToFacebookPage, publishToInstagram } from "@/lib/social/graph"
import { getSocialAccountById } from "@/lib/social/accounts"
import { articleShareExcerpt } from "@/lib/articles-shared"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ir2f.lgef.fr"

export type PublishSocialState = {
  error: string | null
  results: { compteId: string; label: string; ok: boolean; error?: string }[]
}

type ReseauxPublies = Record<string, { publishedAt: string; postId?: string; error?: string }>

/** Publie une actualité sur les comptes réseaux sociaux sélectionnés (voir src/lib/social/accounts.ts — comptes configurés en variable d'environnement, pas en base). Un échec sur un compte n'empêche pas les autres — chaque résultat est reporté séparément. */
export async function publishArticleToSocial(articleId: string, compteIds: string[]): Promise<PublishSocialState> {
  await requireAdmin()

  if (compteIds.length === 0) return { error: "Sélectionnez au moins un compte.", results: [] }

  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { slug: true, titre: true, image: true, contenu: true, textePartage: true, reseauxPublies: true },
  })
  if (!article) return { error: "Actualité introuvable.", results: [] }

  const comptes = compteIds.map(getSocialAccountById).filter((c): c is NonNullable<typeof c> => c !== null)
  if (comptes.length === 0) return { error: "Aucun compte configuré trouvé pour cette sélection.", results: [] }

  const articleUrl = `${SITE_URL}/actualites/${article.slug}`
  const caption = articleShareExcerpt(article)
  const reseauxPublies = { ...((article.reseauxPublies as ReseauxPublies | null) ?? {}) }
  const results: PublishSocialState["results"] = []

  for (const compte of comptes) {
    try {
      const { postId } =
        compte.plateforme === "FACEBOOK"
          ? await publishToFacebookPage(compte.externalId, compte.accessToken, { message: caption, link: articleUrl })
          : await publishToInstagram(compte.externalId, compte.accessToken, {
              imageUrl: requireArticleImage(article.image),
              caption: `${caption}\n\n${articleUrl}`,
            })
      reseauxPublies[compte.id] = { publishedAt: new Date().toISOString(), postId }
      results.push({ compteId: compte.id, label: compte.label, ok: true })
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur inattendue."
      reseauxPublies[compte.id] = { publishedAt: new Date().toISOString(), error: message }
      results.push({ compteId: compte.id, label: compte.label, ok: false, error: message })
    }
  }

  await prisma.article.update({ where: { id: articleId }, data: { reseauxPublies } })

  revalidatePath("/admin/articles")
  return { error: null, results }
}

function requireArticleImage(image: string | null): string {
  if (!image) throw new Error("Cette actualité n'a pas d'image — Instagram en nécessite une.")
  return image
}
