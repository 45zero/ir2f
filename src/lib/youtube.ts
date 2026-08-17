export function getYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null
}

/** Vrai pour un fichier vidéo hébergé directement (ex. /videos/xxx.mp4), à lire avec <video> plutôt qu'un iframe. */
export function isVideoFileUrl(url: string): boolean {
  return /\.(mp4|webm|mov|ogv|ogg)$/i.test(url)
}
