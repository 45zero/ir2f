import Link from "next/link"
import { getMesInscriptions, getNextSessionForUser } from "@/lib/dashboard"
import { getMesDocuments } from "@/lib/documents"
import { getCovoituragesDisponibles } from "@/lib/covoiturage"
import { getInbox } from "@/lib/messages"
import { StatCard } from "@/components/dashboard/StatCard"
import { BroadcastBanner, type BroadcastBannerItem } from "@/components/dashboard/BroadcastBanner"
import { CATEGORIE_LABELS } from "@/lib/formations-shared"
import { colors, fontHeading, fontBody } from "@/lib/theme"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" })

export async function StagiaireDashboardHome({ userId, name }: { userId: string; name: string }) {
  const [inscriptions, documents, covoiturages, inbox, nextSession] = await Promise.all([
    getMesInscriptions(userId),
    getMesDocuments(userId, "STAGIAIRE"),
    getCovoituragesDisponibles(),
    getInbox(userId),
    getNextSessionForUser(userId),
  ])

  const validees = inscriptions.filter((i) => i.statut === "VALIDEE")
  const validatedFormationIds = new Set(validees.map((i) => i.formation.id))

  const docsASigner = documents.filter((d) => !d.signatures.some((s) => s.userId === userId)).length
  const trajetsPourMesFormations = covoiturages.filter(
    (c) => c.formationId && validatedFormationIds.has(c.formationId) && c.statut === "OUVERT"
  )

  const joursAvantProchaine = nextSession
    ? Math.max(0, Math.ceil((nextSession.dateDebut.getTime() - Date.now()) / (24 * 60 * 60 * 1000)))
    : null

  const broadcasts: BroadcastBannerItem[] = inbox
    .filter((md) => !md.lu && md.message.formationId)
    .slice(0, 3)
    .map((md) => ({
      messageId: md.messageId,
      title: md.message.sujet || "Nouveau message",
      text: md.message.contenu,
      isDocument: Boolean(md.message.documentId),
    }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <BroadcastBanner items={broadcasts} />

      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(26px,3vw,36px)", fontWeight: 800, margin: "0 0 4px" }}>
          Bonjour {name.split(" ")[0]}
        </h1>
        <p style={{ color: colors.textLight, fontSize: 14, margin: 0 }}>Voici un aperçu de votre parcours de formation.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
        <StatCard
          iconBg="#eef2f9"
          iconColor={colors.navy}
          value={validees.length}
          label="Formation(s) validée(s)"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          }
        />
        <StatCard
          iconBg="#fdeceb"
          iconColor={colors.red}
          value={joursAvantProchaine !== null ? `J-${joursAvantProchaine}` : "—"}
          label="Avant la prochaine session"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
        <StatCard
          iconBg="#faf4e6"
          iconColor={colors.gold}
          value={docsASigner}
          label="Document(s) à signer"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          }
        />
        <StatCard
          iconBg="#eef2f9"
          iconColor={colors.navy}
          value={trajetsPourMesFormations.length}
          label="Trajet(s) covoiturage proposé(s)"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17l1.5-6.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 17M7 9V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
            </svg>
          }
        />
      </div>

      <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 20px rgba(20,33,61,0.06)", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 20, fontWeight: 800, margin: 0 }}>Mes formations</h2>
          <Link href="/dashboard/formations" style={{ background: "transparent", border: "none", color: colors.red, fontSize: 13, fontWeight: 700, fontFamily: fontBody, textDecoration: "none" }}>
            Voir tout
          </Link>
        </div>

        {inscriptions.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <p style={{ color: colors.textMuted, fontSize: 14, margin: 0 }}>
              Vous n&apos;êtes inscrit à aucune formation pour le moment.
            </p>
            <Link
              href="/formations"
              style={{ background: colors.red, color: "#fff", padding: "11px 22px", borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: "none" }}
            >
              Découvrir les formations
            </Link>
          </div>
        ) : (
          inscriptions.slice(0, 4).map((i) => (
            <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, borderRadius: 10, background: "#f5f7fb", flexWrap: "wrap" }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: colors.navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: colors.text }}>{i.formation.titre}</span>
                <span style={{ fontSize: 12, color: colors.textLight }}>
                  {CATEGORIE_LABELS[i.formation.categorie]} · Inscrit le {dateFormatter.format(i.createdAt)}
                </span>
              </div>
              <span
                style={{
                  background: i.statut === "VALIDEE" ? colors.gold : i.statut === "REFUSEE" ? "#e2e5ea" : "#f5f7fb",
                  color: i.statut === "VALIDEE" ? colors.navy : colors.textLight,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: 20,
                  whiteSpace: "nowrap",
                }}
              >
                {i.statut === "VALIDEE" ? "Validée" : i.statut === "REFUSEE" ? "Refusée" : "En attente"}
              </span>
            </div>
          ))
        )}
      </div>

      {trajetsPourMesFormations.length > 0 && (
        <div
          style={{
            background: `linear-gradient(135deg,${colors.navy},#234a86)`,
            borderRadius: 14,
            padding: 24,
            color: "#fff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 20,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2">
                <path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17l1.5-6.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 17M7 9V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
              </svg>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>
                {trajetsPourMesFormations[0].destination} le {dateFormatter.format(trajetsPourMesFormations[0].dateDepart)}
              </span>
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)" }}>
                {trajetsPourMesFormations.length} trajet(s) proposé(s) pour vos formations
              </span>
            </div>
          </div>
          <Link
            href="/dashboard/covoiturage"
            style={{ background: colors.gold, color: colors.navy, border: "none", padding: "11px 20px", borderRadius: 20, fontSize: 13, fontWeight: 700, fontFamily: fontBody, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Voir les trajets
          </Link>
        </div>
      )}
    </div>
  )
}
