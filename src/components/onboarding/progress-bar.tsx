'use client'

export interface Phase {
  id: string
  label: string
  steps: number[] // step indices belonging to this phase
}

interface ProgressBarProps {
  phases: Phase[]
  currentStep: number
  completedSteps: number[]
}

export function ProgressBar({
  phases,
  currentStep,
  completedSteps,
}: ProgressBarProps) {
  function getPhaseStatus(phase: Phase): 'completed' | 'active' | 'upcoming' {
    const allCompleted = phase.steps.every((s) => completedSteps.includes(s))
    if (allCompleted) return 'completed'
    const hasActive = phase.steps.includes(currentStep)
    if (hasActive) return 'active'
    return 'upcoming'
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      <div className="flex items-start">
        {phases.map((phase, i) => {
          const status = getPhaseStatus(phase)
          const stepNumber = i + 1
          return (
            <div key={phase.id} className="flex flex-1 items-start">
              {/* Phase: circle + label */}
              <div className="flex flex-col items-center">
                {/* Numbered circle */}
                <div
                  className={`flex size-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                    status === 'completed'
                      ? 'border-paddock-green bg-paddock-green text-white'
                      : status === 'active'
                        ? 'border-paddock-green bg-white text-paddock-green'
                        : 'border-sand bg-white text-tan'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {status === 'completed' ? (
                    <svg
                      className="size-4"
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
                  ) : (
                    stepNumber
                  )}
                </div>
                {/* Phase label */}
                <span
                  className={`mt-2 text-center text-[10px] font-semibold uppercase tracking-wider ${
                    status === 'completed'
                      ? 'text-paddock-green'
                      : status === 'active'
                        ? 'text-ringside-black'
                        : 'text-tan'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {phase.label}
                </span>
              </div>

              {/* Dashed line connector between phases */}
              {i < phases.length - 1 && (
                <div className="mt-[18px] flex flex-1 items-center px-2">
                  <div
                    className={`h-0 w-full border-t-2 border-dashed ${
                      status === 'completed'
                        ? 'border-paddock-green'
                        : 'border-sand'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
