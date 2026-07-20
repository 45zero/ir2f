// Constantes et types purs (pas de dépendance Prisma/pg) pour le contenu
// administrable de la page "Nos Formations" : les 4 tuiles catégories et les
// onglets affichés dans le panneau déroulé de chaque catégorie.
import type { CategorieFormation, EffetVisuel, FormationOngletCle } from "@/generated/prisma"

export const EFFET_VISUEL_LABELS: Record<EffetVisuel, string> = {
  AUCUN: "Aucun",
  FONDU: "Fondu",
  ZOOM: "Zoom léger (au survol)",
  PARALLAXE: "Parallaxe",
  NOIR_BLANC: "Noir & blanc",
  FLOU: "Flou léger",
}

// ─── Tuiles (les 4 cartes catégories cliquables) ───────

export const TUILE_CATEGORIES = ["EDUCATEUR", "ARBITRAGE", "TERRAIN", "DEV"] as const satisfies readonly CategorieFormation[]

export const TUILE_DEFAULTS: Record<
  (typeof TUILE_CATEGORIES)[number],
  { label: string; backgroundColor: string }
> = {
  EDUCATEUR: { label: "Éducateurs", backgroundColor: "#c9a84c" },
  ARBITRAGE: { label: "Arbitres", backgroundColor: "#c9a84c" },
  TERRAIN: { label: "Tout Terrain", backgroundColor: "#c9a84c" },
  DEV: { label: "Chargé de Développement de Structures Sportives et Associatives (CDSSA)", backgroundColor: "#c9a84c" },
}

// ─── Onglets (contenu des panneaux déroulés) ───────────

export const ONGLET_CATEGORIES: Record<FormationOngletCle, CategorieFormation[]> = {
  INFO: ["ARBITRAGE", "TERRAIN", "DEV"],
  PARCOURS: ["ARBITRAGE", "TERRAIN", "DEV"],
  CLUB: ["TERRAIN"],
  EDU_PRESENTATION: ["EDUCATEUR"],
  EDU_PRO: ["EDUCATEUR"],
  EDU_BENEVOLE: ["EDUCATEUR"],
  EDU_EQUIVALENCES: ["EDUCATEUR"],
}

export const ONGLET_LABEL: Record<FormationOngletCle, string> = {
  INFO: "Présentation",
  PARCOURS: "Les différents parcours",
  CLUB: "Accueillir une formation dans mon club",
  EDU_PRESENTATION: "Présentation et parcours",
  EDU_PRO: "Formations professionnelles",
  EDU_BENEVOLE: "Formations bénévoles",
  EDU_EQUIVALENCES: "Équivalences et passerelles",
}

export type OngletKey = { categorie: CategorieFormation; onglet: FormationOngletCle }

export const ONGLET_KEYS: OngletKey[] = (Object.entries(ONGLET_CATEGORIES) as [FormationOngletCle, CategorieFormation[]][]).flatMap(
  ([onglet, categories]) => categories.map((categorie) => ({ categorie, onglet }))
)

export function ongletKeyId(categorie: CategorieFormation, onglet: FormationOngletCle): string {
  return `${categorie}:${onglet}`
}

