import {
  getAllDocumentsPasserelle,
  getAllPartenaires,
  getAllContacts,
  getAllVideos,
  getAllWebinaires,
} from "@/lib/admin/emploi"
import { EmploiManager } from "@/components/admin/EmploiManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function AdminEmploiPage() {
  const [documents, partenaires, contacts, videos, webinairesRaw] = await Promise.all([
    getAllDocumentsPasserelle(),
    getAllPartenaires(),
    getAllContacts(),
    getAllVideos(),
    getAllWebinaires(),
  ])

  const webinaires = webinairesRaw.map((w) => ({ ...w, date: w.date.toISOString() }))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
          Emploi
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Documents passerelles, partenaires, contacts, vidéos et webinaires affichés sur la page publique /emploi.
        </p>
      </div>

      <EmploiManager
        documents={documents}
        partenaires={partenaires}
        contacts={contacts}
        videos={videos}
        webinaires={webinaires}
      />
    </div>
  )
}
