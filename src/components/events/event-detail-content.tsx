'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  ENTRY_STATUS_CONFIG,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
} from '@/lib/events/constants'
import type { EventWithVenue } from '@/lib/events/queries'

import {
  ArrowLeft,
  ArrowSquareOut,
  Buildings,
  Calendar,
  Clock,
  CurrencyDollar,
  EnvelopeSimple,
  MagnifyingGlass,
  MapPin,
  PawPrint,
  Phone,
  Tag,
  Timer,
  User,
} from '@phosphor-icons/react'

// Dynamic map for detail page
const DetailMap = dynamic(
  () => import('./detail-map').then((mod) => ({ default: mod.DetailMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[300px] items-center justify-center rounded-xl bg-light-sand">
        <span className="text-sm text-warm-gray">Loading map...</span>
      </div>
    ),
  }
)

interface EventDetailContentProps {
  event: EventWithVenue
  alsoAtVenue: EventWithVenue[]
}

export function EventDetailContent({
  event,
  alsoAtVenue,
}: EventDetailContentProps) {
  const typeLabel = EVENT_TYPE_LABELS[event.eventType]
  const typeColor = EVENT_TYPE_COLORS[event.eventType]
  const statusConfig = ENTRY_STATUS_CONFIG[event.entryStatus]

  const formattedDate = new Date(event.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const openingDate = event.openingDateTime
    ? new Date(event.openingDateTime).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : null

  const closingDate = event.closingDateTime
    ? new Date(event.closingDateTime).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : null

  // Compute days until closing
  let closingCountdown: string | null = null
  if (event.closingDateTime) {
    const now = new Date()
    const closing = new Date(event.closingDateTime)
    const days = Math.ceil(
      (closing.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (days > 0) {
      closingCountdown = `${days} day${days !== 1 ? 's' : ''} until entries close`
    } else if (days === 0) {
      closingCountdown = 'Entries close today'
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Back link */}
      <div className="border-b border-[#E8E0D4] bg-[#F8F4EE]">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-warm-gray transition-colors hover:text-paddock-green"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Events
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: typeColor }}
            >
              {typeLabel}
            </span>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                color: statusConfig.color,
                backgroundColor: statusConfig.bgColor,
              }}
            >
              {statusConfig.label}
            </span>
            {event.venue.indoorOutdoor && (
              <span className="inline-flex rounded-full border border-[#E8E0D4] bg-white px-3 py-1 text-xs font-medium text-warm-gray">
                {event.venue.indoorOutdoor}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-bold text-ringside-black sm:text-3xl">
            {event.clubName}
          </h1>
          <p className="mt-1 text-base text-warm-brown">{formattedDate}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column: details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Entry Deadline Banner */}
            {(event.entryStatus === 'OPEN' ||
              event.entryStatus === 'CLOSING_SOON') &&
              closingCountdown && (
                <div
                  className="rounded-xl border-2 p-4"
                  style={{
                    borderColor: statusConfig.color,
                    backgroundColor: statusConfig.bgColor,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Timer
                      size={24}
                      weight="bold"
                      style={{ color: statusConfig.color }}
                    />
                    <div>
                      <p
                        className="text-base font-bold"
                        style={{ color: statusConfig.color }}
                      >
                        {closingCountdown}
                      </p>
                      {closingDate && (
                        <p className="text-sm text-warm-brown">
                          Closing: {closingDate}
                          {event.timeZone ? ` (${event.timeZone})` : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            {/* Venue & Map */}
            <div className="rounded-xl border border-[#E8E0D4] bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ringside-black">
                <Buildings
                  size={20}
                  weight="bold"
                  className="text-paddock-green"
                />
                Venue
              </h2>
              <div className="space-y-2">
                <p className="font-medium text-ringside-black">
                  {event.venue.name}
                </p>
                <p className="text-sm text-warm-brown">{event.venue.address}</p>
                <p className="text-sm text-warm-brown">
                  {event.venue.city}, {event.venue.state}
                </p>
              </div>
              {event.venue.latitude && event.venue.longitude && (
                <div className="mt-4 h-[300px] overflow-hidden rounded-xl">
                  <DetailMap
                    lat={event.venue.latitude}
                    lng={event.venue.longitude}
                    name={event.venue.name}
                  />
                </div>
              )}
            </div>

            {/* Entry Details */}
            <div className="rounded-xl border border-[#E8E0D4] bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ringside-black">
                <Calendar
                  size={20}
                  weight="bold"
                  className="text-paddock-green"
                />
                Entry Details
              </h2>
              <dl className="grid gap-4 sm:grid-cols-2">
                {openingDate && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                      Entries Open
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ringside-black">
                      {openingDate}
                      {event.timeZone ? ` (${event.timeZone})` : ''}
                    </dd>
                  </div>
                )}
                {closingDate && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                      Entries Close
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ringside-black">
                      {closingDate}
                      {event.timeZone ? ` (${event.timeZone})` : ''}
                    </dd>
                  </div>
                )}
                {event.entryFee && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                      Entry Fee
                    </dt>
                    <dd className="mt-1 flex items-center gap-1 text-sm font-medium text-ringside-black">
                      <CurrencyDollar size={14} className="text-warm-gray" />
                      {event.entryFee.trim()}
                    </dd>
                  </div>
                )}
                {event.entryAcceptanceMethod && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                      Acceptance Method
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ringside-black">
                      {event.entryAcceptanceMethod}
                    </dd>
                  </div>
                )}
                {event.entryLimit && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                      Entry Limit
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ringside-black">
                      {event.entryLimit}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Eligible Breeds */}
            {event.eligibleBreeds && (
              <div className="rounded-xl border border-[#E8E0D4] bg-white p-5">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-ringside-black">
                  <PawPrint
                    size={20}
                    weight="bold"
                    className="text-paddock-green"
                  />
                  Eligible Breeds
                </h2>
                <p className="text-sm text-warm-brown">
                  {event.eligibleBreeds}
                </p>
              </div>
            )}

            {/* Also at This Venue */}
            {alsoAtVenue.length > 0 && (
              <div className="rounded-xl border border-[#E8E0D4] bg-white p-5">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ringside-black">
                  <MapPin
                    size={20}
                    weight="bold"
                    className="text-paddock-green"
                  />
                  Also at This Venue
                </h2>
                <p className="mb-3 text-sm text-warm-gray">
                  {alsoAtVenue.length} other show
                  {alsoAtVenue.length !== 1 ? 's' : ''} happening at this venue
                  the same weekend
                </p>
                <div className="space-y-2">
                  {alsoAtVenue.map((e) => {
                    const aLabel = EVENT_TYPE_LABELS[e.eventType]
                    const aColor = EVENT_TYPE_COLORS[e.eventType]
                    const aDate = new Date(e.startDate).toLocaleDateString(
                      'en-US',
                      { weekday: 'short', month: 'short', day: 'numeric' }
                    )
                    return (
                      <Link
                        key={e.id}
                        href={`/events/${e.slug}`}
                        className="flex items-center justify-between rounded-lg border border-[#E8E0D4] p-3 transition-colors hover:border-paddock-green/40 hover:bg-sage/30"
                      >
                        <div>
                          <p className="text-sm font-medium text-ringside-black">
                            {e.clubName}
                          </p>
                          <p className="text-xs text-warm-gray">{aDate}</p>
                        </div>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                          style={{ backgroundColor: aColor }}
                        >
                          {aLabel}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right column: contacts */}
          <div className="space-y-6">
            {/* Find a Handler CTA */}
            <div className="rounded-xl border-2 border-paddock-green bg-gradient-to-br from-sage/40 to-paddock-green/10 p-5">
              <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-ringside-black">
                <MagnifyingGlass
                  size={18}
                  weight="bold"
                  className="text-paddock-green"
                />
                Need a Handler?
              </h2>
              <p className="mb-4 text-sm text-warm-brown">
                Find professional handlers available near this show.
              </p>
              <Link
                href={`/handlers?state=${encodeURIComponent(event.venue.state)}${event.venue.city ? `&city=${encodeURIComponent(event.venue.city)}` : ''}`}
                className="inline-flex items-center gap-2 rounded-full bg-paddock-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
              >
                <PawPrint size={16} weight="bold" />
                Find a Handler
              </Link>
            </div>

            {/* AKC Event Number */}
            <div className="rounded-xl border border-[#E8E0D4] bg-white p-5">
              <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-ringside-black">
                <Tag size={18} weight="bold" className="text-paddock-green" />
                AKC Event Info
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                    Event Number
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm text-ringside-black">
                    {event.eventNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                    Event Type
                  </dt>
                  <dd className="mt-0.5 text-sm text-ringside-black">
                    {typeLabel} ({event.eventTypeRaw})
                  </dd>
                </div>
              </dl>

              {/* External links */}
              <div className="mt-4 space-y-2 border-t border-[#E8E0D4] pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                  View Event On
                </p>
                <a
                  href={`https://showdays.info/showjud.php?show=${event.eventNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-paddock-green transition-colors hover:text-forest"
                >
                  <ArrowSquareOut size={14} weight="bold" />
                  ShowDays.info
                </a>
                <a
                  href={`https://webapps.akc.org/event-search/#/event/${event.eventNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-paddock-green transition-colors hover:text-forest"
                >
                  <ArrowSquareOut size={14} weight="bold" />
                  AKC Event Search
                </a>
              </div>
            </div>

            {/* Superintendent / Secretary */}
            {event.superintendentName && (
              <div className="rounded-xl border border-[#E8E0D4] bg-white p-5">
                <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-ringside-black">
                  <User
                    size={18}
                    weight="bold"
                    className="text-paddock-green"
                  />
                  Superintendent / Secretary
                </h2>
                <p className="font-medium text-ringside-black">
                  {event.superintendentName}
                </p>
                {event.superintendentPhone && (
                  <a
                    href={`tel:${event.superintendentPhone}`}
                    className="mt-2 flex items-center gap-2 text-sm text-paddock-green transition-colors hover:text-forest"
                  >
                    <Phone size={14} weight="bold" />
                    {event.superintendentPhone}
                  </a>
                )}
                {event.superintendentEmail && (
                  <a
                    href={`mailto:${event.superintendentEmail}`}
                    className="mt-1 flex items-center gap-2 text-sm text-paddock-green transition-colors hover:text-forest"
                  >
                    <EnvelopeSimple size={14} weight="bold" />
                    {event.superintendentEmail}
                  </a>
                )}
              </div>
            )}

            {/* Event Chair */}
            {event.eventChairName && (
              <div className="rounded-xl border border-[#E8E0D4] bg-white p-5">
                <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-ringside-black">
                  <User size={18} weight="bold" className="text-slate-blue" />
                  Event Chair
                </h2>
                <p className="font-medium text-ringside-black">
                  {event.eventChairName}
                </p>
                {event.eventChairPhone && (
                  <a
                    href={`tel:${event.eventChairPhone}`}
                    className="mt-2 flex items-center gap-2 text-sm text-paddock-green transition-colors hover:text-forest"
                  >
                    <Phone size={14} weight="bold" />
                    {event.eventChairPhone}
                  </a>
                )}
                {event.eventChairEmail && (
                  <a
                    href={`mailto:${event.eventChairEmail}`}
                    className="mt-1 flex items-center gap-2 text-sm text-paddock-green transition-colors hover:text-forest"
                  >
                    <EnvelopeSimple size={14} weight="bold" />
                    {event.eventChairEmail}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AKC Attribution */}
      <div className="border-t border-[#E8E0D4] bg-[#F8F4EE] px-4 py-3 text-center text-xs text-warm-gray">
        Event data sourced from AKC
      </div>
    </div>
  )
}
