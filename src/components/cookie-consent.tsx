'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

const CONSENT_KEY = 'hh-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      // Small delay so it slides in after page load
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleChoice(choice: 'accepted' | 'rejected') {
    localStorage.setItem(CONSENT_KEY, choice)
    setExiting(true)
    setTimeout(() => setVisible(false), 400)
  }

  if (!visible) return null

  return (
    <div
      className={`duration-400 fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 transition-all ${
        exiting ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-tan/60 bg-white px-6 py-5 shadow-[0_-4px_24px_rgba(28,18,8,0.10)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Text */}
          <p className="flex-1 text-sm leading-relaxed text-warm-brown">
            We use cookies to improve your experience and analyze site traffic.
            View our{' '}
            <Link
              href="/legal/cookies-policy"
              className="font-medium text-paddock-green underline underline-offset-2 transition-colors hover:text-forest"
            >
              Cookie Policy
            </Link>{' '}
            for details.
          </p>

          {/* Buttons */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => handleChoice('rejected')}
              className="rounded-lg border border-tan bg-white px-4 py-2 text-sm font-medium text-warm-brown shadow-[inset_0_1px_2px_rgba(28,18,8,0.06)] transition-all duration-200 hover:scale-[1.03] hover:border-warm-gray hover:bg-light-sand active:scale-[0.98]"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={() => handleChoice('accepted')}
              className="rounded-lg bg-gradient-to-b from-paddock-green to-forest px-5 py-2 text-sm font-semibold text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_2px_6px_rgba(31,107,74,0.3)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_4px_12px_rgba(31,107,74,0.35)] active:scale-[0.98]"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
