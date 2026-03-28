import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { onBookingCompleted, onHandlerResponded } from '@/lib/handler-metrics'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const updateBookingSchema = z.object({
  status: z
    .enum(['PENDING', 'ACCEPTED', 'DECLINED', 'COMPLETED', 'CANCELLED'])
    .optional(),
  handlerNotes: z.string().optional(),
})

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const bookingId = params.id
    const json = await req.json()
    const body = updateBookingSchema.parse(json)

    // Get existing booking
    const existingBooking = await prisma.bookingRequest.findUnique({
      where: { id: bookingId },
    })

    if (!existingBooking) {
      return new NextResponse('Booking not found', { status: 404 })
    }

    // Authorization check
    const isHandler = user.id === existingBooking.handlerId
    const isExhibitor = user.id === existingBooking.exhibitorId

    if (!isHandler && !isExhibitor) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // Handlers can update status and notes
    // Exhibitors can only mark as COMPLETED or CANCELLED
    if (
      body.status &&
      !isHandler &&
      body.status !== 'COMPLETED' &&
      body.status !== 'CANCELLED'
    ) {
      return new NextResponse(
        'Exhibitors can only mark bookings as completed or cancelled',
        {
          status: 403,
        }
      )
    }

    const updateData: any = {}

    if (body.status) {
      updateData.status = body.status
    }

    if (body.handlerNotes !== undefined && isHandler) {
      updateData.handlerNotes = body.handlerNotes
    }

    // Track when handler responds
    if (
      isHandler &&
      (body.status === 'ACCEPTED' ||
        body.status === 'DECLINED' ||
        body.handlerNotes) &&
      !existingBooking.handlerResponded
    ) {
      // Handler is responding for the first time
      await onHandlerResponded(bookingId)
    }

    // Update the booking
    const updatedBooking = await prisma.bookingRequest.update({
      where: { id: bookingId },
      data: updateData,
    })

    // If status changed to COMPLETED, trigger metric update
    if (body.status === 'COMPLETED' && existingBooking.status !== 'COMPLETED') {
      await onBookingCompleted(bookingId)
    }

    return NextResponse.json(updatedBooking)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Update booking error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const bookingId = params.id

    const booking = await prisma.bookingRequest.findUnique({
      where: { id: bookingId },
      include: {
        handler: {
          include: {
            handlerProfile: true,
          },
        },
        exhibitor: true,
      },
    })

    if (!booking) {
      return new NextResponse('Booking not found', { status: 404 })
    }

    // Authorization check
    const isHandler = user.id === booking.handlerId
    const isExhibitor = user.id === booking.exhibitorId

    if (!isHandler && !isExhibitor) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Fetch booking error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
