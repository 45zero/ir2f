import { SocialCompteForm } from "@/components/admin/SocialCompteForm"
import { colors, fontHeading } from "@/lib/theme"

export default function NewSocialComptePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Connecter un compte
      </h1>
      <SocialCompteForm submitLabel="Connecter le compte" />
    </div>
  )
}
