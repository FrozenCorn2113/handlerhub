'use client'

import { useCallback, useMemo, useState } from 'react'

import { EVENT_TYPE_COLORS } from '@/lib/events/constants'

import { MapPin } from '@phosphor-icons/react'
import type { EntryStatus, EventType } from '@prisma/client'
import { Map, Marker, Overlay } from 'pigeon-maps'

export interface VenuePin {
  venueId: string
  name: string
  lat: number
  lng: number
  city: string
  state: string
  eventCount: number
  events: Array<{
    id: string
    slug: string
    clubName: string
    eventType: EventType
    eventTypeRaw: string
    startDate: string | Date
    entryStatus: EntryStatus
  }>
}

interface EventsMapProps {
  pins: VenuePin[]
  highlightedEventId?: string | null
  onPinHover?: (eventId: string | null) => void
  onPinClick?: (eventId: string) => void
}

export function EventsMap({
  pins,
  highlightedEventId,
  onPinHover,
  onPinClick,
}: EventsMapProps) {
  const [selectedPin, setSelectedPin] = useState<VenuePin | null>(null)

  // Compute which venue is highlighted
  const highlightedVenueId = useMemo(() => {
    if (!highlightedEventId) return null
    for (const pin of pins) {
      if (pin.events.some((e) => e.id === highlightedEventId)) {
        return pin.venueId
      }
    }
    return null
  }, [highlightedEventId, pins])

  // Compute center from pins or default to US center
  const center = useMemo<[number, number]>(() => {
    if (pins.length === 0) return [39.8283, -98.5795]
    const avgLat = pins.reduce((sum, p) => sum + p.lat, 0) / pins.length
    const avgLng = pins.reduce((sum, p) => sum + p.lng, 0) / pins.length
    return [avgLat, avgLng]
  }, [pins])

  // Close overlay when clicking outside (map click)
  const handleMapClick = useCallback(() => {
    setSelectedPin(null)
  }, [])

  const handleMarkerClick = useCallback(
    (pin: VenuePin) => {
      setSelectedPin((prev) => (prev?.venueId === pin.venueId ? null : pin))
      if (pin.events.length > 0) {
        onPinClick?.(pin.events[0].id)
      }
    },
    [onPinClick]
  )

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full cursor-grab overflow-hidden rounded-2xl border border-sand active:cursor-grabbing">
        <Map
          defaultCenter={center}
          defaultZoom={pins.length > 0 ? 4 : 4}
          onClick={() => {
            handleMapClick()
          }}
          attribution={false}
        >
          {pins.map((pin) => {
            const primaryEvent = pin.events[0]
            const color = primaryEvent
              ? EVENT_TYPE_COLORS[primaryEvent.eventType]
              : '#1F6B4A'
            const isHighlighted = highlightedVenueId === pin.venueId
            const isMulti = pin.eventCount > 1

            return (
              <Marker
                key={pin.venueId}
                anchor={[pin.lat, pin.lng]}
                onClick={() => handleMarkerClick(pin)}
                onMouseOver={() => {
                  if (pin.events.length > 0) {
                    onPinHover?.(pin.events[0].id)
                  }
                }}
                onMouseOut={() => {
                  onPinHover?.(null)
                }}
              >
                <div
                  style={{
                    background: color,
                    width: isMulti ? 32 : 14,
                    height: isMulti ? 32 : 14,
                    borderRadius: '50%',
                    border: '2.5px solid white',
                    boxShadow: isHighlighted
                      ? '0 0 8px rgba(31, 107, 74, 0.6), 0 2px 6px rgba(0,0,0,0.25)'
                      : '0 2px 6px rgba(0,0,0,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 700,
                    transform: isHighlighted ? 'scale(1.3)' : 'scale(1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    zIndex: isHighlighted ? 1000 : 'auto',
                  }}
                >
                  {isMulti ? pin.eventCount : null}
                </div>
              </Marker>
            )
          })}

          {selectedPin && (
            <Overlay
              anchor={[selectedPin.lat, selectedPin.lng]}
              offset={[110, 20]}
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                className="w-[220px] overflow-hidden rounded-xl bg-white shadow-md"
              >
                <div className="flex items-start justify-between px-3 pb-1 pt-2.5">
                  <span className="text-[11px] font-medium text-warm-gray">
                    {selectedPin.city}, {selectedPin.state}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPin(null)}
                    className="flex size-5 shrink-0 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-sand hover:text-ringside-black"
                  >
                    <svg
                      className="size-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="px-3 pb-2.5">
                  {selectedPin.events.slice(0, 3).map((e) => {
                    const date = new Date(e.startDate).toLocaleDateString(
                      'en-US',
                      { month: 'short', day: 'numeric' }
                    )
                    return (
                      <a
                        key={e.id}
                        href={`/events/${e.slug}`}
                        className="block truncate py-0.5 text-[12px] leading-snug text-ringside-black no-underline hover:text-paddock-green"
                      >
                        {e.clubName}
                        <span className="ml-1.5 text-[11px] text-warm-gray">
                          {date}
                        </span>
                      </a>
                    )
                  })}
                  {selectedPin.events.length > 3 && (
                    <p className="mt-0.5 text-[11px] text-warm-gray">
                      +{selectedPin.events.length - 3} more events
                    </p>
                  )}
                </div>
              </div>
            </Overlay>
          )}
        </Map>
      </div>

      {/* Empty state overlay */}
      {pins.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
          <MapPin size={40} weight="light" className="mb-2 text-warm-gray" />
          <p className="text-sm font-medium text-warm-gray">
            No venues with coordinates found
          </p>
          <p className="text-xs text-warm-gray/70">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  )
}
