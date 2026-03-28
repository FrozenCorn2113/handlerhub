/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
'use client'

import { useState } from 'react'

import Link from 'next/link'

import {
  CheckCircle,
  Clock,
  CurrencyDollar,
  Dog,
  EnvelopeSimple,
  Link as LinkIcon,
  MapPin,
  MapTrifold,
  Trophy,
} from '@phosphor-icons/react'

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/enforces-shorthand */

export interface ProfileHandler {
  id: string
  name: string
  profileImage: string | null
  bio: string | null
  yearsExperience: number | null
  location: string | null
  breeds: string[]
  regions: string[]
  serviceType: 'Campaign' | 'Ringside' | 'Both' | 'Grooming'
  registries: string[]
  feeSchedule: FeeSchedule | null
  ratePerShow: number | null
  messageHref: string
}

export interface FeeSchedule {
  allBreedShow?: number | null
  specialtyShow?: number | null
  nationalSpecialty?: number | null
  boardAndTrain?: number | null
  grooming?: number | null
  mileage?: number | null
  winBonusBIS?: number | null
  winBonusGroup?: number | null
  notes?: string | null
}

interface ProfilePageProps {
  handler: ProfileHandler
}

export function WebmakerProfilePage({ handler }: ProfilePageProps) {
  const [copied, setCopied] = useState(false)

  function copyProfileLink() {
    const url = `${window.location.origin}/handlers/${handler.id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const fee = handler.feeSchedule
  const startingPrice = handler.ratePerShow ?? fee?.allBreedShow ?? null

  return (
    <div className="min-h-[80vh] bg-ring-cream">
      <div className="mx-auto max-w-4xl animate-fade-in px-6 py-10 lg:px-8">
        {/* Header section */}
        <div className="card-hh mb-8 p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            {/* Profile photo */}
            {handler.profileImage ? (
              <img
                src={handler.profileImage}
                alt={handler.name}
                className="h-28 w-28 shrink-0 rounded-full border-4 border-sage object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-tan bg-light-sand">
                <span className="font-display text-4xl text-warm-gray">
                  {handler.name.charAt(0)}
                </span>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="font-display text-3xl font-light tracking-tight text-ringside-black sm:text-4xl">
                {handler.name}
              </h1>

              {/* Location */}
              {handler.location && (
                <div className="mt-2 flex items-center gap-1.5 font-body text-sm text-warm-gray">
                  <MapPin className="h-4 w-4" />
                  {handler.location}
                </div>
              )}

              {/* Badges row */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {/* Service type */}
                <span className="inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-paddock-green">
                  {handler.serviceType}
                </span>

                {/* Registry chips */}
                {handler.registries.map((reg) => (
                  <span
                    key={reg}
                    className="chip-verified rounded-full px-3 py-1 font-body text-xs font-semibold uppercase"
                  >
                    {reg}
                  </span>
                ))}

                {/* Years experience */}
                {handler.yearsExperience != null && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-light-sand px-3 py-1 font-body text-xs text-warm-gray">
                    <Clock className="h-3.5 w-3.5" />
                    {handler.yearsExperience} years
                  </span>
                )}
              </div>

              {/* Starting price */}
              {startingPrice != null && (
                <p className="mt-4 font-body text-sm text-ringside-black">
                  <span className="font-semibold">
                    Starting from ${startingPrice}/show
                  </span>
                </p>
              )}

              {/* CTA buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={handler.messageHref}
                  className="btn-primary inline-flex"
                >
                  <EnvelopeSimple className="h-4 w-4" />
                  Message {handler.name.split(' ')[0]}
                </Link>
                <button
                  onClick={copyProfileLink}
                  className="btn-secondary inline-flex"
                >
                  <LinkIcon className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy Profile Link'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-8 lg:col-span-2">
            {/* About section */}
            <section className="card-hh p-6">
              <h2 className="mb-4 font-display text-xl font-light text-ringside-black">
                About {handler.name.split(' ')[0]}
              </h2>
              {handler.bio ? (
                <p className="font-body text-base leading-relaxed text-warm-brown">
                  {handler.bio}
                </p>
              ) : (
                <p className="font-body text-sm italic text-warm-gray">
                  This handler has not added a bio yet.
                </p>
              )}

              {/* Breed specialties */}
              {handler.breeds.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-warm-gray">
                    <Dog className="h-4 w-4" />
                    Breed Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {handler.breeds.map((breed) => (
                      <span
                        key={breed}
                        className="chip-breed rounded-full px-3 py-1 font-body text-xs"
                      >
                        {breed}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Fee Schedule section */}
            {fee && (
              <section className="card-hh p-6">
                <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-light text-ringside-black">
                  <CurrencyDollar className="h-5 w-5 text-paddock-green" />
                  Fee Schedule
                </h2>

                <div className="divide-y divide-tan/50">
                  {fee.allBreedShow != null && (
                    <FeeRow
                      label="All-Breed Show"
                      value={`$${fee.allBreedShow}`}
                    />
                  )}
                  {fee.specialtyShow != null && (
                    <FeeRow
                      label="Specialty Show"
                      value={`$${fee.specialtyShow}`}
                    />
                  )}
                  {fee.nationalSpecialty != null && (
                    <FeeRow
                      label="National Specialty"
                      value={`$${fee.nationalSpecialty}`}
                    />
                  )}
                  {fee.boardAndTrain != null && (
                    <FeeRow
                      label="Board & Train Rate"
                      value={`$${fee.boardAndTrain}/month`}
                    />
                  )}
                  {fee.grooming != null && (
                    <FeeRow
                      label="Grooming"
                      value={`$${fee.grooming}/session`}
                    />
                  )}
                  {fee.mileage != null && (
                    <FeeRow label="Mileage" value={`$${fee.mileage}/mile`} />
                  )}
                  {fee.winBonusBIS != null && (
                    <FeeRow
                      label="Win Bonus: BIS"
                      value={`$${fee.winBonusBIS}`}
                    />
                  )}
                  {fee.winBonusGroup != null && (
                    <FeeRow
                      label="Win Bonus: Group"
                      value={`$${fee.winBonusGroup}`}
                    />
                  )}
                </div>

                {fee.notes && (
                  <div className="mt-4 rounded-lg bg-ring-cream p-3">
                    <p className="font-body text-sm italic text-warm-brown">
                      {fee.notes}
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            {/* Circuit Coverage */}
            {handler.regions.length > 0 && (
              <section className="card-hh p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-light text-ringside-black">
                  <MapTrifold className="h-5 w-5 text-paddock-green" />
                  Circuit Coverage
                </h2>
                <div className="flex flex-wrap gap-2">
                  {handler.regions.map((region) => (
                    <span
                      key={region}
                      className="flex items-center gap-1 rounded-full bg-light-sand px-3 py-1.5 font-body text-xs text-warm-brown"
                    >
                      <MapPin className="h-3 w-3" />
                      {region}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Contact CTA */}
            <section className="card-hh border-2 border-paddock-green/20 p-6">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle
                  className="h-5 w-5 text-paddock-green"
                  weight="fill"
                />
                <h3 className="font-body text-sm font-semibold text-ringside-black">
                  Interested in working with {handler.name.split(' ')[0]}?
                </h3>
              </div>
              <p className="mb-4 font-body text-sm text-warm-gray">
                Send a message to discuss your show needs, availability, and
                pricing.
              </p>
              <Link
                href={handler.messageHref}
                className="btn-primary w-full text-center"
              >
                <EnvelopeSimple className="h-4 w-4" />
                Message
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="font-body text-sm text-warm-gray">{label}</span>
      <span className="font-body text-sm font-semibold text-ringside-black">
        {value}
      </span>
    </div>
  )
}
