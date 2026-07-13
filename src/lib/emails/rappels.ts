import "server-only"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/emails/send"
import { RappelFormationEmail } from "@/lib/emails/RappelFormationEmail"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" })

function startOfDayInNDays(n: number): { start: Date; end: Date } {
  const start = new Date()
  start.setDate(start.getDate() + n)
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(end.getDate() + 1)
  return { start, end }
}

// N'est déclenché par rien pour l'instant — à appeler depuis un cron (ex. Vercel Cron)
// une fois par jour, avec joursAvant successivement 7 puis 1.
export async function sendRappelsFormation(joursAvant: 7 | 1): Promise<{ sent: number }> {
  const { start, end } = startOfDayInNDays(joursAvant)

  const sessions = await prisma.session.findMany({
    where: { dateDebut: { gte: start, lt: end } },
    include: {
      formation: {
        include: {
          inscriptions: {
            where: { statut: "VALIDEE" },
            include: { user: { select: { prenom: true, email: true, actif: true } } },
          },
        },
      },
    },
  })

  let sent = 0
  for (const session of sessions) {
    for (const inscription of session.formation.inscriptions) {
      if (!inscription.user.actif) continue
      const result = await sendEmail({
        to: inscription.user.email,
        subject:
          joursAvant === 7
            ? `Rappel : ${session.formation.titre} débute dans une semaine`
            : `Rappel : ${session.formation.titre} débute demain`,
        react: RappelFormationEmail({
          prenom: inscription.user.prenom,
          formationTitre: session.formation.titre,
          dateLabel: `${dateFormatter.format(session.dateDebut)}${session.lieu ? ` — ${session.lieu}` : ""}`,
          joursAvant,
        }),
      })
      if (result.sent) sent++
    }
  }

  return { sent }
}
