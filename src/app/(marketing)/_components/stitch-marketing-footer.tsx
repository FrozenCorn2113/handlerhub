/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

import {
  Envelope,
  Globe,
  Lock,
  PawPrint,
  ThumbsUp,
} from '@phosphor-icons/react/dist/ssr'

export function StitchMarketingFooter() {
  return (
    <footer className="dark:bg-background-dark border-t border-slate-200 bg-white pb-10 pt-20 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-6 flex items-center gap-3 text-primary">
              <PawPrint size={36} />
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                HandlerHub
              </h2>
            </div>
            <p className="mb-8 max-w-xs text-slate-500">
              The professional marketplace for dog show excellence. Connecting
              elite handlers with owners who demand the best.
            </p>
            <div className="flex gap-4">
              <Link
                className="flex size-10 items-center justify-center rounded-full bg-slate-100 transition-all hover:bg-primary hover:text-white dark:bg-slate-800"
                href="#"
              >
                <Globe size={18} />
              </Link>
              <Link
                className="flex size-10 items-center justify-center rounded-full bg-slate-100 transition-all hover:bg-primary hover:text-white dark:bg-slate-800"
                href="#"
              >
                <ThumbsUp size={18} />
              </Link>
              <Link
                className="flex size-10 items-center justify-center rounded-full bg-slate-100 transition-all hover:bg-primary hover:text-white dark:bg-slate-800"
                href="#"
              >
                <Envelope size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="/handlers"
                >
                  Find a Handler
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="#"
                >
                  Show Calendar
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="#"
                >
                  For Owners
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="/for-handlers"
                >
                  For Handlers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="#"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="#"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="#"
                >
                  Trust &amp; Safety
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="/legal/terms-of-service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="/legal/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-500 transition-colors hover:text-primary"
                  href="/legal/cookies-policy"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-10 md:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-400">
            © 2024 HandlerHub Inc. All rights reserved.
          </p>
          <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Lock size={14} />
            Secure SSL Encryption
          </span>
        </div>
      </div>
    </footer>
  )
}
