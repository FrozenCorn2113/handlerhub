import { Skeleton } from '@/components/ui/skeleton'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'

export default function ShowsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Shows"
        text="Declare which upcoming shows you plan to attend. Exhibitors can find you through show-specific searches."
      />

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg border border-sand bg-white p-4 shadow-sm"
          >
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-3 w-36" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
