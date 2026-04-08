'use client'

import { EVENT_TYPE_LABELS } from '@/lib/events/constants'
import type { EventWithVenue } from '@/lib/events/queries'

import { Calendar, MapPin, PawPrint, Trophy } from '@phosphor-icons/react'
import type { EventType } from '@prisma/client'

export interface VenueCluster {
  venueId: string
  venueName: string
  city: string
  state: string
  latitude: number | null
  longitude: number | null
  events: EventWithVenue[]
  clubNames: string[]
  eventTypes: EventType[]
  dateRange: { min: string; max: string }
}

interface VenueClusterCardProps {
  cluster: VenueCluster
  isHighlighted?: boolean
  onHover?: (venueId: string | null) => void
  onClick?: (cluster: VenueCluster) => void
}

export function VenueClusterCard({
  cluster,
  isHighlighted,
  onHover,
  onClick,
}: VenueClusterCardProps) {
  const baseClasses = `block rounded-2xl border transition-all duration-200 ${
    isHighlighted
      ? 'border-paddock-green shadow-lg ring-2 ring-paddock-green/20'
      : 'border-sand hover:-translate-y-0.5 hover:shadow-lg'
  } bg-white`

  const hoverProps = {
    onMouseEnter: () => onHover?.(cluster.venueId),
    onMouseLeave: () => onHover?.(null),
  }

  const minDate = new Date(cluster.dateRange.min).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
  const maxDate = new Date(cluster.dateRange.max).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
  const dateDisplay = minDate === maxDate ? minDate : `${minDate} - ${maxDate}`

  const primaryClub = cluster.clubNames[0]
  const extraClubs = cluster.clubNames.length - 1

  const uniqueTypeLabels = cluster.eventTypes
    .map((t) => EVENT_TYPE_LABELS[t])
    .filter((v, i, a) => a.indexOf(v) === i)

  const eventCountLabel = `${cluster.events.length} event${cluster.events.length !== 1 ? 's' : ''}`

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${baseClasses} cursor-pointer p-3 shadow-sm`}
      onClick={() => onClick?.(cluster)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(cluster)
        }
      }}
      {...hoverProps}
    >
      {/* Club name and event count */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 truncate font-display text-sm font-semibold text-ringside-black">
          {primaryClub}
          {extraClubs > 0 && (
            <span className="ml-1 font-normal text-warm-gray">
              &amp; {extraClubs} more club{extraClubs !== 1 ? 's' : ''}
            </span>
          )}
        </h3>
        <span className="shrink-0 rounded-full bg-light-sand px-2 py-0.5 text-[10px] font-semibold text-warm-brown">
          {eventCountLabel}
        </span>
      </div>

      {/* Location and dates */}
      <div className="mt-1.5 flex items-center gap-3 text-xs text-warm-gray">
        <span className="flex items-center gap-1">
          <Calendar size={12} weight="bold" className="shrink-0" />
          {dateDisplay}
        </span>
        <span className="flex items-center gap-1 truncate">
          <MapPin size={12} weight="bold" className="shrink-0" />
          {cluster.city}, {cluster.state}
        </span>
      </div>

      {/* Event types */}
      <div className="mt-2 flex flex-wrap items-center gap-1">
        <Trophy size={12} weight="bold" className="shrink-0 text-warm-gray" />
        <span className="text-[11px] text-warm-brown">
          {uniqueTypeLabels.join(', ')}
        </span>
      </div>
    </div>
  )
}

/**
 * Group a flat list of EventWithVenue into venue clusters.
 */
export function groupEventsByVenue(events: EventWithVenue[]): VenueCluster[] {
  const map = new Map<string, EventWithVenue[]>()

  for (const event of events) {
    const key = event.venueId
    const existing = map.get(key)
    if (existing) {
      existing.push(event)
    } else {
      map.set(key, [event])
    }
  }

  const clusters: VenueCluster[] = []

  for (const [venueId, venueEvents] of Array.from(map.entries())) {
    const venue = venueEvents[0].venue

    // Unique club names (preserving first-seen order)
    const clubNames: string[] = []
    const clubSet = new Set<string>()
    for (const e of venueEvents) {
      if (!clubSet.has(e.clubName)) {
        clubSet.add(e.clubName)
        clubNames.push(e.clubName)
      }
    }

    // Unique event types (preserving order)
    const eventTypes: EventType[] = []
    const typeSet = new Set<EventType>()
    for (const e of venueEvents) {
      if (!typeSet.has(e.eventType)) {
        typeSet.add(e.eventType)
        eventTypes.push(e.eventType)
      }
    }

    // Date range
    const dates = venueEvents.map((e) => new Date(e.startDate).getTime())
    const minDate = new Date(Math.min(...dates)).toISOString()
    const maxDate = new Date(Math.max(...dates)).toISOString()

    clusters.push({
      venueId,
      venueName: venue.name ?? '',
      city: venue.city ?? '',
      state: venue.state ?? '',
      latitude: venue.latitude,
      longitude: venue.longitude,
      events: venueEvents,
      clubNames,
      eventTypes,
      dateRange: { min: minDate, max: maxDate },
    })
  }

  // Sort clusters by earliest event date
  clusters.sort(
    (a, b) =>
      new Date(a.dateRange.min).getTime() - new Date(b.dateRange.min).getTime()
  )

  return clusters
}
