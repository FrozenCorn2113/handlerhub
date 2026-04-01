'use client'

import { useState } from 'react'

import { Check, CheckCircle, Plus } from '@phosphor-icons/react'

interface AddOn {
  name: string
  price: number
}

interface TierCardProps {
  tierName: string
  basePrice: number
  description: string
  included: string[]
  addOns: AddOn[]
  selected: boolean
  onSelect: () => void
}

export function TierCard({
  tierName,
  basePrice,
  description,
  included,
  addOns,
  selected,
  onSelect,
}: TierCardProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<number>>(new Set())

  const toggleAddOn = (idx: number) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const addOnTotal = addOns.reduce(
    (sum, a, i) => (selectedAddOns.has(i) ? sum + a.price : sum),
    0
  )
  const total = basePrice + addOnTotal

  return (
    <div
      onClick={onSelect}
      className={`group relative flex cursor-pointer flex-col rounded-2xl border-2 p-6 text-left transition-all duration-300 hover:shadow-[0_12px_36px_rgba(28,18,8,0.14)] ${
        selected
          ? 'border-paddock-green bg-paddock-green/[0.03] shadow-[0_4px_20px_rgba(31,107,74,0.15)]'
          : 'border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)] hover:border-tan'
      }`}
    >
      {/* Header: tier name + selection indicator */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="font-display text-xl font-semibold text-ringside-black">
            {tierName}
          </h4>
          <p className="mt-1 font-sans text-sm text-warm-gray">{description}</p>
        </div>
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            selected
              ? 'bg-gradient-to-br from-[#24845a] to-paddock-green shadow-[0_2px_6px_rgba(31,107,74,0.3)]'
              : 'border-2 border-tan bg-white'
          }`}
        >
          {selected && <Check size={14} weight="bold" className="text-white" />}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4 flex items-baseline gap-1">
        <span className="font-sans text-3xl font-bold text-ringside-black">
          ${total}
        </span>
        {addOnTotal > 0 && (
          <span className="ml-1 font-sans text-xs text-warm-gray">
            (${basePrice} base + ${addOnTotal} add-ons)
          </span>
        )}
      </div>

      {/* What's included */}
      <div className="mb-4">
        <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-wider text-warm-gray">
          Included
        </span>
        <ul className="space-y-1.5">
          {included.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle
                size={16}
                weight="fill"
                className={`mt-0.5 shrink-0 ${selected ? 'text-paddock-green' : 'text-warm-gray'}`}
              />
              <span className="font-sans text-xs leading-relaxed text-warm-brown">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add-on pills */}
      {addOns.length > 0 && (
        <div className="mb-5">
          <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-wider text-warm-gray">
            Add-ons
          </span>
          <div className="flex flex-wrap gap-2">
            {addOns.map((addOn, i) => {
              const isActive = selectedAddOns.has(i)
              return (
                <button
                  key={addOn.name}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleAddOn(i)
                  }}
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

      {/* Book Now button */}
      <div className="mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (!selected) onSelect()
          }}
          className={`flex w-full items-center justify-center gap-2 rounded-full py-3 font-sans text-[13px] font-semibold transition-all duration-200 hover:scale-[1.01] ${
            selected
              ? 'bg-gradient-to-b from-[#24845a] to-paddock-green text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(31,107,74,0.3)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(31,107,74,0.35)]'
              : 'bg-gradient-to-b from-[#F0EAE0] to-sand text-warm-brown shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_4px_rgba(28,18,8,0.1)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_12px_rgba(28,18,8,0.15)]'
          }`}
          style={
            selected ? { textShadow: '0 1px 2px rgba(0,0,0,0.15)' } : undefined
          }
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

// Keep the old export name for backward compatibility but it won't be used in the new layout
export function ServiceCard({
  name,
  price,
  description,
  features,
  icon,
  selected = false,
  onToggle,
}: {
  name: string
  price: number
  pricePer: string
  description: string
  tiers?: { name: string; price: number; pricePer: string }[]
  features?: string[]
  icon?: React.ReactNode
  selected?: boolean
  onToggle?: () => void
}) {
  const formattedPrice = `$${(price / 100).toFixed(0)}`

  const featureList =
    features && features.length > 0
      ? features
      : description
          .split(/[.,]/)
          .filter((s) => s.trim().length > 0)
          .map((s) => s.trim())

  return (
    <button
      onClick={onToggle}
      className={`group flex flex-col rounded-2xl border-2 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.14)] ${
        selected
          ? 'border-paddock-green bg-paddock-green/[0.04] shadow-[0_4px_20px_rgba(31,107,74,0.15)]'
          : 'border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)] hover:border-tan'
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        {icon && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
              selected ? 'bg-paddock-green/10' : 'bg-light-sand'
            }`}
          >
            {icon}
          </div>
        )}
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
            selected
              ? 'bg-gradient-to-br from-[#24845a] to-paddock-green shadow-[0_2px_6px_rgba(31,107,74,0.3)]'
              : 'border-2 border-tan bg-white'
          }`}
        >
          {selected && <Check size={14} weight="bold" className="text-white" />}
        </div>
      </div>

      <h4 className="font-display text-lg font-semibold text-ringside-black">
        {name}
      </h4>

      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-sans text-2xl font-bold text-ringside-black">
          {formattedPrice}
        </span>
      </div>

      <p className="mt-2 font-sans text-sm leading-relaxed text-warm-gray">
        {description}
      </p>

      <ul className="mt-4 flex-1 space-y-2">
        {featureList.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle
              size={16}
              weight={selected ? 'fill' : 'regular'}
              className={`mt-0.5 shrink-0 ${selected ? 'text-paddock-green' : 'text-warm-gray'}`}
            />
            <span className="font-sans text-xs leading-relaxed text-warm-brown">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </button>
  )
}
