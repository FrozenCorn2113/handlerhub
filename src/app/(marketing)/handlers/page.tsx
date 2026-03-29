'use client'

import { WebmakerShell } from '@/components/webmaker/shell'

import {
  Dog,
  Funnel,
  Globe,
  MapPin,
  MapTrifold,
  Money,
  Star,
  Trophy,
} from '@phosphor-icons/react'

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

interface Handler {
  id: string
  name: string
  initials: string
  avatarColor: string
  serviceType: string
  breeds: string[]
  region: string
  rating: number
  reviewCount: number
  price: number
  yearsExperience: number
}

const MOCK_HANDLERS: Handler[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    initials: 'SM',
    avatarColor: 'bg-forest',
    serviceType: 'Show Handling',
    breeds: ['Standard Poodle', 'Bichon Frise'],
    region: 'Northeast',
    rating: 4.9,
    reviewCount: 87,
    price: 200,
    yearsExperience: 12,
  },
  {
    id: '2',
    name: 'David Chen',
    initials: 'DC',
    avatarColor: 'bg-show-orange',
    serviceType: 'Campaign',
    breeds: ['Golden Retriever', 'Labrador'],
    region: 'West Coast',
    rating: 5.0,
    reviewCount: 134,
    price: 300,
    yearsExperience: 18,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    initials: 'ER',
    avatarColor: 'bg-paddock-green',
    serviceType: 'Show Handling',
    breeds: ['German Shepherd', 'Doberman'],
    region: 'Southeast',
    rating: 4.8,
    reviewCount: 62,
    price: 175,
    yearsExperience: 8,
  },
  {
    id: '4',
    name: "James O'Brien",
    initials: 'JO',
    avatarColor: 'bg-warm-brown',
    serviceType: 'Grooming',
    breeds: ['Cocker Spaniel', 'Bichon Frise'],
    region: 'Mid-Atlantic',
    rating: 4.7,
    reviewCount: 45,
    price: 120,
    yearsExperience: 6,
  },
  {
    id: '5',
    name: 'Maria Santos',
    initials: 'MS',
    avatarColor: 'bg-forest',
    serviceType: 'Campaign',
    breeds: ['Rottweiler', 'German Shepherd'],
    region: 'Midwest',
    rating: 4.9,
    reviewCount: 98,
    price: 275,
    yearsExperience: 15,
  },
  {
    id: '6',
    name: 'Robert Kim',
    initials: 'RK',
    avatarColor: 'bg-show-orange',
    serviceType: 'Training',
    breeds: ['Labrador', 'Golden Retriever'],
    region: 'Pacific Northwest',
    rating: 4.6,
    reviewCount: 38,
    price: 150,
    yearsExperience: 10,
  },
  {
    id: '7',
    name: 'Patricia Nguyen',
    initials: 'PN',
    avatarColor: 'bg-paddock-green',
    serviceType: 'Show Handling',
    breeds: ['Standard Poodle', 'Cocker Spaniel'],
    region: 'Northeast',
    rating: 4.8,
    reviewCount: 71,
    price: 225,
    yearsExperience: 14,
  },
  {
    id: '8',
    name: 'Thomas Wright',
    initials: 'TW',
    avatarColor: 'bg-warm-brown',
    serviceType: 'Campaign',
    breeds: ['Doberman', 'Rottweiler'],
    region: 'Southeast',
    rating: 5.0,
    reviewCount: 112,
    price: 280,
    yearsExperience: 20,
  },
  {
    id: '9',
    name: 'Lisa Andersson',
    initials: 'LA',
    avatarColor: 'bg-forest',
    serviceType: 'Grooming',
    breeds: ['Bichon Frise', 'Standard Poodle'],
    region: 'West Coast',
    rating: 4.7,
    reviewCount: 53,
    price: 100,
    yearsExperience: 7,
  },
  {
    id: '10',
    name: 'Marcus Johnson',
    initials: 'MJ',
    avatarColor: 'bg-show-orange',
    serviceType: 'Show Handling',
    breeds: ['German Shepherd', 'Labrador'],
    region: 'Midwest',
    rating: 4.5,
    reviewCount: 29,
    price: 160,
    yearsExperience: 5,
  },
]

/* ------------------------------------------------------------------ */
/*  Filter bar                                                         */
/* ------------------------------------------------------------------ */

