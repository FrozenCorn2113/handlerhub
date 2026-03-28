import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { sendRequestResponseNotification } from '@/lib/send-notification-email'
import { getCurrentUser } from '@/lib/session'
import { absoluteUrl } from '@/lib/utils'

import { z } from 'zod'

const respondSchema = z.object({
  message: z.string().min(1, 'Message is required'),
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

    if (user.role !== 'HANDLER') {
      return new NextResponse('Only handlers can respond to requests', {
        status: 403,
      })
    }

    const json = await req.json()
    const body = respondSchema.parse(json)

    // Check if request exists and is open
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
    })

    if (!serviceRequest) {
      return new NextResponse('Request not found', { status: 404 })
    }

    if (serviceRequest.status !== 'OPEN') {
      return new NextResponse('This request is no longer open', {
        status: 400,
      })
    }

    // Check if handler already responded
    const existingResponse = await prisma.requestResponse.findFirst({
      where: {
        requestId: params.id,
        handlerId: user.id,
      },
    })

    if (existingResponse) {
      return new NextResponse('You have already responded to this request', {
        status: 409,
      })
    }

    // Create conversation between handler and request poster
    const conversation = await prisma.conversation.create({
      data: {
        participantIds: [serviceRequest.userId, user.id],
        lastMessageAt: new Date(),
        participants: {
          connect: [{ id: serviceRequest.userId }, { id: user.id }],
        },
      },
    })

    // Send the initial message in the conversation
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: user.id,
        content: body.message,
      },
    })

    // Create the response record linked to the conversation
    const response = await prisma.requestResponse.create({
      data: {
        requestId: params.id,
        handlerId: user.id,
        message: body.message,
        conversationId: conversation.id,
      },
      include: {
        handler: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        conversation: {
          select: {
            id: true,
          },
        },
      },
    })

    // Send email notification to the request poster
    try {
      const requestPoster = await prisma.user.findUnique({
        where: { id: serviceRequest.userId },
        select: { email: true },
      })

      if (requestPoster?.email) {
        const handlerName = response.handler?.name || 'A handler'
        const requestUrl = absoluteUrl(`/requests/${params.id}`)

        // Fire-and-forget
        sendRequestResponseNotification({
          recipientEmail: requestPoster.email,
          handlerName,
          messagePreview: body.message,
          requestTitle: serviceRequest.title,
          requestUrl,
        })
      }
    } catch (emailError) {
      console.error('Email notification error (non-blocking):', emailError)
    }

    return NextResponse.json(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Respond to request error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
