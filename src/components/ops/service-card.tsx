'use client'

import { Check, CheckCircle } from '@phosphor-icons/react'

interface ServiceCardProps {
  name: string
  price: number
  pricePer: string
  description: string
  tiers?: { name: string; price: number; pricePer: string }[]
  features?: string[]
  icon?: React.ReactNode
  selected?: boolean
  onToggle?: () => void
}

export function ServiceCard({
  name,
  price,
  description,
  features,
  icon,
  selected = false,
  onToggle,
}: ServiceCardProps) {
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
      {/* Header row: icon + checkbox */}
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

      {/* Service name */}
      <h4 className="font-display text-lg font-semibold text-ringside-black">
        {name}
      </h4>

      {/* Price */}
      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-sans text-2xl font-bold text-ringside-black">
          {formattedPrice}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 font-sans text-sm leading-relaxed text-warm-gray">
        {description}
      </p>

      {/* Feature list */}
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
