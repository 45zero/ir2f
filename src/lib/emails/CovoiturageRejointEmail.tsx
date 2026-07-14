import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function CovoiturageRejointEmail({
  prenom,
  passagerNom,
  depart,
  destination,
  dateLabel,
}: {
  prenom: string
  passagerNom: string
  depart: string
  destination: string
  dateLabel: string
}) {
  return (
    <EmailLayout>
      <p>Bonjour {prenom},</p>
      <p>
        <strong>{passagerNom}</strong> a rejoint votre trajet <strong>{depart} → {destination}</strong> du{" "}
        {dateLabel}.
      </p>
      <p>Retrouvez le détail de votre trajet et vos passagers depuis votre espace covoiturage.</p>
      <EmailButton href={`${SITE_URL}/dashboard/covoiturage`}>Voir mon trajet</EmailButton>
    </EmailLayout>
  )
}
