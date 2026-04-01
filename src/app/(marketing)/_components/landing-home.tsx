'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
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
    <section className="bg-ring-cream pb-0 pt-12 lg:pt-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="mb-6 font-display text-paddock-green"
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

          <p className="mx-auto mb-8 max-w-xl font-body text-lg leading-relaxed text-warm-brown/70">
            Find the perfect handler for your breed. Search by specialty,
            location, or show circuit.
          </p>

          {/* CTAs */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="default">
              <Link href="/handlers" className="gap-2 font-display font-bold">
                Find a Handler
                <ArrowRight size={18} weight="bold" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/for-handlers" className="font-display font-bold">
                Become a Handler
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Dog lineup banner */}
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
      'Your reputation is earned from the people you work with. Ratings, reviews, and trust, all driven by the community.',
    themeColor: '25 70% 35%',
    imagePosition: 'center',
    href: '/handlers',
  },
  {
    imageUrl: '/images/dog-portrait.jpg',
    title: 'Transparency for All',
    description:
      'Open communication, honest expectations. Post what you need and connect directly with the right handler.',
    themeColor: '200 40% 30%',
    imagePosition: 'center 15%',
    imageLayerPositionClassName: 'bottom-0 right-0 h-full w-full',
    href: '/requests',
  },
]

function MissionSection() {
  return (
    <section className="border-t border-sand bg-ring-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <h2
            className="mx-auto mb-14 max-w-3xl text-center font-display text-paddock-green"
            style={{
              fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
              fontWeight: 700,
            }}
          >
            A sport built on passion deserves a platform built on trust
          </h2>
        </ScrollReveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {missionCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <MissionCard
                imageUrl={card.imageUrl}
                title={card.title}
                description={card.description}
                themeColor={card.themeColor}
                imagePosition={card.imagePosition}
                imageLayerPositionClassName={card.imageLayerPositionClassName}
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
    <section className="border-t border-sand bg-ring-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 font-body text-base font-semibold uppercase tracking-[0.15em] text-slate-blue">
                Request board
              </p>
              <h2
                className="font-display text-paddock-green"
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
              className="hidden items-center gap-2 font-body text-base font-semibold text-paddock-green transition-colors hover:text-paddock-green/80 sm:flex"
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
                <div className="rounded-2xl border border-sand bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-paddock-green px-3 py-1 text-sm font-semibold text-white">
                      {req.service}
                    </span>
                    <span className="rounded-full border border-slate-blue/30 bg-slate-blue/10 px-2.5 py-0.5 text-sm font-medium text-slate-blue">
                      Example
                    </span>
                  </div>

                  <h4 className="mb-1 font-display text-base font-bold text-paddock-green">
                    {req.title}
                  </h4>
                  <p className="mb-4 font-body text-base text-warm-brown/70">
                    {req.event}
                  </p>

                  <div className="flex items-center gap-3 font-body text-sm text-warm-brown/60">
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
              className="inline-flex items-center gap-2 font-body text-base font-semibold text-paddock-green"
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
    <section className="bg-gradient-to-br from-paddock-green to-[#154D35] py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
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
          <p className="mx-auto mb-10 max-w-lg font-body text-lg leading-relaxed text-white/80">
            We&apos;re building HandlerHub with our first members. Get in early,
            shape the platform, and be the first name exhibitors see.
          </p>

          <Button asChild size="lg" variant="accent">
            <Link
              href="/register"
              className="gap-3 font-display text-lg font-bold"
            >
              Create your free profile
              <ArrowRight
                size={20}
                weight="bold"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>

          <div className="mt-8 flex items-center justify-center gap-6 font-body text-base text-white/70">
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
    <section className="border-t border-sand bg-ring-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2
              className="font-display text-paddock-green"
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
            <div className="flex h-full w-full max-w-sm items-center justify-center rounded-2xl border-2 border-dashed border-sand bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div>
                <p className="mb-2 font-display text-lg font-semibold text-warm-brown/50">
                  Your profile here
                </p>
                <p className="mb-4 font-body text-sm text-warm-brown/40">
                  Be one of the founding 100
                </p>
                <Button asChild size="sm" variant="default">
                  <Link href="/register">Join Now</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex h-full w-full max-w-sm items-center justify-center rounded-2xl border-2 border-dashed border-sand bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div>
                <p className="mb-2 font-display text-lg font-semibold text-warm-brown/50">
                  Your profile here
                </p>
                <p className="mb-4 font-body text-sm text-warm-brown/40">
                  Be one of the founding 100
                </p>
                <Button asChild size="sm" variant="default">
                  <Link href="/register">Join Now</Link>
                </Button>
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
    <div className="bg-ring-cream">
      <HeroSection />
      <FeaturedHandlersSection />
      <MissionSection />
      <RequestBoardSection />
      <FoundingCtaSection />
    </div>
  )
}
