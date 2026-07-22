import { notFound } from "next/navigation"
import Link from "next/link"
import { getFormationDocuments } from "@/lib/admin/formations"
import { FormationDocumentsManager } from "@/components/admin/FormationDocumentsManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function FormationDocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getFormationDocuments(id)
  if (!data) notFound()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Documents utiles — {data.titre}
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Documents téléchargeables affichés dans le bloc « Documents utiles » de la fiche publique de la
          formation (fiche RNCP, fiche pédagogique, règlement, statistiques...).{" "}
          <Link href={`/admin/formations/${id}`} style={{ color: colors.navy, fontWeight: 700 }}>
            ← Retour à la formation
          </Link>
        </p>
      </div>

      <FormationDocumentsManager formationId={id} documents={data.documents} />
    </div>
  )
}
