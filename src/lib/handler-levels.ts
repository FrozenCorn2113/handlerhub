import { HandlerLevel } from '@prisma/client'

/**
 * Handler Level Criteria (Fiverr-style automated progression)
 *
 * NEW: Default level (0 bookings, any profile state)
 * VERIFIED: 5+ completed bookings, 4.0+ avg rating, 70%+ response rate, 60%+ profile complete
 * PROFESSIONAL: 20+ completed bookings, 4.5+ avg rating, 80%+ response rate, 80%+ profile complete
 * ELITE: 50+ completed bookings, 4.7+ avg rating, 90%+ response rate, 90%+ profile complete
 */

export interface HandlerMetrics {
  totalCompletedBookings: number
  averageRating: number | null
  responseRate: number | null
  profileCompleteness: number | null
}

export interface LevelRequirements {
  minBookings: number
  minRating: number
  minResponseRate: number
  minProfileComplete: number
}

export const LEVEL_REQUIREMENTS: Record<HandlerLevel, LevelRequirements> = {
  NEW: {
    minBookings: 0,
    minRating: 0,
    minResponseRate: 0,
    minProfileComplete: 0,
  },
  VERIFIED: {
    minBookings: 5,
    minRating: 4.0,
    minResponseRate: 70,
    minProfileComplete: 60,
  },
  PROFESSIONAL: {
    minBookings: 20,
    minRating: 4.5,
    minResponseRate: 80,
    minProfileComplete: 80,
  },
  ELITE: {
    minBookings: 50,
    minRating: 4.7,
    minResponseRate: 90,
    minProfileComplete: 90,
  },
}

/**
 * Calculate what handler level a handler qualifies for based on their metrics
 */
export function calculateHandlerLevel(metrics: HandlerMetrics): HandlerLevel {
  const {
    totalCompletedBookings,
    averageRating,
    responseRate,
    profileCompleteness,
  } = metrics

  // Check ELITE first (highest level)
  if (meetsRequirements(metrics, LEVEL_REQUIREMENTS.ELITE)) {
    return 'ELITE'
  }

  // Check PROFESSIONAL
  if (meetsRequirements(metrics, LEVEL_REQUIREMENTS.PROFESSIONAL)) {
    return 'PROFESSIONAL'
  }

  // Check VERIFIED
  if (meetsRequirements(metrics, LEVEL_REQUIREMENTS.VERIFIED)) {
    return 'VERIFIED'
  }

  // Default to NEW
  return 'NEW'
}

/**
 * Check if handler metrics meet the requirements for a specific level
 */
function meetsRequirements(
  metrics: HandlerMetrics,
  requirements: LevelRequirements
): boolean {
  const {
    totalCompletedBookings,
    averageRating,
    responseRate,
    profileCompleteness,
  } = metrics

  // Check bookings
  if (totalCompletedBookings < requirements.minBookings) {
    return false
  }

  // Check rating (if they have one)
  if (requirements.minRating > 0) {
    if (averageRating === null || averageRating < requirements.minRating) {
      return false
    }
  }

  // Check response rate (if they have one)
  if (requirements.minResponseRate > 0) {
    if (responseRate === null || responseRate < requirements.minResponseRate) {
      return false
    }
  }

  // Check profile completeness (if they have one)
  if (requirements.minProfileComplete > 0) {
    if (
      profileCompleteness === null ||
      profileCompleteness < requirements.minProfileComplete
    ) {
      return false
    }
  }

  return true
}

/**
 * Get progress toward next level
 */
export function getLevelProgress(
  currentLevel: HandlerLevel,
  metrics: HandlerMetrics
) {
  const nextLevel = getNextLevel(currentLevel)

  if (!nextLevel) {
    return {
      nextLevel: null,
      progress: {
        bookings: {
          current: metrics.totalCompletedBookings,
          required: 0,
          percentage: 100,
        },
        rating: {
          current: metrics.averageRating ?? 0,
          required: 0,
          percentage: 100,
        },
        responseRate: {
          current: metrics.responseRate ?? 0,
          required: 0,
          percentage: 100,
        },
        profileComplete: {
          current: metrics.profileCompleteness ?? 0,
          required: 0,
          percentage: 100,
        },
      },
    }
  }

  const requirements = LEVEL_REQUIREMENTS[nextLevel]

  return {
    nextLevel,
    progress: {
      bookings: {
        current: metrics.totalCompletedBookings,
        required: requirements.minBookings,
        percentage: Math.min(
          100,
          (metrics.totalCompletedBookings / requirements.minBookings) * 100
        ),
      },
      rating: {
        current: metrics.averageRating ?? 0,
        required: requirements.minRating,
        percentage:
          requirements.minRating > 0
            ? Math.min(
                100,
                ((metrics.averageRating ?? 0) / requirements.minRating) * 100
              )
            : 100,
      },
      responseRate: {
        current: metrics.responseRate ?? 0,
        required: requirements.minResponseRate,
        percentage:
          requirements.minResponseRate > 0
            ? Math.min(
                100,
                ((metrics.responseRate ?? 0) / requirements.minResponseRate) *
                  100
              )
            : 100,
      },
      profileComplete: {
        current: metrics.profileCompleteness ?? 0,
        required: requirements.minProfileComplete,
        percentage:
          requirements.minProfileComplete > 0
            ? Math.min(
                100,
                ((metrics.profileCompleteness ?? 0) /
                  requirements.minProfileComplete) *
                  100
              )
            : 100,
      },
    },
  }
}

/**
 * Get the next level in progression
 */
function getNextLevel(currentLevel: HandlerLevel): HandlerLevel | null {
  const levelOrder: HandlerLevel[] = [
    'NEW',
    'VERIFIED',
    'PROFESSIONAL',
    'ELITE',
  ]
  const currentIndex = levelOrder.indexOf(currentLevel)

  if (currentIndex === -1 || currentIndex === levelOrder.length - 1) {
    return null // Already at max level
  }

  return levelOrder[currentIndex + 1]
}

/**
 * Get human-readable level name
 */
export function getLevelDisplayName(level: HandlerLevel): string {
  const names: Record<HandlerLevel, string> = {
    NEW: 'New Handler',
    VERIFIED: 'Verified Handler',
    PROFESSIONAL: 'Professional Handler',
    ELITE: 'Elite Handler',
  }
  return names[level]
}

/**
 * Get level badge color/styling info
 */
export function getLevelBadgeStyle(level: HandlerLevel) {
  const styles = {
    NEW: {
      bg: 'bg-teal-100',
      text: 'text-teal-700',
      border: 'border-teal-200',
      gradient: null,
    },
    VERIFIED: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-200',
      gradient: null,
    },
    PROFESSIONAL: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20',
      gradient: null,
    },
    ELITE: {
      bg: 'bg-gradient-to-r from-orange-400 to-amber-500',
      text: 'text-white',
      border: 'border-transparent',
      gradient: true,
    },
  }
  return styles[level]
}
