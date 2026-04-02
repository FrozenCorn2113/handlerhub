'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import {
  ArrowLeft,
  CalendarBlank,
  Camera,
  CarProfile,
  CheckCircle,
  Clock,
  CurrencyDollar,
  Dog,
  EnvelopeSimple,
  Globe,
  Link as LinkIcon,
  MapPin,
  MapTrifold,
  ShieldCheck,
  Sparkle,
  Star,
  Trophy,
} from '@phosphor-icons/react'

export interface HandlerServiceItem {
  id: string
  name: string
  description: string | null
  price: number
  pricePer: string
}

export interface ProfileHandler {
  id: string
  name: string
  profileImage: string | null
  coverImage: string | null
  galleryImages: string[]
  bio: string | null
  tagline: string | null
  yearsExperience: number | null
  location: string | null
  breeds: string[]
  regions: string[]
  serviceType: 'Campaign' | 'Ringside' | 'Both' | 'Grooming'
  registries: string[]
  feeSchedule: FeeSchedule | null
  ratePerShow: number | null
  ratePerDay: number | null
  messageHref: string
  isInsured: boolean
  isBonded: boolean
  kennelClubMemberships: string[]
  totalCompletedBookings: number
  averageRating: number | null
  reviewCount: number
  responseRate: number | null
  travelWillingness: string[]
  serviceTypes: string[]
  handlerServices: HandlerServiceItem[]
  isFoundingHandler: boolean
  isClaimed?: boolean
  upcomingShows?: UpcomingShow[]
}

export interface UpcomingShow {
  eventName: string
  eventDate: string
  eventLocation: string
}

export interface FeeSchedule {
  allBreedShow?: number | null
  specialtyShow?: number | null
  nationalSpecialty?: number | null
  boardAndTrain?: number | null
  grooming?: number | null
  mileage?: number | null
  winBonusBIS?: number | null
  winBonusGroup?: number | null
  notes?: string | null
}

interface ProfilePageProps {
  handler: ProfileHandler
}

