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
    <div className="card-hh flex items-center gap-4">
      {/* Avatar */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage font-sans text-sm font-semibold text-paddock-green">
        {initials}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-sm font-semibold text-ringside-black">
          {exhibitorName}
        </p>
        <p className="truncate font-sans text-xs text-warm-brown">
          {dogName} &middot; {showName} &middot; {date}
        </p>
      </div>

      {/* Status */}
      <StatusBadge status={status} />

      {/* Actions */}
      <div className="flex shrink-0 gap-2">
        {status === 'pending' && onAccept && (
          <button
            onClick={onAccept}
            className="rounded-full bg-paddock-green px-3 py-1.5 font-sans text-xs font-medium text-white transition-colors hover:bg-forest"
          >
            Accept
          </button>
        )}
        {status === 'pending' && onDecline && (
          <button
            onClick={onDecline}
            className="rounded-full border border-tan px-3 py-1.5 font-sans text-xs font-medium text-warm-brown transition-colors hover:bg-light-sand"
          >
            Decline
          </button>
        )}
        {onMessage && (
          <button
            onClick={onMessage}
            className="rounded-full border border-tan px-3 py-1.5 font-sans text-xs font-medium text-warm-brown transition-colors hover:bg-light-sand"
          >
            Message
          </button>
        )}
      </div>
    </div>
  )
}
