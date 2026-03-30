'use server'

import { siteConfig } from '@/config/site'

import { prisma } from '@/lib/db'
import { resend } from '@/lib/email'
import {
  PasswordUpdateFormInputExtended,
  passwordUpdateSchemaExtended,
} from '@/lib/validations/auth'

import { PasswordChangedEmail } from '@/components/emails/password-changed-email'

import { env } from '@/root/env.mjs'
import crypto from 'crypto'

var bcryptjs = require('bcryptjs')

export async function updatePassword(
  rawInput: PasswordUpdateFormInputExtended
): Promise<'invalid-input' | 'not-found' | 'expired' | 'error' | 'success'> {
  try {
    const validatedInput = passwordUpdateSchemaExtended.safeParse(rawInput)
    if (
      !validatedInput.success ||
      validatedInput.data.password !== validatedInput.data.confirmPassword
    )
      return 'invalid-input'

    // Hash the incoming token to compare against stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(validatedInput.data.resetPasswordToken)
      .digest('hex')

    const user = await prisma.user.findUnique({
      where: {
        resetPasswordToken: hashedToken,
      },
    })

    if (!user) return 'not-found'

    const resetPasswordExpiry = user.resetPasswordTokenExpiry
    if (!resetPasswordExpiry || resetPasswordExpiry < new Date())
      return 'expired'

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10)

    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    })

    // Send password changed confirmation email (best-effort)
    try {
      const fromEmail = env.RESEND_FROM_EMAIL
      if (fromEmail && user.email) {
        await resend.emails.send({
          from: fromEmail,
          to: [user.email],
          subject: `${siteConfig.name} - Your password was changed`,
          react: PasswordChangedEmail({ email: user.email }),
        })
      }
    } catch (emailError) {
      console.error('Failed to send password changed email:', emailError)
    }

    return userUpdated ? 'success' : 'error'
  } catch (error) {
    console.error(error)
    throw new Error('Error updating password')
  }
}
