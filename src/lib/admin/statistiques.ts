import "server-only"
import { Prisma } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"
import { STAT_SECTIONS, type StatSectionKey } from "@/lib/statistiques-shared"

const T = Prisma.raw(`"ir2f"."AnalyticsEvent"`)

export type StatsTotals = { vues: number; visites: number; clics: number }
export type StatsBucket = { date: string; vues: number; visites: number }
export type StatsPageRow = { path: string; titre: string | null; vues: number; visites: number; clics: number }
export type StatsClickRow = { label: string; href: string | null; path: string; clics: number }
export type StatsCountRow = { nom: string; total: number }

export type StatsData = {
  totals: StatsTotals
  previous: StatsTotals
  buckets: StatsBucket[]
  bucketUnit: "day" | "month"
  pages: StatsPageRow[]
  clicks: StatsClickRow[]
  referrers: StatsCountRow[]
  devices: StatsCountRow[]
}

function pathFilter(section: StatSectionKey): Prisma.Sql {
  if (section === "ensemble") return Prisma.sql`TRUE`
  const def = STAT_SECTIONS.find((s) => s.key === section)!
  if (def.prefix === "/") return Prisma.sql`"path" = '/'`
  return Prisma.sql`("path" = ${def.prefix} OR "path" LIKE ${def.prefix + "/%"})`
}

const n = (v: unknown) => Number(v ?? 0)

async function totalsBetween(from: Date, to: Date, where: Prisma.Sql): Promise<StatsTotals> {
  const rows = await prisma.$queryRaw<{ vues: bigint; visites: bigint; clics: bigint }[]>`
    SELECT
      count(*) FILTER (WHERE "type" = 'VIEW') AS vues,
      count(DISTINCT "visiteurId") FILTER (WHERE "type" = 'VIEW') AS visites,
      count(*) FILTER (WHERE "type" = 'CLICK') AS clics
    FROM ${T}
    WHERE "createdAt" >= ${from} AND "createdAt" < ${to} AND ${where}`
  const r = rows[0]
  return { vues: n(r?.vues), visites: n(r?.visites), clics: n(r?.clics) }
}

function parisKey(d: Date, unit: "day" | "month"): string {
  const s = d.toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" }) // AAAA-MM-JJ
  return unit === "month" ? s.slice(0, 7) : s
}

