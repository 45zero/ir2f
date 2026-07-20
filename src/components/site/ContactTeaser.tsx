"use client"

import { useActionState, useState } from "react"
import { Hoverable } from "@/components/ui/Hoverable"
import { submitContactRequest } from "@/lib/actions/contact"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import { CONTACT_THEMES } from "@/lib/contact-themes"

const inputStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: fontBody,
  outline: "none",
}

const typeBaseStyle = {
  border: "1.5px solid #d8dde5",
  background: "#fff",
  color: colors.navy,
  padding: "12px 22px",
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 700,
  fontFamily: fontBody,
  cursor: "pointer" as const,
}

const typeActiveStyle = {
  ...typeBaseStyle,
  border: `1.5px solid ${colors.red}`,
  background: colors.red,
  color: "#fff",
}

export function ContactTeaser({
  startOpen = false,
  titre = "Je souhaite être contacté",
  sousTitre = "Un conseiller IR2F revient vers vous sous 48h.",
}: {
  startOpen?: boolean
  titre?: string
  sousTitre?: string
}) {
  const [open, setOpen] = useState(startOpen)
  const [type, setType] = useState<"club" | "stagiaire" | null>(null)
  const [state, formAction, isPending] = useActionState(submitContactRequest, undefined)

  return (
    <section style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 20px" }}>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #eef0f3",
          borderRadius: 10,
          padding: "clamp(24px,4vw,48px)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h2
              style={{
                fontFamily: fontHeading,
                color: colors.navy,
                fontSize: "clamp(24px,2.6vw,32px)",
                fontWeight: 800,
                margin: 0,
              }}
            >
              {titre}
            </h2>
            <p style={{ color: colors.textMuted, fontSize: 15, margin: 0 }}>
              {sousTitre}
            </p>
          </div>
          {!open && state?.status !== "success" && (
            <Hoverable
              as="button"
              onClick={() => setOpen(true)}
              style={{
                background: colors.red,
                color: "#fff",
                border: "none",
                padding: "14px 28px",
                borderRadius: 4,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: fontBody,
                cursor: "pointer",
              }}
              hoverStyle={{ background: colors.redDark }}
            >
              Être contacté
            </Hoverable>
          )}
        </div>

        {state?.status === "success" && (
          <div style={{ borderTop: "1px solid #eef0f3", paddingTop: 24 }}>
            <p style={{ color: "#3f9142", fontSize: 14, fontWeight: 600, margin: 0 }}>{state.message}</p>
          </div>
        )}

        {open && state?.status !== "success" && (
          <div
            style={{
              borderTop: "1px solid #eef0f3",
              paddingTop: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              animation: "ir2fFadeIn 0.35s ease",
            }}
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" style={type === "club" ? typeActiveStyle : typeBaseStyle} onClick={() => setType("club")}>
                Je suis un club
              </button>
              <button
                type="button"
                style={type === "stagiaire" ? typeActiveStyle : typeBaseStyle}
                onClick={() => setType("stagiaire")}
              >
                Je suis un futur stagiaire
              </button>
            </div>

            {type && (
              <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <input type="hidden" name="type" value={type} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
                  <select
                    name="thematique"
                    required
                    defaultValue=""
                    style={{ ...inputStyle, gridColumn: "1/-1" }}
                  >
                    <option value="" disabled>
                      Quelle est votre thématique ? *
                    </option>
                    {CONTACT_THEMES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <input name="nom" placeholder="Nom" required style={inputStyle} />
                  <input name="prenom" placeholder="Prénom" required style={inputStyle} />
                  <input name="email" type="email" placeholder="Email" required style={inputStyle} />
                  <input name="telephone" placeholder="Téléphone" style={inputStyle} />
                  {type === "club" && (
                    <input name="clubNom" placeholder="Nom du club" style={{ ...inputStyle, gridColumn: "1/-1" }} />
                  )}
                  <textarea name="message" placeholder="Votre message" rows={3} style={{ ...inputStyle, gridColumn: "1/-1", resize: "vertical" }} />
                </div>

                {state?.status === "error" && (
                  <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.message}</p>
                )}

                <div style={{ display: "flex", gap: 12 }}>
                  <Hoverable
                    as="button"
                    type="submit"
                    disabled={isPending}
                    style={{
                      background: isPending ? "#e999a0" : colors.red,
                      color: "#fff",
                      border: "none",
                      padding: "13px 26px",
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: fontBody,
                      cursor: isPending ? "default" : "pointer",
                    }}
                    hoverStyle={{ background: colors.redDark }}
                  >
                    {isPending ? "Envoi..." : "Envoyer ma demande"}
                  </Hoverable>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      setType(null)
                    }}
                    style={{
                      background: "transparent",
                      color: colors.textMuted,
                      border: "1px solid #e2e5ea",
                      padding: "13px 22px",
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: fontBody,
                      cursor: "pointer",
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
