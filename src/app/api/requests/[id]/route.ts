import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const updateRequestSchema = z.object({
  status: z.enum(['OPEN', 'FILLED', 'EXPIRED', 'FLAGGED']),
})

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        responses: {
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
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!serviceRequest) {
      return new NextResponse('Request not found', { status: 404 })
    }

    return NextResponse.json(serviceRequest)
  } catch (error) {
    console.error('Fetch service request error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = updateRequestSchema.parse(json)

    const existingRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
    })

    if (!existingRequest) {
      return new NextResponse('Request not found', { status: 404 })
    }

    // Only the poster or an admin can update the status
    const isPoster = user.id === existingRequest.userId
    const isAdmin = user.role === 'ADMIN'

    if (!isPoster && !isAdmin) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: params.id },
      data: { status: body.status },
    })

    return NextResponse.json(updatedRequest)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Update service request error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
