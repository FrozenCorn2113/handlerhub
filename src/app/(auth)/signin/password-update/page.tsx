import { Suspense } from 'react'

import { type Metadata } from 'next'

import { siteConfig } from '@/config/site'

import { PasswordUpdateContent } from './password-update-content'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Set New Password',
  description: 'Set a new password for your account',
}

export default function PasswordUpdatePage(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[420px]">
          <h1
            className="mb-2 text-4xl font-bold tracking-tight text-gray-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Loading...
          </h1>
          <p className="text-sm text-gray-500">
            Please wait while we load the password reset page.
          </p>
        </div>
      }
    >
      <PasswordUpdateContent />
    </Suspense>
  )
}
