import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import {
  calculateProfileCompleteness,
  getCompletionByCategory,
  getIncompleteFields,
} from '@/lib/profile-completeness'
import { getCurrentUser } from '@/lib/session'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import HandlerProfileForm from '@/components/forms/handler-profile-form'
import { UploadForm } from '@/components/forms/upload-form'
import { FoundingHandlerBanner } from '@/components/marketing/founding-handler-banner'

export const metadata = {
  title: 'Handler Profile',
  description: 'Manage your handler profile',
}

interface HandlerProfilePageProps {
  searchParams?: {
    onboarding?: string
  }
}

export default async function HandlerProfilePage({
  searchParams,
}: HandlerProfilePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'HANDLER') {
    redirect('/dashboard')
  }

  const isOnboarding = searchParams?.onboarding === 'true'

  // Get or create handler profile
  let profile = await prisma.handlerProfile.findUnique({
    where: { userId: user.id },
  })

  // Calculate profile completeness and get detail breakdowns
  const incompleteFields = profile ? getIncompleteFields(profile) : []
  const categories = profile ? getCompletionByCategory(profile) : null
  const completeness = profile ? calculateProfileCompleteness(profile) : 0

  // Update completeness in database if changed
  if (profile && profile.profileCompleteness !== completeness) {
    await prisma.handlerProfile.update({
      where: { userId: user.id },
      data: { profileCompleteness: completeness },
    })
    profile.profileCompleteness = completeness
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Handler Profile"
        text="Manage your professional handler profile. This information will be visible to exhibitors searching for handlers."
      />

      {/* Profile Completeness */}
      {profile && (
        <div className="card-hh mb-6 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-lg font-light text-ringside-black">
              Profile Completeness
            </h3>
            <span className="font-body text-2xl font-semibold text-paddock-green">
              {completeness}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-light-sand">
            <div
              className="h-full rounded-full bg-paddock-green transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>

          {/* Category breakdown */}
          {categories && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Object.values(categories).map((cat) => (
                <div key={cat.label} className="rounded-lg bg-ring-cream p-3">
                  <p className="font-body text-xs text-warm-gray">
                    {cat.label}
                  </p>
                  <p className="font-body text-sm font-semibold text-ringside-black">
                    {cat.completion}%
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Missing fields */}
          {incompleteFields.length > 0 && completeness < 100 && (
            <div className="mt-4">
              <p className="mb-2 font-body text-sm font-semibold text-warm-gray">
                Complete these to improve your visibility:
              </p>
              <div className="flex flex-wrap gap-2">
                {incompleteFields.slice(0, 6).map((field) => (
                  <span
                    key={field.key}
                    className="rounded-full bg-light-sand px-3 py-1 font-body text-xs text-warm-brown"
                  >
                    {field.label}
                  </span>
                ))}
                {incompleteFields.length > 6 && (
                  <span className="font-body text-xs text-warm-gray">
                    +{incompleteFields.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Motivation banner */}
      {profile && completeness < 80 && (
        <div className="mb-6 rounded-xl border border-slate-blue/30 bg-slate-blue/5 p-4">
          <p className="font-display text-base font-light text-ringside-black">
            Complete your profile to appear in search results
          </p>
          <p className="mt-1 font-body text-sm text-warm-gray">
            Handlers with complete profiles get up to 5x more inquiries. Fill
            out the missing sections below to boost your visibility.
          </p>
        </div>
      )}

      {isOnboarding && !profile && (
        <div className="rounded-lg border border-paddock-green/30 bg-sage/20 p-4">
          <p className="font-semibold text-ringside-black">
            Complete your profile to go live
          </p>
          <p className="text-sm text-warm-gray">
            Fill out your handler profile below so exhibitors can find and book
            you. The more complete your profile, the more visible you will be.
          </p>
        </div>
      )}

      {!profile && !isOnboarding && (
        <div className="mb-6">
          <FoundingHandlerBanner variant="compact" showCTA={false} />
        </div>
      )}

      <div className="grid gap-6">
        {/* Profile Photo Upload */}
        <div className="flex items-center gap-4">
          <UploadForm />
          <div>
            <p className="font-medium text-ringside-black">Profile Photo</p>
            <p className="text-sm text-warm-gray">
              Upload a professional photo. This will be visible on your public
              profile.
            </p>
          </div>
        </div>

        {/* View Public Profile */}
        {profile && (
          <a
            href={`/handlers/${user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Public Profile
          </a>
        )}

        <HandlerProfileForm user={user as any} profile={profile} />
      </div>
    </DashboardShell>
  )
}
