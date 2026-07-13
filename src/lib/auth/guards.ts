import "server-only"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export async function requireAdmin() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard")
  }
  return session
}

export async function requireFormateur() {
  const session = await auth()
  if (session?.user?.role !== "FORMATEUR") {
    redirect("/dashboard")
  }
  return session
}
