import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'

export const metadata = {
  title: 'Users',
  description: 'Manage your users.',
}

export default async function UsersPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage your users." />
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-sand bg-white p-12 text-center shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 h-12 w-12 text-warm-brown/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2.25 2.25 0 013 16.878V16.5a9.002 9.002 0 0112-8.485M15 19.128v-.003c0-1.113.285-2.16.786-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
        <h3 className="font-display text-lg font-semibold text-ringside-black">
          Coming Soon
        </h3>
        <p className="mt-2 max-w-sm font-body text-sm text-warm-brown">
          User management is on its way. You will be able to view and manage
          your clients, handlers, and team members here.
        </p>
      </div>
    </DashboardShell>
  )
}
