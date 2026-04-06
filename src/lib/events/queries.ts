import { prisma } from '@/lib/db'

import { EntryStatus, EventType, Prisma } from '@prisma/client'
import 'server-only'

export type EventWithVenue = Prisma.EventGetPayload<{
  include: { venue: true }
}>

export interface MapBoundsFilter {
  north: number
  south: number
  east: number
  west: number
}

export interface EventFilters {
  state?: string
  city?: string
  eventType?: EventType
  breed?: string
  entryStatus?: EntryStatus
  dateFrom?: Date
  dateTo?: Date
  search?: string
  indoorOutdoor?: string
  superintendent?: string
  sortBy?: 'date' | 'closingDate'
  limit?: number
  offset?: number
  bounds?: MapBoundsFilter
}

// ──────────────────────────────────────────────
// In-memory cache for breed list + state list
// ──────────────────────────────────────────────
interface CacheEntry<T> {
  data: T
  expiresAt: number
}

const CACHE_TTL = 60 * 60 * 1000 // 1 hour

let breedCache: CacheEntry<string[]> | null = null
let stateCache: CacheEntry<string[]> | null = null
let superintendentCache: CacheEntry<string[]> | null = null

function buildWhereClause(filters: EventFilters) {
  const where: Prisma.EventWhereInput = {}
  const venueWhere: Prisma.VenueWhereInput = {}

  if (filters.state) {
    venueWhere.state = filters.state.toUpperCase()
  }

  if (filters.city) {
    venueWhere.city = { contains: filters.city, mode: 'insensitive' }
  }

  if (filters.indoorOutdoor) {
    venueWhere.indoorOutdoor = filters.indoorOutdoor
  }

  if (filters.bounds) {
    venueWhere.latitude = {
      gte: filters.bounds.south,
      lte: filters.bounds.north,
    }
    venueWhere.longitude = {
      gte: filters.bounds.west,
      lte: filters.bounds.east,
    }
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

  if (filters.superintendent) {
    where.superintendentName = {
      contains: filters.superintendent,
      mode: 'insensitive',
    }
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
      {
        superintendentName: {
          contains: filters.search,
          mode: 'insensitive',
        },
      },
    ]
  }

  return where
}

/** Fetch events with filters for the browse page */
export async function getFilteredEvents(filters: EventFilters = {}) {
  const where = buildWhereClause(filters)

  const orderBy: Prisma.EventOrderByWithRelationInput =
    filters.sortBy === 'closingDate'
      ? { closingDateTime: 'asc' }
      : { startDate: 'asc' }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: { venue: true },
      orderBy,
      take: filters.limit || 50,
      skip: filters.offset || 0,
    }),
    prisma.event.count({ where }),
  ])

  return { events, total }
}

/** Combined fetch: events + pins in 2 parallel queries */
export async function getEventsWithPins(filters: EventFilters = {}) {
  const where = buildWhereClause(filters)

  const orderBy: Prisma.EventOrderByWithRelationInput =
    filters.sortBy === 'closingDate'
      ? { closingDateTime: 'asc' }
      : { startDate: 'asc' }

  // Pins query uses filters WITHOUT bounds so the full map stays populated.
  // Events query uses full filters (including bounds) so the list matches the viewport.
  const pinsFilters = { ...filters }
  delete pinsFilters.bounds

  // Remove limit/offset for pins query - we need all matching events for map
  const [eventsResult, pinsResult] = await Promise.all([
    // Query 1: paginated events for the list (with bounds)
    Promise.all([
      prisma.event.findMany({
        where,
        include: { venue: true },
        orderBy,
        take: filters.limit || 50,
        skip: filters.offset || 0,
      }),
      prisma.event.count({ where }),
    ]),
    // Query 2: aggregated pins via raw SQL for performance (without bounds)
    getVenuePinsSQL(pinsFilters),
  ])

  return {
    events: eventsResult[0],
    total: eventsResult[1],
    pins: pinsResult,
  }
}

