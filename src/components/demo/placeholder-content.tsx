import React from 'react'

export default function PlaceholderContent() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            className="size-10"
            viewBox="0 0 24 24"
          >
            <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>

        <h3 className="mt-4 text-lg font-semibold">Content Coming Soon</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          This section is under development.
        </p>
      </div>
    </div>
  )
}
