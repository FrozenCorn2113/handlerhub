import Image from 'next/image'
import Link from 'next/link'

import {
  ArrowRight,
  CalendarBlank,
  ChatCircle,
  Crown,
  Dog,
  Handshake,
  MagnifyingGlass,
  MapPin,
  PawPrint,
  Sparkle,
  Star,
  Trophy,
  UserCirclePlus,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero (dark green, bold, Fiverr-style)                  */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden">
      <div className="relative z-[1] mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
            <PawPrint size={16} weight="fill" />
            The dog show community, connected
          </div>

          <h1
            className="mb-6 font-display text-white"
            style={{
              fontSize: 'var(--fs-display)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontWeight: 700,
            }}
          >
            Where great dogs
            <br />
            meet great handlers
          </h1>

          <p className="mx-auto mb-10 max-w-[520px] text-lg leading-relaxed text-white/75">
            Find your next handler, pick up new clients, or connect with people
            who actually speak dog show.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/handlers"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[15px] font-semibold text-[#14472F] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Find a Handler
              <ArrowRight size={18} weight="bold" />
            </Link>
            <Link
              href="/for-handlers"
              className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-white/30 px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              List Your Services
            </Link>
          </div>
        </div>

        {/* Floating cards */}
        <div className="mt-16 hidden items-end justify-center gap-5 lg:flex">
          <FloatingCard
            color="bg-[#f0fdf4]"
            icon={<Trophy size={20} weight="fill" className="text-[#16a34a]" />}
            label="Best in Show"
            sublabel="Springfield Cluster 2026"
          />
          <FloatingCard
            color="bg-[#fef3c7]"
            icon={<Star size={20} weight="fill" className="text-[#d97706]" />}
            label="Top Rated Handler"
            sublabel="4.9 stars, 47 reviews"
          />
          <FloatingCard
            color="bg-[#ede9fe]"
            icon={
              <UsersThree size={20} weight="fill" className="text-[#7c3aed]" />
            }
            label="500+ Handlers"
            sublabel="and growing every week"
          />
        </div>
      </div>
    </section>
  )
}

