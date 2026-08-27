import {
  getAllDocumentsPasserelle,
  getAllPartenaires,
  getAllContacts,
  getAllVideos,
  getAllWebinaires,
  getAllDispositifsFinancement,
  getAllPratiqueCards,
  getEmploiPageContenu,
  getGestionEmploiContenu,
  getFormationEmployabiliteContenu,
} from "@/lib/admin/emploi"
import { EmploiManager } from "@/components/admin/EmploiManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminEmploiPage() {
  const [
    documents,
    partenaires,
    contacts,
    videos,
    webinairesRaw,
    dispositifs,
    pratiqueCards,
    pageContenuRow,
    gestionEmploiContenuRow,
    formationEmployabiliteContenuRow,
  ] = await Promise.all([
    getAllDocumentsPasserelle(),
    getAllPartenaires(),
    getAllContacts(),
    getAllVideos(),
    getAllWebinaires(),
    getAllDispositifsFinancement(),
    getAllPratiqueCards(),
    getEmploiPageContenu(),
    getGestionEmploiContenu(),
    getFormationEmployabiliteContenu(),
  ])

  const webinaires = webinairesRaw.map((w) => ({ ...w, date: w.date.toISOString() }))

  const pageContenu = pageContenuRow ?? { introTexte: "", introListe: "", videoCommunauteUrl: null, videoCommunauteFichierUrl: null }
  const gestionEmploiContenu = gestionEmploiContenuRow ?? {
    eLearningTitre: null,
    eLearningTexte: null,
    eLearningLienLabel: null,
    eLearningLienUrl: null,
    creerEmploiTexte: "",
    creerEmploiLienLabel: null,
    creerEmploiLienUrl: null,
    communauteTitre: null,
    communauteTexte: null,
    communauteVideoUrl: null,
    communauteVideoFichierUrl: null,
    communauteLienEnSavoirPlusUrl: null,
    communauteLienRejoindreUrl: null,
  }
  const formationEmployabiliteContenu = formationEmployabiliteContenuRow ?? { introTexte: null, indicateursNote: null }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Emploi
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Dispositifs de financement, documents, partenaires, contacts, vidéos, webinaires et contenus affichés sur la page publique
          /emploi.
        </p>
      </div>

      <EmploiManager
        documents={documents}
        partenaires={partenaires}
        contacts={contacts}
        videos={videos}
        webinaires={webinaires}
        dispositifs={dispositifs}
        pratiqueCards={pratiqueCards}
        pageContenu={pageContenu}
        gestionEmploiContenu={gestionEmploiContenu}
        formationEmployabiliteContenu={formationEmployabiliteContenu}
      />
    </div>
  )
}
