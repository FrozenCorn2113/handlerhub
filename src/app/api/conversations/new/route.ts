import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { sendNewMessageNotification } from '@/lib/send-notification-email'
import { getCurrentUser } from '@/lib/session'
import { absoluteUrl } from '@/lib/utils'

import { z } from 'zod'

const newConversationSchema = z.object({
  recipientId: z.string(),
  message: z.string().min(1, 'Message cannot be empty'),
})

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = newConversationSchema.parse(json)

    if (body.recipientId === user.id) {
      return new NextResponse('Cannot message yourself', { status: 400 })
    }

    // Verify recipient exists
    const recipient = await prisma.user.findUnique({
      where: { id: body.recipientId },
      select: { id: true, name: true, email: true },
    })

    if (!recipient) {
      return new NextResponse('Recipient not found', { status: 404 })
    }

    // Check if a conversation already exists between these two users
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participantIds: { has: user.id } },
          { participantIds: { has: body.recipientId } },
        ],
        // Only match direct conversations (no booking request)
        bookingRequestId: null,
      },
    })

    if (existingConversation) {
      // Add message to existing conversation
      const message = await prisma.message.create({
        data: {
          conversationId: existingConversation.id,
          senderId: user.id,
          content: body.message,
        },
      })

      await prisma.conversation.update({
        where: { id: existingConversation.id },
        data: { lastMessageAt: new Date() },
      })

      // Send email notification
      try {
        if (recipient.email) {
          sendNewMessageNotification({
            recipientEmail: recipient.email,
            senderName: user.name || 'Someone',
            messagePreview: body.message,
            conversationUrl: absoluteUrl('/dashboard/messages'),
          })
        }
      } catch (emailError) {
        console.error('Email notification error (non-blocking):', emailError)
      }

      return NextResponse.json({
        conversationId: existingConversation.id,
        message,
        isNew: false,
      })
    }

    // Create new conversation with the first message
    const conversation = await prisma.conversation.create({
      data: {
        participantIds: [user.id, body.recipientId],
        participants: {
          connect: [{ id: user.id }, { id: body.recipientId }],
        },
        lastMessageAt: new Date(),
        messages: {
          create: {
            senderId: user.id,
            content: body.message,
          },
        },
      },
    })

    // Send email notification
    try {
      if (recipient.email) {
        sendNewMessageNotification({
          recipientEmail: recipient.email,
          senderName: user.name || 'Someone',
          messagePreview: body.message,
          conversationUrl: absoluteUrl('/dashboard/messages'),
        })
      }
    } catch (emailError) {
      console.error('Email notification error (non-blocking):', emailError)
    }

    return NextResponse.json({
      conversationId: conversation.id,
      isNew: true,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Create new conversation error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
