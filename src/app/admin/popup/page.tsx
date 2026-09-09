import { getAllPopups } from "@/lib/admin/popup"
import { PopupManager } from "@/components/admin/PopupManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminPopupPage() {
  const popups = await getAllPopups()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Pop-up d&apos;accueil
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          L&apos;édito du président et les annonces ponctuelles affichés à l&apos;arrivée sur le site.
        </p>
      </div>

      <PopupManager items={popups} />
    </div>
  )
}
