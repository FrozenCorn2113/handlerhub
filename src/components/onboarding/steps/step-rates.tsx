'use client'

import { StepShell } from '../step-shell'

interface StepRatesProps {
  ratePerShow?: number
  onChange: (ratePerShow?: number) => void
}

export function StepRates({ ratePerShow, onChange }: StepRatesProps) {
  return (
    <StepShell
      phase="Rates & Reach"
      question="What's your starting price?"
      subtitle="This shows as 'From $X' on your profile card. You'll set detailed service pricing in your dashboard."
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="ratePerShow"
            className="mb-1.5 block text-sm font-medium text-ringside-black"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Starting price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray">
              $
            </span>
            <input
              id="ratePerShow"
              type="number"
              min={0}
              value={ratePerShow ?? ''}
              onChange={(e) =>
                onChange(e.target.value ? Number(e.target.value) : undefined)
              }
              placeholder="e.g. 150"
              className="w-full rounded-lg border-2 border-sand bg-white py-3 pl-8 pr-4 text-base text-ringside-black outline-none transition-colors placeholder:text-tan focus:border-paddock-green focus:ring-2 focus:ring-[#1F6B4A]/30"
              style={{ fontFamily: 'var(--font-body)' }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </StepShell>
  )
}
