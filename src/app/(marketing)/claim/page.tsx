import { prisma } from '@/lib/db'

import { ClaimSearchPage } from '@/components/webmaker/pages/claim-search-page'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Claim Your Profile',
  description:
    'Professional handlers: claim your profile on HandlerHub to manage your online presence.',
}

export default async function ClaimPage() {
  // Fetch unclaimed profiles
  const unclaimed = await prisma.handlerProfile.findMany({
    where: { isClaimed: false },
    select: {
      id: true,
      fullName: true,
      businessName: true,
      city: true,
      state: true,
      breeds: true,
      profileImage: true,
      user: { select: { id: true, name: true, image: true } },
    },
    orderBy: { fullName: 'asc' },
  })

  return <ClaimSearchPage profiles={unclaimed} />
}
