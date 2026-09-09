import { notFound } from "next/navigation"
import { getSocialCompteForEdit } from "@/lib/admin/social-comptes"
import { SocialCompteForm, type SocialCompteFormInitial } from "@/components/admin/SocialCompteForm"
import { colors, fontHeading } from "@/lib/theme"

export default async function EditSocialComptePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const compte = await getSocialCompteForEdit(id)
  if (!compte) notFound()

  const initial: SocialCompteFormInitial = {
    label: compte.label,
    plateforme: compte.plateforme,
    externalId: compte.externalId,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Modifier le compte
      </h1>
      <SocialCompteForm id={id} initial={initial} submitLabel="Enregistrer les modifications" />
    </div>
  )
}
