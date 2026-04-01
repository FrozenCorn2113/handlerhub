import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import { DashboardNavBar } from '@/components/layout/navigation/dashboard-nav-bar'
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
    <div className="flex min-h-screen flex-col">
      <DashboardNavBar />

      <main className="flex-1 bg-ring-cream py-8">
        <div className="container">{children}</div>
      </main>

      <SiteFooter className="border-t" />
    </div>
  )
}
