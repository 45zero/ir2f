"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  refreshContentSocialStats,
  setDiffuserReseaux,
  setPublicationArchive,
  getPostComments,
  deleteSocialComment,
} from "@/lib/actions/social-publish"
import { PublierReseauxDialogTrigger } from "@/components/admin/PublierReseauxDialog"
import { PublishedPostActions, ScheduledPostActions } from "@/components/admin/PublierReseauxPanel"
import { FacebookIcon, InstagramIcon } from "@/components/admin/SocialPlatformIcons"
import { colors, fontBody, fontHeading } from "@/lib/theme"
import type { PublicationRow, APublierItem } from "@/lib/admin/publications"
import type { PublierReseauxCompte } from "@/components/admin/PublierReseauxPanel"
import type { SocialPlateforme } from "@/lib/social/accounts"
import type { PublishableType, SocialComment } from "@/lib/social/publication"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" })
const numberFormatter = new Intl.NumberFormat("fr-FR")

function compactNumber(n: number): string {
  if (n >= 10000) return `${Math.round(n / 1000)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

const PLATEFORME_ICONS: Record<SocialPlateforme, (props: { size?: number }) => React.JSX.Element> = {
  FACEBOOK: FacebookIcon,
  INSTAGRAM: InstagramIcon,
}

const ENTITY_ADMIN_PATH: Record<PublishableType, string> = { ARTICLE: "/admin/articles", FORMATION: "/admin/formations" }
const ENTITY_TYPE_LABEL: Record<PublishableType, string> = { ARTICLE: "Actualité", FORMATION: "Formation" }

const smallLinkButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  fontSize: 11.5,
  fontWeight: 700,
  fontFamily: fontBody,
  color: colors.navy,
  textDecoration: "underline",
  cursor: "pointer",
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

const rowWrapStyle = { borderTop: "1px solid #eef0f3", padding: "10px 0" }
const rowContentStyle = { display: "flex", alignItems: "center", gap: 10, fontSize: 13 }

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

type EntityGroup = { entityType: PublishableType; entityId: string; titre: string; rows: PublicationRow[] }

/** Regroupe des lignes plateforme-par-plateforme (une par compte) en une ligne par contenu — l'ordre des groupes suit la première apparition, les listes d'entrée étant déjà triées (voir getPublicationsOverview). */
function groupByEntity(rows: PublicationRow[]): EntityGroup[] {
  const groups = new Map<string, EntityGroup>()
  for (const r of rows) {
    const key = `${r.entityType}:${r.entityId}`
    const group = groups.get(key)
    if (group) group.rows.push(r)
    else groups.set(key, { entityType: r.entityType, entityId: r.entityId, titre: r.titre, rows: [r] })
  }
  return [...groups.values()]
}

/** Stat compacte affichée directement sous le logo, sans avoir à cliquer — vues en priorité (plus parlant qu'un like), repli sur les j'aime si les vues n'ont pas encore été rafraîchies. */
function compactStat(etat: PublicationRow["etat"]): string | null {
  if (etat.views !== undefined) return `${compactNumber(etat.views)} vues`
  if (etat.likes !== undefined) return `${compactNumber(etat.likes)} j'aime`
  return null
}

const logoButtonSize = 30

function PlatformLogoButton({ row, active, onClick, stat }: { row: PublicationRow; active: boolean; onClick: () => void; stat?: string | null }) {
  const Icon = row.plateforme ? PLATEFORME_ICONS[row.plateforme] : null
  return (
    <button
      type="button"
      onClick={onClick}
      title={row.compteLabel}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        minWidth: logoButtonSize,
        padding: stat ? "5px 7px" : 0,
        height: stat ? "auto" : logoButtonSize,
        width: stat ? "auto" : logoButtonSize,
        borderRadius: 7,
        background: active ? "#eef1f8" : "#f5f7fb",
        border: active ? `1.5px solid ${colors.navy}` : "1.5px solid transparent",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {Icon ? <Icon size={14} /> : <span style={{ fontSize: 10, fontWeight: 700, color: colors.textMuted }}>?</span>}
      {stat && <span style={{ fontSize: 9.5, fontWeight: 700, color: colors.textMuted, whiteSpace: "nowrap" }}>{stat}</span>}
    </button>
  )
}

