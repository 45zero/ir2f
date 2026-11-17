import { NextResponse } from "next/server"
import { sendRappelsFormation } from "@/lib/emails/rappels"
import { purgeOldAnalytics } from "@/lib/admin/statistiques"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  // Fermé par défaut : sans CRON_SECRET configuré, la route refuse tout le monde.
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [semaine, veille, purge] = await Promise.all([
    sendRappelsFormation(7),
    sendRappelsFormation(1),
    purgeOldAnalytics().catch(() => 0),
  ])

  return NextResponse.json({ rappelsSemaine: semaine.sent, rappelsVeille: veille.sent, statsPurgees: purge })
}
