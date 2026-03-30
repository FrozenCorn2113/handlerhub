import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Mobile branded header strip */}
      <div
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
      </div>

      {/* Left side - Form */}
      <div className="relative flex w-full flex-1 flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        {children}
      </div>

      {/* Right side - Branded panel (desktop only) */}
      <div
        className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden lg:flex"
        style={{
          background:
            'linear-gradient(160deg, #14472F 0%, #1F6B4A 60%, #14472F 100%)',
        }}
      >
        {/* Dot pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex max-w-md flex-col items-center px-12 text-center">
          <Image
            src="/handler-hub-logo-light.png"
            width={360}
            height={166}
            alt="HandlerHub"
            className="mb-10 h-40 w-auto object-contain drop-shadow-2xl"
            priority
          />

          <h2
            className="mb-4 text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Where great dogs meet great handlers
          </h2>

          <p className="mb-12 text-lg leading-relaxed text-white/70">
            The platform connecting exhibitors with professional handlers.
          </p>

          {/* Founding 100 card */}
          <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-8 text-center backdrop-blur-sm">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Early Access
            </p>
            <p
              className="mb-3 text-xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Join the Founding 100
            </p>
            <p className="text-base leading-relaxed text-white/70">
              We&apos;re building HandlerHub with our first members. Get in
              early, shape the platform, and be the first name exhibitors see.
            </p>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#14472F]/50 to-transparent" />
      </div>
    </div>
  )
}
