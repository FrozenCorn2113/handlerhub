import { prisma } from '@/lib/db'
import { withTimeout } from '@/lib/with-timeout'

import {
  type SearchHandler,
  WebmakerSearchPage,
} from '@/components/webmaker/pages/search-page'
import { WebmakerShell } from '@/components/webmaker/shell'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Find a Handler | HandlerHub',
  description:
    'Browse professional dog handlers by breed, region, and service type. Find the perfect handler for your next show.',
}

function inferServiceType(
  services: string[]
): 'Campaign' | 'Ringside' | 'Both' | 'Grooming' {
  const lower = services.map((s) => s.toLowerCase())
  const hasGrooming = lower.some((s) => s.includes('groom'))
  const hasCampaign = lower.some((s) => s.includes('campaign'))
  const hasRingside = lower.some((s) => s.includes('ringside'))
  if (hasCampaign && hasRingside) return 'Both'
  if (hasCampaign) return 'Campaign'
  if (hasRingside) return 'Ringside'
  if (hasGrooming) return 'Grooming'
  return 'Both'
}

export default async function HandlersPage() {
  let handlers: SearchHandler[] = []

  try {
    const dbHandlers = await withTimeout(
      prisma.user.findMany({
        where: { role: 'HANDLER' },
        select: {
          id: true,
          name: true,
          image: true,
          handlerProfile: {
            select: {
              profileImage: true,
              breeds: true,
              regions: true,
              services: true,
              registries: true,
              kennelClubMemberships: true,
              ratePerShow: true,
              yearsExperience: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),
      800,
      'HandlersPage timed out'
    )

    handlers = dbHandlers
      .filter((h) => Boolean(h.handlerProfile))
      .map((h) => {
        const p = h.handlerProfile!
        const allRegistries = [
          ...(p.registries ?? []),
          ...(p.kennelClubMemberships ?? []),
        ]
        // Dedupe registries
        const registries = Array.from(new Set(allRegistries)).filter(Boolean)

        return {
          id: h.id,
          name: h.name ?? 'Professional Handler',
          profileImage: p.profileImage ?? h.image ?? null,
          breeds: p.breeds ?? [],
          regions: p.regions ?? [],
          serviceType: inferServiceType(p.services ?? []),
          registries,
          ratePerShow: p.ratePerShow ?? null,
          yearsExperience: p.yearsExperience ?? null,
        } satisfies SearchHandler
      })
  } catch {
    // If DB unavailable, show empty state
  }

  return (
    <WebmakerShell>
      <WebmakerSearchPage handlers={handlers} />
    </WebmakerShell>
  )
}
