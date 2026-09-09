"use client"

import { useActionState } from "react"
import { colors, fontBody } from "@/lib/theme"
import { createSocialCompte, updateSocialCompte, type SocialCompteActionState } from "@/lib/actions/social-comptes"
import type { ReseauSocialPlateforme } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

export type SocialCompteFormInitial = {
  label: string
  plateforme: ReseauSocialPlateforme
  externalId: string
}

export function SocialCompteForm({
  id,
  initial,
  submitLabel,
}: {
  id?: string
  initial?: SocialCompteFormInitial
  submitLabel: string
}) {
  const [state, formAction, isPending] = useActionState(
    (prevState: SocialCompteActionState | undefined, formData: FormData) =>
      id ? updateSocialCompte(id, formData) : createSocialCompte(prevState, formData),
    undefined
  )

  return (
    <form
      action={formAction}
      style={{
        background: "#fff",
        border: "1px solid #eef0f3",
        borderRadius: 10,
        padding: "clamp(18px,3vw,28px)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 560,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Label (usage interne)</span>
        <input name="label" required defaultValue={initial?.label} placeholder="Ex. Page Facebook LGEF Alsace" style={fieldStyle} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Plateforme</span>
        <select name="plateforme" required defaultValue={initial?.plateforme ?? "FACEBOOK"} style={fieldStyle}>
          <option value="FACEBOOK">Facebook</option>
          <option value="INSTAGRAM">Instagram</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>
          Identifiant (Page ID Facebook ou Instagram Business Account ID)
        </span>
        <input name="externalId" required defaultValue={initial?.externalId} style={fieldStyle} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Token d&apos;accès longue durée</span>
        <span style={{ fontSize: 11.5, color: colors.textLight }}>
          Généré via Graph API Explorer / Meta Business Suite. Permissions nécessaires : pages_manage_posts,
          pages_manage_metadata, pages_manage_read_engagement, pages_show_list (Facebook) ou instagram_basic,
          instagram_content_publish (Instagram).
          {id && " Laisser vide pour conserver le token actuel."}
        </span>
        <input
          name="accessToken"
          type="password"
          required={!id}
          placeholder={id ? "•••••••• (inchangé si vide)" : ""}
          style={fieldStyle}
        />
      </div>

      {state?.error && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        style={{
          alignSelf: "flex-start",
          background: isPending ? "#e999a0" : colors.red,
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 700,
          fontFamily: fontBody,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Enregistrement..." : submitLabel}
      </button>
    </form>
  )
}
