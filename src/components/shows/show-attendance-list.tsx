'use client'

import { useState } from 'react'

import {
  CalendarBlank,
  Dog,
  MapPin,
  Note,
  SpinnerGap,
  Trash,
  Trophy,
  Users,
} from '@phosphor-icons/react'

interface AttendanceItem {
  id: string
  eventId: string
  eventName: string
  eventDate: string
  eventLocation: string
  maxDogs: number | null
  notes: string | null
  attendeeCount?: number
}

interface ShowAttendanceListProps {
  items: AttendanceItem[]
  onRemove: (id: string) => Promise<void>
  isPast?: boolean
}

export function ShowAttendanceList({
  items,
  onRemove,
  isPast = false,
}: ShowAttendanceListProps) {
  const [removingId, setRemovingId] = useState<string | null>(null)

  async function handleRemove(id: string) {
    setRemovingId(id)
    try {
      await onRemove(id)
    } finally {
      setRemovingId(null)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const date = new Date(item.eventDate)
        const monthStr = date.toLocaleDateString('en-US', { month: 'short' })
        const dayStr = date.getDate().toString()

        return (
          <div
            key={item.id}
            className={`group flex items-start gap-4 rounded-2xl border bg-white p-4 transition-all ${
              isPast
                ? 'border-sand/60 opacity-60'
                : 'border-sand shadow-[0_2px_12px_rgba(28,18,8,0.06)] hover:shadow-[0_6px_20px_rgba(28,18,8,0.1)]'
            }`}
          >
            {/* Date badge */}
            <div
              className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl ${
                isPast ? 'bg-sand/40' : 'bg-sage'
              }`}
            >
              <span
                className={`font-body text-[10px] font-semibold uppercase tracking-wider ${
                  isPast ? 'text-warm-gray' : 'text-paddock-green'
                }`}
              >
                {monthStr}
              </span>
              <span
                className={`font-display text-xl font-light leading-none ${
                  isPast ? 'text-warm-gray' : 'text-ringside-black'
                }`}
              >
                {dayStr}
              </span>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base font-semibold text-ringside-black">
                {item.eventName}
              </h3>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <span className="flex items-center gap-1 font-body text-xs text-warm-gray">
                  <CalendarBlank className="h-3 w-3" />
                  {date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                {item.eventLocation && (
                  <span className="flex items-center gap-1 font-body text-xs text-warm-gray">
                    <MapPin className="h-3 w-3" />
                    {item.eventLocation}
                  </span>
                )}
              </div>

              {/* Meta pills */}
              <div className="mt-2 flex flex-wrap gap-2">
                {item.maxDogs != null && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-light-sand px-2.5 py-1 font-body text-xs text-warm-brown">
                    <Dog className="h-3 w-3 text-paddock-green" />
                    {item.maxDogs} dog{item.maxDogs !== 1 ? 's' : ''} max
                  </span>
                )}
                {item.attendeeCount != null && item.attendeeCount > 1 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-blue-light px-2.5 py-1 font-body text-xs text-slate-blue">
                    <Users className="h-3 w-3" />
                    {item.attendeeCount} handler
                    {item.attendeeCount !== 1 ? 's' : ''} attending
                  </span>
                )}
                {item.notes && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-light-sand px-2.5 py-1 font-body text-xs text-warm-brown">
                    <Note className="h-3 w-3" />
                    {item.notes.length > 40
                      ? item.notes.slice(0, 40) + '...'
                      : item.notes}
                  </span>
                )}
              </div>
            </div>

            {/* Remove button (upcoming only) */}
            {!isPast && (
              <button
                onClick={() => handleRemove(item.id)}
                disabled={removingId === item.id}
                className="shrink-0 rounded-full p-2 text-warm-gray opacity-0 transition-all hover:bg-red-50 hover:text-red-500 disabled:opacity-50 group-hover:opacity-100"
                title="Remove from my shows"
              >
                {removingId === item.id ? (
                  <SpinnerGap className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
