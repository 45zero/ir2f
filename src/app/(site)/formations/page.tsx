import { getCatalogueFormations, getEquivalenceFormations, getFormationTuiles, getFormationOnglets } from "@/lib/formations"
import { getPageHero } from "@/lib/page-hero"
import { FormationsCatalogue } from "@/components/site/FormationsCatalogue"
import { PageHero } from "@/components/site/PageHero"

export default async function FormationsPage() {
  const [formations, equivalenceFormations, tuiles, onglets, hero] = await Promise.all([
    getCatalogueFormations(),
    getEquivalenceFormations(),
    getFormationTuiles(),
    getFormationOnglets(),
    getPageHero("FORMATIONS"),
  ])

  return (
    <>
      <PageHero {...hero} />
      <FormationsCatalogue
        formations={formations}
        equivalenceFormations={equivalenceFormations}
        tuiles={tuiles}
        onglets={onglets}
        initialCategory="EDUCATEUR"
      />
    </>
  )
}
