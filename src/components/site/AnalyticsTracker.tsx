"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Envoie les visites de pages et les clics sur liens/boutons du site public vers /api/track.
// Aucun cookie, aucun identifiant stocké dans le navigateur.
function send(payload: Record<string, string | null>) {
  try {
    const body = new Blob([JSON.stringify(payload)], { type: "text/plain" })
    if (navigator.sendBeacon?.("/api/track", body)) return
    void fetch("/api/track", { method: "POST", body, keepalive: true })
  } catch {
    // les statistiques ne doivent jamais casser la navigation
  }
}

function labelOf(el: Element): string | null {
  const aria = el.getAttribute("aria-label") || el.getAttribute("title")
  if (aria) return aria
  const text = (el as HTMLElement).innerText?.trim()
  if (text) return text.split("\n")[0]
  const img = el.querySelector("img[alt]")
  return img?.getAttribute("alt") || null
}

function hrefOf(el: Element): string | null {
  if (!(el instanceof HTMLAnchorElement) || !el.href) return null
  const raw = el.getAttribute("href") ?? ""
  if (/^(mailto|tel):/i.test(raw)) return raw
  try {
    const u = new URL(el.href)
    return u.origin === window.location.origin ? u.pathname : u.href
  } catch {
    return null
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    send({ type: "VIEW", path: pathname, referrer: document.referrer || null })
  }, [pathname])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target instanceof Element ? e.target : null
      const el = target?.closest("a, button, [role='button']")
      if (!el) return
      send({
        type: "CLICK",
        path: window.location.pathname,
        label: labelOf(el),
        href: hrefOf(el),
      })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
