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
          src="/handler-hub-logo.png"
          width={32}
          height={32}
          alt="HandlerHub"
          priority
        />
        <span
          className="text-lg font-bold text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          HandlerHub
        </span>
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
            src="/handler-hub-logo.png"
            width={120}
            height={120}
            alt="HandlerHub"
            className="mb-10 drop-shadow-2xl"
            priority
          />

          <h2
            className="mb-4 text-3xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Where great dogs meet great handlers
          </h2>

          <p className="mb-12 text-base leading-relaxed text-white/60">
            The professional marketplace connecting dog show handlers with
            exhibitors. Find, book, and manage handler services with ease.
          </p>

          {/* Floating testimonial card */}
          <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-6 text-left backdrop-blur-sm">
            <p className="mb-4 text-sm italic leading-relaxed text-white/90">
              &ldquo;HandlerHub made it so easy to find the right handler for
              our show schedule. We booked within 24 hours.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                S
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sarah M.</p>
                <p className="text-xs text-white/50">Dog Show Exhibitor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#14472F]/50 to-transparent" />
      </div>
    </div>
  )
}
