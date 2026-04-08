/* eslint-disable tailwindcss/classnames-order */
'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useCurrentUser } from '@/hooks/use-current-user'

import { Button } from '@/components/ui/button'

import { StitchMarketingFooter } from '@/app/(marketing)/_components/stitch-marketing-footer'

import { List, X } from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/classnames-order */

const navLinks = [
  { label: 'Find a Handler', href: '/handlers' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Events', href: '/events' },
  { label: 'For Handlers', href: '/for-handlers' },
]

export function StitchLandingShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useCurrentUser()

  return (
    <div className="bg-white font-body text-[#1C1208] antialiased">
      <header className="w-full bg-[#14472F]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="HandlerHub home"
          >
            <span
              className="text-[28px] leading-none text-[#F8F4EE]"
              style={{ fontFamily: "'Roca One', sans-serif" }}
            >
              HandlerHub
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="rounded-lg px-3 py-2 font-sans text-[15px] font-medium text-[#F8F4EE] transition-colors hover:bg-white/10"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: auth state + hamburger */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 sm:flex"
              >
                <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-white/20 text-sm font-semibold text-[#F8F4EE]">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt=""
                      width={32}
                      height={32}
                      className="size-full object-cover"
                    />
                  ) : (
                    (user.name?.[0] ?? '?').toUpperCase()
                  )}
                </span>
                <span className="font-sans text-[15px] font-medium text-[#F8F4EE]">
                  Dashboard
                </span>
              </Link>
            ) : (
              <>
                <Link
                  className="hidden rounded-lg px-4 py-2 font-sans text-[15px] font-medium text-[#F8F4EE] transition-colors hover:text-white/80 sm:block"
                  href="/login"
                >
                  Sign In
                </Link>
                <Button
                  variant="accent"
                  size="sm"
                  asChild
                  className="hidden sm:inline-flex"
                >
                  <Link href="/register">Join</Link>
                </Button>
              </>
            )}
            <button
              className="flex items-center justify-center md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={26} className="text-[#F8F4EE]" />
              ) : (
                <List size={26} className="text-[#F8F4EE]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#14472F] px-6 pb-6 pt-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className="rounded-lg px-3 py-3 font-sans text-base font-medium text-[#F8F4EE] transition-colors hover:bg-white/10"
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <Link
                  className="rounded-lg px-3 py-3 font-sans text-base font-medium text-[#F8F4EE] transition-colors hover:bg-white/10"
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    className="rounded-lg px-3 py-3 font-sans text-base font-medium text-[#F8F4EE] transition-colors hover:bg-white/10"
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <div className="mt-2">
                    <Button
                      variant="accent"
                      size="default"
                      asChild
                      className="w-full"
                    >
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Join
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <StitchMarketingFooter />
    </div>
  )
}
