import {
  getAllHeroSlides,
  getAllStatsCles,
  getAllAccompagnementCards,
  getAccueilContenuAdmin,
} from "@/lib/admin/accueil"
import { getFormationOptions } from "@/lib/formations"
import { AccueilManager } from "@/components/admin/AccueilManager"
import { HoverLink } from "@/components/ui/HoverLink"
import { colors, fontHeading } from "@/lib/theme"

const CONTENU_DEFAUT = {
  bandeauEmploiTitre: "Je souhaite être accompagné sur l'emploi",
  accompagnementEyebrow: "IR2F vous accompagne",
  accompagnementTitre: "Accompagnement Emploi",
  contactTitre: "Je souhaite être contacté",
  contactSousTitre: "Un conseiller IR2F revient vers vous sous 48h.",
}

export default async function AdminAccueilPage() {
  const [heroSlides, statsCles, accompagnementCards, contenu, formationOptions] = await Promise.all([
    getAllHeroSlides(),
    getAllStatsCles(),
    getAllAccompagnementCards(),
    getAccueilContenuAdmin(),
    getFormationOptions(),
  ])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
            Page d&apos;accueil
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            Tout ce qui s&apos;affiche sur la page d&apos;accueil publique, dans l&apos;ordre où ça apparaît.
          </p>
        </div>
        <HoverLink
          href="/"
          target="_blank"
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: colors.navy,
            textDecoration: "none",
            border: "1.5px solid #d8dde5",
            borderRadius: 20,
            padding: "9px 16px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          hoverStyle={{ borderColor: colors.navy }}
        >
          Voir la page d&apos;accueil ↗
        </HoverLink>
      </div>

      <AccueilManager
        heroSlides={heroSlides}
        formationOptions={formationOptions}
        contenu={contenu ?? CONTENU_DEFAUT}
        accompagnementCards={accompagnementCards}
        statsCles={statsCles}
      />
    </div>
  )
}
