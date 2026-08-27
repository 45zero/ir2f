import { PageHero } from "@/components/site/PageHero"
import { DocumentationSections } from "@/components/site/DocumentationSections"

export default function DocumentationPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ressources IR2F"
        titre="Documentation"
        sousTitre="Certification Qualiopi, tarifs, conditions générales, dispositions d'accessibilité et composition des jurys : retrouvez ici tous les documents officiels de l'IR2F."
      />
      <DocumentationSections />
    </main>
  )
}
