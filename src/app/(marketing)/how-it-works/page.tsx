import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import {
  ArrowRight,
  CalendarCheck,
  MagnifyingGlass,
  Scales,
  Star,
} from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how HandlerHub connects dog show exhibitors with professional handlers.',
}

const steps = [
  {
    number: 1,
    icon: MagnifyingGlass,
    heading: 'Search by breed, location, or show',
    body: "Browse handler profiles filtered by the breeds they specialize in, where they're based, and which shows they attend. Every profile shows ratings, experience, and starting prices.",
  },
  {
    number: 2,
    icon: Scales,
    heading: 'Compare services and reviews',
    body: 'Each handler offers tiered service packages from basic ring handling to full show-day coordination. Read verified reviews from other exhibitors to find the right fit.',
  },
  {
    number: 3,
    icon: CalendarCheck,
    heading: 'Book directly through the platform',
    body: "Send a booking request with your dog's details and show information. Handlers respond within hours, and you can message back and forth to finalize the details.",
  },
  {
    number: 4,
    icon: Star,
    heading: 'Leave a review after the show',
    body: 'After the show, both handler and exhibitor leave honest reviews. This builds trust across the community and helps future exhibitors make informed decisions.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-[#F8F4EE]"
        style={{ padding: 'var(--section-py-xl, 5rem) 0' }}
      >
        <div className="mx-auto max-w-[720px] px-6 text-center lg:px-12">
          <h1
            className="mb-4 text-4xl tracking-tight text-[#14472F] md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            How It Works
          </h1>
          <p
            className="text-lg leading-relaxed text-[#4A3F35]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Finding the right handler, step by step
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section
        className="bg-[#F8F4EE]"
        style={{ padding: '0 0 var(--section-py-xl, 5rem)' }}
      >
        <div className="mx-auto max-w-[960px] px-6 lg:px-12">
          <div className="relative">
            {/* Dashed connector line (desktop) */}
            <div
              className="absolute left-1/2 top-[28px] hidden h-0 -translate-x-1/2 md:block"
              style={{
                width: 'calc(100% - 200px)',
                borderTop: '2px dashed #d4cfc4',
              }}
            />

            {/* Dashed connector line (mobile: vertical) */}
            <div
              className="absolute left-[28px] top-[56px] w-0 md:hidden"
              style={{
                height: 'calc(100% - 56px)',
                borderLeft: '2px dashed #d4cfc4',
              }}
            />

            {/* Steps grid */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.number}
                    className="relative flex md:flex-col md:items-center md:text-center"
                  >
                    {/* Numbered circle */}
                    <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#1f6b4a] bg-[#F8F4EE]">
                      <span
                        className="text-lg font-bold text-[#1f6b4a]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="ml-6 md:ml-0 md:mt-6">
                      {/* Icon */}
                      <div className="mb-3 flex items-center md:justify-center">
                        <Icon
                          size={28}
                          weight="duotone"
                          className="text-[#1f6b4a]"
                        />
                      </div>

                      {/* Heading */}
                      <h3
                        className="mb-2 text-lg font-semibold text-[#14472F]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.heading}
                      </h3>

                      {/* Body */}
                      <p
                        className="text-sm leading-relaxed text-[#4A3F35]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="bg-[#F0EAE0]"
        style={{ padding: 'var(--section-py-lg, 4rem) 0' }}
      >
        <div className="mx-auto max-w-[720px] px-6 text-center lg:px-12">
          <h2
            className="mb-3 text-2xl tracking-tight text-[#14472F] md:text-3xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Ready to get started?
          </h2>
          <p
            className="mb-8 text-base text-[#4A3F35]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Whether you need a handler or you are one, HandlerHub is the place
            to connect.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="default">
              <Link href="/handlers" className="gap-2 font-display font-bold">
                Find a Handler
                <ArrowRight size={18} weight="bold" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/for-handlers" className="font-display font-bold">
                Become a Handler
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
