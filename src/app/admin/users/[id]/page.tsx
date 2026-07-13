import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"
import { getUserForEdit } from "@/lib/admin/users"
import { EditUserForm, type EditableUser } from "@/components/admin/EditUserForm"
import { colors, fontHeading } from "@/lib/theme"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await getUserForEdit(id)
  if (!user) notFound()

  const editable: EditableUser = {
    id: user.id,
    email: user.email,
    nom: user.nom,
    prenom: user.prenom,
    telephone: user.telephone ?? "",
    role: user.role,
    actif: user.actif,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Modifier l&apos;utilisateur
      </h1>
      <EditUserForm user={editable} isSelf={session.user.id === user.id} />
    </div>
  )
}
