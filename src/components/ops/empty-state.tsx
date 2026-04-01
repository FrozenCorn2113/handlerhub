'use client'

import { ArrowRight } from '@phosphor-icons/react'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'

interface EmptyStateProps {
  icon: PhosphorIcon
  message: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  message,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Decorative icon circle */}
      <div className="relative mb-6">
        {/* Dotted outer ring */}
        <div className="absolute -inset-3 rounded-full border-2 border-dashed border-slate-blue/20" />
        {/* Solid inner circle */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-blue-light to-sage/40">
          <Icon size={36} className="text-slate-blue" weight="duotone" />
        </div>
      </div>

      {/* Heading in Fraunces */}
      <h3
        className="mb-2 max-w-xs font-display text-xl font-medium text-ringside-black"
        style={{ lineHeight: 1.2, marginBottom: '0.5rem' }}
      >
        {message}
      </h3>

      {/* Subtitle */}
      {subtitle && (
        <p className="mb-6 max-w-xs font-sans text-sm text-warm-gray">
          {subtitle}
        </p>
      )}

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green px-7 py-3 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(31,107,74,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(31,107,74,0.35)]"
        >
          {actionLabel}
          <ArrowRight size={14} weight="bold" />
        </button>
      )}
    </div>
  )
}
