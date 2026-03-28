import Link from 'next/link'

import { StitchLandingShell } from '@/app/(marketing)/_components/stitch-landing-shell'

import {
  Broadcast,
  ClipboardText,
  CurrencyDollar,
  Handshake,
  Link as LinkIcon,
  UserCirclePlus,
} from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'For Handlers | HandlerHub',
  description:
    'Get discovered by exhibitors. Set your rates. Build your reputation on HandlerHub.',
}

/* ------------------------------------------------------------------ */
/*  Benefit card                                                       */
/* ------------------------------------------------------------------ */

interface BenefitProps {
  icon: React.ReactNode
  title: string
  description: string
}

function BenefitCard({ icon, title, description }: BenefitProps) {
  return (
    <div className="card-hh flex flex-col items-start">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[10px] bg-sage">
        {icon}
      </div>
      <h3
        className="mb-2 font-body text-lg font-semibold text-[#1C1208]"
        style={{ lineHeight: 1.3, letterSpacing: 0 }}
      >
        {title}
      </h3>
      <p className="text-sm text-[#4A3E2E]" style={{ lineHeight: 1.7 }}>
        {description}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  How it works step                                                  */
/* ------------------------------------------------------------------ */

interface StepProps {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}

function StepCard({ number, icon, title, description }: StepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex shrink-0 flex-col items-center">
        <span className="mb-2 text-xs font-semibold text-[#7A6E5E]">
          {number}
        </span>
        <div className="flex h-14 w-14 items-center justify-center rounded-[10px] bg-sage">
          {icon}
        </div>
      </div>
      <div className="pt-5">
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ForHandlersPage() {
  return (
    <StitchLandingShell>
      {/* Hero */}
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
              Get discovered.
              <br />
              Set your rates.
              <br />
              Build your reputation.
            </h1>

            <p
              className="mx-auto mb-12 max-w-[560px] font-body text-[#4A3E2E]"
              style={{ fontSize: '18px', lineHeight: 1.7, fontWeight: 400 }}
            >
              HandlerHub is the professional marketplace where exhibitors find
              you. Create your profile, set your fee schedule, and start
              connecting with clients.
            </p>

            <Link href="/register" className="btn-primary">
              Create Your Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
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
            Why handlers choose HandlerHub
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <BenefitCard
              icon={
                <CurrencyDollar
                  size={40}
                  weight="light"
                  className="text-paddock-green"
                />
              }
              title="Your profile, your terms"
              description="Set your own fee schedule, breed specialties, and circuit coverage. You control what exhibitors see and what you charge."
            />
            <BenefitCard
              icon={
                <ClipboardText
                  size={40}
                  weight="light"
                  className="text-paddock-green"
                />
              }
              title="Find clients through the request board"
              description="Exhibitors post what they need. You browse open requests and respond to the ones that fit your skills and schedule."
            />
            <BenefitCard
              icon={
                <LinkIcon
                  size={40}
                  weight="light"
                  className="text-paddock-green"
                />
              }
              title="Share your profile anywhere"
              description="One link to your professional page. Share it on Facebook, in breed groups, on your website, or anywhere you connect with exhibitors."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="bg-[#F0EAE0]"
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
            How it works
          </h2>

          <div className="mx-auto grid max-w-2xl gap-10">
            <StepCard
              number="01"
              icon={
                <UserCirclePlus
                  size={40}
                  weight="light"
                  className="text-paddock-green"
                />
              }
              title="Create your professional profile"
              description="Add your breed specialties, credentials, show record, service areas, and fee schedule. Upload photos from the ring."
            />
            <StepCard
              number="02"
              icon={
                <Broadcast
                  size={40}
                  weight="light"
                  className="text-paddock-green"
                />
              }
              title="Get discovered by exhibitors"
              description="Exhibitors search by breed, region, and service type. Your profile shows up when you match what they need."
            />
            <StepCard
              number="03"
              icon={
                <Handshake
                  size={40}
                  weight="light"
                  className="text-paddock-green"
                />
              }
              title="Connect and grow your business"
              description="Respond to requests, message exhibitors directly, and build lasting client relationships through the platform."
            />
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section
        className="bg-[#F8F4EE]"
        style={{ padding: 'var(--section-py-md) 0' }}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="mb-6 font-display font-light text-[#1C1208]"
              style={{
                fontSize: 'var(--fs-h2)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              For every handler
            </h2>
            <p
              className="mb-4 text-[#4A3E2E]"
              style={{ fontSize: '18px', lineHeight: 1.7 }}
            >
              Whether you are a PHA professional with decades of experience or
              an aspiring handler looking for your first clients, HandlerHub is
              built for you. The request board is your on-ramp to new
              opportunities.
            </p>
            <p
              className="text-[#7A6E5E]"
              style={{ fontSize: '16px', lineHeight: 1.7 }}
            >
              No subscription fees. No commission on your bookings. Create your
              profile and start connecting today.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="bg-paddock-green"
        style={{ padding: 'var(--section-py-lg) 0' }}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="mb-6 font-display font-light text-[#F8F4EE]"
              style={{
                fontSize: 'var(--fs-h2)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              Ready to get started?
            </h2>
            <p
              className="mx-auto mb-10 max-w-md text-[#F8F4EE]/80"
              style={{ fontSize: '18px', lineHeight: 1.7 }}
            >
              Create your professional handler profile and be among the first on
              HandlerHub.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-[#F8F4EE] px-7 py-3.5 text-sm font-medium text-paddock-green transition-colors hover:bg-white"
            >
              Create Your Profile
            </Link>
          </div>
        </div>
      </section>
    </StitchLandingShell>
  )
}
