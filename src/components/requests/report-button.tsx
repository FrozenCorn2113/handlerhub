/* eslint-disable tailwindcss/classnames-order */
'use client'

import { useState } from 'react'

import { Flag } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/classnames-order */

interface ReportButtonProps {
  requestId: string
  className?: string
}

export function ReportButton({ requestId, className = '' }: ReportButtonProps) {
  const [reported, setReported] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleReport(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (reported || loading) return

    setLoading(true)
    try {
      const res = await fetch(`/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'FLAGGED' }),
      })

      if (res.ok) {
        setReported(true)
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
    }
  }

  if (reported) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs text-warm-gray ${className}`}
      >
        <Flag weight="fill" className="h-3.5 w-3.5" />
        Reported
      </span>
    )
  }

  return (
    <button
      onClick={handleReport}
      disabled={loading}
      className={`inline-flex items-center gap-1 text-xs text-warm-gray transition-colors hover:text-red-500 disabled:opacity-50 ${className}`}
      title="Report this request"
    >
      <Flag weight="regular" className="h-3.5 w-3.5" />
      Report
    </button>
  )
}
