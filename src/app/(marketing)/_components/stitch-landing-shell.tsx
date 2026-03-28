/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

import { StitchMarketingFooter } from '@/app/(marketing)/_components/stitch-marketing-footer'

import { PawPrint } from '@phosphor-icons/react/dist/ssr'

export function StitchLandingShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 antialiased dark:text-slate-100">
      <header className="dark:bg-background-dark/80 sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-primary">
              <PawPrint size={36} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              HandlerHub
            </h2>
          </Link>
          <nav className="hidden items-center gap-10 md:flex">
            <Link
              className="text-sm font-medium transition-colors hover:text-primary"
              href="/handlers"
            >
              Browse
            </Link>
            <Link
              className="text-sm font-medium transition-colors hover:text-primary"
              href="/#how-it-works"
            >
              How it Works
            </Link>
            <Link
              className="text-sm font-medium transition-colors hover:text-primary"
              href="/handlers"
            >
              Our Handlers
            </Link>
            <Link
              className="text-sm font-medium transition-colors hover:text-primary"
              href="#"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              className="hidden px-4 py-2 text-sm font-semibold hover:text-primary sm:block"
              href="/login"
            >
              Sign In
            </Link>
            <Link
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90"
              href="/register"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <StitchMarketingFooter />
    </div>
  )
}
