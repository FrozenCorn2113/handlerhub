/* eslint-disable tailwindcss/classnames-order */
'use client'

import { useState } from 'react'

import Link from 'next/link'

import { siteLogoSrc } from '@/config/site'

import { StitchMarketingFooter } from '@/app/(marketing)/_components/stitch-marketing-footer'

import { List, X } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/classnames-order */

export function StitchLandingShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white font-body text-[#1C1208] antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="HandlerHub home"
          >
            <img
              src={siteLogoSrc}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 object-contain"
            />
            <span className="flex items-center gap-0 leading-none">
              <span
                className="text-2xl font-light tracking-tight text-ringside-black"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Handler
              </span>
              <span
                className="relative text-2xl font-semibold tracking-wide text-ringside-black"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Hub
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-paddock-green" />
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              className="rounded-lg px-3 py-2 text-base font-medium text-[#1C1208] transition-colors hover:bg-gray-100 hover:text-paddock-green"
              href="/handlers"
            >
              Find Handlers
            </Link>
            <Link
              className="rounded-lg px-3 py-2 text-base font-medium text-[#1C1208] transition-colors hover:bg-gray-100 hover:text-paddock-green"
              href="/requests"
            >
              Request Board
            </Link>
            <Link
              className="rounded-lg px-3 py-2 text-base font-medium text-[#1C1208] transition-colors hover:bg-gray-100 hover:text-paddock-green"
              href="/for-handlers"
            >
              For Handlers
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              className="hidden rounded-lg px-4 py-2.5 text-base font-medium text-[#1C1208] transition-colors hover:bg-gray-100 sm:block"
              href="/login"
            >
              Sign In
            </Link>
            <Link
              className="hidden rounded-xl bg-paddock-green px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-forest hover:shadow-md sm:block"
              href="/for-handlers"
            >
              List Your Services
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white px-6 pb-6 pt-4 md:hidden">
            <nav className="flex flex-col gap-2">
              <Link
                className="rounded-lg px-3 py-3 text-base font-medium text-[#1C1208] transition-colors hover:bg-gray-100 hover:text-paddock-green"
                href="/handlers"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Handlers
              </Link>
              <Link
                className="rounded-lg px-3 py-3 text-base font-medium text-[#1C1208] transition-colors hover:bg-gray-100 hover:text-paddock-green"
                href="/requests"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request Board
              </Link>
              <Link
                className="rounded-lg px-3 py-3 text-base font-medium text-[#1C1208] transition-colors hover:bg-gray-100 hover:text-paddock-green"
                href="/for-handlers"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Handlers
              </Link>
              <Link
                className="rounded-lg px-3 py-3 text-base font-medium text-[#1C1208] transition-colors hover:bg-gray-100 hover:text-paddock-green"
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                className="mt-2 inline-block rounded-xl bg-paddock-green px-6 py-3 text-center text-base font-semibold text-white transition-all hover:bg-forest"
                href="/for-handlers"
                onClick={() => setMobileMenuOpen(false)}
              >
                List Your Services
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <StitchMarketingFooter />
    </div>
  )
}
