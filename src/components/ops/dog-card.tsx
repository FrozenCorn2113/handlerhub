'use client'

import { Dog, Star } from '@phosphor-icons/react'

interface DogCardProps {
  name: string
  breed: string
  age?: string
  photoUrl?: string
  titles?: string[]
  shows?: number
  wins?: number
  rating?: number
  gradientClass?: string
}

export function DogCard({
  name,
  breed,
  age,
  photoUrl,
  titles,
  shows,
  wins,
  rating,
}: DogCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(28,18,8,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.18)]">
      {/* Photo area - clean, no overlay */}
      <div className="relative h-64 overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-light-sand">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sand">
              <Dog size={40} className="text-warm-gray" weight="duotone" />
            </div>
          </div>
        )}

        {/* Rating badge - top right */}
        {rating && (
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)] backdrop-blur-md">
            <Star size={12} weight="fill" className="text-yellow-500" />
            <span className="font-sans text-xs font-bold text-ringside-black">
              {rating}
            </span>
          </div>
        )}

        {/* Titles badge - top left */}
        {titles && titles.length > 0 && (
          <div className="absolute left-3 top-3 z-10 flex gap-1">
            {titles.map((title) => (
              <span
                key={title}
                className="inline-flex items-center gap-0.5 rounded-full bg-white/90 px-2.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)] backdrop-blur-md"
              >
                <Dog size={10} weight="fill" className="text-paddock-green" />
                <span className="font-sans text-[10px] font-semibold text-ringside-black">
                  {title}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content area - clean, below photo */}
      <div className="flex flex-1 flex-col p-5">
        <h4 className="truncate font-display text-xl font-semibold text-ringside-black">
          {name}
        </h4>
        <p className="mt-0.5 truncate font-sans text-sm text-warm-gray">
          {breed}
          {age ? ` \u00B7 ${age}` : ''}
        </p>

        {/* Stats row */}
        <div className="mt-4 flex items-center gap-4">
          {shows !== undefined && (
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold text-ringside-black">
                {shows}
              </span>
              <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-warm-gray">
                Shows
              </span>
            </div>
          )}
          {wins !== undefined && (
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold text-ringside-black">
                {wins}
              </span>
              <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-warm-gray">
                Wins
              </span>
            </div>
          )}
          <div className="ml-auto">
            <button
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green px-4 py-2 font-sans text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_6px_rgba(31,107,74,0.25)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_16px_rgba(31,107,74,0.3)]"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
