import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const createConversationSchema = z.object({
  bookingRequestId: z.string(),
})

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get all conversations where user is a participant
    const conversations = await prisma.conversation.findMany({
      where: {
        participantIds: {
          has: user.id,
        },
      },
      include: {
        bookingRequest: {
          include: {
            handler: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            exhibitor: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: {
            sentAt: 'desc',
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    })

    return NextResponse.json(conversations)
  } catch (error) {
    console.error('Fetch conversations error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = createConversationSchema.parse(json)

    // Check if booking exists
    const booking = await prisma.bookingRequest.findUnique({
      where: { id: body.bookingRequestId },
    })

    if (!booking) {
      return new NextResponse('Booking not found', { status: 404 })
    }

    // Check if user is part of this booking
    if (booking.exhibitorId !== user.id && booking.handlerId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // Check if conversation already exists
    const existingConversation = await prisma.conversation.findUnique({
      where: { bookingRequestId: body.bookingRequestId },
      include: {
        messages: {
          orderBy: {
            sentAt: 'asc',
          },
        },
      },
    })

    if (existingConversation) {
      return NextResponse.json(existingConversation)
    }

    // Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        bookingRequestId: body.bookingRequestId,
        participantIds: [booking.exhibitorId, booking.handlerId],
      },
      include: {
        messages: true,
      },
    })

    return NextResponse.json(conversation)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Create conversation error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
