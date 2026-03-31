'use client'

import { KENNEL_CLUBS } from '@/lib/constants/handler-options'

import { StepShell } from '../step-shell'

interface StepCredentialsProps {
  memberships: string[]
  isInsured: boolean
  isBonded: boolean
  onChange: (
    memberships: string[],
    isInsured: boolean,
    isBonded: boolean
  ) => void
}

export function StepCredentials({
  memberships,
  isInsured,
  isBonded,
  onChange,
}: StepCredentialsProps) {
  function toggleMembership(club: string) {
    if (memberships.includes(club)) {
      onChange(
        memberships.filter((m) => m !== club),
        isInsured,
        isBonded
      )
    } else {
      onChange([...memberships, club], isInsured, isBonded)
    }
  }

  return (
    <StepShell
      phase="What You Do"
      question="Credentials and memberships?"
      subtitle="These help build trust with exhibitors."
    >
      <div className="space-y-6">
        {/* Kennel club memberships */}
        <div>
          <p
            className="mb-3 text-sm font-medium text-ringside-black"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Kennel club memberships
          </p>
          <div className="space-y-2">
            {KENNEL_CLUBS.map((club) => {
              const selected = memberships.includes(club)
              return (
                <button
                  key={club}
                  type="button"
                  onClick={() => toggleMembership(club)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 bg-white px-4 py-3 text-left text-sm transition-all hover:border-paddock-green ${
                    selected ? 'border-paddock-green' : 'border-sand'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <div
                    className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                      selected
                        ? 'border-paddock-green bg-paddock-green'
                        : 'border-tan'
                    }`}
                  >
                    {selected && (
                      <svg
                        className="size-3 text-white"
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
                  <span className="text-ringside-black">{club}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Insurance and bonding toggles */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onChange(memberships, !isInsured, isBonded)}
            className={`flex w-full items-center justify-between rounded-xl border-2 bg-white px-4 py-3 text-left transition-all hover:border-paddock-green ${
              isInsured ? 'border-paddock-green' : 'border-sand'
            }`}
          >
            <span
              className="text-sm font-medium text-ringside-black"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              I carry professional liability insurance
            </span>
            <div
              className={`flex h-6 w-11 items-center rounded-full transition-colors ${
                isInsured ? 'bg-paddock-green' : 'bg-tan'
              }`}
            >
              <div
                className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                  isInsured ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange(memberships, isInsured, !isBonded)}
            className={`flex w-full items-center justify-between rounded-xl border-2 bg-white px-4 py-3 text-left transition-all hover:border-paddock-green ${
              isBonded ? 'border-paddock-green' : 'border-sand'
            }`}
          >
            <span
              className="text-sm font-medium text-ringside-black"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              I am bonded
            </span>
            <div
              className={`flex h-6 w-11 items-center rounded-full transition-colors ${
                isBonded ? 'bg-paddock-green' : 'bg-tan'
              }`}
            >
              <div
                className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                  isBonded ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </StepShell>
  )
}
