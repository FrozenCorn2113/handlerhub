import { notFound } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { RequestDetail } from '@/components/requests/request-detail'

export const dynamic = 'force-dynamic'

interface RequestDetailPageProps {
  params: {
    id: string
  }
}

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const user = await getCurrentUser().catch(() => null)

  const serviceRequest = await prisma.serviceRequest.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      responses: {
        include: {
          handler: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          conversation: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!serviceRequest) {
    notFound()
  }

  const serialized = {
    ...serviceRequest,
    createdAt: serviceRequest.createdAt.toISOString(),
    updatedAt: serviceRequest.updatedAt.toISOString(),
    showDate: serviceRequest.showDate
      ? serviceRequest.showDate.toISOString()
      : null,
    responses: serviceRequest.responses.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    })),
  }

  return (
    <RequestDetail
      request={serialized}
      currentUserId={user?.id ?? null}
      currentUserRole={user?.role ?? null}
    />
  )
}
