"use client"

import { useActionState, useMemo, useState } from "react"
import Link from "next/link"
import { publishArticleToSocial, refreshSocialStats, editArticleSocialPost, deleteArticleSocialPost } from "@/lib/actions/social-publish"
import { FacebookIcon, InstagramIcon, TikTokIcon, LinkedInIcon } from "@/components/admin/SocialPlatformIcons"
import { colors, fontBody } from "@/lib/theme"
import type { SocialPlateforme } from "@/lib/social/accounts"
import type { ReseauxPublies } from "@/lib/articles-shared"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" })
const numberFormatter = new Intl.NumberFormat("fr-FR")

export type PublierReseauxCompte = { id: string; label: string; plateforme: SocialPlateforme }

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const STATUT_LABELS: Record<string, { label: string; color: string }> = {
  PROGRAMME: { label: "Programmé", color: "#7a6423" },
  PUBLIE: { label: "Publié", color: "#1a6b3a" },
  ECHEC: { label: "Échec", color: colors.red },
  SUPPRIME: { label: "Supprimé", color: colors.textMuted },
}

const linkButtonStyle: React.CSSProperties = {
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

function smallButtonStyle(background: string, filled: boolean): React.CSSProperties {
  return {
    background,
    color: filled ? "#fff" : colors.navy,
    border: filled ? "none" : "1px solid #d8dde5",
    padding: "5px 10px",
    borderRadius: 4,
    fontSize: 11.5,
    fontWeight: 700,
    fontFamily: fontBody,
    cursor: "pointer",
  }
}

/** Actions sur une publication déjà PUBLIE : modifier (Facebook uniquement — Instagram ne permet pas de modifier une légende publiée) et supprimer (les deux plateformes, avec confirmation car irréversible côté réseau social). */
function PublishedPostActions({
  articleId,
  compteId,
  plateforme,
  currentMessage,
}: {
  articleId: string
  compteId: string
  plateforme: SocialPlateforme
  currentMessage: string
}) {
  const [mode, setMode] = useState<"idle" | "edit" | "confirmDelete">("idle")
  const [draft, setDraft] = useState(currentMessage)

  const [editState, editAction, editPending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof editArticleSocialPost>> | undefined) => {
      const result = await editArticleSocialPost(articleId, compteId, draft)
      if (result.ok) setMode("idle")
      return result
    },
    undefined
  )
  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof deleteArticleSocialPost>> | undefined) => deleteArticleSocialPost(articleId, compteId),
    undefined
  )

  if (mode === "edit") {
    return (
      <form action={editAction} style={{ display: "flex", flexDirection: "column", gap: 6, marginLeft: 23, marginTop: 4 }}>
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} style={{ ...fieldStyle, resize: "vertical" }} />
        {editState?.error && <p style={{ color: colors.red, fontSize: 11.5, margin: 0 }}>{editState.error}</p>}
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" disabled={editPending} style={smallButtonStyle(colors.red, true)}>
            {editPending ? "Enregistrement..." : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("idle")
              setDraft(currentMessage)
            }}
            style={smallButtonStyle("transparent", false)}
          >
            Annuler
          </button>
        </div>
      </form>
    )
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: 23, marginTop: 2 }}>
      {plateforme === "FACEBOOK" && (
        <button type="button" onClick={() => setMode("edit")} style={linkButtonStyle}>
          Modifier
        </button>
      )}
      {mode === "confirmDelete" ? (
        <>
          <span style={{ fontSize: 11.5, color: colors.red }}>Supprimer définitivement ?</span>
          <form action={deleteAction}>
            <button type="submit" disabled={deletePending} style={{ ...linkButtonStyle, color: colors.red }}>
              {deletePending ? "Suppression..." : "Confirmer"}
            </button>
          </form>
          <button type="button" onClick={() => setMode("idle")} style={linkButtonStyle}>
            Annuler
          </button>
        </>
      ) : (
        <button type="button" onClick={() => setMode("confirmDelete")} style={linkButtonStyle}>
          Supprimer
        </button>
      )}
      {deleteState?.error && <span style={{ fontSize: 11.5, color: colors.red }}>{deleteState.error}</span>}
    </div>
  )
}

