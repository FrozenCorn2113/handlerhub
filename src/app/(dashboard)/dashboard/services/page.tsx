import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { ServiceList } from '@/components/dashboard/services/service-list'
import { DashboardShell } from '@/components/dashboard/shell'

export const metadata = {
  title: 'Services',
}

export default async function ServicesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'HANDLER') {
    redirect('/dashboard')
  }

  const services = await prisma.handlerService.findMany({
    where: { handlerId: user.id },
    orderBy: { sortOrder: 'asc' },
  })

  const serialized = services.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    price: s.price,
    pricePer: s.pricePer,
    isActive: s.isActive,
    sortOrder: s.sortOrder,
  }))

  return (
    <DashboardShell>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ringside-black">
          Services & Pricing
        </h1>
        <p className="mt-1 font-body text-sm text-warm-gray">
          Manage your service offerings. Active services appear on your public
          profile and are visible to exhibitors browsing for handlers.
        </p>
      </div>

      <ServiceList initialServices={serialized} />
    </DashboardShell>
  )
}
