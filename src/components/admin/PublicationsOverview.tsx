"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { refreshSocialStats } from "@/lib/actions/social-publish"
import { FacebookIcon, InstagramIcon } from "@/components/admin/SocialPlatformIcons"
import { colors, fontBody, fontHeading } from "@/lib/theme"
import type { PublicationRow, ArticleAPublier } from "@/lib/admin/publications"
import type { SocialPlateforme } from "@/lib/social/accounts"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" })
const numberFormatter = new Intl.NumberFormat("fr-FR")

const PLATEFORME_ICONS: Record<SocialPlateforme, (props: { size?: number }) => React.JSX.Element> = {
  FACEBOOK: FacebookIcon,
  INSTAGRAM: InstagramIcon,
}

function PlatformBadge({ plateforme }: { plateforme: SocialPlateforme | null }) {
  if (!plateforme) return null
  const Icon = PLATEFORME_ICONS[plateforme]
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: "#f5f7fb", flexShrink: 0 }}>
      <Icon size={13} />
    </span>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: "clamp(16px,2.4vw,24px)", display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 17, fontWeight: 800, margin: 0 }}>{title}</h2>
      {children}
    </div>
  )
}

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 0",
  borderTop: "1px solid #eef0f3",
  fontSize: 13,
}

export function PublicationsOverview({
  aPublier,
  programme,
  publie,
  echec,
}: {
  aPublier: ArticleAPublier[]
  programme: PublicationRow[]
  publie: PublicationRow[]
  echec: PublicationRow[]
}) {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)

  async function refreshAll() {
    setRefreshing(true)
    const articleIds = [...new Set(publie.map((r) => r.articleId))]
    await Promise.all(articleIds.map((id) => refreshSocialStats(id)))
    setRefreshing(false)
    router.refresh()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionCard title={`À publier (${aPublier.length})`}>
        {aPublier.length === 0 ? (
          <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>Aucune actualité en attente de publication.</p>
        ) : (
          aPublier.map((a) => (
            <Link key={a.articleId} href={`/admin/articles/${a.articleId}`} style={{ ...rowStyle, color: colors.text, textDecoration: "none" }}>
              <strong>{a.titre}</strong>
            </Link>
          ))
        )}
      </SectionCard>

      <SectionCard title={`Programmé (${programme.length})`}>
        {programme.length === 0 ? (
          <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>Aucune publication programmée.</p>
        ) : (
          programme.map((r) => (
            <Link key={`${r.articleId}-${r.compteId}`} href={`/admin/articles/${r.articleId}`} style={{ ...rowStyle, color: colors.text, textDecoration: "none" }}>
              <PlatformBadge plateforme={r.plateforme} />
              <span style={{ flex: 1 }}>
                <strong>{r.articleTitre}</strong> — {r.compteLabel}
              </span>
              <span style={{ color: "#7a6423", fontSize: 12 }}>
                {r.etat.scheduledFor ? dateFormatter.format(new Date(r.etat.scheduledFor)) : ""}
              </span>
            </Link>
          ))
        )}
      </SectionCard>

      {echec.length > 0 && (
        <SectionCard title={`Échecs (${echec.length})`}>
          {echec.map((r) => (
            <Link key={`${r.articleId}-${r.compteId}`} href={`/admin/articles/${r.articleId}`} style={{ ...rowStyle, color: colors.text, textDecoration: "none" }}>
              <PlatformBadge plateforme={r.plateforme} />
              <span style={{ flex: 1 }}>
                <strong>{r.articleTitre}</strong> — {r.compteLabel}
              </span>
              <span style={{ color: colors.red, fontSize: 12 }}>{r.etat.error}</span>
            </Link>
          ))}
        </SectionCard>
      )}

      <SectionCard title={`Publié (${publie.length})`}>
        {publie.length > 0 && (
          <button
            type="button"
            onClick={refreshAll}
            disabled={refreshing}
            style={{
              alignSelf: "flex-start",
              background: "transparent",
              border: "1px solid #d8dde5",
              color: colors.navy,
              padding: "7px 14px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: refreshing ? "default" : "pointer",
            }}
          >
            {refreshing ? "Actualisation..." : "Rafraîchir toutes les stats"}
          </button>
        )}
        {publie.length === 0 ? (
          <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>Aucune publication pour le moment.</p>
        ) : (
          publie.map((r) => (
            <div key={`${r.articleId}-${r.compteId}`} style={rowStyle}>
              <PlatformBadge plateforme={r.plateforme} />
              <Link href={`/admin/articles/${r.articleId}`} style={{ flex: 1, color: colors.text, textDecoration: "none" }}>
                <strong>{r.articleTitre}</strong> — {r.compteLabel}
              </Link>
              <span style={{ color: colors.textLight, fontSize: 11.5 }}>
                {r.etat.publishedAt && dateFormatter.format(new Date(r.etat.publishedAt))}
              </span>
              <span style={{ color: colors.textMuted, fontSize: 12, whiteSpace: "nowrap" }}>
                {r.etat.views !== undefined && `${numberFormatter.format(r.etat.views)} vue${r.etat.views > 1 ? "s" : ""} · `}
                {r.etat.likes ?? 0} j&apos;aime · {r.etat.comments ?? 0} commentaire{(r.etat.comments ?? 0) > 1 ? "s" : ""}
              </span>
            </div>
          ))
        )}
      </SectionCard>
    </div>
  )
}