function PlatformSection({
  icon,
  title,
  comptes,
  selected,
  onToggle,
  statuses,
  articleId,
  children,
}: {
  icon: React.ReactNode
  title: string
  comptes: PublierReseauxCompte[]
  selected: string[]
  onToggle: (id: string, checked: boolean) => void
  statuses: ReseauxPublies
  articleId: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "#f9fafb", border: "1px solid #eef0f3", borderRadius: 8, padding: 14 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, color: colors.navy }}>
        {icon}
        {title}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {comptes.map((c) => {
          const etat = statuses[c.id]
          const statutInfo = etat ? STATUT_LABELS[etat.statut] : null
          return (
            <div key={c.id} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text }}>
                <input
                  type="checkbox"
                  checked={selected.includes(c.id)}
                  onChange={(e) => onToggle(c.id, e.target.checked)}
                  style={{ width: 15, height: 15 }}
                />
                {c.label}
              </label>
              {etat && statutInfo && (
                <span style={{ fontSize: 11.5, color: statutInfo.color, marginLeft: 23 }}>
                  {statutInfo.label}
                  {etat.statut === "PROGRAMME" && etat.scheduledFor && ` pour le ${dateFormatter.format(new Date(etat.scheduledFor))}`}
                  {etat.statut === "PUBLIE" && etat.publishedAt && ` le ${dateFormatter.format(new Date(etat.publishedAt))}`}
                  {etat.statut === "ECHEC" && etat.error && ` : ${etat.error}`}
                  {etat.statut === "SUPPRIME" && etat.deletedAt && ` le ${dateFormatter.format(new Date(etat.deletedAt))}`}
                  {etat.statut === "PUBLIE" && (etat.views !== undefined || etat.reach !== undefined) && (
                    <>
                      {" "}
                      — {numberFormatter.format(etat.views ?? 0)} vue{(etat.views ?? 0) > 1 ? "s" : ""}
                      {etat.reach !== undefined && ` (${numberFormatter.format(etat.reach)} en portée)`}
                    </>
                  )}
                  {etat.statut === "PUBLIE" && (etat.likes !== undefined || etat.comments !== undefined) && (
                    <> — {etat.likes ?? 0} j&apos;aime, {etat.comments ?? 0} commentaire{(etat.comments ?? 0) > 1 ? "s" : ""}</>
                  )}
                </span>
              )}
              {etat && etat.statut === "PUBLIE" && (
                <PublishedPostActions articleId={articleId} compteId={c.id} plateforme={c.plateforme} currentMessage={etat.message} />
              )}
            </div>
          )
        })}
      </div>
      {children}
    </div>
  )
}

