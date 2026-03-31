'use client'

import { StepShell } from '../step-shell'

interface StepWelcomeProps {
  userName: string
  onContinue: () => void
}

export function StepWelcome({ userName, onContinue }: StepWelcomeProps) {
  return (
    <StepShell
      question={`Let's build your handler profile, ${userName}`}
      subtitle="This takes about 5 minutes. Your answers help exhibitors find and trust you."
    >
      <div className="space-y-6">
        {/* What they'll cover */}
        <div className="space-y-3">
          {[
            { icon: '1', label: 'Who you are', desc: 'Name and location' },
            {
              icon: '2',
              label: 'What you do',
              desc: 'Services, breeds, and experience',
            },
            {
              icon: '3',
              label: 'Show your work',
              desc: 'Photos and portfolio',
            },
            {
              icon: '4',
              label: 'Rates and reach',
              desc: 'Pricing and service areas',
            },
          ].map((item) => (
            <div
              key={item.icon}
              className="flex items-center gap-4 rounded-xl bg-white p-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-paddock-green">
                {item.icon}
              </div>
              <div>
                <p
                  className="text-sm font-semibold text-ringside-black"
                  style={{ fontFamily: 'var(--font-body)' }}
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

        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-xl bg-paddock-green px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-forest"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Let&apos;s go
        </button>
      </div>
    </StepShell>
  )
}
