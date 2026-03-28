import React, { useState } from 'react'

import { Icons } from '../constants'

const MessagingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Sarah Jenkins')

  return (
    <div className="flex h-[calc(100vh-64px)] animate-fade-in overflow-hidden">
      {/* Sidebar: Conversations */}
      <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 p-4 dark:border-slate-800">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              className="w-full rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary/50 dark:bg-slate-800"
              placeholder="Search conversations..."
              type="text"
            />
          </div>
        </div>
        <div className="custom-scrollbar flex-1 overflow-y-auto">
          {['Sarah Jenkins', 'Michael Chen', 'Linda Wu'].map((name, i) => (
            <div
              key={name}
              onClick={() => setActiveTab(name)}
              className={`flex cursor-pointer items-center gap-3 border-b border-slate-50 p-4 transition-colors dark:border-slate-800/50 ${activeTab === name ? 'border-r-4 border-primary bg-primary/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <div className="relative">
                <div
                  className="size-12 rounded-full bg-slate-200 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://picsum.photos/200/200?random=${i}')`,
                  }}
                ></div>
                {i === 0 && (
                  <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-green-500"></div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="mb-0.5 flex items-center justify-between">
                  <h4 className="truncate text-sm font-semibold">{name}</h4>
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    10:45 AM
                  </span>
                </div>
                <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-400">
                  Re: Westminster Dog Show...
                </p>
                <div className="mt-1">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}
                  >
                    {i === 0 ? 'Inquiry' : 'Negotiating'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className="flex flex-1 flex-col bg-white dark:bg-slate-900">
        <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
              <Icons.Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-none">{activeTab}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Westminster Kennel Club Dog Show
                </span>
                <span className="text-slate-300">•</span>
                <span>Feb 12-14, 2024</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Icons.Phone className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Icons.MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="custom-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto bg-slate-50/50 p-6 dark:bg-slate-900">
          <div className="flex justify-center">
            <span className="rounded-full bg-slate-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:bg-slate-800">
              Today
            </span>
          </div>

          <div className="flex max-w-[80%] gap-3">
            <div
              className="size-8 shrink-0 rounded-full bg-slate-200 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://picsum.photos/100/100?random=1')",
              }}
            ></div>
            <div>
              <div className="rounded-xl border border-slate-200/50 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <p className="text-sm leading-relaxed">
                  Hi Alex! I'm interested in booking you for the Westminster
                  show. I have a Golden Retriever, "Ch. Stormy's Midnight Run",
                  competing in the Best of Breed class.
                </p>
              </div>
              <span className="ml-1 mt-1 text-[10px] text-slate-400">
                10:42 AM
              </span>
            </div>
          </div>

          <div className="flex max-w-[80%] flex-row-reverse gap-3 self-end">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold uppercase text-white">
              AR
            </div>
            <div className="flex flex-col items-end">
              <div className="rounded-xl bg-primary p-3 text-white shadow-md">
                <p className="text-sm leading-relaxed">
                  Hello Sarah! I'd love to help. I'm familiar with Midnight Run,
                  he's a fantastic specimen. I have availability for those
                  dates.
                </p>
              </div>
              <span className="mr-1 mt-1 text-[10px] text-slate-400">
                10:44 AM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-2 text-slate-500">
              <Icons.FileText className="h-3 w-3" />
              <span className="text-[11px] font-medium italic">
                Alex updated the Inquiry Terms
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          </div>
        </div>

        <footer className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 dark:bg-slate-800">
            <button className="p-1 text-slate-500 transition-colors hover:text-primary">
              <Icons.Paperclip className="h-5 w-5" />
            </button>
            <input
              className="flex-1 border-none bg-transparent py-2 text-sm focus:ring-0"
              placeholder="Type your message..."
              type="text"
            />
            <button className="flex items-center justify-center rounded-lg bg-primary p-2 text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
              <Icons.Send className="h-5 w-5" />
            </button>
          </div>
        </footer>
      </section>

      {/* Right Summary Sidebar */}
      <aside className="hidden w-80 shrink-0 flex-col gap-6 border-l border-slate-200 bg-slate-50 p-5 xl:flex dark:border-slate-800 dark:bg-slate-900/50">
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Booking Summary
          </h3>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Icons.Dog className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Subject Dog</p>
                <p className="text-sm font-bold">Ch. Midnight Run</p>
              </div>
            </div>
            <div className="mb-6 space-y-4">
              <div className="flex items-start gap-3">
                <Icons.Calendar className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">
                    Event
                  </p>
                  <p className="text-xs font-semibold">Westminster Dog Show</p>
                  <p className="text-[11px] italic text-slate-400">
                    Feb 12-14, 2024
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">Status</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                  Pending Confirmation
                </span>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90">
                <Icons.ShieldCheck className="h-4 w-4" /> Confirm Booking
              </button>
            </div>
          </div>
        </div>
        <div className="mt-auto rounded-xl border border-primary/10 bg-primary/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Icons.ShieldCheck className="h-5 w-5" />
            <p className="text-[10px] font-bold uppercase tracking-widest">
              Trust Guarantee
            </p>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
            Bookings through HandlerHub include automated insurance coverage and
            dispute mediation.
          </p>
        </div>
      </aside>
    </div>
  )
}

export default MessagingPage
