"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr } from "@/lib/actions/form-utils"
import { resolveImageUrl } from "@/lib/storage"
import { PAGE_HERO_ROUTE } from "@/lib/page-hero-shared"
import type { PageCle } from "@/generated/prisma"

export type PageHeroActionState = { error: string | null }

export async function savePageHero(
  page: PageCle,
  _prev: PageHeroActionState | undefined,
  formData: FormData
): Promise<PageHeroActionState> {
  await requireAdmin()

  const titre = str(formData, "titre")
  if (!titre) return { error: "Le titre est obligatoire." }

  const sousTitre = optionalStr(formData, "sousTitre")
  const image = await resolveImageUrl(formData, "image", `page-hero/${page.toLowerCase()}`)

  await prisma.pageHero.upsert({
    where: { page },
    create: { page, titre, sousTitre, image },
    update: { titre, sousTitre, image },
  })

  revalidatePath(PAGE_HERO_ROUTE[page])
  revalidatePath("/admin/pages-hero")
  return { error: null }
}