function FloatingCard({
  color,
  icon,
  label,
  sublabel,
}: {
  color: string
  icon: React.ReactNode
  label: string
  sublabel: string
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl ${color} px-5 py-4 shadow-lg`}
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{sublabel}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 - How It Works (two-track, clean cards)                  */
/* ------------------------------------------------------------------ */

interface StepProps {
  number: number
  icon: React.ReactNode
  title: string
  description: string
}

function StepCard({ number, icon, title, description }: StepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0fdf4] text-[#1F6B4A]">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Step {number}
        </p>
        <h4 className="mb-1 font-display text-base font-semibold text-gray-900">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-gray-500">{description}</p>
      </div>
    </div>
  )
}

function HowItWorksSection() {
  return (
    <section className="how-it-works-section" style={{ padding: '5rem 0' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            className="mb-3 font-display text-gray-900"
            style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
          >
            Here&apos;s how it works
          </h2>
          <p className="mx-auto max-w-md text-gray-500">
            Whether you&apos;re showing dogs or handling them, getting started
            takes about two minutes.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* For Exhibitors */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#f0fdf4] px-3 py-1.5 text-xs font-semibold text-[#1F6B4A]">
              <Dog size={14} weight="bold" />
              For Exhibitors
            </div>
            <div className="flex flex-col gap-8">
              <StepCard
                number={1}
                icon={<MagnifyingGlass size={24} weight="bold" />}
                title="Browse handler profiles"
                description="Search by breed, region, or show circuit. See real experience, specialties, and what they charge."
              />
              <StepCard
                number={2}
                icon={<PawPrint size={24} weight="bold" />}
                title="Post what you need"
                description="Drop your breed, show dates, and what you're looking for. The right handlers will find you."
              />
              <StepCard
                number={3}
                icon={<ChatCircle size={24} weight="bold" />}
                title="Connect directly"
                description="Message handlers, work out the details, done. No middlemen, no platform fees."
              />
            </div>
          </div>

          {/* For Handlers */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#fef3c7] px-3 py-1.5 text-xs font-semibold text-[#92400e]">
              <Crown size={14} weight="bold" />
              For Handlers
            </div>
            <div className="flex flex-col gap-8">
              <StepCard
                number={1}
                icon={<UserCirclePlus size={24} weight="bold" />}
                title="Show off your wins"
                description="Build a profile with your breed specialties, credentials, and fees. One link you can share everywhere."
              />
              <StepCard
                number={2}
                icon={<MagnifyingGlass size={24} weight="bold" />}
                title="See who needs you"
                description="Browse what exhibitors are posting. Filter by breed, region, and the kind of work you want."
              />
              <StepCard
                number={3}
                icon={<Handshake size={24} weight="bold" />}
                title="Pick up new clients"
                description="Reach exhibitors you'd never meet through word of mouth alone. More dogs, more rings, more wins."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 3 - Request Board (Fiverr-style cards)                     */
/* ------------------------------------------------------------------ */

const mockRequests = [
  {
    title: 'Standard Poodle handler needed',
    event: 'Springfield Cluster, April 12-14',
    breed: 'Standard Poodle',
    service: 'Show Handling',
    region: 'Midwest',
    posted: '2 hours ago',
    color: 'bg-[#f0fdf4]',
  },
  {
    title: 'Grooming for Golden Retriever',
    event: 'Westminster area shows',
    breed: 'Golden Retriever',
    service: 'Grooming',
    region: 'Northeast',
    posted: '5 hours ago',
    color: 'bg-[#ede9fe]',
  },
  {
    title: 'Campaign handler wanted',
    event: 'Southeast circuit, full season',
    breed: 'Labrador Retriever',
    service: 'Campaign',
    region: 'Southeast',
    posted: '1 day ago',
    color: 'bg-[#fef3c7]',
  },
]

function RequestBoardSection() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2
              className="mb-2 font-display text-gray-900"
              style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
            >
              Fresh off the request board
            </h2>
            <p className="max-w-md text-gray-500">
              Exhibitors post what they need, handlers jump in. Simple as that.
            </p>
          </div>
          <Link
            href="/requests"
            className="hidden items-center gap-1 text-sm font-semibold text-[#1F6B4A] transition-colors hover:text-[#14472F] sm:inline-flex"
          >
            View all
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {mockRequests.map((req) => (
            <div
              key={req.title}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
            >
              {/* Colored accent bar */}
              <div className={`${req.color} px-6 py-4`}>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-gray-700">
                    {req.service}
                  </span>
                  <span className="text-xs text-gray-500">{req.posted}</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="mb-1 font-display text-base font-semibold text-gray-900">
                  {req.title}
                </h4>
                <p className="mb-4 text-sm text-gray-500">{req.event}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                    <PawPrint size={12} weight="bold" />
                    {req.breed}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                    <MapPin size={12} weight="bold" />
                    {req.region}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/requests"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F6B4A]"
          >
            View all requests
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4 - Built for the Ring (value props, Fiverr-style cards)   */
/* ------------------------------------------------------------------ */

const valueProps = [
  {
    icon: <UsersThree size={24} weight="duotone" />,
    title: 'Your people',
    description:
      'A place where everyone speaks dog show. Connect with handlers and exhibitors who get it.',
    color: 'bg-[#f0fdf4]',
    iconColor: 'text-[#16a34a]',
  },
  {
    icon: <CalendarBlank size={24} weight="duotone" />,
    title: 'Show calendar',
    description:
      'Find shows, circuits, and specialties near you. Never miss a ring time again.',
    color: 'bg-[#ede9fe]',
    iconColor: 'text-[#7c3aed]',
  },
  {
    icon: <Trophy size={24} weight="duotone" />,
    title: 'Learn the ropes',
    description:
      'New to the ring? Get guidance from experienced handlers on stacking, gaiting, and show strategy.',
    color: 'bg-[#fef3c7]',
    iconColor: 'text-[#d97706]',
  },
  {
    icon: <Dog size={24} weight="duotone" />,
    title: 'Breed know-how',
    description:
      'Breed-specific tips, fee benchmarks, and the kind of info that used to take years ringside to learn.',
    color: 'bg-[#fce7f3]',
    iconColor: 'text-[#db2777]',
  },
  {
    icon: <Handshake size={24} weight="duotone" />,
    title: 'Beyond word of mouth',
    description:
      'The show world is small but spread out. Meet handlers and exhibitors you&apos;d never cross paths with otherwise.',
    color: 'bg-[#e0f2fe]',
    iconColor: 'text-[#0284c7]',
  },
  {
    icon: <Star size={24} weight="duotone" />,
    title: 'More rings, more wins',
    description:
      'Track your results, build your reputation, and get in front of exhibitors looking for exactly what you do.',
    color: 'bg-[#f0fdf4]',
    iconColor: 'text-[#16a34a]',
  },
]

function WhySection() {
  return (
    <section className="bg-[#fafafa]" style={{ padding: '5rem 0' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            className="mb-3 font-display text-gray-900"
            style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
          >
            Built for the ring
          </h2>
          <p className="mx-auto max-w-md text-gray-500">
            Everything a handler or exhibitor needs, nothing they don&apos;t.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((vp) => (
            <div
              key={vp.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-gray-200 hover:shadow-md"
            >
              <div
                className={`mb-4 inline-flex size-12 items-center justify-center rounded-2xl ${vp.color} ${vp.iconColor}`}
              >
                {vp.icon}
              </div>
              <h4 className="mb-2 font-display text-[15px] font-semibold text-gray-900">
                {vp.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-500">
                {vp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5 - Founding CTA                                           */
/* ------------------------------------------------------------------ */

function FoundingCtaSection() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#14472F] to-[#1F6B4A]">
          <div className="px-8 py-16 text-center lg:px-16 lg:py-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white/90">
              <Sparkle size={16} weight="fill" />
              Early access
            </div>

            <h2
              className="mb-4 font-display text-white"
              style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
            >
              Join the Founding 100
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-white/70">
              We&apos;re building HandlerHub with our first members. Get in
              early, shape the platform, and be the first name exhibitors see.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-[#14472F] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Create Your Profile
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                Post a Request
              </Link>
            </div>

            <div className="mx-auto mt-12 flex max-w-md flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <PawPrint size={14} weight="fill" />
                Free to join
              </span>
              <span className="flex items-center gap-2">
                <Star size={14} weight="fill" />
                No platform fees
              </span>
              <span className="flex items-center gap-2">
                <Trophy size={14} weight="fill" />
                Founding member badge
              </span>
            </div>
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
    <>
      <HeroSection />
      <HowItWorksSection />
      <RequestBoardSection />
      <WhySection />
      <FoundingCtaSection />
    </>
  )
}
