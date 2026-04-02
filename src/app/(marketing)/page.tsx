import { prisma } from '@/lib/db'

import type { HandlerCardData } from '@/components/handlers/handler-card'

import LandingHome from '@/app/(marketing)/_components/landing-home'

async function getFeaturedHandlers(): Promise<HandlerCardData[]> {
  try {
    const handlers = await prisma.handlerProfile.findMany({
      where: {
        user: { role: 'HANDLER' },
        isAvailable: true,
      },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })

    return handlers.map((h) => ({
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
  } catch (error) {
    console.error('Failed to fetch featured handlers:', error)
    return []
  }
}

export default async function IndexPage() {
  const featuredHandlers = await getFeaturedHandlers()

  return <LandingHome featuredHandlers={featuredHandlers} />
}
