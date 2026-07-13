import { EmailLayout, EmailButton, EmailCredentialBox, SITE_URL } from "@/lib/emails/Layout"

export function AccountCreatedEmail({
  prenom,
  email,
  tempPassword,
  isReset = false,
}: {
  prenom: string
  email: string
  tempPassword: string
  isReset?: boolean
}) {
  return (
    <EmailLayout>
      <p>Bonjour {prenom},</p>
      <p>
        {isReset
          ? "Votre mot de passe IR2F a été réinitialisé. Voici vos nouveaux identifiants de connexion :"
          : "Votre compte IR2F a été créé. Voici vos identifiants de connexion :"}
      </p>
      <EmailCredentialBox email={email} password={tempPassword} />
      <p>Nous vous recommandons de changer ce mot de passe dès votre première connexion.</p>
      <EmailButton href={`${SITE_URL}/login`}>Se connecter</EmailButton>
    </EmailLayout>
  )
}
