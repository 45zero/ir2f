"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { refreshContentSocialStats, setDiffuserReseaux } from "@/lib/actions/social-publish"
import { PublierReseauxDialogTrigger } from "@/components/admin/PublierReseauxDialog"
import { FacebookIcon, InstagramIcon } from "@/components/admin/SocialPlatformIcons"
import { colors, fontBody, fontHeading } from "@/lib/theme"
import type { PublicationRow, APublierItem } from "@/lib/admin/publications"
import type { PublierReseauxCompte } from "@/components/admin/PublierReseauxPanel"
import type { SocialPlateforme } from "@/lib/social/accounts"
import type { PublishableType } from "@/lib/social/publication"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" })
const numberFormatter = new Intl.NumberFormat("fr-FR")

const PLATEFORME_ICONS: Record<SocialPlateforme, (props: { size?: number }) => React.JSX.Element> = {
  FACEBOOK: FacebookIcon,
  INSTAGRAM: InstagramIcon,
}

const ENTITY_ADMIN_PATH: Record<PublishableType, string> = { ARTICLE: "/admin/articles", FORMATION: "/admin/formations" }
const ENTITY_TYPE_LABEL: Record<PublishableType, string> = { ARTICLE: "Actualité", FORMATION: "Formation" }

function PlatformBadge({ plateforme }: { plateforme: SocialPlateforme | null }) {
  if (!plateforme) return null
  const Icon = PLATEFORME_ICONS[plateforme]
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: "#f5f7fb", flexShrink: 0 }}>
      <Icon size={13} />
    </span>
  )
}

function TypeBadge({ entityType }: { entityType: PublishableType }) {
  return (
    <span style={{ fontSize: 10.5, fontWeight: 700, color: colors.textLight, border: "1px solid #e2e5ea", borderRadius: 4, padding: "2px 6px", whiteSpace: "nowrap" }}>
      {ENTITY_TYPE_LABEL[entityType]}
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

/** Ligne "À publier" : ouvre la publication en popup (voir PublierReseauxDialog) sans quitter cette page, ou permet de retirer le contenu de la liste (passe Article/Formation.diffuserReseaux à false — réactivable depuis le formulaire d'édition). */
function APublierRow({ item, comptes }: { item: APublierItem; comptes: PublierReseauxCompte[] }) {
  const router = useRouter()
  const [removing, setRemoving] = useState(false)

  async function handleRemove() {
    setRemoving(true)
    await setDiffuserReseaux(item.entityType, item.entityId, false)
    setRemoving(false)
    router.refresh()
  }

  return (
    <div style={rowStyle}>
      <TypeBadge entityType={item.entityType} />
      <Link href={`${ENTITY_ADMIN_PATH[item.entityType]}/${item.entityId}`} style={{ flex: 1, color: colors.text, textDecoration: "none" }}>
        <strong>{item.titre}</strong>
      </Link>
      <button
        type="button"
        onClick={handleRemove}
        disabled={removing}
        style={{ background: "none", border: "none", padding: 0, fontSize: 11.5, fontWeight: 700, color: colors.textLight, textDecoration: "underline", cursor: removing ? "default" : "pointer" }}
      >
        {removing ? "..." : "Retirer"}
      </button>
      <PublierReseauxDialogTrigger entityType={item.entityType} entityId={item.entityId} titre={item.titre} comptes={comptes} />
    </div>
  )
}

export function PublicationsOverview({
  aPublier,
  programme,
  publie,
  echec,
  comptes,
}: {
  aPublier: APublierItem[]
  programme: PublicationRow[]
  publie: PublicationRow[]
  echec: PublicationRow[]
  comptes: PublierReseauxCompte[]
}) {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)

  async function refreshAll() {
    setRefreshing(true)
    const targets = [...new Map(publie.map((r) => [`${r.entityType}:${r.entityId}`, r])).values()]
    await Promise.all(targets.map((r) => refreshContentSocialStats(r.entityType, r.entityId)))
    setRefreshing(false)
    router.refresh()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionCard title={`À publier (${aPublier.length})`}>
        {aPublier.length === 0 ? (
          <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>Aucun contenu en attente de publication.</p>
        ) : (
          aPublier.map((item) => <APublierRow key={`${item.entityType}-${item.entityId}`} item={item} comptes={comptes} />)
        )}
      </SectionCard>

      <SectionCard title={`Programmé (${programme.length})`}>
        {programme.length === 0 ? (
          <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>Aucune publication programmée.</p>
        ) : (
          programme.map((r) => (
            <Link key={`${r.entityType}-${r.entityId}-${r.compteId}`} href={`${ENTITY_ADMIN_PATH[r.entityType]}/${r.entityId}`} style={{ ...rowStyle, color: colors.text, textDecoration: "none" }}>
              <PlatformBadge plateforme={r.plateforme} />
              <TypeBadge entityType={r.entityType} />
              <span style={{ flex: 1 }}>
                <strong>{r.titre}</strong> — {r.compteLabel}
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
            <Link key={`${r.entityType}-${r.entityId}-${r.compteId}`} href={`${ENTITY_ADMIN_PATH[r.entityType]}/${r.entityId}`} style={{ ...rowStyle, color: colors.text, textDecoration: "none" }}>
              <PlatformBadge plateforme={r.plateforme} />
              <TypeBadge entityType={r.entityType} />
              <span style={{ flex: 1 }}>
                <strong>{r.titre}</strong> — {r.compteLabel}
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
            <div key={`${r.entityType}-${r.entityId}-${r.compteId}`} style={rowStyle}>
              <PlatformBadge plateforme={r.plateforme} />
              <TypeBadge entityType={r.entityType} />
              <Link href={`${ENTITY_ADMIN_PATH[r.entityType]}/${r.entityId}`} style={{ flex: 1, color: colors.text, textDecoration: "none" }}>
                <strong>{r.titre}</strong> — {r.compteLabel}
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
