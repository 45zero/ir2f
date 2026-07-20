import { createFormation } from "@/lib/actions/formations"
import { getFormateurUsers } from "@/lib/admin/users"
import { getConventionTemplatesForSelect } from "@/lib/admin/conventions"
import { FormationForm } from "@/components/admin/FormationForm"
import { colors, fontHeading } from "@/lib/theme"

export default async function NewFormationPage() {
  const [formateurUsers, conventionTemplates] = await Promise.all([getFormateurUsers(), getConventionTemplatesForSelect()])
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Nouvelle formation
      </h1>
      <FormationForm
        action={createFormation}
        submitLabel="Créer la formation"
        formateurUsers={formateurUsers}
        conventionTemplates={conventionTemplates}
      />
    </div>
  )
}
