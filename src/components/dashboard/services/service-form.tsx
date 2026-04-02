'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { FloppyDisk, X } from '@phosphor-icons/react'

interface ServiceFormData {
  name: string
  description: string
  price: string
  pricePer: string
  isActive: boolean
}

interface ServiceFormProps {
  initialData?: {
    id: string
    name: string
    description: string | null
    price: number
    pricePer: string
    isActive: boolean
  }
  onSubmit: (data: ServiceFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const PRICE_PER_OPTIONS = [
  { label: 'Per Show', value: 'show' },
  { label: 'Per Day', value: 'day' },
  { label: 'Per Session', value: 'session' },
  { label: 'Flat Fee', value: 'flat fee' },
]

const SERVICE_SUGGESTIONS = [
  'Conformation Handling',
  'Show Grooming',
  'Board & Train',
  'Puppy Match Handling',
  'Group Handling',
  'Specialty Show Handling',
  'Junior Showmanship Coaching',
  'Photo Session',
]

export function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ServiceFormProps) {
  const [form, setForm] = useState<ServiceFormData>({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    price: initialData ? (initialData.price / 100).toFixed(2) : '',
    pricePer: initialData?.pricePer ?? 'show',
    isActive: initialData?.isActive ?? true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = 'Service name is required'
    const priceNum = parseFloat(form.price)
    if (!form.price || isNaN(priceNum) || priceNum <= 0)
      newErrors.price = 'Enter a valid price'
    if (priceNum > 99999) newErrors.price = 'Price cannot exceed $99,999'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    await onSubmit(form)
  }

  const isEditing = !!initialData

  return (
    <Card variant="static" className="border-2 border-paddock-green/20 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-ringside-black">
          {isEditing ? 'Edit Service' : 'Add New Service'}
        </h3>
        <button
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black"
        >
          <X className="h-4 w-4" weight="bold" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Service name */}
        <div>
          <label className="mb-1.5 block font-body text-sm font-medium text-ringside-black">
            Service Name
          </label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Conformation Handling"
            className={errors.name ? 'border-red-400' : ''}
          />
          {errors.name && (
            <p className="mt-1 font-body text-xs text-red-500">{errors.name}</p>
          )}
          {/* Suggestions for empty name */}
          {!form.name && !isEditing && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {SERVICE_SUGGESTIONS.slice(0, 4).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm({ ...form, name: s })}
                  className="rounded-full bg-light-sand px-3 py-1 font-body text-xs text-warm-brown transition-colors hover:bg-sage hover:text-paddock-green"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block font-body text-sm font-medium text-ringside-black">
            Description{' '}
            <span className="font-normal text-warm-gray">(optional)</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe what this service includes..."
            rows={3}
            maxLength={500}
            className="w-full rounded-xl border border-sand bg-white px-4 py-3 font-body text-sm text-ringside-black placeholder:text-warm-gray/60 focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
          />
          <p className="mt-1 text-right font-body text-xs text-warm-gray">
            {form.description.length}/500
          </p>
        </div>

        {/* Price + Price Per row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-ringside-black">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm text-warm-gray">
                $
              </span>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                className={`pl-7 ${errors.price ? 'border-red-400' : ''}`}
              />
            </div>
            {errors.price && (
              <p className="mt-1 font-body text-xs text-red-500">
                {errors.price}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-ringside-black">
              Price Per
            </label>
            <select
              value={form.pricePer}
              onChange={(e) => setForm({ ...form, pricePer: e.target.value })}
              className="h-10 w-full rounded-xl border border-sand bg-white px-3 font-body text-sm text-ringside-black focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
            >
              {PRICE_PER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={form.isActive}
            onClick={() => setForm({ ...form, isActive: !form.isActive })}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              form.isActive ? 'bg-paddock-green' : 'bg-sand'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                form.isActive ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
          <span className="font-body text-sm text-warm-brown">
            {form.isActive
              ? 'Active - visible on profile'
              : 'Inactive - hidden from profile'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isLoading}>
            <FloppyDisk className="mr-1.5 h-4 w-4" />
            {isLoading
              ? 'Saving...'
              : isEditing
                ? 'Save Changes'
                : 'Add Service'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
