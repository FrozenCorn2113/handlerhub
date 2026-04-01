'use client'

import { useState } from 'react'

import { BookingCard } from '@/components/ops/booking-card'
import { DogCard } from '@/components/ops/dog-card'
import { EmptyState } from '@/components/ops/empty-state'
import { MobileTabBar } from '@/components/ops/mobile-tab-bar'
import { OpsNav } from '@/components/ops/ops-nav'
import { TierCard } from '@/components/ops/service-card'
import { StatusBadge } from '@/components/ops/status-badge'

import {
  ArrowRight,
  Article,
  CalendarBlank,
  ChatCircle,
  CloudArrowUp,
  Dog,
  Envelope,
  MagnifyingGlass,
  MapPin,
  PaperPlaneRight,
  PawPrint,
  Star,
  Textbox,
  Trophy,
  Truck,
  Users,
} from '@phosphor-icons/react'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-1 font-display text-3xl font-light text-ringside-black">
      {children}
    </h2>
  )
}

function SectionDescription({ children }: { children: React.ReactNode }) {
  return <p className="mb-8 font-sans text-sm text-warm-gray">{children}</p>
}

function ColorSwatch({
  name,
  hex,
  dark,
}: {
  name: string
  hex: string
  dark?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="size-16 rounded-2xl border border-tan/60 shadow-[0_2px_8px_rgba(28,18,8,0.08)] transition-all duration-200 hover:scale-110 hover:shadow-[0_4px_16px_rgba(28,18,8,0.15)]"
        style={{ backgroundColor: hex }}
      />
      <span
        className={`font-sans text-[11px] font-medium ${dark ? 'text-ringside-black' : 'text-warm-brown'}`}
      >
        {name}
      </span>
      <span className="font-sans text-[10px] text-warm-gray">{hex}</span>
    </div>
  )
}

/* ============================================================
   MESSAGING MOCKUP
   ============================================================ */
