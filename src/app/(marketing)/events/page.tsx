import type { Metadata } from 'next'

import { prisma } from '@/lib/db'
import {
  getEventBreeds,
  getFilteredEvents,
  getVenuePins,
} from '@/lib/events/queries'

import { EventsBrowse } from '@/components/events/events-browse'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Upcoming Dog Shows & Events | HandlerHub',
  description:
    'Browse upcoming AKC dog shows on an interactive map. Search by location, breed, event type. Find entry deadlines, superintendent contacts, and venue details.',
  keywords: [
    'AKC dog shows',
    'upcoming dog shows',
    'dog show calendar',
    'specialty dog shows',
    'all-breed dog shows',
    'dog show map',
    'AKC events',
  ],
}

export default async function EventsPage() {
  let initialEvents: Awaited<ReturnType<typeof getFilteredEvents>>['events'] =
    []
  let initialTotal = 0
  let initialPins: Awaited<ReturnType<typeof getVenuePins>> = []
  let breeds: string[] = []

  try {
    const now = new Date()
    const [eventsResult, pinsResult, breedsResult] = await Promise.all([
      getFilteredEvents({ dateFrom: now, limit: 100 }),
      getVenuePins({ dateFrom: now }),
      getEventBreeds(),
    ])

    initialEvents = eventsResult.events
    initialTotal = eventsResult.total
    initialPins = pinsResult
    breeds = breedsResult
  } catch (error) {
    // DB unavailable -- render with empty state
    console.error('Failed to load events:', error)
  }

  return (
    <EventsBrowse
      initialEvents={initialEvents as any}
      initialPins={initialPins as any}
      initialTotal={initialTotal}
      breeds={breeds}
    />
  )
}
