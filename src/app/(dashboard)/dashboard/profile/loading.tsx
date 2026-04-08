import { Skeleton } from '@/components/ui/skeleton'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'

export default function ProfileLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Handler Profile"
        text="Manage your professional handler profile. Complete each section to maximize your visibility."
      />

      {/* Completeness indicator skeleton */}
      <Skeleton className="h-16 w-full rounded-xl" />

      {/* Profile photo section */}
      <div className="rounded-2xl border border-sand bg-white p-6 shadow-sm">
        <div className="flex items-center gap-5">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-64" />
          </div>
        </div>
      </div>

      {/* Profile editor tabs skeleton */}
      <div className="rounded-2xl border border-sand bg-white p-6 shadow-sm">
        <div className="flex gap-2 border-b pb-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="mt-6 space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </DashboardShell>
  )
}
