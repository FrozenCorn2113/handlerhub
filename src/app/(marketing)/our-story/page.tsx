'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

/* ------------------------------------------------------------------ */
/*  Section label                                                      */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.15em] text-warm-gray">
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-ring-cream"
        style={{ padding: 'var(--section-py-xl) 0' }}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Headshot */}
            <div className="mb-10">
              <div className="relative h-[280px] w-[280px] overflow-hidden rounded-2xl border-4 border-sand shadow-md lg:h-[340px] lg:w-[340px]">
                <Image
                  src="/images/brett-headshot.jpg"
                  alt="Brett Carter, Founder of HandlerHub"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 280px, 340px"
                  priority
                />
              </div>
            </div>

            {/* Headline + subtitle */}
            <h1
              className="mb-6 font-display font-light text-paddock-green"
              style={{
                fontSize: 'var(--fs-display)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
              }}
            >
              Built by an Outsider, for Everyone the Sport Left Behind
            </h1>

            <p
              className="font-body text-warm-brown/80"
              style={{ fontSize: '20px', lineHeight: 1.7, fontWeight: 400 }}
            >
              One dog show in a barn. That&apos;s all it took.
            </p>
          </div>
        </div>
      </section>

      {/* Story sections */}
      <section
        className="bg-ring-cream"
        style={{ padding: 'var(--section-py-md) 0' }}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mx-auto max-w-3xl space-y-16">
            {/* The Confession */}
            <div>
              <SectionLabel>The Confession</SectionLabel>
              <p
                className="mb-5 font-body text-ringside-black"
                style={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 400 }}
              >
                I have a confession: I&apos;ve only been to one dog show.
              </p>
              <p
                className="font-body text-warm-brown/80"
                style={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 400 }}
              >
                It was a small one in a barn near Victoria, BC. My
                fiancee&apos;s coworker had invited her in the fall of 2025, and
                I tagged along. It was cold, a bit damp, the benches were hard.
                But the community was something else. The dogs were completely
                in their element. I ended up talking with a few handlers,
                learning what I could about agility, rally, conformation. I
                walked in knowing nothing and left genuinely curious.
              </p>
            </div>

            {/* What I Saw Online */}
            <div>
              <SectionLabel>What I Saw Online</SectionLabel>
              <p
                className="mb-5 font-body text-warm-brown/80"
                style={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 400 }}
              >
                At that point in my life, I was wrapping up a window cleaning
                business I&apos;d spent years building, in the middle of handing
                my half over to my business partner. So I was restless. That
                evening, I went home and started digging.
              </p>
              <p
                className="mb-5 font-body text-warm-brown/80"
                style={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 400 }}
              >
                I joined Facebook groups. I read Reddit threads. What I kept
                finding was a community full of passionate people who felt shut
                out. Becoming a handler was expensive, confusing, and gatekept
                in ways that seemed to discourage people before they even
                started. I&apos;m not saying the sport doesn&apos;t require
                skill and regulation. It clearly does. But there&apos;s a
                difference between high standards and making someone feel like
                there&apos;s no door for them. That bothered me.
              </p>
              <p
                className="font-body text-warm-brown/80"
                style={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 400 }}
              >
                So I started building HandlerHub: a place where new handlers,
                experienced handlers, and genuinely curious people can find each
                other. Where your reputation is built by the community, not
                decided by the top five percent. Where someone who loves this
                sport can actually make a living from it.
              </p>
            </div>

            {/* Where You Come In */}
            <div>
              <SectionLabel>Where You Come In</SectionLabel>
              <p
                className="mb-5 font-body text-warm-brown/80"
                style={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 400 }}
              >
                Here&apos;s the honest part. I&apos;ve been to one dog show.
                I&apos;ve done a lot of reading, but reading isn&apos;t the same
                as living it. You know things I don&apos;t. You&apos;ve felt the
                friction I&apos;m trying to fix.
              </p>
              <p
                className="mb-5 font-body text-warm-brown/80"
                style={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 400 }}
              >
                Setting up a profile is free. So is sending me a message. Tell
                me what&apos;s broken, what&apos;s missing, what would actually
                make this useful for your community. I&apos;m building this with
                input from people who know the sport far better than I do, and
                I&apos;d rather hear it straight.
              </p>
              <p
                className="font-body font-medium text-ringside-black"
                style={{ fontSize: '18px', lineHeight: 1.8 }}
              >
                Together, I think we can make something worth staying for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-off + CTA */}
      <section
        className="bg-light-sand"
        style={{ padding: 'var(--section-py-lg) 0' }}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="mb-1 font-display text-xl font-medium text-ringside-black"
              style={{ letterSpacing: '-0.01em' }}
            >
              Brett Carter
            </p>
            <p className="mb-10 font-body text-sm text-warm-gray">
              Founder, HandlerHub
            </p>

            <Button asChild size="lg" variant="default">
              <Link href="/feedback" className="gap-2 font-display font-bold">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
