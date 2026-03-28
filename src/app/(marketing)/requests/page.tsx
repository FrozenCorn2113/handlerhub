import { prisma } from '@/lib/db'
import { withTimeout } from '@/lib/with-timeout'

import {
  RequestBoard,
  type ServiceRequestItem,
} from '@/components/requests/request-board'
import { WebmakerShell } from '@/components/webmaker/shell'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Request Board | HandlerHub',
  description:
    'Browse open requests from exhibitors looking for handlers, groomers, and more.',
}

export default async function RequestBoardPage() {
  let requests: ServiceRequestItem[] = []

  try {
    const dbRequests = await withTimeout(
      prisma.serviceRequest.findMany({
        where: { status: 'OPEN' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              responses: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 100,
      }),
      800,
      'RequestBoardPage timed out'
    )

    requests = dbRequests.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      showDate: r.showDate ? r.showDate.toISOString() : null,
      updatedAt: undefined as never,
    })) as ServiceRequestItem[]
  } catch {
    // Fall back to empty list if DB is unavailable
  }

  return (
    <WebmakerShell>
      <RequestBoard requests={requests} />
    </WebmakerShell>
  )
}
