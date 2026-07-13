"use client"

import { useMemo, useState, useActionState } from "react"
import Link from "next/link"
import { CATEGORIE_LABELS, STATUT_LABELS } from "@/lib/formations-shared"
import { deleteFormation, setFormationStatut } from "@/lib/actions/formations"
import { colors, fontBody } from "@/lib/theme"
import type { CategorieFormation, StatutFormation } from "@/generated/prisma"

export type AdminFormationRow = {
  id: string
  slug: string
  titre: string
  categorie: CategorieFormation
  statut: StatutFormation
  cpfEligible: boolean
  ordre: number
  dureeLabel: string | null
}

const STATUT_COLORS: Record<StatutFormation, string> = {
  BROUILLON: "#8a93a3",
  PUBLIEE: colors.gold,
  ARCHIVEE: "#b7bfcc",
}

const FILTERS: { value: "all" | CategorieFormation; label: string }[] = [
  { value: "all", label: "Toutes catégories" },
  { value: "EDUCATEUR", label: "Éducateur" },
  { value: "ARBITRAGE", label: "Arbitrage" },
  { value: "TERRAIN", label: "Tout Terrain" },
  { value: "CLUB", label: "Club" },
  { value: "DEV", label: "Chargé de développement" },
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

export function FormationsTable({ formations }: { formations: AdminFormationRow[] }) {
  const [categoryFilter, setCategoryFilter] = useState<"all" | CategorieFormation>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return formations.filter((f) => {
      const matchCat = categoryFilter === "all" || f.categorie === categoryFilter
      const matchSearch = !search || f.titre.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [formations, categoryFilter, search])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une formation..."
          style={{ ...selectStyle, flex: "1 1 260px", cursor: "text" }}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)} style={selectStyle}>
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
            gridTemplateColumns: "2.2fr 1fr 1fr 0.6fr 1.6fr",
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
          <span>Titre</span>
          <span>Catégorie</span>
          <span>Statut</span>
          <span>CPF</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 24, color: colors.textLight, fontSize: 13 }}>Aucune formation ne correspond.</div>
        )}

        {filtered.map((f) => (
          <FormationRow key={f.id} formation={f} />
        ))}
      </div>
    </div>
  )
}

function FormationRow({ formation }: { formation: AdminFormationRow }) {
  const nextStatut: StatutFormation = formation.statut === "PUBLIEE" ? "ARCHIVEE" : "PUBLIEE"
  const toggleLabel = formation.statut === "PUBLIEE" ? "Archiver" : "Publier"

  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteFormation(formation.id),
    undefined
  )

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2.2fr 1fr 1fr 0.6fr 1.6fr",
        gap: 12,
        padding: "14px 18px",
        borderTop: "1px solid #eef0f3",
        alignItems: "center",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: 700, color: colors.text }}>{formation.titre}</span>
        <span style={{ fontSize: 11, color: colors.textLight }}>{formation.dureeLabel ?? "—"}</span>
      </div>
      <span style={{ color: colors.textMuted }}>{CATEGORIE_LABELS[formation.categorie]}</span>
      <span
        style={{
          display: "inline-flex",
          width: "fit-content",
          background: STATUT_COLORS[formation.statut],
          color: formation.statut === "PUBLIEE" ? colors.navy : "#fff",
          fontSize: 11,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 12,
        }}
      >
        {STATUT_LABELS[formation.statut]}
      </span>
      <span>{formation.cpfEligible ? "Oui" : "Non"}</span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Link
          href={`/admin/formations/${formation.id}`}
          style={{ color: colors.navy, fontSize: 12, fontWeight: 700, textDecoration: "none" }}
        >
          Modifier
        </Link>
        <Link
          href={`/formations/${formation.slug}`}
          target="_blank"
          style={{ color: colors.textLight, fontSize: 12, fontWeight: 700, textDecoration: "none" }}
        >
          Voir
        </Link>
        <form action={() => setFormationStatut(formation.id, nextStatut)}>
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
            {toggleLabel}
          </button>
        </form>
        <form
          action={deleteAction}
          onSubmit={(e) => {
            if (!confirm(`Supprimer « ${formation.titre} » ? Cette action est irréversible.`)) {
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
        {deleteState?.error && (
          <span style={{ color: colors.red, fontSize: 11, width: "100%" }}>{deleteState.error}</span>
        )}
      </div>
    </div>
  )
}
