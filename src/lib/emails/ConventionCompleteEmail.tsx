import { EmailLayout } from "@/lib/emails/Layout"

export function ConventionCompleteEmail({
  formationTitre,
  stagiairePrenom,
  stagiaireNom,
  attached,
}: {
  formationTitre: string
  stagiairePrenom: string
  stagiaireNom: string
  attached: boolean
}) {
  return (
    <EmailLayout>
      <p>
        La convention de stage de <strong>{stagiairePrenom} {stagiaireNom}</strong> ({formationTitre}) a été signée
        par toutes les parties.
      </p>
      <p>{attached ? "Le document final est joint à ce mail." : "Le document final est disponible depuis l'espace admin IR2F."}</p>
    </EmailLayout>
  )
}
