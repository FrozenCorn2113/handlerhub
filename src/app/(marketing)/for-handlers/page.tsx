import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { FoundingHandlerBanner } from '@/components/marketing/founding-handler-banner'

import {
  Calendar,
  Check,
  CurrencyDollar,
  Shield,
  Sparkle,
  Star,
  TrendUp,
  Users,
} from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'For Handlers | Join the Founding Handler Program',
  description:
    'Join HandlerHub as a founding handler - 100% free, no commission, no fees. Build your profile and connect with exhibitors nationwide.',
}

export default function ForHandlersPage() {
  return (
    <div className="container max-w-6xl py-10">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
          Limited Time Offer
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Join the{' '}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Founding Handler Program
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
          Be part of building the premier dog show handler marketplace. Join
          100% free during our launch - no subscription fees, no commission,
          ever.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/register">
              <Sparkle className="mr-2 size-5" />
              Join as Founding Handler
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="/handlers">Browse Handler Profiles</Link>
          </Button>
        </div>
      </div>

      {/* Main Banner */}
      <div className="mb-16">
        <FoundingHandlerBanner showCTA={false} />
      </div>

      {/* Benefits Grid */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Why Join as a Founding Handler?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CurrencyDollar className="mb-2 size-10 text-primary" />
              <CardTitle>100% Free Forever</CardTitle>
              <CardDescription>
                No subscription fees, no commission on bookings. All fees go
                directly to you.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="mb-2 size-10 text-primary" />
              <CardTitle>Connect with Exhibitors</CardTitle>
              <CardDescription>
                Reach exhibitors nationwide who are actively looking for
                professional handlers.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendUp className="mb-2 size-10 text-primary" />
              <CardTitle>Grow Your Business</CardTitle>
              <CardDescription>
                Showcase your expertise, wins, and experience to attract new
                clients.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="mb-2 size-10 text-primary" />
              <CardTitle>Manage Bookings</CardTitle>
              <CardDescription>
                Track booking requests, manage your availability, and organize
                your schedule.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="mb-2 size-10 text-primary" />
              <CardTitle>Build Trust</CardTitle>
              <CardDescription>
                Display credentials, insurance, references, and kennel club
                memberships.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Star className="mb-2 size-10 text-primary" />
              <CardTitle>Founding Member Status</CardTitle>
              <CardDescription>
                Be recognized as a founding handler who helped build the
                platform.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Features Included */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Everything You Need to Succeed
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">
                    Complete Professional Profile
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Showcase your experience, breed specialties, show wins, and
                    credentials
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Photo Gallery</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload photos of you at shows, with dogs, and winning
                    moments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Booking Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive and manage booking requests in one dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Availability Calendar</h3>
                  <p className="text-sm text-muted-foreground">
                    Let exhibitors know when you&apos;re available and taking
                    bookings
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Direct Messaging</h3>
                  <p className="text-sm text-muted-foreground">
                    Communicate directly with exhibitors about show details
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Set Your Own Rates</h3>
                  <p className="text-sm text-muted-foreground">
                    Display your pricing or keep it flexible - you&apos;re in
                    control
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Service Area Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    Specify regions you serve and your travel willingness
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">No Hidden Fees</h3>
                  <p className="text-sm text-muted-foreground">
                    100% of what you charge goes to you - we take nothing
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <CardTitle>Create Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sign up free and build your professional handler profile. Add
                your experience, breed specialties, show wins, photos, and
                credentials.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <CardTitle>Receive Booking Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Exhibitors search for handlers by breed, location, and
                experience. When they find you, they send booking requests with
                show details.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <CardTitle>Accept & Grow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Review requests, communicate with exhibitors, and accept
                bookings. Build your reputation and grow your client base across
                the country.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is it really 100% free?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes! There are no subscription fees, no commission on bookings,
                and no hidden charges. Founding handlers get lifetime free
                access to thank them for being early adopters.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What&apos;s the catch?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                There&apos;s no catch! We&apos;re building HandlerHub with input
                from the handler community. By joining early, you help us create
                the best possible platform. In return, you get free lifetime
                access and founding member recognition.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                How long will this be free?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Founding handlers who join during our launch phase keep their
                free access forever. We may introduce pricing for new handlers
                in the future, but founding members are grandfathered in.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                What about payments between me and exhibitors?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Payments happen directly between you and the exhibitor. We
                don&apos;t process payments or take any commission. You set your
                rates and handle payment however you prefer.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="rounded-lg border-2 border-primary bg-gradient-to-r from-primary/10 to-transparent p-8 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to Join the Founding Handler Program?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
          Create your professional profile today and start connecting with
          exhibitors nationwide. 100% free, no commitment required.
        </p>
        <Button size="lg" asChild>
          <Link href="/register">
            <Sparkle className="mr-2 size-5" />
            Get Started - It&apos;s Free
          </Link>
        </Button>
      </div>
    </div>
  )
}
