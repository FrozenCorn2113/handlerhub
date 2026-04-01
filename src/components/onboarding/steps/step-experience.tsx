'use client'

import { EXPERIENCE_RANGES } from '@/lib/constants/handler-options'

import { StepShell } from '../step-shell'

interface StepExperienceProps {
  value?: number
  onChange: (yearsExperience: number) => void
}

export function StepExperience({ value, onChange }: StepExperienceProps) {
  return (
    <StepShell phase="What You Do" question="Years of experience?">
      <div className="space-y-3">
        {EXPERIENCE_RANGES.map((range) => {
          const selected = value === range.value
          return (
            <button
              key={range.value}
              type="button"
              onClick={() => onChange(range.value)}
              className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                selected
                  ? 'border-paddock-green bg-paddock-green/5 shadow-sm'
                  : 'border-sand bg-white hover:border-paddock-green'
              }`}
            >
              <div
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  selected
                    ? 'border-paddock-green bg-paddock-green'
                    : 'border-tan'
                }`}
              >
                {selected && <div className="size-2 rounded-full bg-white" />}
              </div>
              <div>
                <p
                  className="text-base font-semibold text-ringside-black"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {range.label}
                </p>
                <p
                  className="text-sm text-warm-gray"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {range.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </StepShell>
  )
}
