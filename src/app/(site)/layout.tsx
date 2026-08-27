import { auth } from "@/auth"
import { Header, type HeaderUser } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { getFooterLogos } from "@/lib/home"

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [session, footerLogos] = await Promise.all([auth(), getFooterLogos()])
  const user: HeaderUser = session?.user
    ? { name: session.user.name, role: session.user.role }
    : null

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        color: "#14213d",
        background: "#f5f5f5",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Header user={user} />
      <div style={{ height: 68 }} />
      {children}
      <Footer logos={footerLogos} />
    </div>
  )
}
