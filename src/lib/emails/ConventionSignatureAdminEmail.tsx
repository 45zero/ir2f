import { EmailLayout } from "@/lib/emails/Layout"

export function ConventionSignatureAdminEmail({
  formationTitre,
  stagiairePrenom,
  stagiaireNom,
  roleLabel,
  refused,
  motif,
}: {
  formationTitre: string
  stagiairePrenom: string
  stagiaireNom: string
  roleLabel: string
  refused: boolean
  motif?: string | null
}) {
  return (
    <EmailLayout>
      {refused ? (
        <>
          <p>
            <strong>{roleLabel}</strong> a refusé de signer la convention de stage de{" "}
            <strong>{stagiairePrenom} {stagiaireNom}</strong> ({formationTitre}).
          </p>
          {motif && <p>Motif indiqué : {motif}</p>}
        </>
      ) : (
        <p>
          <strong>{roleLabel}</strong> vient de signer la convention de stage de{" "}
          <strong>{stagiairePrenom} {stagiaireNom}</strong> ({formationTitre}).
        </p>
      )}
    </EmailLayout>
  )
}
