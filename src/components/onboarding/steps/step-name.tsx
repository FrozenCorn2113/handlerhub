'use client'

import { StepShell } from '../step-shell'

interface StepNameProps {
  fullName: string
  businessName: string
  onChange: (fullName: string, businessName: string) => void
}

export function StepName({ fullName, businessName, onChange }: StepNameProps) {
  return (
    <StepShell phase="Who You Are" question="What's your name?">
      <div className="space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-sm font-medium text-ringside-black"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => onChange(e.target.value, businessName)}
            placeholder="e.g. Sarah Johnson"
            className="w-full rounded-xl border-2 border-sand bg-white px-4 py-3 text-base text-ringside-black outline-none transition-colors placeholder:text-tan focus:border-paddock-green"
            style={{ fontFamily: 'var(--font-body)' }}
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="businessName"
            className="mb-1.5 block text-sm font-medium text-ringside-black"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Business name <span className="text-warm-gray">(optional)</span>
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => onChange(fullName, e.target.value)}
            placeholder="e.g. Johnson Show Dogs"
            className="w-full rounded-xl border-2 border-sand bg-white px-4 py-3 text-base text-ringside-black outline-none transition-colors placeholder:text-tan focus:border-paddock-green"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
      </div>
    </StepShell>
  )
}
