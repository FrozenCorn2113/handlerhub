import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how HandlerHub connects dog show exhibitors with professional handlers.',
}

export default function HowItWorksPage() {
  return (
    <section
      className="bg-[#F8F4EE]"
      style={{ padding: 'var(--section-py-xl, 5rem) 0' }}
    >
      <div className="mx-auto max-w-[720px] px-6 lg:px-12">
        <h1
          className="mb-6 text-4xl tracking-tight text-[#14472F] md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
        >
          How It Works
        </h1>
        <p
          className="text-lg leading-relaxed text-[#4A3F35]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Content coming soon.
        </p>
      </div>
    </section>
  )
}
