import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { LoginForm } from "@/components/login/LoginForm"
import { colors, fontHeading } from "@/lib/theme"

export default async function LoginPage() {
  const session = await auth()
  if (session?.user) redirect("/dashboard")

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.bg,
        fontFamily: "'Inter', sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 2px 10px rgba(20,33,61,0.08)",
          padding: "clamp(28px,4vw,40px)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <Link href="/" style={{ alignSelf: "center" }}>
          <img src="/images/logo-ir2f.png" alt="IR2F" style={{ height: 64, width: "auto" }} />
        </Link>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, textAlign: "center" }}>
          <h1
            style={{
              fontFamily: fontHeading,
              color: colors.navy,
              fontSize: 26,
              fontWeight: 800,
              margin: 0,
            }}
          >
            Connexion
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 14, margin: 0 }}>
            Accédez à votre espace IR2F.
          </p>
        </div>

        <LoginForm />

        <Link
          href="/"
          style={{
            alignSelf: "center",
            color: colors.textLight,
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
