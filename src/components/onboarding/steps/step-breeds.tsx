'use client'

import { useState } from 'react'

import { DOG_BREEDS } from '@/lib/constants/handler-options'

import { StepShell } from '../step-shell'

interface StepBreedsProps {
  value: string[]
  onChange: (breeds: string[]) => void
}

export function StepBreeds({ value, onChange }: StepBreedsProps) {
  const [search, setSearch] = useState('')

  const filtered = search
    ? DOG_BREEDS.filter((b) => b.toLowerCase().includes(search.toLowerCase()))
    : DOG_BREEDS

  function toggleBreed(breed: string) {
    if (value.includes(breed)) {
      onChange(value.filter((b) => b !== breed))
    } else {
      onChange([...value, breed])
    }
  }

  return (
    <StepShell
      phase="What You Do"
      question="Breeds you specialize in?"
      subtitle="Select breeds you have experience showing. You can update this later."
    >
      <div className="space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search breeds..."
          className="w-full rounded-xl border-2 border-sand bg-white px-4 py-3 text-base text-ringside-black outline-none transition-colors placeholder:text-tan focus:border-paddock-green"
          style={{ fontFamily: 'var(--font-body)' }}
        />

        {/* Selected breeds */}
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.map((breed) => (
              <span
                key={breed}
                className="inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1 text-xs font-medium text-paddock-green"
              >
                {breed}
                <button
                  type="button"
                  onClick={() => toggleBreed(breed)}
                  className="ml-0.5 hover:text-forest"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Breed list */}
        <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border-2 border-sand bg-white p-2">
          {filtered.map((breed) => {
            const selected = value.includes(breed)
            return (
              <button
                key={breed}
                type="button"
                onClick={() => toggleBreed(breed)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selected
                    ? 'bg-sage text-paddock-green'
                    : 'text-ringside-black hover:bg-ring-cream'
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
                {breed}
              </button>
            )
          })}
          {filtered.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-warm-gray">
              No breeds match your search
            </p>
          )}
        </div>
      </div>
    </StepShell>
  )
}
