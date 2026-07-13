// Seed de contenu initial pour IR2F, porté depuis la maquette Claude Design
// (IR2F.dc.html — FORMATIONS_DATA / EQUIVALENCE_NODES / STATS_DATA / CATEGORY_INFO).
// Idempotent : peut être relancé sans dupliquer (upsert sur slug / clé unique).
//
// Usage : npx tsx prisma/seed.ts
// Nécessite DIRECT_URL (pas le pooler pgbouncer) — voir --url dans package.json si besoin.

import "dotenv/config"
import { PrismaClient, type GroupeEquivalence } from "../src/generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! })
const prisma = new PrismaClient({ adapter })

function daysFromNow(n: number) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d
}

type ProgrammeStep = { n: string; title: string; desc: string }
type SessionSeed = { dateDebut: Date; lieu: string; places: number | null }

type FormationSeed = {
  slug: string
  titre: string
  categorie: "EDUCATEUR" | "ARBITRAGE" | "TERRAIN" | "CLUB" | "DEV"
  filiere?: "PROFESSIONNELLE" | "BENEVOLE"
  dureeLabel: string
  modeLabel: string
  lieu: string
  type: "PRESENTIEL" | "VISIO" | "ELEARNING" | "MIXTE"
  cpfEligible: boolean
  image: string
  description: string
  programme: ProgrammeStep[]
  formateurNom: string
  formateurRole: string
  sessions: SessionSeed[]
  ordre: number
  groupeEquivalence?: GroupeEquivalence
  varianteNode?: "NAVY" | "LIGHT" | "RED" | "OUTLINE"
  badgeNode?: string
  shortNode?: string
}

