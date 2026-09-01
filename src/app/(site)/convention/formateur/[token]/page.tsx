import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ConventionFormationSignForm } from "@/components/convention/ConventionFormationSignForm"
import { colors, fontHeading } from "@/lib/theme"

export default async function ConventionFormationSignPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const session = await prisma.session.findUnique({
    where: { responsablePedagogiqueSignatureToken: token },
    select: { responsablePedagogiqueSignatureSignedAt: true, formation: { select: { titre: true } } },
  })
  if (!session) notFound()

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 80px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 24, fontWeight: 800, margin: 0 }}>
          Signature responsable pédagogique — {session.formation.titre}
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "6px 0 0" }}>
          Cette signature est unique pour cette session : elle sera appliquée automatiquement à la
          convention de chaque stagiaire de cette session, sans qu&apos;il soit nécessaire de la renouveler.
        </p>
      </div>

      {session.responsablePedagogiqueSignatureSignedAt ? (
        <div style={{ background: "#f5f7fb", border: "1px solid #e4e9f2", borderRadius: 10, padding: 20, color: colors.textMuted, fontSize: 14 }}>
          Vous avez déjà signé pour cette session. Merci.
        </div>
      ) : (
        <ConventionFormationSignForm token={token} />
      )}
    </div>
  )
}
