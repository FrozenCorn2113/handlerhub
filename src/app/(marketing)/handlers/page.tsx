'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  Camera,
  Car,
  CaretDown,
  Dog,
  Funnel,
  Globe,
  MagnifyingGlass,
  MapPin,
  Money,
  Scissors,
  SealCheck,
  SpinnerGap,
  Star,
  Trophy,
  UserCircle,
  X,
} from '@phosphor-icons/react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Handler {
  id: string
  name: string
  profileImage: string | null
  coverImage: string | null
  serviceType: string
  serviceTypes: string[]
  breeds: string[]
  regions: string[]
  city: string | null
  state: string | null
  rating: number | null
  reviewCount: number
  ratePerShow: number | null
  yearsExperience: number | null
  experienceLevel: string
  isInsured: boolean
  isBonded: boolean
  registries: string[]
  tagline: string | null
  bio: string | null
}

interface SearchResponse {
  handlers: Handler[]
  total: number
  page: number
  totalPages: number
}

interface EventSuggestion {
  id: string
  name: string
  date: string
  location: string
}

/* ------------------------------------------------------------------ */
/*  Handler Map (dynamic import - no SSR)                              */
/* ------------------------------------------------------------------ */

const HandlerMap = dynamic(
  () =>
    import('@/components/handlers/handlers-map').then((m) => ({
      default: m.HandlersMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-light-sand">
        <SpinnerGap size={32} className="animate-spin text-warm-gray" />
      </div>
    ),
  }
)

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SERVICE_TYPES = [
  { label: 'Handler', value: 'HANDLING', icon: Dog },
  { label: 'Groomer', value: 'GROOMING', icon: Scissors },
  { label: 'Transport', value: 'TRANSPORT', icon: Car },
  { label: 'Photographer', value: 'PHOTOGRAPHY', icon: Camera },
] as const

const US_STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
]

const PRICE_RANGES = [
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 - $250', min: 150, max: 250 },
  { label: '$250 - $400', min: 250, max: 400 },
  { label: '$400+', min: 400, max: null },
]

const EXPERIENCE_LEVELS = [
  { label: 'Beginner', value: 'BEGINNER' },
  { label: 'Intermediate', value: 'INTERMEDIATE' },
  { label: 'Advanced', value: 'ADVANCED' },
  { label: 'Professional', value: 'PROFESSIONAL' },
]

/* ------------------------------------------------------------------ */
/*  Filter dropdown component                                          */
/* ------------------------------------------------------------------ */

