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
} from '@phosphor-icons/react/dist/ssr'

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero (split layout, single CTA, image placeholder)     */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden">
      <div className="relative z-[1] mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text */}
          <div>
            <h1
              className="mb-6 font-display text-white"
              style={{
                fontSize: 'clamp(2.75rem, 2rem + 4vw, 5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontWeight: 700,
              }}
            >
              Find the perfect
              <br />
              handler for your dog
            </h1>

            <p className="mb-10 max-w-[480px] text-lg leading-relaxed text-white/80">
              The marketplace where dog show exhibitors connect with
              professional handlers. Post what you need, find who you trust.
            </p>

            <Link
              href="/handlers"
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-[17px] font-bold text-[#14472F] transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Find a Handler
              <ArrowRight size={20} weight="bold" />
            </Link>
          </div>

          {/* Right: image placeholder */}
          <div className="hidden lg:block">
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/10 backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-3 text-4xl text-white/40">
                  <PawPrint size={48} weight="duotone" className="mx-auto" />
                </div>
                <p className="text-sm font-medium text-white/50">
                  Your hero image here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 - How It Works (big headers, vertical steps)             */
/* ------------------------------------------------------------------ */

interface StepProps {
  number: number
  icon: React.ReactNode
  title: string
  description: string
}

function StepRow({ number, icon, title, description }: StepProps) {
  return (
    <div className="flex items-start gap-5">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0fdf4]">
        <span className="font-display text-2xl font-bold text-[#1F6B4A]">
          {number}
        </span>
      </div>
      <div>
        <h4 className="mb-1 font-display text-lg font-semibold text-gray-900">
          {title}
        </h4>
        <p className="text-[15px] leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
    </div>
  )
}

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-white"
      style={{ padding: '5rem 0' }}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mb-16 text-center">
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

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* I need a handler */}
          <div>
            <h3
              className="mb-8 font-display text-gray-900"
              style={{
                fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)',
                fontWeight: 700,
              }}
            >
              I need a handler
            </h3>
            <div className="flex flex-col gap-8">
              <StepRow
                number={1}
                icon={<MagnifyingGlass size={24} weight="bold" />}
                title="Browse handler profiles"
                description="Search by breed, region, or show circuit. See real experience, specialties, and what they charge."
              />
              <StepRow
                number={2}
                icon={<PawPrint size={24} weight="bold" />}
                title="Post what you need"
                description="Drop your breed, show dates, and what you're looking for. The right handlers will find you."
              />
              <StepRow
                number={3}
                icon={<ChatCircle size={24} weight="bold" />}
                title="Connect directly"
                description="Message handlers, work out the details, done. No middlemen, no platform fees."
              />
            </div>
          </div>

          {/* I am a handler */}
          <div>
            <h3
              className="mb-8 font-display text-gray-900"
              style={{
                fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)',
                fontWeight: 700,
              }}
            >
              I am a handler
            </h3>
            <div className="flex flex-col gap-8">
              <StepRow
                number={1}
                icon={<UserCirclePlus size={24} weight="bold" />}
                title="Show off your wins"
                description="Build a profile with your breed specialties, credentials, and fees. One link you can share everywhere."
              />
              <StepRow
                number={2}
                icon={<MagnifyingGlass size={24} weight="bold" />}
                title="See who needs you"
                description="Browse what exhibitors are posting. Filter by breed, region, and the kind of work you want."
              />
              <StepRow
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
/*  Section 3 - Request Board (Fiverr-style cards with image areas)    */
/* ------------------------------------------------------------------ */

const mockRequests = [
  {
    title: 'Standard Poodle handler needed',
    event: 'Springfield Cluster, April 12-14',
    breed: 'Standard Poodle',
    service: 'Show Handling',
    region: 'Midwest',
    posted: '2 hours ago',
    placeholderColor: 'bg-gradient-to-br from-[#d4efe0] to-[#b8edd0]',
  },
  {
    title: 'Grooming for Golden Retriever',
    event: 'Westminster area shows',
    breed: 'Golden Retriever',
    service: 'Grooming',
    region: 'Northeast',
    posted: '5 hours ago',
    placeholderColor: 'bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe]',
  },
  {
    title: 'Campaign handler wanted',
    event: 'Southeast circuit, full season',
    breed: 'Labrador Retriever',
    service: 'Campaign',
    region: 'Southeast',
    posted: '1 day ago',
    placeholderColor: 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a]',
  },
]

