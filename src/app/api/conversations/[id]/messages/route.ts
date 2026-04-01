import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { sendNewMessageNotification } from '@/lib/send-notification-email'
import { getCurrentUser } from '@/lib/session'
import { absoluteUrl } from '@/lib/utils'

import { z } from 'zod'

const sendMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
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
    const body = sendMessageSchema.parse(json)

    // Check if conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: params.id },
    })

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 })
    }

    // Check if user is a participant
    if (!conversation.participantIds.includes(user.id)) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        conversationId: params.id,
        senderId: user.id,
        content: body.content,
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
    })

    // Update conversation's lastMessageAt
    await prisma.conversation.update({
      where: { id: params.id },
      data: {
        lastMessageAt: new Date(),
      },
    })

    // TODO: Trigger Pusher event here for real-time delivery
    // await pusher.trigger(`conversation-${params.id}`, 'new-message', message)

    // Send email notification to the other participant(s)
    try {
      const otherParticipantIds = conversation.participantIds.filter(
        (id) => id !== user.id
      )
      if (otherParticipantIds.length > 0) {
        const recipients = await prisma.user.findMany({
          where: { id: { in: otherParticipantIds } },
          select: { email: true },
        })

        const senderName = message.sender?.name || 'Someone'
        const conversationUrl = absoluteUrl('/dashboard/messages')

        for (const recipient of recipients) {
          if (recipient.email) {
            // Fire-and-forget: don't block the response
            sendNewMessageNotification({
              recipientEmail: recipient.email,
              senderName,
              messagePreview: body.content,
              conversationUrl,
            })
          }
        }
      }
    } catch (emailError) {
      console.error('Email notification error (non-blocking):', emailError)
    }

    return NextResponse.json(message)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Send message error:', error)
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

    // Check if conversation exists and user is a participant
    const conversation = await prisma.conversation.findUnique({
      where: { id: params.id },
    })

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 })
    }

    if (!conversation.participantIds.includes(user.id)) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // Mark unread messages from others as read
    await prisma.message.updateMany({
      where: {
        conversationId: params.id,
        senderId: { not: user.id },
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    })

    // Get messages
    const messages = await prisma.message.findMany({
      where: {
        conversationId: params.id,
      },
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
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Fetch messages error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