/** Bascule archiver/désarchiver une publication — masque uniquement la ligne de la vue par défaut, aucun impact côté réseau. */
function ArchiveToggle({ entityType, entityId, compteId, archived }: { entityType: PublishableType; entityId: string; compteId: string; archived: boolean }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function handleToggle() {
    setPending(true)
    await setPublicationArchive(entityType, entityId, compteId, !archived)
    setPending(false)
    router.refresh()
  }

  return (
    <button type="button" onClick={handleToggle} disabled={pending} style={smallLinkButtonStyle}>
      {pending ? "..." : archived ? "Désarchiver" : "Archiver"}
    </button>
  )
}

/** Commentaires d'une publication, chargés à la demande (pas préchargés pour chaque ligne) — consultables et supprimables directement depuis IR2F, sans aller sur Facebook/Instagram. */
function CommentsSection({ entityType, entityId, compteId }: { entityType: PublishableType; entityId: string; compteId: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [comments, setComments] = useState<SocialComment[] | null>(null)

  async function handleToggle() {
    if (open) {
      setOpen(false)
      return
    }
    setOpen(true)
    if (comments) return
    setLoading(true)
    setError(null)
    const result = await getPostComments(entityType, entityId, compteId)
    setError(result.error)
    setComments(result.comments)
    setLoading(false)
  }

  async function handleDelete(commentId: string) {
    const result = await deleteSocialComment(entityType, entityId, compteId, commentId)
    if (result.ok) setComments((prev) => prev?.filter((c) => c.id !== commentId) ?? null)
    else setError(result.error)
  }

  return (
    <div style={{ marginTop: 6 }}>
      <button type="button" onClick={handleToggle} style={smallLinkButtonStyle}>
        {open ? "Masquer les commentaires" : "Voir les commentaires"}
      </button>
      {open && (
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
          {loading && <p style={{ fontSize: 11.5, color: colors.textMuted, margin: 0 }}>Chargement...</p>}
          {error && <p style={{ fontSize: 11.5, color: colors.red, margin: 0 }}>{error}</p>}
          {comments && comments.length === 0 && !loading && (
            <p style={{ fontSize: 11.5, color: colors.textLight, margin: 0 }}>Aucun commentaire.</p>
          )}
          {comments?.map((c) => (
            <div
              key={c.id}
              style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, fontSize: 11.5, background: "#f9fafb", borderRadius: 4, padding: "6px 8px" }}
            >
              <span>
                <strong>{c.author}</strong> — {c.text}
              </span>
              <button type="button" onClick={() => handleDelete(c.id)} style={{ ...smallLinkButtonStyle, color: colors.red, flexShrink: 0 }}>
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Une ligne par contenu (actualité/formation), avec un logo cliquable par compte réseau en
 * dessous (accompagné d'une stat compacte pour "Publié", visible sans clic) — cliquer un logo
 * ouvre/ferme le détail complet (stats, commentaires) et les actions Modifier/Supprimer/Archiver
 * pour ce compte précis.
 */
function PublicationGroupRow({ group, kind }: { group: EntityGroup; kind: "programme" | "publie" | "echec" }) {
  const [openCompteId, setOpenCompteId] = useState<string | null>(null)
  const openRow = group.rows.find((r) => r.compteId === openCompteId) ?? null

  return (
    <div style={rowWrapStyle}>
      <div style={rowContentStyle}>
        <TypeBadge entityType={group.entityType} />
        <Link href={`${ENTITY_ADMIN_PATH[group.entityType]}/${group.entityId}`} style={{ flex: 1, color: colors.text, textDecoration: "none" }}>
          <strong>{group.titre}</strong>
        </Link>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
        {group.rows.map((r) => (
          <PlatformLogoButton
            key={r.compteId}
            row={r}
            active={openCompteId === r.compteId}
            onClick={() => setOpenCompteId((prev) => (prev === r.compteId ? null : r.compteId))}
            stat={kind === "publie" ? compactStat(r.etat) : null}
          />
        ))}
      </div>
      {openRow && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #eef0f3", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 12, color: colors.textMuted }}>
            {openRow.compteLabel}
            {kind === "programme" && openRow.etat.scheduledFor && ` — programmé pour le ${dateFormatter.format(new Date(openRow.etat.scheduledFor))}`}
            {kind === "publie" && openRow.etat.publishedAt && ` — publié le ${dateFormatter.format(new Date(openRow.etat.publishedAt))}`}
            {kind === "publie" && (openRow.etat.views !== undefined || openRow.etat.likes !== undefined) && (
              <>
                {" "}
                —{openRow.etat.views !== undefined && ` ${numberFormatter.format(openRow.etat.views)} vue${openRow.etat.views > 1 ? "s" : ""} ·`}{" "}
                {openRow.etat.likes ?? 0} j&apos;aime, {openRow.etat.comments ?? 0} commentaire{(openRow.etat.comments ?? 0) > 1 ? "s" : ""}
              </>
            )}
            {kind === "echec" && openRow.etat.error && ` — ${openRow.etat.error}`}
          </span>
          {kind === "programme" && (
            <ScheduledPostActions entityType={group.entityType} entityId={group.entityId} compteId={openRow.compteId} currentMessage={openRow.etat.message} />
          )}
          {kind === "publie" && (
            <>
              <PublishedPostActions
                entityType={group.entityType}
                entityId={group.entityId}
                compteId={openRow.compteId}
                plateforme={openRow.plateforme}
                currentMessage={openRow.etat.message}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: 23 }}>
                <ArchiveToggle entityType={group.entityType} entityId={group.entityId} compteId={openRow.compteId} archived={!!openRow.etat.archive} />
              </div>
              <div style={{ marginLeft: 23 }}>
                <CommentsSection entityType={group.entityType} entityId={group.entityId} compteId={openRow.compteId} />
              </div>
            </>
          )}
        </div>
      )}
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
  const [publieQuery, setPublieQuery] = useState("")
  const [showArchived, setShowArchived] = useState(false)

  const programmeGroups = groupByEntity(programme)
  const publieGroups = groupByEntity(publie)
  const echecGroups = groupByEntity(echec)

  const archivedCount = useMemo(() => publie.filter((r) => r.etat.archive).length, [publie])

  const visiblePublieGroups = useMemo(() => {
    const query = publieQuery.trim().toLowerCase()
    return publieGroups
      .map((g) => ({ ...g, rows: g.rows.filter((r) => showArchived || !r.etat.archive) }))
      .filter((g) => g.rows.length > 0)
      .filter((g) => !query || g.titre.toLowerCase().includes(query))
  }, [publieGroups, publieQuery, showArchived])

  async function refreshAll() {
    setRefreshing(true)
    await Promise.all(publieGroups.map((g) => refreshContentSocialStats(g.entityType, g.entityId)))
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

      <SectionCard title={`Programmé (${programmeGroups.length})`}>
        {programmeGroups.length === 0 ? (
          <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>Aucune publication programmée.</p>
        ) : (
          programmeGroups.map((g) => <PublicationGroupRow key={`${g.entityType}-${g.entityId}`} group={g} kind="programme" />)
        )}
      </SectionCard>

      {echecGroups.length > 0 && (
        <SectionCard title={`Échecs (${echecGroups.length})`}>
          {echecGroups.map((g) => (
            <PublicationGroupRow key={`${g.entityType}-${g.entityId}`} group={g} kind="echec" />
          ))}
        </SectionCard>
      )}

      <SectionCard title={`Publié (${visiblePublieGroups.length}${publieGroups.length !== visiblePublieGroups.length ? ` / ${publieGroups.length}` : ""})`}>
        {publieGroups.length > 0 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              onClick={refreshAll}
              disabled={refreshing}
              style={{
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
            <input
              type="search"
              value={publieQuery}
              onChange={(e) => setPublieQuery(e.target.value)}
              placeholder="Rechercher un titre..."
              style={{ border: "1px solid #d8dde5", borderRadius: 4, padding: "7px 10px", fontSize: 12.5, fontFamily: fontBody, outline: "none", minWidth: 180 }}
            />
            {archivedCount > 0 && (
              <button
                type="button"
                onClick={() => setShowArchived((v) => !v)}
                style={{
                  background: showArchived ? "#eef1f8" : "transparent",
                  border: "1px solid #d8dde5",
                  color: colors.navy,
                  padding: "7px 14px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: fontBody,
                  cursor: "pointer",
                }}
              >
                {showArchived ? "Masquer les archivées" : `Afficher les archivées (${archivedCount})`}
              </button>
            )}
          </div>
        )}
        {visiblePublieGroups.length === 0 ? (
          <p style={{ fontSize: 12.5, color: colors.textLight, margin: 0 }}>
            {publieGroups.length === 0 ? "Aucune publication pour le moment." : "Aucun résultat."}
          </p>
        ) : (
          visiblePublieGroups.map((g) => <PublicationGroupRow key={`${g.entityType}-${g.entityId}`} group={g} kind="publie" />)
        )}
      </SectionCard>
    </div>
  )
}
