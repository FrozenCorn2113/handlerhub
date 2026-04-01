import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')?.trim()
  if (!query || query.length < 2) {
    return NextResponse.json({ events: [] })
  }

  try {
    const events = await prisma.event.findMany({
      where: {
        clubName: { contains: query, mode: 'insensitive' },
        startDate: { gte: new Date() },
      },
      select: {
        id: true,
        clubName: true,
        startDate: true,
        venue: { select: { city: true, state: true } },
      },
      orderBy: { startDate: 'asc' },
      take: 8,
    })

    return NextResponse.json({
      events: events.map((e) => ({
        id: e.id,
        name: e.clubName,
        date: e.startDate,
        location: [e.venue?.city, e.venue?.state].filter(Boolean).join(', '),
      })),
    })
  } catch (error) {
    console.error('Event search error:', error)
    return NextResponse.json({ events: [] })
  }
}
