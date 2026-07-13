import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getFormateurAlerts } from "@/lib/formateur"
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar"
import { DashboardSideNav } from "@/components/dashboard/DashboardSideNav"
import { colors } from "@/lib/theme"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const formateurAlertsCount =
    session.user.role === "FORMATEUR"
      ? (await getFormateurAlerts(session.user.id)).filter((a) => !a.lu).length
      : 0

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: "'Inter', sans-serif",
        color: colors.text,
      }}
    >
      <DashboardTopBar user={session.user} />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px 64px" }}>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <DashboardSideNav role={session.user.role} name={session.user.name} formateurAlertsCount={formateurAlertsCount} />
          <div style={{ flex: "1 1 700px", minWidth: 280 }}>{children}</div>
        </div>
      </main>
    </div>
  )
}
