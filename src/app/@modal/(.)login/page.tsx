'use client'

import { useCallback, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { SignInWithPasswordForm } from '@/components/auth/signin-with-password-form'

export default function LoginModal() {
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
        {/* Left panel - hero image (hidden on mobile) */}
        <div className="relative hidden w-1/2 shrink-0 flex-col overflow-hidden lg:flex">
          <Image
            src="/images/hero-handler.jpg"
            alt="Professional handler with show dog"
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay for text readability */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col justify-end px-10 pb-12">
            <h2
              className="text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where great dogs meet great handlers
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              The platform connecting exhibitors with professional handlers.
            </p>

            {/* Founding 100 card */}
            <div className="mt-6 rounded-xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                Early Access
              </p>
              <p
                className="mt-1 text-base font-semibold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Join the Founding 100
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/70">
                Get in early, shape the platform, and be the first name
                exhibitors see.
              </p>
            </div>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="flex flex-1 flex-col justify-center bg-neutral-100 px-8 py-10 sm:px-12">
          <div className="mx-auto w-full max-w-[360px]">
            <h1
              className="mb-2 text-3xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sign in
            </h1>
            <p className="mb-8 text-sm text-gray-500">
              Welcome back to HandlerHub
            </p>

            {/* Form first */}
            <SignInWithPasswordForm />

            {/* Remember me + Forgot password row */}
            <div className="mt-4 flex items-center justify-between text-sm">
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

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
