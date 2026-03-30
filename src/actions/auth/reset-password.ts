'use server'

import { siteConfig } from '@/config/site'

import { prisma } from '@/lib/db'
import { resend } from '@/lib/email'
import {
  PasswordResetFormInput,
  passwordResetSchema,
} from '@/lib/validations/auth'

import { ResetPasswordEmail } from '@/components/emails/reset-password-email'

import { getUserByEmail } from '@/actions/user'
import { env } from '@/root/env.mjs'
import crypto from 'crypto'

// TODO: Add rate limiting to prevent abuse (e.g., max 3 requests per email per hour)
export async function resetPassword(
  rawInput: PasswordResetFormInput
): Promise<'invalid-input' | 'error' | 'success'> {
  try {
    const validatedInput = passwordResetSchema.safeParse(rawInput)
    if (!validatedInput.success) return 'invalid-input'

    const user = await getUserByEmail({ email: validatedInput.data.email })

    // Enumeration prevention: return success even if user not found.
    // This prevents attackers from discovering which emails are registered.
    if (!user) return 'success'

    const resetPasswordToken = crypto.randomBytes(32).toString('base64url')
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetPasswordToken)
      .digest('hex')

    // Token expires in 30 minutes (OWASP recommends max 1 hour)
    const resetPasswordTokenExpiry = new Date(Date.now() + 30 * 60 * 1000)

    // Storing hashed token invalidates any previous token automatically
    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry,
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
      subject: `${siteConfig.name} - Reset your password`,
      react: ResetPasswordEmail({
        email: validatedInput.data.email,
        resetPasswordToken,
      }),
    })

    return userUpdated && emailSent ? 'success' : 'error'
  } catch (error) {
    console.error(error)
    return 'error'
  }
}