function FilterDropdown({
  label,
  icon: Icon,
  isActive,
  children,
}: {
  label: string
  icon: React.ComponentType<any>
  isActive: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
          isActive
            ? 'border-paddock-green bg-paddock-green text-white'
            : 'border-sand bg-white text-warm-brown hover:border-paddock-green hover:shadow-sm'
        }`}
      >
        <Icon size={16} weight="bold" />
        {label}
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 min-w-[200px] rounded-2xl border border-sand bg-white p-2 shadow-lg">
          {children}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Event Autocomplete                                                 */
/* ------------------------------------------------------------------ */

function EventAutocomplete({
  onSelect,
  selectedEvent,
  onClear,
}: {
  onSelect: (event: EventSuggestion) => void
  selectedEvent: EventSuggestion | null
  onClear: () => void
}) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<EventSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleInput(value: string) {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (value.length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/events/search?q=${encodeURIComponent(value)}`
        )
        const data = await res.json()
        setSuggestions(data.events || [])
        setOpen(data.events?.length > 0)
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  if (selectedEvent) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-paddock-green bg-paddock-green/5 px-4 py-2 text-sm">
        <Trophy
          size={16}
          weight="bold"
          className="shrink-0 text-paddock-green"
        />
        <span className="truncate font-medium text-paddock-green">
          {selectedEvent.name}
        </span>
        <button
          onClick={onClear}
          className="ml-auto shrink-0 rounded-full p-0.5 text-paddock-green hover:bg-paddock-green/10"
        >
          <X size={14} weight="bold" />
        </button>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Trophy
          size={16}
          weight="bold"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Attending a show? Search events..."
          className="w-full rounded-full border border-sand bg-white py-2 pl-10 pr-4 text-sm text-ringside-black placeholder:text-warm-gray/60 focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
        />
        {loading && (
          <SpinnerGap
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-warm-gray"
          />
        )}
      </div>
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-30 mt-2 w-full rounded-2xl border border-sand bg-white p-2 shadow-lg">
          {suggestions.map((event) => (
            <button
              key={event.id}
              onClick={() => {
                onSelect(event)
                setQuery('')
                setOpen(false)
              }}
              className="flex w-full flex-col rounded-lg px-3 py-2 text-left hover:bg-light-sand"
            >
              <span className="text-sm font-medium text-ringside-black">
                {event.name}
              </span>
              <span className="text-xs text-warm-gray">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
                {event.location ? ` \u00b7 ${event.location}` : ''}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Handler card (Fiverr-style)                                        */
/* ------------------------------------------------------------------ */

function HandlerCard({
  handler,
  isHighlighted,
}: {
  handler: Handler
  isHighlighted?: boolean
}) {
  const initials = handler.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const location = [handler.city, handler.state].filter(Boolean).join(', ')

  return (
    <Link
      href={`/handlers/${handler.id}`}
      className={`group block overflow-hidden rounded-2xl border shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        isHighlighted
          ? 'border-paddock-green ring-2 ring-paddock-green/20'
          : 'border-sand bg-white'
      }`}
    >
      {/* Cover photo area */}
      <div className="relative h-36 w-full bg-gradient-to-br from-light-sand to-sand">
        {handler.coverImage ? (
          <img
            src={handler.coverImage}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : handler.profileImage ? (
          <div className="h-full w-full bg-gradient-to-br from-forest/20 to-paddock-green/10" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-light-sand via-sand to-tan" />
        )}
      </div>

      {/* Avatar overlapping cover */}
      <div className="relative px-4 pb-4">
        <div className="-mt-8 mb-2 flex items-end gap-3">
          {handler.profileImage ? (
            <img
              src={handler.profileImage}
              alt={handler.name}
              className="size-16 shrink-0 rounded-full border-[3px] border-white object-cover shadow-md"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-forest text-lg font-bold text-white shadow-md">
              {initials}
            </div>
          )}
          <div className="min-w-0 pb-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-display text-base font-semibold text-ringside-black">
                {handler.name}
              </h3>
              {handler.isInsured && (
                <SealCheck
                  size={18}
                  weight="fill"
                  className="shrink-0 text-paddock-green"
                />
              )}
            </div>
            <p className="text-xs text-warm-gray">
              {handler.yearsExperience
                ? `${handler.yearsExperience} yrs experience`
                : handler.experienceLevel.charAt(0) +
                  handler.experienceLevel.slice(1).toLowerCase()}
            </p>
          </div>
        </div>

        {/* Tagline or bio snippet */}
        {(handler.tagline || handler.bio) && (
          <p className="mb-3 line-clamp-2 text-sm leading-snug text-warm-brown">
            {handler.tagline || handler.bio}
          </p>
        )}

        {/* Breed chips */}
        {handler.breeds.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {handler.breeds.slice(0, 3).map((breed) => (
              <span
                key={breed}
                className="rounded-full bg-light-sand px-2.5 py-0.5 text-xs text-warm-brown"
              >
                {breed}
              </span>
            ))}
            {handler.breeds.length > 3 && (
              <span className="rounded-full bg-light-sand px-2.5 py-0.5 text-xs text-warm-gray">
                +{handler.breeds.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Bottom row: rating + location + price */}
        <div className="flex items-center justify-between border-t border-sand/40 pt-3">
          <div className="flex items-center gap-3">
            {handler.rating && (
              <div className="flex items-center gap-1">
                <Star size={14} weight="fill" className="text-amber-400" />
                <span className="text-sm font-semibold text-ringside-black">
                  {handler.rating.toFixed(1)}
                </span>
                {handler.reviewCount > 0 && (
                  <span className="text-xs text-warm-gray">
                    ({handler.reviewCount})
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-warm-gray">
              <MapPin size={12} weight="bold" className="text-paddock-green" />
              {location || handler.regions?.[0] || 'N/A'}
            </div>
          </div>
          {handler.ratePerShow && (
            <p className="text-sm font-semibold text-paddock-green">
              From ${handler.ratePerShow}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HandlersPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-140px)] items-center justify-center bg-ring-cream">
          <SpinnerGap size={32} className="animate-spin text-warm-gray" />
        </div>
      }
    >
      <HandlersPage />
    </Suspense>
  )
}

function HandlersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [handlers, setHandlers] = useState<Handler[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  )
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventSuggestion | null>(
    null
  )

  const activeState = searchParams.get('state') || ''
  const activeCity = searchParams.get('city') || ''
  const activeBreed = searchParams.get('breed') || ''
  const activeMinPrice = searchParams.get('minPrice') || ''
  const activeMaxPrice = searchParams.get('maxPrice') || ''
  const activeExperience = searchParams.get('experience') || ''
  const activeSearch = searchParams.get('search') || ''
  const activeSort = searchParams.get('sort') || 'newest'
  const activeServiceType = searchParams.get('serviceType') || ''
  const activeEventId = searchParams.get('eventId') || ''

  const hasActiveFilters =
    activeState ||
    activeBreed ||
    activeMinPrice ||
    activeMaxPrice ||
    activeExperience ||
    activeServiceType ||
    activeEventId

  const fetchHandlers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeSearch) params.set('search', activeSearch)
      if (activeState) params.set('state', activeState)
      if (activeCity) params.set('city', activeCity)
      if (activeBreed) params.set('breed', activeBreed)
      if (activeMinPrice) params.set('minPrice', activeMinPrice)
      if (activeMaxPrice) params.set('maxPrice', activeMaxPrice)
      if (activeExperience) params.set('experience', activeExperience)
      if (activeServiceType) params.set('serviceType', activeServiceType)
      if (activeEventId) params.set('eventId', activeEventId)
      if (activeSort) params.set('sort', activeSort)
      params.set('page', page.toString())

      const res = await fetch(`/api/handlers?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data: SearchResponse = await res.json()
      setHandlers(data.handlers)
      setTotal(data.total)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error('Failed to fetch handlers:', err)
      setHandlers([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [
    activeSearch,
    activeState,
    activeCity,
    activeBreed,
    activeMinPrice,
    activeMaxPrice,
    activeExperience,
    activeServiceType,
    activeEventId,
    activeSort,
    page,
  ])

  useEffect(() => {
    fetchHandlers()
  }, [fetchHandlers])

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    setPage(1)
    router.push(`/handlers?${params.toString()}`, { scroll: false })
  }

  function clearFilters() {
    setPage(1)
    setSelectedEvent(null)
    router.push('/handlers', { scroll: false })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setFilter('search', searchQuery)
  }

  function handleEventSelect(event: EventSuggestion) {
    setSelectedEvent(event)
    setFilter('eventId', event.id)
  }

  function handleEventClear() {
    setSelectedEvent(null)
    setFilter('eventId', '')
  }

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col bg-ring-cream">
      {/* Sticky header: service selector + search + filters */}
      <div className="sticky top-0 z-20 border-b border-sand bg-ring-cream">
        {/* Service Type Selector */}
        <div className="px-6 pb-2 pt-4">
          <h1 className="mb-3 font-display text-xl font-bold text-ringside-black">
            Find a Professional
          </h1>
          <div className="flex gap-3">
            {SERVICE_TYPES.map(({ label, value, icon: Icon }) => {
              const isSelected = activeServiceType === value
              return (
                <button
                  key={value}
                  onClick={() =>
                    setFilter('serviceType', isSelected ? '' : value)
                  }
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-5 py-3 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'border-paddock-green bg-paddock-green text-white shadow-md'
                      : 'border-sand bg-white text-warm-brown hover:border-paddock-green/40 hover:shadow-sm'
                  }`}
                >
                  <Icon size={24} weight={isSelected ? 'fill' : 'bold'} />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Search + Event row */}
        <div className="flex gap-3 px-6 pb-1 pt-2">
          <form onSubmit={handleSearch} className="relative max-w-md flex-1">
            <MagnifyingGlass
              size={18}
              weight="bold"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, location, breed..."
              className="w-full rounded-full border border-sand bg-white py-2 pl-10 pr-4 text-sm text-ringside-black placeholder:text-warm-gray/60 focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
            />
          </form>
          <div className="w-72">
            <EventAutocomplete
              onSelect={handleEventSelect}
              selectedEvent={selectedEvent}
              onClear={handleEventClear}
            />
          </div>
        </div>

        {/* Filter pills row */}
        <div className="flex items-center gap-3 overflow-x-auto px-6 py-2.5">
          <FilterDropdown
            label={activeState || 'State'}
            icon={Globe}
            isActive={!!activeState}
          >
            <button
              onClick={() => setFilter('state', '')}
              className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-warm-gray hover:bg-light-sand"
            >
              All States
            </button>
            <div className="max-h-48 overflow-y-auto">
              {US_STATES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter('state', s)}
                  className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-light-sand ${
                    activeState === s
                      ? 'font-semibold text-paddock-green'
                      : 'text-ringside-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterDropdown>

          <FilterDropdown
            label={
              activeMinPrice
                ? `$${activeMinPrice}-${activeMaxPrice || '\u221E'}`
                : 'Price Range'
            }
            icon={Money}
            isActive={!!activeMinPrice}
          >
            <button
              onClick={() => {
                setFilter('minPrice', '')
                setFilter('maxPrice', '')
              }}
              className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-warm-gray hover:bg-light-sand"
            >
              Any Price
            </button>
            {PRICE_RANGES.map((r) => (
              <button
                key={r.label}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.set('minPrice', r.min.toString())
                  if (r.max) params.set('maxPrice', r.max.toString())
                  else params.delete('maxPrice')
                  params.delete('page')
                  setPage(1)
                  router.push(`/handlers?${params.toString()}`, {
                    scroll: false,
                  })
                }}
                className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-ringside-black hover:bg-light-sand"
              >
                {r.label}
              </button>
            ))}
          </FilterDropdown>

          <FilterDropdown
            label={activeExperience || 'Experience'}
            icon={Trophy}
            isActive={!!activeExperience}
          >
            <button
              onClick={() => setFilter('experience', '')}
              className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-warm-gray hover:bg-light-sand"
            >
              Any Level
            </button>
            {EXPERIENCE_LEVELS.map((l) => (
              <button
                key={l.value}
                onClick={() => setFilter('experience', l.value)}
                className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-light-sand ${
                  activeExperience === l.value
                    ? 'font-semibold text-paddock-green'
                    : 'text-ringside-black'
                }`}
              >
                {l.label}
              </button>
            ))}
          </FilterDropdown>

          <FilterDropdown
            label="Sort"
            icon={Funnel}
            isActive={activeSort !== 'newest'}
          >
            {[
              { label: 'Newest', value: 'newest' },
              { label: 'Highest Rated', value: 'rating' },
              { label: 'Most Experience', value: 'experience' },
              { label: 'Price: Low to High', value: 'price_low' },
              { label: 'Price: High to Low', value: 'price_high' },
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => setFilter('sort', s.value)}
                className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-light-sand ${
                  activeSort === s.value
                    ? 'font-semibold text-paddock-green'
                    : 'text-ringside-black'
                }`}
              >
                {s.label}
              </button>
            ))}
          </FilterDropdown>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex shrink-0 items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
            >
              <X size={12} weight="bold" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Split view */}
      <div className="flex min-h-0 flex-1">
        {/* Left panel: handler cards */}
        <div className="w-full overflow-y-auto px-6 py-5 lg:w-3/5">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-body text-sm text-warm-gray">
              {loading ? (
                <span className="flex items-center gap-2">
                  <SpinnerGap size={14} className="animate-spin" />
                  Searching...
                </span>
              ) : (
                <>
                  <span className="font-semibold text-ringside-black">
                    {total} handler{total !== 1 ? 's' : ''}
                  </span>{' '}
                  {hasActiveFilters ? 'matching your filters' : 'available'}
                </>
              )}
            </p>
          </div>

          {!loading && handlers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <UserCircle size={48} weight="thin" className="mb-3 text-tan" />
              <p className="font-display text-lg font-medium text-warm-gray">
                No handlers found
              </p>
              <p className="mt-1 font-body text-sm text-warm-gray/70">
                {hasActiveFilters
                  ? 'Try adjusting your filters or broadening your search.'
                  : 'Be the first to create a handler profile!'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-full bg-paddock-green px-5 py-2 text-sm font-semibold text-white hover:bg-paddock-green/90"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 pb-8 md:grid-cols-2">
            {handlers.map((handler) => (
              <HandlerCard
                key={handler.id}
                handler={handler}
                isHighlighted={highlightedId === handler.id}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pb-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-full border border-sand px-4 py-2 text-sm font-medium text-warm-brown transition-all hover:border-paddock-green disabled:opacity-40"
              >
                Previous
              </button>
              <span className="font-body text-sm text-warm-gray">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-full border border-sand px-4 py-2 text-sm font-medium text-warm-brown transition-all hover:border-paddock-green disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Right panel: map */}
        <div className="sticky top-0 hidden h-full border-l border-sand lg:block lg:w-2/5">
          <HandlerMap
            handlers={handlers}
            highlightedId={highlightedId}
            onPinHover={setHighlightedId}
          />
        </div>
      </div>
    </div>
  )
}
