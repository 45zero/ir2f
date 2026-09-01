import { EmailLayout } from "@/lib/emails/Layout"

export function ConventionsZipEmail({ formationTitre, count }: { formationTitre: string; count: number }) {
  return (
    <EmailLayout>
      <p>Bonjour,</p>
      <p>
        Vous trouverez ci-joint {count} convention{count > 1 ? "s" : ""} de stage de la formation{" "}
        <strong>{formationTitre}</strong>, au format PDF (archive .zip).
      </p>
    </EmailLayout>
  )
}
