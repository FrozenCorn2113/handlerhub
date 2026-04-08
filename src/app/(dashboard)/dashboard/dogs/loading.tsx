import { Skeleton } from '@/components/ui/skeleton'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'

export default function DogsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Dogs"
        text="Manage your dog profiles. Save your dogs' information to quickly book handlers without re-entering details."
      >
        <Skeleton className="h-10 w-28" />
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-sand bg-white p-6 shadow-sm"
          >
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-2 h-4 w-48" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-36" />
              <Skeleton className="mt-3 h-6 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
