import { notFound } from "next/navigation"
import Link from "next/link"
import { getFormationForEdit } from "@/lib/admin/formations"
import { getFormateurUsers } from "@/lib/admin/users"
import { getConventionTemplatesForSelect } from "@/lib/admin/conventions"
import { updateFormation } from "@/lib/actions/formations"
import { FormationForm, type FormationFormInitial } from "@/components/admin/FormationForm"
import { colors, fontHeading } from "@/lib/theme"

type ProgrammeStep = { n: string; title: string; desc: string }

export default async function EditFormationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [formation, formateurUsers, conventionTemplates] = await Promise.all([
    getFormationForEdit(id),
    getFormateurUsers(),
    getConventionTemplatesForSelect(),
  ])
  if (!formation) notFound()

  const initial: FormationFormInitial = {
    titre: formation.titre,
    slug: formation.slug,
    description: formation.description ?? "",
    categorie: formation.categorie,
    filiere: formation.filiere ?? "",
    statut: formation.statut,
    type: formation.type,
    dureeLabel: formation.dureeLabel ?? "",
    dateDebut: formation.dateDebut ? formation.dateDebut.toISOString().slice(0, 10) : "",
    dateFin: formation.dateFin ? formation.dateFin.toISOString().slice(0, 10) : "",
    modeLabel: formation.modeLabel ?? "",
    lieu: formation.lieu ?? "",
    prix: formation.prix?.toString() ?? "",
    places: formation.places?.toString() ?? "",
    lienVisio: formation.lienVisio ?? "",
    image: formation.image ?? "",
    cpfEligible: formation.cpfEligible,
    modeInscription: formation.modeInscription,
    lienFffStagiaire: formation.lienFffStagiaire ?? "",
    lienFffClub: formation.lienFffClub ?? "",
    formateurNom: formation.formateurNom ?? "",
    formateurRole: formation.formateurRole ?? "",
    ordre: formation.ordre.toString(),
    groupeEquivalence: formation.groupeEquivalence ?? "",
    varianteNode: formation.varianteNode ?? "",
    badgeNode: formation.badgeNode ?? "",
    shortNode: formation.shortNode ?? "",
    programme: (formation.programme as ProgrammeStep[] | null) ?? [],
    sessions: formation.sessions.map((s) => ({
      dateDebut: s.dateDebut.toISOString().slice(0, 10),
      lieu: s.lieu ?? "",
      places: s.places?.toString() ?? "",
    })),
    formateurIds: formation.formateurs.map((f) => f.userId),
    conventionTemplateId: formation.conventionTemplateId ?? "",
    responsablePedagogiqueNom: formation.responsablePedagogiqueNom ?? "",
    responsablePedagogiquePrenom: formation.responsablePedagogiquePrenom ?? "",
    responsablePedagogiqueEmail: formation.responsablePedagogiqueEmail ?? "",
    responsablePedagogiqueTelephone: formation.responsablePedagogiqueTelephone ?? "",
  }

  const boundUpdate = updateFormation.bind(null, id)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Modifier la formation
        </h1>
        <Link
          href={`/admin/formations/${id}/conventions`}
          style={{ color: colors.navy, fontSize: 13, fontWeight: 700, textDecoration: "underline" }}
        >
          Conventions de stage →
        </Link>
      </div>
      <FormationForm
        action={boundUpdate}
        initial={initial}
        submitLabel="Enregistrer les modifications"
        formateurUsers={formateurUsers}
        conventionTemplates={conventionTemplates}
      />
    </div>
  )
}
