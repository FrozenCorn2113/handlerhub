import { Suspense } from 'react'

import { type Metadata } from 'next'

import { VerifyEmailContent } from './verify-email-content'

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address',
}

export default function VerifyEmailPage(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[420px]">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
            Verifying...
          </h1>
          <p className="text-sm text-gray-500">
            Please wait while we load the verification page.
          </p>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
