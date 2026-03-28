'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

export function SwitchToHandlerCard(): JSX.Element {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function onSwitch() {
    startTransition(async () => {
      const res = await fetch('/api/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'HANDLER' }),
      })

      if (!res.ok) {
        return
      }

      router.refresh()
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
        Switch my account to handler
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        This enables handler onboarding and unlocks your public handler profile.
      </p>
      <button
        type="button"
        disabled={isPending}
        onClick={onSwitch}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-60"
      >
        {isPending ? 'Switching…' : 'Continue as handler'}
      </button>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        You can still browse and book handlers later.
      </p>
    </div>
  )
}