export async function getStats(jours: number, section: StatSectionKey): Promise<StatsData> {
  const now = new Date()
  const since = new Date(now.getTime() - jours * 86400000)
  const prevSince = new Date(since.getTime() - jours * 86400000)
  const where = pathFilter(section)
  const bucketUnit: "day" | "month" = jours > 120 ? "month" : "day"
  const fmt = bucketUnit === "month" ? "YYYY-MM" : "YYYY-MM-DD"

  const [totals, previous, bucketRows, pageRows, clickRows, refRows, deviceRows] = await Promise.all([
    totalsBetween(since, now, where),
    totalsBetween(prevSince, since, where),
    prisma.$queryRaw<{ k: string; vues: bigint; visites: bigint }[]>`
      SELECT to_char("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris', ${fmt}) AS k,
        count(*) AS vues, count(DISTINCT "visiteurId") AS visites
      FROM ${T}
      WHERE "type" = 'VIEW' AND "createdAt" >= ${since} AND ${where}
      GROUP BY k ORDER BY k`,
    prisma.$queryRaw<{ path: string; vues: bigint; visites: bigint; clics: bigint }[]>`
      SELECT "path",
        count(*) FILTER (WHERE "type" = 'VIEW') AS vues,
        count(DISTINCT "visiteurId") FILTER (WHERE "type" = 'VIEW') AS visites,
        count(*) FILTER (WHERE "type" = 'CLICK') AS clics
      FROM ${T}
      WHERE "createdAt" >= ${since} AND ${where}
      GROUP BY "path" ORDER BY vues DESC, clics DESC LIMIT 100`,
    prisma.$queryRaw<{ label: string | null; href: string | null; path: string; clics: bigint }[]>`
      SELECT "label", "href", "path", count(*) AS clics
      FROM ${T}
      WHERE "type" = 'CLICK' AND "createdAt" >= ${since} AND ${where}
      GROUP BY "label", "href", "path" ORDER BY clics DESC LIMIT 30`,
    prisma.$queryRaw<{ nom: string; total: bigint }[]>`
      SELECT "referrer" AS nom, count(DISTINCT "visiteurId") AS total
      FROM ${T}
      WHERE "type" = 'VIEW' AND "referrer" IS NOT NULL AND "createdAt" >= ${since} AND ${where}
      GROUP BY "referrer" ORDER BY total DESC LIMIT 10`,
    prisma.$queryRaw<{ nom: string | null; total: bigint }[]>`
      SELECT "device" AS nom, count(DISTINCT "visiteurId") AS total
      FROM ${T}
      WHERE "type" = 'VIEW' AND "createdAt" >= ${since} AND ${where}
      GROUP BY "device" ORDER BY total DESC`,
  ])

  // Série continue : on complète les jours/mois sans visite avec des zéros.
  const byKey = new Map(bucketRows.map((r) => [r.k, r]))
  const buckets: StatsBucket[] = []
  const cursor = new Date(since)
  const seen = new Set<string>()
  while (cursor <= now) {
    const k = parisKey(cursor, bucketUnit)
    if (!seen.has(k)) {
      seen.add(k)
      const r = byKey.get(k)
      buckets.push({ date: k, vues: n(r?.vues), visites: n(r?.visites) })
    }
    cursor.setTime(cursor.getTime() + 86400000)
  }
  const lastKey = parisKey(now, bucketUnit)
  if (!seen.has(lastKey)) {
    const r = byKey.get(lastKey)
    buckets.push({ date: lastKey, vues: n(r?.vues), visites: n(r?.visites) })
  }

  // Titres lisibles pour les fiches formation et les articles.
  const slugsOf = (prefix: string) =>
    pageRows.filter((p) => p.path.startsWith(prefix)).map((p) => p.path.slice(prefix.length).split("/")[0])
  const [formations, articles] = await Promise.all([
    prisma.formation.findMany({ where: { slug: { in: slugsOf("/formations/") } }, select: { slug: true, titre: true } }),
    prisma.article.findMany({ where: { slug: { in: slugsOf("/actualites/") } }, select: { slug: true, titre: true } }),
  ])
  const titres = new Map<string, string>([
    ...formations.map((f) => [`/formations/${f.slug}`, f.titre] as [string, string]),
    ...articles.map((a) => [`/actualites/${a.slug}`, a.titre] as [string, string]),
  ])

  return {
    totals,
    previous,
    buckets,
    bucketUnit,
    pages: pageRows.map((p) => ({
      path: p.path,
      titre: titres.get(p.path) ?? pageLabel(p.path),
      vues: n(p.vues),
      visites: n(p.visites),
      clics: n(p.clics),
    })),
    clicks: clickRows.map((c) => ({ label: c.label ?? "(sans libellé)", href: c.href, path: c.path, clics: n(c.clics) })),
    referrers: refRows.map((r) => ({ nom: r.nom, total: n(r.total) })),
    devices: deviceRows.map((r) => ({ nom: r.nom ?? "inconnu", total: n(r.total) })),
  }
}

function pageLabel(path: string): string | null {
  const exact = STAT_SECTIONS.find((s) => s.prefix === path)
  if (exact) return exact.label
  if (path.startsWith("/convention/formateur/")) return "Signature convention (formateur)"
  if (path.startsWith("/convention/")) return "Signature convention"
  return null
}

// Rétention : 13 mois maximum (recommandation CNIL pour la mesure d'audience).
export async function purgeOldAnalytics(): Promise<number> {
  const limit = new Date()
  limit.setMonth(limit.getMonth() - 13)
  const { count } = await prisma.analyticsEvent.deleteMany({ where: { createdAt: { lt: limit } } })
  return count
}
