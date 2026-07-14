import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function CovoiturageAnnuleEmail({
  prenom,
  depart,
  destination,
  dateLabel,
}: {
  prenom: string
  depart: string
  destination: string
  dateLabel: string
}) {
  return (
    <EmailLayout>
      <p>Bonjour {prenom},</p>
      <p>
        Le conducteur a annulé le trajet <strong>{depart} → {destination}</strong> du {dateLabel} auquel vous étiez
        inscrit.
      </p>
      <p>Pensez à vérifier les autres trajets disponibles pour votre session de formation.</p>
      <EmailButton href={`${SITE_URL}/dashboard/covoiturage`}>Voir les trajets disponibles</EmailButton>
    </EmailLayout>
  )
}
