/**
 * Edge-compatible auth config for middleware.
 *
 * This is a lightweight subset of auth.config.ts that avoids importing
 * Node-only dependencies (Prisma, bcryptjs, Resend, React email components).
 * The middleware only needs providers for session verification, not for
 * actually running the credential/email sign-in flows.
 */
import { NextAuthConfig } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

const oauthProviders = [
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [
        Google({
          id: 'google',
          name: 'Google',
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : []),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? [
        GitHubProvider({
          id: 'github',
          name: 'GitHub',
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : []),
]

export default {
  providers: [...oauthProviders],
} satisfies NextAuthConfig
