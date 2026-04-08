import { NextRequest, NextResponse } from 'next/server'

import {
  getEventsWithPins,
  getFilteredEvents,
  getVenuePinsSQL,
} from '@/lib/events/queries'

import { EntryStatus, EventType } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    const state = searchParams.get('state') || undefined
    const city = searchParams.get('city') || undefined
    const eventType = (searchParams.get('eventType') as EventType) || undefined
    const breed = searchParams.get('breed') || undefined
    const entryStatus =
      (searchParams.get('entryStatus') as EntryStatus) || undefined
    const search = searchParams.get('search') || undefined
    const indoorOutdoor = searchParams.get('indoorOutdoor') || undefined
    const superintendent = searchParams.get('superintendent') || undefined
    const sortBy =
      (searchParams.get('sortBy') as 'date' | 'closingDate') || undefined
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const parsedDateFrom = searchParams.get('dateFrom')
      ? new Date(searchParams.get('dateFrom')! + 'T00:00:00Z')
      : undefined
    const dateFrom =
      parsedDateFrom && parsedDateFrom >= today ? parsedDateFrom : today
    const dateTo = searchParams.get('dateTo')
      ? new Date(searchParams.get('dateTo')! + 'T00:00:00Z')
      : undefined
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!, 10)
      : 50
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!, 10)
      : 0
    const view = searchParams.get('view') || 'unified' // 'unified' | 'list' | 'pins'

    // Map bounds for geographic filtering
    const boundsNorth = searchParams.get('boundsNorth')
      ? parseFloat(searchParams.get('boundsNorth')!)
      : undefined
    const boundsSouth = searchParams.get('boundsSouth')
      ? parseFloat(searchParams.get('boundsSouth')!)
      : undefined
    const boundsEast = searchParams.get('boundsEast')
      ? parseFloat(searchParams.get('boundsEast')!)
      : undefined
    const boundsWest = searchParams.get('boundsWest')
      ? parseFloat(searchParams.get('boundsWest')!)
      : undefined

    const bounds =
      boundsNorth !== undefined &&
      boundsSouth !== undefined &&
      boundsEast !== undefined &&
      boundsWest !== undefined
        ? {
            north: boundsNorth,
            south: boundsSouth,
            east: boundsEast,
            west: boundsWest,
          }
        : undefined

    const filters = {
      state,
      city,
      eventType,
      breed,
      entryStatus,
      search,
      indoorOutdoor,
      superintendent,
      sortBy,
      dateFrom,
      dateTo,
      limit,
      offset,
      bounds,
    }

    // Unified mode: return events + pins + total in one call
    if (view === 'unified') {
      const result = await getEventsWithPins(filters)
      return NextResponse.json(result)
    }

    if (view === 'pins') {
      const pins = await getVenuePinsSQL(filters)
      return NextResponse.json({ pins })
    }

    const { events, total } = await getFilteredEvents(filters)
    return NextResponse.json({ events, total })
  } catch (error) {
    console.error('Events API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
