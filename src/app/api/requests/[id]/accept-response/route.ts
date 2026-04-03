import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const acceptSchema = z.object({
  responseId: z.string().min(1, 'Response ID is required'),
})

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = acceptSchema.parse(json)

    // 1. Validate the service request exists and user is the poster
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
    })

    if (!serviceRequest) {
      return new NextResponse('Request not found', { status: 404 })
    }

    if (serviceRequest.userId !== user.id) {
      return new NextResponse('Only the request poster can accept responses', {
        status: 403,
      })
    }

    if (serviceRequest.status !== 'OPEN') {
      return new NextResponse('This request is no longer open', {
        status: 400,
      })
    }

    // 2. Get the RequestResponse and its associated conversation
    const requestResponse = await prisma.requestResponse.findUnique({
      where: { id: body.responseId },
      include: {
        handler: {
          select: {
            id: true,
            name: true,
          },
        },
        conversation: true,
      },
    })

    if (!requestResponse) {
      return new NextResponse('Response not found', { status: 404 })
    }

    if (requestResponse.requestId !== params.id) {
      return new NextResponse('Response does not belong to this request', {
        status: 400,
      })
    }

    // 3. Create a BookingRequest linking the exhibitor and handler
    const bookingRequest = await prisma.bookingRequest.create({
      data: {
        exhibitorId: serviceRequest.userId,
        handlerId: requestResponse.handlerId,
        showName: serviceRequest.showName || 'TBD',
        showLocation: serviceRequest.showLocation || 'TBD',
        showDate: serviceRequest.showDate || new Date(),
        dogBreed: serviceRequest.breed || 'Not specified',
        message: serviceRequest.description,
        status: 'PENDING',
      },
    })

    // 4. Link the existing conversation to the new BookingRequest
    if (requestResponse.conversation) {
      await prisma.conversation.update({
        where: { id: requestResponse.conversation.id },
        data: { bookingRequestId: bookingRequest.id },
      })
    }

    // 5. Update ServiceRequest status to FILLED
    await prisma.serviceRequest.update({
      where: { id: params.id },
      data: { status: 'FILLED' },
    })

    // 6. Return the new booking ID
    return NextResponse.json({ bookingId: bookingRequest.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Accept response error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
