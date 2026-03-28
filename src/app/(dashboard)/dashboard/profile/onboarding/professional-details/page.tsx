/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import {
  ArrowRight,
  MagnifyingGlass,
  PawPrint,
  Plus,
  X,
} from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'HandlerHub Onboarding - Professional Details',
}

export const dynamic = 'force-dynamic'

export default async function HandlerOnboardingProfessionalDetailsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="bg-background-light dark:bg-background-dark fixed inset-0 z-[60] flex min-h-screen flex-col font-display transition-colors duration-300">
      <header className="dark:bg-background-dark/50 sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-md dark:border-gray-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1.5">
              <PawPrint size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HandlerHub
            </span>
          </div>
          <Link
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            href="/dashboard/profile"
          >
            Save &amp; Exit
          </Link>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-6 py-12">
        <div className="flex w-full max-w-[720px] flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Step 1 of 4
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                25% Complete
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: '25%' }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Professional Details
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Help exhibitors find you by listing your expertise and
              credentials.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <form className="space-y-8">
              <div className="space-y-3">
                <label
                  className="block text-base font-semibold text-gray-900 dark:text-gray-100"
                  htmlFor="experience"
                >
                  Years of Professional Experience
                </label>
                <div className="relative max-w-[200px]">
                  <input
                    className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    id="experience"
                    min={0}
                    placeholder="e.g. 5"
                    type="number"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    Years
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Include your time as both an assistant and a lead handler.
                </p>
              </div>

              <div className="space-y-3">
                <label
                  className="block text-base font-semibold text-gray-900 dark:text-gray-100"
                  htmlFor="affiliations"
                >
                  Kennel Club Affiliations
                </label>
                <textarea
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  id="affiliations"
                  placeholder="e.g. AKC, UKC, Canadian Kennel Club, PHA"
                  rows={3}
                ></textarea>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  List the professional organizations you are currently a member
                  of.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-base font-semibold text-gray-900 dark:text-gray-100">
                    Breed Specialties
                  </label>
                  <span className="text-xs font-medium uppercase text-gray-400">
                    Select all that apply
                  </span>
                </div>
                <div className="relative">
                  <MagnifyingGlass
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 pl-12 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Search breeds (e.g. Golden Retriever, Boxer...)"
                    type="text"
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'Golden Retriever',
                    'German Shepherd',
                    'Poodle (Standard)',
                  ].map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {b}
                      <button type="button">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    type="button"
                  >
                    <Plus size={14} /> Add Breed
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-800">
                <button
                  className="px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  type="button"
                >
                  Back
                </button>
                <button
                  className="flex items-center gap-2 rounded-lg bg-primary px-10 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                  type="submit"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help with your profile?{' '}
              <Link
                className="font-medium text-primary hover:underline"
                href="/contact"
              >
                Contact Handler Support
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8 text-center dark:border-gray-800">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © 2024 HandlerHub Marketplace. Secure and Trusted Onboarding.
        </p>
      </footer>
    </div>
  )
}
