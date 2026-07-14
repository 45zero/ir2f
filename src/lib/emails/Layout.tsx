export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ir2f.lgef.fr"

const colors = {
  navy: "#1a3a6b",
  red: "#e30613",
  gold: "#c9a84c",
  text: "#14213d",
  textMuted: "#4a5568",
  textLight: "#8a93a3",
}

export function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", padding: "32px 16px" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", background: "#ffffff", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ background: colors.navy, padding: "16px 28px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${SITE_URL}/images/logo-ir2f.png`} alt="IR2F" width={92} height={58} style={{ display: "block" }} />
        </div>
        <div style={{ padding: "28px", color: colors.text, fontSize: 14, lineHeight: 1.6 }}>{children}</div>
        <div style={{ padding: "16px 28px", borderTop: "1px solid #eef0f3" }}>
          <span style={{ color: colors.textLight, fontSize: 11 }}>
            IR2F — Institut Régional de Formation Football · Ligue Grand Est FFF
          </span>
        </div>
      </div>
    </div>
  )
}

export function EmailButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        background: colors.red,
        color: "#ffffff",
        textDecoration: "none",
        padding: "12px 24px",
        borderRadius: 4,
        fontSize: 14,
        fontWeight: 700,
        marginTop: 16,
      }}
    >
      {children}
    </a>
  )
}

export function EmailCredentialBox({ email, password }: { email: string; password: string }) {
  return (
    <div style={{ background: "#f5f7fb", border: "1px solid #e4e9f2", borderRadius: 6, padding: "14px 18px", margin: "16px 0" }}>
      <div style={{ fontSize: 12, color: colors.textMuted }}>
        Email : <strong style={{ color: colors.text }}>{email}</strong>
      </div>
      <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
        Mot de passe temporaire : <strong style={{ color: colors.text, letterSpacing: 0.5 }}>{password}</strong>
      </div>
    </div>
  )
}

export { colors as emailColors }
