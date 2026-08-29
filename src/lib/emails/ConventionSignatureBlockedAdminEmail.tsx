import { EmailLayout } from "@/lib/emails/Layout"

export function ConventionSignatureBlockedAdminEmail({
  formationTitre,
  stagiairePrenom,
  stagiaireNom,
  roleLabel,
  raison,
}: {
  formationTitre: string
  stagiairePrenom: string
  stagiaireNom: string
  roleLabel: string
  raison: string
}) {
  const stagiaireLabel = stagiairePrenom || stagiaireNom ? ` de ${stagiairePrenom} ${stagiaireNom}` : ""
  return (
    <EmailLayout>
      <p>
        <strong>Circuit de signature bloqué</strong> pour la convention de stage{stagiaireLabel} ({formationTitre}).
      </p>
      <p>
        Étape concernée : <strong>{roleLabel}</strong>.<br />
        Raison : {raison}.
      </p>
      <p>
        Complétez l&apos;information manquante puis relancez l&apos;envoi depuis l&apos;admin —
        aucun email n&apos;a été envoyé à ce signataire tant que ce n&apos;est pas fait.
      </p>
    </EmailLayout>
  )
}
