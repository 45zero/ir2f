import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function NouvelleDemandeAdminEmail({
  nom,
  prenom,
  email,
  formationTitre,
  message,
}: {
  nom: string
  prenom: string
  email: string
  formationTitre?: string | null
  message?: string | null
}) {
  return (
    <EmailLayout>
      <p>Nouvelle demande d&apos;inscription reçue :</p>
      <p>
        <strong>
          {prenom} {nom}
        </strong>{" "}
        — {email}
      </p>
      {formationTitre && <p>Formation concernée : {formationTitre}</p>}
      {message && (
        <p style={{ background: "#f5f7fb", borderRadius: 6, padding: "12px 14px" }}>{message}</p>
      )}
      <EmailButton href={`${SITE_URL}/admin/inscriptions`}>Voir la demande</EmailButton>
    </EmailLayout>
  )
}
