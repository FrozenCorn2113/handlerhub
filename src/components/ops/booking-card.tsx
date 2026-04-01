'use client'

import { StatusBadge } from './status-badge'

type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'completed'
  | 'declined'
  | 'cancelled'
  | 'overdue'

interface BookingCardProps {
  exhibitorName: string
  dogName: string
  showName: string
  date: string
  status: BookingStatus
  onAccept?: () => void
  onDecline?: () => void
  onMessage?: () => void
}

export function BookingCard({
  exhibitorName,
  dogName,
  showName,
  date,
  status,
  onAccept,
  onDecline,
  onMessage,
}: BookingCardProps) {
  const initials = exhibitorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex items-center gap-4 rounded-3xl border border-tan bg-gradient-to-b from-white to-[#FDFBF8] p-6 shadow-[0_2px_12px_rgba(28,18,8,0.07),0_0_0_1px_rgba(28,18,8,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(28,18,8,0.12),0_0_0_1px_rgba(28,18,8,0.05)]">
      {/* Avatar */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sage to-[#B8EDD0] font-sans text-sm font-semibold text-paddock-green shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
        {initials}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-sm font-semibold text-ringside-black">
          {exhibitorName}
        </p>
        <p className="mt-0.5 truncate font-sans text-xs text-warm-gray">
          {dogName}
        </p>
        <p className="truncate font-sans text-[11px] text-warm-gray/70">
          {showName} &middot; {date}
        </p>
      </div>

      {/* Status */}
      <StatusBadge status={status} />

      {/* Actions */}
      <div className="flex shrink-0 gap-2">
        {status === 'pending' && onAccept && (
          <button
            onClick={onAccept}
            className="rounded-full bg-paddock-green px-3.5 py-1.5 font-sans text-xs font-medium text-white shadow-sm transition-colors hover:bg-forest"
          >
            Accept
          </button>
        )}
        {status === 'pending' && onDecline && (
          <button
            onClick={onDecline}
            className="rounded-full border border-tan px-3.5 py-1.5 font-sans text-xs font-medium text-warm-brown transition-colors hover:bg-light-sand"
          >
            Decline
          </button>
        )}
        {onMessage && (
          <button
            onClick={onMessage}
            className="rounded-full border border-tan px-3.5 py-1.5 font-sans text-xs font-medium text-warm-brown transition-colors hover:bg-light-sand"
          >
            Message
          </button>
        )}
      </div>
    </div>
  )
}
