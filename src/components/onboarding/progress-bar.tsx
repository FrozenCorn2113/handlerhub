'use client'

import { motion } from 'framer-motion'

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
    <div className="mx-auto w-full max-w-lg px-4 py-4">
      <div className="flex items-center gap-2">
        {phases.map((phase, i) => {
          const status = getPhaseStatus(phase)
          return (
            <div key={phase.id} className="flex flex-1 items-center gap-2">
              {/* Phase pill */}
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-sand">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-paddock-green"
                    initial={{ width: '0%' }}
                    animate={{
                      width:
                        status === 'completed'
                          ? '100%'
                          : status === 'active'
                            ? `${getPhaseProgress(phase, currentStep, completedSteps)}%`
                            : '0%',
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    status === 'completed'
                      ? 'text-paddock-green'
                      : status === 'active'
                        ? 'text-ringside-black'
                        : 'text-tan'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {status === 'completed' ? (
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="size-3"
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
                      {phase.label}
                    </span>
                  ) : (
                    phase.label
                  )}
                </span>
              </div>

              {/* Connector dot between phases */}
              {i < phases.length - 1 && (
                <div
                  className={`mt-[-18px] size-1.5 shrink-0 rounded-full ${
                    status === 'completed' ? 'bg-paddock-green' : 'bg-sand'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function getPhaseProgress(
  phase: Phase,
  currentStep: number,
  completedSteps: number[]
): number {
  if (phase.steps.length === 0) return 0
  const completedInPhase = phase.steps.filter((s) =>
    completedSteps.includes(s)
  ).length
  const currentInPhase = phase.steps.includes(currentStep) ? 0.5 : 0
  const progress =
    ((completedInPhase + currentInPhase) / phase.steps.length) * 100
  return Math.min(progress, 100)
}
