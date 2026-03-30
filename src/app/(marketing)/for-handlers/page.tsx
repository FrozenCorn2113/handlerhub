import Image from 'next/image'
import Link from 'next/link'

import { prisma } from '@/lib/db'

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'

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
      <section className="relative isolate min-h-[520px] overflow-hidden lg:min-h-[600px]">
        {/* Background — wrapper keeps fill image bounded to this section */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/hero-handler.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-black/50" aria-hidden />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <h1
            className="mb-8 font-display text-white"
            style={{
              fontSize: 'clamp(2rem, 1.5rem + 3vw, 3.5rem)',
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              height: '195px',
              paddingTop: '30px',
              paddingBottom: '30px',
            }}
          >
            Grow your handling business with clients who find you
          </h1>
          <Link
            href="/register"
            className="mb-2.5 mt-[90px] inline-flex items-center gap-2 rounded-full bg-[#15472F] px-8 py-4 font-body text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
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

          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  src: '/images/backgrounds/jack-russell-agility-jump-hurdle.png',
                  gradient: null,
                  label: 'OPTIMIZE',
                  headline: 'Tools that streamline your work',
                  description:
                    'Built-in dashboard to manage bookings, messages, and client relationships.',
                },
                {
                  src: '/images/backgrounds/Untitled design (17).png',
                  gradient: null,
                  label: 'SECURE',
                  headline: 'Payouts you can trust',
                  description:
                    'Transparent pricing with reliable, on-time payments directly to you.',
                },
                {
                  src: '/images/backgrounds/dog-birthday-celebration-indoors.png',
                  gradient: null,
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
                  <p className="text-center text-base font-medium leading-relaxed text-white lg:text-lg">
                    {card.description}
                  </p>
                </div>

                {/* Label + headline always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-1 h-5 text-[15px] font-bold uppercase tracking-[0.2em] text-white/70">
                    {card.label}
                  </p>
                  <p
                    className="font-display text-white"
                    style={{
                      fontSize: '30px',
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
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2
            className="mb-10 font-display text-[#14472F]"
            style={{
              fontSize: 'clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem)',
              fontWeight: 700,
            }}
          >
            We grow better together
          </h2>

          <BentoGrid>
            <BentoGridItem
              title="Founding 100"
              description="Be one of the first. Early members earn a founding badge and help shape the platform."
              header={
                <Image
                  src="/images/backgrounds/woman-handler-jack-russell-terrier.png"
                  alt="Handler with Jack Russell Terrier"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              }
              className="border-[#14472F]/10 md:col-span-1"
            />
            <BentoGridItem
              title="Upcoming Shows"
              description="Browse AKC events by location, breed, and type. Plan your calendar."
              header={
                <Image
                  src="/images/backgrounds/lagotto-romagnolo-dog-show-green-carpet.png"
                  alt="Lagotto Romagnolo at dog show"
                  fill
                  className="object-cover object-top transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              }
              className="border-[#14472F]/10 md:col-span-2"
            />
            <BentoGridItem
              title="Our Story"
              description="Built by handlers, for handlers. The sport deserves a modern platform."
              header={
                <Image
                  src="/images/backgrounds/man-and-corgi-grassy-field.png"
                  alt="Man with Corgi in grassy field"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  style={{ objectPosition: 'center 80%' }}
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              }
              className="border-[#14472F]/10 md:col-span-2"
            />
            <BentoGridItem
              title="Community"
              description="Connect with fellow handlers, share wins, and grow together."
              header={
                <Image
                  src="/images/backgrounds/irish-setter-stacked-on-grass.png"
                  alt="Irish Setter stacked on grass"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  style={{ objectPosition: '62% top' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              }
              className="border-[#14472F]/10 md:col-span-1"
            />
          </BentoGrid>

          {/* Final CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#1C1208] px-8 py-3.5 font-body text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
            >
              Get started
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
