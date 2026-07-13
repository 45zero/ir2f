import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getInbox, getSent, getRecipientOptions } from "@/lib/messages"
import { getFormateurAlerts } from "@/lib/formateur"
import { MessagesManager, type InboxItem, type SentItem } from "@/components/dashboard/MessagesManager"
import { FormateurAlertsList } from "@/components/dashboard/FormateurAlertsList"
import { colors, fontHeading } from "@/lib/theme"

export default async function DashboardMessagesPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  if (session.user.role === "FORMATEUR") {
    const alerts = await getFormateurAlerts(session.user.id)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Messagerie
        </h1>
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 20px rgba(20,33,61,0.06)" }}>
          <FormateurAlertsList alerts={alerts} />
        </div>
      </div>
    )
  }

  const [inboxRaw, sentRaw, recipients] = await Promise.all([
    getInbox(session.user.id),
    getSent(session.user.id),
    getRecipientOptions(session.user.id),
  ])

  const inbox: InboxItem[] = inboxRaw.map((md) => ({
    messageId: md.messageId,
    sujet: md.message.sujet,
    contenu: md.message.contenu,
    createdAt: md.message.createdAt.toISOString(),
    lu: md.lu,
    expediteurNom: `${md.message.expediteur.prenom} ${md.message.expediteur.nom}`,
  }))

  const sent: SentItem[] = sentRaw.map((m) => ({
    id: m.id,
    sujet: m.sujet,
    contenu: m.contenu,
    createdAt: m.createdAt.toISOString(),
    destinataires: m.destinataires.map((d) => ({ nom: `${d.user.prenom} ${d.user.nom}`, lu: d.lu })),
  }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Messagerie
      </h1>
      <MessagesManager inbox={inbox} sent={sent} recipients={recipients} />
    </div>
  )
}
