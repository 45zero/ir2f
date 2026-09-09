// Constantes partagées entre le code serveur (admin) et le code navigateur (PopupGate.tsx).
import type { TypePopup } from "@/generated/prisma"

export const TYPE_POPUP_LABELS: Record<TypePopup, string> = {
  EDITO: "Édito (mot du président)",
  ANNONCE: "Annonce",
}

// Un pop-up fermé ne doit plus jamais se rouvrir pour ce visiteur — mémorisé par id dans le
// localStorage du navigateur. Publier un nouveau pop-up (nouvel id, ex. la prochaine annonce de
// l'année) le fait donc réapparaître naturellement, sans action particulière côté admin.
export function popupSeenKey(id: string): string {
  return `ir2f-popup-seen:${id}`
}

export function hasSeenPopup(id: string): boolean {
  try {
    return window.localStorage.getItem(popupSeenKey(id)) === "1"
  } catch {
    return false
  }
}

export function markPopupSeen(id: string): void {
  try {
    window.localStorage.setItem(popupSeenKey(id), "1")
  } catch {
    // Stockage indisponible (navigation privée, quota...) : le pop-up pourra se rouvrir, tant pis.
  }
}
