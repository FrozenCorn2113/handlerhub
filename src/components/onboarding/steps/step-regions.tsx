'use client'

import { TRAVEL_OPTIONS } from '@/lib/constants/handler-options'
import { REGIONS } from '@/lib/constants/regions'

import { StepShell } from '../step-shell'

interface StepRegionsProps {
  regions: string[]
  travelWillingness: string[]
  onChange: (regions: string[], travelWillingness: string[]) => void
}

export function StepRegions({
  regions,
  travelWillingness,
  onChange,
}: StepRegionsProps) {
  function toggleRegion(region: string) {
    if (regions.includes(region)) {
      onChange(
        regions.filter((r) => r !== region),
        travelWillingness
      )
    } else {
      onChange([...regions, region], travelWillingness)
    }
  }

  function toggleTravel(option: string) {
    if (travelWillingness.includes(option)) {
      onChange(
        regions,
        travelWillingness.filter((t) => t !== option)
      )
    } else {
      onChange(regions, [...travelWillingness, option])
    }
  }

  return (
    <StepShell
      phase="Rates & Reach"
      question="Where do you work?"
      subtitle="Select the regions you serve and how far you're willing to travel."
    >
      <div className="space-y-6">
        {/* Regions */}
        <div>
          <p
            className="mb-3 text-sm font-medium text-ringside-black"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Regions
          </p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((region) => {
              const selected = regions.includes(region)
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleRegion(region)}
                  className={`rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    selected
                      ? 'border-paddock-green bg-paddock-green text-white'
                      : 'border-sand bg-white text-warm-gray hover:border-paddock-green'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {region}
                </button>
              )
            })}
          </div>
        </div>

        {/* Travel willingness */}
        <div>
          <p
            className="mb-3 text-sm font-medium text-ringside-black"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Travel willingness
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TRAVEL_OPTIONS.map((option) => {
              const selected = travelWillingness.includes(option)
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleTravel(option)}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                    selected
                      ? 'border-paddock-green bg-paddock-green text-white'
                      : 'border-sand bg-white text-warm-gray hover:border-paddock-green'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </StepShell>
  )
}
