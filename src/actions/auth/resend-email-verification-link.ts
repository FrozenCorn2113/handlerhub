'use server'

import { siteConfig } from '@/config/site'

import { prisma } from '@/lib/db'
import { resend } from '@/lib/email'
import {
  EmailVerificationFormInput,
  emailVerificationSchema,
} from '@/lib/validations/email'

import { EmailVerificationEmail } from '@/components/emails/email-verification-email'

import { getUserByEmail } from '../user'
import { env } from '@/root/env.mjs'
import crypto from 'crypto'

// TODO: Add rate limiting to prevent abuse (e.g., max 3 requests per email per hour)
export async function resendEmailVerificationLink(
  rawInput: EmailVerificationFormInput
): Promise<'invalid-input' | 'not-found' | 'error' | 'success'> {
  try {
    const validatedInput = emailVerificationSchema.safeParse(rawInput)
    if (!validatedInput.success) return 'invalid-input'

    const user = await getUserByEmail({ email: validatedInput.data.email })
    if (!user) return 'not-found'

    // Generate new token and hash it for storage (invalidates any previous token)
    const emailVerificationToken = crypto.randomBytes(32).toString('base64url')
    const hashedToken = crypto
      .createHash('sha256')
      .update(emailVerificationToken)
      .digest('hex')

    const userUpdated = await prisma.user.update({
      where: {
        email: validatedInput.data.email,
      },
      data: {
        emailVerificationToken: hashedToken,
      },
    })

    const fromEmail = env.RESEND_FROM_EMAIL
    if (!fromEmail) {
      throw new Error('RESEND_FROM_EMAIL is not set')
    }

    // Send the raw (unhashed) token in the email link
    const emailSent = await resend.emails.send({
      from: fromEmail,
      to: [validatedInput.data.email],
      subject: `${siteConfig.name} - Verify your email address`,
      react: EmailVerificationEmail({
        email: validatedInput.data.email,
        emailVerificationToken,
      }),
    })

    return userUpdated && emailSent ? 'success' : 'error'
  } catch (error) {
    console.error(error)
    throw new Error('Error resending email verification link')
  }
}
