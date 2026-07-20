import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function NouvelleDemandeContactEmail({
  thematiqueLabel,
  nom,
  prenom,
  email,
  telephone,
  message,
}: {
  thematiqueLabel: string
  nom: string
  prenom: string
  email: string
  telephone?: string | null
  message?: string | null
}) {
  return (
    <EmailLayout>
      <p>Nouvelle demande de contact reçue :</p>
      <p>
        <strong>
          {prenom} {nom}
        </strong>{" "}
        — {email}
        {telephone && <> — {telephone}</>}
      </p>
      <p>Thématique : {thematiqueLabel}</p>
      {message && (
        <p style={{ background: "#f5f7fb", borderRadius: 6, padding: "12px 14px" }}>{message}</p>
      )}
      <EmailButton href={`${SITE_URL}/admin/demandes-contact`}>Voir la demande</EmailButton>
    </EmailLayout>
  )
}
