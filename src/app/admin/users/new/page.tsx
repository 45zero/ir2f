import { CreateUserForm } from "@/components/admin/CreateUserForm"
import { colors, fontHeading } from "@/lib/theme"

export default function NewUserPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 26, fontWeight: 800, margin: 0 }}>
        Nouvel utilisateur
      </h1>
      <CreateUserForm />
    </div>
  )
}
