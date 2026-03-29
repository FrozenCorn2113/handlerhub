import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { siteConfig } from '@/config/site'

import { auth } from '@/lib/auth/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/auth/routes'

import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { SignInWithPasswordForm } from '@/components/auth/signin-with-password-form'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Sign In',
  description: 'Sign in to your account',
}

interface SignInPageProps {
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

export default async function SignInPage({
  searchParams,
}: SignInPageProps): Promise<JSX.Element> {
  const session = await auth()
  const nextUrl =
    safeNext(searchParams?.next) ??
    safeNext(searchParams?.from) ??
    DEFAULT_LOGIN_REDIRECT
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
        Sign in
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link
          href={`/register?next=${encodeURIComponent(nextUrl)}`}
          className="font-semibold text-paddock-green hover:underline"
        >
          Create now
        </Link>
      </p>

      {/* Form */}
      <div className="space-y-5">
        <SignInWithPasswordForm />

        {/* Remember me + Forgot password row */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-paddock-green focus:ring-paddock-green"
            />
            Remember me
          </label>
          <Link
            href="/login/password-reset"
            className="font-medium text-paddock-green hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

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
    </div>
  )
}
