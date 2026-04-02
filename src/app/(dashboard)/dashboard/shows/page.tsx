import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { ShowsPageClient } from '@/components/shows/shows-page-client'

export const metadata = {
  title: 'My Shows | HandlerHub',
}

export const dynamic = 'force-dynamic'

export default async function ShowsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'HANDLER') {
    redirect('/dashboard')
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Shows"
        text="Declare which upcoming shows you plan to attend. Exhibitors can find you through show-specific searches."
      />
      <ShowsPageClient />
    </DashboardShell>
  )
}
