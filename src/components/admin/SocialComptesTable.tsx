"use client"

import { useActionState } from "react"
import Link from "next/link"
import { setSocialCompteActif, deleteSocialCompte } from "@/lib/actions/social-comptes"
import { colors, fontBody } from "@/lib/theme"
import type { ReseauSocialPlateforme } from "@/generated/prisma"

export type AdminSocialCompteRow = {
  id: string
  label: string
  plateforme: ReseauSocialPlateforme
  externalId: string
  actif: boolean
}

const PLATEFORME_LABELS: Record<ReseauSocialPlateforme, string> = { FACEBOOK: "Facebook", INSTAGRAM: "Instagram" }

export function SocialComptesTable({ comptes }: { comptes: AdminSocialCompteRow[] }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, overflow: "hidden" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1.4fr 1.4fr",
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
        <span>Label</span>
        <span>Plateforme</span>
        <span>Identifiant</span>
        <span>Actions</span>
      </div>

      {comptes.length === 0 && <div style={{ padding: 24, color: colors.textLight, fontSize: 13 }}>Aucun compte connecté.</div>}

      {comptes.map((c) => (
        <CompteRow key={c.id} compte={c} />
      ))}
    </div>
  )
}

function CompteRow({ compte }: { compte: AdminSocialCompteRow }) {
  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prev: { error: string | null } | undefined) => deleteSocialCompte(compte.id),
    undefined
  )

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1.4fr 1.4fr",
        gap: 12,
        padding: "14px 18px",
        borderTop: "1px solid #eef0f3",
        alignItems: "center",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
        <span style={{ fontWeight: 700, color: colors.text }}>{compte.label}</span>
        <span
          style={{
            display: "inline-flex",
            background: compte.actif ? colors.gold : "#e2e5ea",
            color: compte.actif ? colors.navy : colors.textLight,
            fontSize: 10.5,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 12,
          }}
        >
          {compte.actif ? "Actif" : "Inactif"}
        </span>
      </div>
      <span style={{ color: colors.textMuted }}>{PLATEFORME_LABELS[compte.plateforme]}</span>
      <span style={{ color: colors.textLight, fontSize: 12, wordBreak: "break-all" }}>{compte.externalId}</span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Link href={`/admin/reseaux-sociaux/${compte.id}`} style={{ color: colors.navy, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
          Modifier
        </Link>
        <form action={() => setSocialCompteActif(compte.id, !compte.actif)}>
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
            {compte.actif ? "Désactiver" : "Activer"}
          </button>
        </form>
        <form
          action={deleteAction}
          onSubmit={(e) => {
            if (!confirm(`Supprimer « ${compte.label} » ?`)) e.preventDefault()
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
        {deleteState?.error && <span style={{ color: colors.red, fontSize: 11, width: "100%" }}>{deleteState.error}</span>}
      </div>
    </div>
  )
}
