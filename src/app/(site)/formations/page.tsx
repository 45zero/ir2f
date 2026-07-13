import { getCatalogueFormations, getCategorieInfos } from "@/lib/formations"
import { FormationsCatalogue } from "@/components/site/FormationsCatalogue"

export default async function FormationsPage() {
  const [formations, categoryInfo] = await Promise.all([getCatalogueFormations(), getCategorieInfos()])

  return (
    <FormationsCatalogue formations={formations} categoryInfo={categoryInfo} initialCategory="EDUCATEUR" />
  )
}
