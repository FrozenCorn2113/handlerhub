import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Mobile branded header strip */}
      <Link
        href="/"
        className="flex items-center justify-center gap-3 px-6 py-4 lg:hidden"
        style={{
          background: 'linear-gradient(135deg, #14472F 0%, #1F6B4A 100%)',
        }}
      >
        <Image
          src="/handler-hub-logo-light.png"
          width={160}
          height={74}
          alt="HandlerHub"
          className="h-12 w-auto object-contain"
          priority
        />
      </Link>

      {/* Left side - Hero image panel (desktop only) */}
      <div className="relative hidden w-1/2 flex-col overflow-hidden lg:flex">
        <Image
          src="/images/hero-handler.jpg"
          alt="Professional handler with show dog"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-12 pb-16">
          <div className="flex w-full max-w-md flex-col items-center text-center">
            <h2
              className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where great dogs meet great handlers
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-white/80">
              The platform connecting exhibitors with professional handlers.
            </p>

            {/* Founding 100 card */}
            <div className="w-full rounded-2xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-md">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                Early Access
              </p>
              <p
                className="mb-3 text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Join the Founding 100
              </p>
              <p className="text-base leading-relaxed text-white/70">
                Get in early, shape the platform, and be the first name
                exhibitors see.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="relative flex w-full flex-1 flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        {/* Logo / home link (desktop) */}
        <Link href="/" className="mb-10 hidden lg:block">
          <Image
            src="/handler-hub-logo-dark.png"
            width={140}
            height={65}
            alt="HandlerHub"
            className="h-10 w-auto object-contain"
          />
        </Link>
        {children}
      </div>
    </div>
  )
}
