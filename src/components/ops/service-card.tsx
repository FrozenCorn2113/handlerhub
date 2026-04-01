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
    <div className="flex flex-col rounded-2xl border border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.14)]">
      {/* Tier tabs */}
      {tiers && tiers.length > 1 && (
        <div className="border-b border-tan/60 px-5 pt-5">
          <div className="flex gap-0">
            {tiers.map((tier, i) => (
              <button
                key={tier.name}
                onClick={() => setActiveTier(i)}
                className={`relative flex-1 px-3 pb-3 pt-1 font-sans text-[13px] font-semibold transition-all ${
                  activeTier === i
                    ? 'text-ringside-black'
                    : 'text-warm-gray hover:text-warm-brown'
                }`}
              >
                {tier.name}
                {activeTier === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-paddock-green" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Service name */}
        <p className="font-sans text-base font-bold text-ringside-black">
          {name}
        </p>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-sans text-3xl font-bold text-ringside-black">
            {formattedPrice}
          </span>
          <span className="font-sans text-sm font-normal text-warm-gray">
            /{currentPer}
          </span>
        </div>

        {/* Divider */}
        <hr className="my-5 border-tan/60" />

        {/* Feature list with checkmarks */}
        <ul className="flex-1 space-y-3">
          {featureList.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paddock-green/10">
                <Check size={12} weight="bold" className="text-paddock-green" />
              </span>
              <span className="font-sans text-sm leading-relaxed text-warm-brown">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="mt-6 space-y-2.5">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-ringside-black px-5 py-3 font-sans text-sm font-semibold text-white shadow-[0_2px_8px_rgba(28,18,8,0.2)] transition-all hover:bg-warm-brown hover:shadow-[0_4px_12px_rgba(28,18,8,0.3)]">
            Book Now
            <ArrowRight size={16} weight="bold" />
          </button>
          <button className="w-full rounded-full border border-tan px-5 py-3 font-sans text-sm font-medium text-warm-brown transition-all hover:border-warm-brown hover:bg-light-sand">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
