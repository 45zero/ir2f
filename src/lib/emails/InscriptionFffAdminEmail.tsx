import { EmailLayout, EmailButton, SITE_URL } from "@/lib/emails/Layout"

export function InscriptionFffAdminEmail({
  nom,
  prenom,
  email,
  telephone,
  formationTitre,
  origine,
}: {
  nom: string
  prenom: string
  email: string
  telephone?: string | null
  formationTitre?: string | null
  origine: "STAGIAIRE" | "CLUB"
}) {
  return (
    <EmailLayout>
      <p>
        Nouvelle inscription via le portail FFF ({origine === "CLUB" ? "réalisée par le club" : "réalisée par le stagiaire"}
        ) — la personne a été ajoutée à la liste des stagiaires IR2F, sa convention reste à préparer.
      </p>
      <p>
        <strong>
          {prenom} {nom}
        </strong>{" "}
        — {email}
        {telephone ? ` — ${telephone}` : ""}
      </p>
      {formationTitre && <p>Formation concernée : {formationTitre}</p>}
      <EmailButton href={`${SITE_URL}/admin/inscriptions`}>Voir les inscriptions</EmailButton>
    </EmailLayout>
  )
}
