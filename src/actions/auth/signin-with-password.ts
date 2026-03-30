'use server'

import { signIn } from '@/lib/auth/auth'
import {
  SignInWithPasswordFormInput,
  signInWithPasswordSchema,
} from '@/lib/validations/auth'

import { getUserByEmail } from '@/actions/user'
import { AuthError } from 'next-auth'

export async function signInWithPassword(
  rawInput: SignInWithPasswordFormInput
): Promise<
  | 'invalid-input'
  | 'invalid-credentials'
  | 'not-registered'
  | 'unverified-email'
  | 'incorrect-provider'
  | 'success'
> {
  try {
    const validatedInput = signInWithPasswordSchema.safeParse(rawInput)
    if (!validatedInput.success) return 'invalid-input'

    const existingUser = await getUserByEmail({
      email: validatedInput.data.email,
    })
    if (!existingUser) return 'not-registered'

    if (!existingUser.email || !existingUser.password)
      return 'incorrect-provider'

    if (!existingUser.emailVerified) return 'unverified-email'

    await signIn('credentials', {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirect: false,
    })

    return 'success'
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Auth error:', error.type, error.message)
      return 'invalid-credentials'
    }
    // Re-throw non-AuthErrors (NEXT_REDIRECT, etc.) so Next.js can handle them
    throw error
  }
}
