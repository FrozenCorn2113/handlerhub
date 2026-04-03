'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  ENTRY_STATUS_CONFIG,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
} from '@/lib/events/constants'
import type { EventWithVenue } from '@/lib/events/queries'

import { Calendar, MapPin, PawPrint, User, X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'

interface EventDetailPanelProps {
  event: EventWithVenue
}

export function EventDetailPanel({ event }: EventDetailPanelProps) {
  const router = useRouter()
  const typeLabel = EVENT_TYPE_LABELS[event.eventType]
  const typeColor = EVENT_TYPE_COLORS[event.eventType]
  const statusConfig = ENTRY_STATUS_CONFIG[event.entryStatus]

  const startDate = new Date(event.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const endDate: string | null = null

  const closingDate = event.closingDateTime
    ? new Date(event.closingDateTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const handleClose = () => {
    router.back()
  }

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/30"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl"
        style={{ marginTop: 'var(--header-height, 0px)' }}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-sand px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
              style={{ backgroundColor: typeColor }}
            >
              {typeLabel}
            </span>
            <span
              className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{
                color: statusConfig.color,
                backgroundColor: statusConfig.bgColor,
              }}
            >
              {statusConfig.label}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex size-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-sand hover:text-ringside-black"
            aria-label="Close panel"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-5 p-5">
            {/* Club name */}
            <div>
              <h2 className="font-display text-xl font-bold text-ringside-black">
                {event.clubName}
              </h2>
            </div>

            {/* Date */}
            <div className="flex items-start gap-2.5 text-sm text-warm-brown">
              <Calendar
                size={16}
                weight="bold"
                className="mt-0.5 shrink-0 text-paddock-green"
              />
              <div>
                <p className="font-medium">{startDate}</p>
                {endDate && <p className="text-warm-gray">through {endDate}</p>}
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-2.5 text-sm text-warm-brown">
              <MapPin
                size={16}
                weight="bold"
                className="mt-0.5 shrink-0 text-paddock-green"
              />
              <div>
                <p className="font-medium">{event.venue.name}</p>
                <p className="text-warm-gray">
                  {event.venue.city}, {event.venue.state}
                </p>
              </div>
            </div>

            {/* Entry status + closing date */}
            {closingDate && (
              <div
                className="rounded-lg border p-3"
                style={{
                  borderColor: statusConfig.color + '40',
                  backgroundColor: statusConfig.bgColor,
                }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: statusConfig.color }}
                >
                  {statusConfig.label}
                </p>
                <p className="mt-0.5 text-xs text-warm-brown">
                  Entries close {closingDate}
                </p>
              </div>
            )}

            {/* Indoor/Outdoor */}
            {event.venue.indoorOutdoor && (
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex rounded-full border border-sand bg-light-sand px-2.5 py-0.5 text-xs font-medium text-warm-gray">
                  {event.venue.indoorOutdoor}
                </span>
              </div>
            )}

            {/* Superintendent */}
            {event.superintendentName && (
              <div className="flex items-start gap-2.5 text-sm text-warm-brown">
                <User
                  size={16}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-paddock-green"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                    Superintendent
                  </p>
                  <p className="font-medium">{event.superintendentName}</p>
                </div>
              </div>
            )}

            {/* Eligible Breeds */}
            {event.eligibleBreeds && (
              <div className="flex items-start gap-2.5 text-sm text-warm-brown">
                <PawPrint
                  size={16}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-paddock-green"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                    Eligible Breeds
                  </p>
                  <p className="mt-0.5">{event.eligibleBreeds}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="space-y-3 border-t border-sand p-5">
          <Link
            href={`/handlers?state=${encodeURIComponent(event.venue.state)}${event.venue.city ? `&city=${encodeURIComponent(event.venue.city)}` : ''}`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-paddock-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            <PawPrint size={16} weight="bold" />
            Find a Handler
          </Link>
          <Link
            href={`/events/${event.slug}`}
            className="flex w-full items-center justify-center rounded-full border border-sand px-5 py-2.5 text-sm font-medium text-ringside-black transition-colors hover:bg-light-sand"
          >
            View Full Details
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
