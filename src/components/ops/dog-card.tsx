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

const gradients = [
  'from-[#1a8a5e] via-[#2d9d6e] to-[#1F6B4A]',
  'from-[#5a4a9e] via-[#7b6bb5] to-[#4a3a8e]',
  'from-[#b08040] via-[#c89850] to-[#a07030]',
]

export function DogCard({
  name,
  breed,
  age,
  photoUrl,
  titles,
  shows,
  wins,
  rating,
  gradientClass,
}: DogCardProps) {
  // Pick a gradient based on name hash if not provided
  const gradientIdx =
    name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    gradients.length
  const gradient = gradientClass || gradients[gradientIdx]

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)]`}
    >
      {/* Glassmorphism edge effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />

      {/* Rating badge - top right */}
      {rating && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 backdrop-blur-md">
          <Star size={12} weight="fill" className="text-yellow-300" />
          <span className="font-sans text-xs font-bold text-white">
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
              className="inline-flex items-center gap-0.5 rounded-full bg-black/20 px-2 py-0.5 backdrop-blur-md"
            >
              <Dog size={10} weight="fill" className="text-white/80" />
              <span className="font-sans text-[10px] font-semibold text-white/90">
                {title}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Large photo area - top 60% */}
      <div className="relative h-56 overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
              <Dog size={40} className="text-white/60" weight="duotone" />
            </div>
          </div>
        )}
        {/* Gradient overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content area */}
      <div className="relative flex flex-1 flex-col p-5">
        <h4 className="truncate font-display text-xl font-semibold text-white">
          {name}
        </h4>
        <p className="mt-0.5 truncate font-sans text-sm text-white/70">
          {breed}
          {age ? ` \u00B7 ${age}` : ''}
        </p>

        {/* Stats row */}
        <div className="mt-4 flex items-center gap-4">
          {shows !== undefined && (
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold text-white">
                {shows}
              </span>
              <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-white/60">
                Shows
              </span>
            </div>
          )}
          {wins !== undefined && (
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold text-white">
                {wins}
              </span>
              <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-white/60">
                Wins
              </span>
            </div>
          )}
          <div className="ml-auto">
            <button className="flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-2 font-sans text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:bg-white/30 hover:shadow-lg">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
