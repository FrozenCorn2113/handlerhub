'use client'

import Link from 'next/link'

interface DashboardRequest {
  id: string
  title: string
  serviceType: string
  breed: string | null
  region: string | null
  createdAt: string
  _count: { responses: number }
}

interface DashboardRequestListProps {
  requests: DashboardRequest[]
}

function formatServiceType(type: string): string {
  return type.charAt(0) + type.slice(1).toLowerCase()
}

export function DashboardRequestList({ requests }: DashboardRequestListProps) {
  return (
    <div className="space-y-3">
      {requests.map((r) => (
        <Link
          key={r.id}
          href={`/requests/${r.id}`}
          className="flex items-center justify-between rounded-md border p-3 transition-colors hover:bg-muted/50"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{r.title}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatServiceType(r.serviceType)}
              </span>
              {r.breed && (
                <>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">
                    {r.breed}
                  </span>
                </>
              )}
              {r.region && (
                <>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">
                    {r.region}
                  </span>
                </>
              )}
            </div>
          </div>
          <span className="ml-4 shrink-0 text-xs text-muted-foreground">
            {r._count.responses} response{r._count.responses !== 1 ? 's' : ''}
          </span>
        </Link>
      ))}
    </div>
  )
}
