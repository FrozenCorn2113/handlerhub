import { notFound, redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { ClaimConfirmPage } from '@/components/webmaker/pages/claim-confirm-page'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Confirm Profile Claim | HandlerHub',
  description: 'Confirm that this is your professional handler profile.',
}

interface ClaimConfirmPageProps {
  searchParams: { profileId?: string }
}

export default async function ClaimConfirm({
  searchParams,
}: ClaimConfirmPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    const returnUrl = `/claim/confirm?profileId=${searchParams.profileId || ''}`
    redirect(`/login?next=${encodeURIComponent(returnUrl)}`)
  }

  const profileId = searchParams.profileId
  if (!profileId) notFound()

  const profile = await prisma.handlerProfile.findUnique({
    where: { id: profileId },
    select: {
      id: true,
      fullName: true,
      businessName: true,
      bio: true,
      city: true,
      state: true,
      breeds: true,
      profileImage: true,
      isClaimed: true,
      user: { select: { id: true, name: true, image: true } },
    },
  })

  if (!profile) notFound()

  // If already claimed, redirect to the handler's profile
  if (profile.isClaimed) {
    redirect(`/handlers/${profile.user.id}`)
  }

  return <ClaimConfirmPage profile={profile} userId={user.id!} />
}
