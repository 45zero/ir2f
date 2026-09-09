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
