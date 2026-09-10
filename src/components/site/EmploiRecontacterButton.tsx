"use client"

import { useActionState, useEffect, useState } from "react"
import { submitContactRequest } from "@/lib/actions/contact"
import { colors, fontHeading, fontBody } from "@/lib/theme"

const inputStyle = {
  border: "1px solid #e2e5ea",
  borderRadius: 5,
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: fontBody,
  outline: "none",
  width: "100%",
  boxSizing: "border-box" as const,
}

/**
 * Bouton "Je donne mes infos" du bandeau CTA de /emploi : ouvre une popup avec un mini-formulaire
 * de coordonnées plutôt que de renvoyer vers l'ancre "#contact" (qui n'existe que sur l'accueil,
 * pas sur /emploi — le lien ne menait donc nulle part d'utile sur cette page). Réutilise
 * `submitContactRequest`, le même circuit que le formulaire de contact de l'accueil (table
 * `DemandeContact` + email de notification aux admins, routé sur la thématique "emploi" qui
 * pointe déjà vers l'adresse dédiée Emploi/Professionnalisation) plutôt qu'un nouveau circuit.
 */
export function EmploiRecontacterButton({ label, buttonStyle }: { label: string; buttonStyle: React.CSSProperties }) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(submitContactRequest, undefined)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={buttonStyle}>
        {label}
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,33,61,0.65)",
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Je souhaite être recontacté"
            style={{
              background: "#fff",
              borderRadius: 12,
              width: "100%",
              maxWidth: 440,
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "clamp(20px,4vw,32px)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              animation: "ir2fFadeIn 0.25s ease",
              boxShadow: "0 20px 60px rgba(10,22,46,0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <h2 style={{ fontFamily: fontHeading, color: colors.navy, fontSize: 20, fontWeight: 800, margin: 0, lineHeight: 1.15 }}>
                Je souhaite être recontacté
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: "none",
                  background: "#f5f7fb",
                  color: colors.navy,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {state?.status === "success" ? (
              <p style={{ color: "#3f9142", fontSize: 14, fontWeight: 600, margin: 0 }}>{state.message}</p>
            ) : (
              <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input type="hidden" name="type" value="emploi" />
                <input type="hidden" name="thematique" value="emploi" />
                <input name="nom" placeholder="Nom" required style={inputStyle} />
                <input name="prenom" placeholder="Prénom" required style={inputStyle} />
                <input name="email" type="email" placeholder="Email" required style={inputStyle} />
                <input name="telephone" placeholder="Téléphone" style={inputStyle} />

                {state?.status === "error" && <p style={{ color: colors.red, fontSize: 13, margin: 0 }}>{state.message}</p>}

                <button
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
                >
                  {isPending ? "Envoi..." : "Envoyer mes coordonnées"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
