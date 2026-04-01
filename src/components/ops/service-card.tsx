'use client'

import { useState } from 'react'

import { ArrowRight, Check } from '@phosphor-icons/react'

interface Tier {
  name: string
  price: number
  pricePer: string
}

interface ServiceCardProps {
  name: string
  price: number
  pricePer: string
  description: string
  tiers?: Tier[]
  features?: string[]
}

export function ServiceCard({
  name,
  price,
  pricePer,
  description,
  tiers,
  features,
}: ServiceCardProps) {
  const [activeTier, setActiveTier] = useState(0)

  const currentPrice = tiers ? tiers[activeTier].price : price
  const currentPer = tiers ? tiers[activeTier].pricePer : pricePer
  const formattedPrice = `$${(currentPrice / 100).toFixed(0)}`

  // Split description into bullet items if no features provided
  const featureList =
    features && features.length > 0
      ? features
      : description
          .split(/[.,]/)
          .filter((s) => s.trim().length > 0)
          .map((s) => s.trim())

  return (
    <div className="rounded-2xl border border-tan bg-white p-6 shadow-[0_2px_12px_rgba(28,18,8,0.08)] transition-all hover:shadow-[0_6px_24px_rgba(28,18,8,0.13)]">
      {/* Tier tabs */}
      {tiers && tiers.length > 1 && (
        <div className="mb-4 flex gap-1 rounded-lg bg-light-sand p-1">
          {tiers.map((tier, i) => (
            <button
              key={tier.name}
              onClick={() => setActiveTier(i)}
              className={`flex-1 rounded-md px-3 py-1.5 font-sans text-xs font-medium transition-all ${
                activeTier === i
                  ? 'bg-white text-ringside-black shadow-sm'
                  : 'text-warm-gray hover:text-warm-brown'
              }`}
            >
              {tier.name}
            </button>
          ))}
        </div>
      )}

      <p className="font-sans text-sm font-semibold text-ringside-black">
        {name}
      </p>
      <p className="mt-1 font-sans text-2xl font-semibold text-paddock-green">
        {formattedPrice}
        <span className="text-sm font-normal text-warm-gray">
          /{currentPer}
        </span>
      </p>

      {/* Feature list with checkmarks */}
      <ul className="mt-4 space-y-2">
        {featureList.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check
              size={16}
              weight="bold"
              className="mt-0.5 shrink-0 text-paddock-green"
            />
            <span className="font-sans text-xs leading-relaxed text-warm-brown">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA buttons */}
      <div className="mt-5 space-y-2">
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-ringside-black px-5 py-2.5 font-sans text-xs font-medium text-white transition-colors hover:bg-warm-brown">
          Book Now
          <ArrowRight size={14} weight="bold" />
        </button>
        <button className="w-full rounded-full border border-tan px-5 py-2.5 font-sans text-xs font-medium text-warm-brown transition-colors hover:bg-light-sand">
          Learn More
        </button>
      </div>
    </div>
  )
}
