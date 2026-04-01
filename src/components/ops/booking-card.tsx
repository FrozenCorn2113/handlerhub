'use client'

import { StatusBadge } from './status-badge'
import {
  ArrowRight,
  CalendarBlank,
  ChatCircle,
  Trophy,
} from '@phosphor-icons/react'

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

// Generate a gradient placeholder based on name
function getPlaceholderGradient(name: string) {
  const gradients = [
    'from-[#1F6B4A] via-[#2A8C5F] to-[#4A6F8A]',
    'from-[#4A6F8A] via-[#3A5A72] to-[#1C1208]',
    'from-[#14472F] via-[#1F6B4A] to-[#B8EDD0]',
    'from-[#4A3E2E] via-[#7A6E5E] to-[#D4CFC4]',
  ]
  const index = name.charCodeAt(0) % gradients.length
  return gradients[index]
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

  const gradient = getPlaceholderGradient(exhibitorName)

  return (
    <div className="group overflow-hidden rounded-2xl border border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.14)]">
      {/* Image placeholder area with gradient */}
      <div className={`relative h-32 bg-gradient-to-br ${gradient}`}>
        {/* Avatar overlay */}
        <div className="absolute bottom-3 left-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 font-sans text-sm font-semibold text-white backdrop-blur-sm">
            {initials}
          </div>
          <div>
            <p className="font-sans text-sm font-semibold text-white drop-shadow-sm">
              {exhibitorName}
            </p>
            <p className="font-sans text-xs text-white/80 drop-shadow-sm">
              {dogName}
            </p>
          </div>
        </div>
        {/* Status badge overlay */}
        <div className="absolute right-3 top-3">
          <StatusBadge status={status} weight="filled" />
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Metadata pills */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-light-sand px-3 py-1 font-sans text-[11px] font-medium text-warm-brown">
            <Trophy size={12} weight="fill" className="text-paddock-green" />
            {showName}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-light-sand px-3 py-1 font-sans text-[11px] font-medium text-warm-brown">
            <CalendarBlank
              size={12}
              weight="fill"
              className="text-slate-blue"
            />
            {date}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {status === 'pending' && onAccept && (
            <button
              onClick={onAccept}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ringside-black px-4 py-2.5 font-sans text-xs font-semibold text-white shadow-[0_2px_8px_rgba(28,18,8,0.2)] transition-all hover:bg-warm-brown hover:shadow-[0_4px_12px_rgba(28,18,8,0.25)]"
            >
              Accept
              <ArrowRight size={14} weight="bold" />
            </button>
          )}
          {status === 'pending' && onDecline && (
            <button
              onClick={onDecline}
              className="rounded-full border border-tan px-4 py-2.5 font-sans text-xs font-semibold text-warm-brown transition-all hover:border-warm-brown hover:bg-light-sand"
            >
              Decline
            </button>
          )}
          {onMessage && (
            <button
              onClick={onMessage}
              className="flex items-center gap-1.5 rounded-full border border-tan px-4 py-2.5 font-sans text-xs font-semibold text-warm-brown transition-all hover:border-warm-brown hover:bg-light-sand"
            >
              <ChatCircle size={14} weight="regular" />
              Message
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
