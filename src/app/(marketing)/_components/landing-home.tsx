'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import {
  HandlerCard,
  type HandlerCardData,
} from '@/components/handlers/handler-card'

import { ArrowRight, PawPrint } from '@phosphor-icons/react'
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
/*  Section 1 - Hero                                                   */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="relative min-h-[520px] overflow-hidden lg:min-h-[600px]">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="mb-6 font-display text-white"
            style={{
              fontSize: 'clamp(2.25rem, 1.8rem + 3.5vw, 4.25rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontWeight: 700,
            }}
          >
            Find a pro handler
            <br />
            who knows your breed
          </h1>

          <p className="mx-auto mb-8 max-w-xl font-body text-lg leading-relaxed text-white/80">
            The dog show world&apos;s first directory of professional handlers,
            searchable by breed, region, and record.
          </p>

          {/* Primary CTA */}
          <div className="mb-4">
            <Button asChild size="lg" variant="default">
              <Link href="/handlers" className="gap-2 font-display font-bold">
                Browse Handlers
                <ArrowRight size={18} weight="bold" />
              </Link>
            </Button>
          </div>

          {/* Secondary CTA */}
          <p className="font-body text-sm text-white/70">
            Are you a handler?{' '}
            <Link
              href="/register"
              className="font-semibold text-white underline-offset-2 hover:underline"
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
/*  Section 2 - Featured Handlers Grid (Centerpiece)                   */
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
/*  Dog Lineup Decorative Break                                        */
/* ------------------------------------------------------------------ */
function DogLineupBreak() {
  return (
    <div className="bg-ring-cream py-4">
      <div className="mx-auto flex max-w-4xl justify-center px-6 lg:px-8">
        <Image
          src="/images/dog-lineup.png"
          alt="Illustrated lineup of dog breeds"
          width={1200}
          height={400}
          className="block h-auto w-full max-w-3xl object-contain opacity-60 sm:max-w-4xl"
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 3 - Solution Blocks                                        */
/* ------------------------------------------------------------------ */

const solutionBlocks = [
  {
    paraphrase:
      'Shop around. Not for price, but for the handler who will be best for your dog.',
    heading: 'See every handler\u2019s record before you reach out',
    body: 'Every profile shows breeds they\u2019ve finished, shows they\u2019ve attended, and reviews from exhibitors who\u2019ve worked with them. Evaluate a pro handler before you ever pick up the phone.',
    reversed: false,
    image: '/images/backgrounds/black-poodle-conformation-stacked.jpg',
    imageAlt: 'Black poodle stacked in conformation pose at a dog show',
  },
  {
    paraphrase: 'Good communication makes the whole ring experience better.',
    heading: 'Message any handler directly. No middleman, no waiting.',
    body: 'Reach out to any handler on the platform and start a conversation. Every profile shows the breeds they\u2019ve finished, their show record, and their experience, so you can make an informed choice before you ever send a message.',
    reversed: true,
    image: '/images/backgrounds/handler-gaiting-boxer-outdoor-show.jpg',
    imageAlt: 'Handler gaiting a boxer at an outdoor dog show',
  },
  {
    paraphrase:
      'Every exhibitor started somewhere. The ring is better when the door is open.',
    heading:
      'Whether it\u2019s your first show or your hundredth, find the right handler for your dog',
    body: 'Search by breed, region, or circuit. You don\u2019t need a decade in the breed or a personal referral to find a qualified pro handler for your dog.',
    reversed: false,
    image: '/images/backgrounds/five-dogs-sitting-field-lineup.jpg',
    imageAlt: 'Five dogs sitting together in a field',
  },
]

function SolutionBlocksSection() {
  return (
    <section className="border-t border-sand bg-ring-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        {solutionBlocks.map((block, i) => {
          const isMiddle = i === 1
          return (
            <div key={i} className={isMiddle ? '-mx-6 lg:-mx-8' : ''}>
              <div
                className={`${isMiddle ? 'bg-light-sand px-6 lg:px-8' : ''}`}
              >
                <div
                  className={`mx-auto max-w-[1200px] ${
                    i < solutionBlocks.length - 1 ? 'border-b border-sand' : ''
                  }`}
                >
                  <ScrollReveal delay={i * 0.1}>
                    <div
                      className={`grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16`}
                    >
                      {/* Text column */}
                      <div
                        className={`${
                          block.reversed ? 'lg:order-2' : 'lg:order-1'
                        }`}
                      >
                        {/* Community paraphrase */}
                        <div className="mb-6 border-l-4 border-paddock-green/40 pl-4">
                          <p
                            className="font-display text-warm-brown"
                            style={{
                              fontSize:
                                'clamp(1.1rem, 0.9rem + 0.8vw, 1.35rem)',
                              fontWeight: 400,
                              lineHeight: 1.6,
                            }}
                          >
                            {block.paraphrase}
                          </p>
                        </div>

                        {/* Heading */}
                        <h3
                          className="mb-4 mt-2 font-display text-ringside-black"
                          style={{
                            fontSize: 'clamp(1.5rem, 1.1rem + 1.5vw, 2rem)',
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {block.heading}
                        </h3>

                        {/* Body */}
                        <p className="max-w-lg font-body text-base leading-relaxed text-warm-brown/80">
                          {block.body}
                        </p>
                      </div>

                      {/* Visual column */}
                      <div
                        className={`${
                          block.reversed ? 'lg:order-1' : 'lg:order-2'
                        }`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(28,18,8,0.08)]">
                          <Image
                            src={block.image}
                            alt={block.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4 - Community Voice Strip                                  */
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
    <section className="bg-[#EDE5D8] py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-warm-gray">
              From the dog show world
            </p>
            <h2
              className="font-display text-paddock-green"
              style={{
                fontSize: 'clamp(1.5rem, 1rem + 1.8vw, 2.25rem)',
                fontWeight: 700,
              }}
            >
              Voices from the ring
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop: even grid */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-4">
          {communityQuotes.map((quote, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <VoiceQuote text={quote.text} attribution={quote.attribution} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: horizontal snap-scroll */}
        <div
          className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 lg:hidden"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {communityQuotes.map((quote, i) => (
            <div
              key={i}
              className="w-[280px] shrink-0 snap-center first:ml-0 last:mr-6"
            >
              <VoiceQuote text={quote.text} attribution={quote.attribution} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VoiceQuote({
  text,
  attribution,
}: {
  text: string
  attribution: string
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl bg-white/50 p-6">
      <p
        className="mb-6 font-display italic text-ringside-black/85"
        style={{
          fontSize: 'clamp(1rem, 0.85rem + 0.6vw, 1.15rem)',
          fontWeight: 400,
          lineHeight: 1.65,
        }}
      >
        &ldquo;{text}&rdquo;
      </p>
      <p className="mt-auto font-body text-xs font-medium uppercase tracking-wide text-warm-gray">
        {attribution}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5 - Founding CTA                                           */
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
            Be the first name exhibitors see when they search your breed in your
            region. Early profiles get the most visibility.
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
              <PawPrint size={14} weight="fill" className="text-white/50" />
              Free to join
            </span>
            <span className="flex items-center gap-2">
              <PawPrint size={14} weight="fill" className="text-white/50" />
              No platform fees
            </span>
          </div>

          <p className="mt-10 text-sm text-white/50">
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
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Composed landing page                                              */
/* ------------------------------------------------------------------ */
export default function LandingHome({
  featuredHandlers,
}: {
  featuredHandlers: HandlerCardData[]
}) {
  return (
    <div className="bg-ring-cream">
      <HeroSection />
      <FeaturedHandlersSection handlers={featuredHandlers} />
      <DogLineupBreak />
      <SolutionBlocksSection />
      <CommunityVoiceSection />
      <FoundingCtaSection />
    </div>
  )
}
