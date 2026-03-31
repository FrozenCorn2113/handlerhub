'use client'

import { StepShell } from '../step-shell'

interface StepRoleProps {
  userName: string
  value?: 'HANDLER' | 'EXHIBITOR'
  onChange: (role: 'HANDLER' | 'EXHIBITOR') => void
  onContinue: () => void
}

const roles = [
  {
    role: 'EXHIBITOR' as const,
    title: "I'm looking for a handler",
    description:
      'Browse professional handlers, request bookings, and manage your dogs.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 256 256"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="116" cy="116" r="60" />
        <line x1="164" y1="164" x2="220" y2="220" />
      </svg>
    ),
  },
  {
    role: 'HANDLER' as const,
    title: 'I am a handler / I offer services',
    description:
      'Create your professional profile, get discovered by exhibitors, and manage bookings.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 256 256"
        fill="currentColor"
      >
        <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm0-154a34,34,0,1,0,34,34A34,34,0,0,0,128,64Zm0,56a22,22,0,1,1,22-22A22,22,0,0,1,128,120Zm0,18a60.07,60.07,0,0,0-53.47,32.69,6,6,0,1,0,10.69,5.46A48,48,0,0,1,128,150a48,48,0,0,1,42.78,26.15,6,6,0,1,0,10.69-5.46A60.07,60.07,0,0,0,128,138Z" />
      </svg>
    ),
  },
]

export function StepRole({
  userName,
  value,
  onChange,
  onContinue,
}: StepRoleProps) {
  return (
    <StepShell
      question={`${userName}, your account has been created!`}
      subtitle="What brings you to HandlerHub? We'll tailor your experience to fit your needs."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((option) => {
          const selected = value === option.role
          return (
            <button
              key={option.role}
              type="button"
              onClick={() => onChange(option.role)}
              className={`relative rounded-2xl border-2 bg-white p-6 text-left transition-all hover:border-paddock-green hover:shadow-md ${
                selected ? 'border-paddock-green shadow-md' : 'border-sand'
              }`}
            >
              {/* Checkbox indicator */}
              <div
                className={`absolute right-4 top-4 flex size-6 items-center justify-center rounded-full border-2 transition-all ${
                  selected
                    ? 'border-paddock-green bg-paddock-green'
                    : 'border-tan bg-white'
                }`}
              >
                {selected && (
                  <svg
                    className="size-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              <div className="mb-4 text-paddock-green">{option.icon}</div>
              <h2
                className="mb-1.5 text-lg font-semibold text-ringside-black"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
              >
                {option.title}
              </h2>
              <p
                className="text-sm leading-relaxed text-warm-gray"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {option.description}
              </p>
            </button>
          )
        })}
      </div>

      {/* Next button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          disabled={!value}
          className="inline-flex items-center justify-center rounded-xl bg-paddock-green px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-forest disabled:cursor-not-allowed disabled:opacity-40"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Next
        </button>
      </div>
    </StepShell>
  )
}