const ONGLET_DEFAULT_CONTENU: Partial<Record<string, { titre: string | null; contenu: string | null }>> = {
  [ongletKeyId("EDUCATEUR", "EDU_PRESENTATION")]: {
    titre: "ÉDUCATEUR : FORMER LES ENCADRANTS DE DEMAIN",
    contenu:
      "La filière de formation des éducateurs de la FFF s'adapte à vos besoins en proposant deux parcours : bénévole ou professionnel. Selon votre projet, si vous souhaitez perfectionner vos compétences d'éducateur(rice) sans en faire votre métier, choisissez le parcours bénévole. Plusieurs types de formations existent, dont la durée peut varier de 8h à 161h permettant d'encadrer différents publics (enfants, jeunes et seniors) et toutes les pratiques comme le Futsal, Futnet, Beach soccer, l'Handi-foot …\n\nEn revanche, si vous souhaitez devenir éducateur(rice) ou entraîneur(e) et en faire votre métier, choisissez le parcours professionnel en commençant par le Brevet de moniteur de football (BMF) ou le Brevet d'entraîneur de football (BEF) si vous justifiez des prérequis spécifiques. Le BMF est accessible sous différentes formes, en apprentissage, par la formation continue.",
  },
  [ongletKeyId("EDUCATEUR", "EDU_PRO")]: {
    titre: "Formations professionnelles (BEF, BMF, FPC)",
    contenu: null,
  },
  [ongletKeyId("EDUCATEUR", "EDU_BENEVOLE")]: {
    titre: "Formations bénévoles (AF, CFI, DF, Certifications)",
    contenu: null,
  },
  [ongletKeyId("EDUCATEUR", "EDU_EQUIVALENCES")]: {
    titre: null,
    contenu:
      "Certaines formations bénévoles permettent d'obtenir des équivalences vers les diplômes fédéraux, sous conditions.\n\nAttention : seules les personnes titulaires du CFF2 certifié ou du CFF3 certifié peuvent s'inscrire sur les journées complémentaires pour obtenir les équivalences des Diplômes Fédéraux. Les personnes titulaires de CFI (même certifiés) ne sont pas éligibles aux journées complémentaires.",
  },
  [ongletKeyId("ARBITRAGE", "INFO")]: {
    titre: "ARBITRAGE : DEVENIR ET PROGRESSER COMME ARBITRE",
    contenu:
      "Le catalogue de formations Arbitrage de l'IR2F s'adresse à tous ceux qui souhaitent devenir arbitre ou se perfectionner. Lois du jeu, placement, gestion de match : des formations en présentiel et en visioconférence pour progresser à son rythme et gagner en confiance sur le terrain.",
  },
  [ongletKeyId("TERRAIN", "INFO")]: {
    titre: "TOUT TERRAIN : LE PARCOURS DE FORMATION DES ACTEURS DU CLUB",
    contenu:
      "Découvrez le nouveau catalogue de formation Tout Terrain à destination de tous les acteurs du club !\n\nCes formations qui sont disponibles en présentiel, en visioconférence et en e-learning ont vocation de permettre à tous les acteurs du club, dirigeants, bénévoles, arbitres, éducateurs et parents de licenciés, d'acquérir de nouvelles compétences, leur transmettre de nouveaux outils et surtout les conforter dans leurs missions. Les formations répondent à une approche pédagogique ludique et participative permettant de nombreux échanges entre les participants qui deviennent acteurs de leurs formations !",
  },
  [ongletKeyId("DEV", "INFO")]: {
    titre: "CHARGÉ DE DÉVELOPPEMENT : PILOTER LES PROJETS DU FOOTBALL RÉGIONAL",
    contenu:
      "Ce catalogue s'adresse aux futurs chargés de développement et responsables emploi-formation. Diagnostic territorial, conduite de projet, financements : des parcours longs, en présentiel et à distance, pour structurer et développer le football sur son territoire.",
  },
  [ongletKeyId("TERRAIN", "CLUB")]: {
    titre: "ACCUEILLIR UNE FORMATION AU SEIN DE MON CLUB",
    contenu:
      "L'Institut Régional de Formation du Football de la Ligue du Grand Est souhaite recueillir les besoins en formations « Tout Terrain » (dirigeants, bénévoles, éducateurs, arbitres, parents) des clubs sur le territoire afin de proposer une offre adaptée à vos besoins.\n\nVeuillez remplir le formulaire ci-dessous pour recevoir une formation au sein des locaux de votre club et former vos bénévoles !",
  },
}

const ONGLET_DEFAULT_PARCOURS_CONTENU = "Cliquez sur une formation pour en voir le détail."

export function ongletDefaultTitre(categorie: CategorieFormation, onglet: FormationOngletCle): string | null {
  return ONGLET_DEFAULT_CONTENU[ongletKeyId(categorie, onglet)]?.titre ?? null
}

export function ongletDefaultContenu(categorie: CategorieFormation, onglet: FormationOngletCle): string | null {
  if (onglet === "PARCOURS") return ONGLET_DEFAULT_PARCOURS_CONTENU
  return ONGLET_DEFAULT_CONTENU[ongletKeyId(categorie, onglet)]?.contenu ?? null
}
