import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const dogProfileSchema = z.object({
  name: z.string().min(1, 'Dog name is required'),
  breed: z.string().min(1, 'Breed is required'),
  sex: z.enum(['Male', 'Female']),
  age: z.number().int().min(0, 'Age must be a positive number'),
  registeredName: z.string().optional(),
  titles: z.string().optional(),
  achievements: z.string().optional(),
  showExperience: z.enum([
    'FIRST_TIMER',
    'BEGINNER',
    'INTERMEDIATE',
    'VETERAN',
  ]),
  temperament: z.string().optional(),
  specialNeeds: z.string().optional(),
  preferredHandlerTraits: z.string().optional(),
  upcomingShows: z.string().optional(),
  photos: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
})

// GET - Fetch all dog profiles for the current user
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const dogProfiles = await prisma.dogProfile.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(dogProfiles)
  } catch (error) {
    console.error('Error fetching dog profiles:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST - Create a new dog profile
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = dogProfileSchema.parse(json)

    const dogProfile = await prisma.dogProfile.create({
      data: {
        userId: user.id,
        ...body,
      },
    })

    return NextResponse.json(dogProfile)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Error creating dog profile:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
