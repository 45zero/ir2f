import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { ConventionNotificationRecipients, type NotificationRecipientRow } from "@/components/admin/ConventionNotificationRecipients"
import { colors, fontHeading } from "@/lib/theme"

export default async function ConventionNotificationsPage() {
  await requireAdmin()

  const destinataires = await prisma.conventionNotificationDestinataire.findMany({ orderBy: { createdAt: "asc" } })
  const toRows = (categorie: "ADMIN" | "COMPTABILITE"): NotificationRecipientRow[] =>
    destinataires.filter((d) => d.categorie === categorie).map((d) => ({ id: d.id, email: d.email, nom: d.nom }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Notifications conventions de stage
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Dès qu&apos;une convention est intégralement signée (tous les signataires), un email est envoyé
          automatiquement aux adresses ci-dessous — seule la comptabilité reçoit le PDF final en pièce jointe.
        </p>
      </div>

      <ConventionNotificationRecipients
        categorie="ADMIN"
        titre="Admin"
        description="Notification simple (sans pièce jointe) à chaque convention terminée."
        recipients={toRows("ADMIN")}
      />

      <ConventionNotificationRecipients
        categorie="COMPTABILITE"
        titre="Comptabilité"
        description="Reçoit en plus le PDF final de la convention en pièce jointe."
        recipients={toRows("COMPTABILITE")}
      />
    </div>
  )
}
