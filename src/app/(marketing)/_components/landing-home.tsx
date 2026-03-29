import Image from 'next/image'
import Link from 'next/link'

import {
  Binoculars,
  Books,
  CalendarBlank,
  ChatCircle,
  ClipboardText,
  GraduationCap,
  Graph,
  Handshake,
  MagnifyingGlass,
  MapPin,
  PawPrint,
  Sparkle,
  Target,
  TrendUp,
  UserCirclePlus,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero                                                   */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section
      className="hero-section relative overflow-hidden"
      style={{ padding: 'var(--section-py-xl) 0' }}
    >
      <div className="relative z-[1] mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          {/* Left: text */}
          <div className="flex-1 text-center lg:max-w-[600px] lg:text-left">
            <h1
              className="mb-8 font-display font-light text-[#1C1208]"
              style={{
                fontSize: 'var(--fs-display)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
              }}
            >
              Where great dogs
              <br />
              meet great handlers.
            </h1>

            <p
              className="mx-auto mb-12 max-w-[560px] font-body text-[#4A3E2E] lg:mx-0"
              style={{ fontSize: '18px', lineHeight: 1.7, fontWeight: 400 }}
            >
              The dog show world runs on relationships. HandlerHub makes it easy
              to find your next handler, pick up new clients, or connect with
              people who actually get it.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/handlers" className="btn-primary">
                Find a Handler
              </Link>
              <Link href="/for-handlers" className="btn-secondary">
                List Your Services
              </Link>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative hidden flex-1 lg:block lg:max-w-[580px]">
            <Image
              src="/images/brand/hero-artwork.png"
              alt="Professional dog handler at a conformation show ring"
              width={580}
              height={520}
              className="w-full rounded-2xl"
              style={{ maxHeight: '520px', objectFit: 'cover' }}
              priority
            />
            {/* Floating stat badges overlay */}
            <div
              className="absolute bottom-6 left-6 z-10"
              style={{
                filter: 'drop-shadow(0 8px 24px rgba(28,18,8,0.14))',
              }}
            >
              <Image
                src="/images/brand/stat-badges.png"
                alt="500+ verified handlers, 50+ events, free to join"
                width={320}
                height={100}
                style={{ width: '320px', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 - How It Works (Two Tracks)                              */
/* ------------------------------------------------------------------ */

interface StepProps {
  icon: React.ReactNode
  title: string
  description: string
}

function StepCard({ icon, title, description }: StepProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex shrink-0 items-center justify-center rounded-[10px] bg-sage"
        style={{ width: 56, height: 56 }}
      >
        {icon}
      </div>
      <div>
        <h4
          className="mb-1 font-body text-base font-semibold text-[#1C1208]"
          style={{ lineHeight: 1.4, letterSpacing: 0 }}
        >
          {title}
        </h4>
        <p className="text-sm text-[#4A3E2E]" style={{ lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </div>
  )
}

function HowItWorksSection() {
  return (
    <section
      className="how-it-works-section"
      style={{ padding: 'var(--section-py-md) 0' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2
          className="mb-16 text-center font-display font-light text-[#1C1208]"
          style={{
            fontSize: 'var(--fs-h2)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Here&apos;s how it works
        </h2>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* For Exhibitors */}
          <div>
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.12em] text-paddock-green">
              For Exhibitors
            </p>
            <div className="flex flex-col gap-8">
              <StepCard
                icon={
                  <MagnifyingGlass
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="Browse handler profiles"
                description="Search by breed, region, or show circuit. See real experience, specialties, and what they charge."
              />
              <StepCard
                icon={
                  <ClipboardText
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="Post what you need"
                description="Drop your breed, show dates, and what you're looking for. The right handlers will find you."
              />
              <StepCard
                icon={
                  <ChatCircle
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="Connect directly"
                description="Message handlers, work out the details, done. No middlemen, no platform fees."
              />
            </div>
          </div>

          {/* For Handlers */}
          <div>
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.12em] text-paddock-green">
              For Handlers
            </p>
            <div className="flex flex-col gap-8">
              <StepCard
                icon={
                  <UserCirclePlus
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="Show off your wins"
                description="Build a profile with your breed specialties, credentials, and fees. One link you can share everywhere."
              />
              <StepCard
                icon={
                  <Binoculars
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="See who needs you"
                description="Browse what exhibitors are posting. Filter by breed, region, and the kind of work you want."
              />
              <StepCard
                icon={
                  <Handshake
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
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
/*  Section 3 - Request Board Teaser                                   */
/* ------------------------------------------------------------------ */

const mockRequests = [
  {
    title: 'Standard Poodle handler needed - Springfield Cluster, April 12-14',
    breed: 'Standard Poodle',
    service: 'Show Handling',
    region: 'Midwest',
    posted: '2 hours ago',
  },
  {
    title: 'Grooming services for Golden Retriever - Westminster area',
    breed: 'Golden Retriever',
    service: 'Grooming',
    region: 'Northeast',
    posted: '5 hours ago',
  },
  {
    title:
      'Looking for campaign handler - Labrador Retriever, Southeast circuit',
    breed: 'Labrador Retriever',
    service: 'Campaign Handling',
    region: 'Southeast',
    posted: '1 day ago',
  },
]

function RequestBoardSection() {
  return (
    <section
      className="bg-[#F0EAE0]"
      style={{ padding: 'var(--section-py-md) 0' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2
          className="mb-4 text-center font-display font-light text-[#1C1208]"
          style={{
            fontSize: 'var(--fs-h2)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Fresh off the request board
        </h2>
        <p
          className="mx-auto mb-12 max-w-[480px] text-center text-[#4A3E2E]"
          style={{ fontSize: '16px', lineHeight: 1.7 }}
        >
          Exhibitors post what they need, handlers jump in. Simple as that.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {mockRequests.map((req) => (
            <div key={req.title} className="card-hh">
              <h4
                className="mb-4 font-body text-base font-semibold text-[#1C1208]"
                style={{ lineHeight: 1.4, letterSpacing: 0 }}
              >
                {req.title}
              </h4>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="chip chip-breed">
                  <PawPrint size={12} weight="bold" />
                  {req.breed}
                </span>
                <span className="chip chip-verified">
                  <Sparkle size={12} weight="bold" />
                  {req.service}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#7A6E5E]">
                <span className="flex items-center gap-1">
                  <MapPin size={14} weight="bold" />
                  {req.region}
                </span>
                <span>{req.posted}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/requests" className="btn-secondary">
            Browse All Requests
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4 - Why HandlerHub (6 value prop cards)                    */
/* ------------------------------------------------------------------ */

const valueProps = [
  {
    icon: (
      <UsersThree size={32} weight="light" className="text-paddock-green" />
    ),
    title: 'Your people',
    description:
      'Finally, a place where everyone speaks dog show. Connect with handlers and exhibitors who get it.',
  },
  {
    icon: (
      <CalendarBlank size={32} weight="light" className="text-paddock-green" />
    ),
    title: 'Show calendar',
    description:
      'Find shows, circuits, and specialties near you. Never miss a ring time again.',
  },
  {
    icon: (
      <GraduationCap size={32} weight="light" className="text-paddock-green" />
    ),
    title: 'Learn the ropes',
    description:
      'New to the ring? Get guidance from experienced handlers on stacking, gaiting, and show strategy.',
  },
  {
    icon: <Books size={32} weight="light" className="text-paddock-green" />,
    title: 'Breed know-how',
    description:
      'Breed-specific tips, fee benchmarks, and the kind of info that used to take years ringside to learn.',
  },
  {
    icon: <Graph size={32} weight="light" className="text-paddock-green" />,
    title: 'Beyond word of mouth',
    description:
      'The show world is small but spread out. Meet handlers and exhibitors you would never cross paths with otherwise.',
  },
  {
    icon: <TrendUp size={32} weight="light" className="text-paddock-green" />,
    title: 'More rings, more wins',
    description:
      'Track your results, build your reputation, and get in front of exhibitors who are looking for exactly what you do.',
  },
]

function WhySection() {
  return (
    <section
      className="bg-[#F8F4EE]"
      style={{ padding: 'var(--section-py-md) 0' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2
          className="mb-16 text-center font-display font-light text-[#1C1208]"
          style={{
            fontSize: 'var(--fs-h2)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Built for the ring
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((vp) => (
            <div key={vp.title} className="text-center">
              <div
                className="mx-auto mb-5 flex items-center justify-center rounded-[10px] bg-sage"
                style={{ width: 56, height: 56 }}
              >
                {vp.icon}
              </div>
              <h4
                className="mb-2 font-body text-lg font-semibold text-[#1C1208]"
                style={{ lineHeight: 1.3, letterSpacing: 0 }}
              >
                {vp.title}
              </h4>
              <p
                className="mx-auto max-w-xs text-sm text-[#4A3E2E]"
                style={{ lineHeight: 1.7 }}
              >
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
    <section
      className="relative bg-paddock-green"
      style={{ padding: 'var(--section-py-lg) 0' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Rosette accent above headline */}
        <div className="mx-auto mb-6 flex justify-center">
          <Image
            src="/images/brand/decorative-rosette.png"
            alt=""
            aria-hidden={true}
            width={64}
            height={64}
            style={{
              width: '64px',
              height: '64px',
              opacity: 0.4,
              filter: 'brightness(3)',
            }}
          />
        </div>

        <h2
          className="mb-12 text-center font-display font-light text-[#F8F4EE]"
          style={{
            fontSize: 'var(--fs-h2)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Join the Founding 100
        </h2>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* For Handlers */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-sage">
              For Handlers
            </p>
            <p
              className="mb-8 text-[#F8F4EE]"
              style={{ fontSize: '18px', lineHeight: 1.7 }}
            >
              Be one of the first handlers on HandlerHub. Set up your profile
              and let exhibitors come to you.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-[#F8F4EE] px-7 py-3.5 text-sm font-medium text-paddock-green transition-colors hover:bg-white"
            >
              Create Your Profile
            </Link>
          </div>

          {/* For Exhibitors */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-sage">
              For Exhibitors
            </p>
            <p
              className="mb-8 text-[#F8F4EE]"
              style={{ fontSize: '18px', lineHeight: 1.7 }}
            >
              Need a handler for your next show? Post what you're looking for
              and the right people will find you.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border-[1.5px] border-[#F8F4EE] bg-transparent px-7 py-3.5 text-sm font-medium text-[#F8F4EE] transition-colors hover:bg-white/10"
            >
              Post a Request
            </Link>
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
