/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

export function StitchMarketingFooter() {
  return (
    <footer className="bg-[#14472F] pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-4">
          {/* Wordmark */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-6 flex items-center gap-2.5">
              <img
                src="/handler-hub-logo.png"
                alt="HandlerHub logo"
                className="h-8 w-8 object-contain brightness-0 invert"
              />
              <span className="flex items-baseline gap-0">
                <span
                  className="text-2xl font-light tracking-tight text-[#F8F4EE]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Handler
                </span>
                <span
                  className="relative text-xl font-semibold tracking-wide text-[#F8F4EE]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Hub
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F8F4EE]/60" />
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-[#F8F4EE]/70">
              The professional marketplace connecting dog show exhibitors with
              expert handlers.
            </p>
          </div>

          {/* For Exhibitors */}
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              For Exhibitors
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/handlers"
                >
                  Find a Handler
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/how-it-works"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/events"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* For Handlers */}
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              For Handlers
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/for-handlers"
                >
                  List Your Services
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/our-story"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-[#F8F4EE]">
              Resources
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/help"
                >
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/legal/terms-of-service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-[#F8F4EE]/70 transition-colors hover:text-[#F8F4EE]"
                  href="/legal/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F8F4EE]/20 pt-8">
          <p className="text-center text-xs text-[#F8F4EE]/50">
            &copy; 2026 HandlerHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
