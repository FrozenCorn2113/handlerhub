import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'How one visit to a dog show in a barn led to building HandlerHub.',
}

export default function OurStoryPage() {
  return (
    <>
      {/* Story */}
      <section className="bg-ring-cream py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Photo floated left + title */}
          <div className="mb-2">
            {/* Headshot - floated on desktop, full-width stacked on mobile */}
            <div className="mb-6 sm:float-left sm:mb-4 sm:mr-8">
              <div className="relative mx-auto h-[280px] w-[280px] overflow-hidden rounded-2xl border-4 border-sand shadow-md sm:mx-0 sm:h-[300px] sm:w-[300px] lg:h-[320px] lg:w-[320px]">
                <Image
                  src="/images/brett-headshot.jpg"
                  alt="Brett Carter, Founder of HandlerHub"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 280px, 320px"
                  priority
                />
              </div>
            </div>

            {/* Title beside the photo on desktop */}
            <h1
              className="mb-8 font-display text-paddock-green"
              style={{
                fontSize: 'clamp(1.75rem, 1.2rem + 2.5vw, 2.75rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 700,
              }}
            >
              I have a confession to make
            </h1>

            {/* Body text wraps around the floated image */}
            <div
              className="font-body text-warm-brown/85"
              style={{ fontSize: '18px', lineHeight: 1.85 }}
            >
              <p className="mb-6">
                I have a confession to make: I&apos;ve only been to one dog
                show.
              </p>

              <p className="mb-6">
                It was a small one in a barn that my fiancee&apos;s coworker had
                invited her to in the fall of 2025. It was near where we live,
                Victoria, BC. It was cold, a bit damp, the benches were hard,
                but the community was inspiring and the dogs were beyond stoked.
                I chatted with some of the handlers there and learned a bit
                about the events. Agility, rally, conformation, it was really
                interesting to me to step into such a passionate community that
                I literally knew nothing about.
              </p>

              <p className="mb-6">
                At this time in my life I was on the tail end of owning a
                successful window cleaning business and was in the works of
                letting go my half to my business partner, so I was pretty eager
                to find the next thing to latch onto. That evening after the dog
                show I went home and started looking at websites to find more
                information about dog shows. I started joining Facebook groups,
                reading Reddit groups, and honestly, I saw a community that was
                underserved. I saw people upset that becoming a handler was so
                difficult and gatekept that many were often discouraged from
                even trying it. Not to say that it isn&apos;t difficult and
                requires special regulation (that I agree with) but to be shut
                out from being able to ever even enter, that rubs me the wrong
                way, especially in a community where people are so passionate.
                So I decided to start HandlerHub. HandlerHub is a way that new,
                old, and genuinely curious people can get into the sport. Where
                ratings are decided by the community itself, and not the top 5%.
                A way people could actually make a living doing the thing they
                love, easier.
              </p>

              <p className="mb-6">
                As mentioned earlier, I&apos;ve only been to one dog show. I can
                only learn so much from online research, and that&apos;s where
                you come in.
              </p>

              <p>
                Joining and setting up a profile is free, and sending me a
                message about how I can make your community better is
                invaluable. So please, let me know how I can make this site
                better for you. Together, I think we can make something really
                great.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-off + CTA */}
      <section className="bg-light-sand py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
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
      </section>
    </>
  )
}
