/* eslint-disable tailwindcss/classnames-order */

/* eslint-disable tailwindcss/enforces-shorthand */
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { ConversationList } from '@/components/messaging/conversation-list'

import {
  Bell,
  DotsThreeVertical,
  Lock,
  MagnifyingGlass,
  Notepad,
  PaperPlaneRight,
  PawPrint,
  Phone,
  PlusCircle,
  ShieldCheck,
  Smiley,
  Trophy,
} from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'Messaging & Booking Inquiry | HandlerHub',
}

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?next=/dashboard/messages')
  }

  let conversations: any[] = []
  try {
    conversations = await prisma.conversation.findMany({
      where: {
        participantIds: {
          has: user.id,
        },
      },
      include: {
        bookingRequest: {
          include: {
            handler: { select: { id: true, name: true, image: true } },
            exhibitor: { select: { id: true, name: true, image: true } },
          },
        },
        messages: {
          take: 1,
          orderBy: { sentAt: 'desc' },
          include: {
            sender: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    })
  } catch {
    conversations = []
  }

  return (
    <div className="bg-background-light dark:bg-background-dark fixed inset-0 z-[60] min-h-screen font-display text-slate-900 dark:text-slate-100">
      {/* Main Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-primary">
            <div className="size-6">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_535)">
                  <path
                    clipRule="evenodd"
                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_535">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              HandlerHub
            </h2>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <Link
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              href="/handlers"
            >
              Marketplace
            </Link>
            <span className="border-b-2 border-primary pb-1 text-sm font-semibold text-slate-900 dark:text-white">
              Messages
            </span>
            <Link
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
              href="/dashboard/bookings"
            >
              My Bookings
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell size={24} />
          </button>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                {user.name ?? 'Alex Rivera'}
              </p>
              <p className="text-xs text-slate-500">Professional Handler</p>
            </div>
            <div
              className="size-10 rounded-full bg-slate-200 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClkBJR02ry1wHBU9F0W7e0_V4U4xFfButhDJ1etyHqeFlENpaCojyzDC6JPVipCnoOxvCdZ7lnJbRBtZKtRKsmvP60jtx8nMn8A033PN5jr6-ngVOXxPpuVY0qSf46fB__GQivKCLM30xufWHasrXc9cn_fvBtLYRrQl1dBRzIfG2Ip9V-9CFatkzuVFdrdR4BO1z4VVzzguRRewiSUCEnHkTxXztF6KKt_9Jj1-W70h-oVk9se52ZdYuzpcBUrXmx3EmWRxaDWg')",
              }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex h-[calc(100vh-64px)] overflow-hidden">
        {conversations.length > 0 ? (
          <div className="w-full overflow-y-auto p-6">
            <ConversationList
              conversations={conversations}
              currentUserId={user.id}
            />
          </div>
        ) : (
          <>
            {/* Sidebar: Conversations List */}
            <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-100 p-4 dark:border-slate-800">
                <div className="relative">
                  <MagnifyingGlass
                    size={20}
                    className="absolute left-3 top-2.5 text-slate-400"
                  />
                  <input
                    className="w-full rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary/50 dark:bg-slate-800"
                    placeholder="Search conversations..."
                    type="text"
                  />
                </div>
              </div>

              <div className="custom-scrollbar flex-1 overflow-y-auto">
                <div className="flex cursor-pointer items-center gap-3 border-r-4 border-primary bg-primary/5 p-4">
                  <div className="relative">
                    <div
                      className="size-12 rounded-full bg-slate-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-oK9bKs4UxeJgFOZxj3FrFTaVG9gYrsWQZgaMO0ZmwZlQWxALggwdxiS1Nj6m7tcAS9uU6JgL0AUy7PKH_meLOYbCubpF5j9m4TXYszYNPoXm4rZJqX3axnweXj4LLFzygBD2kW6nb_AgBcgel22SooMnXkHGSUCWpOazPBdYi4rOdRoTFe1RW2J4r8_EJ80EYHWPVO0DqKail_wo-zB5SqZ1FBMIPhams3ib8_S9V8-I9_tIo7jNPk82cjl1XWkBUrrRvuIRxw')",
                      }}
                    ></div>
                    <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-green-500"></div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="mb-0.5 flex items-center justify-between">
                      <h4 className="truncate text-sm font-semibold">
                        Sarah Jenkins
                      </h4>
                      <span className="text-[10px] font-bold uppercase text-slate-500">
                        10:45 AM
                      </span>
                    </div>
                    <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-400">
                      Re: Westminster Dog Show...
                    </p>
                    <div className="mt-1">
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Inquiry
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Chat Area */}
            <section className="flex flex-1 flex-col bg-white dark:bg-slate-900">
              <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                    <Trophy size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-none">
                      Sarah Jenkins
                    </h3>
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
                    <Phone size={24} />
                  </button>
                  <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <DotsThreeVertical size={24} />
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
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOoCWF0lMhK732DEdd1hVdVCbgoTo-vDRPwDeQGnfZVILclQ7Vu8uvHf0z9HgKITGz4wjIdAeZYpizYjA5fjT6pTmgrsTMztevSNHvJ1mRG6DBnHKAzP2nsPgKJYqXNDHwvRv7HkbWe0xGxCk8l5A3EiUVe8Qf448PBEkWZmkl_dzuvEOoEU_BBWz1_5dMhQnTi9e4ppu4bD1a880epw8u9asbr1osmD_6olm14j_Ar8IL_G95-6V8XaX1rW5nw4BM-wyUnCM68w')",
                    }}
                  ></div>
                  <div>
                    <div className="message-bubble-left rounded-xl border border-slate-200/50 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                      <p className="text-sm leading-relaxed">
                        Hi Alex! I&apos;m interested in booking you for the
                        Westminster show. I have a Golden Retriever, &quot;Ch.
                        Stormy&apos;s Midnight Run&quot;, competing in the Best
                        of Breed class.
                      </p>
                    </div>
                    <span className="ml-1 mt-1 text-[10px] text-slate-400">
                      10:42 AM
                    </span>
                  </div>
                </div>

                <div className="flex max-w-[80%] flex-row-reverse gap-3 self-end">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-bold text-primary">AR</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="message-bubble-right rounded-xl bg-primary p-3 text-white shadow-md">
                      <p className="text-sm leading-relaxed">
                        Hello Sarah! I&apos;d love to help. I&apos;m familiar
                        with Midnight Run, he&apos;s a fantastic specimen. I
                        have availability for those dates. What are you thinking
                        regarding the handling fee?
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
                    <Notepad size={14} />
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
                    <PlusCircle size={24} />
                  </button>
                  <input
                    className="flex-1 border-none bg-transparent py-2 text-sm focus:ring-0"
                    placeholder="Type your message..."
                    type="text"
                  />
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-slate-500 transition-colors hover:text-primary">
                      <Smiley size={24} />
                    </button>
                    <button className="ml-2 flex items-center justify-center rounded-lg bg-primary p-2 text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
                      <PaperPlaneRight size={24} />
                    </button>
                  </div>
                </div>
              </footer>
            </section>

            {/* Right Sidebar */}
            <aside className="flex w-80 shrink-0 flex-col gap-6 border-l border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Booking Summary
                </h3>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <PawPrint size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Subject Dog</p>
                      <p className="text-sm font-bold">Ch. Midnight Run</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Status</span>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Pending Confirmation
                      </span>
                    </div>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90">
                      <ShieldCheck size={14} />
                      Confirm Booking
                    </button>
                    <button className="mt-2 w-full rounded-lg bg-slate-100 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                      Update Terms
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-primary">
                    <ShieldCheck size={18} />
                    <p className="text-[10px] font-bold uppercase">
                      Trust Guarantee
                    </p>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                    Bookings through HandlerHub include automated insurance
                    coverage and dispute mediation.
                  </p>
                </div>
              </div>
            </aside>
          </>
        )}
      </main>

      <style>{`
        .message-bubble-left { border-bottom-left-radius: 2px; }
        .message-bubble-right { border-bottom-right-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}</style>
    </div>
  )
}
