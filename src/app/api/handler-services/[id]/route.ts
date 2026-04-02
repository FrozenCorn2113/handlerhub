import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const updateServiceSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).nullable().optional(),
  price: z.number().int().min(1).optional(),
  pricePer: z.enum(['show', 'day', 'session', 'flat fee']).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
})

async function verifyOwnership(serviceId: string, userId: string) {
  const service = await prisma.handlerService.findUnique({
    where: { id: serviceId },
    select: { handlerId: true },
  })
  return service?.handlerId === userId
}

// PATCH /api/handler-services/[id] - Update a service
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (user.role !== 'HANDLER') {
      return new NextResponse('Only handlers can update services', {
        status: 403,
      })
    }

    const isOwner = await verifyOwnership(params.id, user.id)
    if (!isOwner) {
      return new NextResponse('Not found', { status: 404 })
    }

    const json = await req.json()
    const body = updateServiceSchema.parse(json)

    const updateData: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(body)) {
      if (value !== undefined) {
        updateData[key] = value
      }
    }

    const service = await prisma.handlerService.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json(service)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
    console.error('PATCH handler-services error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// DELETE /api/handler-services/[id] - Delete a service
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (user.role !== 'HANDLER') {
      return new NextResponse('Only handlers can delete services', {
        status: 403,
      })
    }

    const isOwner = await verifyOwnership(params.id, user.id)
    if (!isOwner) {
      return new NextResponse('Not found', { status: 404 })
    }

    await prisma.handlerService.delete({
      where: { id: params.id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('DELETE handler-services error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