const FORMATIONS: FormationSeed[] = [
  {
    slug: "bef",
    titre: "BEF — Brevet d'Entraîneur de Football",
    categorie: "EDUCATEUR",
    filiere: "PROFESSIONNELLE",
    dureeLabel: "6 mois",
    modeLabel: "Présentiel",
    lieu: "Ludres",
    type: "PRESENTIEL",
    cpfEligible: true,
    image:
      "https://images.unsplash.com/photo-1544717684-1243da23b545?w=800&q=80&auto=format&fit=crop",
    description:
      "Le plus haut diplôme régional pour entraîner un groupe senior de haut niveau. Un parcours exigeant qui associe théorie, mise en pratique sur le terrain et évaluation continue.",
    programme: [
      { n: "01", title: "Fondamentaux tactiques", desc: "Analyse du jeu, systèmes et principes offensifs / défensifs." },
      { n: "02", title: "Préparation physique", desc: "Planification de la charge et prévention des blessures." },
      { n: "03", title: "Management de groupe", desc: "Leadership, communication et gestion de l'effectif." },
      { n: "04", title: "Mise en situation", desc: "Stage pratique encadré avec un club partenaire." },
    ],
    formateurNom: "Marc Dutilleul",
    formateurRole: "Cadre technique régional, DTN",
    sessions: [
      { dateDebut: new Date("2026-09-14"), lieu: "Ludres", places: 4 },
      { dateDebut: new Date("2026-11-09"), lieu: "Reims", places: 9 },
    ],
    ordre: 0,
  },
  {
    slug: "cff3",
    titre: "CFF3 — Certificat de Formateur de Football Niveau 3",
    categorie: "EDUCATEUR",
    filiere: "BENEVOLE",
    dureeLabel: "3 mois",
    modeLabel: "Présentiel / Visio",
    lieu: "Metz",
    type: "MIXTE",
    cpfEligible: true,
    image:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80&auto=format&fit=crop",
    description:
      "Une formation hybride pour encadrer les catégories jeunes avec une pédagogie adaptée à chaque tranche d'âge.",
    programme: [
      { n: "01", title: "Pédagogie du jeune joueur", desc: "Adapter les exercices selon les âges et niveaux." },
      { n: "02", title: "Construction de séance", desc: "Progressivité et objectifs pédagogiques." },
      { n: "03", title: "Évaluation pratique", desc: "Mise en situation filmée et débrief individuel." },
    ],
    formateurNom: "Sophie Anrion",
    formateurRole: "Formatrice IR2F",
    sessions: [{ dateDebut: new Date("2026-10-03"), lieu: "Metz", places: 12 }],
    ordre: 1,
  },
  {
    slug: "arb-regional",
    titre: "Formation Arbitre Régional",
    categorie: "ARBITRAGE",
    dureeLabel: "4 semaines",
    modeLabel: "Présentiel",
    lieu: "Strasbourg",
    type: "PRESENTIEL",
    cpfEligible: false,
    image:
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80&auto=format&fit=crop",
    description:
      "Devenez arbitre régional : maîtrise des lois du jeu, placement sur le terrain et gestion de match en conditions réelles.",
    programme: [
      { n: "01", title: "Lois du jeu", desc: "Connaissance approfondie du règlement IFAB." },
      { n: "02", title: "Placement & signalisation", desc: "Positionnement et communication non-verbale." },
      { n: "03", title: "Gestion de match", desc: "Autorité, dialogue et gestion des tensions." },
      { n: "04", title: "Observation terrain", desc: "Matchs officiels sous tutorat." },
    ],
    formateurNom: "Karim Belaïdi",
    formateurRole: "Responsable de l'arbitrage LGEF",
    sessions: [{ dateDebut: new Date("2026-09-05"), lieu: "Strasbourg", places: 6 }],
    ordre: 0,
  },
  {
    slug: "arb-assistant",
    titre: "Perfectionnement Arbitre Assistant",
    categorie: "ARBITRAGE",
    dureeLabel: "2 semaines",
    modeLabel: "Visio",
    lieu: "Visio",
    type: "VISIO",
    cpfEligible: false,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80&auto=format&fit=crop",
    description:
      "Un module court pour affiner sa technique de touche de ligne et sa coordination avec l'arbitre central.",
    programme: [
      { n: "01", title: "Coordination", desc: "Synchronisation avec l'arbitre central." },
      { n: "02", title: "Hors-jeu avancé", desc: "Cas complexes et prise de décision rapide." },
    ],
    formateurNom: "Karim Belaïdi",
    formateurRole: "Responsable de l'arbitrage LGEF",
    sessions: [{ dateDebut: new Date("2026-10-20"), lieu: "Visio", places: 15 }],
    ordre: 1,
  },
  {
    slug: "educ-animation",
    titre: "Éducateur Foot Animation U6-U11",
    categorie: "TERRAIN",
    dureeLabel: "5 jours",
    modeLabel: "Présentiel",
    lieu: "Nancy",
    type: "PRESENTIEL",
    cpfEligible: true,
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&q=80&auto=format&fit=crop",
    description:
      "Accompagner les plus jeunes footballeurs : jeu, plaisir et apprentissage moteur au coeur de la formation.",
    programme: [
      { n: "01", title: "Développement moteur", desc: "Motricité et coordination chez le jeune enfant." },
      { n: "02", title: "Jeux et ateliers", desc: "Formats ludiques adaptés au foot animation." },
      { n: "03", title: "Relation aux familles", desc: "Communication avec les parents." },
    ],
    formateurNom: "Élodie Vasseur",
    formateurRole: "Formatrice IR2F, référente jeunes",
    sessions: [{ dateDebut: new Date("2026-09-12"), lieu: "Nancy", places: 10 }],
    ordre: 0,
  },
  {
    slug: "futsal-init",
    titre: "Certification Futsal Initiation",
    categorie: "TERRAIN",
    dureeLabel: "3 jours",
    modeLabel: "Présentiel",
    lieu: "Mulhouse",
    type: "PRESENTIEL",
    cpfEligible: false,
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80&auto=format&fit=crop",
    description: "Les spécificités techniques et tactiques du futsal pour diversifier son encadrement.",
    programme: [
      { n: "01", title: "Spécificités du futsal", desc: "Règles, espace réduit, prise de décision rapide." },
      { n: "02", title: "Exercices techniques", desc: "Contrôle, passe et jeu en surface réduite." },
    ],
    formateurNom: "Élodie Vasseur",
    formateurRole: "Formatrice IR2F, référente jeunes",
    sessions: [{ dateDebut: new Date("2026-11-02"), lieu: "Mulhouse", places: 8 }],
    ordre: 1,
  },
  {
    slug: "dirigeant-club",
    titre: "Dirigeant de Club — Gestion Associative",
    categorie: "CLUB",
    dureeLabel: "3 jours",
    modeLabel: "E-learning",
    lieu: "E-learning",
    type: "ELEARNING",
    cpfEligible: false,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop",
    description:
      "Les bases essentielles pour diriger une association sportive : gouvernance, obligations légales et gestion d'équipe bénévole.",
    programme: [
      { n: "01", title: "Cadre associatif", desc: "Statuts, obligations et responsabilités du dirigeant." },
      { n: "02", title: "Vie du club", desc: "Organisation des instances et des bénévoles." },
    ],
    formateurNom: "Nicolas Ferry",
    formateurRole: "Conseiller développement LGEF",
    sessions: [{ dateDebut: daysFromNow(7), lieu: "E-learning", places: 30 }],
    ordre: 0,
  },
  {
    slug: "tresorier-club",
    titre: "Trésorier de Club — Gestion Financière",
    categorie: "CLUB",
    dureeLabel: "2 jours",
    modeLabel: "Visio",
    lieu: "Visio",
    type: "VISIO",
    cpfEligible: false,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
    description: "Maîtriser le budget, la comptabilité associative et le suivi des subventions d'un club amateur.",
    programme: [
      { n: "01", title: "Comptabilité associative", desc: "Principes de base et outils de suivi." },
      { n: "02", title: "Budget & subventions", desc: "Construire et justifier un budget prévisionnel." },
    ],
    formateurNom: "Nicolas Ferry",
    formateurRole: "Conseiller développement LGEF",
    sessions: [{ dateDebut: new Date("2026-09-18"), lieu: "Visio", places: 14 }],
    ordre: 1,
  },
  {
    slug: "charge-dev",
    titre: "Chargé de Développement Sportif Territorial",
    categorie: "DEV",
    dureeLabel: "9 mois",
    modeLabel: "Présentiel",
    lieu: "Ludres",
    type: "PRESENTIEL",
    cpfEligible: true,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80&auto=format&fit=crop",
    description:
      "Un diplôme long pour piloter des projets de développement du football sur un territoire, en lien avec les clubs et les collectivités.",
    programme: [
      { n: "01", title: "Diagnostic territorial", desc: "Analyser les besoins et les publics cibles." },
      { n: "02", title: "Conduite de projet", desc: "Monter et piloter un plan de développement." },
      { n: "03", title: "Partenariats institutionnels", desc: "Travailler avec collectivités et fédérations." },
      { n: "04", title: "Alternance en structure", desc: "Mise en pratique au sein d'un district ou club." },
    ],
    formateurNom: "Camille Roussel",
    formateurRole: "Responsable développement LGEF",
    sessions: [{ dateDebut: new Date("2026-09-28"), lieu: "Ludres", places: 5 }],
    ordre: 0,
  },
  {
    slug: "resp-emploi",
    titre: "Responsable Emploi & Formation en Club",
    categorie: "DEV",
    dureeLabel: "4 mois",
    modeLabel: "Visio",
    lieu: "Visio",
    type: "VISIO",
    cpfEligible: true,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop",
    description:
      "Piloter la politique emploi-formation d'un club : recrutement des éducateurs, plan de formation et suivi des financements.",
    programme: [
      { n: "01", title: "Politique emploi-formation", desc: "Construire un plan pluriannuel adapté au club." },
      { n: "02", title: "Financements mobilisables", desc: "OPCO, aides à l'emploi, dispositifs FFF." },
      { n: "03", title: "Suivi & évaluation", desc: "Indicateurs de suivi et bilan annuel." },
    ],
    formateurNom: "Camille Roussel",
    formateurRole: "Responsable développement LGEF",
    sessions: [{ dateDebut: new Date("2026-10-06"), lieu: "Visio", places: 11 }],
    ordre: 1,
  },
]

