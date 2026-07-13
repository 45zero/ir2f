import { colors, fontHeading } from "@/lib/theme"

export function StatCard({
  iconBg,
  iconColor,
  value,
  label,
  icon,
}: {
  iconBg: string
  iconColor: string
  value: string | number
  label: string
  icon: React.ReactNode
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: "0 4px 20px rgba(20,33,61,0.06)",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: iconBg,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div>
        <span style={{ display: "block", fontFamily: fontHeading, fontSize: 28, fontWeight: 800, color: colors.navy }}>
          {value}
        </span>
        <span style={{ fontSize: 12.5, color: colors.textLight, fontWeight: 600 }}>{label}</span>
      </div>
    </div>
  )
}
