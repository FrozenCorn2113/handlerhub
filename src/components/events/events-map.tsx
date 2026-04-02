'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ENTRY_STATUS_CONFIG,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
} from '@/lib/events/constants'

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
      <div className="h-full w-full overflow-hidden rounded-2xl border border-sand">
        <Map
          defaultCenter={center}
          defaultZoom={pins.length > 0 ? 4 : 4}
          height={600}
          onClick={({ event }) => {
            // Only close if clicking on the map itself, not on an overlay
            const target = event.target as HTMLElement
            if (!target.closest('[data-pin-overlay]')) {
              handleMapClick()
            }
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
              offset={[0, -20]}
            >
              <div
                data-pin-overlay
                className="rounded-lg border border-sand bg-white p-3 shadow-md"
                style={{ minWidth: 220, maxWidth: 300 }}
              >
                <div className="border-b-2 border-paddock-green pb-1 font-display text-sm font-bold text-ringside-black">
                  {selectedPin.name}
                </div>
                <p className="mb-2 mt-1 text-xs text-warm-gray">
                  {selectedPin.city}, {selectedPin.state}
                </p>
                {selectedPin.events.slice(0, 5).map((e) => {
                  const date = new Date(e.startDate).toLocaleDateString(
                    'en-US',
                    { month: 'short', day: 'numeric' }
                  )
                  const typeLabel = EVENT_TYPE_LABELS[e.eventType]
                  const statusCfg = ENTRY_STATUS_CONFIG[e.entryStatus]
                  return (
                    <a
                      key={e.id}
                      href={`/events/${e.slug}`}
                      className="block border-b border-sand py-1.5 no-underline"
                    >
                      <div className="text-[13px] font-semibold text-ringside-black">
                        {e.clubName}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span className="text-[11px] text-warm-gray">
                          {date}
                        </span>
                        <span className="text-[11px] text-warm-gray">
                          {typeLabel}
                        </span>
                        <span
                          className="rounded-full px-1.5 py-px text-[11px]"
                          style={{
                            color: statusCfg.color,
                            background: statusCfg.bgColor,
                          }}
                        >
                          {statusCfg.label}
                        </span>
                      </div>
                    </a>
                  )
                })}
                {selectedPin.events.length > 5 && (
                  <p className="py-1 text-xs text-warm-gray">
                    + {selectedPin.events.length - 5} more events
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPin.lat},${selectedPin.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 rounded-lg bg-paddock-green px-2.5 py-1 text-xs font-semibold text-white no-underline"
                >
                  Get Directions
                </a>
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
