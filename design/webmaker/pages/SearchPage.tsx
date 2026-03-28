import React, { useMemo, useState } from 'react'

import AIMatchmaker from '../components/AIMatchmaker'
import { Icons, SAMPLE_HANDLERS } from '../constants'
import { Link } from 'react-router-dom'

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Highest Rated')

  const filteredHandlers = useMemo(() => {
    return SAMPLE_HANDLERS.filter((handler) => {
      const matchesSearch =
        handler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        handler.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const matchesGroup =
        selectedGroups.length === 0 ||
        selectedGroups.some(
          (group) =>
            handler.specialties.includes(group) || handler.level.includes(group)
        )
      return matchesSearch && matchesGroup
    }).sort((a, b) => {
      if (sortBy === 'Highest Rated') return b.rating - a.rating
      if (sortBy === 'Most Experienced')
        return b.yearsExperience - a.yearsExperience
      return 0
    })
  }, [searchQuery, selectedGroups, sortBy])

  const toggleGroup = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    )
  }

  return (
    <div className="relative mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-8 md:flex-row lg:px-12">
      {/* Sidebar Filters */}
      <aside className="flex w-full shrink-0 flex-col gap-8 md:w-64">
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
            Filters
          </h3>
          <div className="mb-6">
            <label className="mb-3 flex items-center gap-2 text-sm font-bold">
              <Icons.Search className="h-4 w-4" /> Keyword
            </label>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border-slate-200 text-sm focus:border-primary focus:ring-primary dark:border-slate-800 dark:bg-slate-900"
              placeholder="Breed, name..."
              type="text"
            />
          </div>
          <div className="mb-6">
            <label className="mb-3 flex items-center gap-2 text-sm font-bold">
              <Icons.Dog className="h-4 w-4" /> Specialist Groups
            </label>
            <div className="space-y-2">
              {['Sporting', 'Working', 'Herding', 'Master Handler'].map(
                (group) => (
                  <label
                    key={group}
                    className="group flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(group)}
                      onChange={() => toggleGroup(group)}
                      className="rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900"
                    />
                    <span className="text-sm transition-colors group-hover:text-primary">
                      {group}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedGroups([])
              setSearchQuery('')
            }}
            className="w-full rounded-lg bg-slate-200/50 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </div>

        <div className="hidden rounded-xl border border-primary/20 bg-primary/10 p-4 md:block">
          <h4 className="mb-1 text-sm font-bold text-primary">Expert Advice</h4>
          <p className="mb-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Not sure who to pick? Our AI assistant can help you find the perfect
            match based on your breed's specific needs.
          </p>
          <div className="flex animate-pulse items-center gap-1 text-xs font-black text-primary">
            TRY AI MATCHMAKER <Icons.ChevronRight className="h-3 w-3" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Professional Handlers
            </h1>
            <p className="mt-1 font-medium text-slate-500">
              {filteredHandlers.length} experts available for your next show
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm font-bold focus:ring-primary dark:border-slate-800 dark:bg-slate-900"
            >
              <option>Highest Rated</option>
              <option>Most Experienced</option>
            </select>
          </div>
        </div>

        {filteredHandlers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {filteredHandlers.map((handler) => (
              <div
                key={handler.id}
                className="group relative flex flex-col gap-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg sm:flex-row dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="absolute right-0 top-0 p-3">
                  <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                    {handler.level}
                  </span>
                </div>
                <div className="flex shrink-0 justify-center sm:block">
                  <div className="size-24 rounded-full border-2 border-primary/20 p-1">
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={handler.avatar}
                      alt={handler.name}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="mb-1">
                    <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                      {handler.name}
                    </h3>
                    <div className="mb-1 flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Icons.Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(handler.rating) ? 'fill-current' : ''}`}
                        />
                      ))}
                      <span className="ml-1 text-xs font-bold text-slate-500">
                        {handler.rating} ({handler.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="mb-3 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                    <Icons.MapPin className="h-4 w-4" />
                    {handler.region} • {handler.location}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {handler.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <Link
                      to={`/profile/${handler.id}`}
                      className="block w-full rounded-lg bg-primary py-2 text-center text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Icons.Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-1 text-lg font-bold">No handlers found</h3>
            <p className="mb-6 text-sm text-slate-500">
              Try adjusting your filters or ask our AI scout for help.
            </p>
            <button
              onClick={() => {
                setSelectedGroups([])
                setSearchQuery('')
              }}
              className="font-bold text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {filteredHandlers.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="flex size-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800">
              <Icons.ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex size-10 items-center justify-center rounded-lg bg-primary font-bold text-white">
              1
            </button>
            <button className="flex size-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800">
              <Icons.ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </main>

      <AIMatchmaker />
    </div>
  )
}

export default SearchPage
