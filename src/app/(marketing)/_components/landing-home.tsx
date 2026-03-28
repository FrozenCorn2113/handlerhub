import Image from 'next/image'
import Link from 'next/link'

import {
  BellRinging,
  CalendarBlank,
  CurrencyDollar,
  MagnifyingGlass,
  Medal,
  PawPrint,
  Scroll,
  Shield,
  ShieldCheck,
  Star,
} from '@phosphor-icons/react/dist/ssr'

export default function LandingHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                New: Verified Specialty Handlers
              </div>

              <h1 className="mb-6 font-serif text-5xl leading-tight text-foreground md:text-6xl lg:text-7xl">
                Professional dog handling, without the{' '}
                <span className="italic text-primary">chaos</span>.
              </h1>

              <p className="mb-10 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Find verified, breed-specific handlers for your next show in
                minutes. Skip the noisy Facebook groups and connect with the
                industry&apos;s best talent.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/handlers"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-lg font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Find a Handler
                  <MagnifyingGlass size={22} />
                </Link>

                <Link
                  href="/for-handlers"
                  className="inline-flex h-14 items-center justify-center rounded-lg border border-slate-200 bg-background px-8 text-lg font-bold text-foreground transition-colors hover:bg-muted"
                >
                  Become a Handler
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-200 shadow-2xl">
                <Image
                  alt="Professional dog handler at show"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB27lNRCgmjiiTv0g_YlATZMWLDDJulSx5sR6swWb7kjUrpx_LUMzHpqOOMDWuCaNfuew6hjM9lSvEfZUi35G1KpF7RX5AFbEFX-ITmhLm233P61eMAea453ZgleE5l4C2qwOQ-a_TPuu4rAqf4Pd7r14zyXLeknA1f5zNL2nKaKgDhacZucp2puzWVLcf6vk5Qr5aiVwBYt3rt4ej0bUZkJqB8wAO7Bx1p9FDFuY2YUTg-RGF-ej8hoWEXIlrLT5PFviprVdx1Kg"
                  fill
                  sizes="(min-width: 1024px) 520px, 0px"
                  className="object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                <div className="absolute inset-x-6 bottom-6 rounded-xl bg-white/95 p-6 shadow-xl backdrop-blur">
                  <div className="flex items-center gap-4">
                    <div className="relative size-12 overflow-hidden rounded-full bg-slate-300">
                      <Image
                        alt="Handler portrait"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRONK-IhEutRCGNZkXQgeT-UMTcMQ7WQ6NTBZbjO_i7kVDCu1tvE6V6EAXLluDDnVVKXHZXZtve1HctfwORjWvNvGuRgjEkkmYwxc44gcaJwopSJojveEX3yzaSKujLrkU9qcSvi1Uhv4dZDyVDGdfJP82qKR9ua8-dt64a1vgviZgr9YTc10NhApZCv39oKHE_AILWgbXUtGZvjJxCycwClTX8Cwl2Vy6odxqpCCMEZMAFKtThTHnHiMiiSs5H6NpsesZYi7syg"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Marcus Thorne</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        AKC Registered Handler
                      </p>
                    </div>
                    <div className="ml-auto flex text-yellow-500">
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                      <Star size={14} weight="fill" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-slate-200 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="mb-1 flex items-center gap-3 text-primary">
                <ShieldCheck size={30} />
                <span className="text-3xl font-black tracking-tight text-foreground">
                  500+
                </span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Verified Handlers
              </p>
              <p className="text-xs text-slate-400">
                Every handler passes a rigorous experience check.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 md:items-start md:border-x md:border-slate-200 md:px-12">
              <div className="mb-1 flex items-center gap-3 text-primary">
                <PawPrint size={30} />
                <span className="text-3xl font-black tracking-tight text-foreground">
                  100+
                </span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                AKC Breeds
              </p>
              <p className="text-xs text-slate-400">
                Specialized expertise across all seven show groups.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="mb-1 flex items-center gap-3 text-primary">
                <Star size={30} weight="fill" />
                <span className="text-3xl font-black tracking-tight text-foreground">
                  4.9/5
                </span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Average Rating
              </p>
              <p className="text-xs text-slate-400">
                Consistent quality performance and client care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="overflow-hidden bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 max-w-3xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
              The Process
            </h2>
            <h3 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Booking a professional handler has never been easier
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-slate-200 bg-background p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
              <div className="mb-8 flex size-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <MagnifyingGlass size={30} />
              </div>
              <div className="absolute right-8 top-8 -z-10 text-6xl font-black text-slate-100 transition-colors group-hover:text-primary/5">
                01
              </div>
              <h4 className="mb-4 text-xl font-bold text-foreground">
                Search by Breed &amp; Date
              </h4>
              <p className="leading-relaxed text-muted-foreground">
                Input your show location and dog&apos;s breed to see available
                talent specifically vetted for your category.
              </p>
            </div>

            <div className="group relative rounded-2xl border border-slate-200 bg-background p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
              <div className="mb-8 flex size-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Medal size={30} />
              </div>
              <div className="absolute right-8 top-8 -z-10 text-6xl font-black text-slate-100 transition-colors group-hover:text-primary/5">
                02
              </div>
              <h4 className="mb-4 text-xl font-bold text-foreground">
                Evaluate Experience
              </h4>
              <p className="leading-relaxed text-muted-foreground">
                View verified portfolios, win records, and specialty breed
                experience at a glance. No more guessing.
              </p>
            </div>

            <div className="group relative rounded-2xl border border-slate-200 bg-background p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
              <div className="mb-8 flex size-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Shield size={30} />
              </div>
              <div className="absolute right-8 top-8 -z-10 text-6xl font-black text-slate-100 transition-colors group-hover:text-primary/5">
                03
              </div>
              <h4 className="mb-4 text-xl font-bold text-foreground">
                Book with Confidence
              </h4>
              <p className="leading-relaxed text-muted-foreground">
                Secure payments and clear communication in one place, protected
                by our booking guarantee and insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-8 md:p-16 lg:p-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 opacity-90" />
            <div className="absolute right-0 top-0 size-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
              <div>
                <h2 className="mb-8 font-serif text-4xl leading-tight text-white md:text-5xl">
                  Ready to show your dog&apos;s true potential?
                </h2>
                <p className="mb-12 max-w-lg text-lg leading-relaxed text-white/80">
                  Join thousands of owners who trust HandlerHub to find the
                  perfect professional partners for their canine athletes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/handlers"
                    className="rounded-xl bg-white px-10 py-5 font-black text-primary transition-all hover:shadow-2xl"
                  >
                    Browse Handlers Now
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-xl border-2 border-white/30 bg-transparent px-10 py-5 font-bold text-white transition-all hover:border-white"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>

              <div className="hidden justify-center lg:flex">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                      <CalendarBlank size={30} className="mb-2 text-white" />
                      <p className="font-bold text-white">Auto-Sync Schedule</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                      <CurrencyDollar size={30} className="mb-2 text-white" />
                      <p className="font-bold text-white">Secure Escrow</p>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                      <Scroll size={30} className="mb-2 text-white" />
                      <p className="font-bold text-white">E-Contracts</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                      <BellRinging size={30} className="mb-2 text-white" />
                      <p className="font-bold text-white">Real-time Alerts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
