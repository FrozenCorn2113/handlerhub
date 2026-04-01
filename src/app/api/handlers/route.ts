import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = 20
  const skip = (page - 1) * limit

  // Filter params
  const search = searchParams.get('search')?.trim() || null
  const state = searchParams.get('state')?.trim() || null
  const city = searchParams.get('city')?.trim() || null
  const breed = searchParams.get('breed')?.trim() || null
  const minPrice = searchParams.get('minPrice')
    ? parseFloat(searchParams.get('minPrice')!)
    : null
  const maxPrice = searchParams.get('maxPrice')
    ? parseFloat(searchParams.get('maxPrice')!)
    : null
  const experience = searchParams.get('experience')?.trim() || null
  const serviceType = searchParams.get('serviceType')?.trim() || null
  const eventId = searchParams.get('eventId')?.trim() || null
  const sort = searchParams.get('sort') || 'newest'

  // Build where clause
  const where: any = {
    user: { role: 'HANDLER' },
    isAvailable: true,
  }

  if (state) {
    where.state = { equals: state, mode: 'insensitive' }
  }

  if (city) {
    where.city = { contains: city, mode: 'insensitive' }
  }

  if (breed) {
    where.breeds = { has: breed }
  }

  if (minPrice !== null || maxPrice !== null) {
    where.ratePerShow = {}
    if (minPrice !== null) where.ratePerShow.gte = minPrice
    if (maxPrice !== null) where.ratePerShow.lte = maxPrice
  }

  if (experience) {
    where.experienceLevel = experience
  }

  if (serviceType) {
    where.serviceTypes = { has: serviceType }
  }

  if (eventId) {
    where.user = {
      ...where.user,
      showAttendance: { some: { eventId } },
    }
  }

  // Full-text search on name, bio, breeds
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { bio: { contains: search, mode: 'insensitive' } },
      { businessName: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
      { state: { contains: search, mode: 'insensitive' } },
    ]
  }

  // Sort
  let orderBy: any = { createdAt: 'desc' }
  if (sort === 'rating') orderBy = { averageRating: 'desc' }
  else if (sort === 'experience') orderBy = { yearsExperience: 'desc' }
  else if (sort === 'price_low') orderBy = { ratePerShow: 'asc' }
  else if (sort === 'price_high') orderBy = { ratePerShow: 'desc' }

  try {
    const [handlers, total] = await Promise.all([
      prisma.handlerProfile.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.handlerProfile.count({ where }),
    ])

    const results = handlers.map((h) => ({
      id: h.user.id,
      name: h.fullName || h.user.name || 'Professional Handler',
      profileImage: h.profileImage || h.user.image || null,
      coverImage: h.coverImage || null,
      serviceType: h.services?.[0] || 'Handling',
      serviceTypes: h.serviceTypes || [],
      breeds: h.breeds || [],
      regions: h.regions || [],
      city: h.city || null,
      state: h.state || null,
      rating: h.averageRating || null,
      reviewCount: h.totalCompletedBookings || 0,
      ratePerShow: h.ratePerShow || null,
      yearsExperience: h.yearsExperience || null,
      experienceLevel: h.experienceLevel,
      isInsured: h.isInsured,
      isBonded: h.isBonded,
      registries: h.registries || [],
      tagline: h.showHighlights
        ? h.showHighlights.slice(0, 80) +
          (h.showHighlights.length > 80 ? '...' : '')
        : null,
      bio: h.bio
        ? h.bio.slice(0, 150) + (h.bio.length > 150 ? '...' : '')
        : null,
    }))

    return NextResponse.json({
      handlers: results,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Handler search error:', error)
    return NextResponse.json(
      { error: 'Failed to search handlers' },
      { status: 500 }
    )
  }
}
