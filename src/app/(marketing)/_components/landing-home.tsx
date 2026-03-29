'use client'

import Link from 'next/link'

import {
  ArrowRight,
  CalendarBlank,
  Dog,
  Handshake,
  MapPin,
  PawPrint,
  Star,
  Trophy,
  UsersThree,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Breed emoji helper                                                  */
/* ------------------------------------------------------------------ */
const breedEmoji: Record<string, string> = {
  'Standard Poodle': '\uD83E\uDDA9',
  'Golden Retriever': '\uD83D\uDC15',
  'Labrador Retriever': '\uD83D\uDC36',
}

/* ------------------------------------------------------------------ */
/*  Floating paw accent (decorative, drifting animation)               */
/* ------------------------------------------------------------------ */
function FloatingPaw({
  size,
  top,
  left,
  delay,
  duration = 6,
}: {
  size: number
  top: string
  left: string
  delay: number
  duration?: number
}) {
  return (
    <motion.div
      className="pointer-events-none absolute text-white/[0.06]"
      style={{ top, left }}
      initial={{ opacity: 0, y: 0, rotate: -10 }}
      animate={{ opacity: 1, y: [0, -18, 0], rotate: [-10, 8, -10] }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <PawPrint size={size} weight="fill" />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sparkle decoration                                                  */
/* ------------------------------------------------------------------ */
function Sparkle({
  className = '',
  size = 'text-sm',
  color = 'text-[#F5EFA0]',
}: {
  className?: string
  size?: string
  color?: string
}) {
  return (
    <motion.span
      className={`inline-block select-none ${size} ${color} ${className}`}
      animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      &#10022;
    </motion.span>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
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
        style={{ height: 'clamp(30px, 4vw, 60px)' }}
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
/*  Section 1 — Hero                                                   */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="hero-section relative min-h-[100svh] overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#14472F] via-[#1a5438] to-[#237a54]">
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

      {/* Floating paw accents */}
      <FloatingPaw size={48} top="15%" left="8%" delay={0.5} />
      <FloatingPaw size={32} top="25%" left="85%" delay={1.2} duration={7} />
      <FloatingPaw size={40} top="65%" left="12%" delay={2.0} duration={8} />
      <FloatingPaw size={28} top="70%" left="88%" delay={0.8} duration={6.5} />
      <FloatingPaw size={36} top="40%" left="92%" delay={1.8} duration={7.5} />

      <div className="relative z-[1] flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        {/* Brand badge - logo only, not the h1 */}
        <img
          src="/handler-hub-logo.png"
          alt="HandlerHub"
          className="hero-logo mb-8 h-24 w-24 object-contain lg:h-32 lg:w-32"
        />

        {/* Tagline as the primary headline */}
        <h1
          className="hero-h1 mb-6 font-display text-white"
          style={{
            fontSize: 'clamp(2.5rem, 2rem + 5vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 700,
          }}
        >
          <Sparkle className="mr-2 align-top" size="text-2xl lg:text-3xl" />
          Where great dogs
          <br />
          meet great handlers
          <Sparkle className="ml-2 align-top" size="text-2xl lg:text-3xl" />
        </h1>

        {/* Supporting text */}
        <p
          className="hero-sub mb-10 max-w-lg font-display text-white/60"
          style={{
            fontSize: 'clamp(1rem, 0.85rem + 0.8vw, 1.25rem)',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            fontWeight: 400,
          }}
        >
          HandlerHub is the dog show community&apos;s home base. Find handlers,
          post requests, and connect with your people.
        </p>

        {/* Single CTA */}
        <div className="hero-cta">
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
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="hero-scroll-inner flex flex-col items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 — How It Works                                           */
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
        <motion.div
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#14472F] text-white"
          whileHover={{ scale: 1.1, rotate: -8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <PawPrint size={22} weight="fill" />
        </motion.div>
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
    <section
      className="relative py-6 lg:py-10"
      style={{ background: '#F8F4EE' }}
    >
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
                <Sparkle className="mr-2" color="text-[#D4621A]" />
                Here&apos;s how it works
                <Sparkle className="ml-2" color="text-[#D4621A]" />
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
    accentColor: '#D4621A',
  },
]

function RequestBoardSection() {
  return (
    <section style={{ padding: '5rem 0', background: '#F8F4EE' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <span className="mb-4 inline-block font-display text-sm font-bold uppercase tracking-[0.15em] text-[#D4621A]">
              Live requests
            </span>
            <h2
              className="mb-3 font-display text-[#14472F]"
              style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
            >
              Fresh off the request board
              <Sparkle className="ml-3 align-middle" color="text-[#D4621A]" />
            </h2>
            <p className="max-w-md text-[#14472F]/50">
              Exhibitors post what they need, handlers jump in. Simple as that.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {mockRequests.map((req, i) => (
            <ScrollReveal key={req.title} delay={i * 0.1}>
              <Link href="/requests" className="block h-full">
                <motion.div
                  className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-xl"
                  whileHover={{ y: -8, rotate: 0.5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Image placeholder with accent stripe */}
                  <div className="relative flex h-44 items-center justify-center bg-[#f8f6f3]">
                    <div
                      className="absolute left-0 top-0 h-1 w-full"
                      style={{ background: req.accentColor }}
                    />
                    <div className="text-center">
                      <span className="text-4xl" aria-hidden="true">
                        {breedEmoji[req.breed] || '\uD83D\uDC3E'}
                      </span>
                      <p className="mt-2 text-xs font-medium text-[#14472F]/30">
                        {req.breed}
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
                    <p className="mb-4 text-sm text-[#14472F]/50">
                      {req.event}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#14472F]/50">
                        <PawPrint size={12} weight="bold" />
                        {req.breed}
                      </span>
                      <span className="text-[#14472F]/20">&middot;</span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#14472F]/50">
                        <MapPin size={12} weight="bold" />
                        {req.region}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
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
/*  Section 4 — Built for the Ring                                     */
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
                <Sparkle className="mr-2" />
                Built for the ring
                <Sparkle className="ml-2" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
            {valueProps.map((vp, i) => (
              <ScrollReveal key={vp.title} delay={i * 0.08}>
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
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
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Founding CTA                                           */
/* ------------------------------------------------------------------ */

function FoundingCtaSection() {
  return (
    <section style={{ padding: '5rem 0 6rem', background: '#F8F4EE' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <motion.img
              src="/handler-hub-logo.png"
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
              <Sparkle className="mr-2" color="text-[#D4621A]" />
              Join the Founding 100
              <Sparkle className="ml-2" color="text-[#D4621A]" />
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
  return (
    <div>
      <HeroSection />
      <WaveDivider topColor="#1F6B4A" bottomColor="#F8F4EE" />
      <HowItWorksSection />
      <RequestBoardSection />
      <WaveDivider topColor="#F8F4EE" bottomColor="#ffffff" />
      <WhySection />
      <WaveDivider topColor="#ffffff" bottomColor="#F8F4EE" flip />
      <FoundingCtaSection />
    </div>
  )
}
