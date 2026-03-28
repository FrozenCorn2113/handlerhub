import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { updateHandlerMetrics } from '@/lib/handler-metrics'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const createReviewSchema = z.object({
  bookingRequestId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
})

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (user.role !== 'EXHIBITOR') {
      return new NextResponse('Only exhibitors can create reviews', {
        status: 403,
      })
    }

    const json = await req.json()
    const body = createReviewSchema.parse(json)

    // Verify booking exists and is completed
    const booking = await prisma.bookingRequest.findUnique({
      where: { id: body.bookingRequestId },
      include: {
        review: true,
      },
    })

    if (!booking) {
      return new NextResponse('Booking not found', { status: 404 })
    }

    // Check authorization - only exhibitor who made the booking can review
    if (booking.exhibitorId !== user.id) {
      return new NextResponse('You can only review your own bookings', {
        status: 403,
      })
    }

    // Check booking is completed
    if (booking.status !== 'COMPLETED') {
      return new NextResponse('You can only review completed bookings', {
        status: 400,
      })
    }

    // Check if review already exists
    if (booking.review) {
      return new NextResponse('You have already reviewed this booking', {
        status: 400,
      })
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        bookingRequestId: body.bookingRequestId,
        exhibitorId: user.id,
        handlerId: booking.handlerId,
        rating: body.rating,
        comment: body.comment,
      },
      include: {
        exhibitor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        handler: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Update handler's average rating and metrics
    await updateHandlerMetrics(booking.handlerId)

    return NextResponse.json(review)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Create review error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const handlerId = searchParams.get('handlerId')

    if (!handlerId) {
      return new NextResponse('Handler ID is required', { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: {
        handlerId,
      },
      include: {
        exhibitor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        bookingRequest: {
          select: {
            showName: true,
            showDate: true,
            dogBreed: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Fetch reviews error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
