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
            {[
              {
                src: '/images/show-rottweiler.jpg',
                label: 'DISCOVER',
                headline: 'Exhibitors who need your expertise',
              },
              {
                src: '/images/dog-corgi.jpg',
                label: 'CONTROL',
                headline: 'Your rates, your schedule, your terms',
              },
              {
                src: '/images/hero-connection.jpg',
                label: 'GROW',
                headline: 'A reputation that works for you',
              },
            ].map((card) => (
              <div
                key={card.label}
                className="group relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: '3 / 4' }}
              >
                <Image
                  src={card.src}
                  alt={card.headline}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Text */}
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

          <div className="grid gap-5 md:grid-cols-3">
            {/* Founding 100 card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#14472F] p-8 text-white">
              {/* Rosette decoration */}
              <Image
                src="/images/brand/decorative-rosette.png"
                alt=""
                width={180}
                height={180}
                className="absolute -bottom-6 -right-6 opacity-10"
              />
              <div className="relative z-10">
                <p className="mb-1 text-sm font-semibold uppercase tracking-[0.15em] text-white/60">
                  Founding 100
                </p>
                <h3
                  className="mb-3 font-display"
                  style={{
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    lineHeight: 1.25,
                  }}
                >
                  Be one of the first
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/75">
                  Early members earn a founding badge and help shape the
                  platform from day one.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#14472F] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Join now
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Upcoming Shows card */}
            <div className="rounded-2xl border border-gray-100 bg-[#F8F4EE] p-8">
              <p className="mb-1 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4621A]">
                Upcoming Shows
              </p>
              <h3
                className="mb-3 font-display text-[#14472F]"
                style={{
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                Find shows near you
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[#4A3E2E]">
                Browse upcoming AKC events by location, breed, and event type.
                Plan your calendar and connect with exhibitors who need you.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full bg-[#14472F] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a5438] hover:shadow-lg"
              >
                Browse events
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>

            {/* Our Story card */}
            <div className="rounded-2xl border border-gray-100 bg-[#F8F4EE] p-8">
              <p className="mb-1 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4621A]">
                Our Story
              </p>
              <h3
                className="mb-3 font-display text-[#14472F]"
                style={{
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                Built by handlers, for handlers
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[#4A3E2E]">
                HandlerHub started with a simple idea: the sport of dog showing
                deserves a modern platform that puts handlers first.
              </p>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 rounded-full bg-[#14472F] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a5438] hover:shadow-lg"
              >
                Read more
                <ArrowRight size={14} weight="bold" />
              </Link>
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
