'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import type { OnboardingFormData } from '../wizard'
import {
  Calendar,
  Dog,
  MagnifyingGlass,
  ShareNetwork,
  UserCircle,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'

interface StepCompleteProps {
  formData: OnboardingFormData
  userId?: string
}

function getFullUrl(key: string): string {
  if (!key || key.startsWith('http')) return key || ''
  return `${process.env.NEXT_PUBLIC_R2_DEV_URL}/${key}`
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// CSS confetti colors matching brand palette
const CONFETTI_COLORS = [
  '#1F6B4A', // paddock-green
  '#4A6F8A', // slate-blue
  '#4A3E2E', // warm-brown
  '#1F6B4A',
  '#4A6F8A',
  '#4A3E2E',
  '#1F6B4A',
  '#4A6F8A',
  '#1F6B4A',
  '#4A6F8A',
  '#4A3E2E',
  '#1F6B4A',
]

interface CtaCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
  onClick?: () => void
}

function CtaCard({ icon, title, description, href, onClick }: CtaCardProps) {
  const content = (
    <div className="rounded-2xl border border-sand bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex justify-center text-paddock-green">{icon}</div>
      <h3
        className="mt-3 text-lg font-semibold"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p
        className="mt-1 text-sm text-warm-gray"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {description}
      </p>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return (
    <button onClick={onClick} className="text-left">
      {content}
    </button>
  )
}

export function StepComplete({ formData, userId }: StepCompleteProps) {
  const [finalized, setFinalized] = useState(false)
  const [showNextSteps, setShowNextSteps] = useState(false)
  const isExhibitor = formData.role === 'EXHIBITOR'

  // Set isAvailable: true on mount (handlers only)
  useEffect(() => {
    if (isExhibitor) {
      setFinalized(true)
      return
    }
    async function finalize() {
      try {
        await fetch('/api/handler-profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isAvailable: true }),
        })
        setFinalized(true)
      } catch {
        toast.error('Failed to finalize profile')
      }
    }
    finalize()
  }, [isExhibitor])

  // Phase transition after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNextSteps(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleShareProfile = () => {
    const url = `${window.location.origin}/handlers/${userId}`
    navigator.clipboard.writeText(url).then(
      () => toast.success('Profile link copied to clipboard!'),
      () => toast.error('Failed to copy link')
    )
  }

  const profileImageUrl = formData.profileImage
    ? getFullUrl(formData.profileImage)
    : ''
  const initials = getInitials(formData.fullName || '?')

  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* CSS Confetti */}
      {!showNextSteps &&
        CONFETTI_COLORS.map((color, i) => (
          <span
            key={i}
            className="pointer-events-none absolute animate-confetti rounded-full"
            style={{
              width: `${6 + Math.random() * 6}px`,
              height: `${6 + Math.random() * 6}px`,
              backgroundColor: color,
              left: `${8 + (i / CONFETTI_COLORS.length) * 84}%`,
              bottom: '0%',
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${1.8 + Math.random() * 1.2}s`,
            }}
          />
        ))}

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!showNextSteps ? (
            /* Phase 1: Celebration */
            <motion.div
              key="celebration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              {/* Profile photo */}
              {profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="mb-4 size-32 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="mb-4 flex size-32 items-center justify-center rounded-full bg-sage text-3xl font-bold text-paddock-green shadow-md">
                  {initials}
                </div>
              )}

              {/* Name */}
              <p
                className="mb-6 text-xl text-warm-gray"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {formData.fullName || 'Welcome'}
              </p>

              {/* Main heading */}
              <h1
                className="mb-3 text-3xl font-bold tracking-tight text-ringside-black md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Welcome to HandlerHub!
              </h1>

              {/* Role subtitle */}
              <p
                className="text-base text-warm-gray"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {isExhibitor
                  ? "You're all set. Let's find your perfect handler."
                  : 'Your profile is live. Exhibitors can now find you.'}
              </p>
            </motion.div>
          ) : (
            /* Phase 2: Next Steps */
            <motion.div
              key="next-steps"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <h2
                className="mb-3 text-3xl font-bold tracking-tight text-ringside-black md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                You&apos;re in!
              </h2>

              <p
                className="mb-8 text-base text-warm-gray"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {isExhibitor
                  ? "You're all set to find your perfect handler. Here are a few things to explore."
                  : 'Your profile is live and exhibitors can now find you. Here are a few things to explore.'}
              </p>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                {isExhibitor ? (
                  <>
                    <CtaCard
                      icon={<MagnifyingGlass size={32} weight="duotone" />}
                      title="Find a handler"
                      description="Browse experienced handlers in your area."
                      href="/handlers"
                    />
                    <CtaCard
                      icon={<Calendar size={32} weight="duotone" />}
                      title="Browse upcoming shows"
                      description="See what events are coming up near you."
                      href="/events"
                    />
                    <CtaCard
                      icon={<Dog size={32} weight="duotone" />}
                      title="Add your first dog"
                      description="Set up a profile for your dog."
                      href="/dashboard/dogs?onboarding=1"
                    />
                  </>
                ) : (
                  <>
                    <CtaCard
                      icon={<Calendar size={32} weight="duotone" />}
                      title="Browse shows near you"
                      description="Find upcoming events in your area."
                      href="/events"
                    />
                    <CtaCard
                      icon={<UserCircle size={32} weight="duotone" />}
                      title="Preview your profile"
                      description="See how exhibitors will find you."
                      href={
                        userId ? `/handlers/${userId}` : '/dashboard/profile'
                      }
                    />
                    <CtaCard
                      icon={<ShareNetwork size={32} weight="duotone" />}
                      title="Share your profile"
                      description="Copy your profile link to share."
                      onClick={handleShareProfile}
                    />
                  </>
                )}
              </div>

              <Link
                href="/dashboard"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green px-8 py-3 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(31,107,74,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(31,107,74,0.35)] md:w-auto"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
