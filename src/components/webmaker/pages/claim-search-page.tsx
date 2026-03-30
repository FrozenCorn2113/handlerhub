'use client'

import { useState } from 'react'

import Link from 'next/link'

import { MagnifyingGlass, MapPin } from '@phosphor-icons/react'

interface UnclaimedProfile {
  id: string
  fullName: string | null
  businessName: string | null
  city: string | null
  state: string | null
  breeds: string[]
  profileImage: string | null
  user: { id: string; name: string | null; image: string | null }
}

interface ClaimSearchPageProps {
  profiles: UnclaimedProfile[]
}

export function ClaimSearchPage({ profiles }: ClaimSearchPageProps) {
  const [search, setSearch] = useState('')

  const filtered = profiles.filter((p) => {
    const q = search.toLowerCase()
    const name = (p.fullName || p.user.name || '').toLowerCase()
    const business = (p.businessName || '').toLowerCase()
    const location = `${p.city || ''} ${p.state || ''}`.toLowerCase()
    return name.includes(q) || business.includes(q) || location.includes(q)
  })

  return (
    <div className="min-h-[80vh] bg-ring-cream">
      <div className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
        <h1 className="font-display text-3xl font-light tracking-tight text-ringside-black sm:text-4xl">
          Claim Your Profile
        </h1>
        <p className="mt-2 font-body text-base text-warm-gray">
          Find your profile below and claim it to manage your professional
          presence on HandlerHub.
        </p>

        {/* Search */}
        <div className="relative mt-6">
          <MagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-gray" />
          <input
            type="text"
            placeholder="Search by name, business, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-tan bg-white py-3 pl-10 pr-4 font-body text-sm text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:outline-none focus:ring-1 focus:ring-paddock-green"
          />
        </div>

        {/* Results */}
        <div className="mt-8 space-y-4">
          {filtered.length === 0 ? (
            <div className="card-hh p-8 text-center">
              <p className="font-body text-sm text-warm-gray">
                {search
                  ? 'No profiles match your search.'
                  : 'No unclaimed profiles available.'}
              </p>
            </div>
          ) : (
            filtered.map((profile) => (
              <div key={profile.id} className="card-hh p-4">
                <div className="flex items-center gap-4">
                  {profile.profileImage || profile.user.image ? (
                    <img
                      src={profile.profileImage || profile.user.image!}
                      alt={profile.fullName || profile.user.name || 'Handler'}
                      className="h-16 w-16 shrink-0 rounded-full border-2 border-sage object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-tan bg-light-sand">
                      <span className="font-display text-xl text-warm-gray">
                        {(profile.fullName || profile.user.name || '?').charAt(
                          0
                        )}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-light text-ringside-black">
                      {profile.fullName ||
                        profile.user.name ||
                        'Professional Handler'}
                    </h3>
                    {profile.businessName && (
                      <p className="font-body text-sm text-warm-brown">
                        {profile.businessName}
                      </p>
                    )}
                    {(profile.city || profile.state) && (
                      <div className="mt-1 flex items-center gap-1 font-body text-xs text-warm-gray">
                        <MapPin className="h-3 w-3" />
                        {[profile.city, profile.state]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    )}
                    {profile.breeds.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {profile.breeds.slice(0, 3).map((breed) => (
                          <span
                            key={breed}
                            className="chip-breed rounded-full px-2 py-0.5 font-body text-xs"
                          >
                            {breed}
                          </span>
                        ))}
                        {profile.breeds.length > 3 && (
                          <span className="font-body text-xs text-warm-gray">
                            +{profile.breeds.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/claim/confirm?profileId=${profile.id}`}
                    className="btn-secondary shrink-0 text-sm"
                  >
                    Claim
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
