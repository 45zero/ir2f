import { auth } from "@/auth"
import { Header, type HeaderUser } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { getFooterLogos } from "@/lib/home"
import { getActivePopups } from "@/lib/popup"
import { PopupGate } from "@/components/site/PopupGate"

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [session, footerLogos, popups] = await Promise.all([auth(), getFooterLogos(), getActivePopups()])
  const user: HeaderUser = session?.user
    ? { name: session.user.name, role: session.user.role }
    : null

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        color: "#14213d",
        background: "#f5f5f5",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Header user={user} />
      <div style={{ height: 68 }} />
      {children}
      <Footer logos={footerLogos} />
      <PopupGate
        popups={popups.map((p) => ({
          id: p.id,
          type: p.type,
          image: p.image,
          titre: p.titre,
          texte: p.texte,
          auteurNom: p.auteurNom,
          auteurFonction: p.auteurFonction,
          signatureUrl: p.signatureUrl,
          youtubeUrl: p.youtubeUrl,
          videoFichierUrl: p.videoFichierUrl,
          lienLabel: p.lienLabel,
          lienUrl: p.lienUrl,
          lienType: p.lienType,
          delaiAffichage: p.delaiAffichage,
        }))}
      />
    </div>
  )
}
