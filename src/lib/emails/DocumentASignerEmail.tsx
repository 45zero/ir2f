import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function DocumentASignerEmail({
  prenom,
  documentNom,
  formationTitre,
  dashboardPath,
}: {
  prenom: string
  documentNom: string
  formationTitre?: string | null
  dashboardPath: string
}) {
  return (
    <EmailLayout>
      <p>Bonjour {prenom},</p>
      <p>
        Un nouveau document attend votre signature électronique : <strong>{documentNom}</strong>
        {formationTitre ? (
          <>
            {" "}
            (formation <strong>{formationTitre}</strong>)
          </>
        ) : null}
        .
      </p>
      <p>Merci de vous connecter à votre espace pour en prendre connaissance et le signer.</p>
      <EmailButton href={`${SITE_URL}${dashboardPath}`}>Signer le document</EmailButton>
    </EmailLayout>
  )
}
