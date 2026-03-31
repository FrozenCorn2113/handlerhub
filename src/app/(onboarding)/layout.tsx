import Image from 'next/image'
import Link from 'next/link'

interface OnboardingLayoutProps {
  children: React.ReactNode
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-ring-cream">
      {/* Minimal header with wordmark */}
      <header className="flex items-center px-6 py-4">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="/handler-hub-logo-dark.png"
            width={120}
            height={56}
            alt="HandlerHub"
            className="h-8 w-auto object-contain"
          />
        </Link>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}
