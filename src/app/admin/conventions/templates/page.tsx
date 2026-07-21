import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { ConventionTemplateBuilder } from "@/components/admin/ConventionTemplateBuilder"
import { ConventionTemplateUploadForm } from "@/components/admin/ConventionTemplateUploadForm"
import { ConventionTemplatesList, type ConventionTemplateRow } from "@/components/admin/ConventionTemplatesList"
import { ALL_TEMPLATE_FIELD_NAMES } from "@/lib/conventions/variables"
import { colors, fontHeading } from "@/lib/theme"

export default async function ConventionTemplatesPage() {
  await requireAdmin()

  const templates = await prisma.conventionTemplate.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { formations: true } } },
  })

  const rows: ConventionTemplateRow[] = templates.map((t) => ({
    id: t.id,
    nom: t.nom,
    formationsCount: t._count.formations,
    createdAt: t.createdAt.toISOString(),
  }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Modèles de convention de stage
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Bibliothèque de modèles PDF réutilisables, à associer à une ou plusieurs formations.
        </p>
      </div>

      <div>
        <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 17, fontWeight: 800, margin: "0 0 8px" }}>
          Préparer un nouveau modèle depuis un PDF brut
        </h2>
        <ConventionTemplateBuilder />
      </div>

      <details style={{ background: "#f5f7fb", border: "1px solid #e4e9f2", borderRadius: 10, padding: "14px 18px" }}>
        <summary style={{ fontSize: 13, fontWeight: 700, color: colors.navy, cursor: "pointer" }}>
          Upload direct (le PDF a déjà des champs de formulaire remplissables)
        </summary>
        <div style={{ marginTop: 12 }}>
          <ConventionTemplateUploadForm />
        </div>
      </details>

      <details style={{ background: "#f5f7fb", border: "1px solid #e4e9f2", borderRadius: 10, padding: "14px 18px" }}>
        <summary style={{ fontSize: 13, fontWeight: 700, color: colors.navy, cursor: "pointer" }}>
          Variables attendues dans le PDF fillable
        </summary>
        <p style={{ fontSize: 12.5, color: colors.textMuted, margin: "10px 0" }}>
          Le PDF doit être créé (Word, LibreOffice ou Acrobat) avec des champs de formulaire portant
          exactement ces noms. Les 5 champs <code>signature_*</code> doivent rester vides — ils marquent
          l&apos;emplacement où chaque signature sera apposée.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ALL_TEMPLATE_FIELD_NAMES.map((name) => (
            <code
              key={name}
              style={{
                background: "#fff",
                border: "1px solid #e2e5ea",
                borderRadius: 4,
                padding: "3px 8px",
                fontSize: 11.5,
                color: colors.text,
              }}
            >
              {name}
            </code>
          ))}
        </div>
      </details>

      <ConventionTemplatesList templates={rows} />
    </div>
  )
}
