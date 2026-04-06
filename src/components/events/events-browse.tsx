'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import type { EventWithVenue } from '@/lib/events/queries'

import { ErrorBoundary } from '@/components/ops/error-boundary'

import { EventCard } from './event-card'
import {
  EMPTY_FILTERS,
  EventsFilters,
  type FilterState,
} from './events-filters'
import type { MapBounds, VenuePin } from './events-map'
import { EventsMobileSheet } from './events-mobile-sheet'
import { MapPin } from '@phosphor-icons/react'
import { useVirtualizer } from '@tanstack/react-virtual'

// Dynamic import for map to avoid SSR issues with Leaflet
const EventsMap = dynamic(
  () => import('./events-map').then((mod) => ({ default: mod.EventsMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center rounded-xl bg-light-sand">
        <span className="text-sm text-warm-gray">Loading map...</span>
      </div>
    ),
  }
)

const PAGE_SIZE = 50

interface EventsBrowseProps {
  initialEvents: EventWithVenue[]
  initialPins: VenuePin[]
  initialTotal: number
  breeds: string[]
  superintendents: string[]
}

export function EventsBrowse({
  initialEvents,
  initialPins,
  initialTotal,
  breeds,
  superintendents,
}: EventsBrowseProps) {
  const [events, setEvents] = useState<EventWithVenue[]>(initialEvents)
  const [pins, setPins] = useState<VenuePin[]>(initialPins)
  const [total, setTotal] = useState(initialTotal)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(
    null
  )
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS)
  const [isDesktop, setIsDesktop] = useState(false)
  const [focusLocation, setFocusLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null)

  const router = useRouter()

  const debounceRef = useRef<NodeJS.Timeout>()
  const listContainerRef = useRef<HTMLDivElement>(null)
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)
  const eventCardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const fetchEventsRef = useRef<
    (
      f: FilterState,
      append?: boolean,
      bounds?: MapBounds | null
    ) => Promise<void>
  >(null!)
  const mapBoundsRef = useRef<MapBounds | null>(null)
  const boundsDebounceRef = useRef<NodeJS.Timeout>()
  const eventsLengthRef = useRef(initialEvents.length)

  // Track viewport to render only one map instance
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // Events are now filtered server-side by bounds, so display all loaded events
  const displayedEvents = events

  const hasMore = events.length < total

  // Virtualizer for large lists
  const virtualizer = useVirtualizer({
    count: displayedEvents.length + (hasMore ? 1 : 0), // +1 for load-more sentinel
    getScrollElement: () => listContainerRef.current,
    estimateSize: () => 160, // estimated card height
    overscan: 5,
  })

  // Keep events length ref in sync for use in fetch without stale closures
  useEffect(() => {
    eventsLengthRef.current = events.length
  }, [events.length])

  // Unified fetch: events + pins in one call
  // When bounds are provided, they filter the event list server-side.
  // Pins are fetched WITHOUT bounds so the full map remains populated.
  const fetchEvents = useCallback(
    async (f: FilterState, append = false, bounds?: MapBounds | null) => {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      try {
        const params = new URLSearchParams()
        if (f.search) params.set('search', f.search)
        if (f.state) params.set('state', f.state)
        if (f.eventType) params.set('eventType', f.eventType)
        if (f.entryStatus) params.set('entryStatus', f.entryStatus)
        if (f.dateFrom) params.set('dateFrom', f.dateFrom)
        if (f.dateTo) params.set('dateTo', f.dateTo)
        if (f.breed) params.set('breed', f.breed)
        if (f.indoorOutdoor) params.set('indoorOutdoor', f.indoorOutdoor)
        if (f.superintendent) params.set('superintendent', f.superintendent)
        if (f.sortBy && f.sortBy !== 'date') params.set('sortBy', f.sortBy)
        params.set('limit', String(PAGE_SIZE))
        params.set('offset', append ? String(eventsLengthRef.current) : '0')

        // Pass map bounds so the server filters events geographically
        if (bounds) {
          params.set('boundsNorth', String(bounds.north))
          params.set('boundsSouth', String(bounds.south))
          params.set('boundsEast', String(bounds.east))
          params.set('boundsWest', String(bounds.west))
        }

        // For non-append fetches, also get pins (without bounds so map stays full)
        if (!append) {
          params.set('view', 'unified')
        }

        const res = await fetch(`/api/events?${params.toString()}`)
        const data = await res.json()

        if (append) {
          if (data.events) {
            setEvents((prev) => [...prev, ...data.events])
          }
          if (data.total !== undefined) {
            setTotal(data.total)
          }
        } else {
          if (data.events) {
            setEvents(data.events)
            setTotal(data.total)
          }
          if (data.pins) {
            setPins(data.pins)
          }
        }
      } catch (err) {
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    []
  )

  fetchEventsRef.current = fetchEvents

  // Debounced filter changes (500ms)
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      fetchEvents(filters, false, mapBoundsRef.current)
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  // Infinite scroll: IntersectionObserver for the sentinel
  useEffect(() => {
    const triggerEl = loadMoreTriggerRef.current
    if (!triggerEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && hasMore && !loading && !loadingMore) {
          fetchEventsRef.current(filters, true, mapBoundsRef.current)
        }
      },
      { rootMargin: '400px' }
    )

    observer.observe(triggerEl)
    return () => observer.disconnect()
  }, [hasMore, loading, loadingMore, filters])

  const handleBoundsChange = useCallback(
    (bounds: MapBounds) => {
      setMapBounds(bounds)
      mapBoundsRef.current = bounds

      // Debounce bounds-driven refetch to avoid spamming during pan/zoom
      if (boundsDebounceRef.current) {
        clearTimeout(boundsDebounceRef.current)
      }
      boundsDebounceRef.current = setTimeout(() => {
        fetchEventsRef.current(filters, false, bounds)
      }, 300)
    },
    [filters]
  )

  // Map/list sync: click pin scrolls to card
  const handlePinClick = useCallback((eventId: string) => {
    const cardEl = eventCardRefs.current.get(eventId)
    if (cardEl && listContainerRef.current) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    setHighlightedEventId(eventId)
  }, [])

  // Card click: zoom map + open slide-over (desktop only)
  const handleCardClick = useCallback(
    (event: EventWithVenue) => {
      if (event.venue?.latitude && event.venue?.longitude) {
        setFocusLocation({
          lat: event.venue.latitude,
          lng: event.venue.longitude,
        })
      }
      router.push(`/events/${event.slug}`, { scroll: false })
    },
    [router]
  )

  // Build filter summary for mobile sheet
  const filterSummary = useMemo(() => {
    const parts: string[] = []
    if (filters.state) parts.push(filters.state)
    if (filters.eventType) parts.push(filters.eventType.replace(/_/g, ' '))
    if (filters.entryStatus) parts.push(filters.entryStatus.replace(/_/g, ' '))
    if (filters.breed) parts.push(filters.breed)
    if (filters.search) parts.push(`"${filters.search}"`)
    return parts.join(', ')
  }, [filters])

  const filterContent = (
    <EventsFilters
      filters={filters}
      onFiltersChange={setFilters}
      breeds={breeds}
      superintendents={superintendents}
      resultCount={total}
    />
  )

  const eventListContent = (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-paddock-green border-t-transparent" />
        </div>
      ) : displayedEvents.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="text-base font-medium text-ringside-black">
            No events in this area
          </p>
          <p className="mt-1 text-sm text-warm-gray">
            Try zooming out or panning the map to see more events
          </p>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {displayedEvents.map((event) => (
            <div
              key={event.id}
              ref={(el) => {
                if (el) eventCardRefs.current.set(event.id, el)
              }}
            >
              <EventCard
                event={event}
                isHighlighted={highlightedEventId === event.id}
                onHover={setHighlightedEventId}
              />
            </div>
          ))}
          {/* Load more sentinel */}
          {hasMore && (
            <div ref={loadMoreTriggerRef} className="flex justify-center py-4">
              {loadingMore ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-paddock-green border-t-transparent" />
              ) : (
                <span className="text-xs text-warm-gray">
                  Scroll for more...
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )

  // Virtualized list for desktop left panel
  const virtualizedListContent = (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-paddock-green border-t-transparent" />
        </div>
      ) : displayedEvents.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="text-base font-medium text-ringside-black">
            No events in this area
          </p>
          <p className="mt-1 text-sm text-warm-gray">
            Try zooming out or panning the map to see more events
          </p>
        </div>
      ) : (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const isLoadMore = virtualItem.index === displayedEvents.length

            if (isLoadMore) {
              return (
                <div
                  key="load-more"
                  ref={loadMoreTriggerRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                  className="flex items-center justify-center"
                >
                  {loadingMore ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-paddock-green border-t-transparent" />
                  ) : hasMore ? (
                    <span className="text-xs text-warm-gray">
                      Loading more...
                    </span>
                  ) : null}
                </div>
              )
            }

            const event = displayedEvents[virtualItem.index]
            if (!event) return null

            return (
              <div
                key={event.id}
                ref={(el) => {
                  if (el) {
                    virtualizer.measureElement(el)
                    eventCardRefs.current.set(event.id, el)
                  }
                }}
                data-index={virtualItem.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                  padding: '6px 16px',
                }}
              >
                <EventCard
                  event={event}
                  isHighlighted={highlightedEventId === event.id}
                  onHover={setHighlightedEventId}
                  onClick={handleCardClick}
                />
              </div>
            )
          })}
        </div>
      )}
    </>
  )

  const mapFallback = (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-light-sand p-8 text-center">
      <MapPin size={40} weight="light" className="mb-3 text-warm-gray" />
      <p className="text-sm font-medium text-ringside-black">Map unavailable</p>
      <p className="mt-1 text-xs text-warm-gray">
        Events are still available in the list view below.
      </p>
    </div>
  )

  const mapElement = (
    <ErrorBoundary fallback={mapFallback}>
      <EventsMap
        pins={pins}
        highlightedEventId={highlightedEventId}
        onPinHover={setHighlightedEventId}
        onPinClick={handlePinClick}
        focusLocation={focusLocation}
        onBoundsChange={handleBoundsChange}
      />
    </ErrorBoundary>
  )

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-sand bg-ring-cream px-4 py-3 sm:px-6">
        <h1 className="font-display text-lg font-bold text-ringside-black sm:text-xl">
          Upcoming Dog Shows
        </h1>
      </div>

      {/* ── DESKTOP: split layout (lg+) ── */}
      <div className="hidden min-h-0 flex-1 lg:flex">
        {/* Left panel: filters + scrollable virtualized list */}
        <div className="flex w-[55%] min-w-[380px] max-w-[640px] flex-col border-r border-sand">
          {/* Filters */}
          <div className="border-b border-sand bg-white p-4">
            {filterContent}
          </div>

          {/* Viewport filter indicator */}
          {mapBounds && (
            <div className="border-b border-sand bg-light-sand px-4 py-2">
              <p className="text-xs text-warm-gray">
                {hasMore
                  ? `Showing ${displayedEvents.length} of ${total} events in this area`
                  : `Showing all ${displayedEvents.length} events in this area`}
              </p>
            </div>
          )}

          {/* Virtualized event cards */}
          <div
            ref={listContainerRef}
            className="flex-1 overflow-y-auto bg-ring-cream"
          >
            {virtualizedListContent}
          </div>
        </div>

        {/* Right panel: persistent map (only rendered on desktop) */}
        <div className="flex-1">{isDesktop && mapElement}</div>
      </div>

      {/* ── MOBILE: full-screen map + bottom sheet (<lg) ── */}
      <div className="relative min-h-0 flex-1 lg:hidden">
        {/* Full-screen map (only rendered on mobile) */}
        <div className="h-full w-full">{!isDesktop && mapElement}</div>

        {/* Bottom sheet drawer */}
        <EventsMobileSheet
          filterSummary={filterSummary}
          eventCount={displayedEvents.length}
          filterContent={filterContent}
          listContent={eventListContent}
        />
      </div>

      {/* AKC Attribution */}
      <div className="hidden border-t border-sand bg-ring-cream px-4 py-2 text-center text-xs text-warm-gray lg:block">
        Event data sourced from AKC
      </div>
    </div>
  )
}