export function PublierReseauxPanel({
  articleId,
  comptes,
  reseauxPublies,
  defaultMessage,
  articleImage,
  sectionImages,
}: {
  articleId: string
  comptes: PublierReseauxCompte[]
  reseauxPublies: ReseauxPublies | null
  defaultMessage: string
  articleImage: string | null
  sectionImages: string[]
}) {
  const facebookComptes = useMemo(() => comptes.filter((c) => c.plateforme === "FACEBOOK"), [comptes])
  const instagramComptes = useMemo(() => comptes.filter((c) => c.plateforme === "INSTAGRAM"), [comptes])
  const availableImages = useMemo(() => [...(articleImage ? [articleImage] : []), ...sectionImages], [articleImage, sectionImages])

  const [selectedFacebook, setSelectedFacebook] = useState<string[]>([])
  const [selectedInstagram, setSelectedInstagram] = useState<string[]>([])
  const [facebookMessage, setFacebookMessage] = useState(defaultMessage)
  const [instagramCaption, setInstagramCaption] = useState(defaultMessage)
  const [instagramImage, setInstagramImage] = useState(availableImages[0] ?? "")
  const [when, setWhen] = useState<"now" | "schedule">("now")
  const [scheduledFor, setScheduledFor] = useState("")

  const [state, formAction, isPending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof publishArticleToSocial>> | undefined) =>
      publishArticleToSocial(articleId, {
        facebook: { compteIds: selectedFacebook, message: facebookMessage },
        instagram: { compteIds: selectedInstagram, caption: instagramCaption, imageUrl: instagramImage || null },
        scheduledFor: when === "schedule" && scheduledFor ? new Date(scheduledFor).toISOString() : undefined,
      }),
    undefined
  )
  const [refreshState, refreshAction, refreshPending] = useActionState(
    async (_prev: Awaited<ReturnType<typeof refreshSocialStats>> | undefined) => refreshSocialStats(articleId),
    undefined
  )

  const statuses: ReseauxPublies = reseauxPublies ?? {}
  const hasAnyPublished = Object.values(statuses).some((s) => s.statut === "PUBLIE")
  const totalSelected = selectedFacebook.length + selectedInstagram.length

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: "clamp(18px,3vw,28px)", display: "flex", flexDirection: "column", gap: 16, maxWidth: 620 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: colors.navy, fontFamily: fontBody }}>Publier sur les réseaux</span>
        {hasAnyPublished && (
          <form action={refreshAction}>
            <button
              type="submit"
              disabled={refreshPending}
              style={{ background: "transparent", border: "1px solid #d8dde5", color: colors.navy, padding: "6px 12px", borderRadius: 4, fontSize: 11.5, fontWeight: 700, fontFamily: fontBody, cursor: refreshPending ? "default" : "pointer" }}
            >
              {refreshPending ? "Actualisation..." : "Rafraîchir les stats"}
            </button>
          </form>
        )}
      </div>
      <p style={{ fontSize: 12, color: colors.textLight, margin: 0 }}>
        Publie officiellement l&apos;actualité au nom de la Ligue, avec un texte propre à chaque plateforme.
      </p>

      {comptes.length === 0 ? (
        <p style={{ fontSize: 12.5, color: colors.textMuted, margin: 0 }}>
          Aucun compte connecté — configuré via la variable d&apos;environnement <code>SOCIAL_ACCOUNTS_JSON</code>.
        </p>
      ) : (
        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {facebookComptes.length > 0 && (
            <PlatformSection
              icon={<FacebookIcon size={17} />}
              title="Facebook"
              comptes={facebookComptes}
              selected={selectedFacebook}
              onToggle={(id, checked) => setSelectedFacebook((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))}
              statuses={statuses}
              articleId={articleId}
            >
              <textarea
                value={facebookMessage}
                onChange={(e) => setFacebookMessage(e.target.value)}
                rows={3}
                placeholder="Texte du post Facebook"
                style={{ ...fieldStyle, resize: "vertical" }}
              />
            </PlatformSection>
          )}

          {instagramComptes.length > 0 && (
            <PlatformSection
              icon={<InstagramIcon size={17} />}
              title="Instagram"
              comptes={instagramComptes}
              selected={selectedInstagram}
              onToggle={(id, checked) => setSelectedInstagram((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))}
              statuses={statuses}
              articleId={articleId}
            >
              <textarea
                value={instagramCaption}
                onChange={(e) => setInstagramCaption(e.target.value)}
                rows={3}
                placeholder="Légende du post Instagram"
                style={{ ...fieldStyle, resize: "vertical" }}
              />
              {availableImages.length > 0 ? (
                <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: colors.textMuted }}>Image à publier</span>
                  <select value={instagramImage} onChange={(e) => setInstagramImage(e.target.value)} style={fieldStyle}>
                    {availableImages.map((img, i) => (
                      <option key={img} value={img}>
                        {i === 0 ? "Image principale de l'actualité" : `Image de section ${i}`}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <p style={{ fontSize: 11.5, color: colors.red, margin: 0 }}>
                  Cette actualité n&apos;a aucune image — Instagram ne pourra pas être publié.
                </p>
              )}
            </PlatformSection>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Quand ?</span>
            <div style={{ display: "flex", gap: 14 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: colors.text }}>
                <input type="radio" checked={when === "now"} onChange={() => setWhen("now")} />
                Maintenant
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: colors.text }}>
                <input type="radio" checked={when === "schedule"} onChange={() => setWhen("schedule")} />
                Programmer
              </label>
            </div>
            {when === "schedule" && (
              <input
                type="datetime-local"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                required
                style={{ ...fieldStyle, maxWidth: 220 }}
              />
            )}
          </div>

          {state?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.error}</p>}
          {refreshState?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{refreshState.error}</p>}

          <button
            type="submit"
            disabled={isPending || totalSelected === 0 || (when === "schedule" && !scheduledFor)}
            style={{
              alignSelf: "flex-start",
              background: isPending || totalSelected === 0 ? "#e999a0" : colors.red,
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: isPending || totalSelected === 0 ? "default" : "pointer",
            }}
          >
            {isPending ? "Envoi..." : when === "schedule" ? "Programmer" : "Publier"}
          </button>
        </form>
      )}

      <div style={{ display: "flex", gap: 10, paddingTop: 4, borderTop: "1px solid #eef0f3" }}>
        {[
          { Icon: TikTokIcon, label: "TikTok" },
          { Icon: LinkedInIcon, label: "LinkedIn" },
        ].map(({ Icon, label }) => (
          <span key={label} title="Bientôt disponible" style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 11.5, fontWeight: 700, color: "#b7bfcc" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: "#f5f7fb", filter: "grayscale(1)", opacity: 0.6 }}>
              <Icon size={13} />
            </span>
            {label} · bientôt
          </span>
        ))}
      </div>

      <Link href="/admin/publications" style={{ fontSize: 11.5, color: colors.textLight, textDecoration: "underline" }}>
        Voir toutes les publications
      </Link>
    </div>
  )
}
