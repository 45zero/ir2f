// Types purs partagés entre Article et Formation pour la publication officielle réseaux sociaux
// (voir src/lib/social/accounts.ts pour les comptes, src/lib/actions/social-publish.ts pour les
// actions) — pas d'import Prisma ici, importable depuis un composant client.

export type PublishableType = "ARTICLE" | "FORMATION"

/**
 * État de publication officielle d'un contenu (actualité ou formation) sur UN compte réseau
 * social — stocké dans Article.reseauxPublies / Formation.reseauxPublies, une entrée par compte,
 * clé = id du compte. Volontairement un JSON étendu plutôt qu'une table dédiée : proportionné au
 * volume de publications d'une ligue régionale, pas besoin d'un vrai outil de social media
 * management.
 */
/** "LIEN" = carte cliquable vers le site (comportement historique, pas de média attaché — indisponible sur Instagram, qui exige toujours un média). "IMAGE"/"VIDEO" = média natif attaché, joué/affiché directement au clic. */
export type MediaMode = "LIEN" | "IMAGE" | "VIDEO"

export type PublicationEtat = {
  statut: "PROGRAMME" | "PUBLIE" | "ECHEC" | "SUPPRIME"
  message: string
  mediaMode?: MediaMode
  mediaUrl?: string
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
  /** Masque cette publication de la liste "Publié" par défaut (voir /admin/publications) sans rien toucher côté réseau — juste pour désencombrer la vue une fois qu'une publication est ancienne. */
  archive?: boolean
}

export type ReseauxPublies = Record<string, PublicationEtat>

/** Commentaire lu en direct depuis la plateforme (jamais stocké côté IR2F) — voir getPostComments dans social-publish.ts. */
export type SocialComment = { id: string; author: string; text: string; createdAt: string }
