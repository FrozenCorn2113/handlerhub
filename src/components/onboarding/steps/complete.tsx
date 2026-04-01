'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import type { OnboardingFormData } from '../wizard'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface StepCompleteProps {
  formData: OnboardingFormData
}

export function StepComplete({ formData }: StepCompleteProps) {
  const [finalized, setFinalized] = useState(false)

  // Set isAvailable: true on mount
  useEffect(() => {
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
  }, [])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-sage"
        >
          <motion.svg
            className="size-10 text-paddock-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
          </motion.svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-2 text-3xl font-bold tracking-tight text-ringside-black md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Your profile is live!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8 text-base text-warm-gray"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Exhibitors can now find and reach out to you.
        </motion.p>

        {/* Preview card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-8 rounded-2xl border-2 border-sand bg-white p-6 text-left"
        >
          <div className="flex items-center gap-4">
            {formData.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={getFullUrl(formData.profileImage)}
                alt="Profile"
                className="size-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full bg-sage text-lg font-bold text-paddock-green">
                {(formData.fullName ?? '?')[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p
                className="text-lg font-semibold text-ringside-black"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {formData.fullName || 'Your Name'}
              </p>
              {(formData.city || formData.state) && (
                <p
                  className="text-sm text-warm-gray"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {[formData.city, formData.state].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>

          {formData.services && formData.services.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {formData.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-paddock-green px-2.5 py-0.5 text-xs font-medium text-white"
                >
                  {service}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="flex-1 rounded-xl">
            <Link href="/dashboard/profile">View your profile</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex-1 rounded-xl"
          >
            <Link href="/requests">Browse open requests</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function getFullUrl(key: string): string {
  if (key.startsWith('http')) return key
  const r2DevUrl = process.env.NEXT_PUBLIC_R2_DEV_URL
  return `${r2DevUrl}/${key}`
}
