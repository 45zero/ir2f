import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar"
import { AdminSideNav } from "@/components/admin/AdminSideNav"
import { colors } from "@/lib/theme"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")
  if (session.user.role !== "ADMIN") redirect("/dashboard")

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
          <AdminSideNav />
          <div style={{ flex: "1 1 700px", minWidth: 280 }}>{children}</div>
        </div>
      </main>
    </div>
  )
}
