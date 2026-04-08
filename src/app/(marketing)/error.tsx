'use client'

import { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24">
      <Link href="/" className="mb-8">
        <Image
          src="/handler-hub-logo-dark.png"
          width={48}
          height={48}
          alt="HandlerHub"
        />
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Something went wrong
      </h1>
      <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
      {error.digest && (
        <p className="mt-10 text-xs text-gray-400">Ref: {error.digest}</p>
      )}
    </div>
  )
}
