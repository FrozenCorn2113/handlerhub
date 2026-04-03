'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import {
  HandlerCard,
  type HandlerCardData,
} from '@/components/handlers/handler-card'

import {
  ArrowRight,
  Camera,
  Dog,
  Gift,
  MagnifyingGlass,
  PawPrint,
  Scissors,
  Trophy,
  Users,
  Van,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Scroll reveal wrapper                                              */
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
/*  Section 1 — Hero                                                   */
/* ------------------------------------------------------------------ */

const serviceTypes = [
  { label: 'Handler', icon: Dog, param: 'handler' },
  { label: 'Groomer', icon: Scissors, param: 'groomer' },
  { label: 'Transport', icon: Van, param: 'transport' },
  { label: 'Photographer', icon: Camera, param: 'photographer' },
] as const

function HeroSection() {
  const router = useRouter()
  const [activeType, setActiveType] = useState('handler')
  const [location, setLocation] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({ type: activeType })
    if (location.trim()) params.set('location', location.trim())
    router.push(`/handlers?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[580px] overflow-hidden lg:min-h-[680px]">
      {/* Background image */}
      <Image
        src="/images/backgrounds/handler-gaiting-boxer-outdoor-show.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />

      <div className="relative z-10 flex min-h-[580px] items-center justify-center lg:min-h-[680px]">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h1
            className="mx-auto mb-6 max-w-[42ch] font-display text-white"
            style={{
              fontSize: 'clamp(2.25rem, 1.8rem + 3.5vw, 4.25rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontWeight: 700,
            }}
          >
            Find a handler who knows
            <br />
            your breed in the ring.
          </h1>

          <p className="mx-auto mb-8 max-w-[48ch] font-body text-lg text-white/80">
            Search every pro handler on the circuit by breed, region, and show
            record.
          </p>

          {/* Search Widget */}
          <form
            onSubmit={handleSearch}
            className="mx-auto w-full max-w-[640px] rounded-2xl bg-white p-4 shadow-[0_8px_48px_rgba(0,0,0,0.28)]"
          >
            {/* Row 1 — Service Type Tabs */}
            <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl bg-ring-cream p-1 sm:grid-cols-4">
              {serviceTypes.map((svc) => {
                const Icon = svc.icon
                const isActive = activeType === svc.param
                return (
                  <button
                    key={svc.param}
                    type="button"
                    onClick={() => setActiveType(svc.param)}
                    className={`flex cursor-pointer select-none items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-body text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-paddock-green text-white shadow-sm'
                        : 'text-warm-brown/70 hover:text-warm-brown'
                    }`}
                  >
                    <Icon size={16} weight={isActive ? 'fill' : 'regular'} />
                    {svc.label}
                  </button>
                )
              })}
            </div>

            {/* Row 2 — Location Input + Search Button */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search by city, state, or region..."
                className="h-11 flex-1 rounded-xl border border-tan bg-ring-cream px-4 font-body text-sm text-ringside-black transition-all duration-150 placeholder:text-warm-gray/60 focus:border-paddock-green/60 focus:outline-none focus:ring-2 focus:ring-paddock-green/30"
              />
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-b from-[#24845a] to-paddock-green px-6 font-display text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg sm:w-auto"
              >
                <MagnifyingGlass size={16} weight="bold" />
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Trust Band                                             */
/* ------------------------------------------------------------------ */
function TrustBandSection({
  handlerCount,
  showCount,
}: {
  handlerCount: number
  showCount: number
}) {
  const stats = [
    {
      icon: Users,
      value: handlerCount === 0 ? 'Launching soon' : String(handlerCount),
      label: 'handlers on the platform',
    },
    {
      icon: Trophy,
      value: showCount === 0 ? 'Launching soon' : `${showCount}+`,
      label: 'dog shows represented',
    },
    {
      icon: Gift,
      value: 'Free',
      label: 'for exhibitors',
    },
    {
      icon: MagnifyingGlass,
      value: 'Search by',
      label: 'breed, region, and record',
    },
  ]

  return (
    <section className="border-t border-sand bg-ring-cream py-8 lg:py-10">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-tan">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="flex flex-col items-center px-6 py-2 text-center"
              >
                <Icon size={24} weight="fill" className="text-paddock-green" />
                <p className="mb-0.5 mt-2 font-display text-2xl font-bold text-ringside-black lg:text-3xl">
                  {stat.value}
                </p>
                <p className="font-body text-sm leading-snug text-warm-brown/70">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Service Showcase (Rover-style full-width rows)         */
/* ------------------------------------------------------------------ */

const serviceCards = [
  {
    image: '/images/backgrounds/handler-gaiting-boxer-outdoor-show.jpg',
    icon: Dog,
    name: 'Handling',
    subtitle: 'In the ring \u00b7 All breeds',
    description:
      'Your dog in expert hands. Browse handlers by breed, region, and show record.',
    cta: 'Explore Handlers',
    href: '/handlers?type=handler',
  },
  {
    image: '/images/backgrounds/black-poodle-conformation-stacked.jpg',
    icon: Scissors,
    name: 'Grooming',
    subtitle: 'Ringside prep \u00b7 Breed-specific',
    description:
      "Ring-ready grooming from pros who know your breed's standard.",
    cta: 'Explore Groomers',
    href: '/handlers?type=groomer',
  },
  {
    image: '/images/backgrounds/five-dogs-sitting-field-lineup.jpg',
    icon: Van,
    name: 'Transport',
    subtitle: 'Show to show \u00b7 Nationwide',
    description:
      'Safe, reliable transport to and from shows across the circuit.',
    cta: 'Explore Transport',
    href: '/handlers?type=transport',
  },
  {
    image: '/images/backgrounds/agility-jump-border-collie-action.jpg',
    icon: Camera,
    name: 'Photography',
    subtitle: 'Ring shots \u00b7 Portraits',
    description: 'Professional ring and portrait photography for your wins.',
    cta: 'Explore Photographers',
    href: '/handlers?type=photographer',
  },
]

function ServiceShowcaseSection() {
  const [activeService, setActiveService] = useState(0)
  const card = serviceCards[activeService]
  const Icon = card.icon

  return (
    <section className="border-t border-sand bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-slate-blue">
              Show day services
            </p>
            <h2
              className="mb-3 font-display font-bold text-ringside-black"
              style={{
                fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
              }}
            >
              Find the right pro for show day.
            </h2>
            <p className="mx-auto max-w-[44ch] font-body text-base text-warm-brown/70">
              Every professional on HandlerHub is searchable by breed, region,
              and show record.
            </p>
          </div>
        </ScrollReveal>

        {/* Pill filter buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {serviceCards.map((svc, i) => (
            <button
              key={svc.name}
              type="button"
              onClick={() => setActiveService(i)}
              className={`rounded-full px-5 py-2 font-display text-sm font-semibold transition-all duration-200 ${
                activeService === i
                  ? 'bg-paddock-green text-white'
                  : 'border border-paddock-green bg-transparent text-paddock-green hover:bg-paddock-green/10'
              }`}
            >
              {svc.name}
            </button>
          ))}
        </div>

        {/* Active service content */}
        <div className="mx-auto max-w-[960px]">
          <div
            key={activeService}
            className="flex animate-fade-in flex-col gap-8 lg:flex-row lg:items-center lg:gap-12"
          >
            {/* Image — left side */}
            <div className="w-full shrink-0 lg:w-[48%]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={card.image}
                  alt={card.name}
                  className="max-h-[280px] w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Text — right side */}
            <div className="flex-1">
              {/* Icon + title row */}
              <div className="mb-1.5 flex items-center gap-2.5">
                <Icon size={22} weight="fill" className="text-paddock-green" />
                <span className="font-display text-xl font-bold text-ringside-black lg:text-2xl">
                  {card.name}
                </span>
              </div>

              {/* Subtitle */}
              <p className="mb-3 font-body text-xs font-medium uppercase tracking-wide text-warm-brown/50">
                {card.subtitle}
              </p>

              {/* Description */}
              <p className="mb-6 font-body text-base leading-relaxed text-warm-brown/80">
                {card.description}
              </p>

              {/* CTA button */}
              <Link
                href={card.href}
                className="group inline-flex items-center gap-2 rounded-lg border border-paddock-green px-5 py-2.5 font-display text-sm font-semibold text-paddock-green transition-all duration-200 hover:bg-paddock-green hover:text-white"
              >
                {card.cta}
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Featured Handlers Grid                                 */
/* ------------------------------------------------------------------ */
function FeaturedHandlersSection({
  handlers,
}: {
  handlers: HandlerCardData[]
}) {
  if (handlers.length < 3) return null

  return (
    <section className="border-t border-sand bg-ring-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-14 flex flex-col items-center text-center">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-slate-blue">
              On the circuit
            </p>
            <h2
              className="font-display text-paddock-green"
              style={{
                fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
                fontWeight: 700,
              }}
            >
              Handlers on the circuit
            </h2>
            <p className="mt-2 font-body text-base text-warm-brown/60">
              Working pros, searchable by breed and region.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {handlers.map((handler, i) => (
            <ScrollReveal key={handler.id} delay={i * 0.1}>
              <HandlerCard handler={handler} />
            </ScrollReveal>
          ))}
        </div>

        {/* Browse all link */}
        <div className="mt-10 text-center">
          <Link
            href="/handlers"
            className="inline-flex items-center gap-2 font-body text-base font-semibold text-paddock-green transition-colors hover:text-paddock-green/80"
          >
            Browse all handlers
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Why HandlerHub (alternating image/text blocks)         */
/* ------------------------------------------------------------------ */

const valueProps = [
  {
    paraphrase:
      '"Shop around. Not for price, but for the handler who will be best for your dog."',
    heading:
      'See every handler\u2019s breed specialties, show history, and credentials before you reach out.',
    body: 'Every profile shows the breeds they\u2019ve finished, the shows they\u2019ve attended, and feedback from exhibitors who\u2019ve worked with them. Evaluate any handler before you ever send a message.',
    image: '/images/backgrounds/conformation-table-cavalier-exam.jpg',
  },
  {
    paraphrase: '"Good communication makes the whole ring experience better."',
    heading: 'Message any handler directly. No middleman, no gatekeeping.',
    body: 'Reach out to any handler on the platform and start a conversation. No referral needed, no waiting to be introduced. Just direct access to every handler in your region.',
    image: '/images/backgrounds/woman-handler-jack-russell-terrier.jpg',
  },
  {
    paraphrase:
      '"Every exhibitor started somewhere. The ring is better when the door is open."',
    heading:
      'New to the sport? Every handler on HandlerHub is open to new clients.',
    body: 'Search by breed, region, or circuit. You don\u2019t need a decade in the breed or a personal referral to find a qualified pro handler for your dog. HandlerHub is how new exhibitors find their footing.',
    image: '/images/backgrounds/lagotto-romagnolo-dog-show-green-carpet.jpg',
  },
]

function WhyHandlerHubSection() {
  return (
    <section className="border-t border-sand bg-ring-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-slate-blue">
              Why HandlerHub
            </p>
            <h2
              className="font-display font-bold text-ringside-black"
              style={{
                fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
              }}
            >
              The dog show platform built for the ring.
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-16 lg:gap-20">
          {valueProps.map((card, i) => {
            const imageLeft = i % 2 === 0
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className={`flex flex-col gap-8 lg:items-center lg:gap-12 ${
                    imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Image side */}
                  <div className="w-full shrink-0 lg:w-[48%]">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={card.image}
                        alt={card.heading}
                        className="aspect-[4/3] w-full object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* Text side */}
                  <div className="flex-1">
                    {/* Community paraphrase */}
                    <div className="mb-6 border-l-4 border-paddock-green/40 pl-4">
                      <p
                        className="font-display italic text-warm-brown"
                        style={{
                          fontSize: 'clamp(1.05rem, 0.9rem + 0.5vw, 1.2rem)',
                          fontWeight: 400,
                          lineHeight: 1.6,
                        }}
                      >
                        {card.paraphrase}
                      </p>
                    </div>

                    {/* Heading */}
                    <h3
                      className="mb-3 font-display font-bold text-ringside-black"
                      style={{
                        fontSize: 'clamp(1.2rem, 1rem + 0.8vw, 1.5rem)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {card.heading}
                    </h3>

                    {/* Body */}
                    <p className="font-body text-base leading-relaxed text-warm-brown/80">
                      {card.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Community Voice Strip (tighter padding)                */
/* ------------------------------------------------------------------ */

const communityQuotes = [
  {
    text: 'There\u2019s nothing like the feeling of finishing a champion you raised from a puppy.',
    attribution: 'Owner-handler, Pacific circuit',
  },
  {
    text: 'The best handlers treat your dog like their own.',
    attribution: 'Dog show community',
  },
  {
    text: 'New exhibitors are good for the breed. Full stop.',
    attribution: 'Breeder-exhibitor, Midwest',
  },
  {
    text: 'An owner-handled win against the pros is the most meaningful win in the sport.',
    attribution: 'Dog show community',
  },
]

function CommunityVoiceSection() {
  return (
    <section className="bg-ring-cream py-10 lg:py-12">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-xl font-bold text-paddock-green lg:text-2xl">
            Voices from the ring
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {communityQuotes.map((quote, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex gap-3">
                <div className="mt-2 h-3 w-3 shrink-0 rounded-full bg-paddock-green" />
                <div>
                  <p className="font-display text-sm italic leading-relaxed text-warm-brown lg:text-base">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="mt-1 font-body text-xs font-medium uppercase tracking-wide text-warm-brown/50">
                    {quote.attribution}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 7 — Founding CTA (compact bar)                             */
/* ------------------------------------------------------------------ */
function FoundingCtaSection({ handlerCount }: { handlerCount: number }) {
  return (
    <section className="bg-gradient-to-br from-paddock-green to-[#154D35] py-10 lg:py-12">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center lg:flex lg:items-center lg:justify-between lg:gap-8 lg:text-left">
          {/* Left: copy */}
          <div className="mb-6 lg:mb-0">
            <h2
              className="mb-2 font-display text-white"
              style={{
                fontSize: 'clamp(1.5rem, 1.1rem + 2vw, 2.25rem)',
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Join the Founding 100
            </h2>
            <p className="font-body text-base leading-relaxed text-white/75">
              Be the first name exhibitors see when they search your breed in
              your region.
            </p>
          </div>

          {/* Right: CTA */}
          <div className="flex shrink-0 flex-col items-center gap-3 lg:items-end">
            <Button asChild size="lg" variant="secondary">
              <Link
                href="/register"
                className="gap-3 border-0 bg-white font-display text-base font-bold text-paddock-green shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-ring-cream hover:text-paddock-green"
              >
                Create your free profile
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
            <p className="text-sm text-white/50">
              Built by a dog person.{' '}
              <Link
                href="/our-story"
                className="text-white/70 underline underline-offset-2"
              >
                Our story
              </Link>
            </p>
          </div>
        </div>

        {/* Handler count line */}
        <div className="mt-6 border-t border-white/15 pt-5 text-center">
          <p className="font-body text-sm text-white/60">
            {handlerCount === 0
              ? 'Handlers are joining now.'
              : handlerCount === 1
                ? '1 handler has already joined.'
                : `${handlerCount} handlers have already joined.`}{' '}
            <Link
              href="/register"
              className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
            >
              Create your free profile
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Composed landing page                                              */
/* ------------------------------------------------------------------ */
export default function LandingHome({
  featuredHandlers,
  handlerCount,
  showCount,
}: {
  featuredHandlers: HandlerCardData[]
  handlerCount: number
  showCount: number
}) {
  return (
    <div className="bg-ring-cream">
      <HeroSection />
      <TrustBandSection handlerCount={handlerCount} showCount={showCount} />
      <ServiceShowcaseSection />
      <FeaturedHandlersSection handlers={featuredHandlers} />
      <WhyHandlerHubSection />
      <CommunityVoiceSection />
      <FoundingCtaSection handlerCount={handlerCount} />
    </div>
  )
}
