'use client'

import Link from 'next/link'

import { Clock, MapPin, SealCheck, Sparkle, Star } from '@phosphor-icons/react'

/* ------------------------------------------------------------------ */
/*  Shared handler type (matches API response shape)                   */
/* ------------------------------------------------------------------ */

export interface HandlerCardData {
  id: string
  name: string
  profileImage: string | null
  coverImage: string | null
  serviceType: string
  serviceTypes: string[]
  breeds: string[]
  regions: string[]
  city: string | null
  state: string | null
  rating: number | null
  reviewCount: number
  ratePerShow: number | null
  yearsExperience: number | null
  experienceLevel: string
  isInsured: boolean
  isBonded: boolean
  registries: string[]
  tagline: string | null
  bio: string | null
}

/* ------------------------------------------------------------------ */
/*  HandlerCard (Fiverr-style)                                         */
/* ------------------------------------------------------------------ */

export function HandlerCard({
  handler,
  isHighlighted,
}: {
  handler: HandlerCardData
  isHighlighted?: boolean
}) {
  const initials = handler.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const location = [handler.city, handler.state].filter(Boolean).join(', ')

  return (
    <Link
      href={`/handlers/${handler.id}`}
      className={`group block overflow-hidden rounded-2xl border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.14)] ${
        isHighlighted
          ? 'border-paddock-green ring-2 ring-paddock-green/20'
          : 'border-sand bg-white'
      }`}
    >
      {/* Cover photo area */}
      <div className="relative h-36 w-full bg-gradient-to-br from-light-sand to-sand">
        {handler.coverImage ? (
          <img
            src={handler.coverImage}
            alt=""
            className="size-full object-cover"
          />
        ) : handler.profileImage ? (
          <div className="size-full bg-gradient-to-br from-forest/20 to-paddock-green/10" />
        ) : (
          <div className="size-full bg-gradient-to-br from-light-sand via-sand to-tan" />
        )}
      </div>

      {/* Avatar overlapping cover */}
      <div className="relative px-4 pb-4">
        <div className="-mt-8 mb-2 flex items-end gap-3">
          {handler.profileImage ? (
            <img
              src={handler.profileImage}
              alt={handler.name}
              className="size-16 shrink-0 rounded-full border-[3px] border-white object-cover shadow-md"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-forest text-lg font-bold text-white shadow-md">
              {initials}
            </div>
          )}
          <div className="min-w-0 pb-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-display text-base font-semibold text-ringside-black">
                {handler.name}
              </h3>
              {handler.isInsured && (
                <SealCheck
                  size={18}
                  weight="fill"
                  className="shrink-0 text-paddock-green"
                />
              )}
            </div>
            <p className="text-xs text-warm-gray">
              {handler.yearsExperience
                ? `${handler.yearsExperience} yrs experience`
                : handler.experienceLevel.charAt(0) +
                  handler.experienceLevel.slice(1).toLowerCase()}
            </p>
          </div>
        </div>

        {/* Availability dot + response time */}
        <div className="mb-2 flex flex-col gap-1">
          <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold">
            <span className="size-2 rounded-full bg-paddock-green" />
            Available
          </span>
          <p className="flex items-center gap-1 font-body text-xs text-warm-gray">
            <Clock size={12} weight="fill" />
            Typically responds within 24 hours
          </p>
        </div>

        {/* Tagline or bio snippet */}
        {(handler.tagline || handler.bio) && (
          <p className="mb-3 line-clamp-2 text-sm leading-snug text-warm-brown">
            {handler.tagline || handler.bio}
          </p>
        )}

        {/* Review snippet */}
        {handler.reviewCount > 0 && handler.tagline && (
          <p className="mb-2 mt-1 line-clamp-2 font-body text-xs italic text-warm-brown/70">
            &ldquo;{handler.tagline}&rdquo;
          </p>
        )}

        {/* Breed chips */}
        {handler.breeds.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {handler.breeds.slice(0, 3).map((breed) => (
              <span
                key={breed}
                className="rounded-full bg-light-sand px-2.5 py-0.5 text-xs text-warm-brown"
              >
                {breed}
              </span>
            ))}
            {handler.breeds.length > 3 && (
              <span className="rounded-full bg-light-sand px-2.5 py-0.5 text-xs text-warm-gray">
                +{handler.breeds.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Bottom row: rating/badge + location + price */}
        <div className="flex items-center justify-between border-t border-sand/40 pt-3">
          <div className="flex items-center gap-3">
            {handler.reviewCount >= 20 && handler.rating ? (
              <div className="flex items-center gap-1">
                <Star size={14} weight="fill" className="text-amber-400" />
                <span className="text-sm font-semibold text-ringside-black">
                  {handler.rating.toFixed(1)}
                </span>
                <span className="text-xs text-warm-gray">
                  ({handler.reviewCount})
                </span>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-blue/10 px-2.5 py-0.5 text-xs font-semibold text-slate-blue">
                <Sparkle size={12} weight="fill" />
                New
              </span>
            )}
            <div className="flex items-center gap-1 text-xs text-warm-gray">
              <MapPin size={12} weight="bold" className="text-paddock-green" />
              {location || handler.regions?.[0] || 'N/A'}
            </div>
          </div>
          {handler.ratePerShow && (
            <p className="text-sm font-semibold text-paddock-green">
              From ${handler.ratePerShow}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
