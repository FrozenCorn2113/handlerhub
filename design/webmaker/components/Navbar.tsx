import React from 'react'

import { Icons } from '../constants'
import { Link, useLocation } from 'react-router-dom'

const Navbar: React.FC = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/onboarding'

  if (isAuthPage)
    return (
      // Fixed: Changed 'class' to 'className' for standard React element properties
      <header className="dark:bg-background-dark/50 sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-md dark:border-gray-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1.5">
              <Icons.Dog className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HandlerHub
            </span>
          </Link>
          <button className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Save & Exit
          </button>
        </div>
      </header>
    )

  return (
    <header className="dark:bg-background-dark/80 sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex cursor-pointer items-center gap-2">
              <div className="rounded-lg bg-primary p-1.5 text-white">
                <Icons.Dog className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold leading-none tracking-tight text-slate-900 dark:text-white">
                HandlerHub
              </span>
            </Link>
            <div className="hidden items-center space-x-6 text-sm font-medium md:flex">
              <Link
                to="/search"
                className="transition-colors hover:text-primary"
              >
                Find Handlers
              </Link>
              <Link
                to="/messaging"
                className="transition-colors hover:text-primary"
              >
                Messages
              </Link>
              <Link
                to="/onboarding"
                className="transition-colors hover:text-primary"
              >
                Become a Handler
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Icons.Search className="h-4 w-4" />
              </span>
              <input
                className="w-64 rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800"
                placeholder="Search shows or breeds..."
                type="text"
              />
            </div>
            <button className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              <Icons.Bell className="h-5 w-5" />
            </button>
            <div
              className="h-8 w-8 rounded-full border border-slate-200 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKaroJOXeJa2MvjJtSW1F2WWFPslefRUEV1iPE34WKyH_rOIXIBlfm6f1dadtZN8gevQaWjIBi0kA779B4SG4xt1NF0HlJ4CfxFz7WOHo_N_1ycd4biLRVHCw56G1la9vkaMFGOKoNbXU7P6Shv8RPLAkO2NxllqiZMPB89EiVPxw-18RrT2UNM5EioEydl3cvJnpyQfWl8xqaSO7kbZUjliCJM-qVJBjhwnGJ_t0vyGMjm27RZPheZlft0HtV0DelZszlhXyX8A')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
