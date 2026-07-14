import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getMesInscriptions, getAllFormationsOverview } from "@/lib/dashboard"
import { getMesDocuments } from "@/lib/documents"
import { getCovoituragesDisponibles } from "@/lib/covoiturage"
import { getInbox } from "@/lib/messages"
import { getFormateurFormations, getFormationRosterForFormateur } from "@/lib/formateur"
import { FormationRosterAndBroadcast, type FormateurFormationRow } from "@/components/dashboard/FormationRosterAndBroadcast"
import {
  StagiaireFormationsManager,
  type StagiaireFormationCard,
  type StagiaireFormationDoc,
  type StagiaireFormationCovoit,
  type StagiaireFormationMessage,
} from "@/components/dashboard/StagiaireFormationsManager"
import { CATEGORIE_LABELS, STATUT_LABELS } from "@/lib/formations-shared"
import { colors, fontHeading } from "@/lib/theme"

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" })

export default async function DashboardFormationsPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const { role, id } = session.user

  if (role === "ADMIN") redirect("/admin/formations")

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, margin: 0 }}>
        {role === "FORMATEUR" ? "Mes formations" : "Formations"}
      </h1>
      {role === "FORMATEUR" ? (
        <FormateurFormationsView userId={id} />
      ) : role === "DIRECTION" ? (
        <FormationsApercu />
      ) : (
        <MesFormations userId={id} />
      )}
    </div>
  )
}

async function FormateurFormationsView({ userId }: { userId: string }) {
  const formations = await getFormateurFormations(userId)
  const rows: FormateurFormationRow[] = await Promise.all(
    formations.map(async (f) => {
      const roster = (await getFormationRosterForFormateur(f.id, userId)) ?? []
      return {
        id: f.id,
        titre: f.titre,
        lieu: f.lieu,
        dateLabel: f.nextSession ? dateFormatter.format(f.nextSession.dateDebut) : null,
        stagiaireCount: f.stagiaireCount,
        unsignedCount: f.unsignedCount,
        stagiaires: roster,
      }
    })
  )

  return <FormationRosterAndBroadcast formations={rows} />
}

async function MesFormations({ userId }: { userId: string }) {
  const [inscriptions, documentsRaw, covoituragesRaw, inboxRaw] = await Promise.all([
    getMesInscriptions(userId),
    getMesDocuments(userId, "STAGIAIRE"),
    getCovoituragesDisponibles(),
    getInbox(userId),
  ])

  const formations: StagiaireFormationCard[] = inscriptions.map((i) => ({
    id: i.formation.id,
    slug: i.formation.slug,
    titre: i.formation.titre,
    lieu: i.formation.lieu,
    categorie: i.formation.categorie,
    statut: i.statut,
  }))

  const now = Date.now()
  const documents: StagiaireFormationDoc[] = documentsRaw.map((d) => ({
    id: d.id,
    nom: d.nom,
    formationId: d.formationId,
    signed: d.signatures.some((s) => s.userId === userId),
    isNew: now - d.createdAt.getTime() < SEVEN_DAYS_MS,
  }))

  const covoiturages: StagiaireFormationCovoit[] = covoituragesRaw.map((c) => ({
    id: c.id,
    formationId: c.formationId,
    conducteurNom: `${c.conducteur.prenom} ${c.conducteur.nom}`,
    depart: c.depart,
    destination: c.destination,
    dateDepart: c.dateDepart.toISOString(),
    placesRestantes: Math.max(0, c.places - c.passagers.length),
  }))

  const messages: StagiaireFormationMessage[] = inboxRaw
    .filter((md) => md.message.formationId)
    .map((md) => ({
      id: md.messageId,
      formationId: md.message.formationId,
      from: `${md.message.expediteur.prenom} ${md.message.expediteur.nom}`,
      contenu: md.message.contenu,
    }))

  return (
    <StagiaireFormationsManager formations={formations} documents={documents} covoiturages={covoiturages} messages={messages} />
  )
}

async function FormationsApercu() {
  const formations = await getAllFormationsOverview()

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, overflow: "hidden" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 12,
          padding: "12px 18px",
          background: "#f5f7fb",
          fontSize: 11,
          fontWeight: 700,
          color: colors.navy,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        <span>Titre</span>
        <span>Catégorie</span>
        <span>Statut</span>
        <span>Inscriptions</span>
      </div>
      {formations.map((f) => (
        <div
          key={f.id}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 12,
            padding: "12px 18px",
            borderTop: "1px solid #eef0f3",
            fontSize: 13,
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 700, color: colors.text }}>{f.titre}</span>
          <span style={{ color: colors.textMuted }}>{CATEGORIE_LABELS[f.categorie]}</span>
          <span style={{ color: colors.textMuted }}>{STATUT_LABELS[f.statut]}</span>
          <span style={{ color: colors.textMuted }}>{f._count.inscriptions}</span>
        </div>
      ))}
    </div>
  )
}
