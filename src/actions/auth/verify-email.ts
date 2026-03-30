'use server'

import { siteConfig } from '@/config/site'

import { prisma } from '@/lib/db'
import { resend } from '@/lib/email'

import { WelcomeEmail } from '@/components/emails/welcome-email'

import { env } from '@/root/env.mjs'
import crypto from 'crypto'

export async function verifyEmail(
  token: string
): Promise<
  'missing-token' | 'invalid-token' | 'already-verified' | 'error' | 'success'
> {
  if (!token) return 'missing-token'

  try {
    // Hash the incoming token to compare against stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await prisma.user.findUnique({
      where: { emailVerificationToken: hashedToken },
    })

    if (!user) return 'invalid-token'

    if (user.emailVerified) return 'already-verified'

    // Mark email as verified and clear the token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    })

    // Send welcome email (best-effort)
    try {
      const fromEmail = env.RESEND_FROM_EMAIL
      if (fromEmail && user.email) {
        await resend.emails.send({
          from: fromEmail,
          to: [user.email],
          subject: `Welcome to ${siteConfig.name}`,
          react: WelcomeEmail({ email: user.email }),
        })
      }
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
    }

    return 'success'
  } catch (error) {
    console.error('Email verification error:', error)
    return 'error'
  }
}
