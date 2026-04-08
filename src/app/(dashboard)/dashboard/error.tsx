'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function DashboardError({
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
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1
          className="text-brand-600 text-2xl font-bold"
          style={{ fontFamily: 'Roca One, sans-serif' }}
        >
          HandlerHub
        </h1>
        <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => reset()}>Try Again</Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
        {error.digest && (
          <p className="mt-8 text-xs text-gray-400">Ref: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
