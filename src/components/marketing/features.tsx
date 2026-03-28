import { cn } from '@/lib/utils'

import { BlockTitle } from '@/components/layout/main-title'

export default function Features({ className }: { className?: string }) {
  return (
    <section className={cn(className) + ' w-full'}>
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-16 px-4 sm:gap-y-24 sm:px-6 lg:px-8">
          <BlockTitle.Wrapper>
            <BlockTitle.Header elementType="h2">Features</BlockTitle.Header>

            <BlockTitle.Title elementType="h3">
              Everything You Need to Find the Perfect Handler
            </BlockTitle.Title>

            <BlockTitle.Description>
              HandlerHub makes it easy to connect with professional handlers and
              manage your dog show services.
            </BlockTitle.Description>

            <BlockTitle.Background />

            <BlockTitle.Separator />
          </BlockTitle.Wrapper>
          <div className="mx-auto w-full max-w-full space-y-4">
            <div className="grid-row grid animate-fade-up gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <div className="rounded-full p-2">
                  <SearchIcon className="mb-2 size-6" />
                </div>
                <h2 className="text-xl font-bold">Find Handlers</h2>
                <p className="text-center text-muted-foreground">
                  Browse verified professional handlers by location, breed
                  specialties, experience level, and pricing.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <div className="rounded-full p-2">
                  <InboxIcon className="mb-2 size-6" />
                </div>
                <h2 className="text-xl font-bold">Easy Booking</h2>
                <p className="text-center text-muted-foreground">
                  Send booking requests directly to handlers with show details,
                  dates, and your specific requirements.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <div className="rounded-full p-2">
                  <SettingsIcon className="mb-2 size-6" />
                </div>
                <h2 className="text-xl font-bold">Handler Profiles</h2>
                <p className="text-center text-muted-foreground">
                  View detailed profiles with experience, breeds handled, show
                  wins, and client reviews.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <div className="rounded-full p-2">
                  <MergeIcon className="mb-2 size-6" />
                </div>
                <h2 className="text-xl font-bold">Manage Requests</h2>
                <p className="text-center text-muted-foreground">
                  Track all your booking requests and communications in one
                  convenient dashboard.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <div className="rounded-full p-2">
                  <LockIcon className="mb-2 size-6 opacity-75" />
                </div>
                <h2 className="text-xl font-bold">Secure Platform</h2>
                <p className="text-center text-muted-foreground">
                  Your information is protected with industry-standard security
                  and privacy measures.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <MergeIcon className="mb-2 size-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-primary">
                  Founding Handler Program
                </h2>
                <p className="text-center text-muted-foreground">
                  Join 100% free. No subscription fees, no commission. Build
                  your profile, receive bookings, and grow your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InboxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  )
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function MergeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
