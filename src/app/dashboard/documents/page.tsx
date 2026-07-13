import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getMesDocuments } from "@/lib/documents"
import { getFormationOptions } from "@/lib/formations"
import { DocumentsManager, type DashboardDocument } from "@/components/dashboard/DocumentsManager"
import { colors, fontHeading } from "@/lib/theme"

export default async function DashboardDocumentsPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  if (session.user.role === "FORMATEUR") redirect("/dashboard")

  const [documents, formations] = await Promise.all([
    getMesDocuments(session.user.id),
    getFormationOptions(),
  ])

  const rows: DashboardDocument[] = documents
    .map((d) => ({
      id: d.id,
      nom: d.nom,
      url: d.url,
      public: d.public,
      createdAt: d.createdAt.toISOString(),
      formationTitre: d.formation?.titre ?? null,
      uploaderNom: `${d.uploader.prenom} ${d.uploader.nom}`,
      isMine: d.uploaderId === session.user.id,
      isSigned: d.signatures.length > 0,
    }))
    .sort((a, b) => Number(a.isSigned) - Number(b.isSigned))

  const unsignedCount = rows.filter((d) => !d.isSigned).length

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
            Documents
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            Vos documents et ceux partagés par les autres membres.
          </p>
        </div>
        {unsignedCount > 0 && (
          <span
            style={{
              background: "#fdeceb",
              color: colors.red,
              fontSize: 12,
              fontWeight: 700,
              padding: "7px 14px",
              borderRadius: 16,
            }}
          >
            {unsignedCount} document(s) à signer
          </span>
        )}
      </div>
      <DocumentsManager documents={rows} formations={formations} />
    </div>
  )
}
