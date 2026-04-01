import authConfig from '@/lib/auth/auth.config'
import { prisma } from '@/lib/db'
import { getUserById } from '@/lib/user'

import { getUserById as actionGetUserById } from '@/actions/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'
import type { Adapter, AdapterUser } from 'next-auth/adapters'

// Wrap the PrismaAdapter to handle orphaned Account records.
// An orphan occurs when an Account row exists but its linked User has
// been deleted.  The default adapter crashes with a "Configuration"
// error in that case.  This wrapper detects the orphan, deletes the
// stale Account row, and returns null so NextAuth treats the sign-in
// as a brand-new account link.
const baseAdapter = PrismaAdapter(prisma)

const adapter: Adapter = {
  ...baseAdapter,
  async getUserByAccount(
    providerAccountId: Pick<
      import('next-auth/adapters').AdapterAccount,
      'provider' | 'providerAccountId'
    >
  ): Promise<AdapterUser | null> {
    // Look up the Account row directly
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: providerAccountId.provider,
          providerAccountId: providerAccountId.providerAccountId,
        },
      },
      include: { user: true },
    })

    if (!account) return null

    // Account exists but User is gone -> orphan
    if (!account.user) {
      console.warn(
        '[NextAuth] Deleting orphaned Account record for provider',
        providerAccountId.provider,
        'providerAccountId',
        providerAccountId.providerAccountId
      )
      await prisma.account.delete({
        where: { id: account.id },
      })
      return null
    }

    return account.user as AdapterUser
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  adapter,
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

      // For credentials, require email verification
      if (account?.provider === 'credentials') {
        const existingUser = await actionGetUserById({ id: user.id })
        return !existingUser?.emailVerified ? false : true
      }

      // For OAuth providers (Google, GitHub, etc.), check if user needs onboarding
      // A user needs onboarding if they have no HandlerProfile
      try {
        const profile = await prisma.handlerProfile.findUnique({
          where: { userId: user.id },
          select: { id: true, profileCompleteness: true },
        })

        // No profile at all, or profile completeness is very low -> onboarding
        if (
          !profile ||
          !profile.profileCompleteness ||
          profile.profileCompleteness <= 10
        ) {
          return '/onboarding'
        }
      } catch (error) {
        // If DB query fails, allow sign-in normally rather than blocking
        console.error('[NextAuth] Error checking onboarding status:', error)
      }

      return true
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
