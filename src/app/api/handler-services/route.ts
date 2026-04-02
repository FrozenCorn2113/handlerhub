import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(100),
  description: z.string().max(500).optional(),
  price: z.number().int().min(1, 'Price must be at least $0.01'),
  pricePer: z.enum(['show', 'day', 'session', 'flat fee']),
  isActive: z.boolean().optional().default(true),
})

// GET /api/handler-services - List current handler's services
export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (user.role !== 'HANDLER') {
      return new NextResponse('Only handlers can access services', {
        status: 403,
      })
    }

    const services = await prisma.handlerService.findMany({
      where: { handlerId: user.id },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json({ services })
  } catch (error) {
    console.error('GET handler-services error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/handler-services - Create a new service
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (user.role !== 'HANDLER') {
      return new NextResponse('Only handlers can create services', {
        status: 403,
      })
    }

    // Enforce max 10 services
    const existingCount = await prisma.handlerService.count({
      where: { handlerId: user.id },
    })
    if (existingCount >= 10) {
      return new NextResponse('Maximum 10 services allowed', { status: 400 })
    }

    const json = await req.json()
    const body = createServiceSchema.parse(json)

    // Get next sort order
    const maxSort = await prisma.handlerService.findFirst({
      where: { handlerId: user.id },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    })

    const service = await prisma.handlerService.create({
      data: {
        handlerId: user.id,
        name: body.name,
        description: body.description ?? null,
        price: body.price,
        pricePer: body.pricePer,
        isActive: body.isActive,
        sortOrder: (maxSort?.sortOrder ?? -1) + 1,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
    console.error('POST handler-services error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
