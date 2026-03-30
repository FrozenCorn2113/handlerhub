'use client'

import { useCallback, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { verifyEmail } from '@/actions/auth/verify-email'

type VerifyState =
  | 'idle'
  | 'verifying'
  | 'success'
  | 'already-verified'
  | 'invalid'
  | 'error'

export function VerifyEmailContent(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const [state, setState] = useState<VerifyState>('idle')

  const handleVerify = useCallback(async () => {
    if (!token || state === 'verifying') return

    setState('verifying')

    const result = await verifyEmail(token)

    switch (result) {
      case 'success':
        setState('success')
        break
      case 'already-verified':
        setState('already-verified')
        break
      case 'invalid-token':
      case 'missing-token':
        setState('invalid')
        break
      default:
        setState('error')
    }
  }, [token, state])

  // Auto-redirect after successful verification
  useEffect(() => {
    if (state === 'success' || state === 'already-verified') {
      const timer = setTimeout(() => {
        router.push('/login')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state, router])

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Invalid link
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          The verification link is missing or invalid. Please request a new one.
        </p>
        <Link
          href="/register/reverify-email"
          className="font-semibold text-paddock-green hover:underline"
        >
          Resend verification email
        </Link>
      </div>
    )
  }

  if (state === 'idle') {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Verify your email
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Click the button below to verify your email address and activate your
          account.
        </p>
        <button
          onClick={handleVerify}
          className="inline-flex h-10 items-center justify-center rounded-md bg-paddock-green px-6 text-sm font-medium text-white transition-colors hover:bg-paddock-green/90"
        >
          Verify email
        </button>
      </div>
    )
  }

  if (state === 'verifying') {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Verifying...
        </h1>
        <p className="text-sm text-gray-500">
          Please wait while we verify your email address.
        </p>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Email verified
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Your email has been verified successfully. Redirecting you to sign
          in...
        </p>
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-paddock-green px-6 text-sm font-medium text-white transition-colors hover:bg-paddock-green/90"
        >
          Sign in now
        </Link>
      </div>
    )
  }

  if (state === 'already-verified') {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Already verified
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Your email has already been verified. Redirecting you to sign in...
        </p>
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-paddock-green px-6 text-sm font-medium text-white transition-colors hover:bg-paddock-green/90"
        >
          Sign in now
        </Link>
      </div>
    )
  }

  if (state === 'invalid') {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Invalid or expired link
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          This verification link is no longer valid. Please request a new one.
        </p>
        <Link
          href="/register/reverify-email"
          className="font-semibold text-paddock-green hover:underline"
        >
          Resend verification email
        </Link>
      </div>
    )
  }

  // error state
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
        Something went wrong
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        We could not verify your email. Please try again or request a new
        verification link.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleVerify}
          className="inline-flex h-10 items-center justify-center rounded-md bg-paddock-green px-6 text-sm font-medium text-white transition-colors hover:bg-paddock-green/90"
        >
          Try again
        </button>
        <Link
          href="/register/reverify-email"
          className="inline-flex h-10 items-center justify-center text-sm font-semibold text-paddock-green hover:underline"
        >
          Resend verification email
        </Link>
      </div>
    </div>
  )
}
