import { NextRequest, NextResponse } from 'next/server'

import { getFilteredEvents, getVenuePins } from '@/lib/events/queries'

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
    const dateFrom = searchParams.get('dateFrom')
      ? new Date(searchParams.get('dateFrom')!)
      : undefined
    const dateTo = searchParams.get('dateTo')
      ? new Date(searchParams.get('dateTo')!)
      : undefined
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!, 10)
      : 100
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!, 10)
      : 0
    const view = searchParams.get('view') || 'list' // 'list' | 'pins'

    const filters = {
      state,
      city,
      eventType,
      breed,
      entryStatus,
      search,
      dateFrom,
      dateTo,
      limit,
      offset,
    }

    if (view === 'pins') {
      const pins = await getVenuePins(filters)
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
