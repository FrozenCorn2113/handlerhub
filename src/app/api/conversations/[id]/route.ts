import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: params.id },
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
          orderBy: {
            sentAt: 'asc',
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 })
    }

    // Check if user is a participant
    if (!conversation.participantIds.includes(user.id)) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('Fetch conversation error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