type EquivalenceNode = {
  id: string
  group: "af" | "cfi" | "df" | "certif" | "pro-top" | "pro-mid" | "pro-bef" | "pro-bmf" | "pro-mid2" | "pro-bottom"
  label: string
  variant: "NAVY" | "LIGHT" | "RED" | "OUTLINE"
  badge?: string
  short?: string
  desc: string
}

const EQUIVALENCE_NODES: EquivalenceNode[] = [
  { id: "af-ethique", group: "af", label: "Éthique et Intégrité", variant: "NAVY", desc: "Attestation fédérale sensibilisant les bénévoles aux valeurs du football : respect, fair-play et lutte contre les discriminations." },
  { id: "af-feminine", group: "af", label: "Pratique Féminine", variant: "NAVY", desc: "Attestation dédiée à l'accompagnement du développement de la pratique féminine au sein du club." },
  { id: "af-handi", group: "af", label: "Handi-Foot", variant: "NAVY", desc: "Sensibilise à l'accueil et à l'encadrement de pratiquants en situation de handicap moteur." },
  { id: "af-adapte", group: "af", label: "Foot Adapté", variant: "NAVY", desc: "Sensibilise à l'accueil et à l'encadrement de pratiquants en situation de handicap mental ou psychique." },
  { id: "af-arbitrage", group: "af", label: "Arbitrage", variant: "NAVY", desc: "Initiation aux bases de l'arbitrage pour les bénévoles amenés à officier ponctuellement en club." },
  { id: "af-golf", group: "af", label: "Golf-Foot", variant: "NAVY", desc: "Attestation pour l'encadrement de la pratique loisir du golf-foot." },
  { id: "af-marchant", group: "af", label: "Foot en Marchant", variant: "NAVY", desc: "Attestation pour l'encadrement du foot en marchant, pratique douce ouverte à tous les âges." },
  { id: "af-foot5", group: "af", label: "FOOT5", variant: "NAVY", desc: "Attestation pour l'encadrement de la pratique à 5 joueurs, format convivial et accessible." },
  { id: "af-futnet", group: "af", label: "Futnet", variant: "NAVY", desc: "Attestation pour l'encadrement du futnet, discipline associant football et volley-ball." },
  { id: "af-fitfoot", group: "af", label: "Fit-Foot", variant: "NAVY", desc: "Attestation pour l'encadrement de séances de remise en forme par le football." },
  { id: "af-accompagnateur", group: "af", label: "Accompagnateur d'équipe", variant: "NAVY", desc: "Prépare les bénévoles à accompagner une équipe lors des déplacements et rencontres." },
  { id: "af-futsal", group: "af", label: "Futsal", variant: "NAVY", desc: "Sensibilise aux spécificités techniques et réglementaires de la pratique futsal." },

  { id: "cfi-seniors", group: "cfi", label: "Séniors", variant: "LIGHT", desc: "Certificat pour initier à l'encadrement d'une équipe senior." },
  { id: "cfi-u1419", group: "cfi", label: "U14-U19", variant: "LIGHT", desc: "Certificat pour initier à l'encadrement des catégories U14 à U19." },
  { id: "cfi-u1013", group: "cfi", label: "U10-U13", variant: "LIGHT", desc: "Certificat pour initier à l'encadrement des catégories U10 à U13." },
  { id: "cfi-u609", group: "cfi", label: "U6-U9", variant: "LIGHT", desc: "Certificat pour initier à l'encadrement des catégories U6 à U9 (foot animation)." },
  { id: "cfi-beach", group: "cfi", label: "Beach Soccer", variant: "NAVY", desc: "Certificat pour initier à l'encadrement de la pratique beach soccer." },
  { id: "cfi-gardien", group: "cfi", label: "Gardien de But", variant: "NAVY", desc: "Certificat pour initier à l'entraînement spécifique des gardiens de but." },
  { id: "cfi-prepa", group: "cfi", label: "Préparateur Physique", variant: "NAVY", desc: "Certificat pour initier à la préparation physique des joueurs amateurs." },
  { id: "cfi-futsal", group: "cfi", label: "Futsal", variant: "NAVY", desc: "Certificat pour initier à l'encadrement technique et tactique du futsal." },
  { id: "cfi-projet", group: "cfi", label: "Projet Club", variant: "NAVY", desc: "Certificat pour accompagner la construction et le suivi du projet de club." },
  { id: "cfi-cegb1", group: "cfi", label: "Certificat d'Entraîneur Gardien de But niveau 1", variant: "OUTLINE", desc: "Premier niveau de spécialisation pour l'entraînement des gardiens de but." },
  { id: "cfi-cegbfutsal", group: "cfi", label: "Certificat d'Entraîneur Gardien de But Futsal Initiation", variant: "OUTLINE", desc: "Spécialisation à l'entraînement des gardiens de but en futsal." },

  { id: "df-refe", group: "df", label: "Responsable École de Football", variant: "OUTLINE", badge: "C", desc: "Diplôme fédéral pour prendre la responsabilité pédagogique de l'école de football du club. Équivalent Licence UEFA C." },
  { id: "df-jeunes", group: "df", label: "Coach Jeunes", variant: "OUTLINE", desc: "Diplôme fédéral pour entraîner et coacher une équipe de jeunes en compétition." },
  { id: "df-seniors", group: "df", label: "Coach Séniors", variant: "OUTLINE", desc: "Diplôme fédéral pour entraîner et coacher une équipe senior en compétition." },
  { id: "df-journees", group: "df", label: "Journées Complémentaires", variant: "RED", desc: "Journées permettant, sous conditions, d'obtenir une équivalence vers les Diplômes Fédéraux. Réservées aux titulaires d'un CFF2 ou CFF3 certifié — les titulaires de CFI, même certifiés, n'y sont pas éligibles." },

  { id: "cert-cfi", group: "certif", label: "Certifications CFI", variant: "LIGHT", desc: "Certification validant l'acquisition des compétences d'un Certificat Fédéral Initiateur." },
  { id: "cert-cff", group: "certif", label: "Certifications CFF1, 2, 3 et 4", variant: "LIGHT", desc: "Certifications validant les niveaux successifs du Certificat de Formateur de Football." },
  { id: "cert-modules", group: "certif", label: "Certifications modules complémentaires", variant: "LIGHT", desc: "Certification des modules complémentaires suivis en complément d'un parcours principal." },

  { id: "pro-bepf", group: "pro-top", label: "Brevet d'Entraîneur Professionnel de Football", short: "BEPF", variant: "NAVY", badge: "Pro", desc: "Diplôme de plus haut niveau pour entraîner en filière professionnelle. Équivalent Licence UEFA Pro." },
  { id: "pro-beff", group: "pro-top", label: "Brevet d'Entraîneur Formateur de Football", short: "BEFF", variant: "NAVY", badge: "Youth", desc: "Diplôme dédié à la formation des jeunes en filière professionnelle. Équivalent Licence UEFA Youth." },
  { id: "pro-desjeps", group: "pro-mid", label: "DESJEPS", variant: "NAVY", desc: "Diplôme d'État permettant d'accéder aux diplômes professionnels supérieurs (BEPF, BEFF)." },
  { id: "pro-specialite", group: "pro-mid", label: "Certificats de spécialité", variant: "OUTLINE", desc: "Certificats permettant de se spécialiser (préparation physique, gardien de but...) au sein du parcours professionnel." },
  { id: "pro-bef", group: "pro-bef", label: "Brevet d'Entraîneur de Football", short: "BEF", variant: "NAVY", badge: "A", desc: "Diplôme professionnel de niveau supérieur pour entraîner un groupe senior de haut niveau régional. Équivalent Licence UEFA A. Accessible en traditionnel, en apprentissage ou par VAE." },
  { id: "pro-bmf", group: "pro-bmf", label: "Brevet de Moniteur de Football", short: "BMF", variant: "NAVY", badge: "B", desc: "Premier diplôme professionnel, accessible en traditionnel, en apprentissage ou par VAE. Équivalent Licence UEFA B." },
  { id: "pro-continue", group: "pro-mid2", label: "Formation Professionnelle Continue (recyclage)", variant: "OUTLINE", desc: "Formation de recyclage permettant aux titulaires du BMF et du BEF de maintenir leur diplôme à jour." },
  { id: "pro-cdssa", group: "pro-bottom", label: "Chargé de Développement de Structure Sportive Associative", short: "CDSSA", variant: "NAVY", desc: "Formation transversale, accessible en traditionnel ou en apprentissage, pour piloter le développement d'un club ou d'un district." },
]

