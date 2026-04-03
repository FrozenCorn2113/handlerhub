import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import { DashboardSidebar } from '@/components/layout/navigation/dashboard-sidebar'
import { SiteFooter } from '@/components/layout/site-footer'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 bg-ring-cream py-8">
          <div className="container">{children}</div>
        </main>

        <SiteFooter className="border-t" />
      </div>
    </div>
  )
}
