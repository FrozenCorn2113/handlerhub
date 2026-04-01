import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { Button } from '@/components/ui/button-ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { EmptyPlaceholder } from '@/components/demo/empty-placeholder'

import { Plus } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'My Dogs',
  description: 'Manage your dog profiles',
}

export default async function DogProfilesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const dogProfiles = await prisma.dogProfile.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Dogs"
        text="Manage your dog profiles. Save your dogs' information to quickly book handlers without re-entering details."
      >
        <Link href="/dashboard/dogs/new">
          <Button>
            <Plus className="mr-2 size-4" />
            Add Dog
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6">
        {dogProfiles.length === 0 ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="dog" />
            <EmptyPlaceholder.Title>Add your first dog</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Save your dog&apos;s details here so booking a handler is quick
              and easy every time.
            </EmptyPlaceholder.Description>
            <Link href="/dashboard/dogs/new">
              <Button>
                <Plus className="mr-2 size-4" />
                Add Your First Dog
              </Button>
            </Link>
          </EmptyPlaceholder>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dogProfiles.map((dog) => (
              <Link key={dog.id} href={`/dashboard/dogs/${dog.id}`}>
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>{dog.name}</CardTitle>
                    <CardDescription>
                      {dog.breed} • {dog.sex} • {dog.age} years old
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {dog.titles && (
                        <div>
                          <span className="font-semibold">Titles: </span>
                          {dog.titles}
                        </div>
                      )}
                      {dog.registeredName && (
                        <div className="text-muted-foreground">
                          {dog.registeredName}
                        </div>
                      )}
                      <div className="mt-2">
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                          {dog.showExperience.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
