import { Skeleton } from '@/components/ui/skeleton'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'

export default function BookingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Bookings"
        text="View and manage your booking requests"
      >
        <Skeleton className="h-10 w-44" />
      </DashboardHeader>

      <div className="space-y-1">
        <div className="flex gap-2 border-b pb-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="mt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border border-sand bg-white p-4 shadow-sm"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
