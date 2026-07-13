import { getFormateurFormations, getFormateurAlerts } from "@/lib/formateur"
import { FormateurAlertsList } from "@/components/dashboard/FormateurAlertsList"
import { StatCard } from "@/components/dashboard/StatCard"
import { colors, fontHeading } from "@/lib/theme"

export async function FormateurDashboardHome({ userId, name }: { userId: string; name: string }) {
  const [formations, alerts] = await Promise.all([getFormateurFormations(userId), getFormateurAlerts(userId)])
  const stagiairesSuivis = formations.reduce((acc, f) => acc + f.stagiaireCount, 0)
  const nouvellesAlertes = alerts.filter((a) => !a.lu).length

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: "clamp(26px,3vw,36px)", fontWeight: 800, margin: "0 0 4px" }}>
          Bonjour {name.split(" ")[0]}
        </h1>
        <p style={{ color: colors.textLight, fontSize: 14, margin: 0 }}>Voici les alertes et formations en cours.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
        <StatCard
          iconBg="#eef2f9"
          iconColor={colors.navy}
          value={formations.length}
          label="Formations en charge"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          }
        />
        <StatCard
          iconBg="#faf4e6"
          iconColor={colors.gold}
          value={stagiairesSuivis}
          label="Stagiaires suivis"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="7" r="4" />
              <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
              <circle cx="17" cy="7" r="3" />
              <path d="M22 21c0-2.8-1.8-5-4.5-5.8" />
            </svg>
          }
        />
        <StatCard
          iconBg="#fdeceb"
          iconColor={colors.red}
          value={nouvellesAlertes}
          label="Nouvelles alertes"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          }
        />
      </div>

      <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 20px rgba(20,33,61,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
        <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 18, fontWeight: 800, margin: 0 }}>Alertes récentes</h2>
        <FormateurAlertsList alerts={alerts.slice(0, 5)} />
      </div>
    </div>
  )
}
