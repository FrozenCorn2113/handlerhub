/* eslint-disable tailwindcss/classnames-order */
import type { ReactNode } from 'react'

import { WebmakerFooter } from '@/components/webmaker/footer'
import { WebmakerNavbar } from '@/components/webmaker/navbar'

export function WebmakerShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background-light dark:bg-background-dark flex min-h-screen flex-col font-display text-slate-900 selection:bg-primary/20 selection:text-primary dark:text-slate-100">
      <WebmakerNavbar />
      <main className="flex-grow">{children}</main>
      <WebmakerFooter />
    </div>
  )
}
