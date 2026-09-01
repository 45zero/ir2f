import { notFound } from "next/navigation"
import Link from "next/link"
import { getSessionConventionSuivi } from "@/lib/admin/conventions"
import { getSignedDocumentUrl, getSignedDocumentDownloadUrl } from "@/lib/storage"
import { ImportStagiairesForm } from "@/components/admin/ImportStagiairesForm"
import { EnvoyerConventionsButton } from "@/components/admin/EnvoyerConventionsButton"
import { EnvoyerSignatureResponsablePedagogiqueButton } from "@/components/admin/EnvoyerSignatureResponsablePedagogiqueButton"
import { ConventionsZipActions } from "@/components/admin/ConventionsZipActions"
import { ConventionSuiviTable, type ConventionSuiviRow } from "@/components/admin/ConventionSuiviTable"
import { colors, fontHeading } from "@/lib/theme"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" })

export default async function SessionConventionsPage({ params }: { params: Promise<{ id: string; sessionId: string }> }) {
  const { id, sessionId } = await params
  const session = await getSessionConventionSuivi(sessionId)
  if (!session || session.formationId !== id) notFound()

  const rows: ConventionSuiviRow[] = await Promise.all(
    session.conventionStagiaires.map(async (s) => ({
      id: s.id,
      nom: s.nom,
      prenom: s.prenom,
      club: s.club,
      pdfViewUrl: s.pdfStoragePath ? await getSignedDocumentUrl(s.pdfStoragePath) : null,
      pdfDownloadUrl: s.pdfStoragePath
        ? await getSignedDocumentDownloadUrl(s.pdfStoragePath, `Convention - ${s.prenom} ${s.nom}.pdf`)
        : null,
      signataires: s.signataires.map((sig) => ({
        id: sig.id,
        role: sig.role,
        statut: sig.statut,
        motifRefus: sig.motifRefus,
        signedAt: sig.signedAt?.toISOString() ?? null,
        ipAddress: sig.ipAddress,
        token: sig.token,
        nom: sig.nom,
        dernierRenvoiPar: sig.dernierRenvoiPar,
        dernierRenvoiCanal: sig.dernierRenvoiCanal,
        dernierRenvoiAt: sig.dernierRenvoiAt?.toISOString() ?? null,
      })),
    }))
  )

  const generatedCount = session.conventionStagiaires.filter((s) => s.pdfStoragePath).length
  const unsignedCount = session.conventionStagiaires.filter((s) => s.pdfStoragePath && !s.completedAt).length
  const missingResponsablePedagogique = !session.responsablePedagogiqueUserId

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <Link href={`/admin/formations/${id}/conventions`} style={{ color: colors.textMuted, fontSize: 12.5, fontWeight: 700 }}>
          ← Toutes les sessions
        </Link>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: "6px 0 0" }}>
          Conventions de stage — {session.formation.titre}
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Session du {dateFormatter.format(session.dateDebut)}
          {session.lieu ? ` — ${session.lieu}` : ""}. Importez les stagiaires de cette session, puis générez et
          envoyez leur convention de stage pour signature.
        </p>
      </div>

      {!session.conventionTemplateId && (
        <div style={{ background: "#fdeceb", border: "1px solid #f3c6cb", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: colors.red }}>
          Aucun modèle de convention associé à cette session.{" "}
          <Link href={`/admin/formations/${id}`} style={{ color: colors.red, fontWeight: 700 }}>
            Associer un modèle
          </Link>
          .
        </div>
      )}
      {missingResponsablePedagogique ? (
        <div style={{ background: "#faf4e6", border: "1px solid #e9d9a8", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#7a6423" }}>
          Responsable pédagogique non désigné pour cette session.{" "}
          <Link href={`/admin/formations/${id}`} style={{ color: "#7a6423", fontWeight: 700 }}>
            Compléter
          </Link>
          .
        </div>
      ) : (
        <EnvoyerSignatureResponsablePedagogiqueButton
          sessionId={sessionId}
          responsablePedagogiqueNom={session.responsablePedagogiqueUser ? `${session.responsablePedagogiqueUser.prenom} ${session.responsablePedagogiqueUser.nom}` : null}
          envoyeAt={session.responsablePedagogiqueSignatureEnvoyeAt?.toISOString() ?? null}
          signedAt={session.responsablePedagogiqueSignatureSignedAt?.toISOString() ?? null}
        />
      )}

      <details style={{ background: "#f5f7fb", border: "1px solid #e4e9f2", borderRadius: 10, padding: "12px 18px" }}>
        <summary style={{ fontSize: 12.5, fontWeight: 700, color: colors.navy, cursor: "pointer" }}>
          Format attendu du fichier Excel
        </summary>
        <p style={{ fontSize: 12, color: colors.textMuted, margin: "8px 0 0", lineHeight: 1.6 }}>
          Gabarit LGEF avec 2 lignes d&apos;en-tête puis les données à partir de la ligne 3, colonnes dans cet ordre :
          Nom du Club, Numéro d&apos;affiliation, Mail club/employeur, Civilité, Nom, Prénom, Date de naissance,
          Adresse, CP, Ville, Téléphone, Mail (stagiaire), Nom, Prénom, Mail (tuteur), Nom, Prénom, Adresse, CP,
          Ville, Mail (maître de stage).
        </p>
      </details>

      <ImportStagiairesForm sessionId={sessionId} />

      <EnvoyerConventionsButton sessionId={sessionId} />

      <ConventionsZipActions formationId={id} sessionId={sessionId} generatedCount={generatedCount} unsignedCount={unsignedCount} />

      <ConventionSuiviTable rows={rows} />
    </div>
  )
}
