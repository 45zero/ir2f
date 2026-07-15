import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function DocumentEntierementSigneEmail({
  documentNom,
  formationTitre,
}: {
  documentNom: string
  formationTitre?: string | null
}) {
  return (
    <EmailLayout>
      <p>Bonjour,</p>
      <p>
        Toutes les signatures requises ont été recueillies pour le document <strong>{documentNom}</strong>
        {formationTitre ? (
          <>
            {" "}
            (formation <strong>{formationTitre}</strong>)
          </>
        ) : null}
        .
      </p>
      <EmailButton href={`${SITE_URL}/admin/formations`}>Voir les formations</EmailButton>
    </EmailLayout>
  )
}
