import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth/guards"
import { buildSessionConventionsZip } from "@/lib/conventions/zip"

export async function GET(_request: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  await requireAdmin()
  const { sessionId } = await params

  const zip = await buildSessionConventionsZip(sessionId)
  if (!zip) return new NextResponse("Aucune convention générée pour cette session.", { status: 404 })

  return new NextResponse(new Uint8Array(zip.buffer), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${zip.filename}"`,
    },
  })
}
