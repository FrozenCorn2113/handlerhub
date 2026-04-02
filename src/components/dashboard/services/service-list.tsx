'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { ServiceForm } from './service-form'
import {
  ArrowDown,
  ArrowUp,
  CurrencyDollar,
  Eye,
  EyeSlash,
  PencilSimple,
  Plus,
  Storefront,
  Trash,
} from '@phosphor-icons/react'

interface HandlerService {
  id: string
  name: string
  description: string | null
  price: number
  pricePer: string
  isActive: boolean
  sortOrder: number
}

interface ServiceListProps {
  initialServices: HandlerService[]
}

export function ServiceList({ initialServices }: ServiceListProps) {
  const [services, setServices] = useState<HandlerService[]>(initialServices)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  async function handleCreate(data: {
    name: string
    description: string
    price: string
    pricePer: string
    isActive: boolean
  }) {
    setIsLoading(true)
    try {
      const res = await fetch('/api/handler-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          description: data.description || undefined,
          price: Math.round(parseFloat(data.price) * 100),
          pricePer: data.pricePer,
          isActive: data.isActive,
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        alert(text || 'Failed to create service')
        return
      }
      const service = await res.json()
      setServices([...services, service])
      setShowForm(false)
    } catch {
      alert('Failed to create service')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdate(
    id: string,
    data: {
      name: string
      description: string
      price: string
      pricePer: string
      isActive: boolean
    }
  ) {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/handler-services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          description: data.description || null,
          price: Math.round(parseFloat(data.price) * 100),
          pricePer: data.pricePer,
          isActive: data.isActive,
        }),
      })
      if (!res.ok) {
        alert('Failed to update service')
        return
      }
      const updated = await res.json()
      setServices(services.map((s) => (s.id === id ? updated : s)))
      setEditingId(null)
    } catch {
      alert('Failed to update service')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/handler-services/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        alert('Failed to delete service')
        return
      }
      setServices(services.filter((s) => s.id !== id))
      setDeleteConfirmId(null)
    } catch {
      alert('Failed to delete service')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggleActive(id: string, currentActive: boolean) {
    try {
      const res = await fetch(`/api/handler-services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentActive }),
      })
      if (!res.ok) return
      const updated = await res.json()
      setServices(services.map((s) => (s.id === id ? updated : s)))
    } catch {
      // Silently fail toggle
    }
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const idx = services.findIndex((s) => s.id === id)
    if (
      idx < 0 ||
      (direction === 'up' && idx === 0) ||
      (direction === 'down' && idx === services.length - 1)
    )
      return

    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    const newServices = [...services]
    const temp = newServices[idx]
    newServices[idx] = newServices[swapIdx]
    newServices[swapIdx] = temp

    // Update sort orders
    const updatedServices = newServices.map((s, i) => ({
      ...s,
      sortOrder: i,
    }))
    setServices(updatedServices)

    // Persist both sort orders
    try {
      await Promise.all([
        fetch(`/api/handler-services/${updatedServices[idx].id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: idx }),
        }),
        fetch(`/api/handler-services/${updatedServices[swapIdx].id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: swapIdx }),
        }),
      ])
    } catch {
      // Revert on failure
      setServices(services)
    }
  }

  function formatPrice(cents: number): string {
    return (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)
  }

  return (
    <div className="space-y-6">
      {/* Service cards */}
      {services.length === 0 && !showForm && (
        <Card variant="static" className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sage">
            <Storefront className="h-8 w-8 text-paddock-green" />
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold text-ringside-black">
            Add your first service
          </h3>
          <p className="mx-auto mb-6 max-w-md font-body text-sm text-warm-gray">
            Create service listings to start receiving bookings. Add services
            like Conformation Handling, Show Grooming, or Board & Train with
            clear pricing.
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Service
          </Button>
        </Card>
      )}

      {services.map((service) => {
        if (editingId === service.id) {
          return (
            <ServiceForm
              key={service.id}
              initialData={service}
              onSubmit={(data) => handleUpdate(service.id, data)}
              onCancel={() => setEditingId(null)}
              isLoading={isLoading}
            />
          )
        }

        return (
          <Card
            key={service.id}
            variant="static"
            className={`p-5 transition-all ${
              !service.isActive ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-base font-semibold text-ringside-black">
                    {service.name}
                  </h3>
                  {!service.isActive && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-0.5 font-body text-xs font-medium text-warm-gray">
                      <EyeSlash className="h-3 w-3" />
                      Hidden
                    </span>
                  )}
                </div>
                {service.description && (
                  <p className="mt-1.5 line-clamp-2 font-body text-sm text-warm-brown">
                    {service.description}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1.5">
                  <CurrencyDollar className="h-4 w-4 text-paddock-green" />
                  <span className="font-display text-lg font-semibold text-paddock-green">
                    ${formatPrice(service.price)}
                  </span>
                  <span className="font-body text-sm text-warm-gray">
                    / {service.pricePer}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">
                {/* Reorder buttons */}
                <button
                  onClick={() => handleReorder(service.id, 'up')}
                  disabled={services.indexOf(service) === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black disabled:opacity-30"
                  title="Move up"
                >
                  <ArrowUp className="h-4 w-4" weight="bold" />
                </button>
                <button
                  onClick={() => handleReorder(service.id, 'down')}
                  disabled={services.indexOf(service) === services.length - 1}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black disabled:opacity-30"
                  title="Move down"
                >
                  <ArrowDown className="h-4 w-4" weight="bold" />
                </button>

                {/* Toggle active */}
                <button
                  onClick={() =>
                    handleToggleActive(service.id, service.isActive)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black"
                  title={
                    service.isActive ? 'Hide from profile' : 'Show on profile'
                  }
                >
                  {service.isActive ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeSlash className="h-4 w-4" />
                  )}
                </button>

                {/* Edit */}
                <button
                  onClick={() => setEditingId(service.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-light-sand hover:text-ringside-black"
                  title="Edit"
                >
                  <PencilSimple className="h-4 w-4" />
                </button>

                {/* Delete */}
                {deleteConfirmId === service.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(service.id)}
                      disabled={isLoading}
                      className="rounded-full bg-red-500 px-3 py-1 font-body text-xs font-medium text-white transition-colors hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="rounded-full bg-sand px-3 py-1 font-body text-xs font-medium text-warm-brown"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(service.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-red-50 hover:text-red-500"
                    title="Delete"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </Card>
        )
      })}

      {/* Add service form */}
      {showForm && (
        <ServiceForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          isLoading={isLoading}
        />
      )}

      {/* Add service button */}
      {services.length > 0 && !showForm && services.length < 10 && (
        <Button variant="outline" onClick={() => setShowForm(true)}>
          <Plus className="mr-1.5 h-4 w-4" />
          Add Service
        </Button>
      )}

      {services.length >= 10 && (
        <p className="font-body text-sm text-warm-gray">
          Maximum 10 services reached.
        </p>
      )}
    </div>
  )
}
