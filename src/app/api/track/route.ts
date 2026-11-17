import { createHash } from "node:crypto"
import { NextResponse, after } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const runtime = "nodejs"

const BOT_RE = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|pingdom|uptime/i

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null
  const v = value.trim().replace(/\s+/g, " ")
  return v ? v.slice(0, max) : null
}

// Les liens de signature de convention contiennent un jeton secret : on ne le stocke jamais.
function normalizePath(p: string): string {
  return p
    .split(/[?#]/)[0]
    .replace(/^\/convention\/formateur\/[^/]+/, "/convention/formateur/[lien]")
    .replace(/^\/convention\/(?!formateur\/)[^/]+/, "/convention/[lien]")
}

function deviceFrom(ua: string): string {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "tablette"
  if (/mobi|iphone|android/i.test(ua)) return "mobile"
  return "ordinateur"
}

// Référent externe uniquement (domaine), les navigations internes ne sont pas des sources.
function referrerHost(ref: string | null, selfHost: string | null): string | null {
  if (!ref) return null
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "")
    if (selfHost && host === selfHost.replace(/^www\./, "").split(":")[0]) return null
    return host.slice(0, 120)
  } catch {
    return null
  }
}

function cleanHref(href: string | null): string | null {
  if (!href) return null
  if (href.startsWith("/")) return normalizePath(href)
  if (/^(mailto|tel):/i.test(href)) return href.split("?")[0]
  try {
    const u = new URL(href)
    return `${u.hostname.replace(/^www\./, "")}${u.pathname === "/" ? "" : u.pathname}`.slice(0, 300)
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  const ua = request.headers.get("user-agent") ?? ""
  if (!ua || BOT_RE.test(ua)) return new NextResponse(null, { status: 204 })

  let body: Record<string, unknown>
  try {
    body = JSON.parse(await request.text())
  } catch {
    return new NextResponse(null, { status: 204 })
  }

  const type = body.type === "CLICK" ? "CLICK" : body.type === "VIEW" ? "VIEW" : null
  const rawPath = clean(body.path, 300)
  const path = rawPath ? normalizePath(rawPath) : null
  if (!type || !path || !path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/dashboard")) {
    return new NextResponse(null, { status: 204 })
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "0.0.0.0"
  const jour = new Date().toISOString().slice(0, 10)
  const visiteurId = createHash("sha256")
    .update(`${ip}|${ua}|${jour}|${process.env.AUTH_SECRET ?? "ir2f"}`)
    .digest("hex")
    .slice(0, 32)

  const selfHost = request.headers.get("host")

  after(async () => {
    // Les visites des administrateurs ne sont pas comptées (elles fausseraient les chiffres).
    const session = await auth()
    if (session?.user?.role === "ADMIN") return
    await prisma.analyticsEvent.create({
      data: {
        type,
        path,
        label: type === "CLICK" ? clean(body.label, 120) : null,
        href: type === "CLICK" ? cleanHref(clean(body.href, 300)) : null,
        referrer: type === "VIEW" ? referrerHost(clean(body.referrer, 500), selfHost) : null,
        device: deviceFrom(ua),
        visiteurId,
      },
    })
  })

  return new NextResponse(null, { status: 204 })
}
