import { prisma } from '@/lib/db'

import { EntryStatus, EventType, Prisma } from '@prisma/client'
import 'server-only'

export type EventWithVenue = Prisma.EventGetPayload<{
  include: { venue: true }
}>

export interface EventFilters {
  state?: string
  city?: string
  eventType?: EventType
  breed?: string
  entryStatus?: EntryStatus
  dateFrom?: Date
  dateTo?: Date
  search?: string
  limit?: number
  offset?: number
}

/** Fetch events with filters for the browse page */
export async function getFilteredEvents(filters: EventFilters = {}) {
  const where: Prisma.EventWhereInput = {}
  const venueWhere: Prisma.VenueWhereInput = {}

  if (filters.state) {
    venueWhere.state = filters.state.toUpperCase()
  }

  if (filters.city) {
    venueWhere.city = { contains: filters.city, mode: 'insensitive' }
  }

  if (Object.keys(venueWhere).length > 0) {
    where.venue = venueWhere
  }

  if (filters.eventType) {
    where.eventType = filters.eventType
  }

  if (filters.breed) {
    where.eligibleBreeds = { contains: filters.breed, mode: 'insensitive' }
  }

  if (filters.entryStatus) {
    where.entryStatus = filters.entryStatus
  }

  if (filters.dateFrom || filters.dateTo) {
    where.startDate = {}
    if (filters.dateFrom) {
      where.startDate.gte = filters.dateFrom
    }
    if (filters.dateTo) {
      where.startDate.lte = filters.dateTo
    }
  }

  if (filters.search) {
    where.OR = [
      { clubName: { contains: filters.search, mode: 'insensitive' } },
      { eligibleBreeds: { contains: filters.search, mode: 'insensitive' } },
      { venue: { city: { contains: filters.search, mode: 'insensitive' } } },
      { venue: { state: { contains: filters.search, mode: 'insensitive' } } },
      { venue: { name: { contains: filters.search, mode: 'insensitive' } } },
    ]
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: { venue: true },
      orderBy: { startDate: 'asc' },
      take: filters.limit || 100,
      skip: filters.offset || 0,
    }),
    prisma.event.count({ where }),
  ])

  return { events, total }
}

/** Fetch a single event by slug with venue data */
export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { venue: true },
  })
}

/** Fetch events at the same venue within 2 days of the given event */
export async function getAlsoAtVenue(
  venueId: string,
  startDate: Date,
  excludeEventId: string
) {
  const twoDaysBefore = new Date(startDate)
  twoDaysBefore.setDate(twoDaysBefore.getDate() - 2)
  const twoDaysAfter = new Date(startDate)
  twoDaysAfter.setDate(twoDaysAfter.getDate() + 2)

  return prisma.event.findMany({
    where: {
      venueId,
      id: { not: excludeEventId },
      startDate: {
        gte: twoDaysBefore,
        lte: twoDaysAfter,
      },
    },
    include: { venue: true },
    orderBy: { startDate: 'asc' },
  })
}

/** Get distinct states that have events */
export async function getEventStates() {
  const venues = await prisma.venue.findMany({
    where: { events: { some: {} } },
    select: { state: true },
    distinct: ['state'],
    orderBy: { state: 'asc' },
  })
  return venues.map((v) => v.state)
}

/** Get distinct breeds from events */
export async function getEventBreeds() {
  const events = await prisma.event.findMany({
    where: {
      eligibleBreeds: { not: null },
    },
    select: { eligibleBreeds: true },
    distinct: ['eligibleBreeds'],
  })

  const breeds = new Set<string>()
  events.forEach((e) => {
    if (e.eligibleBreeds) {
      // Some entries have comma-separated breeds
      e.eligibleBreeds.split(',').forEach((b) => {
        const trimmed = b.trim()
        if (trimmed) breeds.add(trimmed)
      })
    }
  })

  return Array.from(breeds).sort()
}

/** Aggregate venue pins for the map (grouped by venue with event counts) */
export async function getVenuePins(filters: EventFilters = {}) {
  const { events } = await getFilteredEvents({ ...filters, limit: 5000 })

  // Group by venue
  const venueMap = new Map<
    string,
    {
      venueId: string
      name: string
      lat: number
      lng: number
      city: string
      state: string
      eventCount: number
      events: Array<{
        id: string
        slug: string
        clubName: string
        eventType: EventType
        eventTypeRaw: string
        startDate: Date
        entryStatus: EntryStatus
      }>
    }
  >()

  for (const event of events) {
    const venue = event.venue
    if (!venue.latitude || !venue.longitude) continue

    const existing = venueMap.get(venue.id)
    const eventSummary = {
      id: event.id,
      slug: event.slug,
      clubName: event.clubName,
      eventType: event.eventType,
      eventTypeRaw: event.eventTypeRaw,
      startDate: event.startDate,
      entryStatus: event.entryStatus,
    }

    if (existing) {
      existing.eventCount++
      existing.events.push(eventSummary)
    } else {
      venueMap.set(venue.id, {
        venueId: venue.id,
        name: venue.name,
        lat: venue.latitude,
        lng: venue.longitude,
        city: venue.city,
        state: venue.state,
        eventCount: 1,
        events: [eventSummary],
      })
    }
  }

  return Array.from(venueMap.values())
}
