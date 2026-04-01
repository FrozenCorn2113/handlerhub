'use client'

import { Dog, PawPrint } from '@phosphor-icons/react'

interface DogCardProps {
  name: string
  breed: string
  photoUrl?: string
  titles?: string[]
}

export function DogCard({ name, breed, photoUrl, titles }: DogCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.14)]">
      {/* Image area */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-paddock-green/15 via-sage/40 to-slate-blue/15">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm">
              <PawPrint
                size={32}
                className="text-paddock-green/60"
                weight="fill"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h4
          className="truncate font-display text-lg font-medium text-ringside-black"
          style={{ lineHeight: 1.2, marginBottom: '0.25rem' }}
        >
          {name}
        </h4>
        <p className="truncate font-sans text-xs text-warm-gray">{breed}</p>

        {titles && titles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {titles.map((title) => (
              <span
                key={title}
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-paddock-green to-paddock-green/90 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-wide text-white shadow-[0_1px_4px_rgba(31,107,74,0.25)]"
              >
                <Dog size={10} weight="fill" />
                {title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