function equivGroupDefaults(g: EquivalenceNode["group"]) {
  if (g === "af") return { dureeLabel: "1 jour", modeLabel: "Présentiel", type: "PRESENTIEL" as const, lieu: "Selon club", cpfEligible: false }
  if (g === "cfi") return { dureeLabel: "2 jours", modeLabel: "Présentiel", type: "PRESENTIEL" as const, lieu: "Ludres", cpfEligible: false }
  if (g === "df") return { dureeLabel: "4 jours", modeLabel: "Présentiel", type: "PRESENTIEL" as const, lieu: "Ludres", cpfEligible: false }
  if (g === "certif") return { dureeLabel: "Variable", modeLabel: "Certification", type: "PRESENTIEL" as const, lieu: "Ludres", cpfEligible: false }
  return { dureeLabel: "Nous consulter", modeLabel: "Présentiel / Apprentissage / VAE", type: "PRESENTIEL" as const, lieu: "Ludres", cpfEligible: true }
}

const EQUIV_GROUP_ENUM: Record<EquivalenceNode["group"], GroupeEquivalence> = {
  af: "AF",
  cfi: "CFI",
  df: "DF",
  certif: "CERTIF",
  "pro-top": "PRO_TOP",
  "pro-mid": "PRO_MID",
  "pro-bef": "PRO_BEF",
  "pro-bmf": "PRO_BMF",
  "pro-mid2": "PRO_MID2",
  "pro-bottom": "PRO_BOTTOM",
}

