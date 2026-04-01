'use client'

import { useState } from 'react'

import {
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  Envelope,
  Plus,
  Repeat,
} from '@phosphor-icons/react'

interface AddOn {
  name: string
  price: number
}

interface Tier {
  tierName: string
  label: string
  basePrice: number
  description: string
  deliveryDays: number
  revisions: string
  included: string[]
  excluded?: string[]
  addOns: AddOn[]
}

interface FiverrTierCardProps {
  tiers: Tier[]
  defaultTab?: number
}

export function FiverrTierCard({ tiers, defaultTab = 1 }: FiverrTierCardProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [selectedAddOns, setSelectedAddOns] = useState<Set<number>>(new Set())

  const tier = tiers[activeTab]

  const toggleAddOn = (idx: number) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const handleTabChange = (idx: number) => {
    setActiveTab(idx)
    setSelectedAddOns(new Set())
  }

  const addOnTotal = tier.addOns.reduce(
    (sum, a, i) => (selectedAddOns.has(i) ? sum + a.price : sum),
    0
  )
  const total = tier.basePrice + addOnTotal

  return (
    <div className="w-[350px] overflow-hidden rounded-2xl border border-tan/60 bg-white shadow-[0_4px_20px_rgba(28,18,8,0.1)]">
      {/* Tab row */}
      <div className="flex border-b border-tan/40">
        {tiers.map((t, i) => (
          <button
            key={t.tierName}
            onClick={() => handleTabChange(i)}
            className={`flex-1 px-4 py-3.5 font-sans text-[13px] font-semibold transition-all duration-200 ${
              activeTab === i
                ? 'border-b-[3px] border-paddock-green bg-white text-ringside-black'
                : 'border-b-[3px] border-transparent bg-ring-cream/50 text-warm-gray hover:bg-ring-cream hover:text-warm-brown'
            }`}
          >
            {t.tierName}
          </button>
        ))}
      </div>

      {/* Selected tier content */}
      <div className="p-6">
        {/* Tier label + price */}
        <div className="mb-1 flex items-start justify-between">
          <h4
            className="font-display text-lg font-bold text-ringside-black"
            style={{ marginBottom: 0 }}
          >
            {tier.label}
          </h4>
        </div>
        <div className="mb-3">
          <span className="font-sans text-3xl font-bold text-ringside-black">
            ${total}
          </span>
          {addOnTotal > 0 && (
            <span className="ml-2 font-sans text-xs text-warm-gray">
              (${tier.basePrice} + ${addOnTotal} add-ons)
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 font-sans text-sm leading-relaxed text-warm-brown">
          {tier.description}
        </p>

        {/* Delivery + Revisions */}
        <div className="mb-5 flex items-center gap-4 font-sans text-xs text-warm-brown">
          <span className="flex items-center gap-1.5">
            <Clock size={14} weight="bold" className="text-warm-gray" />
            {tier.deliveryDays}-day delivery
          </span>
          <span className="flex items-center gap-1.5">
            <Repeat size={14} weight="bold" className="text-warm-gray" />
            {tier.revisions}
          </span>
        </div>

        {/* Feature checklist */}
        <div className="mb-5">
          <ul className="space-y-2">
            {tier.included.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle
                  size={16}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-paddock-green"
                />
                <span className="font-sans text-xs leading-relaxed text-ringside-black">
                  {item}
                </span>
              </li>
            ))}
            {tier.excluded?.map((item, i) => (
              <li key={`ex-${i}`} className="flex items-start gap-2.5">
                <CheckCircle
                  size={16}
                  weight="regular"
                  className="mt-0.5 shrink-0 text-tan"
                />
                <span className="font-sans text-xs leading-relaxed text-warm-gray">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add-on pills */}
        {tier.addOns.length > 0 && (
          <div className="mb-6">
            <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-wider text-warm-gray">
              Add-ons
            </span>
            <div className="flex flex-wrap gap-2">
              {tier.addOns.map((addOn, i) => {
                const isActive = selectedAddOns.has(i)
                return (
                  <button
                    key={addOn.name}
                    onClick={() => toggleAddOn(i)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-200 hover:scale-[1.03] ${
                      isActive
                        ? 'bg-gradient-to-b from-[#24845a] to-paddock-green text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(31,107,74,0.25)]'
                        : 'border border-tan bg-white text-warm-brown hover:border-paddock-green/40'
                    }`}
                  >
                    {isActive ? (
                      <Check size={12} weight="bold" />
                    ) : (
                      <Plus size={12} weight="bold" />
                    )}
                    {addOn.name}
                    <span
                      className={isActive ? 'text-white/70' : 'text-warm-gray'}
                    >
                      +${addOn.price}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Book Now CTA */}
        <button
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green py-3.5 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_8px_rgba(31,107,74,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(31,107,74,0.35)]"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        >
          Book Now
          <ArrowRight size={14} weight="bold" />
        </button>

        {/* Contact Handler */}
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-tan bg-white py-3 font-sans text-[13px] font-semibold text-warm-brown transition-all duration-200 hover:scale-[1.02] hover:border-paddock-green/40 hover:shadow-lg">
          <Envelope size={14} weight="bold" className="text-warm-gray" />
          Contact Handler
        </button>
      </div>
    </div>
  )
}

// Keep the old export names for backward compatibility
export function TierCard({
  tierName,
  basePrice,
  description,
  included,
  addOns,
  selected,
  onSelect,
}: {
  tierName: string
  basePrice: number
  description: string
  included: string[]
  addOns: { name: string; price: number }[]
  selected: boolean
  onSelect: () => void
}) {
  return null // Deprecated - use FiverrTierCard instead
}

export function ServiceCard() {
  return null // Deprecated - use FiverrTierCard instead
}
