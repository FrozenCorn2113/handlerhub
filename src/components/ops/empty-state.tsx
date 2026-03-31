'use client'

import type { Icon as PhosphorIcon } from '@phosphor-icons/react'

interface EmptyStateProps {
  icon: PhosphorIcon
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon size={64} className="mb-4 text-tan" weight="thin" />
      <p className="mb-6 max-w-xs font-sans text-sm text-warm-gray">
        {message}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="rounded-full bg-paddock-green px-6 py-3 font-sans text-[13px] font-medium text-white transition-colors hover:bg-forest"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
