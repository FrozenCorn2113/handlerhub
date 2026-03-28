import Link from 'next/link'

import { prisma } from '@/lib/db'
import { withTimeout } from '@/lib/with-timeout'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { HandlerLevelBadge } from '@/components/shared/handler-level-badge'

import { ArrowRight, MapPin, Trophy } from '@phosphor-icons/react/dist/ssr'

export async function FeaturedHandlers() {
  let handlers: Array<any> = []
  try {
    // Get featured or most recent handlers
    handlers = await withTimeout(
      prisma.user.findMany({
        where: {
          role: 'HANDLER',
          handlerProfile: {
            isNot: null,
          },
        },
        include: {
          handlerProfile: true,
        },
        orderBy: [
          { handlerProfile: { featured: 'desc' } },
          { createdAt: 'desc' },
        ],
        take: 6,
      }),
      800,
      'FeaturedHandlers timed out'
    )
  } catch (error) {
    // Don’t break the landing page if DB is temporarily unreachable
    console.error('FeaturedHandlers prisma error:', error)
    return null
  }

  if (handlers.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="mb-2 text-xl font-semibold text-slate-900 sm:text-2xl">
            Featured Handlers
          </h2>
          <p className="text-sm text-slate-700 sm:text-base">
            Discover experienced professionals ready to showcase your dog
          </p>
        </div>

        {/* Handler Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {handlers.map((handler) => {
            const profile = handler.handlerProfile
            if (!profile) return null

            return (
              <Link key={handler.id} href={`/handlers/${handler.id}`}>
                <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  {/* Handler Image - aspect ratio 4:3 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {handler.image ? (
                      <img
                        src={handler.image}
                        alt={handler.name || 'Handler'}
                        className="size-full object-cover transition-transform group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-slate-100 text-4xl font-semibold text-slate-400">
                        {handler.name?.charAt(0) || 'H'}
                      </div>
                    )}

                    {/* Handler Level Badge */}
                    <div className="absolute left-3 top-3">
                      <HandlerLevelBadge
                        level={profile.handlerLevel}
                        size="md"
                      />
                    </div>

                    {profile.featured && (
                      <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold leading-snug text-slate-900 sm:text-base">
                          {handler.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {profile.city}, {profile.state}
                        </p>
                      </div>
                    </div>

                    {profile.breeds && profile.breeds.length > 0 && (
                      <p className="truncate text-xs text-slate-600">
                        Specializing in {profile.breeds.slice(0, 2).join(', ')}
                        {profile.breeds.length > 2 &&
                          ` +${profile.breeds.length - 2}`}
                      </p>
                    )}

                    {profile.yearsExperience && (
                      <p className="text-xs text-slate-500">
                        {profile.yearsExperience} years handling
                      </p>
                    )}

                    {(profile.feeRangeMin || profile.ratePerShow) && (
                      <p className="text-sm font-semibold text-slate-900">
                        {profile.feeRangeMin
                          ? `From $${profile.feeRangeMin}`
                          : profile.ratePerShow
                            ? `From $${profile.ratePerShow}`
                            : 'Contact for pricing'}{' '}
                        <span className="font-normal text-slate-500">
                          per show
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center sm:mt-10">
          <Link href="/handlers">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50">
              View All Handlers
              <ArrowRight className="size-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
