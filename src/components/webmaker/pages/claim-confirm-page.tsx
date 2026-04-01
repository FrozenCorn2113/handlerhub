'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { CheckCircle, MapPin, Warning } from '@phosphor-icons/react'

interface ClaimProfile {
  id: string
  fullName: string | null
  businessName: string | null
  bio: string | null
  city: string | null
  state: string | null
  breeds: string[]
  profileImage: string | null
  user: { id: string; name: string | null; image: string | null }
}

interface ClaimConfirmPageProps {
  profile: ClaimProfile
  userId: string
}

export function ClaimConfirmPage({ profile, userId }: ClaimConfirmPageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClaim() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: profile.id }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to claim profile')
      }

      // Redirect to the claimed profile
      router.push(`/handlers/${userId}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const name = profile.fullName || profile.user.name || 'Professional Handler'
  const location = [profile.city, profile.state].filter(Boolean).join(', ')

  return (
    <div className="min-h-[80vh] bg-ring-cream">
      <div className="mx-auto max-w-2xl px-6 py-10 lg:px-8">
        <h1 className="font-display text-3xl font-light tracking-tight text-ringside-black">
          Confirm Your Profile
        </h1>
        <p className="mt-2 font-body text-base text-warm-gray">
          Please verify that this is your professional handler profile.
        </p>

        {/* Profile Preview */}
        <div className="card-hh mt-8 p-6">
          <div className="flex items-start gap-4">
            {profile.profileImage || profile.user.image ? (
              <img
                src={profile.profileImage || profile.user.image!}
                alt={name}
                className="h-20 w-20 shrink-0 rounded-full border-2 border-sage object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-tan bg-light-sand">
                <span className="font-display text-2xl text-warm-gray">
                  {name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h2 className="font-display text-xl font-light text-ringside-black">
                {name}
              </h2>
              {profile.businessName && (
                <p className="font-body text-sm text-warm-brown">
                  {profile.businessName}
                </p>
              )}
              {location && (
                <div className="mt-1 flex items-center gap-1 font-body text-sm text-warm-gray">
                  <MapPin className="h-4 w-4" />
                  {location}
                </div>
              )}
              {profile.bio && (
                <p className="mt-3 line-clamp-3 font-body text-sm leading-relaxed text-warm-brown">
                  {profile.bio}
                </p>
              )}
              {profile.breeds.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {profile.breeds.slice(0, 5).map((breed) => (
                    <span
                      key={breed}
                      className="chip-breed rounded-full px-2 py-0.5 font-body text-xs"
                    >
                      {breed}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-light-sand p-4">
          <Warning className="mt-0.5 h-5 w-5 shrink-0 text-slate-blue" />
          <div>
            <p className="font-body text-sm font-semibold text-ringside-black">
              This action cannot be undone
            </p>
            <p className="mt-1 font-body text-sm text-warm-gray">
              By claiming this profile, it will be linked to your HandlerHub
              account. You will be able to edit all profile information from
              your dashboard.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4">
            <p className="font-body text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleClaim}
            disabled={loading}
            className="btn-primary"
          >
            <CheckCircle className="h-5 w-5" />
            {loading ? 'Claiming...' : 'Confirm This Is Me'}
          </button>
          <button
            onClick={() => router.push('/claim')}
            className="btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
