import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { geocodeCityState } from '@/lib/geocode'
import { calculateProfileCompleteness } from '@/lib/profile-completeness'
import { getCurrentUser } from '@/lib/session'

import { z } from 'zod'

// Fully-partial schema for PATCH (onboarding wizard saves one step at a time)
const partialProfileSchema = z.object({
  fullName: z.string().optional(),
  businessName: z.string().optional(),
  bio: z.string().optional(),
  yearsExperience: z.number().int().min(0).nullable().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  breeds: z.array(z.string()).optional(),
  regions: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  travelWillingness: z.array(z.string()).optional(),
  ratePerShow: z.number().min(0).nullable().optional(),
  ratePerDay: z.number().min(0).nullable().optional(),
  feeRangeMin: z.number().min(0).nullable().optional(),
  feeRangeMax: z.number().min(0).nullable().optional(),
  priceRange: z.string().optional(),
  availability: z.string().optional(),
  availabilityScheduleLink: z.string().optional(),
  isAvailable: z.boolean().optional(),
  preferredContactMethod: z.string().optional(),
  showHighlights: z.string().optional(),
  pastClients: z.string().optional(),
  handlerResume: z.string().optional(),
  isInsured: z.boolean().optional(),
  isBonded: z.boolean().optional(),
  referencesAvailable: z.boolean().optional(),
  kennelClubMemberships: z.array(z.string()).optional(),
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  feeSchedule: z.any().optional(),
  registries: z.array(z.string()).optional(),
  agreedToTerms: z.boolean().optional(),
})

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

    // Geocode city/state to lat/lng for map display
    let geoCoords: { latitude: number; longitude: number } | undefined
    if (body.city && body.state) {
      const coords = await geocodeCityState(body.city, body.state, body.country)
      if (coords) {
        geoCoords = { latitude: coords.lat, longitude: coords.lng }
      }
    }

    // Add termsAgreedAt timestamp if terms are being agreed to
    const updateData = {
      ...body,
      ...geoCoords,
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

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (user.role !== 'HANDLER') {
      return new NextResponse('Only handlers can update profiles', {
        status: 403,
      })
    }

    const json = await req.json()
    const body = partialProfileSchema.parse(json)

    // Filter out undefined values so we only update provided fields
    const updateData: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(body)) {
      if (value !== undefined) {
        updateData[key] = value
      }
    }

    if (body.agreedToTerms) {
      updateData.termsAgreedAt = new Date()
    }

    // Geocode if city or state is being updated
    if (body.city !== undefined || body.state !== undefined) {
      // We need both city and state - fetch current profile if one is missing
      const cityToGeocode = body.city
      const stateToGeocode = body.state
      if (cityToGeocode && stateToGeocode) {
        const coords = await geocodeCityState(cityToGeocode, stateToGeocode)
        if (coords) {
          updateData.latitude = coords.lat
          updateData.longitude = coords.lng
        }
      } else if (cityToGeocode !== undefined || stateToGeocode !== undefined) {
        // One of city/state is changing — load current values for the missing field
        const current = await prisma.handlerProfile.findUnique({
          where: { userId: user.id },
          select: { city: true, state: true },
        })
        const city = cityToGeocode ?? current?.city
        const state = stateToGeocode ?? current?.state
        if (city && state) {
          const coords = await geocodeCityState(city, state)
          if (coords) {
            updateData.latitude = coords.lat
            updateData.longitude = coords.lng
          }
        }
      }
    }

    // Upsert: create if not exists, update if it does
    const profile = await prisma.handlerProfile.upsert({
      where: { userId: user.id },
      update: updateData,
      create: {
        userId: user.id,
        ...updateData,
      },
    })

    // Recalculate profile completeness
    const completeness = calculateProfileCompleteness(profile)
    const updatedProfile = await prisma.handlerProfile.update({
      where: { id: profile.id },
      data: { profileCompleteness: completeness },
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('PATCH handler-profile error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
