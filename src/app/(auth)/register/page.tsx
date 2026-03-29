import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { siteConfig } from '@/config/site'

import { auth } from '@/lib/auth/auth'

import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { SignUpWithPasswordForm } from '@/components/auth/signup-with-password-form'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Sign Up',
  description: 'Sign up for an account',
}

interface SignUpPageProps {
  searchParams?: {
    next?: string
    from?: string
  }
}

function safeNext(nextValue: unknown): string | null {
  if (typeof nextValue !== 'string') return null
  if (!nextValue.startsWith('/')) return null
  return nextValue
}

export default async function SignUpPage({
  searchParams,
}: SignUpPageProps): Promise<JSX.Element> {
  const session = await auth()
  const nextUrl =
    safeNext(searchParams?.next) ??
    safeNext(searchParams?.from) ??
    '/role-select'
  if (session) redirect(nextUrl)

  return (
    <div className="mx-auto w-full max-w-[420px]">
      {/* Logo */}
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="/handler-hub-logo.png"
            width={36}
            height={36}
            alt={siteConfig.name}
            priority
          />
          <span className="text-lg font-bold text-forest">
            {siteConfig.name}
          </span>
        </Link>
      </div>

      {/* Heading */}
      <h1
        className="mb-2 text-4xl font-bold tracking-tight text-gray-900"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Create account
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          href={`/login?next=${encodeURIComponent(nextUrl)}`}
          className="font-semibold text-paddock-green hover:underline"
        >
          Sign in
        </Link>
      </p>

      {/* Form */}
      <SignUpWithPasswordForm />

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-400">or</span>
        </div>
      </div>

      {/* OAuth */}
      <OAuthButtons />

      {/* Terms */}
      <p className="mt-8 text-center text-xs text-gray-400">
        By continuing, you agree to our{' '}
        <Link
          href="/legal/terms-of-service"
          className="font-medium text-gray-500 underline-offset-4 hover:underline"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/legal/privacy-policy"
          className="font-medium text-gray-500 underline-offset-4 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
