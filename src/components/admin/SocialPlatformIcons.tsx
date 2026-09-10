// Logos de marque (Facebook/Instagram/TikTok/LinkedIn) — traits pleins volontairement, pas de
// style "Feather outline" ici : ce sont des marques reconnaissables, pas des icônes génériques
// d'interface. Couleurs de marque officielles sur le glyphe lui-même (pas currentColor) pour un
// rendu "designé" ; les usages grisés (plateformes pas encore branchées) désaturent via CSS
// `filter: grayscale(1)` sur le conteneur plutôt que de changer la couleur ici.

export const PLATFORM_COLORS = {
  FACEBOOK: "#1877F2",
  INSTAGRAM: "#E1306C",
  TIKTOK: "#000000",
  LINKEDIN: "#0A66C2",
} as const

export function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={PLATFORM_COLORS.FACEBOOK}
        d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"
      />
    </svg>
  )
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  const gradientId = "ig-gradient"
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="35%" stopColor="#D62976" />
          <stop offset="70%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#${gradientId})`} />
      <circle cx="12" cy="12" r="4.6" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="#fff" />
    </svg>
  )
}

export function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#25F4EE" d="M17.2 2.6h-3.6v14.2a2.9 2.9 0 1 1-2.4-2.86V10.4a6.2 6.2 0 1 0 5.5 6.15V9.2a7.9 7.9 0 0 0 4.5 1.4V7.4a4.4 4.4 0 0 1-4-4.8z" transform="translate(-.35 0)" />
      <path fill="#FE2C55" d="M16.8 2.2h-3.6v14.2a2.9 2.9 0 1 1-2.4-2.86V10a6.2 6.2 0 1 0 5.5 6.15V8.8a7.9 7.9 0 0 0 4.5 1.4V6.9a4.4 4.4 0 0 1-4-4.7z" transform="translate(.35 0)" />
      <path
        fill="#000"
        d="M17 2.4h-3.6v14.2a2.9 2.9 0 1 1-2.4-2.86V10.2a6.2 6.2 0 1 0 5.5 6.15V9a7.9 7.9 0 0 0 4.5 1.4V7.1a4.4 4.4 0 0 1-4-4.7z"
      />
    </svg>
  )
}

export function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="1" y="1" width="22" height="22" rx="4" fill={PLATFORM_COLORS.LINKEDIN} />
      <path
        fill="#fff"
        d="M7.4 9.6H4.9V19h2.5V9.6zM6.15 8.4a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9zM19 13.3c0-3-1.6-4.4-3.75-4.4-1.73 0-2.5.95-2.94 1.62V9.6H9.8c.03.7 0 9.4 0 9.4h2.5v-5.25c0-.28.02-.56.1-.76.23-.56.74-1.14 1.6-1.14 1.13 0 1.58.86 1.58 2.12V19H19v-5.7z"
      />
    </svg>
  )
}
