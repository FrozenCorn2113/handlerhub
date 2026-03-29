/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { List, X } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/enforces-shorthand */

export function WebmakerNavbar() {
  const pathname = usePathname()
  const nextParam = encodeURIComponent(pathname || '/')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isOnboarding =
    pathname === '/onboarding' ||
    pathname.startsWith('/dashboard/profile/onboarding')

  if (isOnboarding) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-[#D4CFC4] bg-[#F8F4EE]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-baseline gap-0">
            <span
              className="text-2xl font-light tracking-tight text-ringside-black"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Handler
            </span>
            <span
              className="relative text-xl font-semibold tracking-wide text-ringside-black"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Hub
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-paddock-green" />
            </span>
          </Link>
          <Link
            className="text-sm font-medium text-[#1C1208]/60 transition-colors hover:text-[#1C1208]"
            href="/dashboard/profile"
          >
            Save &amp; Exit
          </Link>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D4CFC4] bg-[#F8F4EE]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex cursor-pointer items-baseline gap-0">
              <span
                className="text-2xl font-light tracking-tight text-ringside-black"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Handler
              </span>
              <span
                className="relative text-xl font-semibold tracking-wide text-ringside-black"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Hub
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-paddock-green" />
              </span>
            </Link>
            <div className="hidden items-center space-x-6 text-sm font-medium md:flex">
              <Link
                className="text-[#1C1208] transition-colors hover:text-paddock-green"
                href="/handlers"
              >
                Find Handlers
              </Link>
              <Link
                className="text-[#1C1208] transition-colors hover:text-paddock-green"
                href="/events"
              >
                Events
              </Link>
              <Link
                className="text-[#1C1208] transition-colors hover:text-paddock-green"
                href="/dashboard/messages"
              >
                Messages
              </Link>
              <Link
                className="text-[#1C1208] transition-colors hover:text-paddock-green"
                href="/requests"
              >
                Request Board
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              className="hidden text-sm font-medium text-[#1C1208]/70 transition-colors hover:text-[#1C1208] sm:inline-flex"
              href={`/login?next=${nextParam}`}
            >
              Sign In
            </Link>
            <Link
              className="hidden rounded-full bg-paddock-green px-6 py-2.5 text-sm font-medium text-[#F8F4EE] transition-colors hover:bg-forest sm:inline-flex"
              href={`/register?next=${nextParam}`}
            >
              Get Started
            </Link>
            <button
              className="flex items-center justify-center md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={28} className="text-[#1C1208]" />
              ) : (
                <List size={28} className="text-[#1C1208]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#D4CFC4] bg-[#F8F4EE] px-6 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              className="text-sm font-medium text-[#1C1208] transition-colors hover:text-paddock-green"
              href="/handlers"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Handlers
            </Link>
            <Link
              className="text-sm font-medium text-[#1C1208] transition-colors hover:text-paddock-green"
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              className="text-sm font-medium text-[#1C1208] transition-colors hover:text-paddock-green"
              href="/dashboard/messages"
              onClick={() => setMobileMenuOpen(false)}
            >
              Messages
            </Link>
            <Link
              className="text-sm font-medium text-[#1C1208] transition-colors hover:text-paddock-green"
              href="/requests"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Board
            </Link>
            <Link
              className="text-sm font-medium text-[#1C1208]/70 transition-colors hover:text-[#1C1208]"
              href={`/login?next=${nextParam}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              className="mt-2 inline-block rounded-full bg-paddock-green px-6 py-2.5 text-center text-sm font-medium text-[#F8F4EE] transition-colors hover:bg-forest"
              href={`/register?next=${nextParam}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
