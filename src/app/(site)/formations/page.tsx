import { getCatalogueFormations, getFormationTuiles, getFormationOnglets } from "@/lib/formations"
import { getPageHero } from "@/lib/page-hero"
import { FormationsCatalogue } from "@/components/site/FormationsCatalogue"
import { PageHero } from "@/components/site/PageHero"

export default async function FormationsPage() {
  const [formations, tuiles, onglets, hero] = await Promise.all([
    getCatalogueFormations(),
    getFormationTuiles(),
    getFormationOnglets(),
    getPageHero("FORMATIONS"),
  ])

  return (
    <>
      <PageHero {...hero} />
      <FormationsCatalogue formations={formations} tuiles={tuiles} onglets={onglets} initialCategory="EDUCATEUR" />
    </>
  )
}
