import { getPageHero } from "@/lib/page-hero"
import { ContactTeaser } from "@/components/site/ContactTeaser"
import { PageHero } from "@/components/site/PageHero"

export default async function ContactPage() {
  const hero = await getPageHero("CONTACT")

  return (
    <main>
      <PageHero {...hero} />

      <ContactTeaser startOpen />
    </main>
  )
}
