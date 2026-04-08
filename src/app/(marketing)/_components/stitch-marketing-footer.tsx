/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

export function StitchMarketingFooter() {
  return (
    <footer className="bg-[#14472F] pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-5">
          {/* Wordmark + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <span
                className="text-3xl text-[#F8F4EE]"
                style={{ fontFamily: '"Roca One", sans-serif' }}
              >
                HandlerHub
              </span>
            </Link>
            <p className="max-w-xs font-body text-sm text-[#F8F4EE]/70">
              The professional marketplace connecting dog show exhibitors with
              expert handlers.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h5 className="mb-6 font-display text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              Platform
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/handlers"
                >
                  Find a Handler
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/how-it-works"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/events"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/requests"
                >
                  Request Board
                </Link>
              </li>
            </ul>
          </div>

          {/* For Handlers */}
          <div>
            <h5 className="mb-6 font-display text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              For Handlers
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/for-handlers"
                >
                  Join as Handler
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/help"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="mb-6 font-display text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              Company
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/our-story"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/help"
                >
                  Help / FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="mb-6 font-display text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              Legal
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/legal/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/legal/terms-of-service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="font-body text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/legal/cookies-policy"
                >
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social icons + bottom bar */}
        <div className="flex flex-col items-center gap-6 border-t border-[#F8F4EE]/20 pt-8">
          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/handlerhub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HandlerHub on X"
              className="text-[#F8F4EE]/60 transition-colors hover:text-[#F8F4EE]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/handlerhub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HandlerHub on Instagram"
              className="text-[#F8F4EE]/60 transition-colors hover:text-[#F8F4EE]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/handlerhub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HandlerHub on Facebook"
              className="text-[#F8F4EE]/60 transition-colors hover:text-[#F8F4EE]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          <p className="text-center font-body text-xs text-[#F8F4EE]/50">
            &copy; 2026 HandlerHub Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
