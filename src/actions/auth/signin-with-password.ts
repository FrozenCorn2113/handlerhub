'use server'

import { signIn } from '@/lib/auth/auth'
import { prisma } from '@/lib/db'
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
  | { status: 'success'; redirectTo: string }
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

    // Determine redirect destination BEFORE signIn, since signIn may
    // throw a NEXT_REDIRECT that prevents code after it from running.
    const profile = await prisma.handlerProfile.findUnique({
      where: { userId: existingUser.id },
      select: { profileCompleteness: true },
    })

    const redirectTo =
      !profile ||
      profile.profileCompleteness === null ||
      profile.profileCompleteness < 60
        ? '/onboarding'
        : '/dashboard'

    try {
      await signIn('credentials', {
        email: validatedInput.data.email,
        password: validatedInput.data.password,
        redirect: false,
      })
    } catch (signInError) {
      // NextAuth v5 signIn() throws a NEXT_REDIRECT even with
      // redirect:false in server actions.  We catch it here so we can
      // return a structured response to the client instead of letting
      // the redirect hijack the response.  The session cookie is
      // already set by the time the redirect is thrown, so the user IS
      // authenticated -- we just need to tell the client where to go.
      if (
        signInError instanceof Error &&
        'digest' in signInError &&
        typeof (signInError as any).digest === 'string' &&
        (signInError as any).digest.includes('NEXT_REDIRECT')
      ) {
        return { status: 'success', redirectTo }
      }

      // Genuine auth errors (wrong password, etc.)
      if (signInError instanceof AuthError) {
        console.error('Auth error:', signInError.type, signInError.message)
        return 'invalid-credentials'
      }

      throw signInError
    }

    // If signIn returned normally (no redirect thrown), still success
    return { status: 'success', redirectTo }
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Auth error:', error.type, error.message)
      return 'invalid-credentials'
    }
    throw error
  }
}
