import authConfig from '@/lib/auth/auth.config'
import { prisma } from '@/lib/db'
import { getUserById } from '@/lib/user'

import { getUserById as actionGetUserById } from '@/actions/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    signOut: '/signout',
    error: '/auth-error',
    verifyRequest: '/login/magic-link-signin',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.id) return false
      if (account?.provider !== 'credentials') return true

      const existingUser = await actionGetUserById({ id: user.id })

      return !existingUser?.emailVerified ? false : true
    },

    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub
        }

        if (token.role && session.user) {
          session.user.role = token.role as UserRole
        }

        if (token.email) {
          session.user.email = token.email
        }

        session.user.name = token.name
        session.user.image = token.picture
      }

      return session
    },

    async jwt({ token, trigger }) {
      if (!token.sub) return token

      const dbUser = await getUserById(token.sub)

      if (!dbUser) return token

      token.name = dbUser.name
      token.role = dbUser.role
      token.email = dbUser.email
      token.picture = dbUser.image

      return token
    },
  },
  debug: process.env.NODE_ENV !== 'production',
  logger: {
    error(error: any) {
      // Always log errors, even in production, so we can diagnose
      // "Configuration" errors in Vercel function logs.
      console.error(
        '[NextAuth][error]',
        error?.name ?? 'Unknown',
        error?.message ?? error,
        error?.cause ?? ''
      )
    },
    warn(code: string) {
      console.warn('[NextAuth][warn]', code)
    },
    debug(code: string, metadata: unknown) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[NextAuth][debug]', code, metadata)
      }
    },
  },
})
