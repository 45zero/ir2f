import { getDocumentationGroupes } from "@/lib/documentation"
import { DocumentationManager } from "@/components/admin/DocumentationManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminDocumentationPage() {
  const groupes = await getDocumentationGroupes()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Documentation
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Tarifs, CGV, dispositions d&apos;accessibilité, jurys de certification… les documents affichés sur la page
          publique /documentation, organisés par rubrique.
        </p>
      </div>

      <DocumentationManager groupes={groupes} />
    </div>
  )
}
