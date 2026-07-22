"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { str, optionalStr, optionalNumber, parseJsonArray } from "@/lib/actions/form-utils"
import { resolveImageUrl } from "@/lib/storage"
import type { ProgrammeStep, ResultatAnnee } from "@/lib/formations-shared"
import type {
  CategorieFormation,
  Filiere,
  TypeFormation,
  StatutFormation,
  GroupeEquivalence,
  VarianteNode,
  ModeInscription,
} from "@/generated/prisma"

type SessionInput = { dateDebut: string; lieu: string; places: string }

function optionalDate(formData: FormData, key: string): Date | null {
  const raw = optionalStr(formData, key)
  return raw ? new Date(raw) : null
}

async function buildFormationData(formData: FormData) {
  const programme = parseJsonArray<ProgrammeStep>(formData, "programme").filter(
    (p) => p.title?.trim() || p.desc?.trim()
  )
  const resultats = parseJsonArray<ResultatAnnee>(formData, "resultats").filter(
    (r) => r.annee?.trim() || r.tauxSelection?.trim() || r.tauxJuryFinal?.trim()
  )

  const groupeEquivalence = optionalStr(formData, "groupeEquivalence") as GroupeEquivalence | null
  const varianteNode = optionalStr(formData, "varianteNode") as VarianteNode | null
  const filiere = optionalStr(formData, "filiere") as Filiere | null
  const image = await resolveImageUrl(formData, "image", "formations")

  return {
    titre: str(formData, "titre"),
    slug: str(formData, "slug"),
    description: optionalStr(formData, "description"),
    categorie: str(formData, "categorie") as CategorieFormation,
    filiere,
    statut: str(formData, "statut") as StatutFormation,
    type: str(formData, "type") as TypeFormation,
    dureeLabel: optionalStr(formData, "dureeLabel"),
    dateDebut: optionalDate(formData, "dateDebut"),
    dateFin: optionalDate(formData, "dateFin"),
    modeLabel: optionalStr(formData, "modeLabel"),
    lieu: optionalStr(formData, "lieu"),
    prix: optionalNumber(formData, "prix"),
    places: optionalNumber(formData, "places"),
    lienVisio: optionalStr(formData, "lienVisio"),
    image,
    cpfEligible: formData.get("cpfEligible") === "on",
    modeInscription: str(formData, "modeInscription") as ModeInscription,
    lienFffStagiaire: optionalStr(formData, "lienFffStagiaire"),
    lienFffClub: optionalStr(formData, "lienFffClub"),
    conventionTemplateId: optionalStr(formData, "conventionTemplateId"),
    responsablePedagogiqueNom: optionalStr(formData, "responsablePedagogiqueNom"),
    responsablePedagogiquePrenom: optionalStr(formData, "responsablePedagogiquePrenom"),
    responsablePedagogiqueEmail: optionalStr(formData, "responsablePedagogiqueEmail"),
    responsablePedagogiqueTelephone: optionalStr(formData, "responsablePedagogiqueTelephone"),
    formateurNom: optionalStr(formData, "formateurNom"),
    formateurRole: optionalStr(formData, "formateurRole"),
    ordre: optionalNumber(formData, "ordre") ?? 0,
    groupeEquivalence,
    varianteNode,
    badgeNode: optionalStr(formData, "badgeNode"),
    shortNode: optionalStr(formData, "shortNode"),
    programme: programme.length > 0 ? programme : undefined,
    tauxReussite: optionalStr(formData, "tauxReussite"),
    tauxSatisfaction: optionalStr(formData, "tauxSatisfaction"),
    resultats: resultats.length > 0 ? resultats : undefined,
  }
}

async function replaceSessions(formationId: string, formData: FormData) {
  const sessions = parseJsonArray<SessionInput>(formData, "sessions").filter((s) => s.dateDebut)

  await prisma.session.deleteMany({ where: { formationId } })
  if (sessions.length === 0) return

  await prisma.session.createMany({
    data: sessions.map((s) => ({
      formationId,
      dateDebut: new Date(s.dateDebut),
      dateFin: new Date(s.dateDebut),
      lieu: s.lieu || null,
      places: s.places ? Number(s.places) : null,
    })),
  })
}

async function replaceFormateurs(formationId: string, formData: FormData) {
  const formateurIds = formData.getAll("formateurIds").map(String).filter(Boolean)

  await prisma.formationFormateur.deleteMany({ where: { formationId } })
  if (formateurIds.length === 0) return

  await prisma.formationFormateur.createMany({
    data: formateurIds.map((userId) => ({ formationId, userId })),
  })
}

function revalidateFormationPaths(slug: string, previousSlug?: string) {
  revalidatePath("/")
  revalidatePath("/formations")
  revalidatePath("/admin/formations")
  revalidatePath(`/formations/${slug}`)
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/formations/${previousSlug}`)
  }
}

export async function createFormation(formData: FormData) {
  await requireAdmin()

  const data = await buildFormationData(formData)
  const formation = await prisma.formation.create({ data })
  await replaceSessions(formation.id, formData)
  await replaceFormateurs(formation.id, formData)

  revalidateFormationPaths(formation.slug)
  redirect("/admin/formations")
}

export async function updateFormation(id: string, formData: FormData) {
  await requireAdmin()

  const existing = await prisma.formation.findUnique({ where: { id }, select: { slug: true } })
  const data = await buildFormationData(formData)
  const formation = await prisma.formation.update({ where: { id }, data })
  await replaceSessions(formation.id, formData)
  await replaceFormateurs(formation.id, formData)

  revalidateFormationPaths(formation.slug, existing?.slug)
  redirect("/admin/formations")
}

export async function setFormationStatut(id: string, statut: StatutFormation) {
  await requireAdmin()
  const formation = await prisma.formation.update({ where: { id }, data: { statut } })
  revalidateFormationPaths(formation.slug)
}

export async function deleteFormation(id: string) {
  await requireAdmin()

  const formation = await prisma.formation.findUnique({ where: { id }, select: { slug: true } })
  if (!formation) return { error: "Formation introuvable." }

  await prisma.session.deleteMany({ where: { formationId: id } })

  try {
    await prisma.formation.delete({ where: { id } })
  } catch {
    return {
      error:
        "Impossible de supprimer : des inscriptions ou documents sont liés à cette formation. Archivez-la à la place.",
    }
  }

  revalidateFormationPaths(formation.slug)
  return { error: null }
}
