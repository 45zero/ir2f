import { getTutorielsInscription } from "@/lib/tutoriel-inscription"
import { TutorielInscriptionManager } from "@/components/admin/TutorielInscriptionManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminTutorielsInscriptionPage() {
  const items = await getTutorielsInscription()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Tutoriels d&apos;inscription
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Les liens d&apos;aide affichés sous les boutons d&apos;inscription des formations FFF.
        </p>
      </div>

      <TutorielInscriptionManager items={items} />
    </div>
  )
}