export function WebmakerProfilePage({ handler }: ProfilePageProps) {
  const [copied, setCopied] = useState(false)

  function copyProfileLink() {
    const url = `${window.location.origin}/handlers/${handler.id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const fee = handler.feeSchedule
  const startingPrice = handler.ratePerShow ?? fee?.allBreedShow ?? null
  const firstName = handler.name.split(' ')[0]
  const upcomingShowCount = handler.upcomingShows?.length ?? 0

  // Has any stats to show?
  const hasStats =
    handler.yearsExperience != null ||
    handler.totalCompletedBookings > 0 ||
    (handler.reviewCount >= 20 && handler.averageRating != null) ||
    handler.responseRate != null

  return (
    <div className="min-h-[80vh] bg-ring-cream">
      <div className="mx-auto max-w-5xl animate-fade-in px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/handlers"
          className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-warm-gray transition-colors hover:text-paddock-green"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse Handlers
        </Link>

        {/* Unclaimed banner */}
        {handler.isClaimed === false && (
          <Card
            variant="static"
            className="mb-6 border-2 border-amber-200 bg-amber-50 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg font-light text-amber-900">
                  Is this your profile?
                </p>
                <p className="mt-1 font-body text-sm text-amber-700">
                  Claim it to manage your presence on HandlerHub.
                </p>
              </div>
              <Button asChild size="sm">
                <Link href={`/claim/confirm?profileId=${handler.id}`}>
                  Claim This Profile
                </Link>
              </Button>
            </div>
          </Card>
        )}

        {/* Hero Card -- cleaned up, no stats */}
        <Card variant="static" className="mb-0 overflow-hidden p-0">
          {/* Cover photo / gradient */}
          {handler.coverImage ? (
            <img
              src={handler.coverImage}
              alt={`${handler.name} cover`}
              className="h-48 w-full object-cover sm:h-56 md:h-64"
            />
          ) : (
            <div className="h-48 w-full bg-gradient-to-br from-paddock-green via-forest to-paddock-green/80 sm:h-56 md:h-64" />
          )}

          <div className="px-6 pb-6 sm:px-8">
            {/* Avatar overlay */}
            <div className="-mt-16 mb-4 flex items-end gap-5">
              <div className="shrink-0">
                {handler.profileImage ? (
                  <img
                    src={handler.profileImage}
                    alt={handler.name}
                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-light-sand shadow-md">
                    <span className="font-display text-5xl text-warm-gray">
                      {handler.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact CTA above the fold on desktop */}
              {handler.isClaimed !== false && (
                <div className="hidden flex-1 justify-end pb-2 sm:flex">
                  <div className="flex gap-3">
                    <Button asChild>
                      <Link href={handler.messageHref}>
                        <EnvelopeSimple className="mr-1.5 h-4 w-4" />
                        Message {firstName}
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={copyProfileLink}>
                      <LinkIcon className="mr-1.5 h-4 w-4" />
                      {copied ? 'Copied!' : 'Share'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Name + badges */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-light tracking-tight text-ringside-black sm:text-4xl">
                {handler.name}
              </h1>
              {handler.isFoundingHandler && (
                <span className="inline-flex items-center gap-1 rounded-full bg-paddock-green px-3 py-1 font-body text-xs font-semibold text-ring-cream">
                  <Star className="h-3 w-3" weight="fill" />
                  Founding Handler
                </span>
              )}
            </div>

            <p className="mt-1.5 font-body text-base text-warm-brown">
              {handler.tagline || 'Professional Dog Handler'}
            </p>

            {handler.location && (
              <div className="mt-2 flex items-center gap-1.5 font-body text-sm text-warm-gray">
                <MapPin className="h-4 w-4 text-paddock-green" />
                {handler.location}
              </div>
            )}

            {/* Service type + registries */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-paddock-green">
                {handler.serviceType}
              </span>
              {handler.registries.map((reg) => (
                <span
                  key={reg}
                  className="chip-verified rounded-full px-3 py-1 font-body text-xs font-semibold uppercase"
                >
                  {reg}
                </span>
              ))}
            </div>

            {/* Starting price */}
            {startingPrice != null && (
              <p className="mt-4 font-body text-sm text-ringside-black">
                <span className="font-semibold">
                  Starting from ${startingPrice}/show
                </span>
              </p>
            )}

            {/* Mobile CTA */}
            {handler.isClaimed !== false && (
              <div className="mt-5 flex gap-3 sm:hidden">
                <Button asChild className="flex-1">
                  <Link href={handler.messageHref}>
                    <EnvelopeSimple className="mr-1.5 h-4 w-4" />
                    Message
                  </Link>
                </Button>
                <Button variant="outline" onClick={copyProfileLink}>
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* New to HandlerHub badge - shown when <20 reviews */}
            {handler.reviewCount < 20 && (
              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-blue/10 px-3.5 py-1.5 font-body text-xs font-semibold text-slate-blue shadow-sm">
                  <Sparkle className="h-3.5 w-3.5" weight="fill" />
                  New to HandlerHub
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Stats Block -- full-width band between hero and content */}
        {hasStats && (
          <div className="rounded-b-2xl bg-[#F0EAE0]/60 px-6 py-6 sm:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {handler.yearsExperience != null && (
                <div className="flex flex-col items-center text-center">
                  <span className="font-display text-2xl font-semibold text-ringside-black sm:text-3xl">
                    {handler.yearsExperience}
                  </span>
                  <span className="mt-1 font-body text-xs text-warm-gray">
                    Years Experience
                  </span>
                </div>
              )}
              {handler.totalCompletedBookings > 0 && (
                <div className="flex flex-col items-center text-center">
                  <span className="font-display text-2xl font-semibold text-ringside-black sm:text-3xl">
                    {handler.totalCompletedBookings}
                  </span>
                  <span className="mt-1 font-body text-xs text-warm-gray">
                    Completed Bookings
                  </span>
                </div>
              )}
              {handler.reviewCount >= 20 && handler.averageRating != null && (
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-2xl font-semibold text-ringside-black sm:text-3xl">
                      {handler.averageRating.toFixed(1)}
                    </span>
                    <Star className="h-5 w-5 text-amber-400" weight="fill" />
                  </div>
                  <span className="mt-1 font-body text-xs text-warm-gray">
                    Average Rating
                  </span>
                </div>
              )}
              {handler.responseRate != null && (
                <div className="flex flex-col items-center text-center">
                  <span className="font-display text-2xl font-semibold text-ringside-black sm:text-3xl">
                    {Math.round(handler.responseRate)}%
                  </span>
                  <span className="mt-1 font-body text-xs text-warm-gray">
                    Response Rate
                  </span>
                </div>
              )}
            </div>
            <p className="mt-3 text-center font-body text-[10px] text-warm-gray/70">
              [Handler-provided]
            </p>
          </div>
        )}

        {/* Spacer after stats block */}
        <div className="h-8" />

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main column -- reordered: About > Services > Breeds > Trust > Gallery > Shows > Reviews */}
          <div className="space-y-8 lg:col-span-2">
            {/* 1. About / Bio */}
            <Card variant="static" className="p-6">
              <h2 className="mb-4 font-display text-xl font-light text-ringside-black">
                About {firstName}
              </h2>
              {handler.bio ? (
                <p className="font-body text-base leading-relaxed text-warm-brown">
                  {handler.bio}
                </p>
              ) : (
                <p className="font-body text-sm italic text-warm-gray">
                  This handler has not added a bio yet.
                </p>
              )}
            </Card>

            {/* 2. Services & Pricing */}
            {handler.handlerServices.length > 0 ? (
              <Card variant="static" className="p-6">
                <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-light text-ringside-black">
                  <CurrencyDollar className="h-5 w-5 text-paddock-green" />
                  Services &amp; Pricing
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {handler.handlerServices.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-xl border border-sand bg-ring-cream p-4 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <CurrencyDollar className="h-4 w-4 shrink-0 text-paddock-green/60" />
                          <h3 className="font-body text-sm font-semibold text-ringside-black">
                            {service.name}
                          </h3>
                        </div>
                        <span className="shrink-0 font-display text-lg font-light text-paddock-green">
                          $
                          {(service.price / 100).toFixed(
                            service.price % 100 === 0 ? 0 : 2
                          )}
                        </span>
                      </div>
                      <p className="mt-0.5 pl-6 font-body text-xs text-warm-gray">
                        per {service.pricePer}
                      </p>
                      {service.description && (
                        <p className="mt-2 line-clamp-2 pl-6 font-body text-xs leading-relaxed text-warm-brown">
                          {service.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ) : fee ? (
              <Card variant="static" className="p-6">
                <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-light text-ringside-black">
                  <CurrencyDollar className="h-5 w-5 text-paddock-green" />
                  Fee Schedule
                </h2>

                <div className="divide-y divide-sand">
                  {fee.allBreedShow != null && (
                    <FeeRow
                      label="All-Breed Show"
                      value={`$${fee.allBreedShow}`}
                    />
                  )}
                  {fee.specialtyShow != null && (
                    <FeeRow
                      label="Specialty Show"
                      value={`$${fee.specialtyShow}`}
                    />
                  )}
                  {fee.nationalSpecialty != null && (
                    <FeeRow
                      label="National Specialty"
                      value={`$${fee.nationalSpecialty}`}
                    />
                  )}
                  {fee.boardAndTrain != null && (
                    <FeeRow
                      label="Board & Train Rate"
                      value={`$${fee.boardAndTrain}/month`}
                    />
                  )}
                  {fee.grooming != null && (
                    <FeeRow
                      label="Grooming"
                      value={`$${fee.grooming}/session`}
                    />
                  )}
                  {fee.mileage != null && (
                    <FeeRow label="Mileage" value={`$${fee.mileage}/mile`} />
                  )}
                  {fee.winBonusBIS != null && (
                    <FeeRow
                      label="Win Bonus: BIS"
                      value={`$${fee.winBonusBIS}`}
                    />
                  )}
                  {fee.winBonusGroup != null && (
                    <FeeRow
                      label="Win Bonus: Group"
                      value={`$${fee.winBonusGroup}`}
                    />
                  )}
                </div>

                {fee.notes && (
                  <div className="mt-4 rounded-xl bg-ring-cream p-3">
                    <p className="font-body text-sm italic text-warm-brown">
                      {fee.notes}
                    </p>
                  </div>
                )}
              </Card>
            ) : (
              <EmptyStateBox message="Services and pricing coming soon" />
            )}

            {/* 3. Breed Specialties */}
            {handler.breeds.length > 0 && (
              <Card variant="static" className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-light text-ringside-black">
                  <Dog className="h-5 w-5 text-paddock-green" />
                  Breed Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {handler.breeds.map((breed) => (
                    <span
                      key={breed}
                      className="chip-breed rounded-full px-3.5 py-1.5 font-body text-xs font-medium"
                    >
                      {breed}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* 4. Trust & Credentials */}
            {(handler.isInsured ||
              handler.isBonded ||
              handler.kennelClubMemberships.length > 0 ||
              handler.isFoundingHandler) && (
              <Card variant="static" className="p-6">
                <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-light text-ringside-black">
                  <ShieldCheck className="h-5 w-5 text-paddock-green" />
                  Trust &amp; Credentials
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {handler.isInsured && (
                    <TrustBadge
                      icon={
                        <ShieldCheck
                          className="h-5 w-5 text-paddock-green"
                          weight="fill"
                        />
                      }
                      label="Insured"
                    />
                  )}
                  {handler.isBonded && (
                    <TrustBadge
                      icon={
                        <CheckCircle
                          className="h-5 w-5 text-paddock-green"
                          weight="fill"
                        />
                      }
                      label="Bonded"
                    />
                  )}
                  {handler.kennelClubMemberships.map((membership) => (
                    <TrustBadge
                      key={membership}
                      icon={<Trophy className="h-5 w-5 text-paddock-green" />}
                      label={membership}
                    />
                  ))}
                  {handler.isFoundingHandler && (
                    <TrustBadge
                      icon={
                        <Star
                          className="h-5 w-5 text-paddock-green"
                          weight="fill"
                        />
                      }
                      label="Founding Handler"
                      highlight
                    />
                  )}
                </div>
              </Card>
            )}

            {/* 5. Gallery / Portfolio */}
            {handler.galleryImages.length > 0 ? (
              <Card variant="static" className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-light text-ringside-black">
                  <Camera className="h-5 w-5 text-paddock-green" />
                  Gallery
                </h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {handler.galleryImages.map((img, idx) => {
                    const src = img.startsWith('http')
                      ? img
                      : `${process.env.NEXT_PUBLIC_R2_DEV_URL}/${img}`
                    return (
                      <img
                        key={idx}
                        src={src}
                        alt={`${handler.name} gallery ${idx + 1}`}
                        className="aspect-square rounded-xl object-cover transition-shadow hover:shadow-lg"
                      />
                    )
                  })}
                </div>
              </Card>
            ) : (
              <EmptyStateBox message="Photos coming soon" />
            )}

            {/* 6. Upcoming Shows */}
            {handler.upcomingShows && handler.upcomingShows.length > 0 ? (
              <Card variant="static" className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-light text-ringside-black">
                  <Trophy className="h-5 w-5 text-paddock-green" />
                  Upcoming Shows
                </h2>
                <div className="space-y-3">
                  {handler.upcomingShows.map((show, idx) => {
                    const date = new Date(show.eventDate)
                    const monthStr = date.toLocaleDateString('en-US', {
                      month: 'short',
                    })
                    const dayStr = date.getDate().toString()
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-xl border border-sand bg-ring-cream p-3 transition-shadow hover:shadow-sm"
                      >
                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-sage">
                          <span className="font-body text-[9px] font-semibold uppercase tracking-wider text-paddock-green">
                            {monthStr}
                          </span>
                          <span className="font-display text-lg font-light leading-none text-ringside-black">
                            {dayStr}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-body text-sm font-semibold text-ringside-black">
                            {show.eventName}
                          </p>
                          <div className="mt-0.5 flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1 font-body text-xs text-warm-gray">
                              <CalendarBlank className="h-3 w-3" />
                              {date.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                            {show.eventLocation && (
                              <span className="flex items-center gap-1 font-body text-xs text-warm-gray">
                                <MapPin className="h-3 w-3" />
                                {show.eventLocation}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            ) : (
              <EmptyStateBox message="No upcoming shows listed yet" />
            )}

            {/* 7. Reviews (last in main column) */}
            {handler.reviewCount >= 20 && handler.averageRating != null && (
              <Card variant="static" className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-light text-ringside-black">
                  <Star className="h-5 w-5 text-paddock-green" weight="fill" />
                  Reviews
                </h2>
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-light text-ringside-black">
                    {handler.averageRating.toFixed(1)}
                  </span>
                  <div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(handler.averageRating!)
                              ? 'text-amber-400'
                              : 'text-sand'
                          }`}
                          weight="fill"
                        />
                      ))}
                    </div>
                    <p className="mt-0.5 font-body text-xs text-warm-gray">
                      Based on {handler.reviewCount} reviews
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar -- enriched */}
          <div className="space-y-6 lg:col-span-1">
            {/* Availability + Response Time */}
            <Card variant="static" className="p-5">
              <div className="space-y-4">
                {/* Availability status */}
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paddock-green/60 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-paddock-green" />
                  </span>
                  <span className="font-body text-sm font-semibold text-paddock-green">
                    Available
                  </span>
                </div>

                {/* Response time */}
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-warm-gray" />
                  <span className="font-body text-sm text-warm-gray">
                    Typically responds within 24 hours
                  </span>
                </div>

                {/* Shows this season */}
                <div className="flex items-center gap-2.5">
                  <Trophy className="h-4 w-4 text-warm-gray" />
                  <span className="font-body text-sm text-warm-gray">
                    {upcomingShowCount}{' '}
                    {upcomingShowCount === 1 ? 'show' : 'shows'} this season
                  </span>
                </div>
              </div>
            </Card>

            {/* Contact CTA sidebar */}
            {handler.isClaimed !== false && (
              <Card
                variant="static"
                className="border-2 border-paddock-green/20 p-6"
              >
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle
                    className="h-5 w-5 text-paddock-green"
                    weight="fill"
                  />
                  <h3 className="font-body text-sm font-semibold text-ringside-black">
                    Work with {firstName}
                  </h3>
                </div>
                <p className="mb-4 font-body text-sm text-warm-gray">
                  Send a message to discuss your show needs, availability, and
                  pricing.
                </p>
                <Button asChild className="w-full">
                  <Link href={handler.messageHref}>
                    <EnvelopeSimple className="mr-1.5 h-4 w-4" />
                    Send Message
                  </Link>
                </Button>
              </Card>
            )}

            {/* Next 3 upcoming shows -- compact sidebar list */}
            {handler.upcomingShows && handler.upcomingShows.length > 0 && (
              <Card variant="static" className="p-5">
                <h3 className="mb-3 flex items-center gap-2 font-display text-base font-light text-ringside-black">
                  <CalendarBlank className="h-4 w-4 text-paddock-green" />
                  Next Shows
                </h3>
                <div className="space-y-2.5">
                  {handler.upcomingShows.slice(0, 3).map((show, idx) => {
                    const date = new Date(show.eventDate)
                    return (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-md bg-sage">
                          <span className="font-body text-[8px] font-semibold uppercase tracking-wider text-paddock-green">
                            {date.toLocaleDateString('en-US', {
                              month: 'short',
                            })}
                          </span>
                          <span className="font-display text-xs font-light leading-none text-ringside-black">
                            {date.getDate()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-body text-xs font-semibold text-ringside-black">
                            {show.eventName}
                          </p>
                          {show.eventLocation && (
                            <p className="truncate font-body text-[11px] text-warm-gray">
                              {show.eventLocation}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}

            {/* Circuit Coverage */}
            {handler.regions.length > 0 && (
              <Card variant="static" className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-light text-ringside-black">
                  <MapTrifold className="h-5 w-5 text-paddock-green" />
                  Circuit Coverage
                </h2>
                <div className="flex flex-wrap gap-2">
                  {handler.regions.map((region) => (
                    <span
                      key={region}
                      className="flex items-center gap-1 rounded-full bg-light-sand px-3 py-1.5 font-body text-xs text-warm-brown"
                    >
                      <MapPin className="h-3 w-3 text-paddock-green" />
                      {region}
                    </span>
                  ))}
                </div>

                {/* Travel willingness */}
                {handler.travelWillingness.length > 0 && (
                  <div className="mt-4 border-t border-sand pt-4">
                    <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-warm-gray">
                      Travel Willingness
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {handler.travelWillingness.map((level) => (
                        <span
                          key={level}
                          className="inline-flex items-center gap-1 rounded-full bg-sage px-2.5 py-1 font-body text-xs text-paddock-green"
                        >
                          <CarProfile className="h-3 w-3" />
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Claim CTA for unclaimed */}
            {handler.isClaimed === false && (
              <Card
                variant="static"
                className="border-2 border-amber-200/60 p-6"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-amber-700" />
                  <h3 className="font-body text-sm font-semibold text-ringside-black">
                    Claim This Profile
                  </h3>
                </div>
                <p className="mb-4 font-body text-sm text-warm-gray">
                  This is an unclaimed listing. If this is your profile, claim
                  it to manage your information and receive messages.
                </p>
                <Button asChild variant="accent" className="w-full">
                  <Link href={`/claim/confirm?profileId=${handler.id}`}>
                    Claim Profile
                  </Link>
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Sub-components ---------- */

function EmptyStateBox({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-sand bg-ring-cream/60 px-6 py-8 text-center">
      <p className="font-body text-sm italic text-warm-gray">{message}</p>
    </div>
  )
}

function TrustBadge({
  icon,
  label,
  highlight = false,
}: {
  icon: React.ReactNode
  label: string
  highlight?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border p-3 ${
        highlight
          ? 'border-paddock-green/30 bg-sage'
          : 'border-sand bg-ring-cream'
      }`}
    >
      {icon}
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-ringside-black">
        {label}
      </span>
    </div>
  )
}

function FeeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="font-body text-sm text-warm-gray">{label}</span>
      <span className="font-body text-sm font-semibold text-ringside-black">
        {value}
      </span>
    </div>
  )
}
