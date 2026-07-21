import { notFound } from "next/navigation"
import Link from "next/link"
import { getFormationConventionSuivi } from "@/lib/admin/conventions"
import { ImportStagiairesForm } from "@/components/admin/ImportStagiairesForm"
import { EnvoyerConventionsButton } from "@/components/admin/EnvoyerConventionsButton"
import { ConventionSuiviTable, type ConventionSuiviRow } from "@/components/admin/ConventionSuiviTable"
import { colors, fontHeading } from "@/lib/theme"

export default async function FormationConventionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const formation = await getFormationConventionSuivi(id)
  if (!formation) notFound()

  const rows: ConventionSuiviRow[] = formation.conventionStagiaires.map((s) => ({
    id: s.id,
    nom: s.nom,
    prenom: s.prenom,
    club: s.club,
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

  const missingResponsablePedagogique = !formation.responsablePedagogiqueEmail

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Conventions de stage — {formation.titre}
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Importez les stagiaires, puis générez et envoyez leur convention de stage pour signature.
        </p>
      </div>

      {!formation.conventionTemplateId && (
        <div style={{ background: "#fdeceb", border: "1px solid #f3c6cb", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: colors.red }}>
          Aucun modèle de convention associé à cette formation.{" "}
          <Link href={`/admin/formations/${id}`} style={{ color: colors.red, fontWeight: 700 }}>
            Associer un modèle
          </Link>
          .
        </div>
      )}
      {missingResponsablePedagogique && (
        <div style={{ background: "#faf4e6", border: "1px solid #e9d9a8", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#7a6423" }}>
          Responsable pédagogique non renseigné pour cette formation.{" "}
          <Link href={`/admin/formations/${id}`} style={{ color: "#7a6423", fontWeight: 700 }}>
            Compléter
          </Link>
          .
        </div>
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

      <ImportStagiairesForm formationId={id} />

      <EnvoyerConventionsButton formationId={id} />

      <ConventionSuiviTable rows={rows} />
    </div>
  )
}
