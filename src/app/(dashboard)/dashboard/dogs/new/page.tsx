import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import DogProfileForm from '@/components/forms/dog-profile-form'

export const metadata = {
  title: 'Add Dog Profile',
  description: 'Create a new dog profile',
}

export default async function NewDogProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Add Dog Profile"
        text="Create a profile for your dog to quickly book handlers without re-entering information each time."
      />

      <div className="grid gap-10">
        <DogProfileForm mode="create" />
      </div>
    </DashboardShell>
  )
}
