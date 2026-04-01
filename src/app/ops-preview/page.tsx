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
  CalendarBlank,
  ChatCircle,
  CloudArrowUp,
  Envelope,
  Star,
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
        className="h-16 w-16 rounded-lg border border-tan shadow-sm"
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
        {/* ======================== BRAND OPTIONS ======================== */}
        <section className="rounded-xl border-2 border-paddock-green/30 bg-white p-8 shadow-md">
          <div className="mb-8">
            <span className="mb-2 inline-block rounded-full bg-paddock-green px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-widest text-white">
              Decision Required
            </span>
            <h1 className="mt-3 font-display text-5xl font-light tracking-tight text-ringside-black">
              Brand Options
            </h1>
            <p className="mt-2 max-w-lg font-sans text-base text-warm-brown">
              Compare accent colors, logo fonts, and heading rendering side by
              side.
            </p>
          </div>

          {/* ---------- 1. Accent Color Comparison ---------- */}
          <div className="mb-12">
            <h2 className="mb-1 font-display text-3xl font-light text-ringside-black">
              1. Accent Color Comparison
            </h2>
            <p className="mb-6 font-sans text-sm text-warm-gray">
              Each option paired with Paddock Green (#1F6B4A). Pick the accent
              that complements best.
            </p>

            <div className="grid gap-6 sm:grid-cols-3">
              {/* Option A — Warm Amber */}
              <div className="rounded-lg border border-tan p-6">
                <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                  Option A
                </span>
                <p className="mb-3 font-sans text-sm font-semibold text-ringside-black">
                  Warm Amber{' '}
                  <span className="font-normal text-warm-gray">#C8842A</span>
                </p>

                {/* Color swatches */}
                <div className="mb-4 flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-16 w-16 rounded-lg border border-tan"
                      style={{ backgroundColor: '#1F6B4A' }}
                    />
                    <span className="font-sans text-[10px] text-warm-gray">
                      Paddock Green
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-16 w-16 rounded-lg border border-tan"
                      style={{ backgroundColor: '#C8842A' }}
                    />
                    <span className="font-sans text-[10px] text-warm-gray">
                      Warm Amber
                    </span>
                  </div>
                </div>

                {/* Sample button */}
                <button
                  className="mb-4 w-full rounded-full px-6 py-3 font-sans text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#C8842A' }}
                >
                  Book Handler
                </button>

                {/* Sample badge / chip */}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium text-white"
                    style={{ backgroundColor: '#C8842A' }}
                  >
                    <Star size={12} weight="fill" /> 4.8 Rating
                  </span>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-medium"
                    style={{ backgroundColor: '#C8842A20', color: '#C8842A' }}
                  >
                    Featured
                  </span>
                </div>
              </div>

              {/* Option B — Dusty Terracotta */}
              <div className="rounded-lg border border-tan p-6">
                <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                  Option B
                </span>
                <p className="mb-3 font-sans text-sm font-semibold text-ringside-black">
                  Dusty Terracotta{' '}
                  <span className="font-normal text-warm-gray">#B5624A</span>
                </p>

                {/* Color swatches */}
                <div className="mb-4 flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-16 w-16 rounded-lg border border-tan"
                      style={{ backgroundColor: '#1F6B4A' }}
                    />
                    <span className="font-sans text-[10px] text-warm-gray">
                      Paddock Green
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-16 w-16 rounded-lg border border-tan"
                      style={{ backgroundColor: '#B5624A' }}
                    />
                    <span className="font-sans text-[10px] text-warm-gray">
                      Dusty Terracotta
                    </span>
                  </div>
                </div>

                {/* Sample button */}
                <button
                  className="mb-4 w-full rounded-full px-6 py-3 font-sans text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#B5624A' }}
                >
                  Book Handler
                </button>

                {/* Sample badge / chip */}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium text-white"
                    style={{ backgroundColor: '#B5624A' }}
                  >
                    <Star size={12} weight="fill" /> 4.8 Rating
                  </span>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-medium"
                    style={{ backgroundColor: '#B5624A20', color: '#B5624A' }}
                  >
                    Featured
                  </span>
                </div>
              </div>

              {/* Option C — Slate Blue */}
              <div className="rounded-lg border border-tan p-6">
                <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                  Option C
                </span>
                <p className="mb-3 font-sans text-sm font-semibold text-ringside-black">
                  Slate Blue{' '}
                  <span className="font-normal text-warm-gray">#4A6F8A</span>
                </p>

                {/* Color swatches */}
                <div className="mb-4 flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-16 w-16 rounded-lg border border-tan"
                      style={{ backgroundColor: '#1F6B4A' }}
                    />
                    <span className="font-sans text-[10px] text-warm-gray">
                      Paddock Green
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-16 w-16 rounded-lg border border-tan"
                      style={{ backgroundColor: '#4A6F8A' }}
                    />
                    <span className="font-sans text-[10px] text-warm-gray">
                      Slate Blue
                    </span>
                  </div>
                </div>

                {/* Sample button */}
                <button
                  className="mb-4 w-full rounded-full px-6 py-3 font-sans text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#4A6F8A' }}
                >
                  Book Handler
                </button>

                {/* Sample badge / chip */}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium text-white"
                    style={{ backgroundColor: '#4A6F8A' }}
                  >
                    <Star size={12} weight="fill" /> 4.8 Rating
                  </span>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-medium"
                    style={{ backgroundColor: '#4A6F8A20', color: '#4A6F8A' }}
                  >
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- 2. Logo Font Comparison ---------- */}
          <div className="mb-12">
            <h2 className="mb-1 font-display text-3xl font-light text-ringside-black">
              2. Logo Font Comparison
            </h2>
            <p className="mb-6 font-sans text-sm text-warm-gray">
              Current wordmark vs Roca One variant. Shown at desktop (48px) and
              mobile (32px).
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Current logo */}
              <div className="rounded-lg border border-tan bg-ring-cream p-6">
                <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                  Current — Cormorant + Inter
                </span>

                {/* Desktop size */}
                <div className="mb-6">
                  <span className="mb-2 block font-sans text-[10px] text-warm-gray">
                    Desktop (48px)
                  </span>
                  <div className="flex items-baseline">
                    <span
                      className="font-display text-[48px] font-light tracking-tight text-ringside-black"
                      style={{ lineHeight: 1.1 }}
                    >
                      Handler
                    </span>
                    <span
                      className="font-sans text-[40px] font-semibold tracking-tight text-paddock-green"
                      style={{ lineHeight: 1.1 }}
                    >
                      Hub
                    </span>
                  </div>
                </div>

                {/* Mobile size */}
                <div>
                  <span className="mb-2 block font-sans text-[10px] text-warm-gray">
                    Mobile (32px)
                  </span>
                  <div className="flex items-baseline">
                    <span
                      className="font-display text-[32px] font-light tracking-tight text-ringside-black"
                      style={{ lineHeight: 1.1 }}
                    >
                      Handler
                    </span>
                    <span
                      className="font-sans text-[26px] font-semibold tracking-tight text-paddock-green"
                      style={{ lineHeight: 1.1 }}
                    >
                      Hub
                    </span>
                  </div>
                </div>
              </div>

              {/* Roca One logo */}
              <div className="rounded-lg border border-tan bg-ring-cream p-6">
                <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                  Roca One
                </span>

                {/* Desktop size */}
                <div className="mb-6">
                  <span className="mb-2 block font-sans text-[10px] text-warm-gray">
                    Desktop (48px)
                  </span>
                  <span
                    className="text-[48px] tracking-tight text-ringside-black"
                    style={{
                      fontFamily: "'Roca One', sans-serif",
                      lineHeight: 1.1,
                    }}
                  >
                    HandlerHub
                  </span>
                </div>

                {/* Mobile size */}
                <div>
                  <span className="mb-2 block font-sans text-[10px] text-warm-gray">
                    Mobile (32px)
                  </span>
                  <span
                    className="text-[32px] tracking-tight text-ringside-black"
                    style={{
                      fontFamily: "'Roca One', sans-serif",
                      lineHeight: 1.1,
                    }}
                  >
                    HandlerHub
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- 3. Heading Font Check ---------- */}
          <div>
            <h2 className="mb-1 font-display text-3xl font-light text-ringside-black">
              3. Heading Font Check
            </h2>
            <p className="mb-6 font-sans text-sm text-warm-gray">
              Cormorant Garamond at weight 300 with tracking -0.04em and
              line-height 0.95.
            </p>

            <div className="rounded-lg border border-tan bg-ring-cream p-8">
              <span className="mb-6 block font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                Cormorant Garamond 300 / tracking -0.04em / line-height 0.95
              </span>

              <div className="space-y-4">
                <div>
                  <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                    H1 — font-display text-6xl font-light
                  </span>
                  <h1
                    className="font-display text-6xl text-ringside-black"
                    style={{
                      fontWeight: 300,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.95,
                      marginBottom: 0,
                    }}
                  >
                    Find Your Perfect Handler
                  </h1>
                </div>

                <hr className="border-tan" />

                <div>
                  <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                    H2 — font-display text-4xl font-light
                  </span>
                  <h2
                    className="font-display text-4xl text-ringside-black"
                    style={{
                      fontWeight: 300,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.95,
                      marginBottom: 0,
                    }}
                  >
                    Professional Handling Services
                  </h2>
                </div>

                <hr className="border-tan" />

                <div>
                  <span className="mb-1 block font-sans text-[10px] text-warm-gray">
                    H3 — font-display text-3xl font-light
                  </span>
                  <h3
                    className="font-display text-3xl text-ringside-black"
                    style={{
                      fontWeight: 300,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.95,
                      marginBottom: 0,
                    }}
                  >
                    Trusted by Exhibitors Nationwide
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Page Header */}
        <div>
          <h1 className="font-display text-5xl font-light tracking-tight text-ringside-black">
            Design Preview
          </h1>
          <p className="mt-4 max-w-lg font-sans text-base text-warm-brown">
            HandlerHub ops visual language. Typography, color, components, and
            patterns for the handler and exhibitor experience.
          </p>
        </div>

        {/* ======================== TYPOGRAPHY ======================== */}
        <section>
          <SectionTitle>Typography</SectionTitle>
          <SectionDescription>
            Cormorant Garamond for display, Inter for body and UI.
          </SectionDescription>

          <div className="space-y-6 rounded-lg border border-tan bg-white p-8">
            <div>
              <span className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Display / Cormorant Garamond
              </span>
              <h1 className="font-display text-6xl font-light text-ringside-black">
                H1 Headline
              </h1>
              <h2 className="font-display text-4xl font-light text-ringside-black">
                H2 Section Title
              </h2>
              <h3 className="font-display text-3xl font-light text-ringside-black">
                H3 Subsection
              </h3>
              <h4 className="font-display text-2xl font-light text-ringside-black">
                H4 Card Title
              </h4>
              <h5 className="font-display text-xl font-light text-ringside-black">
                H5 Label
              </h5>
              <h6 className="font-display text-lg font-light text-ringside-black">
                H6 Small Heading
              </h6>
            </div>

            <hr className="border-tan" />

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
            Brand palette and status colors.
          </SectionDescription>

          <div className="space-y-8 rounded-lg border border-tan bg-white p-8">
            <div>
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Brand
              </span>
              <div className="flex flex-wrap gap-6">
                <ColorSwatch name="Ring Cream" hex="#F8F4EE" />
                <ColorSwatch name="Paddock Green" hex="#1F6B4A" dark />
                <ColorSwatch name="Forest" hex="#14472F" dark />
                <ColorSwatch name="Show Orange" hex="#D4621A" dark />
                <ColorSwatch name="Sand" hex="#E8E0D4" />
                <ColorSwatch name="Tan" hex="#D4CFC4" />
                <ColorSwatch name="Warm Brown" hex="#4A3E2E" dark />
                <ColorSwatch name="Ringside Black" hex="#1C1208" dark />
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
              <span className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Handler View
              </span>
              <div className="overflow-hidden rounded-lg border border-tan">
                <OpsNav role="handler" />
              </div>
            </div>
            <div>
              <span className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Exhibitor View
              </span>
              <div className="overflow-hidden rounded-lg border border-tan">
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

          <div className="space-y-4">
            <div>
              <span className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Handler
              </span>
              <div className="overflow-hidden rounded-lg border border-tan">
                <MobileTabBar role="handler" />
              </div>
            </div>
            <div>
              <span className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Exhibitor
              </span>
              <div className="overflow-hidden rounded-lg border border-tan">
                <MobileTabBar role="exhibitor" />
              </div>
            </div>
          </div>
        </section>

        {/* ======================== BUTTONS ======================== */}
        <section>
          <SectionTitle>Buttons</SectionTitle>
          <SectionDescription>
            Primary, secondary, ghost, and destructive variants at three sizes.
          </SectionDescription>

          <div className="space-y-8 rounded-lg border border-tan bg-white p-8">
            {/* Primary */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Primary
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-full bg-paddock-green px-4 py-2 font-sans text-xs font-medium text-white transition-colors hover:bg-forest">
                  Small
                </button>
                <button className="rounded-full bg-paddock-green px-6 py-3 font-sans text-[13px] font-medium text-white transition-colors hover:bg-forest">
                  Medium
                </button>
                <button className="rounded-full bg-paddock-green px-8 py-3.5 font-sans text-sm font-medium text-white transition-colors hover:bg-forest">
                  Large
                </button>
              </div>
            </div>

            {/* Secondary */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Secondary
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-full border border-tan px-4 py-2 font-sans text-xs font-medium text-ringside-black transition-colors hover:bg-light-sand">
                  Small
                </button>
                <button className="rounded-full border border-tan px-6 py-3 font-sans text-[13px] font-medium text-ringside-black transition-colors hover:bg-light-sand">
                  Medium
                </button>
                <button className="rounded-full border border-tan px-8 py-3.5 font-sans text-sm font-medium text-ringside-black transition-colors hover:bg-light-sand">
                  Large
                </button>
              </div>
            </div>

            {/* Ghost */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Ghost
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-full px-4 py-2 font-sans text-xs font-medium text-warm-brown transition-colors hover:bg-sand/50">
                  Small
                </button>
                <button className="rounded-full px-6 py-3 font-sans text-[13px] font-medium text-warm-brown transition-colors hover:bg-sand/50">
                  Medium
                </button>
                <button className="rounded-full px-8 py-3.5 font-sans text-sm font-medium text-warm-brown transition-colors hover:bg-sand/50">
                  Large
                </button>
              </div>
            </div>

            {/* Destructive */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Destructive
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-full bg-red-600 px-4 py-2 font-sans text-xs font-medium text-white transition-colors hover:bg-red-700">
                  Small
                </button>
                <button className="rounded-full bg-red-600 px-6 py-3 font-sans text-[13px] font-medium text-white transition-colors hover:bg-red-700">
                  Medium
                </button>
                <button className="rounded-full bg-red-600 px-8 py-3.5 font-sans text-sm font-medium text-white transition-colors hover:bg-red-700">
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
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-tan bg-white p-6">
              <span className="mr-2 font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                On White
              </span>
              <StatusBadge status="pending" />
              <StatusBadge status="accepted" />
              <StatusBadge status="completed" />
              <StatusBadge status="declined" />
              <StatusBadge status="cancelled" />
              <StatusBadge status="overdue" />
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-tan bg-ring-cream p-6">
              <span className="mr-2 font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                On Cream
              </span>
              <StatusBadge status="pending" />
              <StatusBadge status="accepted" />
              <StatusBadge status="completed" />
              <StatusBadge status="declined" />
              <StatusBadge status="cancelled" />
              <StatusBadge status="overdue" />
            </div>
          </div>
        </section>

        {/* ======================== CARDS ======================== */}
        <section>
          <SectionTitle>Cards</SectionTitle>
          <SectionDescription>
            Booking, dog, and thread cards with hover lift.
          </SectionDescription>

          <div className="space-y-8">
            {/* Booking Cards */}
            <div>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Booking Cards
              </span>
              <div className="space-y-3">
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
              <div className="grid gap-3 sm:grid-cols-2">
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
                />
                <ThreadCard
                  name="Michael Chen"
                  preview="Thanks for accepting! I'll bring the crate setup early."
                  time="1h ago"
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
            />
            <ServiceCard
              name="Full Grooming"
              price={8500}
              pricePer="session"
              description="Complete breed-standard grooming including bath, blow-dry, trimming, and show-day finishing touches."
            />
            <ServiceCard
              name="Training"
              price={12000}
              pricePer="hour"
              description="One-on-one ring training sessions covering free-stacking, gaiting patterns, and show ring etiquette."
            />
          </div>
        </section>

        {/* ======================== EMPTY STATES ======================== */}
        <section>
          <SectionTitle>Empty States</SectionTitle>
          <SectionDescription>
            Placeholder states for when no data is available.
          </SectionDescription>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-tan bg-white">
              <EmptyState
                icon={CalendarBlank}
                message="No bookings yet. Once exhibitors request your services, they'll appear here."
                actionLabel="Set Up Services"
                onAction={() => {}}
              />
            </div>
            <div className="rounded-lg border border-tan bg-white">
              <EmptyState
                icon={Envelope}
                message="No messages yet. Start a conversation with a handler or exhibitor."
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
            Inputs, selects, textareas, and file upload zones with brand
            styling.
          </SectionDescription>

          <div className="space-y-6 rounded-lg border border-tan bg-white p-8">
            {/* Text Input */}
            <div>
              <label className="mb-1.5 block font-sans text-[13px] font-medium text-ringside-black">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-tan bg-white px-4 py-3 font-sans text-sm text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
              />
            </div>

            {/* Select */}
            <div>
              <label className="mb-1.5 block font-sans text-[13px] font-medium text-ringside-black">
                Breed Group
              </label>
              <select className="w-full appearance-none rounded-lg border border-tan bg-white px-4 py-3 font-sans text-sm text-ringside-black focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20">
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
                className="w-full resize-none rounded-lg border border-tan bg-white px-4 py-3 font-sans text-sm text-ringside-black placeholder:text-warm-gray focus:border-paddock-green focus:outline-none focus:ring-2 focus:ring-paddock-green/20"
              />
            </div>

            {/* File Upload Zone */}
            <div>
              <label className="mb-1.5 block font-sans text-[13px] font-medium text-ringside-black">
                Profile Photo
              </label>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-tan bg-ring-cream px-6 py-10 transition-colors hover:border-paddock-green/40">
                <CloudArrowUp
                  size={36}
                  className="mb-2 text-warm-gray"
                  weight="thin"
                />
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
            How each role views the other&apos;s profile summary.
          </SectionDescription>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Handler viewing exhibitor */}
            <div className="rounded-lg border border-tan bg-white p-6">
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Handler views Exhibitor
              </span>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage font-sans text-lg font-semibold text-paddock-green">
                  SM
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-base font-semibold text-ringside-black">
                    Sarah Mitchell
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-warm-brown">
                    3 dogs registered
                  </p>
                  <div className="mt-3 flex gap-6">
                    <div>
                      <p className="font-sans text-lg font-semibold text-ringside-black">
                        12
                      </p>
                      <p className="font-sans text-[11px] text-warm-gray">
                        Bookings
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-lg font-semibold text-ringside-black">
                        8
                      </p>
                      <p className="font-sans text-[11px] text-warm-gray">
                        Shows
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-lg font-semibold text-paddock-green">
                        Active
                      </p>
                      <p className="font-sans text-[11px] text-warm-gray">
                        Status
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exhibitor viewing handler */}
            <div className="rounded-lg border border-tan bg-white p-6">
              <span className="mb-4 block font-sans text-[11px] font-medium uppercase tracking-widest text-warm-gray">
                Exhibitor views Handler
              </span>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pastel-sky font-sans text-lg font-semibold text-[#1A4A7A]">
                  JR
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-base font-semibold text-ringside-black">
                    James Rodriguez
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-warm-brown">
                    Professional Handler &middot; AKC Registered
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        weight={i <= 4 ? 'fill' : 'regular'}
                        className={i <= 4 ? 'text-show-orange' : 'text-tan'}
                      />
                    ))}
                    <span className="ml-1 font-sans text-xs text-warm-brown">
                      4.0 (28 reviews)
                    </span>
                  </div>
                  <div className="mt-3 flex gap-6">
                    <div>
                      <p className="font-sans text-lg font-semibold text-ringside-black">
                        3
                      </p>
                      <p className="font-sans text-[11px] text-warm-gray">
                        Services
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-lg font-semibold text-ringside-black">
                        47
                      </p>
                      <p className="font-sans text-[11px] text-warm-gray">
                        Shows
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-lg font-semibold text-ringside-black">
                        28
                      </p>
                      <p className="font-sans text-[11px] text-warm-gray">
                        Reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-tan pt-8 text-center">
          <p className="font-sans text-xs text-warm-gray">
            HandlerHub Design Preview - Not a production page
          </p>
        </div>
      </div>
    </div>
  )
}