const FILTERS = [
  { label: 'Service Type', icon: Trophy },
  { label: 'Breed', icon: Dog },
  { label: 'Region', icon: Globe },
  { label: 'Show Circuit', icon: Funnel },
  { label: 'Price Range', icon: Money },
] as const

function FilterBar() {
  return (
    <div className="sticky top-0 z-20 border-b border-sand bg-ring-cream">
      <div className="flex items-center gap-3 overflow-x-auto px-6 py-3">
        {FILTERS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex shrink-0 items-center gap-2 rounded-full border border-tan bg-white px-4 py-2 text-sm font-medium text-warm-brown transition-all hover:border-forest hover:shadow-sm"
          >
            <Icon size={16} weight="bold" className="text-forest" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Service badge color helper                                         */
/* ------------------------------------------------------------------ */

function serviceBadgeClasses(serviceType: string): string {
  switch (serviceType) {
    case 'Campaign':
      return 'bg-show-orange/10 text-show-orange'
    case 'Show Handling':
      return 'bg-forest/10 text-forest'
    case 'Grooming':
      return 'bg-pastel-sky/40 text-warm-brown'
    case 'Training':
      return 'bg-pastel-mint/40 text-paddock-green'
    default:
      return 'bg-light-sand text-warm-brown'
  }
}

/* ------------------------------------------------------------------ */
/*  Handler card                                                       */
/* ------------------------------------------------------------------ */

function HandlerCard({ handler }: { handler: Handler }) {
  return (
    <div className="group cursor-pointer rounded-xl border border-sand/60 bg-white p-5 transition-all hover:border-tan hover:shadow-lg">
      {/* Top row: avatar + name + rating */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`${handler.avatarColor} flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white`}
          >
            {handler.initials}
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-ringside-black">
              {handler.name}
            </h3>
            <p className="text-xs text-warm-gray">
              {handler.yearsExperience} years experience
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} weight="fill" className="text-show-orange" />
          <span className="text-sm font-semibold text-ringside-black">
            {handler.rating}
          </span>
          <span className="text-xs text-warm-gray">
            ({handler.reviewCount})
          </span>
        </div>
      </div>

      {/* Service badge */}
      <div className="mb-3">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${serviceBadgeClasses(handler.serviceType)}`}
        >
          {handler.serviceType}
        </span>
      </div>

      {/* Breed chips */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {handler.breeds.map((breed) => (
          <span
            key={breed}
            className="rounded-full bg-light-sand px-2.5 py-0.5 text-xs text-warm-brown"
          >
            {breed}
          </span>
        ))}
      </div>

      {/* Bottom row: region + price */}
      <div className="flex items-center justify-between border-t border-sand/40 pt-3">
        <div className="flex items-center gap-1 text-sm text-warm-gray">
          <MapPin size={14} weight="bold" className="text-forest" />
          {handler.region}
        </div>
        <p className="text-sm font-semibold text-forest">
          From ${handler.price}/show
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Map placeholder                                                    */
/* ------------------------------------------------------------------ */

function MapPlaceholder() {
  return (
    <div className="flex size-full flex-col items-center justify-center rounded-l-xl bg-light-sand">
      <MapTrifold size={64} weight="thin" className="mb-3 text-tan" />
      <p className="text-lg font-medium text-warm-gray">Map View</p>
      <p className="mt-1 text-sm text-warm-gray/70">Coming soon</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HandlersPage() {
  return (
    <WebmakerShell>
      <div className="flex h-[calc(100vh-72px)] flex-col">
        {/* Filter bar */}
        <FilterBar />

        {/* Split view */}
        <div className="flex min-h-0 flex-1">
          {/* Left panel: handler cards */}
          <div className="w-full overflow-y-auto px-6 py-5 lg:w-3/5">
            <p className="mb-4 text-sm text-warm-gray">
              <span className="font-semibold text-ringside-black">
                {MOCK_HANDLERS.length} handlers
              </span>{' '}
              available
            </p>
            <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
              {MOCK_HANDLERS.map((handler) => (
                <HandlerCard key={handler.id} handler={handler} />
              ))}
            </div>
          </div>

          {/* Right panel: map */}
          <div className="sticky top-0 hidden h-full border-l border-sand lg:block lg:w-2/5">
            <MapPlaceholder />
          </div>
        </div>
      </div>
    </WebmakerShell>
  )
}
