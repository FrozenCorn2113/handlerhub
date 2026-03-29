'use client'

import Image from 'next/image'
import Link from 'next/link'

import { siteLogoSrc } from '@/config/site'

import {
  ArrowRight,
  Handshake,
  MagnifyingGlass,
  MapPin,
  PawPrint,
  Star,
  UsersThree,
} from '@phosphor-icons/react'
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
  const popularBreeds = [
    { label: 'Standard Poodle', query: 'Standard Poodle' },
    { label: 'Golden Retriever', query: 'Golden Retriever' },
    { label: 'German Shepherd', query: 'German Shepherd' },
    { label: 'Westminster', query: 'Westminster' },
  ]

  return (
    <section className="bg-white pb-0 pt-12 lg:pt-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.15em] text-[#D4621A]">
            The dog show community&apos;s home base
          </p>

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

          {/* Popular breed pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Popular:
            </span>
            {popularBreeds.map((breed) => (
              <Link
                key={breed.query}
                href={`/handlers?q=${encodeURIComponent(breed.query)}`}
                className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-[#14472F] hover:text-[#14472F]"
              >
                {breed.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Dog lineup banner */}
      <div className="mt-12 flex justify-center lg:mt-16">
        <Image
          src="/images/dog-lineup.png"
          alt="Dog lineup banner"
          width={1200}
          height={400}
          className="w-full max-w-[1200px] object-contain"
          priority
        />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 - Browse by service                                      */
/* ------------------------------------------------------------------ */
const services = [
  {
    title: 'Show Handling',
    description: 'Ring-ready professionals for your breed',
    image: '/images/show-rottweiler.jpg',
    href: '/handlers?service=handling',
  },
  {
    title: 'Grooming',
    description: 'Breed-specific show prep and styling',
    image: '/images/dog-love.jpg',
    href: '/handlers?service=grooming',
  },
  {
    title: 'Training',
    description: 'Gaiting, stacking, and ring conditioning',
    image: '/images/dog-action.jpg',
    href: '/handlers?service=training',
  },
  {
    title: 'Campaign',
    description: 'Full-season strategy and management',
    image: '/images/dog-portrait.jpg',
    href: '/handlers?service=campaign',
  },
]

function ServiceSection() {
  return (
    <section className="border-t border-gray-100 bg-[#FAFAF8] py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="mb-12 font-display text-2xl font-bold text-[#14472F] lg:text-3xl">
            Browse by service
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.08}>
              <Link href={svc.href} className="group block">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[#14472F] group-hover:text-[#1F6B4A]">
                  {svc.title}
                </h3>
                <p className="mt-1 text-base text-gray-600">
                  {svc.description}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 3 - Photo break / value prop                               */
/* ------------------------------------------------------------------ */
function PhotoBreakSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[400px] lg:h-[480px]">
        <img
          src="/images/hero-connection.jpg"
          alt="Handler with dog"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#14472F]/70" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div>
            <p className="mx-auto max-w-xl text-xl leading-relaxed text-white lg:text-2xl">
              The dog show community deserves a place where finding the right
              handler is simple, transparent, and open to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4 - How it works                                           */
/* ------------------------------------------------------------------ */
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Search',
      description:
        'Browse by breed, region, or show circuit. See real experience, specialties, and what they charge.',
      icon: <MagnifyingGlass size={28} weight="duotone" />,
    },
    {
      number: '02',
      title: 'Connect',
      description:
        'Message handlers directly, work out the details. No middlemen, no platform fees.',
      icon: <UsersThree size={28} weight="duotone" />,
    },
    {
      number: '03',
      title: 'Compete',
      description:
        'Your dog, the right handler, the ring. More entries, more opportunities, less stress.',
      icon: <Handshake size={28} weight="duotone" />,
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-2 text-base font-semibold uppercase tracking-[0.15em] text-[#D4621A]">
              For Exhibitors
            </p>
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.15em] text-gray-600">
              How it works
            </p>
            <h2
              className="font-display text-[#14472F]"
              style={{
                fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)',
                fontWeight: 700,
              }}
            >
              Three steps to ringside
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14472F]/5 text-[#14472F]">
                  {step.icon}
                </div>
                <span className="mb-2 block font-display text-sm font-bold uppercase tracking-widest text-[#D4621A]">
                  Step {step.number}
                </span>
                <h3 className="mb-3 font-display text-xl font-bold text-[#14472F]">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
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
            className="mx-auto mb-8 h-20 w-20 rounded-2xl object-contain"
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
/*  Composed landing page                                              */
/* ------------------------------------------------------------------ */
export default function LandingHome() {
  return (
    <div>
      <HeroSection />
      <ServiceSection />
      <PhotoBreakSection />
      <HowItWorksSection />
      <RequestBoardSection />
      <FoundingCtaSection />
    </div>
  )
}
