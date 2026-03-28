/* eslint-disable tailwindcss/classnames-order */
'use client'

import { useState } from 'react'

import Link from 'next/link'

import { StitchMarketingFooter } from '@/app/(marketing)/_components/stitch-marketing-footer'

import { List, X } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/classnames-order */

export function StitchLandingShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-[#F8F4EE] font-body text-[#1C1208] antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-[#D4CFC4] bg-[#F8F4EE]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-12">
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

          <nav className="hidden items-center gap-10 md:flex">
            <Link
              className="text-sm font-medium text-[#1C1208] transition-colors hover:text-paddock-green"
              href="/handlers"
            >
              Find Handlers
            </Link>
            <Link
              className="text-sm font-medium text-[#1C1208] transition-colors hover:text-paddock-green"
              href="/requests"
            >
              Request Board
            </Link>
            <Link
              className="text-sm font-medium text-[#1C1208] transition-colors hover:text-paddock-green"
              href="/for-handlers"
            >
              For Handlers
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              className="hidden rounded-full bg-paddock-green px-6 py-2.5 text-sm font-medium text-[#F8F4EE] transition-colors hover:bg-forest sm:block"
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
                href="/requests"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request Board
              </Link>
              <Link
                className="text-sm font-medium text-[#1C1208] transition-colors hover:text-paddock-green"
                href="/for-handlers"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Handlers
              </Link>
              <Link
                className="mt-2 inline-block rounded-full bg-paddock-green px-6 py-2.5 text-center text-sm font-medium text-[#F8F4EE] transition-colors hover:bg-forest"
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
