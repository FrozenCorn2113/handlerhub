'use server'

import { siteConfig } from '@/config/site'

import { prisma } from '@/lib/db'
import { resend } from '@/lib/email'
import { absoluteUrl } from '@/lib/utils'
import {
  SignUpWithPasswordFormInput,
  signUpWithPasswordSchema,
} from '@/lib/validations/auth'

import { EmailVerificationEmail } from '@/components/emails/email-verification-email'

import { getUserByEmail } from '@/actions/user'
import { env } from '@/root/env.mjs'
import crypto from 'crypto'

var bcryptjs = require('bcryptjs')

const baseUrl = absoluteUrl('')

export async function signUpWithPassword(
  rawInput: SignUpWithPasswordFormInput
): Promise<'invalid-input' | 'exists' | 'error' | 'success'> {
  try {
    const validatedInput = signUpWithPasswordSchema.safeParse(rawInput)
    if (!validatedInput.success) return 'invalid-input'

    const user = await getUserByEmail({ email: validatedInput.data.email })
    if (user) return 'exists'

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10)
    const emailVerificationToken = crypto.randomBytes(32).toString('base64url')
    const hashedToken = crypto
      .createHash('sha256')
      .update(emailVerificationToken)
      .digest('hex')

    const newUser = await prisma.user.create({
      data: {
        email: validatedInput.data.email,
        password: passwordHash,
        emailVerificationToken: hashedToken,
      },
    })

    if (!newUser) return 'error'

    // Email sending is best-effort -- account is already created
    try {
      const fromEmail = env.RESEND_FROM_EMAIL
      if (fromEmail) {
        // Send the raw (unhashed) token in the email link
        await resend.emails.send({
          from: fromEmail,
          to: [validatedInput.data.email],
          subject: `${siteConfig.name} - Verify your email address`,
          react: EmailVerificationEmail({
            email: validatedInput.data.email,
            emailVerificationToken,
          }),
        })
      } else {
        console.error(
          'RESEND_FROM_EMAIL is not set -- skipping verification email'
        )
      }
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Don't fail signup -- user can resend verification later
    }

    return 'success'
  } catch (error) {
    console.error('Signup error:', error)
    return 'error'
  }
}
