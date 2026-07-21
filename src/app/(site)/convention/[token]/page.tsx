import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getSignedDocumentUrl } from "@/lib/storage"
import { ConventionSignForm } from "@/components/convention/ConventionSignForm"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { RoleSignataire, StatutSignature } from "@/generated/prisma"

const ROLE_LABELS: Record<RoleSignataire, string> = {
  STAGIAIRE: "stagiaire",
  CLUB: "représentant du club",
  TUTEUR: "tuteur",
  MAITRE_DE_STAGE: "maître de stage",
  RESPONSABLE_PEDAGOGIQUE: "responsable pédagogique",
}

const STATUT_MESSAGE: Partial<Record<StatutSignature, string>> = {
  SIGNE: "Vous avez déjà signé cette convention. Merci.",
  REFUSE: "Vous avez refusé cette convention. Contactez l'administrateur IR2F si besoin.",
  NON_ENVOYE: "Ce n'est pas encore votre tour de signer — vous recevrez un email dès que la convention sera prête pour vous.",
}

export default async function ConventionSignPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const signataire = await prisma.conventionSignataire.findUnique({
    where: { token },
    include: { conventionStagiaire: { include: { formation: { select: { titre: true } } } } },
  })
  if (!signataire) notFound()

  const stagiaire = signataire.conventionStagiaire
  const documentUrl = stagiaire.pdfStoragePath ? await getSignedDocumentUrl(stagiaire.pdfStoragePath) : null
  const blockedMessage = STATUT_MESSAGE[signataire.statut]

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 80px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 24, fontWeight: 800, margin: 0 }}>
          Convention de stage — {stagiaire.formation.titre}
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "6px 0 0" }}>
          Stagiaire : {stagiaire.prenom} {stagiaire.nom} · Vous signez en tant que{" "}
          <strong>{ROLE_LABELS[signataire.role]}</strong>.
        </p>
      </div>

      {documentUrl ? (
        <a
          href={documentUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            alignSelf: "flex-start",
            background: "#f5f7fb",
            border: "1px solid #e4e9f2",
            color: colors.navy,
            padding: "10px 18px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: fontBody,
            textDecoration: "none",
          }}
        >
          Consulter la convention (PDF)
        </a>
      ) : (
        <p style={{ color: colors.textLight, fontSize: 13 }}>Document indisponible pour le moment.</p>
      )}

      {blockedMessage ? (
        <div style={{ background: "#f5f7fb", border: "1px solid #e4e9f2", borderRadius: 10, padding: 20, color: colors.textMuted, fontSize: 14 }}>
          {blockedMessage}
        </div>
      ) : (
        <ConventionSignForm token={token} role={signataire.role} />
      )}
    </div>
  )
}
