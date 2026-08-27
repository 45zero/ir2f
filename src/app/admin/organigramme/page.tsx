import { getOrganigramme } from "@/lib/organigramme"
import { OrganigrammeManager } from "@/components/admin/OrganigrammeManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminOrganigrammePage() {
  const organigramme = await getOrganigramme()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Organigramme
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          PDF affiché en pièce jointe sur la page Contact, sous « Je souhaite être contacté ».
        </p>
      </div>

      <OrganigrammeManager current={organigramme ? { nom: organigramme.nom, url: organigramme.url } : null} />
    </div>
  )
}