const EQUIV_IMAGE =
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80&auto=format&fit=crop"

const EQUIVALENCE_FORMATIONS: FormationSeed[] = EQUIVALENCE_NODES.map((n, i) => {
  const d = equivGroupDefaults(n.group)
  return {
    slug: n.id,
    titre: n.label,
    categorie: "EDUCATEUR",
    filiere: n.group.startsWith("pro") ? "PROFESSIONNELLE" : "BENEVOLE",
    dureeLabel: d.dureeLabel,
    modeLabel: d.modeLabel,
    lieu: d.lieu,
    type: d.type,
    cpfEligible: d.cpfEligible,
    image: EQUIV_IMAGE,
    description: n.desc,
    programme: [{ n: "01", title: "Contenu de la formation", desc: n.desc }],
    formateurNom: "Équipe pédagogique IR2F",
    formateurRole: "Formateurs certifiés FFF",
    sessions: [{ dateDebut: daysFromNow(30), lieu: d.lieu, places: null }],
    ordre: 100 + i,
    groupeEquivalence: EQUIV_GROUP_ENUM[n.group],
    varianteNode: n.variant,
    badgeNode: n.badge,
    shortNode: n.short,
  }
})

const ALL_FORMATIONS = [...FORMATIONS, ...EQUIVALENCE_FORMATIONS]

