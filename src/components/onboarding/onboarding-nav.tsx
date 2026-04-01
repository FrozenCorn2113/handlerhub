'use client'

import { Button } from '@/components/ui/button'

interface OnboardingNavProps {
  onBack?: () => void
  onSkip?: () => void
  onContinue: () => void
  showBack?: boolean
  showSkip?: boolean
  continueLabel?: string
  continueDisabled?: boolean
  saving?: boolean
}

export function OnboardingNav({
  onBack,
  onSkip,
  onContinue,
  showBack = true,
  showSkip = false,
  continueLabel = 'Continue',
  continueDisabled = false,
  saving = false,
}: OnboardingNavProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-sand bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-4">
        {/* Back button */}
        <div className="w-24">
          {showBack && onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={saving}
              className="text-sm font-medium text-warm-gray transition-colors hover:text-ringside-black disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Back
            </button>
          )}
        </div>

        {/* Skip button (center) */}
        <div className="flex-1 text-center">
          {showSkip && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              disabled={saving}
              className="text-sm font-medium text-warm-gray underline-offset-4 transition-colors hover:text-ringside-black hover:underline disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Skip for now
            </button>
          )}
        </div>

        {/* Continue button - gradient via Button component */}
        <div className="w-32 text-right">
          <Button
            type="button"
            onClick={onContinue}
            disabled={continueDisabled || saving}
            size="default"
            className="rounded-xl px-6"
          >
            {saving ? (
              <svg
                className="size-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              continueLabel
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
