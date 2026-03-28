import { prisma } from '@/lib/db'
import { calculateHandlerLevel } from '@/lib/handler-levels'
import { calculateProfileCompleteness } from '@/lib/profile-completeness'

/**
 * Recalculate all metrics for a handler and update their level if needed
 */
export async function updateHandlerMetrics(handlerId: string) {
  // Get handler profile
  const profile = await prisma.handlerProfile.findUnique({
    where: { userId: handlerId },
  })

  if (!profile) {
    return null
  }

  // Calculate total completed bookings
  const totalCompletedBookings = await prisma.bookingRequest.count({
    where: {
      handlerId,
      status: 'COMPLETED',
    },
  })

  // Calculate response rate (% of requests responded to within 24 hours)
  const allRequests = await prisma.bookingRequest.findMany({
    where: { handlerId },
    select: {
      createdAt: true,
      respondedAt: true,
      handlerResponded: true,
    },
  })

  let responseRate: number | null = null
  if (allRequests.length > 0) {
    const respondedWithin24h = allRequests.filter((req) => {
      if (!req.handlerResponded || !req.respondedAt) return false
      const hoursDiff =
        (req.respondedAt.getTime() - req.createdAt.getTime()) / (1000 * 60 * 60)
      return hoursDiff <= 24
    }).length

    responseRate = (respondedWithin24h / allRequests.length) * 100
  }

  // Calculate average rating from reviews
  const reviews = await prisma.review.findMany({
    where: { handlerId },
    select: { rating: true },
  })

  let averageRating: number | null = null
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    averageRating = totalRating / reviews.length
  }

  // Calculate profile completeness
  const profileCompleteness = calculateProfileCompleteness(profile)

  // Determine new handler level
  const newLevel = calculateHandlerLevel({
    totalCompletedBookings,
    averageRating,
    responseRate,
    profileCompleteness,
  })

  const levelChanged = newLevel !== profile.handlerLevel

  // Update handler profile
  const updatedProfile = await prisma.handlerProfile.update({
    where: { userId: handlerId },
    data: {
      totalCompletedBookings,
      averageRating,
      responseRate,
      profileCompleteness,
      handlerLevel: newLevel,
      lastLevelUpAt: levelChanged ? new Date() : profile.lastLevelUpAt,
    },
  })

  return {
    profile: updatedProfile,
    levelChanged,
    oldLevel: profile.handlerLevel,
    newLevel,
  }
}

/**
 * Update metrics when a booking is completed
 */
export async function onBookingCompleted(bookingId: string) {
  const booking = await prisma.bookingRequest.findUnique({
    where: { id: bookingId },
  })

  if (!booking) {
    throw new Error('Booking not found')
  }

  // Update booking with completion timestamp
  await prisma.bookingRequest.update({
    where: { id: bookingId },
    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
    },
  })

  // Recalculate handler metrics
  const result = await updateHandlerMetrics(booking.handlerId)

  return result
}

/**
 * Update metrics when handler responds to a booking request
 */
export async function onHandlerResponded(bookingId: string) {
  const booking = await prisma.bookingRequest.findUnique({
    where: { id: bookingId },
  })

  if (!booking) {
    throw new Error('Booking not found')
  }

  // Update booking response tracking
  await prisma.bookingRequest.update({
    where: { id: bookingId },
    data: {
      handlerResponded: true,
      respondedAt: new Date(),
    },
  })

  // Recalculate handler metrics (response rate changed)
  const result = await updateHandlerMetrics(booking.handlerId)

  return result
}
