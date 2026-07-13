import { colors, fontBody } from "@/lib/theme"

export type FormateurAlert = {
  id: string
  from: string
  contenu: string
  isAdmin: boolean
  lu: boolean
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function FormateurAlertsList({ alerts }: { alerts: FormateurAlert[] }) {
  if (alerts.length === 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20, color: colors.textLight, fontSize: 13 }}>
        Aucune alerte pour le moment.
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {alerts.map((a) => (
        <div
          key={a.id}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: "12px 0",
            borderBottom: "1px solid #eef0f3",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: a.isAdmin ? colors.navy : colors.gold,
              color: a.isAdmin ? "#fff" : colors.navy,
              fontSize: 11,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontFamily: fontBody,
            }}
          >
            {initialsOf(a.from)}
          </div>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 13.5, fontWeight: a.lu ? 600 : 800, color: colors.text }}>{a.from}</span>
            <span style={{ fontSize: 12.5, color: colors.textLight }}>{a.contenu}</span>
          </div>
          {a.isAdmin && (
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: colors.navy,
                background: "#eef2f9",
                padding: "4px 9px",
                borderRadius: 12,
                whiteSpace: "nowrap",
              }}
            >
              Admin
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
