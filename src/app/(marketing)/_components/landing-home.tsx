'use client'

import Image from 'next/image'
import Link from 'next/link'

import { siteLogoSrc } from '@/config/site'

import { MissionCard } from '@/components/ui/card-21'
import { HandlerCard } from '@/components/ui/handler-card'

import { ArrowRight, MapPin, PawPrint, Star } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Scroll reveal (below-fold only)                                    */
/* ------------------------------------------------------------------ */
function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero (centered)                                        */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="bg-white pb-0 pt-12 lg:pt-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="mb-6 font-display text-[#14472F]"
            style={{
              fontSize: 'clamp(2.25rem, 1.8rem + 3.5vw, 4.25rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontWeight: 700,
            }}
          >
            Where great dogs
            <br />
            meet great handlers
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-gray-600">
            Find the perfect handler for your breed. Search by specialty,
            location, or show circuit.
          </p>

          {/* CTAs */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/handlers"
              className="inline-flex items-center gap-2 rounded-full bg-[#14472F] px-8 py-4 font-display text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a5438] hover:shadow-lg"
            >
              Find a Handler
              <ArrowRight size={18} weight="bold" />
            </Link>
            <Link
              href="/for-handlers"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#14472F] px-8 py-4 font-display text-base font-bold text-[#14472F] transition-all hover:-translate-y-0.5 hover:bg-[#14472F]/5"
            >
              Become a Founding Handler
            </Link>
          </div>
        </div>
      </div>

      {/* Dog lineup banner — narrower + tighter to CTAs so dogs read as the hero baseline */}
      <div className="mt-6 flex justify-center lg:mt-8">
        <Image
          src="/images/dog-lineup.png"
          alt="Dog lineup banner"
          width={1200}
          height={400}
          className="block h-auto w-full max-w-3xl object-contain object-bottom sm:max-w-4xl"
          priority
        />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 - Mission cards                                          */
/* ------------------------------------------------------------------ */
const missionCards = [
  {
    imageUrl: '/images/dog-action.jpg',
    title: 'Open Doors',
    description:
      "The sport of dog showing shouldn't be gatekept. Whether you're brand new or a seasoned competitor, there's a place for you here.",
    themeColor: '150 50% 25%',
    imagePosition: 'center',
    href: '/register',
  },
  {
    imageUrl: '/images/dog-love.jpg',
    title: 'Built by the Community',
    description:
      'Your reputation is earned from the people you work with, not decided by the top 5%. Ratings, reviews, and trust, all driven by the community.',
    themeColor: '25 70% 35%',
    imagePosition: 'center',
    href: '/handlers',
  },
  {
    imageUrl: '/images/dog-portrait.jpg',
    title: 'Transparency for All',
    description:
      "Fair pricing, open communication, no backroom deals. Post what you need, connect directly, and know exactly what you're getting.",
    themeColor: '200 40% 30%',
    imagePosition: 'center 20%',
    href: '/requests',
  },
]

function MissionSection() {
  return (
    <section className="border-t border-gray-100 bg-[#F8F4EE] py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {missionCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <MissionCard
                imageUrl={card.imageUrl}
                title={card.title}
                description={card.description}
                themeColor={card.themeColor}
                imagePosition={card.imagePosition}
                href={card.href}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5 - Request board preview                                  */
/* ------------------------------------------------------------------ */
const mockRequests = [
  {
    title: 'Standard Poodle handler needed',
    event: 'Springfield Cluster, April 12-14',
    breed: 'Standard Poodle',
    service: 'Show Handling',
    region: 'Midwest',
  },
  {
    title: 'Grooming for Golden Retriever',
    event: 'Westminster area shows',
    breed: 'Golden Retriever',
    service: 'Grooming',
    region: 'Northeast',
  },
  {
    title: 'Campaign handler wanted',
    event: 'Southeast circuit, full season',
    breed: 'Labrador Retriever',
    service: 'Campaign',
    region: 'Southeast',
  },
]

function RequestBoardSection() {
  return (
    <section className="border-t border-gray-100 bg-[#FAFAF8] py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-base font-semibold uppercase tracking-[0.15em] text-[#D4621A]">
                Request board
              </p>
              <h2
                className="font-display text-[#14472F]"
                style={{
                  fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
                  fontWeight: 700,
                }}
              >
                What exhibitors are looking for
              </h2>
            </div>
            <Link
              href="/requests"
              className="hidden items-center gap-2 text-base font-semibold text-[#14472F] transition-colors hover:text-[#1F6B4A] sm:flex"
            >
              View all
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {mockRequests.map((req, i) => (
            <ScrollReveal key={req.title} delay={i * 0.08}>
              <Link href="/requests" className="group block">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-[#14472F] px-3 py-1 text-sm font-semibold text-white">
                      {req.service}
                    </span>
                    <span className="rounded-full border border-[#D4621A]/30 bg-[#D4621A]/10 px-2.5 py-0.5 text-sm font-medium text-[#D4621A]">
                      Example
                    </span>
                  </div>

                  <h4 className="mb-1 font-display text-base font-bold text-[#14472F]">
                    {req.title}
                  </h4>
                  <p className="mb-4 text-base text-gray-600">{req.event}</p>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <PawPrint size={14} weight="bold" />
                      {req.breed}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} weight="bold" />
                      {req.region}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/requests"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#14472F]"
            >
              View all requests
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 6 - Founding CTA                                           */
/* ------------------------------------------------------------------ */
function FoundingCtaSection() {
  return (
    <section className="bg-[#14472F] py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.15em] text-[#D4621A]">
            For Handlers
          </p>
          <img
            src={siteLogoSrc}
            alt="HandlerHub"
            className="mx-auto mb-8 h-24 w-auto object-contain"
          />
          <h2
            className="mb-4 font-display text-white"
            style={{
              fontSize: 'clamp(1.75rem, 1.2rem + 2.5vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Join the Founding 100
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-white/80">
            We&apos;re building HandlerHub with our first members. Get in early,
            shape the platform, and be the first name exhibitors see.
          </p>

          <Link
            href="/register"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 font-display text-lg font-bold text-[#14472F] transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            Create your free profile
            <ArrowRight
              size={20}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <div className="mt-8 flex items-center justify-center gap-6 text-base text-white/70">
            <span className="flex items-center gap-2">
              <Star size={14} weight="fill" />
              Free to join
            </span>
            <span className="flex items-center gap-2">
              <Star size={14} weight="fill" />
              No platform fees
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section - Featured Handlers                                        */
/* ------------------------------------------------------------------ */
function FeaturedHandlersSection() {
  return (
    <section className="border-t border-gray-100 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.15em] text-[#D4621A]">
              Handlers
            </p>
            <h2
              className="font-display text-[#14472F]"
              style={{
                fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
                fontWeight: 700,
              }}
            >
              Meet our founding handlers
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal delay={0}>
            <HandlerCard
              imageUrl="/images/brett-headshot.jpg"
              name="Brett Carter"
              region="Victoria, BC"
              rating={5.0}
              reviewCount={0}
              description="Founder of HandlerHub. New to the sport but passionate about making it accessible to everyone."
              breeds={['All Breeds']}
              services={['Founder']}
              price="Say Hello"
              href="/our-story"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex h-full w-full max-w-sm items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
              <div>
                <p className="mb-2 text-lg font-semibold text-gray-400">
                  Your profile here
                </p>
                <p className="mb-4 text-sm text-gray-400">
                  Be one of the founding 100
                </p>
                <a
                  href="/register"
                  className="inline-flex items-center rounded-full bg-[#14472F] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a5438] hover:shadow-lg"
                >
                  Join Now
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex h-full w-full max-w-sm items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
              <div>
                <p className="mb-2 text-lg font-semibold text-gray-400">
                  Your profile here
                </p>
                <p className="mb-4 text-sm text-gray-400">
                  Be one of the founding 100
                </p>
                <a
                  href="/register"
                  className="inline-flex items-center rounded-full bg-[#14472F] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a5438] hover:shadow-lg"
                >
                  Join Now
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Composed landing page                                              */
/* ------------------------------------------------------------------ */
export default function LandingHome() {
  return (
    <div>
      <HeroSection />
      <FeaturedHandlersSection />
      <MissionSection />
      <RequestBoardSection />
      <FoundingCtaSection />
    </div>
  )
}
