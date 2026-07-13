import { EmailLayout, SITE_URL } from "@/lib/emails/Layout"

export function RappelFormationEmail({
  prenom,
  formationTitre,
  dateLabel,
  joursAvant,
}: {
  prenom: string
  formationTitre: string
  dateLabel: string
  joursAvant: 7 | 1
}) {
  return (
    <EmailLayout>
      <p>Bonjour {prenom},</p>
      <p>
        {joursAvant === 7
          ? "Petit rappel : votre formation débute dans une semaine."
          : "Dernier rappel : votre formation débute demain."}
      </p>
      <p>
        <strong>{formationTitre}</strong>
        <br />
        {dateLabel}
      </p>
      <p>
        Retrouvez tous les détails sur <a href={`${SITE_URL}/dashboard`}>votre espace personnel</a>.
      </p>
    </EmailLayout>
  )
}
