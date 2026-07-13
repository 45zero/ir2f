import { EmailLayout, SITE_URL } from "@/lib/emails/Layout"

export function DemandeRefuseeEmail({ prenom }: { prenom: string }) {
  return (
    <EmailLayout>
      <p>Bonjour {prenom},</p>
      <p>
        Nous vous remercions pour votre demande auprès de l&apos;IR2F. Après étude, nous ne sommes malheureusement
        pas en mesure d&apos;y donner une suite favorable pour le moment.
      </p>
      <p>
        N&apos;hésitez pas à consulter notre catalogue de formations sur{" "}
        <a href={`${SITE_URL}/formations`}>{SITE_URL}/formations</a> ou à nous recontacter pour toute question.
      </p>
    </EmailLayout>
  )
}
