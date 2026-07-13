import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getCovoituragesDisponibles, getMesCovoiturages } from "@/lib/covoiturage"
import { getFormationOptions } from "@/lib/formations"
import {
  CovoiturageManager,
  type TrajetDisponible,
  type TrajetConduit,
  type TrajetRejoint,
} from "@/components/dashboard/CovoiturageManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function DashboardCovoiturachePage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  if (session.user.role === "FORMATEUR") redirect("/dashboard")
  const userId = session.user.id

  const [disponiblesRaw, { conduits: conduitsRaw, rejoints: rejointsRaw }, formations] = await Promise.all([
    getCovoituragesDisponibles(),
    getMesCovoiturages(userId),
    getFormationOptions(),
  ])

  const disponibles: TrajetDisponible[] = disponiblesRaw.map((t) => ({
    id: t.id,
    depart: t.depart,
    destination: t.destination,
    dateDepart: t.dateDepart.toISOString(),
    places: t.places,
    placesRestantes: Math.max(0, t.places - t.passagers.length),
    statut: t.statut,
    commentaire: t.commentaire,
    conducteurNom: `${t.conducteur.prenom} ${t.conducteur.nom}`,
    isConducteur: t.conducteurId === userId,
    dejaInscrit: t.passagers.some((p) => p.userId === userId),
  }))

  const conduits: TrajetConduit[] = conduitsRaw.map((t) => ({
    id: t.id,
    depart: t.depart,
    destination: t.destination,
    dateDepart: t.dateDepart.toISOString(),
    places: t.places,
    statut: t.statut,
    passagers: t.passagers.map((p) => `${p.user.prenom} ${p.user.nom}`),
  }))

  const rejoints: TrajetRejoint[] = rejointsRaw.map((t) => ({
    id: t.id,
    depart: t.depart,
    destination: t.destination,
    dateDepart: t.dateDepart.toISOString(),
    statut: t.statut,
    conducteurNom: `${t.conducteur.prenom} ${t.conducteur.nom}`,
  }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Covoiturage
      </h1>
      <CovoiturageManager disponibles={disponibles} conduits={conduits} rejoints={rejoints} formations={formations} />
    </div>
  )
}
