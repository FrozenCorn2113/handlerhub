'use client'

import Link from 'next/link'

import {
  ENTRY_STATUS_CONFIG,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
} from '@/lib/events/constants'
import type { EventWithVenue } from '@/lib/events/queries'

import { Calendar, Clock, MapPin, PawPrint, User } from '@phosphor-icons/react'

interface EventCardProps {
  event: EventWithVenue
  isHighlighted?: boolean
  onHover?: (eventId: string | null) => void
  onClick?: (event: EventWithVenue) => void
}

export function EventCard({
  event,
  isHighlighted,
  onHover,
  onClick,
}: EventCardProps) {
  const typeLabel = EVENT_TYPE_LABELS[event.eventType]
  const typeColor = EVENT_TYPE_COLORS[event.eventType]
  const statusConfig = ENTRY_STATUS_CONFIG[event.entryStatus]

  const baseClasses = `block rounded-2xl border transition-all duration-200 ${
    isHighlighted
      ? 'border-paddock-green shadow-lg ring-2 ring-paddock-green/20'
      : 'border-sand hover:-translate-y-0.5 hover:shadow-lg'
  } bg-white`

  const hoverProps = {
    onMouseEnter: () => onHover?.(event.id),
    onMouseLeave: () => onHover?.(null),
  }

  // Compact card for browse panel (when onClick is provided)
  if (onClick) {
    const shortDate = new Date(event.startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })

    const dateRange = shortDate

    return (
      <div
        role="button"
        tabIndex={0}
        className={`${baseClasses} cursor-pointer p-3 shadow-sm`}
        onClick={() => onClick(event)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick(event)
          }
        }}
        {...hoverProps}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="min-w-0 truncate font-display text-sm font-semibold text-ringside-black">
            {event.clubName}
          </h3>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
            style={{ backgroundColor: typeColor }}
          >
            {typeLabel}
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-warm-gray">
          <span className="flex items-center gap-1">
            <Calendar size={12} weight="bold" className="shrink-0" />
            {dateRange}
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin size={12} weight="bold" className="shrink-0" />
            {event.venue.city}, {event.venue.state}
          </span>
        </div>
      </div>
    )
  }

  // Full card for non-browse contexts (renders as Link)
  const formattedDate = new Date(event.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const closingDate = event.closingDateTime
    ? new Date(event.closingDateTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`${baseClasses} p-4 shadow-md`}
      {...hoverProps}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-base font-semibold text-ringside-black">
            {event.clubName}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: typeColor }}
            >
              {typeLabel}
            </span>
            <span
              className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                color: statusConfig.color,
                backgroundColor: statusConfig.bgColor,
              }}
            >
              {statusConfig.label}
              {closingDate &&
                event.entryStatus === 'CLOSING_SOON' &&
                ` ${closingDate}`}
            </span>
            {event.venue.indoorOutdoor && (
              <span className="text-xs text-warm-gray">
                {event.venue.indoorOutdoor}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-warm-brown">
          <Calendar
            size={14}
            weight="bold"
            className="shrink-0 text-warm-gray"
          />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-warm-brown">
          <MapPin size={14} weight="bold" className="shrink-0 text-warm-gray" />
          <span className="truncate">
            {event.venue.name}, {event.venue.city}, {event.venue.state}
          </span>
        </div>
        {event.superintendentName && (
          <div className="flex items-center gap-2 text-sm text-warm-gray">
            <User size={14} weight="bold" className="shrink-0" />
            <span className="truncate">{event.superintendentName}</span>
          </div>
        )}
        {event.eligibleBreeds && (
          <div className="flex items-center gap-2 text-sm text-warm-gray">
            <Clock size={14} weight="bold" className="shrink-0" />
            <span className="truncate">{event.eligibleBreeds}</span>
          </div>
        )}
      </div>

      {/* Handler hint */}
      <div className="mt-3 flex items-center gap-1.5 border-t border-sand pt-2.5 text-xs font-medium text-paddock-green">
        <PawPrint size={12} weight="bold" />
        <span>Handlers available near this show</span>
      </div>
    </Link>
  )
}
