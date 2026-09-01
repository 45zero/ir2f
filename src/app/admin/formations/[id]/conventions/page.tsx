import { notFound } from "next/navigation"
import Link from "next/link"
import { getFormationSessionsConventionSuivi } from "@/lib/admin/conventions"
import { colors, fontHeading, fontBody } from "@/lib/theme"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" })

export default async function FormationConventionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const formation = await getFormationSessionsConventionSuivi(id)
  if (!formation) notFound()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Conventions de stage — {formation.titre}
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Chaque session a son propre modèle de convention, son responsable pédagogique et ses stagiaires. Gérez les
          dates/lieu/modèle/responsable de chaque session depuis{" "}
          <Link href={`/admin/formations/${id}`} style={{ color: colors.navy, fontWeight: 700 }}>
            la fiche formation
          </Link>
          .
        </p>
      </div>

      {formation.sessions.length === 0 ? (
        <div style={{ background: "#f5f7fb", border: "1px solid #e4e9f2", borderRadius: 10, padding: 20, color: colors.textMuted, fontSize: 13 }}>
          Aucune session pour cette formation.{" "}
          <Link href={`/admin/formations/${id}`} style={{ color: colors.navy, fontWeight: 700 }}>
            En ajouter une
          </Link>
          .
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {formation.sessions.map((session) => {
            const signataireCount = session._count.conventionStagiaires
            return (
              <Link
                key={session.id}
                href={`/admin/formations/${id}/conventions/${session.id}`}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  background: "#fff",
                  border: "1px solid #eef0f3",
                  borderRadius: 10,
                  padding: "16px 18px",
                  textDecoration: "none",
                }}
              >
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: colors.navy, fontFamily: fontBody }}>
                    {dateFormatter.format(session.dateDebut)}
                    {session.lieu ? ` — ${session.lieu}` : ""}
                  </span>
                  <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                    {!session.conventionTemplateId && (
                      <span style={{ fontSize: 11.5, color: colors.red, background: "#fdeceb", padding: "3px 9px", borderRadius: 12, fontWeight: 700 }}>
                        Modèle manquant
                      </span>
                    )}
                    {!session.responsablePedagogiqueUserId ? (
                      <span style={{ fontSize: 11.5, color: "#7a6423", background: "#faf4e6", padding: "3px 9px", borderRadius: 12, fontWeight: 700 }}>
                        Responsable pédagogique manquant
                      </span>
                    ) : !session.responsablePedagogiqueSignatureSignedAt ? (
                      <span style={{ fontSize: 11.5, color: "#7a6423", background: "#faf4e6", padding: "3px 9px", borderRadius: 12, fontWeight: 700 }}>
                        {session.responsablePedagogiqueUser?.prenom} {session.responsablePedagogiqueUser?.nom} — signature en attente
                      </span>
                    ) : (
                      <span style={{ fontSize: 11.5, color: "#1a6b3a", background: "#e6f4ea", padding: "3px 9px", borderRadius: 12, fontWeight: 700 }}>
                        {session.responsablePedagogiqueUser?.prenom} {session.responsablePedagogiqueUser?.nom} — signé
                      </span>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: 12.5, color: colors.textMuted, fontFamily: fontBody }}>
                  {signataireCount} stagiaire{signataireCount > 1 ? "s" : ""}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
