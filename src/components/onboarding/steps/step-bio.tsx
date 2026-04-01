'use client'

import { StepShell } from '../step-shell'

interface StepBioProps {
  value: string
  onChange: (bio: string) => void
}

export function StepBio({ value, onChange }: StepBioProps) {
  const charCount = value.length
  const maxChars = 500

  return (
    <StepShell
      phase="Rates & Reach"
      question="Anything else clients should know?"
      subtitle="A short bio helps exhibitors get to know you. Mention your approach, specialties, or what makes you different."
    >
      <div className="space-y-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxChars))}
          placeholder="Tell exhibitors about yourself..."
          rows={5}
          className="w-full resize-none rounded-lg border-2 border-sand bg-white px-4 py-3 text-base text-ringside-black outline-none transition-colors placeholder:text-tan focus:border-paddock-green focus:ring-2 focus:ring-[#1F6B4A]/30"
          style={{ fontFamily: 'var(--font-body)' }}
          autoFocus
        />
        <p
          className="text-right text-xs text-warm-gray"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {charCount} / {maxChars}
        </p>
      </div>
    </StepShell>
  )
}
