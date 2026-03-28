import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const createRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  breed: z.string().optional(),
  akcGroup: z.string().optional(),
  showName: z.string().optional(),
  showDate: z.coerce.date().optional(),
  showLocation: z.string().optional(),
  serviceType: z.string().min(1, 'Service type is required'),
  region: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const serviceType = searchParams.get('serviceType')
    const region = searchParams.get('region')
    const akcGroup = searchParams.get('akcGroup')
    const breed = searchParams.get('breed')

    const where: Record<string, unknown> = { status: 'OPEN' }

    if (serviceType) where.serviceType = serviceType
    if (region) where.region = region
    if (akcGroup) where.akcGroup = akcGroup
    if (breed) where.breed = { contains: breed, mode: 'insensitive' }

    const requests = await prisma.serviceRequest.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            responses: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Fetch service requests error:', error)
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
    const body = createRequestSchema.parse(json)

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        title: body.title,
        description: body.description,
        breed: body.breed || null,
        akcGroup: body.akcGroup || null,
        showName: body.showName || null,
        showDate: body.showDate || null,
        showLocation: body.showLocation || null,
        serviceType: body.serviceType,
        region: body.region || null,
        status: 'OPEN',
        userId: user.id,
      },
    })

    return NextResponse.json(serviceRequest)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Create service request error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
