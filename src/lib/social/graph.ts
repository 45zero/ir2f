import "server-only"

// Graph API v25.0 (vérifié contre developers.facebook.com en septembre 2026). Permissions
// nécessaires sur le token généré manuellement par l'admin : pages_manage_posts,
// pages_manage_metadata, pages_manage_read_engagement, pages_show_list (Facebook) et
// instagram_basic, instagram_content_publish (Instagram — nécessite un compte pro lié à une page).
// Suppression Instagram (deleteInstagramMedia) nécessite EN PLUS instagram_manage_contents — pas
// encore accordé à nos tokens actuels, voir la démarche dans la mémoire du projet.
const GRAPH_API_BASE = "https://graph.facebook.com/v25.0"

type GraphErrorBody = { error?: { message?: string; code?: number } }

async function graphFetch(
  path: string,
  params: Record<string, string>,
  method: "GET" | "POST" | "DELETE" = "POST"
): Promise<Record<string, unknown>> {
  const url = new URL(`${GRAPH_API_BASE}${path}`)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)

  const res = await fetch(url.toString(), { method })
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

// Une image traite en général en quelques secondes ; une vidéo/Reel peut prendre 30s à 2min côté
// Meta. Le compte Vercel est en plan Hobby (voir la note dans social-publish.ts sur maxDuration) —
// le budget vidéo (6 × 8s = 48s) reste sous la limite de 60s, mais une vidéo longue/lourde peut
// tout de même dépasser ce budget : à tester avec de vrais fichiers courts avant de compter dessus.
const INSTAGRAM_IMAGE_POLL_ATTEMPTS = 5
const INSTAGRAM_IMAGE_POLL_DELAY_MS = 1500
const INSTAGRAM_VIDEO_POLL_ATTEMPTS = 6
const INSTAGRAM_VIDEO_POLL_DELAY_MS = 8000

async function waitForInstagramContainer(containerId: string, accessToken: string, attempts: number, delayMs: number): Promise<void> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const url = new URL(`${GRAPH_API_BASE}/${containerId}`)
    url.searchParams.set("fields", "status_code")
    url.searchParams.set("access_token", accessToken)
    const res = await fetch(url.toString())
    const body = (await res.json()) as GraphErrorBody & { status_code?: string }
    if (!res.ok || body.error) throw new Error(body.error?.message ?? "Échec de la vérification du média Instagram.")
    if (body.status_code === "FINISHED") return
    if (body.status_code === "ERROR") throw new Error("Le traitement du média Instagram a échoué.")
    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }
  throw new Error("Le média Instagram n'a pas terminé son traitement à temps — réessayez, ou utilisez un fichier plus court.")
}

/** Publie une image + légende sur un compte Instagram professionnel (obligatoirement lié à une page Facebook). Instagram n'accepte pas de post texte seul. */
export async function publishToInstagram(
  externalId: string,
  accessToken: string,
  { imageUrl, caption }: { imageUrl: string; caption: string }
): Promise<{ postId: string }> {
  const container = await graphFetch(`/${externalId}/media`, { image_url: imageUrl, caption, access_token: accessToken })
  const containerId = String(container.id)

  await waitForInstagramContainer(containerId, accessToken, INSTAGRAM_IMAGE_POLL_ATTEMPTS, INSTAGRAM_IMAGE_POLL_DELAY_MS)

  const published = await graphFetch(`/${externalId}/media_publish`, { creation_id: containerId, access_token: accessToken })
  return { postId: String(published.id) }
}

/** Publie une vidéo (Reel) + légende sur un compte Instagram professionnel — `video_url` doit être un fichier hébergé accessible publiquement (pas un lien YouTube). Même mécanique de conteneur que l'image, délai de traitement plus long. */
export async function publishInstagramVideo(
  externalId: string,
  accessToken: string,
  { videoUrl, caption }: { videoUrl: string; caption: string }
): Promise<{ postId: string }> {
  const container = await graphFetch(`/${externalId}/media`, {
    media_type: "REELS",
    video_url: videoUrl,
    caption,
    access_token: accessToken,
  })
  const containerId = String(container.id)

  await waitForInstagramContainer(containerId, accessToken, INSTAGRAM_VIDEO_POLL_ATTEMPTS, INSTAGRAM_VIDEO_POLL_DELAY_MS)

  const published = await graphFetch(`/${externalId}/media_publish`, { creation_id: containerId, access_token: accessToken })
  return { postId: String(published.id) }
}

/** Publie une photo native sur une page Facebook (le clic lit/agrandit la photo directement) — alternative à publishToFacebookPage quand on préfère un vrai média à la carte de lien cliquable. `url` doit être une image hébergée accessible publiquement. */
export async function publishFacebookNativePhoto(
  externalId: string,
  accessToken: string,
  { url, caption }: { url: string; caption: string }
): Promise<{ postId: string }> {
  const body = await graphFetch(`/${externalId}/photos`, { url, caption, access_token: accessToken })
  // /photos renvoie post_id (le post du fil, ce qu'on veut pour les stats/édition/suppression) en
  // plus de id (l'id de la photo elle-même) — on préfère post_id quand il est présent.
  return { postId: String(body.post_id ?? body.id) }
}

