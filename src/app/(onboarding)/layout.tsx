import Link from 'next/link'

interface OnboardingLayoutProps {
  children: React.ReactNode
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-ring-cream">
      {/* Minimal header with Roca One wordmark */}
      <header className="flex items-center px-6 py-4">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <span
            className="text-2xl font-bold text-paddock-green"
            style={{ fontFamily: "'Roca One', sans-serif" }}
          >
            HandlerHub
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}
