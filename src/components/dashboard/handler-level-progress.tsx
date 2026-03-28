import { LEVEL_REQUIREMENTS, getLevelProgress } from '@/lib/handler-levels'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import { HandlerLevelBadge } from '@/components/shared/handler-level-badge'

import {
  ChatCircle,
  CheckCircle,
  Star,
  User,
} from '@phosphor-icons/react/dist/ssr'
import { HandlerProfile } from '@prisma/client'

interface HandlerLevelProgressProps {
  profile: HandlerProfile
}

export function HandlerLevelProgress({ profile }: HandlerLevelProgressProps) {
  const metrics = {
    totalCompletedBookings: profile.totalCompletedBookings,
    averageRating: profile.averageRating,
    responseRate: profile.responseRate,
    profileCompleteness: profile.profileCompleteness,
  }

  const levelProgress = getLevelProgress(profile.handlerLevel, metrics)

  // If already at max level (ELITE), show celebration
  if (!levelProgress.nextLevel) {
    return (
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                You&apos;ve Reached Elite Status! 🎉
              </CardTitle>
              <CardDescription className="mt-1">
                You&apos;re at the highest handler level on HandlerHub
              </CardDescription>
            </div>
            <HandlerLevelBadge level={profile.handlerLevel} size="lg" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-white/60 p-4">
            <p className="text-sm text-slate-700">
              As an Elite Handler, you&apos;ve demonstrated exceptional service
              quality and commitment. Keep up the amazing work!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { nextLevel, progress } = levelProgress
  const nextLevelReqs = LEVEL_REQUIREMENTS[nextLevel]

  // Calculate overall progress (average of all metrics)
  const overallProgress =
    (progress.bookings.percentage +
      progress.rating.percentage +
      progress.responseRate.percentage +
      progress.profileComplete.percentage) /
    4

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Your Handler Level</CardTitle>
            <CardDescription className="mt-1">
              Complete more bookings and maintain quality to level up
            </CardDescription>
          </div>
          <HandlerLevelBadge level={profile.handlerLevel} size="lg" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              Progress to{' '}
              <span className="font-semibold text-primary">
                {nextLevel === 'VERIFIED'
                  ? 'Verified Handler'
                  : nextLevel === 'PROFESSIONAL'
                    ? 'Professional Handler'
                    : 'Elite Handler'}
              </span>
            </span>
            <span className="text-slate-500">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Individual Metrics */}
        <div className="space-y-4">
          {/* Completed Bookings */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-primary" />
              <span className="text-sm font-medium text-slate-700">
                Completed Bookings
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Progress
                value={progress.bookings.percentage}
                className="h-1.5 flex-1"
              />
              <span className="text-xs text-slate-600">
                {progress.bookings.current}/{progress.bookings.required}
              </span>
            </div>
            {progress.bookings.percentage < 100 && (
              <p className="text-xs text-slate-500">
                {progress.bookings.required - progress.bookings.current} more
                booking
                {progress.bookings.required - progress.bookings.current !== 1
                  ? 's'
                  : ''}{' '}
                needed
              </p>
            )}
          </div>

          {/* Average Rating */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="size-4 text-primary" />
              <span className="text-sm font-medium text-slate-700">
                Average Rating
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Progress
                value={progress.rating.percentage}
                className="h-1.5 flex-1"
              />
              <span className="text-xs text-slate-600">
                {progress.rating.current > 0
                  ? progress.rating.current.toFixed(1)
                  : 'N/A'}
                /{progress.rating.required.toFixed(1)}
              </span>
            </div>
            {progress.rating.current === 0 && (
              <p className="text-xs text-slate-500">
                Complete your first booking to receive ratings
              </p>
            )}
          </div>

          {/* Response Rate */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ChatCircle className="size-4 text-primary" />
              <span className="text-sm font-medium text-slate-700">
                Response Rate
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Progress
                value={progress.responseRate.percentage}
                className="h-1.5 flex-1"
              />
              <span className="text-xs text-slate-600">
                {progress.responseRate.current > 0
                  ? `${Math.round(progress.responseRate.current)}%`
                  : 'N/A'}
                /{progress.responseRate.required}%
              </span>
            </div>
            {progress.responseRate.current === 0 && (
              <p className="text-xs text-slate-500">
                Respond to booking requests within 24 hours to improve this
                metric
              </p>
            )}
          </div>

          {/* Profile Completeness */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="size-4 text-primary" />
              <span className="text-sm font-medium text-slate-700">
                Profile Completeness
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Progress
                value={progress.profileComplete.percentage}
                className="h-1.5 flex-1"
              />
              <span className="text-xs text-slate-600">
                {Math.round(progress.profileComplete.current)}%/
                {progress.profileComplete.required}%
              </span>
            </div>
            {progress.profileComplete.current <
              progress.profileComplete.required && (
              <p className="text-xs text-slate-500">
                Fill out more profile sections to increase this metric
              </p>
            )}
          </div>
        </div>

        {/* Encouragement */}
        {profile.handlerLevel === 'NEW' &&
          profile.totalCompletedBookings === 0 && (
            <div className="rounded-lg bg-teal-50 p-4">
              <p className="text-sm font-medium text-teal-900">
                🌟 Welcome to HandlerHub!
              </p>
              <p className="mt-1 text-xs text-teal-700">
                Complete your first booking to start building your reputation.
                The more you use HandlerHub, the higher your level will grow!
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  )
}
