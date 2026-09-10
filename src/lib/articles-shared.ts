// Constantes/types d'actualités partagés entre code serveur et composants client — pas d'import
// Prisma ici (voir la note "server/client boundary" dans la mémoire du projet : un composant
// client qui importe une valeur du même module que src/lib/prisma.ts entraîne tout `pg` dans le
// bundle navigateur).

/** Section répétable d'un article — mêmes principes que ProgrammeStep (formations-shared.ts), avec un lien de redirection en plus (pas de PDF, hors périmètre des actualités). */
export type ArticleSection = {
  n: string
  title: string
  desc: string
  table?: { headers: string[]; rows: string[][] }
  images?: string[]
  videoUrl?: string | null
  videoFichierUrl?: string | null
  lien?: { type: "INTERNE" | "EXTERNE"; url: string; label: string } | null
}

/** Légende courte utilisée partout où un extrait de l'article est nécessaire (balises Open Graph, bouton "partager" visiteur, pré-remplissage du texte de publication officielle réseaux sociaux) — priorité au texte de partage dédié, repli sur le début du contenu. */
export function articleShareExcerpt(article: { contenu: string; textePartage: string | null }): string {
  const source = article.textePartage?.trim() || article.contenu
  return source.slice(0, 160).trim() + (source.length > 160 ? "…" : "")
}

/**
 * État de publication officielle d'un article sur UN compte réseau social (voir
 * src/lib/social/accounts.ts) — stocké dans Article.reseauxPublies, une entrée par compte, clé =
 * id du compte. Volontairement un JSON étendu plutôt qu'une table dédiée : proportionné au volume
 * de publications d'une ligue régionale, pas besoin d'un vrai outil de social media management.
 */
export type PublicationEtat = {
  statut: "PROGRAMME" | "PUBLIE" | "ECHEC" | "SUPPRIME"
  message: string
  imageUrl?: string
  scheduledFor?: string
  publishedAt?: string
  postId?: string
  error?: string
  likes?: number
  comments?: number
  views?: number
  reach?: number
  statsFetchedAt?: string
  deletedAt?: string
}

export type ReseauxPublies = Record<string, PublicationEtat>
