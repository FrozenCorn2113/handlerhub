import Link from 'next/link'

import {
  Binoculars,
  ChatCircle,
  ClipboardText,
  Handshake,
  MagnifyingGlass,
  MapPin,
  PawPrint,
  Sparkle,
  Target,
  UserCirclePlus,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero                                                   */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section
      className="bg-[#F8F4EE]"
      style={{ padding: 'var(--section-py-xl) 0' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="mb-8 font-display font-light text-[#1C1208]"
            style={{
              fontSize: 'var(--fs-display)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
            }}
          >
            Find your handler.
            <br />
            Grow your business.
          </h1>

          <p
            className="mx-auto mb-12 max-w-[560px] font-body text-[#4A3E2E]"
            style={{ fontSize: '18px', lineHeight: 1.7, fontWeight: 400 }}
          >
            Whether you&apos;re looking for a handler for your next show or
            building your handling career, HandlerHub connects you with the
            right people.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/handlers" className="btn-primary">
              Find a Handler
            </Link>
            <Link href="/for-handlers" className="btn-secondary">
              List Your Services
            </Link>
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
          How HandlerHub Works
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
                description="Find handlers by breed specialty, region, and pricing. Every profile shows real experience and fee schedules."
              />
              <StepCard
                icon={
                  <ClipboardText
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="Post a request"
                description="Describe the services you need, the breed, and the show dates. Handlers come to you."
              />
              <StepCard
                icon={
                  <ChatCircle
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="Message and hire with confidence"
                description="Communicate directly with handlers. No middlemen, no platform fees on your arrangement."
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
                title="Create your professional profile"
                description="Showcase your breed specialties, credentials, and fee schedule. One link to share everywhere."
              />
              <StepCard
                icon={
                  <Binoculars
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="Browse open requests"
                description="See what exhibitors are looking for. Filter by breed, region, and service type."
              />
              <StepCard
                icon={
                  <Handshake
                    size={40}
                    weight="light"
                    className="text-paddock-green"
                  />
                }
                title="Respond and grow your client base"
                description="Reach exhibitors you would never meet through word of mouth alone. Build your reputation on the platform."
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
          See what exhibitors are looking for
        </h2>
        <p
          className="mx-auto mb-12 max-w-[480px] text-center text-[#4A3E2E]"
          style={{ fontSize: '16px', lineHeight: 1.7 }}
        >
          The request board is where exhibitors post what they need. Handlers
          browse and respond.
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
/*  Section 4 - Why HandlerHub                                         */
/* ------------------------------------------------------------------ */

const valueProps = [
  {
    icon: <Target size={28} weight="light" className="text-paddock-green" />,
    title: 'Built for the show world',
    description:
      'Not a generic pet marketplace. We understand circuits, breed specialties, and campaign management.',
  },
  {
    icon: <Sparkle size={28} weight="light" className="text-paddock-green" />,
    title: 'Transparent pricing',
    description:
      'Handlers set their own fee schedules. No hidden costs, no platform markups.',
  },
  {
    icon: (
      <UsersThree size={28} weight="light" className="text-paddock-green" />
    ),
    title: 'Every handler welcome',
    description:
      'From PHA professionals to aspiring handlers at their first show. The request board is your on-ramp.',
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
          Why HandlerHub
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {valueProps.map((vp) => (
            <div key={vp.title} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[10px] bg-sage">
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
      className="bg-paddock-green"
      style={{ padding: 'var(--section-py-lg) 0' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
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
              Be among the first handlers on HandlerHub. Create your profile
              today and start getting discovered by exhibitors.
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
              Looking for a handler? Post your first request and let the right
              professionals come to you.
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
