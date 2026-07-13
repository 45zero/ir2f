import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function InscriptionConfirmeeEmail({
  prenom,
  formationTitre,
}: {
  prenom: string
  formationTitre?: string
}) {
  return (
    <EmailLayout>
      <p>Bonjour {prenom},</p>
      {formationTitre ? (
        <p>
          Bonne nouvelle : votre inscription à la formation <strong>{formationTitre}</strong> a été validée par
          l&apos;IR2F.
        </p>
      ) : (
        <p>Bonne nouvelle : votre demande a été validée par l&apos;IR2F.</p>
      )}
      <p>Vous pouvez retrouver le détail depuis votre espace personnel.</p>
      <EmailButton href={`${SITE_URL}/dashboard`}>Accéder à mon espace</EmailButton>
    </EmailLayout>
  )
}
