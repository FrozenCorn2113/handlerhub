/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import { WebmakerIcons } from '@/components/webmaker/constants'

export function WebmakerLandingPage() {
  return (
    <div className="animate-fade-in">
      <section className="relative w-full overflow-hidden py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                New: Verified Specialty Handlers
              </div>
              <h1 className="mb-6 font-serif text-5xl leading-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-white">
                Professional dog handling, without the{' '}
                <span className="italic text-primary">chaos</span>.
              </h1>
              <p className="mb-10 text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                Find verified, breed-specific handlers for your next show in
                minutes. Skip the noisy Facebook groups and connect with the
                industry&apos;s best talent.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/handlers"
                  className="flex h-14 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Find a Handler
                  <WebmakerIcons.Search className="h-5 w-5" />
                </Link>
                <Link
                  href="/onboarding"
                  className="flex h-14 items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  Become a Handler
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-200 shadow-2xl">
                <img
                  alt="Professional dog handler at show"
                  className="h-full w-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB27lNRCgmjiiTv0g_YlATZMWLDDJulSx5sR6swWb7kjUrpx_LUMzHpqOOMDWuCaNfuew6hjM9lSvEfZUi35G1KpF7RX5AFbEFX-ITmhLm233P61eMAea453ZgleE5l4C2qwOQ-a_TPuu4rAqf4Pd7r14zyXLeknA1f5zNL2nKaKgDhacZucp2puzWVLcf6vk5Qr5aiVwBYt3rt4ej0bUZkJqB8wAO7Bx1p9FDFuY2YUTg-RGF-ej8hoWEXIlrLT5PFviprVdx1Kg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 p-6 shadow-xl backdrop-blur dark:bg-slate-900/95">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-300">
                      <img
                        alt="Handler"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRONK-IhEutRCGNZkXQgeT-UMTcMQ7WQ6NTBZbjO_i7kVDCu1tvE6V6EAXLluDDnVVKXHZXZtve1HctfwORjWvNvGuRgjEkkmYwxc44gcaJwopSJojveEX3yzaSKujLrkU9qcSvi1Uhv4dZDyVDGdfJP82qKR9ua8-dt64a1vgviZgr9YTc10NhApZCv39oKHE_AILWgbXUtGZvjJxCycwClTX8Cwl2Vy6odxqpCCMEZMAFKtThTHnHiMiiSs5H6NpsesZYi7syg"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        Marcus Thorne
                      </p>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        AKC Registered Handler
                      </p>
                    </div>
                    <div className="ml-auto flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <WebmakerIcons.Star
                          key={i}
                          className="h-4 w-4 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="mb-1 flex items-center gap-3 text-primary">
                <WebmakerIcons.ShieldCheck className="h-8 w-8" />
                <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
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
            <div className="flex flex-col items-center gap-2 border-slate-200 md:items-start md:border-x md:px-12 dark:border-slate-800">
              <div className="mb-1 flex items-center gap-3 text-primary">
                <WebmakerIcons.Dog className="h-8 w-8" />
                <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
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
                <WebmakerIcons.Star className="h-8 w-8 fill-current" />
                <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
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

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-8 md:p-16 lg:p-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 opacity-90"></div>
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
              <div className="hidden grid-cols-2 gap-4 lg:grid">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                    <WebmakerIcons.Calendar className="mb-2 h-8 w-8 text-white" />
                    <p className="font-bold text-white">Auto-Sync Schedule</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                    <WebmakerIcons.Award className="mb-2 h-8 w-8 text-white" />
                    <p className="font-bold text-white">Secure Escrow</p>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                    <WebmakerIcons.Briefcase className="mb-2 h-8 w-8 text-white" />
                    <p className="font-bold text-white">E-Contracts</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                    <WebmakerIcons.Bell className="mb-2 h-8 w-8 text-white" />
                    <p className="font-bold text-white">Real-time Alerts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