function MessagingMockup() {
  const conversations = [
    {
      name: 'Sarah Mitchell',
      avatar: 'https://i.pravatar.cc/80?img=5',
      preview: 'Can we confirm the grooming details for...',
      time: '2m',
      unread: 3,
      active: true,
    },
    {
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/80?img=11',
      preview: "Thanks for accepting! I'll bring the crate...",
      time: '1h',
      unread: 0,
      active: false,
    },
    {
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/80?img=9',
      preview: 'Can we schedule a practice run before...',
      time: '3h',
      unread: 1,
      active: false,
    },
    {
      name: 'David Park',
      avatar: 'https://i.pravatar.cc/80?img=12',
      preview: 'The show schedule just got updated, check...',
      time: '1d',
      unread: 0,
      active: false,
    },
    {
      name: 'Lisa Thompson',
      avatar: 'https://i.pravatar.cc/80?img=20',
      preview: 'Great job at Westminster! Amazing results.',
      time: '2d',
      unread: 0,
      active: false,
    },
  ]

  const messages = [
    {
      sent: false,
      text: 'Hi James! I wanted to confirm the grooming details for Northern Star before the show next week.',
      time: '10:32 AM',
    },
    {
      sent: false,
      text: "She'll need the full breed standard groom -- bath, blow-dry, and trimming. Can you also do the show-day finishing touches?",
      time: '10:33 AM',
    },
    {
      sent: true,
      text: 'Hi Sarah! Absolutely, I have everything lined up. Full groom plus finishing touches on show day.',
      time: '10:45 AM',
    },
    {
      sent: true,
      text: "I'd recommend bringing her in the evening before so we can do the bath and blow-dry without rushing. Then just touch-ups morning of.",
      time: '10:46 AM',
    },
    {
      sent: false,
      text: "That sounds perfect! I'll drop her off Friday evening. What time works best?",
      time: '11:02 AM',
    },
  ]

  return (
    <div
      className="flex overflow-hidden rounded-2xl border border-tan/60 bg-white shadow-[0_4px_20px_rgba(28,18,8,0.08)]"
      style={{ height: 480 }}
    >
      {/* Left sidebar - conversation list */}
      <div className="flex w-72 shrink-0 flex-col border-r border-tan/60">
        <div className="border-b border-tan/40 p-4">
          <h3 className="mb-3 font-display text-lg font-semibold text-ringside-black">
            Messages
          </h3>
          <div className="relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-lg border border-tan/60 bg-ring-cream py-2 pl-9 pr-3 font-sans text-xs text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo) => (
            <div
              key={convo.name}
              className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-all ${
                convo.active
                  ? 'border-l-[3px] border-l-paddock-green bg-paddock-green/5'
                  : 'border-l-[3px] border-l-transparent hover:bg-ring-cream/60'
              }`}
            >
              <img
                src={convo.avatar}
                alt={convo.name}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`truncate font-sans text-sm ${
                      convo.unread > 0
                        ? 'font-bold text-ringside-black'
                        : 'font-medium text-warm-brown'
                    }`}
                  >
                    {convo.name}
                  </span>
                  <span
                    className={`ml-2 shrink-0 font-sans text-[11px] ${
                      convo.unread > 0
                        ? 'font-medium text-paddock-green'
                        : 'text-warm-gray'
                    }`}
                  >
                    {convo.time}
                  </span>
                </div>
                <p className="truncate font-sans text-xs text-warm-gray">
                  {convo.preview}
                </p>
              </div>
              {convo.unread > 0 && (
                <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#24845a] to-paddock-green px-1 font-sans text-[10px] font-bold text-white">
                  {convo.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - active conversation */}
      <div className="flex flex-1 flex-col">
        {/* Conversation header */}
        <div className="flex items-center gap-3 border-b border-tan/40 px-5 py-3">
          <img
            src="https://i.pravatar.cc/80?img=5"
            alt="Sarah Mitchell"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div>
            <p className="font-sans text-sm font-semibold text-ringside-black">
              Sarah Mitchell
            </p>
            <p className="font-sans text-[11px] text-paddock-green">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="mb-4 text-center">
            <span className="rounded-full bg-ring-cream px-3 py-1 font-sans text-[11px] text-warm-gray">
              Today
            </span>
          </div>
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    msg.sent
                      ? 'rounded-br-md bg-gradient-to-br from-[#24845a] to-paddock-green text-white shadow-[0_2px_8px_rgba(31,107,74,0.2)]'
                      : 'rounded-bl-md bg-light-sand text-ringside-black'
                  }`}
                >
                  <p className="font-sans text-sm leading-relaxed">
                    {msg.text}
                  </p>
                  <p
                    className={`mt-1 text-right font-sans text-[10px] ${
                      msg.sent ? 'text-white/60' : 'text-warm-gray'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message input */}
        <div className="border-t border-tan/40 px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-tan/60 bg-ring-cream px-4 py-2.5">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent font-sans text-sm text-ringside-black placeholder:text-warm-gray focus:outline-none"
            />
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#24845a] to-paddock-green shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <PaperPlaneRight size={16} weight="fill" className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OpsPreviewPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Standard selected by default

  const tiers = [
    {
      tierName: 'Basic',
      basePrice: 150,
      description: 'Ring handling only. Perfect for experienced show dogs.',
      included: [
        'Professional ring handling',
        'Pre-show ring practice',
        'Day-of coordination',
      ],
      addOns: [
        { name: 'Grooming prep', price: 50 },
        { name: 'Transport', price: 75 },
      ],
    },
    {
      tierName: 'Standard',
      basePrice: 250,
      description: 'Ring handling plus grooming. Our most popular package.',
      included: [
        'Professional ring handling',
        'Full breed-standard grooming',
        'Bath, blow-dry, and trimming',
        'Day-of coordination',
      ],
      addOns: [
        { name: 'Transport', price: 75 },
        { name: 'Photo package', price: 40 },
      ],
    },
    {
      tierName: 'Premium',
      basePrice: 400,
      description: 'Full show day package. We handle everything.',
      included: [
        'Professional ring handling',
        'Full breed-standard grooming',
        'Door-to-door transport',
        'Show-day finishing touches',
        'Post-show care',
      ],
      addOns: [
        { name: 'Extra ring', price: 100 },
        { name: 'Video highlights', price: 60 },
      ],
    },
  ]

  // Category pills for form section
  const [selectedCategory, setSelectedCategory] = useState('Sporting')
  const categories = [
    { name: 'Sporting', icon: <PawPrint size={14} weight="fill" /> },
    { name: 'Hound', icon: <Dog size={14} weight="fill" /> },
    { name: 'Working', icon: <Trophy size={14} weight="fill" /> },
    { name: 'Terrier', icon: <Star size={14} weight="fill" /> },
    { name: 'Toy', icon: <PawPrint size={14} weight="fill" /> },
    { name: 'Non-Sporting', icon: <Dog size={14} weight="fill" /> },
    { name: 'Herding', icon: <PawPrint size={14} weight="fill" /> },
  ]

  // Profile card data
  const profiles = [
    {
      name: 'Liam Roberts',
      role: 'Professional Handler',
      avatar: 'https://i.pravatar.cc/300?img=1',
      followers: 527,
      reviews: 92,
    },
    {
      name: 'Sophia Johnson',
      role: 'Grooming Specialist',
      avatar: 'https://i.pravatar.cc/300?img=2',
      followers: 413,
      reviews: 76,
    },
    {
      name: 'Noah Martinez',
      role: 'Show Coordinator',
      avatar: 'https://i.pravatar.cc/300?img=3',
      followers: 612,
      reviews: 88,
    },
    {
      name: 'Emma Davis',
      role: 'Professional Handler',
      avatar: 'https://i.pravatar.cc/300?img=4',
      followers: 489,
      reviews: 95,
    },
    {
      name: 'Oliver Wilson',
      role: 'Transport Specialist',
      avatar: 'https://i.pravatar.cc/300?img=5',
      followers: 523,
      reviews: 80,
    },
    {
      name: 'Ava Thompson',
      role: 'Ring Training Coach',
      avatar: 'https://i.pravatar.cc/300?img=6',
      followers: 455,
      reviews: 90,
    },
  ]

  return (
    <div className="min-h-screen bg-ring-cream">
      <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
        {/* Page Header */}
        <div className="pb-4">
          <span
            className="text-[40px] tracking-tight text-paddock-green"
            style={{
              fontFamily: "'Roca One', sans-serif",
              lineHeight: 1.1,
            }}
          >
            HandlerHub
          </span>
          <h1 className="mt-4 font-display text-5xl font-light tracking-tight text-ringside-black">
            Brand Direction
          </h1>
          <p className="mt-4 max-w-lg font-sans text-base text-warm-brown">
            Visual language, typography, color, and component patterns for the
            HandlerHub experience.
          </p>
        </div>

        {/* ======================== TYPOGRAPHY ======================== */}
        <section>
          <SectionTitle>Typography</SectionTitle>
          <SectionDescription>
            Three heading font candidates side by side. Pick the one that feels
            right for HandlerHub.
          </SectionDescription>

          <div className="space-y-6 rounded-2xl border border-tan/60 bg-white p-8 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
            {/* Side-by-side Fraunces vs Questrial */}
            <div>
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Heading Comparison: Fraunces vs Questrial vs Sen
              </span>
              <div className="grid grid-cols-3 gap-6">
                {/* Fraunces column */}
                <div className="space-y-4 rounded-xl bg-ring-cream/50 p-6">
                  <span className="mb-3 block font-sans text-[10px] font-semibold uppercase tracking-widest text-paddock-green">
                    Fraunces
                  </span>
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H1
                    </span>
                    <h1 className="font-display text-5xl font-light text-ringside-black">
                      Find Your Perfect Handler
                    </h1>
                  </div>
                  <hr className="border-tan/40" />
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H2
                    </span>
                    <h2 className="font-display text-3xl font-light text-ringside-black">
                      Westminster 2026
                    </h2>
                  </div>
                  <hr className="border-tan/40" />
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H3
                    </span>
                    <h3 className="font-display text-2xl font-light text-ringside-black">
                      Booking Confirmed
                    </h3>
                  </div>
                </div>

                {/* Questrial column */}
                <div className="space-y-4 rounded-xl bg-ring-cream/50 p-6">
                  <span className="mb-3 block font-sans text-[10px] font-semibold uppercase tracking-widest text-slate-blue">
                    Questrial
                  </span>
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H1
                    </span>
                    <h1
                      className="text-5xl font-normal text-ringside-black"
                      style={{
                        fontFamily: "'Questrial', sans-serif",
                        lineHeight: 0.95,
                        letterSpacing: '-0.04em',
                        marginBottom: 0,
                      }}
                    >
                      Find Your Perfect Handler
                    </h1>
                  </div>
                  <hr className="border-tan/40" />
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H2
                    </span>
                    <h2
                      className="text-3xl font-normal text-ringside-black"
                      style={{
                        fontFamily: "'Questrial', sans-serif",
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        marginBottom: 0,
                      }}
                    >
                      Westminster 2026
                    </h2>
                  </div>
                  <hr className="border-tan/40" />
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H3
                    </span>
                    <h3
                      className="text-2xl font-normal text-ringside-black"
                      style={{
                        fontFamily: "'Questrial', sans-serif",
                        lineHeight: 1.2,
                        letterSpacing: '-0.01em',
                        marginBottom: 0,
                      }}
                    >
                      Booking Confirmed
                    </h3>
                  </div>
                </div>

                {/* Sen column */}
                <div className="space-y-4 rounded-xl bg-ring-cream/50 p-6">
                  <span className="mb-3 block font-sans text-[10px] font-semibold uppercase tracking-widest text-warm-brown">
                    Sen
                  </span>
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H1
                    </span>
                    <h1
                      className="text-5xl font-bold text-ringside-black"
                      style={{
                        fontFamily: "'Sen', sans-serif",
                        lineHeight: 0.95,
                        letterSpacing: '-0.04em',
                        marginBottom: 0,
                      }}
                    >
                      Find Your Perfect Handler
                    </h1>
                  </div>
                  <hr className="border-tan/40" />
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H2
                    </span>
                    <h2
                      className="text-3xl font-bold text-ringside-black"
                      style={{
                        fontFamily: "'Sen', sans-serif",
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        marginBottom: 0,
                      }}
                    >
                      Westminster 2026
                    </h2>
                  </div>
                  <hr className="border-tan/40" />
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H3
                    </span>
                    <h3
                      className="text-2xl font-semibold text-ringside-black"
                      style={{
                        fontFamily: "'Sen', sans-serif",
                        lineHeight: 1.2,
                        letterSpacing: '-0.01em',
                        marginBottom: 0,
                      }}
                    >
                      Booking Confirmed
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-tan" />

            {/* Fraunces headings (full showcase) */}
            <div>
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Display / Fraunces (full scale)
              </span>
              <div className="space-y-4">
                <div>
                  <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                    H1
                  </span>
                  <h1 className="font-display text-6xl font-light text-ringside-black">
                    Find Your Perfect Handler
                  </h1>
                </div>
                <hr className="border-tan/40" />
                <div>
                  <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                    H2
                  </span>
                  <h2 className="font-display text-4xl font-light text-ringside-black">
                    Westminster 2026
                  </h2>
                </div>
                <hr className="border-tan/40" />
                <div>
                  <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                    H3
                  </span>
                  <h3 className="font-display text-3xl font-light text-ringside-black">
                    Booking Confirmed
                  </h3>
                </div>
                <hr className="border-tan/40" />
                <div className="flex gap-8">
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H4
                    </span>
                    <h4 className="font-display text-2xl font-light text-ringside-black">
                      Your Dashboard
                    </h4>
                  </div>
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H5
                    </span>
                    <h5 className="font-display text-xl font-light text-ringside-black">
                      Service Details
                    </h5>
                  </div>
                  <div>
                    <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                      H6
                    </span>
                    <h6 className="font-display text-lg font-light text-ringside-black">
                      Dog Profile
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-tan" />

            {/* Pairing demo */}
            <div>
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Fraunces + Inter Pairing
              </span>
              <div className="rounded-xl bg-ring-cream p-6">
                <h2
                  className="font-display text-3xl font-light text-ringside-black"
                  style={{ marginBottom: '0.75rem' }}
                >
                  Professional handlers, matched to your dog
                </h2>
                <p
                  className="font-sans text-base text-warm-brown"
                  style={{ lineHeight: 1.7 }}
                >
                  HandlerHub connects exhibitors with experienced, vetted
                  professional handlers. Browse profiles, compare services, and
                  book with confidence for your next show.
                </p>
              </div>
            </div>

            <hr className="border-tan" />

            {/* Body text */}
            <div>
              <span className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Body / Inter
              </span>
              <p className="font-sans text-base font-normal text-ringside-black">
                Body Regular (400) - The quick brown fox jumps over the lazy
                dog.
              </p>
              <p className="font-sans text-base font-medium text-ringside-black">
                Body Medium (500) - The quick brown fox jumps over the lazy dog.
              </p>
              <p className="font-sans text-base font-semibold text-ringside-black">
                Body Semibold (600) - The quick brown fox jumps over the lazy
                dog.
              </p>
            </div>

            <hr className="border-tan" />

            <div>
              <span className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                UI Labels / Inter 13px
              </span>
              <p className="font-sans text-[13px] font-medium text-warm-brown">
                Tab Label &middot; Button Text &middot; Navigation Item
              </p>
            </div>
          </div>
        </section>

        {/* ======================== COLORS ======================== */}
        <section>
          <SectionTitle>Colors</SectionTitle>
          <SectionDescription>
            Final brand palette. Paddock Green primary, Slate Blue accent.
          </SectionDescription>

          <div className="space-y-8 rounded-2xl border border-tan/60 bg-white p-8 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
            <div>
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Brand
              </span>
              <div className="flex flex-wrap gap-6">
                <ColorSwatch name="Ring Cream" hex="#F8F4EE" />
                <ColorSwatch name="Paddock Green" hex="#1F6B4A" dark />
                <ColorSwatch name="Forest" hex="#14472F" dark />
                <ColorSwatch name="Slate Blue" hex="#4A6F8A" dark />
                <ColorSwatch name="Slate Blue Light" hex="#E8EFF5" />
                <ColorSwatch name="Sand" hex="#E8E0D4" />
                <ColorSwatch name="Tan" hex="#D4CFC4" />
                <ColorSwatch name="Warm Brown" hex="#4A3E2E" dark />
                <ColorSwatch name="Ringside Black" hex="#1C1208" dark />
              </div>
            </div>

            <hr className="border-tan" />

            <div>
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Pastels
              </span>
              <div className="flex flex-wrap gap-6">
                <ColorSwatch name="Sage" hex="#D4EFE0" />
                <ColorSwatch name="Pastel Sky" hex="#C2E4F5" />
                <ColorSwatch name="Pastel Ribbon" hex="#F5EFA0" />
              </div>
            </div>

            <hr className="border-tan" />

            <div>
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Status
              </span>
              <div className="flex flex-wrap gap-6">
                <ColorSwatch name="Pending" hex="#F5EFA0" />
                <ColorSwatch name="Accepted" hex="#D4EFE0" />
                <ColorSwatch name="Completed" hex="#C2E4F5" />
                <ColorSwatch name="Declined" hex="#F5E0CC" />
                <ColorSwatch name="Cancelled" hex="#E8E0D4" />
                <ColorSwatch name="Overdue" hex="#FFC9C9" />
              </div>
            </div>
          </div>
        </section>

        {/* ======================== OPS NAV ======================== */}
        <section>
          <SectionTitle>OpsNav</SectionTitle>
          <SectionDescription>
            Top navigation with notification bell, settings, and profile card
            dropdown.
          </SectionDescription>

          <div className="space-y-4">
            <div>
              <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Handler View
              </span>
              <div className="rounded-2xl border border-tan/60 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
                <OpsNav role="handler" />
              </div>
            </div>
            <div className="mt-8">
              <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Exhibitor View
              </span>
              <div className="rounded-2xl border border-tan/60 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
                <OpsNav role="exhibitor" />
              </div>
            </div>
          </div>
        </section>

        {/* ======================== MOBILE TAB BAR ======================== */}
        <section>
          <SectionTitle>Mobile Bottom Bar</SectionTitle>
          <SectionDescription>
            Fixed bottom navigation for mobile viewports. Shown inline here for
            preview.
          </SectionDescription>

          <div className="space-y-6">
            <div>
              <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Handler
              </span>
              <div className="rounded-2xl bg-ring-cream p-4">
                <MobileTabBar role="handler" />
              </div>
            </div>
            <div>
              <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Exhibitor
              </span>
              <div className="rounded-2xl bg-ring-cream p-4">
                <MobileTabBar role="exhibitor" />
              </div>
            </div>
          </div>
        </section>

        {/* ======================== BUTTONS ======================== */}
        <section>
          <SectionTitle>Buttons</SectionTitle>
          <SectionDescription>
            Gradient-based buttons with depth, hover scale, and smooth
            transitions. Delightful and friendly.
          </SectionDescription>

          <div className="space-y-8 rounded-2xl border border-tan/60 bg-white p-8 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
            {/* Brand Green - Primary */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Primary (Paddock Green)
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green px-5 py-2.5 font-sans text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(31,107,74,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(31,107,74,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Small
                </button>
                <button
                  className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green px-7 py-3 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(31,107,74,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(31,107,74,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Medium
                  <ArrowRight size={14} weight="bold" />
                </button>
                <button
                  className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green px-9 py-3.5 font-sans text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(31,107,74,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(31,107,74,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Large
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </div>

            {/* Accent (Slate Blue) */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Accent (Slate Blue)
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="rounded-full bg-gradient-to-b from-[#5a83a0] to-slate-blue px-5 py-2.5 font-sans text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(74,111,138,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(74,111,138,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Small
                </button>
                <button
                  className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#5a83a0] to-slate-blue px-7 py-3 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(74,111,138,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(74,111,138,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Medium
                  <ArrowRight size={14} weight="bold" />
                </button>
                <button
                  className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#5a83a0] to-slate-blue px-9 py-3.5 font-sans text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(74,111,138,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(74,111,138,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Large
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </div>

            {/* Primary Dark */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Dark
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="rounded-full bg-gradient-to-b from-warm-brown to-ringside-black px-5 py-2.5 font-sans text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(28,18,8,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_20px_rgba(28,18,8,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                >
                  Small
                </button>
                <button
                  className="flex items-center gap-2 rounded-full bg-gradient-to-b from-warm-brown to-ringside-black px-7 py-3 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(28,18,8,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_20px_rgba(28,18,8,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                >
                  Medium
                  <ArrowRight size={14} weight="bold" />
                </button>
                <button
                  className="flex items-center gap-2 rounded-full bg-gradient-to-b from-warm-brown to-ringside-black px-9 py-3.5 font-sans text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(28,18,8,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_20px_rgba(28,18,8,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                >
                  Large
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </div>

            {/* Secondary */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Secondary
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-full bg-gradient-to-b from-[#F0EAE0] to-sand px-5 py-2.5 font-sans text-xs font-semibold text-ringside-black shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_4px_rgba(28,18,8,0.1)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_12px_rgba(28,18,8,0.15)]">
                  Small
                </button>
                <button className="rounded-full bg-gradient-to-b from-[#F0EAE0] to-sand px-7 py-3 font-sans text-[13px] font-semibold text-ringside-black shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_4px_rgba(28,18,8,0.1)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_12px_rgba(28,18,8,0.15)]">
                  Medium
                </button>
                <button className="rounded-full bg-gradient-to-b from-[#F0EAE0] to-sand px-9 py-3.5 font-sans text-sm font-semibold text-ringside-black shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_4px_rgba(28,18,8,0.1)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_12px_rgba(28,18,8,0.15)]">
                  Large
                </button>
              </div>
            </div>

            {/* Ghost */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Ghost
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-full bg-gradient-to-b from-transparent to-transparent px-5 py-2.5 font-sans text-xs font-semibold text-warm-brown shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-[1.02] hover:from-sand/30 hover:to-sand/50 hover:shadow-[0_1px_4px_rgba(28,18,8,0.08)]">
                  Small
                </button>
                <button className="rounded-full bg-gradient-to-b from-transparent to-transparent px-7 py-3 font-sans text-[13px] font-semibold text-warm-brown shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-[1.02] hover:from-sand/30 hover:to-sand/50 hover:shadow-[0_1px_4px_rgba(28,18,8,0.08)]">
                  Medium
                </button>
                <button className="rounded-full bg-gradient-to-b from-transparent to-transparent px-9 py-3.5 font-sans text-sm font-semibold text-warm-brown shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-[1.02] hover:from-sand/30 hover:to-sand/50 hover:shadow-[0_1px_4px_rgba(28,18,8,0.08)]">
                  Large
                </button>
              </div>
            </div>

            {/* Destructive */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Destructive
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="rounded-full bg-gradient-to-b from-red-500 to-red-600 px-5 py-2.5 font-sans text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(220,38,38,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(220,38,38,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Small
                </button>
                <button
                  className="rounded-full bg-gradient-to-b from-red-500 to-red-600 px-7 py-3 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(220,38,38,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(220,38,38,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Medium
                </button>
                <button
                  className="rounded-full bg-gradient-to-b from-red-500 to-red-600 px-9 py-3.5 font-sans text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(220,38,38,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(220,38,38,0.35)]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Large
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== STATUS BADGES ======================== */}
        <section>
          <SectionTitle>Status Badges</SectionTitle>
          <SectionDescription>
            All six status variants on white and cream backgrounds.
          </SectionDescription>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-tan/60 bg-white p-6 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
              <span className="mr-2 w-full font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Filled
              </span>
              <StatusBadge status="pending" weight="filled" />
              <StatusBadge status="accepted" weight="filled" />
              <StatusBadge status="completed" weight="filled" />
              <StatusBadge status="declined" weight="filled" />
              <StatusBadge status="cancelled" weight="filled" />
              <StatusBadge status="overdue" weight="filled" />
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-tan/60 bg-white p-6 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
              <span className="mr-2 w-full font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Medium (default)
              </span>
              <StatusBadge status="pending" weight="medium" />
              <StatusBadge status="accepted" weight="medium" />
              <StatusBadge status="completed" weight="medium" />
              <StatusBadge status="declined" weight="medium" />
              <StatusBadge status="cancelled" weight="medium" />
              <StatusBadge status="overdue" weight="medium" />
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-tan/60 bg-ring-cream p-6 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
              <span className="mr-2 w-full font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Light
              </span>
              <StatusBadge status="pending" weight="light" />
              <StatusBadge status="accepted" weight="light" />
              <StatusBadge status="completed" weight="light" />
              <StatusBadge status="declined" weight="light" />
              <StatusBadge status="cancelled" weight="light" />
              <StatusBadge status="overdue" weight="light" />
            </div>
          </div>
        </section>

        {/* ======================== CARDS ======================== */}
        <section>
          <SectionTitle>Cards</SectionTitle>
          <SectionDescription>
            Booking, dog, and messaging cards with depth and delight.
          </SectionDescription>

          <div className="space-y-8">
            {/* Booking Cards */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Booking Cards
              </span>
              <div className="grid gap-4 sm:grid-cols-2">
                <BookingCard
                  exhibitorName="Sarah Mitchell"
                  dogName="GCH Foxfire's Northern Star"
                  showName="Westminster Kennel Club"
                  date="Apr 12, 2026"
                  status="pending"
                  onAccept={() => {}}
                  onDecline={() => {}}
                  onMessage={() => {}}
                />
                <BookingCard
                  exhibitorName="Michael Chen"
                  dogName="CH Lakewood's Golden Hour"
                  showName="Beverly Hills Dog Show"
                  date="Apr 20, 2026"
                  status="accepted"
                  onMessage={() => {}}
                />
              </div>
            </div>

            {/* Dog Cards */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Dog Cards
              </span>
              <div className="grid gap-4 sm:grid-cols-3">
                <DogCard
                  name="Northern Star"
                  breed="Golden Retriever"
                  age="3 years"
                  photoUrl="https://placedog.net/400/500?id=1"
                  shows={12}
                  wins={8}
                  rating={4.8}
                  titles={['GCH', 'BISS']}
                />
                <DogCard
                  name="Golden Hour"
                  breed="Cavalier King Charles Spaniel"
                  age="2 years"
                  photoUrl="https://placedog.net/400/500?id=2"
                  shows={6}
                  wins={3}
                  rating={4.5}
                  titles={['CH']}
                />
                <DogCard
                  name="Morning Dew"
                  breed="Standard Poodle"
                  age="4 years"
                  photoUrl="https://placedog.net/400/500?id=3"
                  shows={18}
                  wins={11}
                  rating={4.9}
                  titles={['CH', 'RN']}
                />
              </div>
            </div>

            {/* Messaging Interface */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Messaging
              </span>
              <MessagingMockup />
            </div>
          </div>
        </section>

        {/* ======================== SERVICE TIERS ======================== */}
        <section>
          <SectionTitle>Service Tiers</SectionTitle>
          <SectionDescription>
            Fiverr-style tiered pricing. Handlers pick one tier, then customize
            with selectable add-on pills inside each card.
          </SectionDescription>

          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier, i) => (
              <TierCard
                key={tier.tierName}
                tierName={tier.tierName}
                basePrice={tier.basePrice}
                description={tier.description}
                included={tier.included}
                addOns={tier.addOns}
                selected={selectedTier === i}
                onSelect={() => setSelectedTier(i)}
              />
            ))}
          </div>
        </section>

        {/* ======================== EMPTY STATES ======================== */}
        <section>
          <SectionTitle>Empty States</SectionTitle>
          <SectionDescription>
            Warm, inviting placeholder states for when no data is available.
          </SectionDescription>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
              <EmptyState
                icon={CalendarBlank}
                message="No bookings yet"
                subtitle="Once exhibitors request your services, they'll appear here."
                actionLabel="Set Up Services"
                onAction={() => {}}
              />
            </div>
            <div className="rounded-2xl border border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
              <EmptyState
                icon={Envelope}
                message="No messages yet"
                subtitle="Start a conversation with a handler or exhibitor."
                actionLabel="Find a Handler"
                onAction={() => {}}
              />
            </div>
          </div>
        </section>

        {/* ======================== FORM ELEMENTS ======================== */}
        <section>
          <SectionTitle>Form Elements</SectionTitle>
          <SectionDescription>
            Split-panel form layout with contextual illustration, stepper, and
            selectable category pills.
          </SectionDescription>

          <div className="overflow-hidden rounded-2xl border border-tan/60 bg-white shadow-[0_4px_20px_rgba(28,18,8,0.08)]">
            {/* Stepper at top */}
            <div className="border-b border-tan/40 px-8 py-6">
              <div className="flex items-center justify-center gap-0">
                {[
                  { num: 1, label: 'Dog Info', active: true, complete: true },
                  {
                    num: 2,
                    label: 'Show Details',
                    active: true,
                    complete: false,
                  },
                  {
                    num: 3,
                    label: 'Handler Prefs',
                    active: false,
                    complete: false,
                  },
                  {
                    num: 4,
                    label: 'Review',
                    active: false,
                    complete: false,
                  },
                ].map((step, i) => (
                  <div key={step.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex size-10 items-center justify-center rounded-full font-sans text-sm font-bold transition-all duration-200 ${
                          step.complete
                            ? 'bg-gradient-to-br from-[#24845a] to-paddock-green text-white shadow-[0_2px_8px_rgba(31,107,74,0.3)]'
                            : step.active
                              ? 'border-2 border-paddock-green bg-white text-paddock-green shadow-[0_2px_8px_rgba(31,107,74,0.15)]'
                              : 'border-2 border-tan bg-ring-cream text-warm-gray'
                        }`}
                      >
                        {step.complete ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M4 8L7 11L12 5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          step.num
                        )}
                      </div>
                      <span
                        className={`mt-2 font-sans text-[11px] font-medium ${step.active ? 'text-ringside-black' : 'text-warm-gray'}`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <div
                        className={`mx-3 mt-[-20px] h-0 w-16 border-t-2 border-dashed ${
                          step.complete ? 'border-paddock-green' : 'border-tan'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Split layout: form left, illustration right */}
            <div className="flex">
              {/* Left side - form fields (60%) */}
              <div className="flex-[3] space-y-8 p-10">
                {/* Category pills */}
                <div>
                  <label className="mb-3 block font-sans text-[13px] font-medium text-ringside-black">
                    Breed Group
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-xs font-medium transition-all duration-200 hover:scale-[1.02] ${
                          selectedCategory === cat.name
                            ? 'bg-gradient-to-b from-[#24845a] to-paddock-green text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(31,107,74,0.25)]'
                            : 'border border-tan bg-white text-warm-brown shadow-[0_1px_3px_rgba(28,18,8,0.06)] hover:border-paddock-green/40 hover:shadow-[0_2px_8px_rgba(28,18,8,0.1)]'
                        }`}
                      >
                        <span
                          className={
                            selectedCategory === cat.name
                              ? 'text-white/80'
                              : 'text-warm-gray'
                          }
                        >
                          {cat.icon}
                        </span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Input */}
                <div>
                  <label className="mb-2 block font-sans text-[13px] font-medium text-ringside-black">
                    Dog&apos;s Registered Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GCH Foxfire's Northern Star"
                    className="w-full rounded-xl border border-tan bg-white px-4 py-3.5 font-sans text-sm text-ringside-black shadow-[0_2px_6px_rgba(28,18,8,0.06)] transition-all duration-200 placeholder:text-warm-gray focus:border-paddock-green focus:shadow-[0_0_0_3px_rgba(31,107,74,0.12),0_2px_8px_rgba(31,107,74,0.08)] focus:outline-none"
                    style={{ borderLeftWidth: '3px' }}
                  />
                </div>

                {/* Select */}
                <div>
                  <label className="mb-2 block font-sans text-[13px] font-medium text-ringside-black">
                    Show Name
                  </label>
                  <select
                    className="w-full appearance-none rounded-xl border border-tan bg-white px-4 py-3.5 font-sans text-sm text-ringside-black shadow-[0_2px_6px_rgba(28,18,8,0.06)] transition-all duration-200 focus:border-paddock-green focus:shadow-[0_0_0_3px_rgba(31,107,74,0.12),0_2px_8px_rgba(31,107,74,0.08)] focus:outline-none"
                    style={{ borderLeftWidth: '3px' }}
                  >
                    <option>Select a show</option>
                    <option>Westminster Kennel Club</option>
                    <option>Beverly Hills Dog Show</option>
                    <option>National Dog Show</option>
                    <option>AKC National Championship</option>
                  </select>
                </div>

                {/* Textarea */}
                <div>
                  <label className="mb-2 block font-sans text-[13px] font-medium text-ringside-black">
                    Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any specific requirements for the handler..."
                    className="w-full resize-none rounded-xl border border-tan bg-white px-4 py-3.5 font-sans text-sm text-ringside-black shadow-[0_2px_6px_rgba(28,18,8,0.06)] transition-all duration-200 placeholder:text-warm-gray focus:border-paddock-green focus:shadow-[0_0_0_3px_rgba(31,107,74,0.12),0_2px_8px_rgba(31,107,74,0.08)] focus:outline-none"
                    style={{ borderLeftWidth: '3px' }}
                  />
                </div>

                {/* CTA */}
                <div className="flex justify-end pt-2">
                  <button
                    className="flex items-center gap-2 rounded-full bg-gradient-to-b from-warm-brown to-ringside-black px-8 py-3 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(28,18,8,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_20px_rgba(28,18,8,0.35)]"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                  >
                    Continue
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Right side - contextual info (40%) */}
              <div className="flex flex-[2] flex-col items-center justify-center bg-gradient-to-br from-paddock-green/[0.06] via-sage/30 to-pastel-sky/20 p-8">
                <div className="text-center">
                  <h3 className="font-display text-3xl font-light text-ringside-black">
                    About Your Dog
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs font-sans text-sm leading-relaxed text-warm-brown">
                    Tell us about your dog so we can match you with the perfect
                    handler for your next show.
                  </p>
                </div>

                {/* Decorative dog silhouette area */}
                <div className="mt-8 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-paddock-green/10 to-sage/30 shadow-[0_4px_20px_rgba(31,107,74,0.08)]">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/60 shadow-[inset_0_2px_8px_rgba(28,18,8,0.04)] backdrop-blur-sm">
                    <PawPrint
                      size={48}
                      weight="duotone"
                      className="text-paddock-green/40"
                    />
                  </div>
                </div>

                {/* File Upload Zone */}
                <div className="mt-6 w-full">
                  <label className="mb-2 block font-sans text-[13px] font-medium text-ringside-black">
                    Dog Photo
                  </label>
                  <div className="group/upload flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-tan bg-white/60 px-6 py-8 shadow-[0_2px_8px_rgba(28,18,8,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-paddock-green/50 hover:shadow-[0_4px_16px_rgba(31,107,74,0.08)]">
                    <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(28,18,8,0.08)] transition-transform duration-300 group-hover/upload:scale-110">
                      <CloudArrowUp
                        size={22}
                        className="text-slate-blue transition-colors duration-200 group-hover/upload:text-paddock-green"
                        weight="duotone"
                      />
                    </div>
                    <p className="font-sans text-xs font-medium text-warm-brown">
                      Drop file or click to upload
                    </p>
                    <p className="mt-0.5 font-sans text-[10px] text-warm-gray">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== PROFILE CARDS ======================== */}
        <section>
          <SectionTitle>Profile Cards</SectionTitle>
          <SectionDescription>
            Clean, airy profile cards with large photos, stats, and action
            buttons. White card background, generous rounded corners.
          </SectionDescription>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => (
              <div
                key={profile.name}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.12)]"
              >
                {/* Large photo at top */}
                <div className="relative overflow-hidden">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-56 w-full rounded-t-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content below photo */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Name bold */}
                  <h4
                    className="font-display text-lg font-semibold text-ringside-black"
                    style={{ marginBottom: '0.25rem' }}
                  >
                    {profile.name}
                  </h4>
                  {/* Role/description muted */}
                  <p className="font-sans text-sm text-warm-gray">
                    {profile.role}
                  </p>

                  {/* Stats row */}
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Users
                        size={14}
                        weight="fill"
                        className="text-warm-gray"
                      />
                      <span className="font-sans text-xs font-medium text-warm-brown">
                        {profile.followers}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Article
                        size={14}
                        weight="fill"
                        className="text-warm-gray"
                      />
                      <span className="font-sans text-xs font-medium text-warm-brown">
                        {profile.reviews}
                      </span>
                    </div>

                    {/* Connect + button at bottom-right */}
                    <div className="ml-auto">
                      <button
                        className="flex items-center gap-1 rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green px-4 py-2 font-sans text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_6px_rgba(31,107,74,0.25)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_16px_rgba(31,107,74,0.3)]"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                      >
                        Connect +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-tan pt-8 text-center">
          <p className="font-sans text-xs text-warm-gray">
            HandlerHub Brand Direction - Not a production page
          </p>
        </div>
      </div>
    </div>
  )
}
