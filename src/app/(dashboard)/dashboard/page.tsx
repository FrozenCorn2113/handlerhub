import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { DashboardRequestList } from '@/components/requests/dashboard-request-list'

export const metadata = {
  title: 'Dashboard',
}

export const dynamic = 'force-dynamic'

async function HandlerDashboard({ userId }: { userId: string }) {
  let profile: Awaited<ReturnType<typeof prisma.handlerProfile.findUnique>> =
    null
  let recentConversations: Array<{
    id: string
    messages: Array<{
      content: string
      sender: { id: string; name: string | null } | null
    }>
  }> = []
  let matchingRequests: Array<{
    id: string
    title: string
    serviceType: string
    breed: string | null
    region: string | null
    createdAt: string
    _count: { responses: number }
  }> = []

  try {
    profile = await prisma.handlerProfile.findUnique({
      where: { userId },
    })

    // Recent messages
    const convos = await prisma.conversation.findMany({
      where: { participantIds: { has: userId } },
      orderBy: { lastMessageAt: 'desc' },
      take: 5,
      include: {
        messages: {
          orderBy: { sentAt: 'desc' },
          take: 1,
          include: {
            sender: { select: { id: true, name: true } },
          },
        },
      },
    })
    recentConversations = convos

    // Open requests matching handler profile
    if (profile) {
      const orFilters: Array<Record<string, unknown>> = []
      if (profile.breeds.length > 0) {
        orFilters.push({ breed: { in: profile.breeds } })
      }
      if (profile.regions.length > 0) {
        orFilters.push({ region: { in: profile.regions } })
      }

      const where: Record<string, unknown> = { status: 'OPEN' }
      if (orFilters.length > 0) {
        where.OR = orFilters
      }

      const dbRequests = await prisma.serviceRequest.findMany({
        where,
        select: {
          id: true,
          title: true,
          serviceType: true,
          breed: true,
          region: true,
          createdAt: true,
          _count: { select: { responses: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 6,
      })

      matchingRequests = dbRequests.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
      }))
    }
  } catch {
    // Silently fail if DB unavailable
  }

  return (
    <>
      {/* Stats row — placeholder for upcoming activity metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Profile Views', value: '--' },
          { label: 'Pending Inquiries', value: '0' },
          { label: 'Response Rate', value: '--' },
        ].map((stat) => (
          <Card key={stat.label} variant="static" className="bg-ring-cream/40">
            <CardContent className="p-5">
              <p className="font-display text-sm font-medium text-ringside-black">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-2xl font-light text-ringside-black">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-warm-gray">Coming soon</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Your latest conversations</CardDescription>
          </CardHeader>
          <CardContent>
            {recentConversations.length === 0 ? (
              <div className="rounded-xl bg-ring-cream/60 p-6 text-center">
                <p className="font-body text-sm text-warm-gray">
                  Your inbox is quiet for now. Once you connect with exhibitors
                  or handlers, conversations will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentConversations.map((conv) => {
                  const lastMsg = conv.messages[0]
                  return (
                    <Link
                      key={conv.id}
                      href="/dashboard/messages"
                      className="block rounded-xl border border-sand p-3 transition-all hover:bg-ring-cream hover:shadow-sm"
                    >
                      <p className="text-sm font-medium">
                        {lastMsg?.sender?.name || 'Unknown'}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {lastMsg?.content || 'No messages'}
                      </p>
                    </Link>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Open Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Open Requests</CardTitle>
                <CardDescription>
                  Requests matching your profile
                </CardDescription>
              </div>
              <Link
                href="/requests"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {!profile ? (
              <div className="rounded-xl bg-ring-cream/60 p-6 text-center">
                <p className="mb-3 font-body text-sm text-warm-gray">
                  Complete your profile to see matching requests from
                  exhibitors. The more details you share, the better your
                  matches will be.
                </p>
                <Link
                  href="/dashboard/profile"
                  className="font-body text-sm font-medium text-paddock-green hover:underline"
                >
                  Complete Your Profile
                </Link>
              </div>
            ) : matchingRequests.length > 0 ? (
              <DashboardRequestList requests={matchingRequests} />
            ) : (
              <div className="rounded-xl bg-ring-cream/60 p-6 text-center">
                <p className="font-body text-sm text-warm-gray">
                  No matching requests right now, but new ones come in all the
                  time.{' '}
                  <Link
                    href="/requests"
                    className="font-medium text-paddock-green hover:underline"
                  >
                    Browse all requests
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

async function ExhibitorDashboard({ userId }: { userId: string }) {
  let myRequests: Array<{
    id: string
    title: string
    status: string
    _count: { responses: number }
  }> = []
  let bookingRequests: Array<{
    id: string
    status: string
    showName: string
    dogBreed: string
    handler: { name: string | null; image: string | null } | null
  }> = []

  try {
    myRequests = await prisma.serviceRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        status: true,
        _count: { select: { responses: true } },
      },
    })

    bookingRequests = await prisma.bookingRequest.findMany({
      where: { exhibitorId: userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        status: true,
        showName: true,
        dogBreed: true,
        handler: { select: { name: true, image: true } },
      },
    })
  } catch {
    // Silently fail
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* My Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Your Requests</CardTitle>
          <CardDescription>Service requests you have posted</CardDescription>
        </CardHeader>
        <CardContent>
          {myRequests.length === 0 ? (
            <div className="rounded-xl bg-ring-cream/60 p-6 text-center">
              <p className="mb-4 font-body text-sm text-warm-gray">
                Ready to find the perfect handler for your dog? Post a request
                and let experienced professionals come to you.
              </p>
              <Button asChild variant="default" size="lg">
                <Link href="/handlers">Find Handlers</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  className="rounded-xl border border-sand p-3 transition-all hover:bg-ring-cream/40"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{req.title}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        req.status === 'OPEN'
                          ? 'bg-paddock-green/10 text-paddock-green'
                          : 'bg-sand text-warm-gray'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {req._count.responses} response
                    {req._count.responses !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Booking requests you have sent</CardDescription>
        </CardHeader>
        <CardContent>
          {bookingRequests.length === 0 ? (
            <div className="rounded-xl bg-ring-cream/60 p-6 text-center">
              <p className="font-body text-sm text-warm-gray">
                No bookings yet. When you are ready, browse our network of
                trusted handlers to get started.{' '}
                <Link
                  href="/handlers"
                  className="font-medium text-paddock-green hover:underline"
                >
                  Browse handlers
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookingRequests.map((booking) => (
                <Link
                  key={booking.id}
                  href="/dashboard/bookings"
                  className="block rounded-xl border border-sand p-3 transition-all hover:bg-ring-cream/40 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {booking.handler?.name || 'Handler'}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        booking.status === 'ACCEPTED'
                          ? 'bg-paddock-green/10 text-paddock-green'
                          : booking.status === 'DECLINED'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-sand text-warm-gray'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {booking.showName} - {booking.dogBreed}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  // Handlers without a complete profile go to onboarding
  if (user.role === 'HANDLER') {
    const profile = await prisma.handlerProfile.findUnique({
      where: { userId: user.id! },
      select: { profileCompleteness: true },
    })
    if (
      !profile ||
      profile.profileCompleteness === null ||
      profile.profileCompleteness < 60
    ) {
      redirect('/onboarding')
    }
  }

  const userRole = user.role
  const firstName = user.name?.split(' ')[0] || 'there'

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Welcome back, ${firstName}`}
        text={
          userRole === 'HANDLER'
            ? 'Your handler activity at a glance'
            : userRole === 'EXHIBITOR'
              ? "Here's what's happening with your dogs."
              : 'Welcome to HandlerHub.'
        }
      >
        {userRole === 'ADMIN' && (
          <Button asChild variant="ghost">
            <Link href="/dashboard-admin">Go to admin dashboard</Link>
          </Button>
        )}
      </DashboardHeader>

      {userRole === 'HANDLER' && <HandlerDashboard userId={user.id!} />}
      {userRole === 'EXHIBITOR' && <ExhibitorDashboard userId={user.id!} />}

      {userRole === 'ADMIN' && (
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Use the admin dashboard for site management.
            </p>
          </CardContent>
        </Card>
      )}
    </DashboardShell>
  )
}
