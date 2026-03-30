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
        className="relative mx-4 flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left panel - black with decorative stripes (hidden on mobile) */}
        <div className="relative hidden w-1/2 shrink-0 flex-col overflow-hidden bg-black lg:flex">
          {/* Top gradient overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-full bg-gradient-to-t from-transparent to-black" />

          {/* Decorative vertical glass stripes */}
          <div className="pointer-events-none absolute inset-0 z-[2] flex overflow-hidden backdrop-blur-2xl">
            <div className="h-full w-16 bg-gradient-to-r from-transparent via-black/70 to-white/30 opacity-30" />
            <div className="h-full w-16 bg-gradient-to-r from-transparent via-black/70 to-white/30 opacity-30" />
            <div className="h-full w-16 bg-gradient-to-r from-transparent via-black/70 to-white/30 opacity-30" />
            <div className="h-full w-16 bg-gradient-to-r from-transparent via-black/70 to-white/30 opacity-30" />
            <div className="h-full w-16 bg-gradient-to-r from-transparent via-black/70 to-white/30 opacity-30" />
            <div className="h-full w-16 bg-gradient-to-r from-transparent via-black/70 to-white/30 opacity-30" />
          </div>

          {/* Warm amber glow at bottom */}
          <div className="pointer-events-none absolute -bottom-16 left-0 z-[1] h-60 w-60 rounded-full bg-amber-600 opacity-60 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 left-0 z-[1] h-32 w-32 rounded-full bg-white opacity-40 blur-xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col justify-end px-10 pb-16">
            <h2
              className="text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where great dogs meet great handlers.
            </h2>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="flex flex-1 flex-col justify-center bg-neutral-100 px-8 py-10 sm:px-12">
          <div className="mx-auto w-full max-w-[360px]">
            <h1
              className="mb-2 text-3xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Get Started
            </h1>
            <p className="mb-8 text-sm text-gray-500">Welcome to HandlerHub</p>

            {/* Form first */}
            <SignUpWithPasswordForm />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-neutral-100 px-4 text-gray-400">or</span>
              </div>
            </div>

            {/* OAuth at bottom */}
            <OAuthButtons />

            {/* Sign in link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
