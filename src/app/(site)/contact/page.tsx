import { getPageHero } from "@/lib/page-hero"
import { ContactTeaser } from "@/components/site/ContactTeaser"
import { OrganigrammeAttachment } from "@/components/site/OrganigrammeAttachment"
import { PageHero } from "@/components/site/PageHero"

export default async function ContactPage() {
  const hero = await getPageHero("CONTACT")

  return (
    <main>
      <PageHero {...hero} />

      <ContactTeaser startOpen />
      <OrganigrammeAttachment />
    </main>
  )
}
