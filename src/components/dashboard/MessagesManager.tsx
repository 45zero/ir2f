"use client"

import { useState, useActionState } from "react"
import { sendMessage, markMessageAsRead } from "@/lib/actions/messages"
import { ROLE_LABELS } from "@/lib/users-shared"
import { colors, fontBody } from "@/lib/theme"
import type { Role } from "@/generated/prisma"

const fieldStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

export type InboxItem = {
  messageId: string
  sujet: string | null
  contenu: string
  createdAt: string
  lu: boolean
  expediteurNom: string
}

export type SentItem = {
  id: string
  sujet: string | null
  contenu: string
  createdAt: string
  destinataires: { nom: string; lu: boolean }[]
}

export type RecipientOption = { id: string; nom: string; prenom: string; role: Role }

export function MessagesManager({
  inbox,
  sent,
  recipients,
}: {
  inbox: InboxItem[]
  sent: SentItem[]
  recipients: RecipientOption[]
}) {
  const [tab, setTab] = useState<"inbox" | "sent">("inbox")
  const [composing, setComposing] = useState(false)
  const unreadCount = inbox.filter((m) => !m.lu).length

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <TabButton active={tab === "inbox"} onClick={() => setTab("inbox")}>
            Reçus{unreadCount > 0 ? ` (${unreadCount})` : ""}
          </TabButton>
          <TabButton active={tab === "sent"} onClick={() => setTab("sent")}>
            Envoyés
          </TabButton>
        </div>
        {!composing && (
          <button
            onClick={() => setComposing(true)}
            style={{
              background: colors.red,
              color: "#fff",
              border: "none",
              padding: "9px 18px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: "pointer",
            }}
          >
            + Nouveau message
          </button>
        )}
      </div>

      {composing && <ComposeForm recipients={recipients} onDone={() => setComposing(false)} />}

      {tab === "inbox" && <Inbox items={inbox} />}
      {tab === "sent" && <Sent items={sent} />}
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: active ? "none" : "1.5px solid #d8dde5",
        background: active ? colors.navy : "#fff",
        color: active ? "#fff" : colors.navy,
        padding: "9px 16px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: fontBody,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}

function Inbox({ items }: { items: InboxItem[] }) {
  if (items.length === 0) {
    return <EmptyState label="Aucun message reçu." />
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((m) => (
        <InboxRow key={m.messageId} item={m} />
      ))}
    </div>
  )
}

function InboxRow({ item }: { item: InboxItem }) {
  const [open, setOpen] = useState(false)
  const [, markAction] = useActionState(async () => {
    if (!item.lu) await markMessageAsRead(item.messageId)
    return undefined
  }, undefined)

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 16 }}>
      <form
        action={markAction}
        onSubmit={() => setOpen((v) => !v)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!item.lu && <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors.red, flexShrink: 0 }} />}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 13, fontWeight: item.lu ? 600 : 800, color: colors.text }}>
              {item.sujet || "(sans objet)"}
            </span>
            <span style={{ fontSize: 12, color: colors.textLight }}>
              {item.expediteurNom} · {dateFormatter.format(new Date(item.createdAt))}
            </span>
          </div>
        </div>
        <button type="submit" style={{ background: "transparent", border: "none", color: colors.navy, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          {open ? "Fermer" : "Lire"}
        </button>
      </form>
      {open && <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 12, whiteSpace: "pre-wrap" }}>{item.contenu}</p>}
    </div>
  )
}

function Sent({ items }: { items: SentItem[] }) {
  if (items.length === 0) {
    return <EmptyState label="Aucun message envoyé." />
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((m) => (
        <div key={m.id} style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{m.sujet || "(sans objet)"}</span>
          <span style={{ fontSize: 12, color: colors.textLight }}>
            À {m.destinataires.map((d) => d.nom).join(", ")} · {dateFormatter.format(new Date(m.createdAt))}
          </span>
          <p style={{ fontSize: 13, color: colors.textMuted, margin: 0, whiteSpace: "pre-wrap" }}>{m.contenu}</p>
          <span style={{ fontSize: 11, color: colors.textLight }}>
            {m.destinataires.filter((d) => d.lu).length}/{m.destinataires.length} lu(s)
          </span>
        </div>
      ))}
    </div>
  )
}

function ComposeForm({ recipients, onDone }: { recipients: RecipientOption[]; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: { error: string | null } | undefined, formData: FormData) => {
      const result = await sendMessage(prev, formData)
      if (!result.error) onDone()
      return result
    },
    undefined
  )

  return (
    <form action={formAction} style={{ background: "#fff", border: `1px solid ${colors.gold}`, borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.navy }}>Destinataires</span>
        <div style={{ maxHeight: 160, overflowY: "auto", border: "1px solid #e2e5ea", borderRadius: 5, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {recipients.map((r) => (
            <label key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text, cursor: "pointer" }}>
              <input type="checkbox" name="destinataires" value={r.id} style={{ width: 14, height: 14 }} />
              {r.prenom} {r.nom} <span style={{ color: colors.textLight, fontSize: 11 }}>({ROLE_LABELS[r.role]})</span>
            </label>
          ))}
        </div>
      </div>
      <input name="sujet" placeholder="Objet (optionnel)" style={fieldStyle} />
      <textarea name="contenu" placeholder="Votre message" required rows={4} style={{ ...fieldStyle, resize: "vertical" }} />
      {state?.error && <span style={{ color: colors.red, fontSize: 12 }}>{state.error}</span>}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            alignSelf: "flex-start",
            background: colors.red,
            color: "#fff",
            border: "none",
            padding: "9px 18px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: pending ? "default" : "pointer",
          }}
        >
          {pending ? "Envoi..." : "Envoyer"}
        </button>
        <button
          type="button"
          onClick={onDone}
          style={{ background: "transparent", border: "1px solid #d8dde5", color: colors.navy, fontSize: 12, fontWeight: 700, padding: "9px 14px", borderRadius: 4, cursor: "pointer", fontFamily: fontBody }}
        >
          Annuler
        </button>
      </div>
    </form>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 10, padding: 20, color: colors.textLight, fontSize: 13 }}>
      {label}
    </div>
  )
}
