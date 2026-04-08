import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { DeleteDogButton } from '@/components/dogs/delete-dog-button'
import DogProfileForm from '@/components/forms/dog-profile-form'

export const metadata = {
  title: 'Edit Dog Profile',
  description: 'Edit your dog profile',
}

interface DogProfileEditPageProps {
  params: {
    id: string
  }
}

export default async function DogProfileEditPage({
  params,
}: DogProfileEditPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const dogProfile = await prisma.dogProfile.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!dogProfile) {
    notFound()
  }

  // Ensure the user owns this dog profile
  if (dogProfile.userId !== user.id) {
    redirect('/dashboard/dogs')
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Edit ${dogProfile.name}'s Profile`}
        text="Update your dog's information and preferences."
      >
        <DeleteDogButton dogId={dogProfile.id} dogName={dogProfile.name} />
      </DashboardHeader>

      <div className="grid gap-10">
        <DogProfileForm profile={dogProfile} mode="edit" />
      </div>
    </DashboardShell>
  )
}
