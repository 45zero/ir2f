import { getFinancementPageData } from "@/lib/financement"
import { getPageHero } from "@/lib/page-hero"
import { PageHero } from "@/components/site/PageHero"
import { FormationDispositifsTabs } from "@/components/site/FormationDispositifsTabs"
import { colors } from "@/lib/theme"

export default async function FinancementPage() {
  const [{ dispositifs }, hero] = await Promise.all([getFinancementPageData(), getPageHero("FINANCEMENT")])

  return (
    <main>
      <PageHero {...hero} />

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 20px 72px" }}>
        {dispositifs.length > 0 ? (
          <FormationDispositifsTabs dispositifs={dispositifs} />
        ) : (
          <p style={{ color: colors.textLight, fontSize: 13, margin: 0 }}>Contenu à venir.</p>
        )}
      </section>
    </main>
  )
}
