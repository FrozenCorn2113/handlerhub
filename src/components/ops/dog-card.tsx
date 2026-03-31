'use client'

import { Dog } from '@phosphor-icons/react'

interface DogCardProps {
  name: string
  breed: string
  photoUrl?: string
  titles?: string[]
}

export function DogCard({ name, breed, photoUrl, titles }: DogCardProps) {
  return (
    <div className="card-hh flex items-center gap-4">
      {/* Photo or placeholder */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sand">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Dog size={28} className="text-warm-gray" />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-sm font-semibold text-ringside-black">
          {name}
        </p>
        <p className="truncate font-sans text-xs text-warm-brown">{breed}</p>
        {titles && titles.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {titles.map((title) => (
              <span
                key={title}
                className="inline-block rounded-full bg-pastel-sky px-2 py-0.5 font-sans text-[10px] font-medium text-[#1A4A7A]"
              >
                {title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
