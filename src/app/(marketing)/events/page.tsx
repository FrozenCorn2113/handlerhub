import type { Metadata } from 'next'

import {
  getEventBreeds,
  getEventsWithPins,
  getSuperintendents,
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
  let initialEvents: any[] = []
  let initialTotal = 0
  let initialPins: any[] = []
  let breeds: string[] = []
  let superintendents: string[] = []

  try {
    const now = new Date()
    const [result, breedsResult, supersResult] = await Promise.all([
      getEventsWithPins({ dateFrom: now, limit: 50 }),
      getEventBreeds(),
      getSuperintendents(),
    ])

    initialEvents = result.events
    initialTotal = result.total
    initialPins = result.pins
    breeds = breedsResult
    superintendents = supersResult
  } catch (error) {
    console.error('Failed to load events:', error)
  }

  return (
    <EventsBrowse
      initialEvents={initialEvents as any}
      initialPins={initialPins as any}
      initialTotal={initialTotal}
      breeds={breeds}
      superintendents={superintendents}
    />
  )
}
