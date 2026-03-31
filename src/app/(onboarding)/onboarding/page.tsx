import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db'

import { OnboardingWizard } from '@/components/onboarding/wizard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Get Started - HandlerHub',
  description: 'Set up your HandlerHub profile in a few quick steps.',
}

export default async function OnboardingPage() {
  const session = await auth()

  // Not authenticated - send to register with return URL
  if (!session?.user?.id) {
    redirect('/register?next=/onboarding')
  }

  const userId = session.user.id

  // Fetch user and profile in parallel
  const [user, profile] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    }),
    prisma.handlerProfile.findUnique({
      where: { userId },
    }),
  ])

  if (!user) {
    redirect('/register?next=/onboarding')
  }

  // If handler with a mostly-complete profile, send to dashboard
  if (
    user.role === 'HANDLER' &&
    profile &&
    profile.profileCompleteness &&
    profile.profileCompleteness > 60
  ) {
    redirect('/dashboard')
  }

  // Serialize the profile for the client component
  const serializedProfile = profile ? JSON.parse(JSON.stringify(profile)) : null

  return (
    <OnboardingWizard
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      }}
      existingProfile={serializedProfile}
    />
  )
}
