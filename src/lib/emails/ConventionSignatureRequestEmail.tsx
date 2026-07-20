import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function ConventionSignatureRequestEmail({
  nom,
  formationTitre,
  stagiairePrenom,
  stagiaireNom,
  token,
}: {
  nom: string
  formationTitre: string
  stagiairePrenom: string
  stagiaireNom: string
  token: string
}) {
  return (
    <EmailLayout>
      <p>Bonjour {nom},</p>
      <p>
        La convention de stage de <strong>{stagiairePrenom} {stagiaireNom}</strong> pour la formation{" "}
        <strong>{formationTitre}</strong> est prête et n&apos;attend plus que votre signature.
      </p>
      <p>Le document est déjà entièrement pré-rempli — il ne vous reste qu&apos;à le consulter et signer.</p>
      <EmailButton href={`${SITE_URL}/convention/${token}`}>Consulter et signer</EmailButton>
    </EmailLayout>
  )
}
