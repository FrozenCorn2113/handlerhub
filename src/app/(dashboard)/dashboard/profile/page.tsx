import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { calculateProfileCompleteness } from '@/lib/profile-completeness'
import { getCurrentUser } from '@/lib/session'

import { DashboardHeader } from '@/components/dashboard/header'
import { ProfileCompletenessIndicator } from '@/components/dashboard/profile/profile-completeness-indicator'
import ProfileEditor from '@/components/dashboard/profile/profile-editor'
import { DashboardShell } from '@/components/dashboard/shell'
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

  // Calculate profile completeness
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
        text="Manage your professional handler profile. Complete each section to maximize your visibility."
      />

      {/* Onboarding banner for new profiles */}
      {isOnboarding && !profile && (
        <div className="rounded-2xl border border-paddock-green/30 bg-sage/20 p-5">
          <p className="font-display text-lg font-semibold text-ringside-black">
            Complete your profile to go live
          </p>
          <p className="mt-1 font-body text-sm text-warm-gray">
            Fill out your handler profile below so exhibitors can find and book
            you. The more complete your profile, the more visible you will be.
          </p>
        </div>
      )}

      {!profile && !isOnboarding && (
        <FoundingHandlerBanner variant="compact" showCTA={false} />
      )}

      {/* Tiered Completeness Indicator */}
      {profile && <ProfileCompletenessIndicator completeness={completeness} />}

      {/* Profile Photo Upload */}
      <div className="rounded-2xl border border-sand bg-white p-6 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
        <div className="flex items-center gap-5">
          <UploadForm />
          <div>
            <p className="font-display text-base font-semibold text-ringside-black">
              Profile Photo
            </p>
            <p className="mt-0.5 font-body text-sm text-warm-gray">
              Upload a professional photo. Profiles with photos get 5x more
              views.
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Profile Editor */}
      <ProfileEditor user={user as any} profile={profile} />
    </DashboardShell>
  )
}
