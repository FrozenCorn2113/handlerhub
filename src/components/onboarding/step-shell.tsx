'use client'

interface StepShellProps {
  phase?: string
  question: string
  subtitle?: string
  children: React.ReactNode
}

export function StepShell({
  phase,
  question,
  subtitle,
  children,
}: StepShellProps) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {phase && (
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-paddock-green"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {phase}
          </p>
        )}
        <h1
          className="mb-2 text-3xl font-bold tracking-tight text-ringside-black md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {question}
        </h1>
        {subtitle && (
          <p
            className="mb-8 text-base leading-relaxed text-warm-gray"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {subtitle}
          </p>
        )}
        {!subtitle && <div className="mb-8" />}
        <div>{children}</div>
      </div>
    </div>
  )
}
