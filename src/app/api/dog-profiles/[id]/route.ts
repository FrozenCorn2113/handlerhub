import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const dogProfileUpdateSchema = z.object({
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

// GET - Fetch a single dog profile
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const dogProfile = await prisma.dogProfile.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!dogProfile) {
      return new NextResponse('Dog profile not found', { status: 404 })
    }

    // Ensure the user owns this dog profile
    if (dogProfile.userId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    return NextResponse.json(dogProfile)
  } catch (error) {
    console.error('Error fetching dog profile:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// PUT - Update a dog profile
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Check if the dog profile exists and belongs to the user
    const existingProfile = await prisma.dogProfile.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingProfile) {
      return new NextResponse('Dog profile not found', { status: 404 })
    }

    if (existingProfile.userId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const json = await req.json()
    const body = dogProfileUpdateSchema.parse(json)

    const updatedProfile = await prisma.dogProfile.update({
      where: {
        id: params.id,
      },
      data: body,
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Error updating dog profile:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// DELETE - Delete a dog profile
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Check if the dog profile exists and belongs to the user
    const existingProfile = await prisma.dogProfile.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingProfile) {
      return new NextResponse('Dog profile not found', { status: 404 })
    }

    if (existingProfile.userId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    await prisma.dogProfile.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting dog profile:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
