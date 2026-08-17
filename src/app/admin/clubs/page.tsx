import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth/guards"
import { ImportClubsForm } from "@/components/admin/ImportClubsForm"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminClubsPage() {
  await requireAdmin()

  const [count, lastImport] = await Promise.all([
    prisma.club.count(),
    prisma.club.findFirst({ orderBy: { updatedAt: "desc" }, select: { updatedAt: true } }),
  ])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Annuaire des clubs
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Import de l&apos;export LGEF (nom, adresse, numéro d&apos;affiliation, email officiel) — utilisé pour
          pré-remplir automatiquement l&apos;adresse du club d&apos;accueil à l&apos;import des stagiaires d&apos;une
          formation.
        </p>
      </div>

      <ImportClubsForm />

      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: "16px 18px", fontSize: 13, color: colors.text }}>
        {count} club{count > 1 ? "s" : ""} dans l&apos;annuaire
        {lastImport && ` · dernier import le ${lastImport.updatedAt.toLocaleDateString("fr-FR")}`}
      </div>
    </div>
  )
}
