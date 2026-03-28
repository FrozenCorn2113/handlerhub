import Link from 'next/link'

import { HandlerSearchBar } from '@/components/search/handler-search-bar'

export default function HeroRegular() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-10 sm:py-16 lg:py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="size-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url(/images/backgrounds/Untitled design (11).png)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          {/* Left: Hero Text */}
          <div className="text-center lg:text-left">
            {/* Main Heading */}
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Find the right handler for your next show.
            </h1>

            {/* Subheading */}
            <p className="mb-6 text-sm text-slate-700 sm:text-base lg:mb-8 lg:text-lg">
              Connect with professional dog show handlers nationwide. Browse
              profiles, compare experience, and book with confidence—all in one
              place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link href="/handlers">
                <button className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 sm:w-auto sm:text-base">
                  Browse handlers
                </button>
              </Link>
              <Link href="/for-handlers">
                <button className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 sm:w-auto sm:text-base">
                  Become a handler
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 sm:gap-6 sm:text-sm lg:justify-start">
              <div className="flex items-center gap-2">
                <svg
                  className="size-4 text-primary sm:size-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">Verified Handlers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="size-4 text-primary sm:size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="font-medium">Trusted Nationwide</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="size-4 text-primary sm:size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">No Commission Fees</span>
              </div>
            </div>
          </div>

          {/* Right: Search Card */}
          <div className="w-full">
            <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-md sm:p-6">
              <HandlerSearchBar variant="homepage" />
            </div>
            <p className="mt-4 text-center text-xs text-slate-500 sm:text-sm">
              Are you a professional handler?{' '}
              <Link
                href="/for-handlers"
                className="font-semibold text-primary hover:underline"
              >
                Join our Founding Handler Program →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
