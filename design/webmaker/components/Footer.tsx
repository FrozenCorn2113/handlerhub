import React from 'react'

import { Icons } from '../constants'

const Footer: React.FC = () => {
  return (
    <footer className="dark:bg-background-dark mt-20 border-t border-slate-200 bg-white py-12 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="rounded-lg bg-slate-200 p-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <Icons.Dog className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold uppercase tracking-tight text-slate-900 dark:text-white">
            HandlerHub
          </span>
        </div>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          Connecting champions with the people who make them shine.
        </p>
        <div className="flex justify-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <a className="hover:text-primary" href="#">
            Help Center
          </a>
          <a className="hover:text-primary" href="#">
            Terms of Service
          </a>
          <a className="hover:text-primary" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary" href="#">
            Contact
          </a>
        </div>
        <div className="mt-8 text-xs text-slate-400">
          © 2024 HandlerHub Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