const STATS = [
  { valeur: "1 200+", label: "Stagiaires formés / an", ordre: 0 },
  { valeur: "94%", label: "Taux de réussite", ordre: 1 },
  { valeur: "15 ans", label: "D'expérience", ordre: 2 },
  { valeur: "25+", label: "Formations disponibles", ordre: 3 },
]

const CATEGORY_INFO = [
  {
    categorie: "EDUCATEUR" as const,
    titre: "ÉDUCATEUR : FORMER LES ENCADRANTS DE DEMAIN",
    corps:
      "Découvrez le catalogue de formations Éducateur de l'IR2F ! Des parcours en présentiel, visioconférence et e-learning pour accompagner les éducateurs à tous les niveaux, du foot animation jusqu'au haut niveau régional, et leur donner les outils pédagogiques, tactiques et humains pour progresser dans leurs missions.",
  },
  {
    categorie: "ARBITRAGE" as const,
    titre: "ARBITRAGE : DEVENIR ET PROGRESSER COMME ARBITRE",
    corps:
      "Le catalogue de formations Arbitrage de l'IR2F s'adresse à tous ceux qui souhaitent devenir arbitre ou se perfectionner. Lois du jeu, placement, gestion de match : des formations en présentiel et en visioconférence pour progresser à son rythme et gagner en confiance sur le terrain.",
  },
  {
    categorie: "TERRAIN" as const,
    titre: "TOUT TERRAIN : LE PARCOURS DE FORMATION DES ACTEURS DU CLUB",
    corps:
      "Découvrez le nouveau catalogue de formation Tout Terrain à destination de tous les acteurs du club !\n\nCes formations qui sont disponibles en présentiel, en visioconférence et en e-learning ont vocation de permettre à tous les acteurs du club, dirigeants, bénévoles, arbitres, éducateurs et parents de licenciés, d'acquérir de nouvelles compétences, leur transmettre de nouveaux outils et surtout les conforter dans leurs missions. Les formations répondent à une approche pédagogique ludique et participative permettant de nombreux échanges entre les participants qui deviennent acteurs de leurs formations !",
  },
  {
    categorie: "DEV" as const,
    titre: "CHARGÉ DE DÉVELOPPEMENT : PILOTER LES PROJETS DU FOOTBALL RÉGIONAL",
    corps:
      "Ce catalogue s'adresse aux futurs chargés de développement et responsables emploi-formation. Diagnostic territorial, conduite de projet, financements : des parcours longs, en présentiel et à distance, pour structurer et développer le football sur son territoire.",
  },
]

