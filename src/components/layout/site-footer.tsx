import * as React from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn('border-t border-sand bg-ring-cream px-6 py-4', className)}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <span
          className="text-lg text-paddock-green"
          style={{ fontFamily: "'Roca One', sans-serif" }}
        >
          HandlerHub
        </span>

        <span className="text-xs text-warm-brown">
          &copy; {new Date().getFullYear()} HandlerHub Inc.
        </span>

        <nav className="flex items-center gap-4">
          <Link
            href="/help"
            className="text-xs text-warm-brown hover:underline"
          >
            Help
          </Link>
          <Link
            href="/legal/privacy-policy"
            className="text-xs text-warm-brown hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/legal/terms-of-service"
            className="text-xs text-warm-brown hover:underline"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}
