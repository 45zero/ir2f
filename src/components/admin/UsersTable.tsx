"use client"

import { useMemo, useState, useActionState } from "react"
import Link from "next/link"
import { ROLE_LABELS } from "@/lib/users-shared"
import { setUserActif, deleteUser } from "@/lib/actions/users"
import { colors, fontBody } from "@/lib/theme"
import type { Role } from "@/generated/prisma"

export type AdminUserRow = {
  id: string
  email: string
  nom: string
  prenom: string
  telephone: string | null
  role: Role
  actif: boolean
}

const FILTERS: { value: "all" | Role; label: string }[] = [
  { value: "all", label: "Tous les rôles" },
  { value: "STAGIAIRE", label: "Stagiaire" },
  { value: "FORMATEUR", label: "Formateur" },
  { value: "ADMIN", label: "Administrateur" },
  { value: "DIRECTION", label: "Direction" },
]

const selectStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "9px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  color: colors.text,
  cursor: "pointer" as const,
}

export function UsersTable({ users, currentUserId }: { users: AdminUserRow[]; currentUserId: string }) {
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return users.filter((u) => {
      const matchRole = roleFilter === "all" || u.role === roleFilter
      const matchSearch =
        !q || u.email.toLowerCase().includes(q) || `${u.prenom} ${u.nom}`.toLowerCase().includes(q)
      return matchRole && matchSearch
    })
  }, [users, roleFilter, search])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou email..."
          style={{ ...selectStyle, flex: "1 1 260px", cursor: "text" }}
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)} style={selectStyle}>
          {FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1.6fr 1fr 0.8fr 1.4fr",
            gap: 12,
            padding: "12px 18px",
            background: "#f5f7fb",
            fontSize: 11,
            fontWeight: 700,
            color: colors.navy,
            textTransform: "uppercase",
            letterSpacing: 0.4,
          }}
        >
          <span>Nom</span>
          <span>Email</span>
          <span>Rôle</span>
          <span>Statut</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 24, color: colors.textLight, fontSize: 13 }}>Aucun utilisateur ne correspond.</div>
        )}

        {filtered.map((u) => (
          <UserRow key={u.id} user={u} isSelf={u.id === currentUserId} />
        ))}
      </div>
    </div>
  )
}

function UserRow({ user, isSelf }: { user: AdminUserRow; isSelf: boolean }) {
  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteUser(user.id),
    undefined
  )

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.8fr 1.6fr 1fr 0.8fr 1.4fr",
        gap: 12,
        padding: "14px 18px",
        borderTop: "1px solid #eef0f3",
        alignItems: "center",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: 700, color: colors.text }}>
          {user.prenom} {user.nom}
          {isSelf && <span style={{ color: colors.textLight, fontWeight: 600 }}> (vous)</span>}
        </span>
        <span style={{ fontSize: 11, color: colors.textLight }}>{user.telephone ?? "—"}</span>
      </div>
      <span style={{ color: colors.textMuted, wordBreak: "break-all" }}>{user.email}</span>
      <span style={{ color: colors.textMuted }}>{ROLE_LABELS[user.role]}</span>
      <span
        style={{
          display: "inline-flex",
          width: "fit-content",
          background: user.actif ? colors.gold : "#e2e5ea",
          color: user.actif ? colors.navy : colors.textLight,
          fontSize: 11,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 12,
        }}
      >
        {user.actif ? "Actif" : "Désactivé"}
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Link
          href={`/admin/users/${user.id}`}
          style={{ color: colors.navy, fontSize: 12, fontWeight: 700, textDecoration: "none" }}
        >
          Modifier
        </Link>
        {!isSelf && (
          <>
            <form action={() => setUserActif(user.id, !user.actif)}>
              <button
                type="submit"
                style={{
                  background: "transparent",
                  border: "1px solid #d8dde5",
                  color: colors.navy,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "5px 10px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: fontBody,
                }}
              >
                {user.actif ? "Désactiver" : "Activer"}
              </button>
            </form>
            <form
              action={deleteAction}
              onSubmit={(e) => {
                if (!confirm(`Supprimer le compte de ${user.prenom} ${user.nom} ? Cette action est irréversible.`)) {
                  e.preventDefault()
                }
              }}
            >
              <button
                type="submit"
                disabled={deletePending}
                style={{
                  background: "transparent",
                  border: "1px solid #f3c6cb",
                  color: colors.red,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "5px 10px",
                  borderRadius: 4,
                  cursor: deletePending ? "default" : "pointer",
                  fontFamily: fontBody,
                }}
              >
                Supprimer
              </button>
            </form>
          </>
        )}
        {deleteState?.error && <span style={{ color: colors.red, fontSize: 11, width: "100%" }}>{deleteState.error}</span>}
      </div>
    </div>
  )
}
