import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { calculateProfileCompleteness } from '@/lib/profile-completeness'
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

  // Calculate and update profile completeness if profile exists
  if (profile) {
    const completeness = calculateProfileCompleteness(profile)

    // Update in database if changed
    if (profile.profileCompleteness !== completeness) {
      await prisma.handlerProfile.update({
        where: { userId: user.id },
        data: { profileCompleteness: completeness },
      })
      profile.profileCompleteness = completeness
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Handler Profile"
        text="Manage your professional handler profile. This information will be visible to exhibitors searching for handlers."
      />

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

        {/* Handler level progress hidden during launch */}

        <HandlerProfileForm user={user as any} profile={profile} />
      </div>
    </DashboardShell>
  )
}
