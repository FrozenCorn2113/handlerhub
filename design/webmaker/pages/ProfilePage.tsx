import React from 'react'

import { Icons, SAMPLE_HANDLERS } from '../constants'
import { Link, useParams } from 'react-router-dom'

const ProfilePage: React.FC = () => {
  const { id } = useParams()
  const handler = SAMPLE_HANDLERS.find((h) => h.id === id) || SAMPLE_HANDLERS[1]

  return (
    <div className="mx-auto max-w-7xl animate-fade-in px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="relative mb-8 h-64 overflow-hidden rounded-2xl border border-slate-200 shadow-lg sm:h-80 dark:border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCChnFaGb2lObe0pdDCegfKbxM2AClYkpb2b-r-1zfZXWiyrTt9NKLpUOLSQV1uXBTyY_tcykjErs9KPeQJkHCrDVR1OTy6WXEe3oDTB48mYBeF_H8UlbVnFVZBncOMCPWWSVdGnljEAhdgWNGVt2ZBxYn6WJ7RxOpc2u_mxUIHotvc2UKd05g0Ta5cYj7miygxM4Lo8sttDZ_SpD1h2bhZAj1JPQiMIWMHfM2885rqmykd8diBfnNAsCwxmzzqiZgAVf0-eYypEQ')",
          }}
        />
        <div className="absolute bottom-0 left-0 flex w-full flex-col items-end gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
          <div className="relative">
            <div
              className="dark:border-background-dark h-24 w-24 rounded-full border-4 border-white bg-cover bg-center shadow-2xl sm:h-32 sm:w-32"
              style={{ backgroundImage: `url('${handler.avatar}')` }}
            />
            <div className="dark:border-background-dark absolute bottom-1 right-1 rounded-full border-2 border-white bg-primary p-1 text-white">
              <Icons.ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="flex-1 pb-2 text-white">
            <h1 className="text-3xl font-bold tracking-tight">
              {handler.name}
            </h1>
            <p className="font-medium text-white/90">{handler.title}</p>
            <div className="mt-2 flex items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Icons.MapPin className="h-4 w-4" /> {handler.region}, USA
              </span>
              <span className="flex items-center gap-1">
                <Icons.Star className="h-4 w-4 fill-current" /> {handler.rating}{' '}
                ({handler.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="text-2xl font-bold text-primary">
                {handler.yearsExperience}+
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Years Exp.
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="text-2xl font-bold text-primary">
                {handler.breedsCount}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Breeds
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="text-2xl font-bold text-primary">
                {handler.winsCount}+
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Wins/Titles
              </div>
            </div>
          </div>

          {/* About */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold">
              About {handler.name.split(' ')[0]}
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {handler.description}
            </p>
          </section>

          {/* Availability */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Availability</h2>
              <div className="flex gap-2">
                <button className="rounded border p-1 hover:bg-slate-50">
                  <Icons.ChevronLeft className="h-4 w-4" />
                </button>
                <button className="rounded border p-1 hover:bg-slate-50">
                  <Icons.ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            {/* Calendar Grid (Simulated) */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
                <div key={d} className="mb-2 text-xs font-bold text-slate-400">
                  {d}
                </div>
              ))}
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className={`flex h-10 items-center justify-center rounded text-sm font-medium ${i > 7 ? 'cursor-pointer bg-primary text-white' : 'text-slate-400'}`}
                >
                  {i + 28 > 30 ? i + 28 - 30 : i + 28}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-red-100"></span> Booked
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-primary"></span> Open
                (National Cluster)
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border-2 border-primary/20 bg-white p-6 shadow-xl dark:bg-slate-900">
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$125</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  / per class
                </span>
              </div>
              <div className="space-y-3">
                <Link
                  to="/messaging"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-white transition-all hover:bg-primary/90"
                >
                  <Icons.Calendar className="h-4 w-4" /> Request Booking
                </Link>
                <Link
                  to="/messaging"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-3 font-bold text-slate-900 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  <Icons.Mail className="h-4 w-4" /> Send Message
                </Link>
              </div>
              <div className="mt-6 space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Response Time
                  </span>
                  <span className="font-semibold text-green-600">
                    ~ 2 hours
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Travel Distance
                  </span>
                  <span className="font-semibold">Up to 500 mi</span>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                <Icons.Info className="h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-[11px] leading-tight text-slate-500 dark:text-slate-400">
                  Booking requests are subject to confirmation. Rates exclude
                  travel expenses and grooming fees if applicable.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Base Region
              </h3>
              <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800">
                <Icons.MapPin className="h-8 w-8 text-primary" />
              </div>
              <p className="text-center text-sm font-medium">
                Based in Hartford, CT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
