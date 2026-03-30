/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import { WebmakerOnboardingForm } from '@/components/webmaker/pages/onboarding-form'
import { SwitchToHandlerCard } from '@/components/webmaker/switch-to-handler-card'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'HandlerHub Onboarding - Professional Details',
}

export default async function OnboardingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/register?next=/onboarding')
  }

  if (user.role !== 'HANDLER') {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Become a handler
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          You’re currently signed in as an exhibitor. To create a handler
          profile, we’ll switch your account role to <b>HANDLER</b> and continue
          onboarding.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <SwitchToHandlerCard />
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Not ready? You can browse handlers and request bookings anytime.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/handlers"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
              >
                Browse handlers
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                Go to dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <WebmakerOnboardingForm />
}
