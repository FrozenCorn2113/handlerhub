'use client'

import { cn } from '@/lib/utils'

import { CheckCircle, Eye, TrendUp } from '@phosphor-icons/react'

interface ProfileCompletenessIndicatorProps {
  completeness: number
  className?: string
}

const PUBLISHABLE_THRESHOLD = 60
const RANK_BOOST_THRESHOLD = 80
const COMPLETE_THRESHOLD = 100

export function ProfileCompletenessIndicator({
  completeness,
  className,
}: ProfileCompletenessIndicatorProps) {
  const isPublishable = completeness >= PUBLISHABLE_THRESHOLD
  const hasRankBoost = completeness >= RANK_BOOST_THRESHOLD
  const isComplete = completeness >= COMPLETE_THRESHOLD

  // Determine status label and color
  let statusLabel = 'Incomplete'
  let statusColor = 'text-warm-gray'
  let statusBg = 'bg-light-sand'

  if (isComplete) {
    statusLabel = 'Complete'
    statusColor = 'text-paddock-green'
    statusBg = 'bg-sage'
  } else if (isPublishable) {
    statusLabel = 'Publishable'
    statusColor = 'text-slate-blue'
    statusBg = 'bg-slate-blue-light'
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-sand bg-white p-6 shadow-[0_2px_12px_rgba(28,18,8,0.06)]',
        className
      )}
    >
      {/* Header row */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold tracking-tight text-ringside-black">
          Profile Completeness
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'rounded-full px-3 py-1 font-body text-xs font-semibold',
              statusBg,
              statusColor
            )}
          >
            {statusLabel}
          </span>
          <span className="font-body text-2xl font-bold text-ringside-black">
            {completeness}%
          </span>
        </div>
      </div>

      {/* Progress bar with tier markers */}
      <div className="relative mb-3">
        <div className="h-3 w-full overflow-hidden rounded-full bg-light-sand">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700 ease-out',
              isComplete
                ? 'bg-gradient-to-r from-paddock-green to-[#24845a]'
                : isPublishable
                  ? 'bg-gradient-to-r from-slate-blue to-[#5a83a0]'
                  : 'bg-gradient-to-r from-warm-gray to-[#9a8e7e]'
            )}
            style={{ width: `${Math.min(completeness, 100)}%` }}
          />
        </div>

        {/* Tier markers */}
        <div
          className="absolute top-0 h-3 w-0.5 bg-ringside-black/20"
          style={{ left: `${PUBLISHABLE_THRESHOLD}%` }}
        />
        <div
          className="absolute top-0 h-3 w-0.5 bg-ringside-black/20"
          style={{ left: `${RANK_BOOST_THRESHOLD}%` }}
        />
      </div>

      {/* Tier labels */}
      <div className="relative mb-4 flex text-[11px]">
        <div
          className="absolute font-body text-warm-gray"
          style={{
            left: `${PUBLISHABLE_THRESHOLD}%`,
            transform: 'translateX(-50%)',
          }}
        >
          Publishable
        </div>
        <div
          className="absolute font-body text-warm-gray"
          style={{
            left: `${RANK_BOOST_THRESHOLD}%`,
            transform: 'translateX(-50%)',
          }}
        >
          Rank Boost
        </div>
        <div className="absolute right-0 font-body text-warm-gray">
          Complete
        </div>
      </div>

      {/* Status messages */}
      <div className="mt-6 space-y-2">
        {!isPublishable && (
          <div className="flex items-start gap-2 rounded-xl bg-ring-cream p-3">
            <Eye className="mt-0.5 size-4 shrink-0 text-warm-gray" />
            <p className="font-body text-sm text-warm-brown">
              Reach {PUBLISHABLE_THRESHOLD}% to make your profile visible in
              search results.
            </p>
          </div>
        )}

        {!hasRankBoost && isPublishable && (
          <div className="flex items-start gap-2 rounded-xl bg-slate-blue-light p-3">
            <TrendUp className="mt-0.5 size-4 shrink-0 text-slate-blue" />
            <p className="font-body text-sm text-warm-brown">
              <span className="font-semibold">
                Profiles above 80% rank higher in search.
              </span>{' '}
              Keep going to boost your visibility.
            </p>
          </div>
        )}

        {hasRankBoost && !isComplete && (
          <div className="flex items-start gap-2 rounded-xl bg-sage p-3">
            <TrendUp className="mt-0.5 size-4 shrink-0 text-paddock-green" />
            <p className="font-body text-sm text-warm-brown">
              Your profile ranks higher in search. Complete the remaining
              sections to reach 100%.
            </p>
          </div>
        )}

        {isComplete && (
          <div className="flex items-start gap-2 rounded-xl bg-sage p-3">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-paddock-green" />
            <p className="font-body text-sm text-warm-brown">
              Your profile is complete and ranking at full visibility.
            </p>
          </div>
        )}

        {/* Always show rank copy if not yet at 80% */}
        {!hasRankBoost && !isPublishable && (
          <div className="flex items-start gap-2 rounded-xl bg-slate-blue-light/50 p-3">
            <TrendUp className="mt-0.5 size-4 shrink-0 text-slate-blue" />
            <p className="font-body text-xs text-warm-gray">
              <span className="font-semibold text-warm-brown">
                Profiles above 80% rank higher in search.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
