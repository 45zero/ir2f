"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { publishArticleToSocial } from "@/lib/actions/social-publish"
import { FacebookIcon, InstagramIcon, TikTokIcon, LinkedInIcon } from "@/components/admin/SocialPlatformIcons"
import { colors, fontBody } from "@/lib/theme"
import type { ReseauSocialPlateforme } from "@/generated/prisma"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" })

export type PublierReseauxCompte = { id: string; label: string; plateforme: ReseauSocialPlateforme }
export type ReseauxPublies = Record<string, { publishedAt: string; postId?: string; error?: string }>

const PLATEFORME_ICONS: Record<ReseauSocialPlateforme, (props: { size?: number }) => React.JSX.Element> = {
  FACEBOOK: FacebookIcon,
  INSTAGRAM: InstagramIcon,
}

export function PublierReseauxPanel({
  articleId,
  comptes,
  reseauxPublies,
}: {
  articleId: string
  comptes: PublierReseauxCompte[]
  reseauxPublies: ReseauxPublies | null
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [state, formAction, isPending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof publishArticleToSocial>> | undefined) => publishArticleToSocial(articleId, selected),
    undefined
  )

  const statuses = { ...(reseauxPublies ?? {}) }
  for (const r of state?.results ?? []) {
    statuses[r.compteId] = r.ok ? { publishedAt: new Date().toISOString() } : { publishedAt: new Date().toISOString(), error: r.error }
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: "clamp(18px,3vw,28px)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: 560,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 800, color: colors.navy, fontFamily: fontBody }}>Publier sur les réseaux</span>
      <p style={{ fontSize: 12, color: colors.textLight, margin: 0 }}>
        Publie officiellement l&apos;actualité sur les comptes sélectionnés (au nom de la Ligue). Instagram nécessite
        que l&apos;actualité ait une image.
      </p>

      {comptes.length === 0 ? (
        <p style={{ fontSize: 12.5, color: colors.textMuted, margin: 0 }}>
          Aucun compte connecté.{" "}
          <Link href="/admin/reseaux-sociaux" style={{ color: colors.navy, fontWeight: 700 }}>
            En connecter un
          </Link>
          .
        </p>
      ) : (
        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {comptes.map((c) => {
            const status = statuses[c.id]
            const Icon = PLATEFORME_ICONS[c.plateforme]
            return (
              <label key={c.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: colors.text }}>
                <input
                  type="checkbox"
                  checked={selected.includes(c.id)}
                  onChange={(e) => setSelected((prev) => (e.target.checked ? [...prev, c.id] : prev.filter((id) => id !== c.id)))}
                  style={{ width: 15, height: 15, marginTop: 2 }}
                />
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: 6, background: "#f5f7fb", color: colors.navy, flexShrink: 0 }}>
                  <Icon size={15} />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <strong>{c.label}</strong>
                  {status?.error && <span style={{ fontSize: 11.5, color: colors.red }}>Erreur : {status.error}</span>}
                  {status && !status.error && (
                    <span style={{ fontSize: 11.5, color: "#1a6b3a" }}>Publié le {dateFormatter.format(new Date(status.publishedAt))}</span>
                  )}
                </span>
              </label>
            )
          })}

          {state?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.error}</p>}

          <button
            type="submit"
            disabled={isPending || selected.length === 0}
            style={{
              alignSelf: "flex-start",
              background: isPending || selected.length === 0 ? "#e999a0" : colors.red,
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: isPending || selected.length === 0 ? "default" : "pointer",
            }}
          >
            {isPending ? "Publication..." : "Publier"}
          </button>
        </form>
      )}

      <div style={{ display: "flex", gap: 10, paddingTop: 4, borderTop: "1px solid #eef0f3", marginTop: 4 }}>
        {[
          { Icon: TikTokIcon, label: "TikTok" },
          { Icon: LinkedInIcon, label: "LinkedIn" },
        ].map(({ Icon, label }) => (
          <span
            key={label}
            title="Bientôt disponible"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 10,
              color: "#b7bfcc",
              fontSize: 11.5,
              fontWeight: 700,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: "#f5f7fb" }}>
              <Icon size={13} />
            </span>
            {label} · bientôt
          </span>
        ))}
      </div>
    </div>
  )
}
