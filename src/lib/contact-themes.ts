export const CONTACT_THEMES = [
  {
    value: "educateurs-benevoles",
    label: "Éducateurs — Formations Bénévoles (AF, CFI, DF)",
    email: "educateurs@lgef.fff.fr",
  },
  {
    value: "educateurs-professionnelles",
    label: "Éducateurs — Formations Professionnelles (BEF, BMF, CDSSA)",
    email: "idongois@lgef.fff.fr",
  },
  {
    value: "vae",
    label: "VAE — Éducateurs Formation Professionnelle (BEF et BMF)",
    email: "lbenharrat@lgef.fff.fr",
  },
  {
    value: "arbitrage",
    label: "Formation Initiale en Arbitrage (FIA)",
    email: "arbitrage@lgef.fff.fr",
  },
  {
    value: "tout-terrain",
    label: "Tout Terrain",
    email: "egendron@lgef.fff.fr",
  },
  {
    value: "emploi",
    label: "Emploi / Professionnalisation",
    email: "fgosselin@lgef.fff.fr",
  },
] as const

export type ContactThemeValue = (typeof CONTACT_THEMES)[number]["value"]

export function getContactTheme(value: string | null | undefined) {
  return CONTACT_THEMES.find((t) => t.value === value) ?? null
}
