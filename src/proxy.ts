import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isLoginPage = req.nextUrl.pathname === "/login"
  const isPublicPage =
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/formations") ||
    req.nextUrl.pathname.startsWith("/emploi") ||
    req.nextUrl.pathname.startsWith("/contact")

  if (!isLoggedIn && !isLoginPage && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