function RequestBoardSection() {
  return (
    <section className="bg-[#fafafa]" style={{ padding: '5rem 0' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mb-10">
          <h2
            className="mb-3 font-display text-gray-900"
            style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}
          >
            Fresh off the request board
          </h2>
          <p className="max-w-md text-gray-500">
            Exhibitors post what they need, handlers jump in. Simple as that.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {mockRequests.map((req) => (
            <div
              key={req.title}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
            >
              {/* Image / breed photo placeholder */}
              <div
                className={`${req.placeholderColor} flex h-44 items-center justify-center`}
              >
                <div className="text-center">
                  <Dog
                    size={36}
                    weight="duotone"
                    className="mx-auto text-gray-500/40"
                  />
                  <p className="mt-1 text-xs font-medium text-gray-500/50">
                    {req.breed} photo
                  </p>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-[#f0fdf4] px-3 py-1 text-xs font-semibold text-[#1F6B4A]">
                    {req.service}
                  </span>
                  <span className="text-xs text-gray-400">{req.posted}</span>
                </div>
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

        <div className="mt-10 text-center">
          <Link
            href="/requests"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1F6B4A] px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#14472F] hover:shadow-md"
          >
            View all requests
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4 - Built for the Ring (2-col, horizontal layout)          */
/* ------------------------------------------------------------------ */

const valueProps = [
  {
    icon: <UsersThree size={32} weight="duotone" />,
    title: 'Your people',
    description:
      'A place where everyone speaks dog show. Connect with handlers and exhibitors who get it.',
    color: 'bg-[#f0fdf4]',
    iconColor: 'text-[#16a34a]',
  },
  {
    icon: <CalendarBlank size={32} weight="duotone" />,
    title: 'Show calendar',
    description:
      'Find shows, circuits, and specialties near you. Never miss a ring time again.',
    color: 'bg-[#ede9fe]',
    iconColor: 'text-[#7c3aed]',
  },
  {
    icon: <Trophy size={32} weight="duotone" />,
    title: 'Learn the ropes',
    description:
      'New to the ring? Get guidance from experienced handlers on stacking, gaiting, and show strategy.',
    color: 'bg-[#fef3c7]',
    iconColor: 'text-[#d97706]',
  },
  {
    icon: <Dog size={32} weight="duotone" />,
    title: 'Breed know-how',
    description:
      'Breed-specific tips, fee benchmarks, and the kind of info that used to take years ringside to learn.',
    color: 'bg-[#fce7f3]',
    iconColor: 'text-[#db2777]',
  },
  {
    icon: <Handshake size={32} weight="duotone" />,
    title: 'Beyond word of mouth',
    description:
      'The show world is small but spread out. Meet handlers and exhibitors you would never cross paths with otherwise.',
    color: 'bg-[#e0f2fe]',
    iconColor: 'text-[#0284c7]',
  },
  {
    icon: <Star size={32} weight="duotone" />,
    title: 'More rings, more wins',
    description:
      'Track your results, build your reputation, and get in front of exhibitors looking for exactly what you do.',
    color: 'bg-[#f0fdf4]',
    iconColor: 'text-[#16a34a]',
  },
]

function WhySection() {
  return (
    <section className="bg-white" style={{ padding: '5rem 0' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mb-14 text-center">
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

        <div className="grid gap-8 sm:grid-cols-2">
          {valueProps.map((vp) => (
            <div
              key={vp.title}
              className="flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200 hover:shadow-sm"
            >
              <div
                className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${vp.color} ${vp.iconColor}`}
              >
                {vp.icon}
              </div>
              <div>
                <h4 className="mb-2 font-display text-[17px] font-bold text-gray-900">
                  {vp.title}
                </h4>
                <p className="text-[15px] leading-relaxed text-gray-500">
                  {vp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5 - Founding CTA (single message, single button)           */
/* ------------------------------------------------------------------ */

function FoundingCtaSection() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#14472F] to-[#1F6B4A]">
          <div className="px-8 py-16 text-center lg:px-16 lg:py-20">
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

            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-[17px] font-bold text-[#14472F] transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Create your free profile
              <ArrowRight size={20} weight="bold" />
            </Link>

            <div className="mx-auto mt-10 flex max-w-sm flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/50">
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
