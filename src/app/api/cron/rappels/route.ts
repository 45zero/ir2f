import { NextResponse } from "next/server"
import { sendRappelsFormation } from "@/lib/emails/rappels"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [semaine, veille] = await Promise.all([sendRappelsFormation(7), sendRappelsFormation(1)])

  return NextResponse.json({ rappelsSemaine: semaine.sent, rappelsVeille: veille.sent })
}
