import { notFound } from "next/navigation"
import Link from "next/link"
import { getFormationTutorielsInscription } from "@/lib/admin/formations"
import { TutorielInscriptionManager } from "@/components/admin/TutorielInscriptionManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function FormationTutorielsInscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getFormationTutorielsInscription(id)
  if (!data) notFound()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Tutoriels d&apos;inscription — {data.titre}
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Les liens d&apos;aide affichés sous les boutons d&apos;inscription de cette formation (mode «
          Portail FFF » uniquement).{" "}
          <Link href={`/admin/formations/${id}`} style={{ color: colors.navy, fontWeight: 700 }}>
            ← Retour à la formation
          </Link>
        </p>
      </div>

      <TutorielInscriptionManager formationId={id} items={data.tutoriels} />
    </div>
  )
}
