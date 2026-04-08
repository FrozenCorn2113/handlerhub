import { Skeleton } from '@/components/ui/skeleton'

import { DashboardShell } from '@/components/dashboard/shell'

export default function ServicesLoading() {
  return (
    <DashboardShell>
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-96" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-sand bg-white p-5 shadow-sm"
          >
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-64" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-10 w-36" />
    </DashboardShell>
  )
}
