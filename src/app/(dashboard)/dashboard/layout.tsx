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

      <main className="container flex-1 py-8">{children}</main>

      <SiteFooter className="border-t" />
    </div>
  )
}
