import { notFound } from 'next/navigation'

import { getEventBySlug } from '@/lib/events/queries'

import { EventDetailPanel } from '@/components/events/event-detail-panel'

interface ModalEventPageProps {
  params: { slug: string }
}

export default async function ModalEventPage({ params }: ModalEventPageProps) {
  const event = await getEventBySlug(params.slug)
  if (!event) {
    notFound()
  }

  return <EventDetailPanel event={event as any} />
}
