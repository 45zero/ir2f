import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getAdminStats } from "@/lib/dashboard"
import { FormateurDashboardHome } from "@/components/dashboard/FormateurDashboardHome"
import { StagiaireDashboardHome } from "@/components/dashboard/StagiaireDashboardHome"
import { colors, fontHeading } from "@/lib/theme"

const ROLE_INTRO: Record<string, string> = {
  ADMIN: "Tableau de bord administrateur",
  DIRECTION: "Tableau de bord direction",
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const { role, name, id } = session.user

  if (role === "FORMATEUR") return <FormateurDashboardHome userId={id} name={name} />
  if (role === "STAGIAIRE") return <StagiaireDashboardHome userId={id} name={name} />

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h1
          style={{
            fontFamily: fontHeading,
            color: colors.navy,
            fontSize: "clamp(26px,3vw,34px)",
            fontWeight: 800,
            margin: 0,
          }}
        >
          Bonjour {name.split(" ")[0]}
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 14, margin: "6px 0 0" }}>
          {ROLE_INTRO[role] ?? "Tableau de bord"}
        </p>
      </div>

      <AdminDirectionView />
    </div>
  )
}

async function AdminDirectionView() {
  const stats = await getAdminStats()
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
      <StatCard label="Formations publiées" value={stats.formationsPubliees} />
      <StatCard label="Demandes en attente" value={stats.demandesEnAttente} />
      <StatCard label="Utilisateurs" value={stats.totalUsers} />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "#fff",
        borderTop: `3px solid ${colors.gold}`,
        borderRadius: 8,
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <span style={{ fontFamily: fontHeading, fontSize: 36, fontWeight: 800, color: colors.navy }}>{value}</span>
      <span style={{ fontSize: 13, color: colors.textLight, fontWeight: 600 }}>{label}</span>
    </div>
  )
}
