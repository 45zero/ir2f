import Link from "next/link"
import { getStats, type StatsCountRow, type StatsTotals } from "@/lib/admin/statistiques"
import { STAT_PERIODES, STAT_SECTIONS, type StatSectionKey } from "@/lib/statistiques-shared"
import { StatsBarChart } from "@/components/admin/StatsBarChart"
import { colors, fontHeading } from "@/lib/theme"

const TABS: { key: StatSectionKey; label: string }[] = [
  { key: "ensemble", label: "Vue d'ensemble" },
  ...STAT_SECTIONS.map((s) => ({ key: s.key as StatSectionKey, label: s.label })),
]

const card: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${colors.border}`,
  borderRadius: 10,
  padding: 18,
}

const th: React.CSSProperties = {
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0.4,
  color: colors.textLight,
  padding: "8px 10px",
  borderBottom: `1px solid ${colors.border}`,
}
const td: React.CSSProperties = { padding: "9px 10px", fontSize: 13, borderBottom: `1px solid ${colors.border}`, verticalAlign: "top" }
const tdNum: React.CSSProperties = { ...td, textAlign: "right", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }

function href(section: StatSectionKey, jours: number) {
  const p = new URLSearchParams()
  if (section !== "ensemble") p.set("page", section)
  if (jours !== 30) p.set("periode", String(jours))
  const qs = p.toString()
  return `/admin/statistiques${qs ? `?${qs}` : ""}`
}

function Delta({ now, before }: { now: number; before: number }) {
  if (before === 0) return <span style={{ fontSize: 12, color: colors.textLight }}>pas de comparaison</span>
  const pct = Math.round(((now - before) / before) * 100)
  const up = pct >= 0
  return (
    <span style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, display: "inline-flex", alignItems: "center", gap: 4 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {up ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
      </svg>
      {up ? "+" : ""}{pct} % vs période précédente
    </span>
  )
}

function Kpis({ totals, previous }: { totals: StatsTotals; previous: StatsTotals }) {
  const items = [
    { label: "Pages vues", value: totals.vues, prev: previous.vues, hint: "Nombre total de pages affichées" },
    { label: "Visiteurs", value: totals.visites, prev: previous.visites, hint: "Visiteurs distincts, comptés une fois par jour" },
    { label: "Clics", value: totals.clics, prev: previous.clics, hint: "Clics sur liens et boutons" },
  ]
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
      {items.map((k) => (
        <div key={k.label} style={card} title={k.hint}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.textLight, textTransform: "uppercase", letterSpacing: 0.4 }}>{k.label}</div>
          <div style={{ fontFamily: fontHeading, fontSize: 34, fontWeight: 800, color: colors.navy, lineHeight: 1.1, margin: "6px 0 4px" }}>
            {k.value.toLocaleString("fr-FR")}
          </div>
          <Delta now={k.value} before={k.prev} />
        </div>
      ))}
    </div>
  )
}

function ShareList({ title, rows, empty }: { title: string; rows: StatsCountRow[]; empty: string }) {
  const total = rows.reduce((s, r) => s + r.total, 0)
  return (
    <div style={{ ...card, flex: "1 1 280px" }}>
      <h2 style={{ fontFamily: fontHeading, fontSize: 17, fontWeight: 700, color: colors.navy, margin: "0 0 12px" }}>{title}</h2>
      {rows.length === 0 ? (
        <p style={{ fontSize: 13, color: colors.textLight, margin: 0 }}>{empty}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map((r) => {
            const pct = total ? Math.round((r.total / total) * 100) : 0
            return (
              <div key={r.nom}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, gap: 8 }}>
                  <span style={{ textTransform: "capitalize", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.nom}</span>
                  <span style={{ color: colors.textMuted, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                    {r.total.toLocaleString("fr-FR")} · {pct} %
                  </span>
                </div>
                <div style={{ height: 6, background: "#eef0f3", borderRadius: 3 }}>
                  <div style={{ height: 6, width: `${pct}%`, background: colors.navy, borderRadius: 3 }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default async function AdminStatistiquesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; periode?: string }>
}) {
  const sp = await searchParams
  const section: StatSectionKey = TABS.some((t) => t.key === sp.page) ? (sp.page as StatSectionKey) : "ensemble"
  const jours = STAT_PERIODES.some((p) => String(p.jours) === sp.periode) ? Number(sp.periode) : 30
  const data = await getStats(jours, section)
  const sectionLabel = TABS.find((t) => t.key === section)!.label
  const showPathColumn = section === "ensemble"

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>Statistiques</h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            Fréquentation du site public, sans cookie. Vos propres visites d&apos;administrateur ne sont pas comptées.
          </p>
        </div>
        <div style={{ display: "flex", gap: 4, background: "#fff", border: `1px solid ${colors.border}`, borderRadius: 8, padding: 4 }}>
          {STAT_PERIODES.map((p) => {
            const active = p.jours === jours
            return (
              <Link key={p.jours} href={href(section, p.jours)} style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: "none",
                color: active ? "#fff" : colors.navy, background: active ? colors.navy : "transparent",
              }}>
                {p.label}
              </Link>
            )
          })}
        </div>
      </div>

      <nav style={{ display: "flex", gap: 2, flexWrap: "wrap", borderBottom: `2px solid ${colors.border}` }}>
        {TABS.map((t) => {
          const active = t.key === section
          return (
            <Link key={t.key} href={href(t.key, jours)} style={{
              padding: "10px 14px", fontSize: 13, fontWeight: 700, textDecoration: "none",
              color: active ? colors.navy : colors.textLight,
              borderBottom: `2px solid ${active ? colors.red : "transparent"}`, marginBottom: -2,
            }}>
              {t.label}
            </Link>
          )
        })}
      </nav>

      <Kpis totals={data.totals} previous={data.previous} />

      <div style={card}>
        <h2 style={{ fontFamily: fontHeading, fontSize: 17, fontWeight: 700, color: colors.navy, margin: "0 0 12px" }}>
          Pages vues par {data.bucketUnit === "month" ? "mois" : "jour"} — {sectionLabel}
        </h2>
        <StatsBarChart points={data.buckets} unit={data.bucketUnit} />
      </div>

      <div style={card}>
        <h2 style={{ fontFamily: fontHeading, fontSize: 17, fontWeight: 700, color: colors.navy, margin: "0 0 12px" }}>
          {section === "ensemble" ? "Toutes les pages" : `Pages de la rubrique « ${sectionLabel} »`}
        </h2>
        {data.pages.length === 0 ? (
          <p style={{ fontSize: 13, color: colors.textLight, margin: 0 }}>Aucune visite enregistrée sur cette période.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={th}>Page</th>
                  <th style={{ ...th, textAlign: "right" }}>Vues</th>
                  <th style={{ ...th, textAlign: "right" }}>Visiteurs</th>
                  <th style={{ ...th, textAlign: "right" }}>Clics</th>
                </tr>
              </thead>
              <tbody>
                {data.pages.map((p) => (
                  <tr key={p.path}>
                    <td style={td}>
                      <div style={{ fontWeight: 600, color: colors.text }}>{p.titre ?? p.path}</div>
                      {p.titre && <div style={{ fontSize: 11, color: colors.textLight }}>{p.path}</div>}
                    </td>
                    <td style={tdNum}>{p.vues.toLocaleString("fr-FR")}</td>
                    <td style={tdNum}>{p.visites.toLocaleString("fr-FR")}</td>
                    <td style={tdNum}>{p.clics.toLocaleString("fr-FR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={card}>
        <h2 style={{ fontFamily: fontHeading, fontSize: 17, fontWeight: 700, color: colors.navy, margin: "0 0 12px" }}>
          Éléments les plus cliqués
        </h2>
        {data.clicks.length === 0 ? (
          <p style={{ fontSize: 13, color: colors.textLight, margin: 0 }}>Aucun clic enregistré sur cette période.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={th}>Lien / bouton</th>
                  <th style={th}>Destination</th>
                  {showPathColumn && <th style={th}>Sur la page</th>}
                  <th style={{ ...th, textAlign: "right" }}>Clics</th>
                </tr>
              </thead>
              <tbody>
                {data.clicks.map((c, i) => (
                  <tr key={`${c.label}-${c.href}-${c.path}-${i}`}>
                    <td style={{ ...td, fontWeight: 600 }}>{c.label}</td>
                    <td style={{ ...td, color: colors.textMuted, wordBreak: "break-all" }}>{c.href ?? "—"}</td>
                    {showPathColumn && <td style={{ ...td, color: colors.textMuted }}>{c.path}</td>}
                    <td style={tdNum}>{c.clics.toLocaleString("fr-FR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <ShareList title="Sites d'origine" rows={data.referrers} empty="Aucun visiteur venu d'un autre site (accès direct uniquement)." />
        <ShareList title="Appareils" rows={data.devices} empty="Aucune donnée." />
      </div>
    </div>
  )
}
