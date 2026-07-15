import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getMesDocuments } from "@/lib/documents"
import { getFormationOptions } from "@/lib/formations"
import { DocumentsManager, type DashboardDocument } from "@/components/dashboard/DocumentsManager"
import { ROLE_LABELS } from "@/lib/users-shared"
import { colors, fontHeading } from "@/lib/theme"
import type { Role } from "@/generated/prisma"

const ROLE_BADGE_ORDER: Role[] = ["FORMATEUR", "ADMIN", "DIRECTION"]

export default async function DashboardDocumentsPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  if (session.user.role === "FORMATEUR") redirect("/dashboard")

  const role = session.user.role as Role
  const [documents, formations] = await Promise.all([
    getMesDocuments(session.user.id, role),
    getFormationOptions(),
  ])

  const rows: DashboardDocument[] = documents
    .map((d) => {
      const relevantSignature =
        role === "STAGIAIRE"
          ? d.signatures.find((s) => s.userId === session.user.id)
          : d.signatures.find((s) => s.user.role === role)
      const isSignedByViewer = Boolean(relevantSignature)

      const roleStatus = ROLE_BADGE_ORDER.filter((r) => d.rolesRequis.includes(r)).map((r) => ({
        label: ROLE_LABELS[r],
        done: d.signatures.some((s) => s.user.role === r),
      }))

      return {
        id: d.id,
        nom: d.nom,
        url: d.resolvedUrl,
        downloadUrl: d.resolvedDownloadUrl,
        categorie: d.categorie,
        public: d.public,
        createdAt: d.createdAt.toISOString(),
        formationTitre: d.formation?.titre ?? null,
        uploaderNom: `${d.uploader.prenom} ${d.uploader.nom}`,
        isMine: d.uploaderId === session.user.id,
        requiresViewerSignature: d.rolesRequis.includes(role),
        isSignedByViewer,
        signedAt: relevantSignature ? relevantSignature.signedAt.toISOString() : null,
        signedByName:
          relevantSignature && relevantSignature.userId !== session.user.id
            ? `${relevantSignature.user.prenom} ${relevantSignature.user.nom}`
            : null,
        fullySigned: d.rolesRequis.length > 0 && d.fullySigned,
        roleStatus,
      }
    })
    .sort((a, b) => Number(a.isSignedByViewer) - Number(b.isSignedByViewer))

  const unsignedCount = rows.filter((d) => d.requiresViewerSignature && !d.isSignedByViewer).length

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
