import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function ConventionFormationSignatureRequestEmail({
  nom,
  formationTitre,
  token,
}: {
  nom: string
  formationTitre: string
  token: string
}) {
  return (
    <EmailLayout>
      <p>Bonjour {nom},</p>
      <p>
        En tant que responsable pédagogique de la formation <strong>{formationTitre}</strong>, votre
        signature est demandée pour valider les conventions de stage de cette formation.
      </p>
      <p>
        Cette signature n&apos;est à faire <strong>qu&apos;une seule fois</strong> : elle sera ensuite
        appliquée automatiquement à la convention de chaque stagiaire de cette formation.
      </p>
      <EmailButton href={`${SITE_URL}/convention/formateur/${token}`}>Signer</EmailButton>
    </EmailLayout>
  )
}
