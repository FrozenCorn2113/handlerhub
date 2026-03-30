'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  CaretDown,
  Dog,
  Funnel,
  Globe,
  MagnifyingGlass,
  MapPin,
  Money,
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
  serviceType: string
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
  bio: string | null
}

interface SearchResponse {
  handlers: Handler[]
  total: number
  page: number
  totalPages: number
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
            ? 'border-forest bg-forest/10 text-forest'
            : 'border-tan bg-white text-warm-brown hover:border-forest hover:shadow-sm'
        }`}
      >
        <Icon size={16} weight="bold" className="text-forest" />
        {label}
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 min-w-[200px] rounded-xl border border-sand bg-white p-2 shadow-lg">
          {children}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Service badge color helper                                         */
/* ------------------------------------------------------------------ */

function serviceBadgeClasses(serviceType: string): string {
  const lower = serviceType.toLowerCase()
  if (lower.includes('campaign')) return 'bg-show-orange/10 text-show-orange'
  if (
    lower.includes('handling') ||
    lower.includes('ringside') ||
    lower.includes('conformation')
  )
    return 'bg-forest/10 text-forest'
  if (lower.includes('groom')) return 'bg-pastel-sky/40 text-warm-brown'
  if (lower.includes('train')) return 'bg-pastel-mint/40 text-paddock-green'
  return 'bg-light-sand text-warm-brown'
}

/* ------------------------------------------------------------------ */
/*  Handler card                                                       */
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
      className={`group block rounded-xl border p-5 transition-all ${
        isHighlighted
          ? 'border-forest shadow-lg ring-2 ring-forest/20'
          : 'border-sand/60 bg-white hover:border-tan hover:shadow-lg'
      }`}
    >
      {/* Top row: avatar + name + rating */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {handler.profileImage ? (
            <img
              src={handler.profileImage}
              alt={handler.name}
              className="size-12 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
              {initials}
            </div>
          )}
          <div>
            <h3 className="font-display text-base font-semibold text-ringside-black">
              {handler.name}
            </h3>
            <p className="text-xs text-warm-gray">
              {handler.yearsExperience
                ? `${handler.yearsExperience} years experience`
                : handler.experienceLevel}
            </p>
          </div>
        </div>
        {handler.rating && (
          <div className="flex items-center gap-1">
            <Star size={14} weight="fill" className="text-show-orange" />
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
      </div>

      {/* Service badge + trust signals */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${serviceBadgeClasses(handler.serviceType)}`}
        >
          {handler.serviceType}
        </span>
        {handler.isInsured && (
          <span className="rounded-full bg-paddock-green/10 px-2 py-0.5 text-[10px] font-semibold text-paddock-green">
            Insured
          </span>
        )}
      </div>

      {/* Bio snippet */}
      {handler.bio && (
        <p className="mb-3 line-clamp-2 text-sm text-warm-brown">
          {handler.bio}
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
              +{handler.breeds.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Bottom row: region + price */}
      <div className="flex items-center justify-between border-t border-sand/40 pt-3">
        <div className="flex items-center gap-1 text-sm text-warm-gray">
          <MapPin size={14} weight="bold" className="text-forest" />
          {location || handler.regions?.[0] || 'Location not set'}
        </div>
        {handler.ratePerShow && (
          <p className="text-sm font-semibold text-forest">
            From ${handler.ratePerShow}/show
          </p>
        )}
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
        <div className="flex h-[calc(100vh-140px)] items-center justify-center">
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

  // Active filters from URL
  const activeState = searchParams.get('state') || ''
  const activeCity = searchParams.get('city') || ''
  const activeBreed = searchParams.get('breed') || ''
  const activeMinPrice = searchParams.get('minPrice') || ''
  const activeMaxPrice = searchParams.get('maxPrice') || ''
  const activeExperience = searchParams.get('experience') || ''
  const activeSearch = searchParams.get('search') || ''
  const activeSort = searchParams.get('sort') || 'newest'

  const hasActiveFilters =
    activeState ||
    activeBreed ||
    activeMinPrice ||
    activeMaxPrice ||
    activeExperience

  // Fetch handlers
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
    activeSort,
    page,
  ])

  useEffect(() => {
    fetchHandlers()
  }, [fetchHandlers])

  // Update URL params
  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset page on filter change
    setPage(1)
    router.push(`/handlers?${params.toString()}`, { scroll: false })
  }

  function clearFilters() {
    setPage(1)
    router.push('/handlers', { scroll: false })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setFilter('search', searchQuery)
  }

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      {/* Search + Filter bar */}
      <div className="sticky top-0 z-20 border-b border-sand bg-ring-cream">
        {/* Search row */}
        <div className="px-6 pt-3">
          <form onSubmit={handleSearch} className="relative max-w-md">
            <MagnifyingGlass
              size={18}
              weight="bold"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search handlers by name, location, breed..."
              className="w-full rounded-full border border-tan bg-white py-2 pl-10 pr-4 text-sm text-ringside-black placeholder:text-warm-gray/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </form>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 overflow-x-auto px-6 py-3">
          {/* State filter */}
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
                      ? 'font-semibold text-forest'
                      : 'text-ringside-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterDropdown>

          {/* Price filter */}
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

          {/* Experience filter */}
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
                    ? 'font-semibold text-forest'
                    : 'text-ringside-black'
                }`}
              >
                {l.label}
              </button>
            ))}
          </FilterDropdown>

          {/* Sort */}
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
                    ? 'font-semibold text-forest'
                    : 'text-ringside-black'
                }`}
              >
                {s.label}
              </button>
            ))}
          </FilterDropdown>

          {/* Clear filters */}
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
            <p className="text-sm text-warm-gray">
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
              <p className="text-lg font-medium text-warm-gray">
                No handlers found
              </p>
              <p className="mt-1 text-sm text-warm-gray/70">
                {hasActiveFilters
                  ? 'Try adjusting your filters or broadening your search.'
                  : 'Be the first to create a handler profile!'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white hover:bg-forest/90"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
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
                className="rounded-lg border border-sand px-3 py-1.5 text-sm font-medium text-warm-brown disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-warm-gray">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-sand px-3 py-1.5 text-sm font-medium text-warm-brown disabled:opacity-40"
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
