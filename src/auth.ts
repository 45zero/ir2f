import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.actif) return null
        if (!user.password) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: `${user.prenom} ${user.nom}`,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.checkedAt = Date.now()
        return token
      }
      // Le rôle est mis en cache dans le jeton (valable 30 jours) : on le revalide en base toutes
      // les 5 minutes pour qu'un compte désactivé, supprimé ou rétrogradé perde ses droits
      // rapidement. Retourner null déconnecte l'utilisateur.
      if (token.id && Date.now() - Number(token.checkedAt ?? 0) > 5 * 60 * 1000) {
        const fresh = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, actif: true },
        })
        if (!fresh || !fresh.actif) return null
        token.role = fresh.role
        token.checkedAt = Date.now()
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})