const HERO_SLIDES = [
  {
    badge: "Formation du moment",
    titre: "BEF — Brevet d'Entraîneur de Football",
    image: "https://images.unsplash.com/photo-1544717684-1243da23b545?w=1600&q=80&auto=format&fit=crop",
    ctaLabel: "En savoir plus",
    formationSlug: "bef",
    ordre: 0,
  },
  {
    badge: "Formation à venir",
    titre: "Arbitre Régional — Ouverture des inscriptions",
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=1600&q=80&auto=format&fit=crop",
    ctaLabel: "En savoir plus",
    formationSlug: null,
    ordre: 1,
  },
  {
    badge: "Actualité IR2F",
    titre: "Certification Qualiopi renouvelée",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80&auto=format&fit=crop",
    ctaLabel: "En savoir plus",
    formationSlug: null,
    ordre: 2,
  },
]

async function main() {
  for (const f of ALL_FORMATIONS) {
    const formation = await prisma.formation.upsert({
      where: { slug: f.slug },
      update: {
        titre: f.titre,
        categorie: f.categorie,
        filiere: f.filiere ?? null,
        statut: "PUBLIEE",
        dureeLabel: f.dureeLabel,
        modeLabel: f.modeLabel,
        lieu: f.lieu,
        type: f.type,
        cpfEligible: f.cpfEligible,
        image: f.image,
        description: f.description,
        programme: f.programme,
        formateurNom: f.formateurNom,
        formateurRole: f.formateurRole,
        ordre: f.ordre,
        groupeEquivalence: f.groupeEquivalence ?? null,
        varianteNode: f.varianteNode ?? null,
        badgeNode: f.badgeNode ?? null,
        shortNode: f.shortNode ?? null,
      },
      create: {
        slug: f.slug,
        titre: f.titre,
        categorie: f.categorie,
        filiere: f.filiere ?? null,
        statut: "PUBLIEE",
        dureeLabel: f.dureeLabel,
        modeLabel: f.modeLabel,
        lieu: f.lieu,
        type: f.type,
        cpfEligible: f.cpfEligible,
        image: f.image,
        description: f.description,
        programme: f.programme,
        formateurNom: f.formateurNom,
        formateurRole: f.formateurRole,
        ordre: f.ordre,
        groupeEquivalence: f.groupeEquivalence ?? null,
        varianteNode: f.varianteNode ?? null,
        badgeNode: f.badgeNode ?? null,
        shortNode: f.shortNode ?? null,
      },
    })

    await prisma.session.deleteMany({ where: { formationId: formation.id } })
    for (const s of f.sessions) {
      await prisma.session.create({
        data: {
          formationId: formation.id,
          dateDebut: s.dateDebut,
          dateFin: s.dateDebut,
          lieu: s.lieu,
          places: s.places,
        },
      })
    }
  }

  for (const c of CATEGORY_INFO) {
    await prisma.categorieInfo.upsert({
      where: { categorie: c.categorie },
      update: { titre: c.titre, corps: c.corps },
      create: c,
    })
  }

  await prisma.statCle.deleteMany()
  await prisma.statCle.createMany({ data: STATS.map((s) => ({ ...s, actif: true })) })

  await prisma.heroSlide.deleteMany()
  for (const h of HERO_SLIDES) {
    const formation = h.formationSlug
      ? await prisma.formation.findUnique({ where: { slug: h.formationSlug } })
      : null
    await prisma.heroSlide.create({
      data: {
        badge: h.badge,
        titre: h.titre,
        image: h.image,
        ctaLabel: h.ctaLabel,
        ordre: h.ordre,
        actif: true,
        formationId: formation?.id ?? null,
      },
    })
  }

  console.log(`Seed terminé : ${ALL_FORMATIONS.length} formations, ${STATS.length} stats, ${HERO_SLIDES.length} hero slides.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
