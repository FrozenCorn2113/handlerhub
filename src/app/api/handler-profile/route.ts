import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

const handlerProfileSchema = z.object({
  // Basic info
  fullName: z.string().optional(),
  businessName: z.string().optional(),
  bio: z.string().optional(),
  yearsExperience: z.number().int().min(0).nullable().optional(),

  // Contact & Location
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  city: z.string().min(1),
  state: z.string().length(2),
  country: z.string().default('USA'),

  // Specializations
  breeds: z.array(z.string()).default([]),
  regions: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
  travelWillingness: z.array(z.string()).default([]),

  // Pricing & Availability
  ratePerShow: z.number().min(0).nullable().optional(),
  ratePerDay: z.number().min(0).nullable().optional(),
  feeRangeMin: z.number().min(0).nullable().optional(),
  feeRangeMax: z.number().min(0).nullable().optional(),
  priceRange: z.string().optional(),
  availability: z.string().optional(),
  availabilityScheduleLink: z.string().optional(),
  isAvailable: z.boolean().default(true),
  preferredContactMethod: z.string().optional(),

  // Portfolio & Proof
  showHighlights: z.string().optional(),
  pastClients: z.string().optional(),
  handlerResume: z.string().optional(),

  // Trust & Verification
  isInsured: z.boolean().default(false),
  isBonded: z.boolean().default(false),
  referencesAvailable: z.boolean().default(false),
  kennelClubMemberships: z.array(z.string()).default([]),

  // Media
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
  galleryImages: z.array(z.string()).default([]),

  // Fee schedule & registries
  feeSchedule: z.any().optional(),
  registries: z.array(z.string()).default([]),

  // Terms
  agreedToTerms: z.boolean().default(false),
})

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (user.role !== 'HANDLER') {
      return new NextResponse('Only handlers can create profiles', {
        status: 403,
      })
    }

    const json = await req.json()
    const body = handlerProfileSchema.parse(json)

    // Add termsAgreedAt timestamp if terms are being agreed to
    const updateData = {
      ...body,
      ...(body.agreedToTerms && { termsAgreedAt: new Date() }),
    }

    // Upsert handler profile
    const profile = await prisma.handlerProfile.upsert({
      where: {
        userId: user.id,
      },
      update: updateData,
      create: {
        userId: user.id,
        ...updateData,
      },
    })

    return NextResponse.json(profile)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
