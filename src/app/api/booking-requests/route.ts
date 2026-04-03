import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const bookingRequestSchema = z.object({
  handlerId: z.string(),
  showName: z.string().min(1),
  showLocation: z.string().min(1),
  showDate: z.coerce.date(),
  dogName: z.string().min(1),
  dogBreed: z.string().min(1),
  message: z.string().optional(),
  dogProfileId: z.string().nullable().optional(),
  classEntries: z.array(z.string()).optional(),
  travelRequirements: z.string().optional(),
  priorHandlerExperience: z.string().optional(),
  eventId: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (user.role !== 'EXHIBITOR') {
      return new NextResponse('Only exhibitors can create booking requests', {
        status: 403,
      })
    }

    const json = await req.json()
    const body = bookingRequestSchema.parse(json)

    // Verify handler exists
    const handler = await prisma.user.findUnique({
      where: {
        id: body.handlerId,
        role: 'HANDLER',
      },
    })

    if (!handler) {
      return new NextResponse('Handler not found', { status: 404 })
    }

    // Create booking request
    const bookingRequest = await prisma.bookingRequest.create({
      data: {
        exhibitorId: user.id,
        handlerId: body.handlerId,
        showName: body.showName,
        showLocation: body.showLocation,
        showDate: body.showDate,
        dogName: body.dogName,
        dogBreed: body.dogBreed,
        message: body.message || '',
        status: 'PENDING',
        dogProfileId: body.dogProfileId || undefined,
        classEntries: body.classEntries || [],
        travelRequirements: body.travelRequirements || undefined,
        priorHandlerExperience: body.priorHandlerExperience || undefined,
        eventId: body.eventId || undefined,
      },
    })

    return NextResponse.json(bookingRequest)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Booking request error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const where: any = {}

    if (user.role === 'HANDLER') {
      where.handlerId = user.id
    } else if (user.role === 'EXHIBITOR') {
      where.exhibitorId = user.id
    } else {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const bookingRequests = await prisma.bookingRequest.findMany({
      where,
      include: {
        handler: {
          include: {
            handlerProfile: true,
          },
        },
        exhibitor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(bookingRequests)
  } catch (error) {
    console.error('Fetch booking requests error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