/** Publie une vidéo native sur une page Facebook (le clic lit la vidéo directement) — `file_url` doit être un fichier hébergé accessible publiquement. */
export async function publishFacebookNativeVideo(
  externalId: string,
  accessToken: string,
  { fileUrl, description }: { fileUrl: string; description: string }
): Promise<{ postId: string }> {
  const body = await graphFetch(`/${externalId}/videos`, { file_url: fileUrl, description, access_token: accessToken })
  return { postId: String(body.id) }
}

/** Stats d'un post de page Facebook — `reactions` est l'équivalent actuel de "likes" dans l'API (qui gère plusieurs types de réactions). Permissions déjà accordées au token (pages_read_engagement) suffisent, rien de plus à redemander. */
export async function getFacebookPostStats(
  postId: string,
  accessToken: string
): Promise<{ likes: number; comments: number; shares: number }> {
  const body = await graphFetch(
    `/${postId}`,
    { fields: "reactions.summary(true).limit(0),comments.summary(true).limit(0),shares", access_token: accessToken },
    "GET"
  )
  const reactions = body.reactions as { summary?: { total_count?: number } } | undefined
  const comments = body.comments as { summary?: { total_count?: number } } | undefined
  const shares = body.shares as { count?: number } | undefined
  return {
    likes: reactions?.summary?.total_count ?? 0,
    comments: comments?.summary?.total_count ?? 0,
    shares: shares?.count ?? 0,
  }
}

/** Stats d'un média Instagram — lisibles avec instagram_basic seul (déjà accordé), pas besoin de instagram_manage_comments (qui ne sert qu'à modérer/répondre). */
export async function getInstagramMediaStats(mediaId: string, accessToken: string): Promise<{ likes: number; comments: number }> {
  const body = await graphFetch(`/${mediaId}`, { fields: "like_count,comments_count", access_token: accessToken }, "GET")
  return { likes: Number(body.like_count ?? 0), comments: Number(body.comments_count ?? 0) }
}

type InsightMetric = { name?: string; values?: { value?: number }[]; total_value?: { value?: number } }

function extractInsightMetric(data: unknown, name: string): number {
  const metric = (data as InsightMetric[] | undefined)?.find((m) => m.name === name)
  if (!metric) return 0
  if (metric.total_value?.value !== undefined) return Number(metric.total_value.value)
  return Number(metric.values?.[0]?.value ?? 0)
}

/**
 * Vues/portée d'un post de page Facebook — `post_impressions`/`post_impressions_unique` ont été
 * dépréciées par Meta le 15/06/2026 (erreur "invalid metric" désormais), remplacées par
 * `post_media_view` (vues) et `post_total_media_view_unique` (portée). Édge `/insights` séparé de
 * `/{post-id}` (pas un simple `fields`). Migration très récente côté Meta — à reconfirmer sur un
 * vrai post si jamais ces noms bougent encore.
 */
export async function getFacebookPostInsights(postId: string, accessToken: string): Promise<{ views: number; reach: number }> {
  const body = await graphFetch(
    `/${postId}/insights`,
    { metric: "post_media_view,post_total_media_view_unique", access_token: accessToken },
    "GET"
  )
  return {
    views: extractInsightMetric(body.data, "post_media_view"),
    reach: extractInsightMetric(body.data, "post_total_media_view_unique"),
  }
}

/**
 * Vues/portée d'un média Instagram — `impressions` et `plays` ont été dépréciées par Meta (avril
 * 2025), remplacées uniformément par `views` (feed, carrousel, reels, stories confondus) ; `reach`
 * reste valide tel quel. Lisibles avec instagram_basic seul.
 */
export async function getInstagramMediaInsights(mediaId: string, accessToken: string): Promise<{ views: number; reach: number }> {
  const body = await graphFetch(`/${mediaId}/insights`, { metric: "views,reach", access_token: accessToken }, "GET")
  return { views: extractInsightMetric(body.data, "views"), reach: extractInsightMetric(body.data, "reach") }
}

/** Modifie le texte d'un post Facebook déjà publié. Contrairement à Instagram (qui n'autorise pas de modifier une légende publiée — limitation de plateforme, pas de notre code), l'API Graph l'accepte via un simple POST avec un nouveau `message`. */
export async function editFacebookPost(postId: string, accessToken: string, message: string): Promise<void> {
  await graphFetch(`/${postId}`, { message, access_token: accessToken })
}

/** Supprime un post Facebook déjà publié. */
export async function deleteFacebookPost(postId: string, accessToken: string): Promise<void> {
  await graphFetch(`/${postId}`, { access_token: accessToken }, "DELETE")
}

/** Supprime un média Instagram déjà publié. Nécessite le scope instagram_manage_contents en plus de instagram_basic (voir note en tête de fichier) — sans lui, Meta renvoie une erreur de permission. */
export async function deleteInstagramMedia(mediaId: string, accessToken: string): Promise<void> {
  await graphFetch(`/${mediaId}`, { access_token: accessToken }, "DELETE")
}
