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

      {/* Left side - Branded panel (desktop only) */}
      <div
        className="relative hidden w-1/2 flex-col overflow-hidden lg:flex"
        style={{
          background:
            'linear-gradient(160deg, #0D3520 0%, #14472F 30%, #1F6B4A 70%, #14472F 100%)',
        }}
      >
        {/* Top gradient overlay for depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-[#0D3520]/80 to-transparent" />

        {/* Dot pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Decorative vertical stripes */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-stretch justify-center gap-6">
          <div className="w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
          <div className="w-[2px] bg-gradient-to-b from-transparent via-white/[0.12] to-transparent backdrop-blur-sm" />
          <div className="w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
          <div className="ml-16 w-px bg-gradient-to-b from-transparent via-white/[0.10] to-transparent" />
          <div className="w-[2px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent backdrop-blur-sm" />
          <div className="ml-24 w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
          <div className="w-px bg-gradient-to-b from-transparent via-white/[0.10] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-12">
          <div className="flex w-full max-w-md flex-col items-center text-center">
            <h2
              className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where great dogs meet great handlers
            </h2>

            <p className="mb-12 text-lg leading-relaxed text-white/60">
              The platform connecting exhibitors with professional handlers.
            </p>

            {/* Founding 100 card */}
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.07] p-8 text-center backdrop-blur-md">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
                Early Access
              </p>
              <p
                className="mb-3 text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Join the Founding 100
              </p>
              <p className="text-base leading-relaxed text-white/60">
                We&apos;re building HandlerHub with our first members. Get in
                early, shape the platform, and be the first name exhibitors see.
              </p>
            </div>
          </div>
        </div>

        {/* Green circle accent at bottom */}
        <div
          className="pointer-events-none absolute -bottom-24 left-1/2 z-10 size-56 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #2D7A54 0%, transparent 70%)',
          }}
        />

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0D3520]/60 to-transparent" />
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
