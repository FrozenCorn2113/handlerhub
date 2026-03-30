'use client'

import { useCallback, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { SignUpWithPasswordForm } from '@/components/auth/signup-with-password-form'

export default function RegisterModal() {
  const router = useRouter()

  const handleClose = useCallback(() => {
    router.back()
  }, [router])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative mx-4 flex w-full max-w-[880px] overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left panel - dark branded side (hidden on mobile) */}
        <div
          className="relative hidden w-[380px] shrink-0 flex-col overflow-hidden lg:flex"
          style={{
            background:
              'linear-gradient(160deg, #0D3520 0%, #14472F 30%, #1F6B4A 70%, #14472F 100%)',
          }}
        >
          {/* Top gradient overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0D3520]/80 to-transparent" />

          {/* Dot pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Decorative vertical stripes */}
          <div className="pointer-events-none absolute inset-0 flex items-stretch justify-center gap-6">
            <div className="w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
            <div className="w-[2px] bg-gradient-to-b from-transparent via-white/[0.12] to-transparent backdrop-blur-sm" />
            <div className="w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
            <div className="ml-16 w-px bg-gradient-to-b from-transparent via-white/[0.10] to-transparent" />
            <div className="w-[2px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent backdrop-blur-sm" />
            <div className="ml-24 w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
            <div className="w-px bg-gradient-to-b from-transparent via-white/[0.10] to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-10">
            <div className="flex w-full max-w-xs flex-col items-center text-center">
              <h2
                className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Where great dogs meet great handlers
              </h2>

              <p className="mb-10 text-base leading-relaxed text-white/60">
                The platform connecting exhibitors with professional handlers.
              </p>

              {/* Founding 100 card */}
              <div className="w-full rounded-xl border border-white/10 bg-white/[0.07] p-6 text-center backdrop-blur-md">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                  Early Access
                </p>
                <p
                  className="mb-2 text-lg font-bold text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Join the Founding 100
                </p>
                <p className="text-sm leading-relaxed text-white/60">
                  Get in early, shape the platform, and be the first name
                  exhibitors see.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom glow */}
          <div
            className="pointer-events-none absolute -bottom-16 left-1/2 size-40 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, #2D7A54 0%, transparent 70%)',
            }}
          />

          {/* Bottom gradient fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0D3520]/60 to-transparent" />
        </div>

        {/* Right panel - form */}
        <div className="flex flex-1 flex-col justify-center bg-white px-8 py-10 sm:px-12">
          <div className="mx-auto w-full max-w-[360px]">
            <h1
              className="mb-2 text-3xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Get Started
            </h1>
            <p className="mb-8 text-sm text-gray-500">Welcome to HandlerHub</p>

            {/* OAuth */}
            <OAuthButtons />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-400">or</span>
              </div>
            </div>

            {/* Form */}
            <SignUpWithPasswordForm />

            {/* Sign in link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-paddock-green hover:underline"
              >
                Sign in
              </Link>
            </p>

            {/* Terms */}
            <p className="mt-4 text-center text-xs text-gray-400">
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
        </div>
      </div>
    </div>
  )
}
