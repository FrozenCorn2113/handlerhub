/* eslint-disable tailwindcss/classnames-order */
'use client'

import { useState } from 'react'

import Link from 'next/link'

import { StitchMarketingFooter } from '@/app/(marketing)/_components/stitch-marketing-footer'

import { List, X } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

export function StitchLandingShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white font-body text-[#1C1208] antialiased">
      <header className="sticky top-0 z-50 w-full bg-[#14472F]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="HandlerHub home"
          >
            <img
              src="/handler-hub-logo-new.png"
              alt="HandlerHub"
              className="h-10 w-auto shrink-0 object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              className="rounded-lg px-3 py-2 text-base font-medium text-[#F5F0E8] transition-colors hover:bg-white/10"
              href="/handlers"
            >
              Find Handlers
            </Link>
            <Link
              className="rounded-lg px-3 py-2 text-base font-medium text-[#F5F0E8] transition-colors hover:bg-white/10"
              href="/requests"
            >
              Request Board
            </Link>
            <Link
              className="rounded-lg px-3 py-2 text-base font-medium text-[#F5F0E8] transition-colors hover:bg-white/10"
              href="/for-handlers"
            >
              For Handlers
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              className="hidden rounded-lg px-4 py-2.5 text-base font-medium text-[#F5F0E8] transition-colors hover:bg-white/10 sm:block"
              href="/login"
            >
              Sign In
            </Link>
            <Link
              className="hidden rounded-xl bg-[#D4621A] px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#b85416] hover:shadow-md sm:block"
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
                <X size={28} className="text-[#F5F0E8]" />
              ) : (
                <List size={28} className="text-[#F5F0E8]" />
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
                className="mt-2 inline-block rounded-xl bg-[#D4621A] px-6 py-3 text-center text-base font-semibold text-white transition-all hover:bg-[#b85416]"
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
