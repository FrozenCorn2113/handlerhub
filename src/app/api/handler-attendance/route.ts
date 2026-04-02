import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * GET /api/handler-attendance
 * Returns the current handler's show attendance list.
 * Query params: ?handlerId=xyz (for public profile view)
 * Without handlerId, returns the authenticated user's attendance.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const publicHandlerId = searchParams.get('handlerId')?.trim() || null

  // Public view: fetch a specific handler's upcoming shows
  if (publicHandlerId) {
    try {
      const now = new Date()
      const attendance = await prisma.handlerShowAttendance.findMany({
        where: {
          handlerId: publicHandlerId,
          event: { startDate: { gte: now } },
        },
        include: {
          event: {
            select: {
              id: true,
              clubName: true,
              startDate: true,
              venue: { select: { city: true, state: true } },
            },
          },
        },
        orderBy: { event: { startDate: 'asc' } },
      })

      return NextResponse.json({
        attendance: attendance.map((a) => ({
          id: a.id,
          eventId: a.eventId,
          eventName: a.event.clubName,
          eventDate: a.event.startDate,
          eventLocation: [a.event.venue?.city, a.event.venue?.state]
            .filter(Boolean)
            .join(', '),
          maxDogs: a.maxDogs,
          notes: a.notes,
        })),
      })
    } catch (error) {
      console.error('Handler attendance fetch error:', error)
      return NextResponse.json({ attendance: [] })
    }
  }

  // Authenticated view: return current user's attendance (upcoming + past)
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const [upcoming, past] = await Promise.all([
      prisma.handlerShowAttendance.findMany({
        where: {
          handlerId: session.user.id,
          event: { startDate: { gte: now } },
        },
        include: {
          event: {
            select: {
              id: true,
              clubName: true,
              startDate: true,
              venue: { select: { city: true, state: true } },
              _count: {
                select: { handlerAttendance: true },
              },
            },
          },
        },
        orderBy: { event: { startDate: 'asc' } },
      }),
      prisma.handlerShowAttendance.findMany({
        where: {
          handlerId: session.user.id,
          event: { startDate: { lt: now } },
        },
        include: {
          event: {
            select: {
              id: true,
              clubName: true,
              startDate: true,
              venue: { select: { city: true, state: true } },
            },
          },
        },
        orderBy: { event: { startDate: 'desc' } },
        take: 20,
      }),
    ])

    const mapAttendance = (
      a: (typeof upcoming)[number] | (typeof past)[number]
    ) => ({
      id: a.id,
      eventId: a.eventId,
      eventName: a.event.clubName,
      eventDate: a.event.startDate,
      eventLocation: [a.event.venue?.city, a.event.venue?.state]
        .filter(Boolean)
        .join(', '),
      maxDogs: a.maxDogs,
      notes: a.notes,
      attendeeCount:
        '_count' in a.event
          ? (
              a.event as typeof a.event & {
                _count: { handlerAttendance: number }
              }
            )._count.handlerAttendance
          : undefined,
    })

    return NextResponse.json({
      upcoming: upcoming.map(mapAttendance),
      past: past.map(mapAttendance),
      stats: {
        totalUpcoming: upcoming.length,
        totalPastThisYear: past.length,
      },
    })
  } catch (error) {
    console.error('Handler attendance fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendance' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/handler-attendance
 * Declare attendance at a show.
 * Body: { eventId, maxDogs?, notes? }
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { eventId, maxDogs, notes } = body

    if (!eventId || typeof eventId !== 'string') {
      return NextResponse.json(
        { error: 'eventId is required' },
        { status: 400 }
      )
    }

    // Verify event exists and is in the future
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { startDate: true },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    if (event.startDate < new Date()) {
      return NextResponse.json(
        { error: 'Cannot declare attendance for past events' },
        { status: 400 }
      )
    }

    const attendance = await prisma.handlerShowAttendance.create({
      data: {
        handlerId: session.user.id,
        eventId,
        maxDogs: maxDogs != null ? parseInt(maxDogs, 10) : null,
        notes: notes?.trim() || null,
      },
      include: {
        event: {
          select: {
            id: true,
            clubName: true,
            startDate: true,
            venue: { select: { city: true, state: true } },
          },
        },
      },
    })

    return NextResponse.json({
      attendance: {
        id: attendance.id,
        eventId: attendance.eventId,
        eventName: attendance.event.clubName,
        eventDate: attendance.event.startDate,
        eventLocation: [
          attendance.event.venue?.city,
          attendance.event.venue?.state,
        ]
          .filter(Boolean)
          .join(', '),
        maxDogs: attendance.maxDogs,
        notes: attendance.notes,
      },
    })
  } catch (error: any) {
    // Handle unique constraint violation
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'You have already declared attendance for this show' },
        { status: 409 }
      )
    }
    console.error('Handler attendance create error:', error)
    return NextResponse.json(
      { error: 'Failed to declare attendance' },
      { status: 500 }
    )
  }
}
