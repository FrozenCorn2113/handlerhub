import { siteConfig } from '@/config/site'

import { prisma } from '@/lib/db'
import { signInWithPasswordSchema } from '@/lib/validations/auth'

import MagicLinkEmail from '@/components/emails/magic-link-email'

import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import ResendProvider from 'next-auth/providers/resend'
import { Resend } from 'resend'

var bcryptjs = require('bcryptjs')

// Read env vars directly from process.env to avoid importing env.mjs.
// The env.mjs t3 validation requires ALL server env vars (like
// POSTGRES_DATABASE_URL) to be valid before ANY value can be read.
// If a single unrelated var fails validation the entire auth module
// refuses to load, which silently kills the OAuth callback handler
// and produces the opaque "Configuration" error with zero function logs.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? siteConfig.mailSupport

const oauthProviders = [
  ...(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET
    ? [
        Google({
          id: 'google',
          name: 'Google',
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : []),
  ...(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET
    ? [
        GitHubProvider({
          id: 'github',
          name: 'GitHub',
          clientId: GITHUB_CLIENT_ID,
          clientSecret: GITHUB_CLIENT_SECRET,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : []),
]

// Inline Resend client to avoid importing @/lib/email which also
// depends on env.mjs and would re-introduce the same failure mode.
const resendClient = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export default {
  providers: [
    ...oauthProviders,
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      async authorize(rawCredentials) {
        const validatedFields =
          signInWithPasswordSchema.safeParse(rawCredentials)

        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data

        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          })

          if (!user || !user.password) {
            return null
          }

          const passwordMatch = await bcryptjs.compare(password, user.password)

          if (!passwordMatch) {
            return null
          }

          return user
        } catch (error) {
          return null
        }
      },
    }),
    ResendProvider({
      id: 'resend',
      name: 'Resend',
      apiKey: RESEND_API_KEY,
      from: RESEND_FROM_EMAIL,
      async sendVerificationRequest({
        identifier,
        url,
      }: {
        identifier: string
        url: string
      }) {
        if (!resendClient) {
          throw new Error('Resend API key not configured')
        }
        try {
          await resendClient.emails.send({
            from: RESEND_FROM_EMAIL,
            to: [identifier],
            subject: `${siteConfig.name} magic link sign in`,
            react: MagicLinkEmail({ identifier, url }),
          })
          console.log('Verification email sent')
        } catch (error) {
          console.log(error)
          throw new Error('Failed to send verification email')
        }
      },
    }),
  ],
} satisfies NextAuthConfig
