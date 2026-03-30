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
): Promise<{ status: string; debug?: string }> {
  try {
    const validatedInput = signUpWithPasswordSchema.safeParse(rawInput)
    if (!validatedInput.success)
      return {
        status: 'invalid-input',
        debug: JSON.stringify(validatedInput.error.flatten()),
      }

    const user = await getUserByEmail({ email: validatedInput.data.email })
    if (user) return { status: 'exists' }

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10)
    const emailVerificationToken = crypto.randomBytes(32).toString('base64url')

    const newUser = await prisma.user.create({
      data: {
        email: validatedInput.data.email,
        password: passwordHash,
        emailVerificationToken,
      },
    })

    if (!newUser)
      return { status: 'error', debug: 'prisma.user.create returned falsy' }

    // Email sending is best-effort — account is already created
    try {
      const fromEmail = env.RESEND_FROM_EMAIL
      if (fromEmail) {
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
          'RESEND_FROM_EMAIL is not set — skipping verification email'
        )
      }
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Don't fail signup — user can resend verification later
    }

    return { status: 'success' }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Signup error:', msg, error)
    return { status: 'error', debug: msg }
  }
}
