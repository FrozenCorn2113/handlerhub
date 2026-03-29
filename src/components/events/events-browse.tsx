'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'

import type { EventWithVenue } from '@/lib/events/queries'

import { EventCard } from './event-card'
import { EventsFilters, type FilterState } from './events-filters'
import type { VenuePin } from './events-map'
import { List, MapTrifold } from '@phosphor-icons/react'

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

interface EventsBrowseProps {
  initialEvents: EventWithVenue[]
  initialPins: VenuePin[]
  initialTotal: number
  breeds: string[]
}

export function EventsBrowse({
  initialEvents,
  initialPins,
  initialTotal,
  breeds,
}: EventsBrowseProps) {
  const [events, setEvents] = useState<EventWithVenue[]>(initialEvents)
  const [pins, setPins] = useState<VenuePin[]>(initialPins)
  const [total, setTotal] = useState(initialTotal)
  const [loading, setLoading] = useState(false)
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(
    null
  )
  const [showMap, setShowMap] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    state: '',
    eventType: '',
    entryStatus: '',
    dateFrom: '',
    dateTo: '',
  })

  const debounceRef = useRef<NodeJS.Timeout>()

  const fetchEvents = useCallback(async (f: FilterState) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (f.search) params.set('search', f.search)
      if (f.state) params.set('state', f.state)
      if (f.eventType) params.set('eventType', f.eventType)
      if (f.entryStatus) params.set('entryStatus', f.entryStatus)
      if (f.dateFrom) params.set('dateFrom', f.dateFrom)
      if (f.dateTo) params.set('dateTo', f.dateTo)
      params.set('limit', '200')

      // Fetch list and pins in parallel
      const [listRes, pinsRes] = await Promise.all([
        fetch(`/api/events?${params.toString()}`),
        fetch(`/api/events?${params.toString()}&view=pins`),
      ])

      const listData = await listRes.json()
      const pinsData = await pinsRes.json()

      if (listData.events) {
        setEvents(listData.events)
        setTotal(listData.total)
      }
      if (pinsData.pins) {
        setPins(pinsData.pins)
      }
    } catch (err) {
      console.error('Failed to fetch events:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced filter changes
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      fetchEvents(filters)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [filters, fetchEvents])

  return (
    <div className="flex h-[calc(100vh-72px)] flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[#E8E0D4] bg-[#F8F4EE] px-4 py-3 sm:px-6">
        <h1 className="text-lg font-bold text-ringside-black sm:text-xl">
          Upcoming Dog Shows
        </h1>
        <div className="flex items-center gap-2">
          {/* Map/List toggle for mobile */}
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-1.5 rounded-lg border border-[#E8E0D4] bg-white px-3 py-1.5 text-sm font-medium text-ringside-black transition-colors hover:border-paddock-green lg:hidden"
          >
            {showMap ? (
              <>
                <List size={16} weight="bold" />
                List
              </>
            ) : (
              <>
                <MapTrifold size={16} weight="bold" />
                Map
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main content: filters + list + map */}
      <div className="flex min-h-0 flex-1">
        {/* Left panel: filters + event list */}
        <div
          className={`flex w-full flex-col border-r border-[#E8E0D4] lg:w-[420px] xl:w-[480px] ${
            showMap ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Filters */}
          <div className="space-y-3 border-b border-[#E8E0D4] bg-white p-4">
            <EventsFilters
              filters={filters}
              onFiltersChange={setFilters}
              breeds={breeds}
              resultCount={total}
            />
          </div>

          {/* Event cards list */}
          <div className="flex-1 overflow-y-auto bg-[#FAFAF7]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-paddock-green border-t-transparent" />
              </div>
            ) : events.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <p className="text-base font-medium text-ringside-black">
                  No events found
                </p>
                <p className="mt-1 text-sm text-warm-gray">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="space-y-3 p-4">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isHighlighted={highlightedEventId === event.id}
                    onHover={setHighlightedEventId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right panel: map */}
        <div className={`flex-1 ${showMap ? 'block' : 'hidden lg:block'}`}>
          <EventsMap
            pins={pins}
            highlightedEventId={highlightedEventId}
            onPinHover={setHighlightedEventId}
          />
        </div>
      </div>

      {/* AKC Attribution */}
      <div className="border-t border-[#E8E0D4] bg-[#F8F4EE] px-4 py-2 text-center text-xs text-warm-gray">
        Event data sourced from AKC
      </div>
    </div>
  )
}
