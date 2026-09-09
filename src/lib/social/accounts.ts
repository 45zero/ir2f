import "server-only"

// Comptes réseaux sociaux officiels configurés en variable d'environnement (SOCIAL_ACCOUNTS_JSON,
// un tableau JSON) plutôt qu'en base admin-éditable : volontaire — ces identifiants ne doivent pas
// être visibles/modifiables par n'importe quel compte ADMIN, seulement par qui a accès au
// déploiement. Voir le panneau "Publier sur les réseaux" (src/components/admin/PublierReseauxPanel.tsx)
// pour la seule surface admin qui en dépend — il ne montre que label/plateforme, jamais le token.
//
// Format attendu dans .env :
// SOCIAL_ACCOUNTS_JSON=[{"id":"fb-lgef","label":"Page Facebook LGEF","plateforme":"FACEBOOK","externalId":"1234567890","accessToken":"..."},{"id":"ig-lgef","label":"Instagram LGEF","plateforme":"INSTAGRAM","externalId":"1789...","accessToken":"..."}]

export type SocialPlateforme = "FACEBOOK" | "INSTAGRAM"

export type SocialAccount = {
  id: string
  label: string
  plateforme: SocialPlateforme
  externalId: string
  accessToken: string
}

let cachedAccounts: SocialAccount[] | null = null

function parseAccounts(): SocialAccount[] {
  if (cachedAccounts) return cachedAccounts

  const raw = process.env.SOCIAL_ACCOUNTS_JSON
  if (!raw) {
    cachedAccounts = []
    return cachedAccounts
  }

  try {
    const parsed = JSON.parse(raw)
    cachedAccounts = Array.isArray(parsed) ? parsed : []
  } catch {
    console.error("[social] SOCIAL_ACCOUNTS_JSON est invalide — vérifiez le JSON dans .env")
    cachedAccounts = []
  }
  return cachedAccounts
}

/** Liste publique (sans token) — pour le panneau admin qui affiche les comptes sélectionnables. */
export function getConfiguredSocialAccounts(): { id: string; label: string; plateforme: SocialPlateforme }[] {
  return parseAccounts().map(({ id, label, plateforme }) => ({ id, label, plateforme }))
}

/** Compte complet, token inclus — usage serveur uniquement, au moment de publier. */
export function getSocialAccountById(id: string): SocialAccount | null {
  return parseAccounts().find((a) => a.id === id) ?? null
}
