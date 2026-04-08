import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ENTRY_STATUS_CONFIG, EVENT_TYPE_LABELS } from '@/lib/events/constants'
import { getAlsoAtVenue, getEventBySlug } from '@/lib/events/queries'

import { EventDetailContent } from '@/components/events/event-detail-content'

interface EventDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) {
    return { title: 'Event Not Found' }
  }

  const typeLabel = EVENT_TYPE_LABELS[event.eventType]
  const dateStr = new Date(event.startDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return {
    title: `${event.clubName} ${typeLabel} - ${dateStr}`,
    description: `${event.clubName} ${typeLabel} dog show on ${dateStr} in ${event.venue.city}, ${event.venue.state}. Entry deadlines, superintendent contact, venue details, and more.`,
    keywords: [
      event.clubName,
      `${typeLabel} dog show`,
      `dog show ${event.venue.city}`,
      `dog show ${event.venue.state}`,
      event.eligibleBreeds || '',
      `AKC dog show ${dateStr}`,
    ].filter(Boolean),
    openGraph: {
      title: `${event.clubName} ${typeLabel} - ${dateStr}`,
      description: `${event.venue.city}, ${event.venue.state} - ${typeLabel}`,
    },
  }
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) {
    notFound()
  }

  const alsoAtVenue = await getAlsoAtVenue(
    event.venueId,
    event.startDate,
    event.id
  )

  return (
    <EventDetailContent event={event as any} alsoAtVenue={alsoAtVenue as any} />
  )
}
