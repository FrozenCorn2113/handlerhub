import React from 'react'

import { Icons } from '../constants'

const OnboardingPage: React.FC = () => {
  return (
    <main className="flex flex-1 animate-fade-in justify-center px-6 py-12">
      <div className="flex w-full max-w-[720px] flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Step 1 of 4
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              25% Complete
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: '25%' }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Professional Details
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Help exhibitors find you by listing your expertise and credentials.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <form className="space-y-8">
            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-900 dark:text-gray-100">
                Years of Professional Experience
              </label>
              <div className="relative max-w-[200px]">
                <input
                  className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g. 5"
                  type="number"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  Years
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Include your time as both an assistant and a lead handler.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-900 dark:text-gray-100">
                Kennel Club Affiliations
              </label>
              <textarea
                className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="e.g. AKC, UKC, Canadian Kennel Club, PHA"
                rows={3}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                List the professional organizations you are currently a member
                of.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-base font-semibold text-gray-900 dark:text-gray-100">
                  Breed Specialties
                </label>
                <span className="text-xs font-medium uppercase text-gray-400">
                  Select all that apply
                </span>
              </div>
              <div className="relative">
                <Icons.Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 pl-12 text-gray-900 outline-none transition-all focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Search breeds..."
                  type="text"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Golden Retriever', 'German Shepherd', 'Standard Poodle'].map(
                  (breed) => (
                    <div
                      key={breed}
                      className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {breed}
                      <button
                        type="button"
                        className="hover:text-primary-dark opacity-60"
                      >
                        ×
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-800">
              <button
                className="px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                type="button"
              >
                Back
              </button>
              <button
                className="flex items-center gap-2 rounded-lg bg-primary px-10 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                type="submit"
              >
                Continue
                <Icons.ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default OnboardingPage
