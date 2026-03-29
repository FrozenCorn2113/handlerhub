'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import {
  ArrowRight,
  CalendarBlank,
  ChatCircle,
  Dog,
  Handshake,
  MagnifyingGlass,
  MapPin,
  PawPrint,
  Star,
  Trophy,
  UserCirclePlus,
  UsersThree,
} from '@phosphor-icons/react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Intro Loader — brand reveal, then slide-up to show page            */
/* ------------------------------------------------------------------ */
function IntroLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background:
          'linear-gradient(135deg, #14472F 0%, #1F6B4A 60%, #237a54 100%)',
      }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.img
          src="/handler-hub-logo-option-4.png"
          alt="HandlerHub"
          className="h-28 w-28 object-contain"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.div
          className="flex items-baseline gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span className="font-display text-4xl font-light tracking-tight text-white">
            Handler
          </span>
          <span className="font-body text-3xl font-semibold tracking-wide text-white">
            Hub
          </span>
        </motion.div>
        <motion.div
          className="h-[2px] bg-white/40"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 1.0, duration: 0.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Scroll-animated wrapper                                            */
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Wave divider SVG                                                   */
/* ------------------------------------------------------------------ */
function WaveDivider({
  topColor,
  bottomColor,
  flip = false,
}: {
  topColor: string
  bottomColor: string
  flip?: boolean
}) {
  return (
    <div
      className="relative -mt-px w-full overflow-hidden"
      style={{
        background: bottomColor,
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        preserveAspectRatio="none"
        style={{ height: 'clamp(60px, 8vw, 120px)' }}
      >
        <path
          d="M0,0 L1440,0 L1440,40 C1200,110 900,120 720,80 C540,40 240,10 0,70 L0,0 Z"
          fill={topColor}
        />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 1 — Hero (full-bleed, brand-first)                         */
/* ------------------------------------------------------------------ */
function HeroSection({ loaded }: { loaded: boolean }) {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])
  const heroY = useTransform(scrollY, [0, 400], [0, 60])

  return (
    <section className="hero-section relative min-h-[100svh] overflow-hidden">
      {/* Full-bleed background image placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#14472F] via-[#1a5438] to-[#237a54]">
          {/* Brett: replace this div with a real <Image> of a dog show scene */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
      </div>

      <motion.div
        className="relative z-[1] flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Brand badge */}
        <motion.img
          src="/handler-hub-logo-option-4.png"
          alt="HandlerHub"
          className="mb-8 h-24 w-24 object-contain lg:h-32 lg:w-32"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        />

        {/* Brand name — hero-level */}
        <motion.h1
          className="mb-2 font-display text-white"
          style={{
            fontSize: 'clamp(3.5rem, 3rem + 5vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            fontWeight: 700,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          HandlerHub
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mb-10 max-w-lg font-display text-white/70"
          style={{
            fontSize: 'clamp(1.1rem, 0.9rem + 1vw, 1.5rem)',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            fontWeight: 500,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Where great dogs meet great handlers
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            href="/handlers"
            className="group inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 font-display text-lg font-bold text-[#14472F] transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            Find a Handler
            <ArrowRight
              size={22}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 — How It Works (inset background, scroll animations)     */
/* ------------------------------------------------------------------ */

function StepItem({
  number,
  title,
  description,
  delay,
}: {
  number: number
  title: string
  description: string
  delay: number
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="flex items-start gap-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#14472F] font-display text-xl font-bold text-white">
          {number}
        </div>
        <div>
          <h4 className="mb-1 font-display text-lg font-bold text-[#14472F]">
            {title}
          </h4>
          <p className="text-[15px] leading-relaxed text-[#14472F]/60">
            {description}
          </p>
        </div>
      </div>
    </ScrollReveal>
  )
}

function HowItWorksSection() {
  return (
    <section className="relative bg-white py-6 lg:py-10">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Inset background container */}
        <div
          className="overflow-hidden rounded-[2rem] px-8 py-16 lg:rounded-[3rem] lg:px-16 lg:py-24"
          style={{
            background:
              'linear-gradient(180deg, #d4efe0 0%, #e8f5ee 50%, #f0fdf4 100%)',
          }}
        >
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block font-display text-sm font-bold uppercase tracking-[0.15em] text-[#1F6B4A]">
                Getting started
              </span>
              <h2
                className="font-display text-[#14472F]"
                style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
              >
                Here&apos;s how it works
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* I need a handler */}
            <div>
              <ScrollReveal>
                <h3 className="mb-10 font-display text-2xl font-bold text-[#14472F] lg:text-3xl">
                  I need a handler
                </h3>
              </ScrollReveal>
              <div className="flex flex-col gap-8">
                <StepItem
                  number={1}
                  title="Browse handler profiles"
                  description="Search by breed, region, or show circuit. See real experience, specialties, and what they charge."
                  delay={0.1}
                />
                <StepItem
                  number={2}
                  title="Post what you need"
                  description="Drop your breed, show dates, and what you're looking for. The right handlers will find you."
                  delay={0.2}
                />
                <StepItem
                  number={3}
                  title="Connect directly"
                  description="Message handlers, work out the details, done. No middlemen, no platform fees."
                  delay={0.3}
                />
              </div>
            </div>

            {/* I am a handler */}
            <div>
              <ScrollReveal>
                <h3 className="mb-10 font-display text-2xl font-bold text-[#14472F] lg:text-3xl">
                  I am a handler
                </h3>
              </ScrollReveal>
              <div className="flex flex-col gap-8">
                <StepItem
                  number={1}
                  title="Show off your wins"
                  description="Build a profile with your breed specialties, credentials, and fees. One link you can share everywhere."
                  delay={0.1}
                />
                <StepItem
                  number={2}
                  title="See who needs you"
                  description="Browse what exhibitors are posting. Filter by breed, region, and the kind of work you want."
                  delay={0.2}
                />
                <StepItem
                  number={3}
                  title="Pick up new clients"
                  description="Reach exhibitors you'd never meet through word of mouth alone. More dogs, more rings, more wins."
                  delay={0.3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Request Board                                          */
/* ------------------------------------------------------------------ */

const mockRequests = [
  {
    title: 'Standard Poodle handler needed',
    event: 'Springfield Cluster, April 12-14',
    breed: 'Standard Poodle',
    service: 'Show Handling',
    region: 'Midwest',
    posted: '2 hours ago',
    accentColor: '#1F6B4A',
  },
  {
    title: 'Grooming for Golden Retriever',
    event: 'Westminster area shows',
    breed: 'Golden Retriever',
    service: 'Grooming',
    region: 'Northeast',
    posted: '5 hours ago',
    accentColor: '#D4621A',
  },
  {
    title: 'Campaign handler wanted',
    event: 'Southeast circuit, full season',
    breed: 'Labrador Retriever',
    service: 'Campaign',
    region: 'Southeast',
    posted: '1 day ago',
    accentColor: '#7c3aed',
  },
]

function RequestBoardSection() {
  return (
    <section className="bg-white" style={{ padding: '5rem 0' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="mb-4 inline-block font-display text-sm font-bold uppercase tracking-[0.15em] text-[#1F6B4A]">
              Live requests
            </span>
            <h2
              className="mb-3 font-display text-[#14472F]"
              style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
            >
              Fresh off the request board
            </h2>
            <p className="max-w-md text-[#14472F]/50">
              Exhibitors post what they need, handlers jump in. Simple as that.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {mockRequests.map((req, i) => (
            <ScrollReveal key={req.title} delay={i * 0.1}>
              <div className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Image placeholder with accent stripe */}
                <div className="relative flex h-44 items-center justify-center bg-[#f8f6f3]">
                  <div
                    className="absolute left-0 top-0 h-1 w-full"
                    style={{ background: req.accentColor }}
                  />
                  <div className="text-center">
                    <Dog
                      size={40}
                      weight="duotone"
                      className="mx-auto text-[#14472F]/15"
                    />
                    <p className="mt-2 text-xs font-medium text-[#14472F]/30">
                      {req.breed} photo
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold text-white"
                      style={{ background: req.accentColor }}
                    >
                      {req.service}
                    </span>
                    <span className="text-xs text-[#14472F]/40">
                      {req.posted}
                    </span>
                  </div>
                  <h4 className="mb-1 font-display text-base font-bold text-[#14472F]">
                    {req.title}
                  </h4>
                  <p className="mb-4 text-sm text-[#14472F]/50">{req.event}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#14472F]/50">
                      <PawPrint size={12} weight="bold" />
                      {req.breed}
                    </span>
                    <span className="text-[#14472F]/20">·</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#14472F]/50">
                      <MapPin size={12} weight="bold" />
                      {req.region}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              href="/requests"
              className="group inline-flex items-center gap-2 rounded-2xl bg-[#14472F] px-10 py-4 font-display text-[15px] font-bold text-white transition-all hover:-translate-y-1 hover:bg-[#1a5438] hover:shadow-lg"
            >
              View all requests
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Built for the Ring (inset, icon rows)                  */
/* ------------------------------------------------------------------ */

const valueProps = [
  {
    icon: <UsersThree size={28} weight="duotone" />,
    title: 'Your people',
    description:
      'A place where everyone speaks dog show. Connect with handlers and exhibitors who get it.',
  },
  {
    icon: <CalendarBlank size={28} weight="duotone" />,
    title: 'Show calendar',
    description:
      'Find shows, circuits, and specialties near you. Never miss a ring time again.',
  },
  {
    icon: <Trophy size={28} weight="duotone" />,
    title: 'Learn the ropes',
    description:
      'New to the ring? Get guidance from experienced handlers on stacking, gaiting, and show strategy.',
  },
  {
    icon: <Dog size={28} weight="duotone" />,
    title: 'Breed know-how',
    description:
      'Breed-specific tips, fee benchmarks, and the kind of info that used to take years ringside to learn.',
  },
  {
    icon: <Handshake size={28} weight="duotone" />,
    title: 'Beyond word of mouth',
    description:
      'The show world is small but spread out. Meet handlers and exhibitors you would never cross paths with otherwise.',
  },
  {
    icon: <Star size={28} weight="duotone" />,
    title: 'More rings, more wins',
    description:
      'Track your results, build your reputation, and get in front of exhibitors looking for exactly what you do.',
  },
]

function WhySection() {
  return (
    <section className="relative bg-white py-6 lg:py-10">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Inset dark background */}
        <div
          className="overflow-hidden rounded-[2rem] px-8 py-16 lg:rounded-[3rem] lg:px-16 lg:py-24"
          style={{
            background:
              'linear-gradient(135deg, #14472F 0%, #1a5438 50%, #1F6B4A 100%)',
          }}
        >
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block font-display text-sm font-bold uppercase tracking-[0.15em] text-white/50">
                Why HandlerHub
              </span>
              <h2
                className="font-display text-white"
                style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
              >
                Built for the ring
              </h2>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
            {valueProps.map((vp, i) => (
              <ScrollReveal key={vp.title} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/80">
                    {vp.icon}
                  </div>
                  <div>
                    <h4 className="mb-1 font-display text-[17px] font-bold text-white">
                      {vp.title}
                    </h4>
                    <p className="text-[15px] leading-relaxed text-white/55">
                      {vp.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Founding CTA (full-width, confident)                   */
/* ------------------------------------------------------------------ */

function FoundingCtaSection() {
  return (
    <section className="bg-white" style={{ padding: '5rem 0 6rem' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <motion.img
              src="/handler-hub-logo-option-4.png"
              alt="HandlerHub"
              className="mb-8 h-20 w-20 object-contain"
              whileInView={{ rotate: [0, -5, 5, 0] }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <h2
              className="mb-4 font-display text-[#14472F]"
              style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
            >
              Join the Founding 100
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-[#14472F]/50">
              We&apos;re building HandlerHub with our first members. Get in
              early, shape the platform, and be the first name exhibitors see.
            </p>

            <Link
              href="/register"
              className="group inline-flex items-center gap-3 rounded-2xl bg-[#14472F] px-10 py-5 font-display text-lg font-bold text-white transition-all hover:-translate-y-1 hover:bg-[#1a5438] hover:shadow-2xl"
            >
              Create your free profile
              <ArrowRight
                size={22}
                weight="bold"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <div className="mt-8 flex items-center gap-6 text-sm text-[#14472F]/40">
              <span className="flex items-center gap-2">
                <PawPrint size={14} weight="fill" />
                Free to join
              </span>
              <span className="flex items-center gap-2">
                <Star size={14} weight="fill" />
                No platform fees
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Composed landing page                                              */
/* ------------------------------------------------------------------ */

export default function LandingHome() {
  const [loading, setLoading] = useState(true)
  const [loaded, setLoaded] = useState(false)

  const handleLoaderComplete = () => {
    setLoading(false)
    // Small delay so exit animation plays before content animates
    setTimeout(() => setLoaded(true), 100)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <IntroLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <div>
        <HeroSection loaded={loaded} />
        <WaveDivider topColor="#1F6B4A" bottomColor="#ffffff" />
        <HowItWorksSection />
        <RequestBoardSection />
        <WhySection />
        <FoundingCtaSection />
      </div>
    </>
  )
}
