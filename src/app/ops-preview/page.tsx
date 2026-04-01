'use client'

import { BookingCard } from '@/components/ops/booking-card'
import { DogCard } from '@/components/ops/dog-card'
import { EmptyState } from '@/components/ops/empty-state'
import { MobileTabBar } from '@/components/ops/mobile-tab-bar'
import { OpsNav } from '@/components/ops/ops-nav'
import { ServiceCard } from '@/components/ops/service-card'
import { StatusBadge } from '@/components/ops/status-badge'
import { ThreadCard } from '@/components/ops/thread-card'

import {
  ArrowRight,
  CalendarBlank,
  ChatCircle,
  CloudArrowUp,
  Envelope,
  MapPin,
  PawPrint,
  Star,
  Trophy,
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

export default function OpsPreviewPage() {
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
            Fraunces for display headings, Inter for body and UI. The curvy,
            variable-weight Fraunces brings warmth and personality.
          </SectionDescription>

          <div className="space-y-6 rounded-2xl border border-tan/60 bg-white p-8 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
            {/* Fraunces headings */}
            <div>
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Display / Fraunces
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
            Top navigation bar for handler and exhibitor roles.
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
                <button className="rounded-full border border-tan px-5 py-2.5 font-sans text-xs font-semibold text-ringside-black shadow-[0_1px_2px_rgba(28,18,8,0.06)] transition-all duration-200 hover:scale-[1.02] hover:border-warm-brown hover:bg-light-sand hover:shadow-[0_2px_8px_rgba(28,18,8,0.1)]">
                  Small
                </button>
                <button className="rounded-full border border-tan px-7 py-3 font-sans text-[13px] font-semibold text-ringside-black shadow-[0_1px_2px_rgba(28,18,8,0.06)] transition-all duration-200 hover:scale-[1.02] hover:border-warm-brown hover:bg-light-sand hover:shadow-[0_2px_8px_rgba(28,18,8,0.1)]">
                  Medium
                </button>
                <button className="rounded-full border border-tan px-9 py-3.5 font-sans text-sm font-semibold text-ringside-black shadow-[0_1px_2px_rgba(28,18,8,0.06)] transition-all duration-200 hover:scale-[1.02] hover:border-warm-brown hover:bg-light-sand hover:shadow-[0_2px_8px_rgba(28,18,8,0.1)]">
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
                <button className="rounded-full px-5 py-2.5 font-sans text-xs font-semibold text-warm-brown transition-all duration-200 hover:bg-sand/40 hover:shadow-[0_1px_4px_rgba(28,18,8,0.08)]">
                  Small
                </button>
                <button className="rounded-full px-7 py-3 font-sans text-[13px] font-semibold text-warm-brown transition-all duration-200 hover:bg-sand/40 hover:shadow-[0_1px_4px_rgba(28,18,8,0.08)]">
                  Medium
                </button>
                <button className="rounded-full px-9 py-3.5 font-sans text-sm font-semibold text-warm-brown transition-all duration-200 hover:bg-sand/40 hover:shadow-[0_1px_4px_rgba(28,18,8,0.08)]">
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
            Booking, dog, and thread cards with hover lift and depth.
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
                  name="GCH Foxfire's Northern Star"
                  breed="Golden Retriever"
                  titles={['GCH', 'BISS']}
                />
                <DogCard
                  name="CH Lakewood's Golden Hour"
                  breed="Cavalier King Charles Spaniel"
                  titles={['CH', 'RN']}
                />
                <DogCard
                  name="Bellwood's Morning Dew"
                  breed="Standard Poodle"
                  titles={['CH']}
                />
              </div>
            </div>

            {/* Thread Cards */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Thread Cards
              </span>
              <div className="space-y-3">
                <ThreadCard
                  name="Sarah Mitchell"
                  preview="Hi! I wanted to confirm the grooming details for next week's show..."
                  time="2m ago"
                  unread
                  unreadCount={3}
                />
                <ThreadCard
                  name="Michael Chen"
                  preview="Thanks for accepting! I'll bring the crate setup early."
                  time="1h ago"
                />
                <ThreadCard
                  name="Emily Rodriguez"
                  preview="Can we schedule a practice run before the show?"
                  time="3h ago"
                  unread
                  unreadCount={1}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======================== SERVICE PACKAGES ======================== */}
        <section>
          <SectionTitle>Service Packages</SectionTitle>
          <SectionDescription>
            Pricing cards for handler services.
          </SectionDescription>

          <div className="grid gap-4 sm:grid-cols-3">
            <ServiceCard
              name="Conformation Handling"
              price={15000}
              pricePer="show"
              description="Professional ring presentation including pre-show grooming, gaiting, and stacking for breed and group competition."
              tiers={[
                { name: 'Breed', price: 15000, pricePer: 'show' },
                { name: 'Group', price: 20000, pricePer: 'show' },
                { name: 'Best in Show', price: 25000, pricePer: 'show' },
              ]}
              features={[
                'Professional ring presentation',
                'Pre-show grooming and stacking',
                'Breed and group competition',
              ]}
            />
            <ServiceCard
              name="Full Grooming"
              price={8500}
              pricePer="session"
              description="Complete breed-standard grooming including bath, blow-dry, trimming, and show-day finishing touches."
              features={[
                'Breed-standard grooming',
                'Bath, blow-dry, and trimming',
                'Show-day finishing touches',
              ]}
            />
            <ServiceCard
              name="Training"
              price={12000}
              pricePer="hour"
              description="One-on-one ring training sessions covering free-stacking, gaiting patterns, and show ring etiquette."
              features={[
                'One-on-one ring training',
                'Free-stacking and gaiting patterns',
                'Show ring etiquette',
              ]}
            />
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
            Inputs, selects, textareas, stepper, and file upload with brand
            styling.
          </SectionDescription>

          <div className="space-y-8 rounded-2xl border border-tan/60 bg-white p-8 shadow-[0_2px_12px_rgba(28,18,8,0.06)]">
            {/* Multi-step stepper */}
            <div>
              <span className="mb-5 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Form Stepper
              </span>
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
                  { num: 4, label: 'Review', active: false, complete: false },
                ].map((step, i) => (
                  <div key={step.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex size-10 items-center justify-center rounded-full font-sans text-sm font-bold transition-all duration-200 ${
                          step.complete
                            ? 'bg-gradient-to-br from-paddock-green to-forest text-white shadow-[0_2px_8px_rgba(31,107,74,0.3)]'
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
                        className={`mx-3 mt-[-20px] h-0.5 w-16 rounded-full ${
                          step.complete ? 'bg-paddock-green' : 'bg-tan'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-tan/40" />

            {/* Text Input */}
            <div>
              <label className="mb-1.5 block font-sans text-[13px] font-medium text-ringside-black">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl border border-tan bg-white px-4 py-3 font-sans text-sm text-ringside-black shadow-[0_1px_2px_rgba(28,18,8,0.04)] transition-all duration-200 placeholder:text-warm-gray focus:border-paddock-green focus:shadow-[0_0_0_3px_rgba(31,107,74,0.1)] focus:outline-none"
                style={{ borderLeftWidth: '3px' }}
              />
            </div>

            {/* Select */}
            <div>
              <label className="mb-1.5 block font-sans text-[13px] font-medium text-ringside-black">
                Breed Group
              </label>
              <select
                className="w-full appearance-none rounded-xl border border-tan bg-white px-4 py-3 font-sans text-sm text-ringside-black shadow-[0_1px_2px_rgba(28,18,8,0.04)] transition-all duration-200 focus:border-paddock-green focus:shadow-[0_0_0_3px_rgba(31,107,74,0.1)] focus:outline-none"
                style={{ borderLeftWidth: '3px' }}
              >
                <option>Select a breed group</option>
                <option>Sporting</option>
                <option>Hound</option>
                <option>Working</option>
                <option>Terrier</option>
                <option>Toy</option>
                <option>Non-Sporting</option>
                <option>Herding</option>
              </select>
            </div>

            {/* Textarea */}
            <div>
              <label className="mb-1.5 block font-sans text-[13px] font-medium text-ringside-black">
                Bio
              </label>
              <textarea
                rows={4}
                placeholder="Tell exhibitors about your experience..."
                className="w-full resize-none rounded-xl border border-tan bg-white px-4 py-3 font-sans text-sm text-ringside-black shadow-[0_1px_2px_rgba(28,18,8,0.04)] transition-all duration-200 placeholder:text-warm-gray focus:border-paddock-green focus:shadow-[0_0_0_3px_rgba(31,107,74,0.1)] focus:outline-none"
                style={{ borderLeftWidth: '3px' }}
              />
            </div>

            {/* File Upload Zone */}
            <div>
              <label className="mb-1.5 block font-sans text-[13px] font-medium text-ringside-black">
                Profile Photo
              </label>
              <div className="group/upload flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-tan bg-gradient-to-b from-ring-cream to-white px-6 py-12 transition-all duration-300 hover:border-paddock-green/50 hover:bg-gradient-to-b hover:from-sage/20 hover:to-white hover:shadow-[0_4px_16px_rgba(31,107,74,0.08)]">
                <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(28,18,8,0.08)] transition-transform duration-300 group-hover/upload:scale-110">
                  <CloudArrowUp
                    size={28}
                    className="text-slate-blue transition-colors duration-200 group-hover/upload:text-paddock-green"
                    weight="duotone"
                  />
                </div>
                <p className="font-sans text-sm font-medium text-warm-brown">
                  Drop file here or click to upload
                </p>
                <p className="mt-1 font-sans text-xs text-warm-gray">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== PROFILE CARDS ======================== */}
        <section>
          <SectionTitle>Profile Cards</SectionTitle>
          <SectionDescription>
            How each role views the other&apos;s profile summary. Inspired by
            modern profile cards with gradient banners and overlapping avatars.
          </SectionDescription>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Handler viewing exhibitor */}
            <div className="overflow-hidden rounded-2xl border border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.14)]">
              {/* Gradient banner */}
              <div className="h-20 bg-gradient-to-br from-paddock-green/30 via-sage to-pastel-sky/40" />
              {/* Content */}
              <div className="relative px-6 pb-6 pt-0">
                {/* Avatar overlapping banner */}
                <div className="-mt-8 mb-4 flex items-end justify-between">
                  <div className="flex size-16 items-center justify-center rounded-full border-4 border-white bg-sage font-sans text-lg font-bold text-paddock-green shadow-[0_2px_8px_rgba(28,18,8,0.1)]">
                    SM
                  </div>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                    Exhibitor
                  </span>
                </div>

                <p className="font-sans text-base font-bold text-ringside-black">
                  Sarah Mitchell
                </p>
                <p className="mt-0.5 font-sans text-xs text-warm-brown">
                  3 dogs registered
                </p>

                {/* Stats row with icons */}
                <div className="mt-4 flex gap-3">
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-light-sand px-3 py-2.5">
                    <CalendarBlank size={16} className="text-warm-gray" />
                    <div>
                      <p className="font-sans text-sm font-bold text-ringside-black">
                        12
                      </p>
                      <p className="font-sans text-[10px] text-warm-gray">
                        Bookings
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-light-sand px-3 py-2.5">
                    <Trophy size={16} className="text-warm-gray" />
                    <div>
                      <p className="font-sans text-sm font-bold text-ringside-black">
                        8
                      </p>
                      <p className="font-sans text-[10px] text-warm-gray">
                        Shows
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-paddock-green/10 px-3 py-2.5">
                    <PawPrint
                      size={16}
                      className="text-paddock-green"
                      weight="fill"
                    />
                    <div>
                      <p className="font-sans text-sm font-bold text-paddock-green">
                        Active
                      </p>
                      <p className="font-sans text-[10px] text-warm-gray">
                        Status
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-4 w-full rounded-full bg-gradient-to-b from-warm-brown to-ringside-black py-3 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(28,18,8,0.2)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_16px_rgba(28,18,8,0.25)]">
                  <span className="flex items-center justify-center gap-2">
                    <ChatCircle size={14} weight="fill" />
                    Message
                  </span>
                </button>
              </div>
            </div>

            {/* Exhibitor viewing handler */}
            <div className="overflow-hidden rounded-2xl border border-tan/60 bg-white shadow-[0_2px_12px_rgba(28,18,8,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,18,8,0.14)]">
              {/* Gradient banner */}
              <div className="h-20 bg-gradient-to-br from-slate-blue/30 via-pastel-sky to-sage/30" />
              {/* Content */}
              <div className="relative px-6 pb-6 pt-0">
                {/* Avatar overlapping banner */}
                <div className="-mt-8 mb-4 flex items-end justify-between">
                  <div className="flex size-16 items-center justify-center rounded-full border-4 border-white bg-pastel-sky font-sans text-lg font-bold text-[#1A4A7A] shadow-[0_2px_8px_rgba(28,18,8,0.1)]">
                    JR
                  </div>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                    Handler
                  </span>
                </div>

                <p className="font-sans text-base font-bold text-ringside-black">
                  James Rodriguez
                </p>
                <p className="mt-0.5 font-sans text-xs text-warm-brown">
                  Professional Handler &middot; AKC Registered
                </p>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      weight={i <= 4 ? 'fill' : 'regular'}
                      className={i <= 4 ? 'text-slate-blue' : 'text-tan'}
                    />
                  ))}
                  <span className="ml-1 font-sans text-xs font-medium text-warm-brown">
                    4.0 (28 reviews)
                  </span>
                </div>

                {/* Stats row with icons */}
                <div className="mt-4 flex gap-3">
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-light-sand px-3 py-2.5">
                    <PawPrint size={16} className="text-warm-gray" />
                    <div>
                      <p className="font-sans text-sm font-bold text-ringside-black">
                        3
                      </p>
                      <p className="font-sans text-[10px] text-warm-gray">
                        Services
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-light-sand px-3 py-2.5">
                    <Trophy size={16} className="text-warm-gray" />
                    <div>
                      <p className="font-sans text-sm font-bold text-ringside-black">
                        47
                      </p>
                      <p className="font-sans text-[10px] text-warm-gray">
                        Shows
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-light-sand px-3 py-2.5">
                    <Star size={16} className="text-warm-gray" />
                    <div>
                      <p className="font-sans text-sm font-bold text-ringside-black">
                        28
                      </p>
                      <p className="font-sans text-[10px] text-warm-gray">
                        Reviews
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-4 w-full rounded-full bg-gradient-to-b from-warm-brown to-ringside-black py-3 font-sans text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(28,18,8,0.2)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_16px_rgba(28,18,8,0.25)]">
                  <span className="flex items-center justify-center gap-2">
                    <ChatCircle size={14} weight="fill" />
                    Get In Touch
                  </span>
                </button>
              </div>
            </div>
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
