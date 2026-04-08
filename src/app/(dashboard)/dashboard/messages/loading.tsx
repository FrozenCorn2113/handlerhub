import { Skeleton } from '@/components/ui/skeleton'

export default function MessagesLoading() {
  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-sand bg-white shadow-sm">
      {/* Conversation sidebar */}
      <div className="w-80 border-r border-sand p-4">
        <Skeleton className="mb-4 h-8 w-full" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg p-2">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message area */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-3 border-b border-sand pb-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex justify-start">
            <Skeleton className="h-16 w-64 rounded-2xl" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-12 w-48 rounded-2xl" />
          </div>
          <div className="flex justify-start">
            <Skeleton className="h-20 w-72 rounded-2xl" />
          </div>
        </div>
        <Skeleton className="mt-4 h-12 w-full rounded-lg" />
      </div>
    </div>
  )
}