/** Aggregate venue pins using SQL GROUP BY instead of fetching all events */
export async function getVenuePinsSQL(filters: EventFilters = {}) {
  // Build WHERE conditions for raw SQL
  const conditions: string[] = [
    'v."latitude" IS NOT NULL',
    'v."longitude" IS NOT NULL',
  ]
  const params: any[] = []
  let paramIdx = 1

  if (filters.state) {
    conditions.push(`v."state" = $${paramIdx}`)
    params.push(filters.state.toUpperCase())
    paramIdx++
  }

  if (filters.indoorOutdoor) {
    conditions.push(`v."indoorOutdoor" = $${paramIdx}`)
    params.push(filters.indoorOutdoor)
    paramIdx++
  }

  if (filters.eventType) {
    conditions.push(`e."eventType"::text = $${paramIdx}`)
    params.push(filters.eventType)
    paramIdx++
  }

  if (filters.breed) {
    conditions.push(`e."eligibleBreeds" ILIKE $${paramIdx}`)
    params.push(`%${filters.breed}%`)
    paramIdx++
  }

  if (filters.entryStatus) {
    conditions.push(`e."entryStatus"::text = $${paramIdx}`)
    params.push(filters.entryStatus)
    paramIdx++
  }

  if (filters.superintendent) {
    conditions.push(`e."superintendentName" ILIKE $${paramIdx}`)
    params.push(`%${filters.superintendent}%`)
    paramIdx++
  }

  if (filters.dateFrom) {
    conditions.push(`e."startDate" >= $${paramIdx}`)
    params.push(filters.dateFrom)
    paramIdx++
  }

  if (filters.dateTo) {
    conditions.push(`e."startDate" <= $${paramIdx}`)
    params.push(filters.dateTo)
    paramIdx++
  }

  if (filters.search) {
    conditions.push(
      `(e."clubName" ILIKE $${paramIdx} OR e."eligibleBreeds" ILIKE $${paramIdx} OR v."city" ILIKE $${paramIdx} OR v."state" ILIKE $${paramIdx} OR v."name" ILIKE $${paramIdx} OR e."superintendentName" ILIKE $${paramIdx})`
    )
    params.push(`%${filters.search}%`)
    paramIdx++
  }

  if (filters.bounds) {
    conditions.push(`v."latitude" >= $${paramIdx}`)
    params.push(filters.bounds.south)
    paramIdx++
    conditions.push(`v."latitude" <= $${paramIdx}`)
    params.push(filters.bounds.north)
    paramIdx++
    conditions.push(`v."longitude" >= $${paramIdx}`)
    params.push(filters.bounds.west)
    paramIdx++
    conditions.push(`v."longitude" <= $${paramIdx}`)
    params.push(filters.bounds.east)
    paramIdx++
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // Get aggregated venue data
  const venueRows = await prisma.$queryRawUnsafe<
    Array<{
      venueId: string
      name: string
      lat: number
      lng: number
      city: string
      state: string
      eventCount: bigint
    }>
  >(
    `SELECT
      v."id" as "venueId",
      v."name",
      v."latitude" as "lat",
      v."longitude" as "lng",
      v."city",
      v."state",
      COUNT(e."id") as "eventCount"
    FROM "events" e
    JOIN "venues" v ON e."venueId" = v."id"
    ${whereClause}
    GROUP BY v."id", v."name", v."latitude", v."longitude", v."city", v."state"`,
    ...params
  )

  // Get event details for each venue (limited to first 5 per venue for popups)
  const venueIds = venueRows.map((r) => r.venueId)
  if (venueIds.length === 0) return []

  // Build a second WHERE to fetch event summaries
  const eventConditions = [...conditions, `v."id" = ANY($${paramIdx})`]
  const eventParams = [...params, venueIds]

  const eventRows = await prisma.$queryRawUnsafe<
    Array<{
      venueId: string
      id: string
      slug: string
      clubName: string
      eventType: string
      eventTypeRaw: string
      startDate: Date
      entryStatus: string
    }>
  >(
    `SELECT
      v."id" as "venueId",
      e."id",
      e."slug",
      e."clubName",
      e."eventType"::text as "eventType",
      e."eventTypeRaw",
      e."startDate",
      e."entryStatus"::text as "entryStatus"
    FROM "events" e
    JOIN "venues" v ON e."venueId" = v."id"
    WHERE ${eventConditions.join(' AND ')}
    ORDER BY e."startDate" ASC`,
    ...eventParams
  )

  // Group events by venue
  const eventsByVenue = new Map<string, typeof eventRows>()
  for (const row of eventRows) {
    const existing = eventsByVenue.get(row.venueId)
    if (existing) {
      existing.push(row)
    } else {
      eventsByVenue.set(row.venueId, [row])
    }
  }

  return venueRows.map((venue) => ({
    venueId: venue.venueId,
    name: venue.name,
    lat: venue.lat,
    lng: venue.lng,
    city: venue.city,
    state: venue.state,
    eventCount: Number(venue.eventCount),
    events: (eventsByVenue.get(venue.venueId) || []).slice(0, 8).map((e) => ({
      id: e.id,
      slug: e.slug,
      clubName: e.clubName,
      eventType: e.eventType as EventType,
      eventTypeRaw: e.eventTypeRaw,
      startDate: e.startDate,
      entryStatus: e.entryStatus as EntryStatus,
    })),
  }))
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

/** Get distinct states that have events (cached 1hr) */
export async function getEventStates() {
  if (stateCache && Date.now() < stateCache.expiresAt) {
    return stateCache.data
  }

  const venues = await prisma.venue.findMany({
    where: { events: { some: {} } },
    select: { state: true },
    distinct: ['state'],
    orderBy: { state: 'asc' },
  })
  const states = venues.map((v) => v.state)

  stateCache = { data: states, expiresAt: Date.now() + CACHE_TTL }
  return states
}

/** Get distinct breeds from events (cached 1hr) */
export async function getEventBreeds() {
  if (breedCache && Date.now() < breedCache.expiresAt) {
    return breedCache.data
  }

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
      e.eligibleBreeds.split(',').forEach((b) => {
        const trimmed = b.trim()
        if (trimmed) breeds.add(trimmed)
      })
    }
  })

  const result = Array.from(breeds).sort()
  breedCache = { data: result, expiresAt: Date.now() + CACHE_TTL }
  return result
}

/** Get distinct superintendent names (cached 1hr) */
export async function getSuperintendents() {
  if (superintendentCache && Date.now() < superintendentCache.expiresAt) {
    return superintendentCache.data
  }

  const events = await prisma.event.findMany({
    where: {
      superintendentName: { not: null },
    },
    select: { superintendentName: true },
    distinct: ['superintendentName'],
    orderBy: { superintendentName: 'asc' },
  })

  const result = events.map((e) => e.superintendentName!).filter(Boolean)

  superintendentCache = { data: result, expiresAt: Date.now() + CACHE_TTL }
  return result
}

// Keep old function for backward compat but mark as legacy
/** @deprecated Use getEventsWithPins instead */
export async function getVenuePins(filters: EventFilters = {}) {
  return getVenuePinsSQL(filters)
}
