import Image from 'next/image'
import Link from 'next/link'

import { prisma } from '@/lib/db'

import {
  ArrowRight,
  CalendarBlank,
  MapPin,
} from '@phosphor-icons/react/dist/ssr'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Become a Handler | HandlerHub',
  description:
    'Create your profile on HandlerHub and let exhibitors find you by breed, region, and show circuit.',
}

/* ------------------------------------------------------------------ */
/*  Event type label helper                                            */
/* ------------------------------------------------------------------ */
function eventTypeLabel(type: string) {
  const map: Record<string, string> = {
    ALL_BREED: 'All-Breed',
    LIMITED_BREED: 'Limited Breed',
    SPECIALTY: 'Specialty',
    PARENT_SPECIALTY: 'Parent Specialty',
    DESIGNATED_SPECIALTY: 'Designated Specialty',
    JUNIOR_SHOWMANSHIP: 'Junior Showmanship',
    SWEEPSTAKES: 'Sweepstakes',
    OTHER: 'Other',
  }
  return map[type] || type
}

/* ------------------------------------------------------------------ */
/*  Format date helper                                                 */
/* ------------------------------------------------------------------ */
function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function ForHandlersPage() {
  /* Fetch upcoming events server-side */
  let upcomingEvents: {
    id: string
    clubName: string
    eventType: string
    startDate: Date
    venue: { city: string; state: string }
  }[] = []

  try {
    upcomingEvents = await prisma.event.findMany({
      where: { startDate: { gte: new Date() } },
      orderBy: { startDate: 'asc' },
      take: 4,
      select: {
        id: true,
        clubName: true,
        eventType: true,
        startDate: true,
        venue: { select: { city: true, state: true } },
      },
    })
  } catch {
    // DB unavailable — section will show fallback
  }

  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/*  Section 1 — Hero                                          */}
      {/* ---------------------------------------------------------- */}
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden lg:min-h-[600px]">
        {/* Background image */}
        <Image
          src="/images/hero-handler.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Become a Handler
          </p>
          <h1
            className="mb-8 font-display text-white"
            style={{
              fontSize: 'clamp(2rem, 1.5rem + 3vw, 3.5rem)',
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Grow your handling business with clients who find you
          </h1>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-[#1C1208] px-8 py-4 font-display text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
          >
            Create your profile
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Section 2 — Why (Image Cards)                             */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2
            className="mb-14 text-center font-display text-[#14472F]"
            style={{
              fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
              fontWeight: 700,
            }}
          >
            A better way to build your business
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                {
                  src: '/images/show-rottweiler.jpg',
                  gradient: null,
                  label: 'DISCOVER',
                  headline: 'Exhibitors who need your expertise',
                  description:
                    'Get found by exhibitors searching for handlers by breed, location, and show circuit.',
                },
                {
                  src: '/images/dog-corgi.jpg',
                  gradient: null,
                  label: 'CONTROL',
                  headline: 'Work on your terms, always',
                  description:
                    'Set your own rates, availability, and service areas. Accept only the clients that fit.',
                },
                {
                  src: '/images/hero-connection.jpg',
                  gradient: null,
                  label: 'GROW',
                  headline: 'A reputation that works for you',
                  description:
                    'Build a verified track record with reviews and results that attract new clients.',
                },
                {
                  src: null,
                  gradient: 'from-[#1a3a2a] to-[#2d5e3f]',
                  label: 'OPTIMIZE',
                  headline: 'Tools that streamline your work',
                  description:
                    'Built-in dashboard to manage bookings, messages, and client relationships.',
                },
                {
                  src: null,
                  gradient: 'from-[#1C1208] to-[#3d2e15]',
                  label: 'SECURE',
                  headline: 'Payouts you can trust',
                  description:
                    'Transparent pricing with reliable, on-time payments directly to you.',
                },
                {
                  src: null,
                  gradient: 'from-[#14472F] to-[#D4621A]',
                  label: 'SUPPORT',
                  headline: 'Real partners for the road ahead',
                  description:
                    'Dedicated help when you need it, from onboarding to growing your business.',
                },
              ] as {
                src: string | null
                gradient: string | null
                label: string
                headline: string
                description: string
              }[]
            ).map((card) => (
              <div
                key={card.label}
                className="group relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: '3 / 4' }}
              >
                {/* Image or gradient placeholder */}
                {card.src ? (
                  <Image
                    src={card.src}
                    alt={card.headline}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                  />
                )}

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Frosted glass hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-6 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-center text-sm font-medium leading-relaxed text-white">
                    {card.description}
                  </p>
                </div>

                {/* Label + headline always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                    {card.label}
                  </p>
                  <p
                    className="font-display text-white"
                    style={{
                      fontSize: 'clamp(1.125rem, 1rem + 0.5vw, 1.375rem)',
                      fontWeight: 700,
                      lineHeight: 1.25,
                    }}
                  >
                    {card.headline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Section 3 — Upcoming Shows                                */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-gray-100 bg-[#F8F4EE] py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2
            className="mb-14 text-center font-display text-[#14472F]"
            style={{
              fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
              fontWeight: 700,
            }}
          >
            Upcoming shows near you
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
                >
                  <span className="mb-3 inline-block rounded-full bg-[#14472F] px-3 py-1 text-xs font-semibold text-white">
                    {eventTypeLabel(event.eventType)}
                  </span>
                  <h3 className="mb-2 font-display text-base font-bold leading-snug text-[#14472F]">
                    {event.clubName}
                  </h3>
                  <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} weight="bold" className="shrink-0" />
                      {event.venue.city}, {event.venue.state}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarBlank
                        size={14}
                        weight="bold"
                        className="shrink-0"
                      />
                      {formatDate(event.startDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Events are loading. Check back soon.
            </p>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#14472F] transition-colors hover:text-[#1F6B4A]"
            >
              Browse all events
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Section 4 — Community (Bento Grid)                        */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2
            className="mb-14 text-center font-display text-[#14472F]"
            style={{
              fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
              fontWeight: 700,
            }}
          >
            We grow better together
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {/* Founding 100 card — col 1, spans both rows */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#14472F] p-8 text-white md:col-span-1 md:row-span-1 lg:row-span-2 lg:p-10">
              {/* Rosette decoration */}
              <Image
                src="/images/brand/decorative-rosette.png"
                alt=""
                width={220}
                height={220}
                className="absolute -bottom-8 -right-8 opacity-10"
              />
              <div className="relative z-10">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  Founding 100
                </p>
                <h3
                  className="mb-4 font-display"
                  style={{
                    fontSize: 'clamp(1.25rem, 1rem + 0.75vw, 1.625rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Be one of the first
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-white/70">
                  Early members earn a founding badge and help shape the
                  platform from day one.
                </p>
              </div>
              <div className="relative z-10">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#14472F] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Join now
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Upcoming Shows card — cols 2-3, row 1 */}
            <div className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-[#F8F4EE] p-8 md:col-span-1 lg:col-span-2 lg:p-10">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4621A]">
                  Upcoming Shows
                </p>
                <h3
                  className="mb-3 font-display text-[#14472F]"
                  style={{
                    fontSize: 'clamp(1.25rem, 1rem + 0.75vw, 1.625rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Find shows near you
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#4A3E2E]">
                  Browse upcoming AKC events by location, breed, and event type.
                  Plan your calendar and connect with exhibitors who need you.
                </p>
              </div>
              <div>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-full bg-[#14472F] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a5438] hover:shadow-lg"
                >
                  Browse events
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Decorative card — col 4, row 1 */}
            <div className="relative hidden overflow-hidden rounded-3xl bg-[#1C1208] lg:block">
              <Image
                src="/images/brand/decorative-rosette.png"
                alt=""
                width={280}
                height={280}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C1208] via-transparent to-[#14472F]/30" />
            </div>

            {/* Our Story card — col 2, row 2 */}
            <div className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-[#F8F4EE] p-8 lg:p-10">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4621A]">
                  Our Story
                </p>
                <h3
                  className="mb-3 font-display text-[#14472F]"
                  style={{
                    fontSize: 'clamp(1.25rem, 1rem + 0.75vw, 1.625rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Built by handlers, for handlers
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#4A3E2E]">
                  HandlerHub started with a simple idea: the sport of dog
                  showing deserves a modern platform that puts handlers first.
                </p>
              </div>
              <div>
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 rounded-full bg-[#14472F] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a5438] hover:shadow-lg"
                >
                  Read more
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Community card — cols 3-4, row 2 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#D4621A] p-8 text-white md:col-span-1 lg:col-span-2 lg:p-10">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  Community
                </p>
                <h3
                  className="mb-3 font-display"
                  style={{
                    fontSize: 'clamp(1.25rem, 1rem + 0.75vw, 1.625rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Join the conversation
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/80">
                  Connect with fellow handlers, share wins, and learn from each
                  other in a community built around the sport.
                </p>
              </div>
              <div>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-lg"
                >
                  Coming soon
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-14 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#1C1208] px-10 py-4 font-display text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
            >
              Get started
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
