import "server-only"

// Graph API v25.0 (vérifié contre developers.facebook.com en septembre 2026). Permissions
// nécessaires sur le token généré manuellement par l'admin : pages_manage_posts,
// pages_manage_metadata, pages_manage_read_engagement, pages_show_list (Facebook) et
// instagram_basic, instagram_content_publish (Instagram — nécessite un compte pro lié à une page).
const GRAPH_API_BASE = "https://graph.facebook.com/v25.0"

type GraphErrorBody = { error?: { message?: string; code?: number } }

async function graphFetch(path: string, params: Record<string, string>): Promise<Record<string, unknown>> {
  const url = new URL(`${GRAPH_API_BASE}${path}`)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)

  const res = await fetch(url.toString(), { method: "POST" })
  const body = (await res.json()) as GraphErrorBody & Record<string, unknown>
  if (!res.ok || body.error) {
    throw new Error(body.error?.message ?? `Échec de la requête Graph API (${res.status}).`)
  }
  return body
}

/**
 * Publie sur le fil d'une page Facebook. On envoie `link` (pas d'upload d'image) : Facebook scanne
 * la page pour son aperçu via nos balises Open Graph (voir actualites/[slug]/page.tsx), ce qui
 * donne un vrai lien cliquable vers le site — un post `/photos` n'offre pas ça.
 */
export async function publishToFacebookPage(
  externalId: string,
  accessToken: string,
  { message, link }: { message: string; link: string }
): Promise<{ postId: string }> {
  const body = await graphFetch(`/${externalId}/feed`, { message, link, access_token: accessToken })
  return { postId: String(body.id) }
}

const INSTAGRAM_CONTAINER_POLL_ATTEMPTS = 5
const INSTAGRAM_CONTAINER_POLL_DELAY_MS = 1500

async function waitForInstagramContainer(containerId: string, accessToken: string): Promise<void> {
  for (let attempt = 0; attempt < INSTAGRAM_CONTAINER_POLL_ATTEMPTS; attempt++) {
    const url = new URL(`${GRAPH_API_BASE}/${containerId}`)
    url.searchParams.set("fields", "status_code")
    url.searchParams.set("access_token", accessToken)
    const res = await fetch(url.toString())
    const body = (await res.json()) as GraphErrorBody & { status_code?: string }
    if (!res.ok || body.error) throw new Error(body.error?.message ?? "Échec de la vérification du média Instagram.")
    if (body.status_code === "FINISHED") return
    if (body.status_code === "ERROR") throw new Error("Le traitement du média Instagram a échoué.")
    await new Promise((resolve) => setTimeout(resolve, INSTAGRAM_CONTAINER_POLL_DELAY_MS))
  }
  throw new Error("Le média Instagram n'a pas terminé son traitement à temps — réessayez.")
}

/** Publie une image + légende sur un compte Instagram professionnel (obligatoirement lié à une page Facebook). Instagram n'accepte pas de post texte seul. */
export async function publishToInstagram(
  externalId: string,
  accessToken: string,
  { imageUrl, caption }: { imageUrl: string; caption: string }
): Promise<{ postId: string }> {
  const container = await graphFetch(`/${externalId}/media`, { image_url: imageUrl, caption, access_token: accessToken })
  const containerId = String(container.id)

  await waitForInstagramContainer(containerId, accessToken)

  const published = await graphFetch(`/${externalId}/media_publish`, { creation_id: containerId, access_token: accessToken })
  return { postId: String(published.id) }
}
