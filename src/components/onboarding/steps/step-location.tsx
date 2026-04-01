'use client'

import { StepShell } from '../step-shell'

const US_STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NS',
  'NT',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
]

interface StepLocationProps {
  city: string
  state: string
  contactEmail: string
  onChange: (city: string, state: string, contactEmail: string) => void
}

export function StepLocation({
  city,
  state,
  contactEmail,
  onChange,
}: StepLocationProps) {
  return (
    <StepShell phase="Who You Are" question="Where are you based?">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="mb-1.5 block text-sm font-medium text-ringside-black"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => onChange(e.target.value, state, contactEmail)}
              placeholder="e.g. Portland"
              className="w-full rounded-lg border-2 border-sand bg-white px-4 py-3 text-base text-ringside-black outline-none transition-colors placeholder:text-tan focus:border-paddock-green focus:ring-2 focus:ring-[#1F6B4A]/30"
              style={{ fontFamily: 'var(--font-body)' }}
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="mb-1.5 block text-sm font-medium text-ringside-black"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              State / Province
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => onChange(city, e.target.value, contactEmail)}
              className="w-full rounded-lg border-2 border-sand bg-white px-4 py-3 text-base text-ringside-black outline-none transition-colors focus:border-paddock-green focus:ring-2 focus:ring-[#1F6B4A]/30"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <option value="">Select</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="contactEmail"
            className="mb-1.5 block text-sm font-medium text-ringside-black"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Contact email
          </label>
          <input
            id="contactEmail"
            type="email"
            value={contactEmail}
            onChange={(e) => onChange(city, state, e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border-2 border-sand bg-white px-4 py-3 text-base text-ringside-black outline-none transition-colors placeholder:text-tan focus:border-paddock-green focus:ring-2 focus:ring-[#1F6B4A]/30"
            style={{ fontFamily: 'var(--font-body)' }}
          />
          <p
            className="mt-1 text-xs text-warm-gray"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            This is how exhibitors will reach you
          </p>
        </div>
      </div>
    </StepShell>
  )
}
