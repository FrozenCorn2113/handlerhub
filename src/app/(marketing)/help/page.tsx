/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
'use client'

import { useState } from 'react'

import Link from 'next/link'

import { CaretDown } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/enforces-shorthand */

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
      <h1
        className="text-4xl font-light tracking-tight text-ringside-black md:text-5xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Help & FAQ
      </h1>
      <p
        className="mt-4 text-warm-gray"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Find answers to common questions about HandlerHub.
      </p>

      {/* For Exhibitors */}
      <section className="mt-12">
        <h2
          className="mb-6 text-xs font-bold uppercase tracking-wider text-paddock-green"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          For Exhibitors
        </h2>
        <div className="space-y-3">
          <FaqItem
            question="How do I find a handler?"
            answer="Browse our handler directory, filter by breed and region, and message handlers directly."
          />
          <FaqItem
            question="How do I post a request?"
            answer="Create a free account, then post what you need on the Request Board. Handlers will reach out to you."
          />
          <FaqItem
            question="Is HandlerHub free?"
            answer="Yes. HandlerHub is free for exhibitors. Browse profiles, post requests, and message handlers at no cost."
          />
          <FaqItem
            question="How does pricing work?"
            answer="Each handler sets their own fee schedule. You'll see their rates on their profile before reaching out."
          />
        </div>
      </section>

      {/* For Handlers */}
      <section className="mt-12">
        <h2
          className="mb-6 text-xs font-bold uppercase tracking-wider text-paddock-green"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          For Handlers
        </h2>
        <div className="space-y-3">
          <FaqItem
            question="How do I create a profile?"
            answer='Sign up and select "I am a handler." Fill out your profile with your specialties, regions, and fee schedule.'
          />
          <FaqItem
            question="How do I find clients?"
            answer="Two ways: exhibitors can find you through the directory, and you can browse and respond to requests on the Request Board."
          />
          <FaqItem
            question="What does it cost to list?"
            answer="HandlerHub is free for handlers during our launch period."
          />
          <FaqItem
            question="Can I set my own rates?"
            answer="Yes. You control your entire fee schedule including per-show fees, board rates, grooming, and win bonuses."
          />
        </div>
      </section>

      {/* Still need help */}
      <div className="mt-16 rounded-2xl border border-[#D4CFC4] bg-white p-8 text-center">
        <h3
          className="text-xl font-light text-ringside-black"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Still have questions?
        </h3>
        <p
          className="mt-2 text-sm text-warm-gray"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          We are happy to help. Reach out and we will get back to you.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-paddock-green px-6 py-2.5 text-sm font-medium text-ring-cream transition-colors hover:bg-forest"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-[#D4CFC4] bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className="text-sm font-medium text-ringside-black"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {question}
        </span>
        <CaretDown
          weight="bold"
          className={`h-4 w-4 shrink-0 text-warm-gray transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-[#D4CFC4]/50 px-6 py-5">
          <p
            className="text-sm leading-relaxed text-warm-gray"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}
