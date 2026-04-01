'use client'

import { Button } from '@/components/ui/button'

import { StepShell } from '../step-shell'

interface StepWelcomeProps {
  userName: string
  onContinue: () => void
}

const WELCOME_STEPS = [
  { label: 'Who you are', desc: 'Name and location' },
  { label: 'What you do', desc: 'Services, breeds, and experience' },
  { label: 'Show your work', desc: 'Photos and portfolio' },
  { label: 'Rates and reach', desc: 'Pricing and service areas' },
]

export function StepWelcome({ userName, onContinue }: StepWelcomeProps) {
  return (
    <StepShell
      question={`Let's build your handler profile, ${userName}`}
      subtitle="This takes about 5 minutes. Your answers help exhibitors find and trust you."
    >
      <div className="space-y-6">
        {/* Numbered stepper with dashed connectors */}
        <div className="space-y-0">
          {WELCOME_STEPS.map((item, i) => (
            <div key={item.label} className="flex items-start gap-4">
              {/* Stepper column: circle + dashed line */}
              <div className="flex flex-col items-center">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-paddock-green bg-white text-sm font-bold text-paddock-green">
                  {i + 1}
                </div>
                {i < WELCOME_STEPS.length - 1 && (
                  <div className="h-8 w-0 border-l-2 border-dashed border-sand" />
                )}
              </div>
              {/* Content */}
              <div className="pb-4 pt-2">
                <p
                  className="text-sm font-semibold text-ringside-black"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-xs text-warm-gray"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={onContinue}
          size="lg"
          className="w-full rounded-xl"
        >
          Let&apos;s go
        </Button>
      </div>
    </StepShell>
  )
}
